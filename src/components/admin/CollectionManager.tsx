"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  LoaderCircle,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { COLLECTION_DEFS, type CollectionDef } from "@/lib/collections";
import type { CollectionKey } from "@/lib/types";
import { cn, slugify, uid } from "@/lib/utils";
import { defaultValue, FieldInput } from "./FieldInput";

type Obj = Record<string, unknown>;

function useToast() {
  const [toast, setToast] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);
  return { toast, setToast };
}

export function Toast({ toast }: { toast: { type: "ok" | "error"; text: string } | null }) {
  if (!toast) return null;
  return (
    <div
      role="status"
      className={cn(
        "animate-slide-up-in fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-xl",
        toast.type === "ok" ? "bg-ink" : "bg-red-600",
      )}
    >
      {toast.text}
    </div>
  );
}

export function CollectionManager({ collection }: { collection: CollectionKey }) {
  const def: CollectionDef = COLLECTION_DEFS[collection];
  const [items, setItems] = useState<Obj[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<{ index: number | null; draft: Obj; slugTouched: boolean } | null>(null);
  const [formError, setFormError] = useState("");
  const { toast, setToast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const res = await fetch(`/api/admin/content/${collection}`, { cache: "no-store" });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const json = (await res.json()) as { items?: Obj[]; error?: string };
      if (!res.ok) throw new Error(json.error || "Failed to load");
      setItems(json.items ?? []);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [collection]);

  useEffect(() => {
    load();
  }, [load]);

  async function persist(next: Obj[], message = "Saved — website updated ✓") {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/content/${collection}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: next }),
      });
      const json = (await res.json().catch(() => ({}))) as { items?: Obj[]; error?: string };
      if (!res.ok) throw new Error(json.error || "Save failed");
      setItems(json.items ?? next);
      setToast({ type: "ok", text: message });
      return true;
    } catch (err) {
      setToast({ type: "error", text: err instanceof Error ? err.message : "Save failed" });
      return false;
    } finally {
      setSaving(false);
    }
  }

  function startNew() {
    const draft: Obj = { id: uid(`${collection.slice(0, 3)}-`) };
    for (const f of def.fields) draft[f.name] = defaultValue(f);
    setFormError("");
    setEditing({ index: null, draft, slugTouched: false });
  }

  function startEdit(index: number) {
    setFormError("");
    setEditing({ index, draft: structuredClone(items[index]!), slugTouched: true });
  }

  function updateDraft(name: string, value: unknown) {
    setEditing((prev) => {
      if (!prev) return prev;
      const draft = { ...prev.draft, [name]: value };
      let slugTouched = prev.slugTouched;
      const slugField = def.fields.find((f) => f.type === "slug");
      if (slugField) {
        if (name === slugField.name) slugTouched = true;
        else if (!slugTouched && name === slugField.from) draft[slugField.name] = slugify(String(value ?? ""));
      }
      return { ...prev, draft, slugTouched };
    });
  }

  async function saveDraft() {
    if (!editing) return;
    for (const f of def.fields) {
      const v = editing.draft[f.name];
      const empty = v == null || v === "" || (Array.isArray(v) && v.filter((x) => String(x).trim()).length === 0);
      if (f.required && empty) {
        setFormError(`"${f.label}" is required.`);
        return;
      }
    }
    const next = editing.index === null ? [...items, editing.draft] : items.map((it, i) => (i === editing.index ? editing.draft : it));
    if (await persist(next)) setEditing(null);
  }

  function move(index: number, dir: -1 | 1) {
    const j = index + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[index], next[j]] = [next[j]!, next[index]!];
    persist(next, "Order updated ✓");
  }

  function remove(index: number) {
    const title = String(items[index]?.[def.titleField] ?? "this item");
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    persist(items.filter((_, i) => i !== index), "Deleted ✓");
  }

  function duplicate(index: number) {
    const copy = structuredClone(items[index]!);
    copy.id = uid(`${collection.slice(0, 3)}-`);
    copy[def.titleField] = `${copy[def.titleField]} (copy)`;
    if ("slug" in copy) copy.slug = `${copy.slug}-copy`;
    copy.published = false;
    persist([...items.slice(0, index + 1), copy, ...items.slice(index + 1)], "Duplicated (hidden until published) ✓");
  }

  function togglePublished(index: number) {
    const next = items.map((it, i) => (i === index ? { ...it, published: it.published === false } : it));
    persist(next, next[index]!.published === false ? "Hidden from website ✓" : "Published ✓");
  }

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => !q || JSON.stringify(item).toLowerCase().includes(q));
  }, [items, query]);

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl font-bold">{def.label}</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted">{def.description}</p>
        </div>
        <button type="button" onClick={startNew} className="btn btn-primary btn-sm self-start">
          <Plus className="h-4 w-4" /> Add {def.singular}
        </button>
      </div>

      <label className="relative mt-6 block max-w-sm">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${def.label.toLowerCase()}...`} className="field !py-2.5 !pl-10 text-sm" />
      </label>

      {loadError ? <p className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">{loadError}</p> : null}

      <div className="card mt-6 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-20 text-muted">
            <LoaderCircle className="h-5 w-5 animate-spin" /> Loading...
          </div>
        ) : visible.length ? (
          <ul className="divide-y divide-line">
            {visible.map(({ item, index }) => {
              const title = String(item[def.titleField] ?? "Untitled");
              const subtitle = def.subtitleField ? String(item[def.subtitleField] ?? "") : "";
              const hidden = item.published === false;
              const slug = typeof item.slug === "string" ? item.slug : "";
              return (
                <li key={String(item.id)} className={cn("flex items-center gap-3 px-4 py-3 sm:px-5", hidden && "bg-soft/60")}>
                  <div className="flex flex-col">
                    <button type="button" disabled={saving || index === 0 || !!query} onClick={() => move(index, -1)} className="rounded p-0.5 text-muted hover:text-brand disabled:opacity-25" aria-label="Move up">
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button type="button" disabled={saving || index === items.length - 1 || !!query} onClick={() => move(index, 1)} className="rounded p-0.5 text-muted hover:text-brand disabled:opacity-25" aria-label="Move down">
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </div>
                  <button type="button" onClick={() => startEdit(index)} className="min-w-0 flex-1 text-left">
                    <p className={cn("truncate font-semibold", hidden ? "text-muted" : "text-ink")}>{title}</p>
                    <p className="truncate text-sm text-muted">
                      {subtitle}
                      {hidden ? " · Hidden" : ""}
                    </p>
                  </button>
                  <div className="flex shrink-0 items-center gap-1">
                    {def.publicPath && slug && !hidden ? (
                      <a href={`${def.publicPath}${slug}`} target="_blank" rel="noopener" className="hidden rounded-lg p-2 text-muted hover:bg-soft hover:text-brand sm:block" aria-label="View on website">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : null}
                    <button type="button" disabled={saving} onClick={() => togglePublished(index)} className="rounded-lg p-2 text-muted hover:bg-soft hover:text-brand" aria-label={hidden ? "Publish" : "Hide"} title={hidden ? "Publish" : "Hide from website"}>
                      {hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button type="button" disabled={saving} onClick={() => duplicate(index)} className="hidden rounded-lg p-2 text-muted hover:bg-soft hover:text-brand sm:block" aria-label="Duplicate">
                      <Copy className="h-4 w-4" />
                    </button>
                    <button type="button" onClick={() => startEdit(index)} className="rounded-lg p-2 text-muted hover:bg-soft hover:text-brand" aria-label="Edit">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button type="button" disabled={saving} onClick={() => remove(index)} className="rounded-lg p-2 text-muted hover:bg-red-50 hover:text-red-600" aria-label="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="py-16 text-center text-muted">
            <p>No {def.label.toLowerCase()} yet.</p>
            <button type="button" onClick={startNew} className="btn btn-outline btn-sm mt-4">
              <Plus className="h-4 w-4" /> Add the first one
            </button>
          </div>
        )}
      </div>

      {editing ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
          <div className="animate-fade-in absolute inset-0 bg-ink/60" onClick={() => !saving && setEditing(null)} />
          <div className="animate-modal-in relative flex max-h-[94vh] w-full max-w-[860px] flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <h2 className="font-display text-xl font-bold">
                {editing.index === null ? `New ${def.singular}` : `Edit ${def.singular}`}
              </h2>
              <button type="button" onClick={() => setEditing(null)} className="flex h-9 w-9 items-center justify-center rounded-full border border-line" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid flex-1 gap-5 overflow-y-auto p-6 sm:grid-cols-2">
              {def.fields.map((f) => (
                <div key={f.name} className={cn(f.wide || f.type === "markdown" || f.type === "objectList" ? "sm:col-span-2" : "")}>
                  <span className="field-label">
                    {f.label}
                    {f.required ? <span className="text-pink"> *</span> : null}
                  </span>
                  <FieldInput field={f} value={editing.draft[f.name]} onChange={(v) => updateDraft(f.name, v)} />
                  {f.help ? <p className="mt-1.5 text-xs text-muted">{f.help}</p> : null}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-line px-6 py-4">
              <p className="text-sm font-medium text-red-600">{formError}</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => setEditing(null)} className="btn btn-outline btn-sm">
                  Cancel
                </button>
                <button type="button" onClick={saveDraft} disabled={saving} className="btn btn-primary btn-sm disabled:opacity-60">
                  {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null} Save
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Toast toast={toast} />
    </div>
  );
}
