import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { Icon } from "@/components/Icon";
import { QuoteButton } from "@/components/site/QuoteButton";
import { Eyebrow, Reveal } from "@/components/ui";
import { ERP_MODULES } from "@/lib/site";

function ModuleOrbit() {
  const ring = ERP_MODULES.slice(0, 8);
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px]" aria-hidden="true">
      <div className="absolute inset-[6%] rounded-full border border-white/10" />
      <div className="absolute inset-[22%] rounded-full border border-dashed border-white/15" />
      <div className="bg-brand-gradient absolute inset-[30%] rounded-full opacity-40 blur-3xl" />

      <div className="animate-spin-slower absolute inset-[6%]">
        {ring.map((m, i) => {
          const angle = (i / ring.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <span
              key={m.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%` }}
            >
              <span className="block [animation:spin-reverse_60s_linear_infinite]">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-ink-2/90 text-white shadow-lg backdrop-blur sm:h-16 sm:w-16">
                  <Icon name={m.icon} className="h-6 w-6 text-[#a9b4ff]" />
                </span>
              </span>
            </span>
          );
        })}
      </div>

      <div className="absolute left-1/2 top-1/2 flex h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white text-center shadow-[0_0_80px_-10px_rgba(123,58,237,0.8)]">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-white/30" />
        <Building2 className="relative h-7 w-7 text-brand sm:h-8 sm:w-8" />
        <span className="relative mt-1 font-display text-[11px] font-bold leading-tight text-ink sm:text-sm">
          Your
          <br />
          Business
        </span>
      </div>
    </div>
  );
}

export function EnterpriseSection() {
  return (
    <section className="section-y relative overflow-hidden bg-ink text-white" id="erp-crm">
      <div className="grid-bg-dark mask-fade-y pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-brand/25 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-pink/20 blur-3xl" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <Eyebrow dark>For Enterprises & Growing Companies</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="h-display mt-5 !text-white">
              ERP & CRM Built Around <span className="text-gradient">The Way You Work</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-[17px] leading-relaxed text-white/70">
              Big companies don&apos;t fit into generic software. We design and develop custom ERP and CRM systems that connect every
              department — with role-based access, approval workflows, integrations and real-time dashboards for management.
            </p>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {ERP_MODULES.map((m, i) => (
              <Reveal key={m.name} delay={200 + i * 50}>
                <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08]">
                  <Icon name={m.icon} className="h-5 w-5 shrink-0 text-[#a9b4ff] transition group-hover:scale-110 group-hover:text-pink" />
                  <span className="text-sm font-medium text-white/90">{m.name}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <QuoteButton service="Custom ERP Development" className="btn btn-primary btn-lg">
              Book a Free ERP / CRM Demo <ArrowRight className="arrow h-5 w-5" />
            </QuoteButton>
            <Link href="/services/erp-development" className="btn btn-ghost-light btn-lg">
              Explore ERP Development
            </Link>
          </Reveal>
        </div>
        <Reveal type="zoom" delay={150}>
          <ModuleOrbit />
        </Reveal>
      </div>
    </section>
  );
}
