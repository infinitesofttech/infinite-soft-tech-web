import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { ProcessSection } from "@/components/sections/Blocks";
import { EnterpriseSection } from "@/components/sections/Enterprise";
import { FaqSection } from "@/components/sections/FaqBlog";
import { ServiceCard, TechStackGrid } from "@/components/sections/Services";
import { QuoteButton } from "@/components/site/QuoteButton";
import { JsonLd, PageHero, Reveal } from "@/components/ui";
import { getPublished, getSettings } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { SERVICE_CATEGORIES } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Software Development Services – Web, App, ERP, CRM & AI",
  description:
    "Explore our software development services: website development, mobile apps, custom ERP, CRM, e-commerce, SaaS, UI/UX, AI automation, cloud & DevOps, API integration and QA testing.",
  path: "/services",
  keywords: ["software development services", "IT services Ahmedabad", "ERP CRM development services"],
});

const CATEGORY_TEXT: Record<string, string> = {
  Development: "Websites, apps, products and design that your customers love to use.",
  Enterprise: "ERP, CRM and integrations that connect every department of your business.",
  "AI & Cloud": "Automation, AI, cloud infrastructure and quality assurance that keep you ahead.",
};

export default async function ServicesPage() {
  const [settings, services, faqs] = await Promise.all([getSettings(), getPublished("services"), getPublished("faqs")]);
  let counter = 0;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Services", path: "/services" }])} />
      <PageHero
        eyebrow="Our Services"
        crumbs={[{ name: "Services" }]}
        title={
          <>
            End-to-End Software Development <span className="text-gradient">Services</span>
          </>
        }
        text="Everything you need to launch, run and grow digital products — designed, built and supported by one accountable team."
      >
        <QuoteButton className="btn btn-primary btn-lg">
          Get a Free Consultation <ArrowRight className="arrow h-5 w-5" />
        </QuoteButton>
      </PageHero>

      {SERVICE_CATEGORIES.map((cat) => {
        const list = services.filter((s) => s.category === cat);
        if (!list.length) return null;
        return (
          <section key={cat} className="pt-20 first-of-type:pt-20 md:pt-24">
            <div className="container-x">
              <Reveal className="flex flex-col justify-between gap-3 border-b border-line pb-6 md:flex-row md:items-end">
                <h2 className="font-display text-[28px] font-bold md:text-[34px]">
                  {cat === "AI & Cloud" ? "AI, Cloud & Quality" : cat === "Enterprise" ? "Enterprise Solutions" : "Design & Development"}
                </h2>
                <p className="max-w-md text-[15px] text-body">{CATEGORY_TEXT[cat]}</p>
              </Reveal>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((s) => (
                  <ServiceCard key={s.id} service={s} index={counter++} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <div className="h-20 md:h-28" aria-hidden="true" />
      <EnterpriseSection />
      <ProcessSection soft={false} />
      <TechStackGrid />
      <FaqSection
        faqs={faqs.filter((f) => f.category === "General")}
        phone={settings.phone}
        phoneDisplay={settings.phoneDisplay}
        whatsapp={settings.whatsapp}
      />
    </>
  );
}
