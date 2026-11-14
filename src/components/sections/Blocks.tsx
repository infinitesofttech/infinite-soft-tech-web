import { Check } from "lucide-react";
import { Icon } from "@/components/Icon";
import { Counter } from "@/components/site/Counter";
import { Reveal, SectionHeading } from "@/components/ui";
import { DELIVERY_GROUPS, ENGAGEMENT_MODELS, INDUSTRIES, PROCESS, VALUES, WHY_US } from "@/lib/site";
import type { Stat } from "@/lib/types";

export function StatsBand({ stats }: { stats: Stat[] }) {
  if (!stats.length) return null;
  return (
    <section className="relative py-6" aria-label="Company highlights">
      <div className="container-x">
        <div className="bg-brand-gradient relative overflow-hidden rounded-[28px] px-6 py-10 shadow-[0_30px_60px_-25px_rgba(43,68,255,0.6)] md:px-10 md:py-12">
          <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="animate-blob absolute -right-10 -top-20 h-60 w-60 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />
          <dl className="relative grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100} className="text-center lg:border-l lg:border-white/20 lg:first:border-l-0">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-[40px] font-extrabold leading-none text-white md:text-[52px]">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <dd className="mt-3 text-sm font-medium uppercase tracking-wider text-white/80">{s.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section className="section-y relative overflow-hidden">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-32">
          <SectionHeading
            align="left"
            eyebrow="Why Choose Us"
            title={
              <>
                A Technology Partner That <span className="text-gradient">Thinks Like You</span>
              </>
            }
            text="We combine a structured engineering process with honest communication, so you always know what is being built, when it ships and why."
          />
          <Reveal delay={240}>
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-line bg-soft p-5">
              <span className="bg-brand-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white">
                <Icon name="Award" className="h-6 w-6" />
              </span>
              <p className="text-[15px] text-body">
                <strong className="text-ink">One team, end-to-end:</strong> idea, design, development, launch and support.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {WHY_US.map((w, i) => (
            <Reveal key={w.title} delay={(i % 2) * 100} className={i % 2 === 1 ? "sm:translate-y-8" : ""}>
              <div className="card card-hover gborder group h-full p-7">
                <span className="icon-tile">
                  <Icon name={w.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection({ soft = true }: { soft?: boolean }) {
  return (
    <section className={`section-y relative overflow-hidden ${soft ? "bg-soft" : ""}`} id="process">
      <div className="container-x">
        <SectionHeading
          eyebrow="How We Work"
          title={
            <>
              Three Core Phases of <span className="text-gradient">Our Process</span>
            </>
          }
          text="A proven path from idea to a reliable product — with you involved at every milestone."
        />
        <div className="relative mt-16 grid gap-8 lg:grid-cols-3">
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-[44px] hidden h-[2px] overflow-hidden rounded-full bg-line lg:block" aria-hidden="true">
            <div className="bg-brand-gradient h-full w-1/3 animate-[slide-across_3.2s_ease-in-out_infinite]" />
          </div>
          {PROCESS.map((p, i) => (
            <Reveal key={p.phase} delay={i * 140}>
              <div className="card card-hover group relative h-full p-8 text-center">
                <div className="relative mx-auto flex h-[88px] w-[88px] items-center justify-center">
                  <span className="bg-brand-gradient absolute inset-0 rounded-full opacity-15 transition-opacity duration-500 group-hover:opacity-30" />
                  <span className="bg-brand-gradient relative flex h-16 w-16 items-center justify-center rounded-full text-white shadow-[0_12px_30px_-8px_rgba(123,58,237,0.6)] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[10deg]">
                    <Icon name={p.icon} className="h-7 w-7" />
                  </span>
                  <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-ink text-xs font-bold text-white">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-bold">{p.phase}</h3>
                <p className="mt-2 text-[15px] text-body">{p.text}</p>
                <ul className="mt-6 space-y-2.5 text-left">
                  {p.steps.map((step) => (
                    <li key={step} className="flex items-start gap-3 rounded-xl bg-soft px-4 py-2.5 text-[14px] font-medium text-ink-3 transition group-hover:bg-brand-50/60">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IndustriesSection() {
  return (
    <section className="section-y" id="industries">
      <div className="container-x">
        <SectionHeading
          eyebrow="Industries We Serve"
          title={
            <>
              Solving Real Challenges <span className="text-gradient">Across Industries</span>
            </>
          }
          text="Our team blends technology, creativity and domain understanding to build software that fits how each industry really works."
        />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name} delay={(i % 5) * 70} type="zoom">
              <div className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-line bg-white px-4 py-7 text-center transition duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[var(--shadow-lift)]">
                <span className="bg-brand-gradient absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand transition duration-500 group-hover:scale-110 group-hover:bg-white/20 group-hover:text-white">
                  <Icon name={ind.icon} className="h-7 w-7" />
                </span>
                <h3 className="relative mt-4 text-[15px] font-semibold transition-colors duration-500 group-hover:!text-white">{ind.name}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EngagementSection() {
  return (
    <section className="section-y bg-soft" id="engagement">
      <div className="container-x">
        <SectionHeading
          eyebrow="Engagement Models"
          title={
            <>
              Flexible Ways to <span className="text-gradient">Work With Us</span>
            </>
          }
          text="Full-cycle custom software development for cloud, mobile and web — with a hiring model that fits your scope and budget."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {ENGAGEMENT_MODELS.map((m, i) => (
            <Reveal key={m.title} delay={i * 120}>
              <div className="card card-hover gborder group h-full p-8">
                <span className="icon-tile">
                  <Icon name={m.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-xl font-bold">{m.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-body">{m.text}</p>
                <ul className="mt-6 space-y-3 border-t border-line pt-6">
                  {m.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 text-[15px] font-medium text-ink-3">
                      <span className="bg-brand-gradient flex h-5 w-5 items-center justify-center rounded-full text-white">
                        <Check className="h-3 w-3" />
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ValuesGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {VALUES.map((v, i) => (
        <Reveal key={v.title} delay={i * 120}>
          <div className="card card-hover group h-full p-7">
            <span className="icon-tile">
              <Icon name={v.icon} className="h-7 w-7" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-body">{v.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function DeliveryGroups() {
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionHeading
          eyebrow="Capabilities"
          title={
            <>
              We Deliver Technology <span className="text-gradient">That Works</span>
            </>
          }
          text="A wide range of engineering capabilities — so you never need multiple vendors."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DELIVERY_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 100}>
              <div className="card card-hover gborder group h-full p-7">
                <span className="icon-tile">
                  <Icon name={g.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{g.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-[15px] text-body">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-brand" /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
