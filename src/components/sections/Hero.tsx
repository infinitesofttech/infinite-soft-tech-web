import Link from "next/link";
import { ArrowRight, BellRing, CircleCheck, Sparkles, TrendingUp } from "lucide-react";
import { QuoteButton } from "@/components/site/QuoteButton";
import { Typewriter } from "@/components/site/Typewriter";
import type { Settings } from "@/lib/types";

const BARS = [38, 52, 44, 66, 58, 74, 62, 82, 70, 90, 78, 96];
const ORBIT = ["React", "Flutter", "Node.js", "AI", "Python", "Cloud"];

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[540px]" aria-hidden="true">
      {/* Orbit rings */}
      <div className="absolute inset-[4%] rounded-full border border-dashed border-brand/20" />
      <div className="absolute inset-[18%] rounded-full border border-violet/15" />
      <div className="animate-spin-slow absolute inset-[4%] hidden sm:block">
        {ORBIT.map((label, i) => {
          const angle = (i / ORBIT.length) * Math.PI * 2;
          const x = 50 + 50 * Math.cos(angle);
          const y = 50 + 50 * Math.sin(angle);
          return (
            <span key={label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
              <span className="animate-spin-reverse block">
                <span className="block rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-md">{label}</span>
              </span>
            </span>
          );
        })}
      </div>

      {/* Glow */}
      <div className="bg-brand-gradient absolute inset-[22%] rounded-full opacity-25 blur-3xl" />

      {/* Main dashboard card */}
      <div className="absolute left-1/2 top-1/2 w-[80%] -translate-x-1/2 -translate-y-1/2">
        <div className="animate-float-slow rounded-[22px] border border-white/70 bg-white/85 p-4 shadow-[0_40px_80px_-30px_rgba(43,68,255,0.45)] backdrop-blur-xl sm:p-5">
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-xs font-semibold text-ink">ERP Dashboard</span>
            <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> LIVE
            </span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { k: "Revenue", v: "+24%", c: "text-brand" },
              { k: "Orders", v: "1,284", c: "text-violet" },
              { k: "Leads", v: "312", c: "text-pink" },
            ].map((t) => (
              <div key={t.k} className="rounded-xl bg-soft p-2.5 sm:p-3">
                <p className="text-[10px] font-medium text-muted sm:text-[11px]">{t.k}</p>
                <p className={`mt-0.5 font-display text-sm font-bold sm:text-lg ${t.c}`}>{t.v}</p>
              </div>
            ))}
          </div>
          <div className="relative mt-4 h-28 rounded-xl bg-gradient-to-b from-brand-50/60 to-transparent p-3 sm:h-36">
            <div className="flex h-full items-end gap-1.5 sm:gap-2">
              {BARS.map((h, i) => (
                <span
                  key={i}
                  className="bar-grow flex-1 rounded-t-md bg-gradient-to-t from-brand via-violet to-pink opacity-90"
                  style={{ height: `${h}%`, animationDelay: `${0.3 + i * 0.07}s` }}
                />
              ))}
            </div>
            <svg className="pointer-events-none absolute inset-3" viewBox="0 0 300 100" preserveAspectRatio="none">
              <path
                d="M0 80 C 40 70, 60 40, 100 50 S 170 20, 210 30 S 270 5, 300 8"
                fill="none"
                stroke="#0b1026"
                strokeOpacity="0.55"
                strokeWidth="2"
                strokeDasharray="400"
                style={{ animation: "draw-line 2.4s 0.6s var(--ease-soft) both" }}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Floating: new lead */}
      <div className="absolute left-0 top-[12%] sm:left-[-2%]">
        <div className="animate-float flex items-center gap-3 rounded-2xl border border-line bg-white p-3 pr-5 shadow-xl">
          <span className="bg-brand-gradient flex h-10 w-10 items-center justify-center rounded-xl text-white">
            <BellRing className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-[13px] font-semibold text-ink">New lead received</span>
            <span className="block text-[11px] text-muted">Website enquiry · just now</span>
          </span>
        </div>
      </div>

      {/* Floating: AI assistant */}
      <div className="absolute right-0 top-[6%] hidden sm:block">
        <div className="animate-float-x flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-xs font-semibold text-white shadow-xl">
          <Sparkles className="h-4 w-4 text-pink" /> AI Assistant
        </div>
      </div>

      {/* Floating: mobile app */}
      <div className="absolute bottom-[3%] right-[2%] w-[27%] min-w-[110px]">
        <div className="animate-float rounded-[22px] border-[5px] border-ink bg-white p-2 shadow-2xl [animation-delay:-2s]">
          <div className="bg-brand-gradient rounded-xl p-2.5 text-white">
            <p className="text-[9px] opacity-80">Today&apos;s sales</p>
            <p className="font-display text-sm font-bold">₹48,250</p>
          </div>
          <div className="mt-2 space-y-1.5">
            {[70, 52, 84].map((w, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="h-4 w-4 rounded-md bg-brand-50" />
                <span className="h-1.5 rounded-full bg-soft-2" style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating: deployed */}
      <div className="absolute bottom-[10%] left-[2%]">
        <div className="animate-float-x flex items-center gap-2 rounded-2xl border border-line bg-white px-3.5 py-2.5 shadow-xl [animation-delay:-3s]">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-success">
            <TrendingUp className="h-4 w-4" />
          </span>
          <span className="text-[12px] font-semibold text-ink">
            Deployed
            <span className="block text-[10px] font-medium text-muted">v2.4 · 0 errors</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function Hero({ settings: s }: { settings: Settings }) {
  return (
    <section className="relative overflow-hidden pb-20 pt-10 sm:pt-14 lg:pb-28 lg:pt-16">
      <div className="grid-bg mask-fade-y pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="animate-blob pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-brand/15 blur-3xl" aria-hidden="true" />
      <div className="animate-blob pointer-events-none absolute right-[-120px] top-20 h-[420px] w-[420px] rounded-full bg-pink/15 blur-3xl [animation-delay:-7s]" aria-hidden="true" />
      <div className="animate-blob pointer-events-none absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-violet/10 blur-3xl [animation-delay:-12s]" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.08fr_1fr] lg:gap-10">
        <div className="text-center lg:text-left">
          <div data-reveal="down" className="inline-flex items-center gap-2.5 rounded-full border border-brand-100 bg-white/80 py-1.5 pl-1.5 pr-4 text-[13px] font-semibold text-ink shadow-sm backdrop-blur">
            <span className="bg-brand-gradient flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              <Sparkles className="h-3 w-3" /> New
            </span>
            {s.heroBadge}
          </div>

          <h1
            data-reveal="up"
            style={{ "--d": "80ms" } as React.CSSProperties}
            className="mt-6 font-display text-[40px] font-extrabold leading-[1.06] tracking-tight text-ink sm:text-[54px] lg:text-[56px]"
          >
            {s.heroTitle}
            <br />
            <span className="text-gradient-animated">{s.heroTitleAccent}</span>
            <span className="sr-only"> — Software, ERP, CRM, Website &amp; Mobile App Development Company in Ahmedabad</span>
          </h1>

          <p
            data-reveal="up"
            style={{ "--d": "160ms" } as React.CSSProperties}
            className="mt-5 flex min-h-[1.4em] items-center justify-center gap-2 font-display text-[22px] font-semibold text-ink sm:text-[28px] lg:justify-start"
          >
            <span>We build</span>
            <Typewriter words={s.heroWords} className="inline-flex items-center" />
          </p>

          <p
            data-reveal="up"
            style={{ "--d": "240ms" } as React.CSSProperties}
            className="mx-auto mt-5 max-w-[560px] text-[17px] leading-relaxed text-body md:text-lg lg:mx-0"
          >
            {s.heroSubtitle}
          </p>

          <div
            data-reveal="up"
            style={{ "--d": "320ms" } as React.CSSProperties}
            className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
          >
            <QuoteButton className="btn btn-primary btn-lg">
              Get Free Demo &amp; Quote <ArrowRight className="arrow h-5 w-5" />
            </QuoteButton>
            <Link href="/portfolio" className="btn btn-outline btn-lg">
              View Our Work
            </Link>
          </div>

          <ul
            data-reveal="up"
            style={{ "--d": "400ms" } as React.CSSProperties}
            className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium text-ink-3 lg:justify-start"
          >
            {["Free demo + quote in 24 hrs", "Agile delivery", "Post-launch support"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CircleCheck className="h-[18px] w-[18px] text-success" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal="zoom" style={{ "--d": "200ms" } as React.CSSProperties}>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
