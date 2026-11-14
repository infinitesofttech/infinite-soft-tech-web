import Link from "next/link";
import { ArrowRight, Award, CircleCheck, Clock, GraduationCap, MapPin } from "lucide-react";
import { Icon } from "@/components/Icon";
import { Eyebrow, Reveal } from "@/components/ui";
import type { InternshipProgram } from "@/lib/types";
import { ApplyButton } from "./InternshipClient";

export function ProgramCard({ program, index = 0, applyInline = false }: { program: InternshipProgram; index?: number; applyInline?: boolean }) {
  return (
    <Reveal delay={(index % 4) * 80} className="h-full">
      <div className="card card-hover gborder group flex h-full flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="icon-tile !h-12 !w-12">
            <Icon name={program.icon} className="h-6 w-6" />
          </span>
          <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet">{program.level}</span>
        </div>
        <h3 className="mt-5 text-lg font-semibold leading-snug transition-colors group-hover:text-brand">{program.title}</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-body">{program.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {program.skills.slice(0, 5).map((s) => (
            <span key={s} className="rounded-md bg-soft px-2 py-1 text-[12px] font-medium text-ink-3">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-5">
          <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-4 text-[13px] text-muted">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-brand" /> {program.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-brand" /> {program.mode}
            </span>
          </div>
          {applyInline ? (
            <ApplyButton program={program.title} />
          ) : (
            <Link href="/internship#apply" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
              Apply now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </Reveal>
  );
}

/** Home page block for students. */
export function InternshipCta({ programs }: { programs: InternshipProgram[] }) {
  return (
    <section className="section-y relative overflow-hidden !pt-0" id="internship">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[32px] border border-line bg-brand-soft p-7 sm:p-10 lg:p-14">
          <div className="grid-bg mask-fade-y pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="animate-blob pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-pink/20 blur-3xl" aria-hidden="true" />
          <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <Reveal>
                <Eyebrow>For Students · Internship</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="h-display mt-5">
                  Learn by Building <span className="text-gradient">Real Software</span>
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-5 text-[17px] leading-relaxed text-body">
                  Join our IT internship in Ahmedabad and work alongside the developers who build our ERP, HRMS, websites and mobile
                  apps. Live projects, real code reviews and a certificate that proves your skills.
                </p>
              </Reveal>
              <Reveal delay={220}>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {["Live project experience", "Mentorship by developers", "Internship certificate", "Offline & online batches"].map((t) => (
                    <li key={t} className="flex items-center gap-2.5 text-[15px] font-medium text-ink-3">
                      <CircleCheck className="h-5 w-5 shrink-0 text-success" /> {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={280} className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/internship#apply" className="btn btn-primary btn-lg">
                  Apply for Internship <ArrowRight className="arrow h-5 w-5" />
                </Link>
                <Link href="/internship" className="btn btn-outline btn-lg">
                  View Programs
                </Link>
              </Reveal>
            </div>

            <Reveal type="right" delay={150}>
              <div className="relative">
                <div className="card relative p-6 sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="bg-brand-gradient flex h-11 w-11 items-center justify-center rounded-xl text-white">
                      <GraduationCap className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-display font-semibold text-ink">Internship Programs</p>
                      <p className="text-xs text-muted">Choose your technology</p>
                    </div>
                  </div>
                  <ul className="mt-5 space-y-2">
                    {programs.slice(0, 6).map((p, i) => (
                      <li key={p.id}>
                        <Link
                          href="/internship#programs"
                          className="group flex items-center justify-between rounded-xl border border-line px-4 py-3 transition hover:border-brand hover:bg-brand-50/50"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          <span className="flex items-center gap-3 text-[14px] font-medium text-ink-3">
                            <Icon name={p.icon} className="h-[18px] w-[18px] text-brand" /> {p.title}
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-1 group-hover:text-brand" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="animate-float absolute -right-3 -top-6 hidden items-center gap-2 rounded-2xl bg-ink px-4 py-3 text-white shadow-xl sm:flex">
                  <Award className="h-5 w-5 text-pink" />
                  <span className="text-sm font-semibold">Certificate on completion</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
