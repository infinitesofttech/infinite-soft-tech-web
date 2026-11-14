import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CircleCheck, Mail, Phone } from "lucide-react";
import { Icon } from "@/components/Icon";
import { ProcessSection } from "@/components/sections/Blocks";
import { FaqSection } from "@/components/sections/FaqBlog";
import { ServiceCard } from "@/components/sections/Services";
import { LeadForm } from "@/components/site/Forms";
import { QuoteButton } from "@/components/site/QuoteButton";
import { JsonLd, PageHero, Reveal, SectionHeading } from "@/components/ui";
import { getBySlug, getPublished, getSettings } from "@/lib/content";
import { breadcrumbLd, pageMetadata, serviceLd } from "@/lib/seo";
import { WHY_US } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getPublished("services");
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getBySlug("services", slug);
  if (!service) return { title: "Service not found", robots: { index: false } };
  return pageMetadata({
    title: service.seoTitle || service.title,
    description: service.seoDescription || service.short,
    path: `/services/${service.slug}`,
    keywords: [service.title, `${service.title} company`, `${service.title} Ahmedabad`, ...service.technologies],
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [service, services, settings, faqs] = await Promise.all([
    getBySlug("services", slug),
    getPublished("services"),
    getSettings(),
    getPublished("faqs"),
  ]);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== service.slug && s.category === service.category).slice(0, 3);
  const others = related.length >= 3 ? related : [...related, ...services.filter((s) => s.slug !== service.slug && !related.includes(s))].slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          serviceLd(service),
          breadcrumbLd([
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow={service.category === "Enterprise" ? "Enterprise Solution" : "Our Service"}
        crumbs={[{ name: "Services", path: "/services" }, { name: service.title }]}
        title={
          <>
            {service.title} <span className="text-gradient">Company in Ahmedabad</span>
          </>
        }
        text={service.short}
      >
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <QuoteButton service={service.title} className="btn btn-primary btn-lg">
            Get a Free Quote <ArrowRight className="arrow h-5 w-5" />
          </QuoteButton>
          <a href={`tel:${settings.phone}`} className="btn btn-outline btn-lg">
            <Phone className="h-4 w-4" /> {settings.phoneDisplay}
          </a>
        </div>
      </PageHero>

      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_400px]">
          <div>
            <Reveal className="flex items-center gap-4">
              <span className="icon-tile !h-16 !w-16 !rounded-2xl">
                <Icon name={service.icon} className="h-8 w-8" />
              </span>
              <h2 className="font-display text-[28px] font-bold leading-tight md:text-[34px]">{service.title} Services</h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-6 text-[17px] leading-[1.85] text-body">{service.description}</p>
            </Reveal>

            <Reveal delay={120}>
              <h3 className="mt-12 text-2xl font-bold">What we offer</h3>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {service.features.map((f, i) => (
                <Reveal key={f} delay={(i % 2) * 80}>
                  <div className="card card-hover group flex h-full items-start gap-4 p-5">
                    <span className="bg-brand-gradient flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold text-white transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-1.5 text-[15px] font-semibold text-ink">{f}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {service.technologies.length ? (
              <>
                <Reveal>
                  <h3 className="mt-12 text-2xl font-bold">Technologies we use</h3>
                </Reveal>
                <Reveal delay={80} className="mt-5 flex flex-wrap gap-2.5">
                  {service.technologies.map((t) => (
                    <span key={t} className="chip !px-4 !py-2 !text-[14px]">
                      <span className="bg-brand-gradient h-1.5 w-1.5 rounded-full" /> {t}
                    </span>
                  ))}
                </Reveal>
              </>
            ) : null}

            <Reveal>
              <h3 className="mt-12 text-2xl font-bold">Why choose Infinite Soft Tech for {service.title.toLowerCase()}?</h3>
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {WHY_US.slice(0, 4).map((w, i) => (
                <Reveal key={w.title} delay={(i % 2) * 80}>
                  <div className="flex h-full gap-4 rounded-2xl bg-soft p-5">
                    <Icon name={w.icon} className="mt-0.5 h-6 w-6 shrink-0 text-brand" />
                    <div>
                      <p className="font-semibold text-ink">{w.title}</p>
                      <p className="mt-1 text-[14px] leading-relaxed text-body">{w.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Sticky enquiry sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal type="right">
              <div className="card overflow-hidden">
                <div className="bg-brand-gradient p-6 text-white">
                  <p className="font-display text-xl font-bold">Get a free estimate</p>
                  <p className="mt-1 text-sm text-white/80">Tell us what you need — we&apos;ll reply quickly.</p>
                </div>
                <div className="p-6">
                  <LeadForm type="quote" services={services.map((s) => s.title)} defaultService={service.title} whatsapp={settings.whatsapp} compact />
                </div>
              </div>
              <div className="mt-5 space-y-3 rounded-2xl border border-line p-5 text-[15px]">
                <a href={`tel:${settings.phone}`} className="flex items-center gap-3 font-semibold text-ink hover:text-brand">
                  <Phone className="h-4 w-4 text-brand" /> {settings.phoneDisplay}
                </a>
                <a href={`mailto:${settings.email}`} className="flex items-center gap-3 font-semibold text-ink hover:text-brand">
                  <Mail className="h-4 w-4 text-brand" /> {settings.email}
                </a>
                <ul className="space-y-2 border-t border-line pt-3 text-sm text-body">
                  {["Free consultation", "Clear scope & timeline", "Post-launch support"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <CircleCheck className="h-4 w-4 text-success" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <ProcessSection />

      {others.length ? (
        <section className="section-y">
          <div className="container-x">
            <SectionHeading eyebrow="Explore More" title={<>Related <span className="text-gradient">Services</span></>} />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((s, i) => (
                <ServiceCard key={s.id} service={s} index={i} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/services" className="btn btn-outline">
                All Services <ArrowRight className="arrow h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <div className="bg-soft">
        <FaqSection
          faqs={faqs.filter((f) => f.category === "General").slice(0, 5)}
          phone={settings.phone}
          phoneDisplay={settings.phoneDisplay}
          whatsapp={settings.whatsapp}
        />
      </div>
    </>
  );
}
