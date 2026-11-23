"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { Icon } from "@/components/Icon";
import { NAV_LINKS, SERVICE_CATEGORIES } from "@/lib/site";
import { SOLUTIONS } from "@/lib/solutions";
import { cn } from "@/lib/utils";
import { openQuote } from "./QuoteButton";

export interface NavService {
  slug: string;
  title: string;
  short: string;
  icon: string;
  category: string;
}
export interface NavProduct {
  slug: string;
  name: string;
  tagline: string;
  icon: string;
}

type MenuKey = "services" | "solutions" | "products" | null;

export function Navbar({
  services,
  products,
  phone,
  phoneDisplay,
}: {
  services: NavService[];
  products: NavProduct[];
  phone: string;
  phoneDisplay: string;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const openMenu = (key: MenuKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenu(key);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenu(null), 160);
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 shadow-[0_8px_30px_-12px_rgba(16,24,64,0.18)] backdrop-blur-xl" : "bg-white",
      )}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-6 lg:h-[78px]">
        <Link href="/" className="relative shrink-0" aria-label="Infinite Soft Tech — Home">
          <Image
            src="/images/logo.png"
            alt="Infinite Soft Tech logo"
            width={1100}
            height={400}
            preload
            sizes="150px"
            className="h-[46px] w-auto lg:h-[52px]"
          />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              if (link.mega) {
                const key = link.mega;
                return (
                  <li key={link.href} onMouseEnter={() => openMenu(key)} onMouseLeave={scheduleClose} className="static">
                    <button
                      type="button"
                      aria-expanded={menu === key}
                      aria-haspopup="true"
                      onClick={() => setMenu(menu === key ? null : key)}
                      className={cn(
                        "flex items-center gap-1 rounded-full px-3 py-2 text-[15px] font-medium transition-colors xl:px-3.5",
                        active || menu === key ? "text-brand" : "text-ink-3 hover:text-brand",
                      )}
                    >
                      {link.label}
                      <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", menu === key && "rotate-180")} />
                    </button>
                  </li>
                );
              }
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative flex items-center gap-1.5 rounded-full px-3 py-2 text-[15px] font-medium transition-colors xl:px-3.5",
                      active ? "text-brand" : "text-ink-3 hover:text-brand",
                    )}
                  >
                    {link.label}
                    {link.badge ? (
                      <span className="bg-brand-gradient rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase leading-none text-white">
                        {link.badge}
                      </span>
                    ) : null}
                    {active ? <span className="bg-brand-gradient absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${phone}`}
            className="hidden items-center gap-2.5 text-sm font-semibold text-ink xl:flex"
            aria-label={`Call ${phoneDisplay}`}
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand">
              <span className="animate-pulse-ring absolute inset-0 rounded-full bg-brand/20" aria-hidden="true" />
              <Phone className="relative h-4 w-4" />
            </span>
          </a>
          <button type="button" onClick={() => openQuote()} className="btn btn-primary btn-sm hidden sm:inline-flex">
            Get Free Quote <ArrowRight className="arrow h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Desktop mega menus */}
      <div
        className={cn(
          "absolute inset-x-0 top-full hidden transition-all duration-300 lg:block",
          menu ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
        )}
        onMouseEnter={() => menu && openMenu(menu)}
        onMouseLeave={scheduleClose}
      >
        <div className="container-x pt-2">
          {menu === "services" ? (
            <div className="grid grid-cols-[1fr_1fr_1fr_280px] gap-6 rounded-3xl border border-line bg-white p-6 shadow-[0_30px_60px_-20px_rgba(16,24,64,0.25)]">
              {SERVICE_CATEGORIES.map((cat) => (
                <div key={cat}>
                  <p className="mb-3 px-3 text-xs font-bold uppercase tracking-widest text-muted">{cat}</p>
                  <ul className="space-y-1">
                    {services
                      .filter((s) => s.category === cat)
                      .map((s) => (
                        <li key={s.slug}>
                          <Link href={`/services/${s.slug}`} className="group flex items-start gap-3 rounded-2xl p-3 transition hover:bg-soft">
                            <span className="icon-tile !h-10 !w-10 !rounded-xl">
                              <Icon name={s.icon} className="h-5 w-5" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[15px] font-semibold text-ink group-hover:text-brand">{s.title}</span>
                              <span className="line-clamp-1 text-[13px] text-muted">{s.short}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
              <div className="relative overflow-hidden rounded-2xl bg-ink p-6 text-white">
                <div className="animate-blob absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet/50 blur-2xl" aria-hidden="true" />
                <div className="relative">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/60">For Enterprises</p>
                  <p className="mt-2 font-display text-xl font-bold leading-snug">Need a custom ERP or CRM?</p>
                  <p className="mt-2 text-sm text-white/70">Get a free consultation and a clear roadmap for your business software.</p>
                  <button type="button" onClick={() => openQuote("Custom ERP Development")} className="btn btn-white btn-sm mt-5">
                    Book Free Consultation
                  </button>
                  <Link href="/services" className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white">
                    View all services <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
          {menu === "solutions" ? (
            <div className="ml-auto mr-[28%] w-[460px] rounded-3xl border border-line bg-white p-4 shadow-[0_30px_60px_-20px_rgba(16,24,64,0.25)]">
              {SOLUTIONS.map((sol) => (
                <Link key={sol.slug} href={`/solutions/${sol.slug}`} className="group flex items-center gap-4 rounded-2xl p-3 transition hover:bg-soft">
                  <span className="icon-tile !h-12 !w-12">
                    <Icon name={sol.icon} className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink group-hover:text-brand">{sol.name}</span>
                    <span className="text-sm text-muted">Book a free demo</span>
                  </span>
                </Link>
              ))}
            </div>
          ) : null}
          {menu === "products" ? (
            <div className="ml-auto mr-[22%] w-[460px] rounded-3xl border border-line bg-white p-4 shadow-[0_30px_60px_-20px_rgba(16,24,64,0.25)]">
              {products.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}`} className="group flex items-center gap-4 rounded-2xl p-3 transition hover:bg-soft">
                  <span className="icon-tile !h-12 !w-12">
                    <Icon name={p.icon} className="h-6 w-6" />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink group-hover:text-brand">{p.name}</span>
                    <span className="text-sm text-muted">{p.tagline}</span>
                  </span>
                </Link>
              ))}
              <Link href="/products" className="mt-1 flex items-center justify-center gap-1.5 rounded-2xl bg-soft p-3 text-sm font-semibold text-brand">
                All products <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </header>

      {/* Mobile drawer (outside <header> so backdrop-filter doesn't trap position:fixed) */}
      <div className={cn("fixed inset-0 z-[70] lg:hidden", mobileOpen ? "visible" : "invisible")} aria-hidden={!mobileOpen}>
        <div
          className={cn("absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-300", mobileOpen ? "opacity-100" : "opacity-0")}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            "absolute right-0 top-0 flex h-full w-[88%] max-w-[380px] flex-col bg-white shadow-2xl transition-transform duration-500",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
            <Image src="/images/logo.png" alt="Infinite Soft Tech" width={1100} height={400} sizes="130px" className="h-10 w-auto" />
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
            <ul className="space-y-1">
              {NAV_LINKS.map((link) => {
                if (link.mega) {
                  const key = link.mega;
                  const open = mobileSection === key;
                  const items =
                    key === "services"
                      ? services.map((s) => ({ href: `/services/${s.slug}`, label: s.title, icon: s.icon }))
                      : key === "solutions"
                        ? SOLUTIONS.map((sol) => ({ href: `/solutions/${sol.slug}`, label: sol.name, icon: sol.icon }))
                        : products.map((p) => ({ href: `/products/${p.slug}`, label: p.name, icon: p.icon }));
                  return (
                    <li key={link.href}>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[16px] font-semibold text-ink"
                        aria-expanded={open}
                        onClick={() => setMobileSection(open ? null : key)}
                      >
                        {link.label}
                        <ChevronDown className={cn("h-5 w-5 transition-transform", open && "rotate-180")} />
                      </button>
                      <div className={cn("grid transition-all duration-300", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                        <ul className="overflow-hidden pl-3">
                          {key !== "solutions" ? (
                            <li>
                              <Link href={link.href} className="block rounded-lg px-4 py-2 text-sm font-semibold text-brand">
                                View all {link.label.toLowerCase()}
                              </Link>
                            </li>
                          ) : null}
                          {items.map((item) => (
                            <li key={item.href}>
                              <Link href={item.href} className="flex items-center gap-3 rounded-lg px-4 py-2 text-[15px] text-body">
                                <Icon name={item.icon} className="h-4 w-4 text-brand" />
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                }
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-2 rounded-xl px-4 py-3 text-[16px] font-semibold",
                        isActive(link.href) ? "bg-brand-50 text-brand" : "text-ink",
                      )}
                    >
                      {link.label}
                      {link.badge ? (
                        <span className="bg-brand-gradient rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">{link.badge}</span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="space-y-3 border-t border-line p-5">
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={() => {
                setMobileOpen(false);
                openQuote();
              }}
            >
              Get Free Quote <ArrowRight className="arrow h-4 w-4" />
            </button>
            <a href={`tel:${phone}`} className="btn btn-outline w-full">
              <Phone className="h-4 w-4" /> {phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
