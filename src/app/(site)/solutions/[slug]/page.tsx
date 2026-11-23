import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, CircleCheck, Phone, XCircle } from "lucide-react";
import { Icon } from "@/components/Icon";
import { ProcessSection } from "@/components/sections/Blocks";
import { Accordion } from "@/components/sections/Accordion";
import { LeadForm } from "@/components/site/Forms";
import { QuoteButton } from "@/components/site/QuoteButton";
import { JsonLd, PageHero, Reveal, SectionHeading } from "@/components/ui";
import { getPublished, getSettings } from "@/lib/content";
import { breadcrumbLd, faqLd, pageMetadata } from "@/lib/seo";
import { getSolution, SOLUTIONS } from "@/lib/solutions";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return { title: "Not found", robots: { index: false } };
  return pageMetadata({
    title: s.seoTitle,
    description: s.seoDescription,
    path: `/solutions/${s.slug}`,
    keywords: [s.name, `${s.name} Ahmedabad`, `${s.name} India`, ...s.forWho],
  });
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();
  const [settings, services] = await Promise.all([getSettings(), getPublished("services")]);
  const faqItems = s.faqs.map((f, i) => ({ id: `${s.slug}-${i}`, category: "General" as const, published: true, ...f }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: s.name, path: `/solutions/${s.slug}` }]),
          faqLd(faqItems),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.title,
            description: s.seoDescription,
            provider: { "@type": "Organization", name: settings.companyName },
            areaServed: ["Ahmedabad", "India"],
          },
        ]}
      />
      <PageHero
        eyebrow={s.name}
        crumbs={[{ name: s.name }]}
        title={s.headline}
        text={s.intro}
      >
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <QuoteButton service={s.service} className="btn btn-primary btn-lg">
            Book a Free Demo <ArrowRight className="arrow h-5 w-5" />
          </QuoteButton>
          <a
            href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hi, I want a free demo of ${s.name}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-lg"
          >
            WhatsApp for Demo
          </a>
          <a href={`tel:${settings.phone}`} className="btn btn-outline btn-lg">
            <Phone className="h-4 w-4" /> {settings.phoneDisplay}
          </a>
        </div>
      </PageHero>

      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <Reveal type="left">
            <div className="card h-full p-8">
              <h2 className="font-display text-2xl font-bold">Problems we solve</h2>
              <ul className="mt-6 space-y-4">
                {s.problems.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-[16px] text-body">
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-pink" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal type="right">
            <div className="bg-brand-soft h-full rounded-3xl border border-line p-8">
              <h2 className="font-display text-2xl font-bold">What you get</h2>
              <ul className="mt-6 space-y-4">
                {s.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-[16px] font-medium text-ink-3">
                    <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" /> {b}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted">Ideal for</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {s.forWho.map((w) => (
                  <span key={w} className="chip">{w}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-y bg-soft">
        <div className="container-x">
          <SectionHeading eyebrow="Modules" title={<>Key Features of Our <span className="text-gradient">{s.name}</span></>} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {s.modules.map((m, i) => (
              <Reveal key={m.title} delay={(i % 3) * 90}>
                <div className="card card-hover gborder group h-full p-7">
                  <span className="icon-tile">
                    <Icon name={s.icon} className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{m.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-body">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          {s.related ? (
            <div className="mt-10 text-center">
              <Link href={s.related.href} className="btn btn-outline">
                {s.related.label} <ArrowRight className="arrow h-4 w-4" />
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      <ProcessSection soft={false} />

      <section className="section-y bg-soft" id="demo">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading align="left" eyebrow="FAQ" title={<>Common <span className="text-gradient">Questions</span></>} />
            <div className="mt-8">
              <Accordion items={faqItems.map(({ id, question, answer }) => ({ id, question, answer }))} />
            </div>
          </div>
          <Reveal type="right">
            <div className="card overflow-hidden">
              <div className="bg-brand-gradient p-6 text-white">
                <p className="font-display text-xl font-bold">Get a free demo & estimate</p>
                <p className="mt-1 flex items-center gap-2 text-sm text-white/80">
                  <Check className="h-4 w-4" /> Reply within 24 working hours
                </p>
              </div>
              <div className="p-6 sm:p-8">
                <LeadForm type="quote" services={services.map((x) => x.title)} defaultService={s.service} whatsapp={settings.whatsapp} compact />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
