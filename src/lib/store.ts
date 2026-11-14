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
  readonly kind: "netlify-blobs" | "file";
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
  return netlifyStore(name) ?? fileStore(name);
}
