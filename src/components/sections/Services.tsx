import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/Icon";
import { Reveal, SectionHeading } from "@/components/ui";
import { MARQUEE_TECH, TECH_STACK } from "@/lib/site";
import type { Service } from "@/lib/types";

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  return (
    <Reveal delay={(index % 3) * 90} className="h-full">
      <Link
        href={`/services/${service.slug}`}
        className="card card-hover gborder group flex h-full flex-col overflow-hidden p-7"
      >
        <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-gradient opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" aria-hidden="true" />
        <span className="pointer-events-none absolute right-6 top-6 font-display text-5xl font-extrabold text-soft-2 transition-colors duration-500 group-hover:text-brand-50" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="icon-tile relative">
          <Icon name={service.icon} className="h-7 w-7" />
        </span>
        <h3 className="relative mt-6 text-xl font-semibold transition-colors group-hover:text-brand">{service.title}</h3>
        <p className="relative mt-3 flex-1 text-[15px] leading-relaxed text-body">{service.short}</p>
        <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          Learn more
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </Link>
    </Reveal>
  );
}

export function ServicesGrid({ services, heading = true }: { services: Service[]; heading?: boolean }) {
  return (
    <section className="section-y relative" id="services">
      <div className="container-x">
        {heading ? (
          <SectionHeading
            eyebrow="What We Do"
            title={
              <>
                Software Development Services That <span className="text-gradient">Grow Your Business</span>
              </>
            }
            text="From your first website to enterprise ERP — design, development, AI, cloud and testing handled by one dedicated team in Ahmedabad."
          />
        ) : null}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TechMarquee() {
  const half = Math.ceil(MARQUEE_TECH.length / 2);
  const rows = [MARQUEE_TECH.slice(0, half), MARQUEE_TECH.slice(half)];
  return (
    <section className="border-y border-line bg-soft py-10" aria-label="Technologies we work with">
      <p className="container-x text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted">
        Technologies we work with
      </p>
      <div className="marquee-pause mask-fade-x mt-7 space-y-4 overflow-hidden">
        {rows.map((row, r) => (
          <div key={r} className={`flex w-max gap-4 ${r === 0 ? "animate-marquee" : "animate-marquee-reverse"}`} style={{ "--marquee-duration": "45s" } as React.CSSProperties}>
            {[...row, ...row].map((t, i) => (
              <span
                key={`${t}-${i}`}
                aria-hidden={i >= row.length}
                className="flex items-center gap-2.5 rounded-full border border-line bg-white px-5 py-2.5 text-[15px] font-semibold text-ink-3 shadow-sm transition hover:border-brand hover:text-brand"
              >
                <span className="bg-brand-gradient h-2 w-2 rounded-full" />
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export function TechStackGrid() {
  return (
    <section className="section-y bg-soft" id="technologies">
      <div className="container-x">
        <SectionHeading
          eyebrow="Technology Stack"
          title={
            <>
              Modern Technologies, <span className="text-gradient">Proven Results</span>
            </>
          }
          text="We pick the right tools for every project — fast, secure and built to scale."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_STACK.map((group, i) => (
            <Reveal key={group.category} delay={(i % 3) * 90}>
              <div className="card card-hover group h-full p-7">
                <div className="flex items-center gap-4">
                  <span className="icon-tile !h-12 !w-12">
                    <Icon name={group.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="text-lg font-semibold">{group.category}</h3>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
