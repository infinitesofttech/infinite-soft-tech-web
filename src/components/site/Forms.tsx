"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { WhatsappIcon } from "@/components/SocialIcons";
import {
  BUDGET_OPTIONS,
  INTERNSHIP_DURATIONS,
  INTERNSHIP_MODES,
  PROJECT_TYPES,
  STUDENT_YEARS,
} from "@/lib/site";
import type { LeadType } from "@/lib/types";
import { cn, whatsappLink } from "@/lib/utils";

export const SELECT_PROGRAM_EVENT = "ist:select-program";

type Status = "idle" | "sending" | "done" | "error";

function useLeadSubmit(type: LeadType) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const data: Record<string, string> = {};
    for (const [k, v] of fd.entries()) {
      if (!["name", "email", "phone", "website"].includes(k) && typeof v === "string" && v.trim()) data[k] = v.trim();
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          name: get("name"),
          email: get("email"),
          phone: get("phone"),
          website: get("website"),
          elapsed: Date.now() - startedAt.current,
          source: window.location.pathname,
          data,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return { status, error, submit, reset: () => setStatus("idle") };
}

function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function Field({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={cn("block", className)}>
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

function SuccessMessage({ title, text, whatsapp, onReset }: { title: string; text: string; whatsapp: string; onReset: () => void }) {
  return (
    <div className="animate-slide-up-in flex flex-col items-center px-2 py-8 text-center" role="status">
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
        <span className="animate-pulse-ring absolute inset-0 rounded-full bg-success/20" />
        <CircleCheck className="relative h-8 w-8" />
      </span>
      <h3 className="mt-5 text-2xl font-bold">{title}</h3>
      <p className="mt-2 max-w-sm text-body">{text}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a
          href={whatsappLink(whatsapp, "Hi Infinite Soft Tech, I just submitted an enquiry on your website.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm bg-[#25D366] text-white hover:-translate-y-0.5"
        >
          <WhatsappIcon width={16} height={16} /> Chat on WhatsApp
        </a>
        <button type="button" onClick={onReset} className="btn btn-sm btn-outline">
          Send another
        </button>
      </div>
    </div>
  );
}

function SubmitButton({ status, label }: { status: Status; label: string }) {
  return (
    <button type="submit" disabled={status === "sending"} className="btn btn-primary btn-lg w-full disabled:opacity-70">
      {status === "sending" ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Send className="arrow h-[18px] w-[18px]" />}
      {status === "sending" ? "Sending..." : label}
    </button>
  );
}

/* ----------------------------- Project enquiry form ----------------------------- */

export function LeadForm({
  type = "contact",
  services,
  defaultService = "",
  whatsapp,
  compact = false,
}: {
  type?: "contact" | "quote";
  services: string[];
  defaultService?: string;
  whatsapp: string;
  compact?: boolean;
}) {
  const { status, error, submit, reset } = useLeadSubmit(type);

  if (status === "done") {
    return (
      <SuccessMessage
        title="Thank you! 🎉"
        text="Your enquiry has reached our team. We usually reply within 24 hours on working days."
        whatsapp={whatsapp}
        onReset={reset}
      />
    );
  }

  return (
    <form onSubmit={submit} className="relative grid gap-4 sm:grid-cols-2" noValidate={false}>
      <Honeypot />
      <Field label="Full name *">
        <input name="name" required maxLength={100} autoComplete="name" className="field" placeholder="Your name" />
      </Field>
      <Field label="Phone / WhatsApp *">
        <input name="phone" required type="tel" maxLength={20} autoComplete="tel" className="field" placeholder="+91 98765 43210" />
      </Field>
      <Field label="E-mail *">
        <input name="email" required type="email" maxLength={150} autoComplete="email" className="field" placeholder="you@company.com" />
      </Field>
      <Field label="Company (optional)">
        <input name="company" maxLength={150} autoComplete="organization" className="field" placeholder="Company name" />
      </Field>
      <Field label="Service you need">
        <select name="service" defaultValue={defaultService} className="field" key={defaultService}>
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
      </Field>
      <Field label="Budget">
        <select name="budget" defaultValue="" className="field">
          <option value="">Select budget</option>
          {BUDGET_OPTIONS.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </Field>
      {!compact ? (
        <Field label="Project type" className="sm:col-span-2">
          <div className="flex flex-wrap gap-2">
            {PROJECT_TYPES.map((p, i) => (
              <label key={p} className="cursor-pointer">
                <input type="radio" name="projectType" value={p} defaultChecked={i === 0} className="peer sr-only" />
                <span className="chip peer-checked:border-brand peer-checked:bg-brand-50 peer-checked:text-brand peer-focus-visible:ring-2 peer-focus-visible:ring-brand/40">
                  {p}
                </span>
              </label>
            ))}
          </div>
        </Field>
      ) : null}
      <Field label="Tell us about your project *" className="sm:col-span-2">
        <textarea
          name="message"
          required
          rows={compact ? 3 : 5}
          maxLength={3000}
          className="field resize-y"
          placeholder="What would you like to build? Any reference websites or apps?"
        />
      </Field>
      {status === "error" ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 sm:col-span-2" role="alert">
          {error}
        </p>
      ) : null}
      <div className="sm:col-span-2">
        <SubmitButton status={status} label={type === "quote" ? "Get My Free Quote" : "Send Message"} />
        <p className="mt-3 text-center text-xs text-muted">🔒 Your details are safe with us. No spam, ever.</p>
      </div>
    </form>
  );
}

/* ----------------------------- Internship application ----------------------------- */

export function InternshipForm({ programs, whatsapp }: { programs: string[]; whatsapp: string }) {
  const { status, error, submit, reset } = useLeadSubmit("internship");
  const [program, setProgram] = useState("");

  useEffect(() => {
    const onSelect = (e: Event) => {
      const detail = (e as CustomEvent<{ program?: string }>).detail;
      if (detail?.program) setProgram(detail.program);
    };
    window.addEventListener(SELECT_PROGRAM_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_PROGRAM_EVENT, onSelect);
  }, []);

  if (status === "done") {
    return (
      <SuccessMessage
        title="Application received! 🎓"
        text="Thank you for applying. Our HR team will review your application and contact you soon."
        whatsapp={whatsapp}
        onReset={reset}
      />
    );
  }

  return (
    <form onSubmit={submit} className="relative grid gap-4 sm:grid-cols-2">
      <Honeypot />
      <Field label="Full name *">
        <input name="name" required maxLength={100} autoComplete="name" className="field" placeholder="Your name" />
      </Field>
      <Field label="Phone / WhatsApp *">
        <input name="phone" required type="tel" maxLength={20} autoComplete="tel" className="field" placeholder="+91 98765 43210" />
      </Field>
      <Field label="E-mail *">
        <input name="email" required type="email" maxLength={150} autoComplete="email" className="field" placeholder="you@email.com" />
      </Field>
      <Field label="College / University *">
        <input name="college" required maxLength={150} className="field" placeholder="College name" />
      </Field>
      <Field label="Course / Degree *">
        <input name="course" required maxLength={100} className="field" placeholder="BE IT, BCA, MCA, Diploma..." />
      </Field>
      <Field label="Current year">
        <select name="year" defaultValue="" className="field">
          <option value="">Select year</option>
          {STUDENT_YEARS.map((y) => (
            <option key={y}>{y}</option>
          ))}
        </select>
      </Field>
      <Field label="Internship program *" className="sm:col-span-2">
        <select name="program" required value={program} onChange={(e) => setProgram(e.target.value)} className="field">
          <option value="">Select a program</option>
          {programs.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </Field>
      <Field label="Preferred duration">
        <select name="duration" defaultValue="" className="field">
          <option value="">Select duration</option>
          {INTERNSHIP_DURATIONS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </Field>
      <Field label="Preferred mode">
        <select name="mode" defaultValue="" className="field">
          <option value="">Select mode</option>
          {INTERNSHIP_MODES.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </Field>
      <Field label="Resume / GitHub / LinkedIn link (optional)" className="sm:col-span-2">
        <input name="profileLink" type="url" maxLength={300} className="field" placeholder="https://drive.google.com/... or https://github.com/..." />
      </Field>
      <Field label="Anything you'd like to share?" className="sm:col-span-2">
        <textarea name="message" rows={3} maxLength={2000} className="field resize-y" placeholder="Your skills, projects or goals" />
      </Field>
      {status === "error" ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 sm:col-span-2" role="alert">
          {error}
        </p>
      ) : null}
      <div className="sm:col-span-2">
        <SubmitButton status={status} label="Submit Application" />
      </div>
    </form>
  );
}
