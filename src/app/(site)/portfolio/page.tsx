import type { Metadata } from "next";
import { IndustriesSection } from "@/components/sections/Blocks";
import { PortfolioFilter } from "@/components/sections/PortfolioFilter";
import { JsonLd, PageHero } from "@/components/ui";
import { getPublished } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio – Our Work & Live Projects",
  description:
    "See websites, e-commerce platforms, ERP and HRMS software built by Infinite Soft Tech, a software development company in Ahmedabad.",
  path: "/portfolio",
  keywords: ["software portfolio", "website portfolio Ahmedabad", "ERP project case study"],
});

export default async function PortfolioPage() {
  const projects = await getPublished("portfolio");
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Portfolio", path: "/portfolio" }])} />
      <PageHero
        eyebrow="Our Work"
        crumbs={[{ name: "Portfolio" }]}
        title={
          <>
            Products & Platforms <span className="text-gradient">We&apos;ve Built</span>
          </>
        }
        text="From institutional ERP and enterprise HRMS to e-commerce — a look at the work we are proud of."
      />
      <section className="section-y">
        <div className="container-x">
          <PortfolioFilter projects={projects} />
        </div>
      </section>
      <div className="bg-soft">
        <IndustriesSection />
      </div>
    </>
  );
}
