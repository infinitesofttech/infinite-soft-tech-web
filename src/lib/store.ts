/**
 * Storage layer.
 *  - On Netlify (production / `netlify dev`): Netlify Blobs — no external database needed.
 *  - Locally with `npm run dev`: JSON files inside the `.data/` folder.
 */
import { getStore } from "@netlify/blobs";
import { promises as fs } from "fs";
import path from "path";

export type StoreName = "content" | "leads" | "media";

export interface BinaryFile {
  data: ArrayBuffer;
  contentType: string;
}

export interface KVStore {
  readonly kind: "netlify-blobs" | "redis" | "file";
  getJSON<T>(key: string): Promise<T | null>;
  setJSON(key: string, value: unknown): Promise<void>;
  delete(key: string): Promise<void>;
  list(prefix?: string): Promise<string[]>;
  getBinary(key: string): Promise<BinaryFile | null>;
  setBinary(key: string, data: ArrayBuffer, contentType: string): Promise<void>;
}

function hasBlobsContext() {
  return Boolean(
    (globalThis as { netlifyBlobsContext?: string }).netlifyBlobsContext || process.env.NETLIFY_BLOBS_CONTEXT,
  );
}

function netlifyStore(name: StoreName): KVStore | null {
  if (!hasBlobsContext()) return null;
  try {
    const store = getStore({ name: `ist-${name}`, consistency: "strong" });
    return {
      kind: "netlify-blobs",
      async getJSON<T>(key: string) {
        const value = await store.get(key, { type: "json" });
        return (value ?? null) as T | null;
      },
      async setJSON(key, value) {
        await store.setJSON(key, value);
      },
      async delete(key) {
        await store.delete(key);
      },
      async list(prefix) {
        const result = await store.list(prefix ? { prefix } : {});
        return result.blobs.map((b) => b.key);
      },
      async getBinary(key) {
        const result = await store.getWithMetadata(key, { type: "arrayBuffer" });
        if (!result) return null;
        const contentType = String(result.metadata?.contentType || "application/octet-stream");
        return { data: result.data, contentType };
      },
      async setBinary(key, data, contentType) {
        await store.set(key, data, { metadata: { contentType } });
      },
    };
  } catch {
    return null;
  }
}

/* ---------- Upstash Redis (Vercel Marketplace "Upstash for Redis" / KV) ---------- */

function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/+$/, ""), token } : null;
}

async function redisCmd<T = unknown>(cfg: { url: string; token: string }, cmd: (string | number)[]): Promise<T> {
  const res = await fetch(cfg.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
    cache: "no-store",
  });
  const json = (await res.json().catch(() => ({}))) as { result?: T; error?: string };
  if (!res.ok || json.error) throw new Error(`Redis error: ${json.error || res.status}`);
  return json.result as T;
}

function redisStore(name: StoreName): KVStore | null {
  const cfg = redisConfig();
  if (!cfg) return null;
  const k = (key: string) => `ist:${name}:${key}`;
  return {
    kind: "redis",
    async getJSON<T>(key: string) {
      const v = await redisCmd<string | null>(cfg, ["GET", k(key)]);
      return v ? (JSON.parse(v) as T) : null;
    },
    async setJSON(key, value) {
      await redisCmd(cfg, ["SET", k(key), JSON.stringify(value)]);
    },
    async delete(key) {
      await redisCmd(cfg, ["DEL", k(key)]);
    },
    async list(prefix) {
      const keys: string[] = [];
      let cursor = "0";
      do {
        const [next, batch] = await redisCmd<[string, string[]]>(cfg, ["SCAN", cursor, "MATCH", `${k(prefix ?? "")}*`, "COUNT", 200]);
        cursor = next;
        keys.push(...batch);
      } while (cursor !== "0");
      return keys.map((x) => x.slice(k("").length));
    },
    async getBinary(key) {
      const v = await redisCmd<string | null>(cfg, ["GET", k(key)]);
      if (!v) return null;
      const { ct, b64 } = JSON.parse(v) as { ct: string; b64: string };
      const buf = Buffer.from(b64, "base64");
      return { data: buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer, contentType: ct };
    },
    async setBinary(key, data, contentType) {
      await redisCmd(cfg, ["SET", k(key), JSON.stringify({ ct: contentType, b64: Buffer.from(data).toString("base64") })]);
    },
  };
}

const DATA_ROOT = path.join(/* turbopackIgnore: true */ process.cwd(), ".data");

function fileStore(name: StoreName): KVStore {
  const dir = path.join(DATA_ROOT, name);
  const file = (key: string, ext: string) => path.join(dir, `${encodeURIComponent(key)}${ext}`);

  async function readOrNull(p: string) {
    try {
      return await fs.readFile(p);
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw err;
    }
  }

  return {
    kind: "file",
    async getJSON<T>(key: string) {
      const buf = await readOrNull(file(key, ".json"));
      return buf ? (JSON.parse(buf.toString("utf8")) as T) : null;
    },
    async setJSON(key, value) {
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(file(key, ".json"), JSON.stringify(value, null, 2), "utf8");
    },
    async delete(key) {
      await Promise.all(
        [".json", ".bin", ".meta"].map((ext) => fs.rm(file(key, ext), { force: true })),
      );
    },
    async list(prefix) {
      let names: string[] = [];
      try {
        names = await fs.readdir(dir);
      } catch {
        return [];
      }
      return names
        .filter((n) => n.endsWith(".json") || n.endsWith(".bin"))
        .map((n) => decodeURIComponent(n.replace(/\.(json|bin)$/, "")))
        .filter((k) => !prefix || k.startsWith(prefix));
    },
    async getBinary(key) {
      const [buf, meta] = await Promise.all([readOrNull(file(key, ".bin")), readOrNull(file(key, ".meta"))]);
      if (!buf) return null;
      const data = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
      return { data, contentType: meta?.toString("utf8") || "application/octet-stream" };
    },
    async setBinary(key, data, contentType) {
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(file(key, ".bin"), Buffer.from(data));
      await fs.writeFile(file(key, ".meta"), contentType, "utf8");
    },
  };
}

export function getKV(name: StoreName): KVStore {
  const store = redisStore(name) ?? netlifyStore(name);
  if (store) return store;
  if (process.env.VERCEL || process.env.NETLIFY) {
    throw new Error("No storage configured. Add an Upstash Redis database (KV_REST_API_URL / KV_REST_API_TOKEN).");
  }
  return fileStore(name);
}
