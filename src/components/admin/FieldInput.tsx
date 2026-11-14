"use client";

import { useRef, useState } from "react";
import { ImagePlus, LoaderCircle, Plus, Trash2 } from "lucide-react";
import { Icon, ICON_NAMES } from "@/components/Icon";
import type { FieldDef } from "@/lib/collections";
import { cn } from "@/lib/utils";

type Obj = Record<string, unknown>;

export function defaultValue(field: FieldDef): unknown {
  switch (field.type) {
    case "list":
    case "objectList":
      return [];
    case "boolean":
      return true;
    case "number":
      return field.name === "rating" ? 5 : 0;
    case "select":
      return field.options?.[0] ?? "";
    case "date":
      return new Date().toISOString().slice(0, 10);
    default:
      return field.name === "author" ? "Infinite Soft Tech" : "";
  }
}

function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const json = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !json.url) throw new Error(json.error || "Upload failed");
      onChange(json.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input value={value} onChange={(e) => onChange(e.target.value)} className="field" placeholder="https://... or upload an image" />
        <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className="btn btn-outline btn-sm shrink-0 !rounded-xl">
          {uploading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />} Upload
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
        />
      </div>
      {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}
      {value ? (
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="h-16 w-24 rounded-lg border border-line object-cover" />
          <button type="button" onClick={() => onChange("")} className="text-xs font-semibold text-red-600">
            Remove
          </button>
        </div>
      ) : null}
    </div>
  );
}

export function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const str = value == null ? "" : String(value);

  switch (field.type) {
    case "textarea":
      return <textarea value={str} onChange={(e) => onChange(e.target.value)} rows={4} className="field" placeholder={field.placeholder} />;
    case "markdown":
      return (
        <div>
          <textarea value={str} onChange={(e) => onChange(e.target.value)} rows={18} className="field font-mono text-[13px] leading-relaxed" />
          <p className="mt-1.5 text-xs text-muted">
            Markdown: <code>## Heading</code>, <code>**bold**</code>, <code>- list item</code>, <code>[link text](/contact)</code>. Leave a blank line between paragraphs.
          </p>
        </div>
      );
    case "number":
      return <input type="number" value={str} onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))} className="field" />;
    case "date":
      return <input type="date" value={str.slice(0, 10)} onChange={(e) => onChange(e.target.value)} className="field" />;
    case "url":
      return <input type="text" inputMode="url" value={str} onChange={(e) => onChange(e.target.value)} className="field" placeholder={field.placeholder ?? "https://..."} />;
    case "select":
      return (
        <select value={str} onChange={(e) => onChange(e.target.value)} className="field">
          {!field.options?.includes(str) && str ? <option value={str}>{str}</option> : null}
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
    case "boolean":
      return (
        <button
          type="button"
          role="switch"
          aria-checked={value !== false}
          onClick={() => onChange(value === false)}
          className={cn("relative h-7 w-12 rounded-full transition", value !== false ? "bg-brand" : "bg-line")}
        >
          <span className={cn("absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all", value !== false ? "left-6" : "left-1")} />
        </button>
      );
    case "list":
      return (
        <textarea
          value={Array.isArray(value) ? value.join("\n") : str}
          onChange={(e) => onChange(e.target.value.split("\n"))}
          rows={5}
          className="field"
          placeholder="One item per line"
        />
      );
    case "image":
      return <ImageField value={str} onChange={onChange} />;
    case "icon":
      return (
        <div className="flex items-center gap-3">
          <span className="icon-tile !h-11 !w-11 shrink-0">
            <Icon name={str} className="h-5 w-5" />
          </span>
          <select value={str} onChange={(e) => onChange(e.target.value)} className="field">
            <option value="">Select icon</option>
            {ICON_NAMES.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      );
    case "objectList": {
      const rows = (Array.isArray(value) ? value : []) as Obj[];
      const sub = field.fields ?? [];
      return (
        <div className="space-y-3">
          {rows.map((row, i) => (
            <div key={i} className="flex flex-wrap items-end gap-3 rounded-xl border border-line bg-soft/60 p-3">
              {sub.map((sf) => (
                <label key={sf.name} className={cn("block", sf.name === "label" ? "min-w-[180px] flex-[2]" : "w-28 flex-1")}>
                  <span className="field-label !text-xs">{sf.label}</span>
                  <FieldInput
                    field={sf}
                    value={row[sf.name]}
                    onChange={(v) => onChange(rows.map((r, j) => (j === i ? { ...r, [sf.name]: v } : r)))}
                  />
                </label>
              ))}
              <button type="button" onClick={() => onChange(rows.filter((_, j) => j !== i))} className="mb-2 text-red-600" aria-label="Remove row">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => onChange([...rows, Object.fromEntries(sub.map((sf) => [sf.name, defaultValue(sf)]))])}
            className="btn btn-outline btn-sm !rounded-xl"
          >
            <Plus className="h-4 w-4" /> Add row
          </button>
        </div>
      );
    }
    default:
      return <input type="text" value={str} onChange={(e) => onChange(e.target.value)} className="field" placeholder={field.placeholder} />;
  }
}
