"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Mail, Phone, X } from "lucide-react";
import { LeadForm } from "./Forms";
import { OPEN_QUOTE_EVENT } from "./QuoteButton";

export function QuoteModal({
  services,
  whatsapp,
  phone,
  phoneDisplay,
  email,
}: {
  services: string[];
  whatsapp: string;
  phone: string;
  phoneDisplay: string;
  email: string;
}) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ service?: string }>).detail;
      lastFocus.current = document.activeElement as HTMLElement | null;
      setService(detail?.service ?? "");
      setOpen(true);
    };
    window.addEventListener(OPEN_QUOTE_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_QUOTE_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => dialogRef.current?.querySelector<HTMLInputElement>("input[name=name]")?.focus(), 60);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
      lastFocus.current?.focus?.();
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6" role="presentation">
      <div className="animate-fade-in absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={close} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        className="animate-modal-in relative grid max-h-[94vh] w-full max-w-[980px] overflow-hidden rounded-t-[28px] bg-white shadow-2xl sm:rounded-[28px] lg:grid-cols-[360px_1fr]"
      >
        <aside className="bg-brand-gradient relative hidden overflow-hidden p-9 text-white lg:block">
          <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="animate-blob absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />
          <div className="relative">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/70">Free Consultation</p>
            <h2 id="quote-title" className="mt-3 text-[28px] font-bold leading-tight !text-white">
              Let&apos;s build something great together.
            </h2>
            <ul className="mt-8 space-y-4 text-[15px]">
              {[
                "Free requirement discussion & estimate",
                "Quick response on working days",
                "Web, App, ERP, CRM & AI experts",
                "Transparent process & regular updates",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10 space-y-3 border-t border-white/20 pt-6 text-sm">
              <a href={`tel:${phone}`} className="flex items-center gap-3 hover:underline">
                <Phone className="h-4 w-4" /> {phoneDisplay}
              </a>
              <a href={`mailto:${email}`} className="flex items-center gap-3 hover:underline">
                <Mail className="h-4 w-4" /> {email}
              </a>
            </div>
          </div>
        </aside>
        <div className="overflow-y-auto p-6 sm:p-9">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-gradient text-sm font-bold uppercase tracking-widest">Get a Free Quote</p>
              <p className="mt-1 font-display text-2xl font-bold text-ink">Tell us about your project</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition hover:rotate-90 hover:border-brand hover:text-brand"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <LeadForm type="quote" services={services} defaultService={service} whatsapp={whatsapp} compact />
        </div>
      </div>
    </div>
  );
}
