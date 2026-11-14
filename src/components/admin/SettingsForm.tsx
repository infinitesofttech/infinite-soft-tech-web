"use client";

import { useEffect, useState } from "react";
import { LoaderCircle, Save } from "lucide-react";
import { SETTINGS_FIELDS } from "@/lib/collections";
import { cn } from "@/lib/utils";
import { Toast } from "./CollectionManager";
import { FieldInput } from "./FieldInput";

type Obj = Record<string, unknown>;

export function SettingsForm() {
  const [settings, setSettings] = useState<Obj | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [toast, setToast] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/content/settings", { cache: "no-store" })
      .then(async (res) => {
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        const json = (await res.json()) as { settings?: Obj; error?: string };
        if (!res.ok || !json.settings) throw new Error(json.error || "Failed to load settings");
        setSettings(json.settings);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  async function save() {
    if (!settings) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      const json = (await res.json().catch(() => ({}))) as { settings?: Obj; error?: string };
      if (!res.ok || !json.settings) throw new Error(json.error || "Save failed");
      setSettings(json.settings);
      setDirty(false);
      setToast({ type: "ok", text: "Settings saved — website updated ✓" });
    } catch (err) {
      setToast({ type: "error", text: err instanceof Error ? err.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  if (error) return <p className="rounded-xl bg-red-50 p-4 text-sm text-red-600">{error}</p>;
  if (!settings)
    return (
      <div className="flex items-center justify-center gap-2 py-20 text-muted">
        <LoaderCircle className="h-5 w-5 animate-spin" /> Loading...
      </div>
    );

  return (
    <div className="pb-24">
      <h1 className="font-display text-3xl font-bold">Site Settings</h1>
      <p className="mt-1 text-sm text-muted">Company details, contact information, hero text, social links and counters used across the website.</p>

      <div className="mt-8 space-y-6">
        {SETTINGS_FIELDS.map((section) => (
          <section key={section.section} className="card p-6">
            <h2 className="font-display text-lg font-semibold">{section.section}</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {section.fields.map((f) => (
                <div key={f.name} className={cn(f.wide || f.type === "objectList" ? "sm:col-span-2" : "")}>
                  <span className="field-label">{f.label}</span>
                  <FieldInput
                    field={f}
                    value={settings[f.name]}
                    onChange={(v) => {
                      setSettings((s) => ({ ...(s ?? {}), [f.name]: v }));
                      setDirty(true);
                    }}
                  />
                  {f.help ? <p className="mt-1.5 text-xs text-muted">{f.help}</p> : null}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-line bg-white/95 backdrop-blur lg:left-[260px]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
          <p className="text-sm text-muted">{dirty ? "You have unsaved changes." : "All changes saved."}</p>
          <button type="button" onClick={save} disabled={saving || !dirty} className="btn btn-primary btn-sm disabled:opacity-50">
            {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save Settings
          </button>
        </div>
      </div>
      <Toast toast={toast} />
    </div>
  );
}
