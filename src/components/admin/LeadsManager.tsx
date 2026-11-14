"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, LoaderCircle, Mail, Phone, RefreshCw, Search, Trash2, X } from "lucide-react";
import { WhatsappIcon } from "@/components/SocialIcons";
import type { Lead, LeadStatus } from "@/lib/types";
import { cn, whatsappLink } from "@/lib/utils";

const STATUSES: LeadStatus[] = ["new", "contacted", "in-progress", "converted", "closed"];
const STATUS_STYLE: Record<LeadStatus, string> = {
  new: "bg-brand-50 text-brand",
  contacted: "bg-amber-50 text-amber-700",
  "in-progress": "bg-violet-50 text-violet",
  converted: "bg-emerald-50 text-emerald-700",
  closed: "bg-soft-2 text-muted",
};
const TABS = [
  { key: "all", label: "All" },
  { key: "contact", label: "Contact" },
  { key: "quote", label: "Quote requests" },
  { key: "internship", label: "Internship" },
];
const FIELD_LABELS: Record<string, string> = {
  company: "Company",
  service: "Service",
  budget: "Budget",
  projectType: "Project type",
  message: "Message",
  college: "College",
  course: "Course",
  year: "Year",
  program: "Program",
  duration: "Duration",
  mode: "Mode",
  profileLink: "Resume / profile",
};

/** Indian 10-digit numbers get the 91 country code for WhatsApp links. */
function waNumber(phone: string) {
  const digits = phone.replace(/\D/g, "").replace(/^0+/, "");
  return digits.length === 10 ? `91${digits}` : digits;
}

function fmt(iso: string) {
  return new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function toCsv(leads: Lead[]) {
  const keys = Array.from(new Set(leads.flatMap((l) => Object.keys(l.data))));
  const header = ["Date", "Type", "Status", "Name", "Email", "Phone", ...keys.map((k) => FIELD_LABELS[k] ?? k), "Notes", "Page"];
  const esc = (v: string) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const rows = leads.map((l) =>
    [fmt(l.createdAt), l.type, l.status, l.name, l.email, l.phone, ...keys.map((k) => l.data[k] ?? ""), l.notes ?? "", l.source ?? ""].map(esc).join(","),
  );
  return [header.map(esc).join(","), ...rows].join("\n");
}

export function LeadsManager() {
  const router = useRouter();
  const params = useSearchParams();
  const tab = params.get("type") ?? "all";
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"" | LeadStatus>("");
  const [openId, setOpenId] = useState<string | null>(params.get("open"));

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/leads", { cache: "no-store" });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const json = (await res.json()) as { leads?: Lead[]; error?: string };
      if (!res.ok) throw new Error(json.error || "Failed to load");
      setLeads(json.leads ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (tab !== "all" && l.type !== tab) return false;
      if (status && l.status !== status) return false;
      if (!q) return true;
      return [l.name, l.email, l.phone, ...Object.values(l.data), l.notes ?? ""].some((v) => v.toLowerCase().includes(q));
    });
  }, [leads, tab, status, query]);

  const open = leads.find((l) => l.id === openId) ?? null;

  async function patch(id: string, update: { status?: LeadStatus; notes?: string }) {
    const res = await fetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...update }),
    });
    const json = (await res.json().catch(() => ({}))) as { lead?: Lead; error?: string };
    if (!res.ok || !json.lead) throw new Error(json.error || "Update failed");
    setLeads((prev) => prev.map((l) => (l.id === id ? json.lead! : l)));
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this lead permanently?")) return;
    const res = await fetch(`/api/admin/leads?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    if (res.ok) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      setOpenId(null);
    } else {
      window.alert("Delete failed. Please try again.");
    }
  }

  function exportCsv() {
    const blob = new Blob(["﻿" + toCsv(filtered)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${tab}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-3xl font-bold">{tab === "internship" ? "Internship Applications" : "Leads & Enquiries"}</h1>
          <p className="mt-1 text-sm text-muted">Every form submission from the website appears here.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={load} className="btn btn-outline btn-sm">
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} /> Refresh
          </button>
          <button type="button" onClick={exportCsv} disabled={!filtered.length} className="btn btn-primary btn-sm disabled:opacity-50">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar flex gap-1 overflow-x-auto rounded-full border border-line bg-white p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => router.replace(t.key === "all" ? "/admin/leads" : `/admin/leads?type=${t.key}`)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
                tab === t.key ? "bg-ink text-white" : "text-ink-3 hover:bg-soft",
              )}
            >
              {t.label}
              <span className="ml-1.5 opacity-60">{t.key === "all" ? leads.length : leads.filter((l) => l.type === t.key).length}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <label className="relative flex-1 lg:w-64">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, phone, e-mail..." className="field !py-2.5 !pl-10 text-sm" />
          </label>
          <select value={status} onChange={(e) => setStatus(e.target.value as "" | LeadStatus)} className="field !w-auto !py-2.5 text-sm">
            <option value="">All status</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error ? <p className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">{error}</p> : null}

      <div className="card mt-6 overflow-hidden">
        {loading && !leads.length ? (
          <div className="flex items-center justify-center gap-2 py-20 text-muted">
            <LoaderCircle className="h-5 w-5 animate-spin" /> Loading...
          </div>
        ) : filtered.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-soft text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Contact</th>
                  <th className="px-5 py-3 font-semibold">{tab === "internship" ? "Program" : "Service"}</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((l) => (
                  <tr key={l.id} className="cursor-pointer transition hover:bg-soft/70" onClick={() => setOpenId(l.id)}>
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-ink">{l.name}</p>
                      <p className="text-xs capitalize text-muted">{l.type}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-ink-3">{l.phone}</p>
                      <p className="text-xs text-muted">{l.email}</p>
                    </td>
                    <td className="max-w-[220px] truncate px-5 py-3.5 text-ink-3">{l.data.service || l.data.program || "—"}</td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-muted">{fmt(l.createdAt)}</td>
                    <td className="px-5 py-3.5" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={l.status}
                        onChange={(e) => patch(l.id, { status: e.target.value as LeadStatus }).catch((err) => window.alert(err.message))}
                        className={cn("rounded-full border-0 px-3 py-1.5 text-xs font-bold capitalize", STATUS_STYLE[l.status])}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="py-20 text-center text-muted">No leads found.</p>
        )}
      </div>

      {open ? <LeadDrawer lead={open} onClose={() => setOpenId(null)} onPatch={patch} onDelete={remove} /> : null}
    </div>
  );
}

function LeadDrawer({
  lead,
  onClose,
  onPatch,
  onDelete,
}: {
  lead: Lead;
  onClose: () => void;
  onPatch: (id: string, u: { status?: LeadStatus; notes?: string }) => Promise<void>;
  onDelete: (id: string) => void;
}) {
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setNotes(lead.notes ?? "");
    setSaved(false);
  }, [lead.id, lead.notes]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function saveNotes() {
    setSaving(true);
    try {
      await onPatch(lead.id, { notes });
      setSaved(true);
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="animate-fade-in absolute inset-0 bg-ink/50" onClick={onClose} />
      <aside className="animate-slide-up-in absolute inset-y-0 right-0 flex w-full max-w-[520px] flex-col bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-line p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">{lead.type} lead</p>
            <h2 className="mt-1 font-display text-2xl font-bold">{lead.name}</h2>
            <p className="mt-1 text-sm text-muted">{fmt(lead.createdAt)}</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full border border-line" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          <div className="grid grid-cols-3 gap-2">
            <a href={`tel:${lead.phone}`} className="btn btn-outline btn-sm">
              <Phone className="h-4 w-4" /> Call
            </a>
            <a href={whatsappLink(waNumber(lead.phone), `Hi ${lead.name}, this is Infinite Soft Tech.`)} target="_blank" rel="noopener noreferrer" className="btn btn-sm bg-[#25D366] text-white">
              <WhatsappIcon width={15} height={15} /> WhatsApp
            </a>
            <a href={`mailto:${lead.email}`} className="btn btn-outline btn-sm">
              <Mail className="h-4 w-4" /> E-mail
            </a>
          </div>

          <dl className="divide-y divide-line rounded-2xl border border-line">
            {[
              ["E-mail", lead.email],
              ["Phone", lead.phone],
              ...Object.entries(lead.data).map(([k, v]) => [FIELD_LABELS[k] ?? k, v] as [string, string]),
              ["Submitted from", lead.source ?? "—"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[130px_1fr] gap-3 px-4 py-3 text-sm">
                <dt className="font-semibold text-muted">{k}</dt>
                <dd className="whitespace-pre-wrap break-words text-ink">
                  {/^https?:\/\//.test(v) ? (
                    <a href={v} target="_blank" rel="noopener noreferrer" className="text-brand underline">
                      {v}
                    </a>
                  ) : (
                    v
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <label className="block">
            <span className="field-label">Status</span>
            <select
              value={lead.status}
              onChange={(e) => onPatch(lead.id, { status: e.target.value as LeadStatus }).catch((err) => window.alert(err.message))}
              className="field capitalize"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="field-label">Internal notes</span>
            <textarea
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setSaved(false);
              }}
              rows={5}
              className="field"
              placeholder="Call summary, follow-up date, quotation sent..."
            />
          </label>
          <div className="flex items-center gap-3">
            <button type="button" onClick={saveNotes} disabled={saving} className="btn btn-primary btn-sm disabled:opacity-60">
              {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null} Save notes
            </button>
            {saved ? <span className="text-sm font-medium text-success">Saved ✓</span> : null}
          </div>
        </div>
        <div className="border-t border-line p-4">
          <button type="button" onClick={() => onDelete(lead.id)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">
            <Trash2 className="h-4 w-4" /> Delete lead
          </button>
        </div>
      </aside>
    </div>
  );
}
