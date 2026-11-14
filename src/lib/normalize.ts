import { COLLECTION_DEFS, SETTINGS_FIELDS, type FieldDef } from "./collections";
import { seedSettings } from "./seed";
import type { CollectionKey, Settings } from "./types";
import { slugify, uid } from "./utils";

export class ValidationError extends Error {}

type Obj = Record<string, unknown>;

function normalizeField(field: FieldDef, value: unknown, item: Obj): unknown {
  switch (field.type) {
    case "list":
      if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
      if (typeof value === "string") return value.split("\n").map((v) => v.trim()).filter(Boolean);
      return [];
    case "number": {
      const n = Number(value);
      return Number.isFinite(n) ? n : 0;
    }
    case "boolean":
      return value !== false && value !== "false";
    case "slug":
      return slugify(String(value || item[field.from ?? ""] || ""));
    case "objectList": {
      if (!Array.isArray(value)) return [];
      return value
        .filter((row): row is Obj => !!row && typeof row === "object")
        .map((row) => {
          const out: Obj = {};
          for (const sub of field.fields ?? []) out[sub.name] = normalizeField(sub, row[sub.name], row);
          return out;
        });
    }
    default:
      return value == null ? "" : String(value).trim();
  }
}

function isEmpty(v: unknown) {
  return v === "" || v == null || (Array.isArray(v) && v.length === 0);
}

export function normalizeCollection(name: CollectionKey, input: unknown): Obj[] {
  if (!Array.isArray(input)) throw new ValidationError("Expected a list of items.");
  if (input.length > 500) throw new ValidationError("Too many items.");
  const def = COLLECTION_DEFS[name];
  const usedSlugs = new Set<string>();
  const usedIds = new Set<string>();

  return input.map((raw, index) => {
    if (!raw || typeof raw !== "object") throw new ValidationError(`Item ${index + 1} is invalid.`);
    const src = raw as Obj;
    const item: Obj = {};
    let id = typeof src.id === "string" && src.id ? src.id.slice(0, 60) : uid(`${name.slice(0, 3)}-`);
    if (usedIds.has(id)) id = uid(`${name.slice(0, 3)}-`);
    usedIds.add(id);
    item.id = id;

    for (const field of def.fields) {
      item[field.name] = normalizeField(field, src[field.name], src);
      if (field.required && isEmpty(item[field.name])) {
        const title = String(src[def.titleField] || `item #${index + 1}`);
        throw new ValidationError(`"${field.label}" is required (${title}).`);
      }
    }

    if ("slug" in item) {
      let slug = String(item.slug) || id;
      let n = 2;
      while (usedSlugs.has(slug)) slug = `${item.slug}-${n++}`;
      usedSlugs.add(slug);
      item.slug = slug;
    }
    item.published = src.published !== false;
    return item;
  });
}

export function normalizeSettings(input: unknown): Settings {
  if (!input || typeof input !== "object") throw new ValidationError("Invalid settings.");
  const src = input as Obj;
  const out: Obj = { ...seedSettings };
  for (const section of SETTINGS_FIELDS) {
    for (const field of section.fields) {
      out[field.name] = normalizeField(field, src[field.name], src);
      if (field.required && isEmpty(out[field.name])) throw new ValidationError(`"${field.label}" is required.`);
    }
  }
  out.stats = (out.stats as Obj[]).filter((s) => String(s.label ?? "").trim());
  out.whatsapp = String(out.whatsapp ?? "").replace(/\D/g, "");
  out.phone = String(out.phone ?? "").replace(/[^\d+]/g, "");
  return out as unknown as Settings;
}
