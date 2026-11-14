import { authorizeAdminRequest, unauthorized } from "@/lib/auth";
import { deleteLead, listLeads, updateLead } from "@/lib/leads";
import type { LeadStatus } from "@/lib/types";

export async function GET(request: Request) {
  if (!(await authorizeAdminRequest(request))) return unauthorized();
  try {
    return Response.json({ leads: await listLeads() });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Could not load leads." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await authorizeAdminRequest(request))) return unauthorized();
  const body = (await request.json().catch(() => ({}))) as { id?: string; status?: LeadStatus; notes?: string };
  if (!body.id) return Response.json({ error: "Missing id" }, { status: 400 });
  const lead = await updateLead(body.id, { status: body.status, notes: body.notes });
  if (!lead) return Response.json({ error: "Lead not found" }, { status: 404 });
  return Response.json({ lead });
}

export async function DELETE(request: Request) {
  if (!(await authorizeAdminRequest(request))) return unauthorized();
  const id = new URL(request.url).searchParams.get("id") ?? "";
  const ok = await deleteLead(id);
  if (!ok) return Response.json({ error: "Invalid id" }, { status: 400 });
  return Response.json({ ok: true });
}
