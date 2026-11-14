import { createLead, LEAD_TYPES } from "@/lib/leads";
import type { Lead, LeadType } from "@/lib/types";

const FIELD_LIMITS: Record<LeadType, Record<string, number>> = {
  contact: { company: 150, service: 120, budget: 60, projectType: 60, message: 3000 },
  quote: { company: 150, service: 120, budget: 60, projectType: 60, message: 3000 },
  internship: { college: 150, course: 100, year: 40, program: 120, duration: 40, mode: 60, profileLink: 300, message: 2000 },
};
const REQUIRED: Record<LeadType, string[]> = {
  contact: ["message"],
  quote: ["message"],
  internship: ["college", "course", "program"],
};
const LABELS: Record<string, string> = {
  message: "Message",
  college: "College",
  course: "Course",
  program: "Internship program",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.replace(/\u0000/g, "").trim().slice(0, max) : "";
}

function bad(error: string) {
  return Response.json({ error }, { status: 400 });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

async function notify(lead: Lead) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!key || !to) return;
  const rows = [
    ["Type", lead.type],
    ["Name", lead.name],
    ["E-mail", lead.email],
    ["Phone", lead.phone],
    ...Object.entries(lead.data),
    ["Page", lead.source ?? ""],
  ]
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 12px;white-space:pre-wrap">${escapeHtml(String(v))}</td></tr>`)
    .join("");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.LEAD_FROM_EMAIL || "Infinite Soft Tech <onboarding@resend.dev>",
        to: [to],
        reply_to: lead.email,
        subject: `New ${lead.type} enquiry from ${lead.name}`,
        html: `<h2>New ${escapeHtml(lead.type)} enquiry</h2><table>${rows}</table>`,
      }),
      signal: controller.signal,
    });
  } catch (err) {
    console.error("[leads] e-mail notification failed", err);
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return bad("Invalid request.");
  }

  const type = body.type as LeadType;
  if (!LEAD_TYPES.includes(type)) return bad("Invalid form type.");

  // Spam protection: hidden honeypot field and impossibly fast submissions are silently ignored.
  if (clean(body.website, 200) || (typeof body.elapsed === "number" && body.elapsed < 1500)) {
    return Response.json({ ok: true });
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 150).toLowerCase();
  const phone = clean(body.phone, 20);
  if (name.length < 2) return bad("Please enter your name.");
  if (!EMAIL_RE.test(email)) return bad("Please enter a valid e-mail address.");
  if (phone.replace(/\D/g, "").length < 7) return bad("Please enter a valid phone number.");

  const rawData = (body.data && typeof body.data === "object" ? body.data : {}) as Record<string, unknown>;
  const data: Record<string, string> = {};
  for (const [field, max] of Object.entries(FIELD_LIMITS[type])) {
    const v = clean(rawData[field], max);
    if (v) data[field] = v;
  }
  for (const field of REQUIRED[type]) {
    if (!data[field]) return bad(`Please fill in: ${LABELS[field] ?? field}.`);
  }

  try {
    const lead = await createLead({ type, name, email, phone, data, source: clean(body.source, 200) });
    await notify(lead);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[leads] failed to save", err);
    return Response.json({ error: "Could not send right now. Please call or WhatsApp us." }, { status: 500 });
  }
}
