import { getKV } from "./store";
import type { Lead, LeadStatus, LeadType } from "./types";
import { uid } from "./utils";

const PREFIX = "lead-";

export const LEAD_STATUSES: LeadStatus[] = ["new", "contacted", "in-progress", "converted", "closed"];
export const LEAD_TYPES: LeadType[] = ["contact", "quote", "internship"];

export async function createLead(input: Omit<Lead, "id" | "createdAt" | "status">) {
  const lead: Lead = {
    ...input,
    id: `${PREFIX}${uid()}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };
  await getKV("leads").setJSON(lead.id, lead);
  return lead;
}

export async function listLeads(): Promise<Lead[]> {
  const kv = getKV("leads");
  const keys = await kv.list(PREFIX);
  const leads: Lead[] = [];
  // Fetch in small batches to stay fast without overloading the store.
  for (let i = 0; i < keys.length; i += 25) {
    const chunk = await Promise.all(keys.slice(i, i + 25).map((k) => kv.getJSON<Lead>(k)));
    for (const lead of chunk) if (lead) leads.push(lead);
  }
  return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function updateLead(id: string, patch: { status?: LeadStatus; notes?: string }) {
  if (!id.startsWith(PREFIX)) return null;
  const kv = getKV("leads");
  const lead = await kv.getJSON<Lead>(id);
  if (!lead) return null;
  const next: Lead = {
    ...lead,
    ...(patch.status && LEAD_STATUSES.includes(patch.status) ? { status: patch.status } : {}),
    ...(typeof patch.notes === "string" ? { notes: patch.notes.slice(0, 5000) } : {}),
    updatedAt: new Date().toISOString(),
  };
  await kv.setJSON(id, next);
  return next;
}

export async function deleteLead(id: string) {
  if (!id.startsWith(PREFIX)) return false;
  await getKV("leads").delete(id);
  return true;
}
