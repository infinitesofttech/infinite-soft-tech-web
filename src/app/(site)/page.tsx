import type { Metadata } from "next";
import { EngagementSection, IndustriesSection, ProcessSection, StatsBand, WhyUs } from "@/components/sections/Blocks";
import { EnterpriseSection } from "@/components/sections/Enterprise";
import { BlogSection, FaqSection } from "@/components/sections/FaqBlog";
import { Hero } from "@/components/sections/Hero";
import { InternshipCta } from "@/components/sections/Internship";
import { PortfolioSection } from "@/components/sections/Portfolio";
import { ProductsSection } from "@/components/sections/Products";
import { ServicesGrid, TechMarquee } from "@/components/sections/Services";
import { ClientsStrip, TestimonialsSection } from "@/components/sections/Social";
import { JsonLd } from "@/components/ui";
import { getPublished, getSettings } from "@/lib/content";
import { faqLd, ogImageUrl, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Infinite Soft Tech | Software, ERP, CRM & App Development Company in Ahmedabad",
  description:
    "AI-powered software development company in Ahmedabad. We build websites, mobile apps, custom ERP & CRM, SaaS and AI solutions for businesses in India and worldwide — plus live-project IT internships for students.",
  path: "/",
  absoluteTitle: true,
  image: ogImageUrl("Software, ERP, CRM & App Development Company"),
});

export default async function HomePage() {
  const [settings, services, products, portfolio, internships, testimonials, clients, faqs, blog] = await Promise.all([
    getSettings(),
    getPublished("services"),
    getPublished("products"),
    getPublished("portfolio"),
    getPublished("internships"),
    getPublished("testimonials"),
    getPublished("clients"),
    getPublished("faqs"),
    getPublished("blog"),
  ]);
  const generalFaqs = faqs.filter((f) => f.category === "General").slice(0, 6);
  const latestPosts = [...blog].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      {generalFaqs.length ? <JsonLd data={faqLd(generalFaqs)} /> : null}
      <Hero settings={settings} />
      <TechMarquee />
      <ServicesGrid services={services} />
      <StatsBand stats={settings.stats} />
      <div className="h-16 md:h-24" aria-hidden="true" />
      <EnterpriseSection />
      <ProductsSection products={products} />
      <ProcessSection />
      <WhyUs />
      <PortfolioSection projects={portfolio} />
      <ClientsStrip clients={clients} />
      <IndustriesSection />
      <InternshipCta programs={internships} />
      <EngagementSection />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection faqs={generalFaqs} phone={settings.phone} phoneDisplay={settings.phoneDisplay} whatsapp={settings.whatsapp} />
      <BlogSection posts={latestPosts} />
    </>
  );
}
