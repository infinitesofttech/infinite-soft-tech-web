import Link from "next/link";
import { ArrowRight, GraduationCap, Inbox, MailPlus, Sparkles, TrendingUp } from "lucide-react";
import { Icon } from "@/components/Icon";
import { COLLECTION_DEFS } from "@/lib/collections";
import { COLLECTION_KEYS, readCollection } from "@/lib/content";
import { listLeads } from "@/lib/leads";
import { getKV } from "@/lib/store";
import type { Lead } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

const TYPE_LABEL: Record<Lead["type"], string> = { contact: "Contact", quote: "Quote", internship: "Internship" };
const STATUS_STYLE: Record<Lead["status"], string> = {
  new: "bg-brand-50 text-brand",
  contacted: "bg-amber-50 text-amber-700",
  "in-progress": "bg-violet-50 text-violet",
  converted: "bg-success/10 text-success",
  closed: "bg-soft-2 text-muted",
};

export default async function AdminDashboard() {
  let leads: Lead[] = [];
  let loadError = "";
  try {
    leads = await listLeads();
  } catch (err) {
    console.error(err);
    loadError = "Could not load leads from storage.";
  }
  const counts = await Promise.all(
    COLLECTION_KEYS.map(async (k) => [k, (await readCollection(k).catch(() => [])).length] as const),
  );
  let storage: string = "none";
  try {
    storage = getKV("content").kind;
  } catch {}

  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const cards = [
    { label: "New (unread) leads", value: leads.filter((l) => l.status === "new").length, icon: MailPlus, href: "/admin/leads" },
    { label: "Leads this week", value: leads.filter((l) => new Date(l.createdAt).getTime() > weekAgo).length, icon: TrendingUp, href: "/admin/leads" },
    { label: "Project enquiries", value: leads.filter((l) => l.type !== "internship").length, icon: Inbox, href: "/admin/leads" },
    { label: "Internship applications", value: leads.filter((l) => l.type === "internship").length, icon: GraduationCap, href: "/admin/leads?type=internship" },
  ];

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-brand">Welcome back 👋</p>
          <h1 className="mt-1 font-display text-3xl font-bold">Dashboard</h1>
        </div>
        <span className="inline-flex items-center gap-2 self-start rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-muted">
          <span className={`h-2 w-2 rounded-full ${storage !== "file" && storage !== "none" ? "bg-success" : "bg-amber-500"}`} />
          Storage: {storage === "redis" ? "Upstash Redis (live)" : storage === "netlify-blobs" ? "Netlify Blobs (live)" : storage === "file" ? "Local files (.data folder)" : "Not configured"}
        </span>
      </div>

      {loadError ? <p className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">{loadError}</p> : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: I, href }) => (
          <Link key={label} href={href} className="card card-hover group p-6">
            <div className="flex items-center justify-between">
              <span className="icon-tile !h-11 !w-11">
                <I className="h-5 w-5" />
              </span>
              <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-1 group-hover:text-brand" />
            </div>
            <p className="mt-5 font-display text-4xl font-bold text-ink">{value}</p>
            <p className="mt-1 text-sm text-muted">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <section className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <h2 className="font-display text-lg font-semibold">Latest leads</h2>
            <Link href="/admin/leads" className="text-sm font-semibold text-brand">
              View all
            </Link>
          </div>
          {leads.length ? (
            <ul className="divide-y divide-line">
              {leads.slice(0, 8).map((l) => (
                <li key={l.id}>
                  <Link href={`/admin/leads?type=${l.type === "internship" ? "internship" : "all"}&open=${l.id}`} className="flex items-center gap-4 px-6 py-3.5 transition hover:bg-soft">
                    <span className="bg-brand-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                      {l.name.slice(0, 1).toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-ink">{l.name}</span>
                      <span className="block truncate text-sm text-muted">
                        {TYPE_LABEL[l.type]} · {l.data.service || l.data.program || l.email}
                      </span>
                    </span>
                    <span className={`hidden rounded-full px-2.5 py-1 text-xs font-bold capitalize sm:inline ${STATUS_STYLE[l.status]}`}>{l.status}</span>
                    <span className="shrink-0 text-xs text-muted">{formatDate(l.createdAt)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-6 py-14 text-center text-muted">
              <Inbox className="mx-auto h-10 w-10 opacity-40" />
              <p className="mt-3">No leads yet. Form submissions from the website will appear here.</p>
            </div>
          )}
        </section>

        <section className="card p-6">
          <h2 className="font-display text-lg font-semibold">Website content</h2>
          <ul className="mt-4 space-y-1">
            {counts.map(([key, count]) => (
              <li key={key}>
                <Link href={`/admin/content/${key}`} className="flex items-center justify-between rounded-xl px-3 py-2.5 transition hover:bg-soft">
                  <span className="flex items-center gap-3 text-[15px] font-medium text-ink-3">{COLLECTION_DEFS[key].label}</span>
                  <span className="rounded-full bg-soft-2 px-2.5 py-0.5 text-xs font-bold text-ink-3">{count}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-2xl bg-brand-soft p-4 text-sm text-ink-3">
            <p className="flex items-center gap-2 font-semibold text-ink">
              <Sparkles className="h-4 w-4 text-violet" /> Tip
            </p>
            <p className="mt-1">
              Add real client testimonials and publish a blog post every month — both help your Google ranking and bring more clients.
            </p>
            <Link href="/admin/content/testimonials" className="mt-2 inline-flex items-center gap-1 font-semibold text-brand">
              <Icon name="MessageCircle" className="h-4 w-4" /> Add testimonial
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
