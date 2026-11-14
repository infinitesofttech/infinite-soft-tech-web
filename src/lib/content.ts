import { cache } from "react";
import { seedCollections, seedSettings } from "./seed";
import { getKV } from "./store";
import type { CollectionKey, CollectionMap, Settings } from "./types";

export const COLLECTION_KEYS = Object.keys(seedCollections) as CollectionKey[];

export function isCollectionKey(value: string): value is CollectionKey {
  return (COLLECTION_KEYS as string[]).includes(value);
}

const collectionKey = (name: CollectionKey) => `collection-${name}`;
const SETTINGS_KEY = "settings";

/* ---------- Strict readers (admin): errors are thrown, never hidden ---------- */

export async function readCollection<K extends CollectionKey>(name: K): Promise<CollectionMap[K][]> {
  const stored = await getKV("content").getJSON<CollectionMap[K][]>(collectionKey(name));
  return stored ?? (seedCollections[name] as CollectionMap[K][]);
}

export async function writeCollection<K extends CollectionKey>(name: K, items: CollectionMap[K][]) {
  await getKV("content").setJSON(collectionKey(name), items);
}

export async function readSettings(): Promise<Settings> {
  const stored = await getKV("content").getJSON<Partial<Settings>>(SETTINGS_KEY);
  return { ...seedSettings, ...(stored ?? {}) };
}

export async function writeSettings(settings: Settings) {
  await getKV("content").setJSON(SETTINGS_KEY, settings);
}

/* ---------- Safe readers (public pages): fall back to default content ---------- */

export const getCollection = cache(async <K extends CollectionKey>(name: K): Promise<CollectionMap[K][]> => {
  try {
    return await readCollection(name);
  } catch (err) {
    console.error(`[content] Failed to read "${name}", using defaults.`, err);
    return seedCollections[name] as CollectionMap[K][];
  }
});

export async function getPublished<K extends CollectionKey>(name: K): Promise<CollectionMap[K][]> {
  const items = await getCollection(name);
  return items.filter((item) => item.published !== false);
}

export const getSettings = cache(async (): Promise<Settings> => {
  try {
    return await readSettings();
  } catch (err) {
    console.error("[content] Failed to read settings, using defaults.", err);
    return seedSettings;
  }
});

export async function getBySlug<K extends "services" | "products" | "blog">(name: K, slug: string) {
  const items = await getPublished(name);
  return items.find((item) => item.slug === slug) ?? null;
}
