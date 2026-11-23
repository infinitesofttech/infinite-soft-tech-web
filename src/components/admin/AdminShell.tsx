"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ExternalLink,
  GraduationCap,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  X,
} from "lucide-react";
import { Icon } from "@/components/Icon";
import { COLLECTION_DEFS } from "@/lib/collections";
import { cn } from "@/lib/utils";

const CONTENT_ICONS: Record<string, string> = {
  services: "Layers",
  products: "Package",
  portfolio: "Briefcase",
  internships: "GraduationCap",
  blog: "BookOpen",
  team: "Users",
  testimonials: "MessageCircle",
  faqs: "ClipboardList",
  clients: "Building2",
};

export function AdminShell({ username, children }: { username: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const search = useSearchParams();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname, search]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const type = search.get("type");
  const main = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, active: pathname === "/admin" },
    { href: "/admin/leads", label: "Leads & Enquiries", icon: Inbox, active: pathname === "/admin/leads" && type !== "internship" },
    { href: "/admin/leads?type=internship", label: "Internship Applications", icon: GraduationCap, active: pathname === "/admin/leads" && type === "internship" },
  ];

  const nav = (
    <nav className="flex h-full flex-col">
      <div className="flex h-[72px] items-center justify-between px-5">
        <Link href="/admin" prefetch={false} className="rounded-xl bg-white px-3 py-2">
          <Image src="/images/logo.png" alt="Infinite Soft Tech" width={1200} height={300} sizes="120px" className="h-8 w-auto" />
        </Link>
        <button type="button" className="text-white/70 lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {main.map(({ href, label, icon: I, active }) => (
            <li key={href}>
              <Link prefetch={false}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition",
                  active ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/5 hover:text-white",
                )}
              >
                <I className="h-[18px] w-[18px]" /> {label}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-widest text-white/35">Website Content</p>
          <ul className="mt-2 space-y-1">
            {Object.values(COLLECTION_DEFS).map((def) => {
              const href = `/admin/content/${def.key}`;
              const active = pathname === href;
              return (
                <li key={def.key}>
                  <Link prefetch={false}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition",
                      active ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/5 hover:text-white",
                    )}
                  >
                    <Icon name={CONTENT_ICONS[def.key]} className="h-[18px] w-[18px]" /> {def.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link prefetch={false}
                href="/admin/settings"
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition",
                  pathname === "/admin/settings" ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/5 hover:text-white",
                )}
              >
                <Settings className="h-[18px] w-[18px]" /> Site Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="space-y-1 border-t border-white/10 p-3">
        <a href="/" target="_blank" rel="noopener" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium text-white/65 hover:bg-white/5 hover:text-white">
          <ExternalLink className="h-[18px] w-[18px]" /> View Website
        </a>
        <button type="button" onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium text-white/65 hover:bg-white/5 hover:text-white">
          <LogOut className="h-[18px] w-[18px]" /> Logout
        </button>
        <p className="px-3 pt-2 text-xs text-white/35">Signed in as {username}</p>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen lg:pl-[260px]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] bg-ink lg:block">{nav}</aside>
      <div className={cn("fixed inset-0 z-50 lg:hidden", open ? "visible" : "invisible")}>
        <div className={cn("absolute inset-0 bg-ink/60 transition-opacity", open ? "opacity-100" : "opacity-0")} onClick={() => setOpen(false)} />
        <aside className={cn("absolute inset-y-0 left-0 w-[270px] bg-ink transition-transform duration-300", open ? "translate-x-0" : "-translate-x-full")}>{nav}</aside>
      </div>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white/90 px-4 backdrop-blur lg:hidden">
        <button type="button" onClick={() => setOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-line" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-display font-semibold">Admin Panel</span>
      </header>
      <main className="mx-auto max-w-[1200px] p-4 sm:p-6 lg:p-10">{children}</main>
    </div>
  );
}
