import type { Metadata } from "next";
import { ArrowRight, Lightbulb } from "lucide-react";
import { ProductFeature } from "@/components/sections/Products";
import { QuoteButton } from "@/components/site/QuoteButton";
import { JsonLd, PageHero, Reveal } from "@/components/ui";
import { getPublished } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Products – HRMS & ERP Software",
  description:
    "Ready-to-use business software by Infinite Soft Tech: Infinite Employee HRMS for workforce management and Vidyapeeth ERP for schools, colleges and institutes.",
  path: "/products",
  keywords: ["HRMS software", "school ERP software", "college management system", "payroll software India"],
});

export default async function ProductsPage() {
  const products = await getPublished("products");
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Products", path: "/products" }])} />
      <PageHero
        eyebrow="Our Products"
        crumbs={[{ name: "Products" }]}
        title={
          <>
            Software Products That <span className="text-gradient">Run Organisations</span>
          </>
        }
        text="Built, used and continuously improved by our team — and customisable for your organisation's workflow."
      />
      <section className="section-y">
        <div className="container-x space-y-24 md:space-y-32">
          {products.map((p, i) => (
            <ProductFeature key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
      <section className="pb-6">
        <div className="container-x">
          <Reveal type="zoom">
            <div className="relative overflow-hidden rounded-[28px] border border-line bg-soft p-8 text-center md:p-12">
              <div className="grid-bg mask-fade-y pointer-events-none absolute inset-0" aria-hidden="true" />
              <span className="icon-tile relative mx-auto">
                <Lightbulb className="h-7 w-7" />
              </span>
              <h2 className="relative mx-auto mt-5 max-w-2xl font-display text-[26px] font-bold md:text-[32px]">
                Need a product built specifically for your business?
              </h2>
              <p className="relative mx-auto mt-3 max-w-xl text-body">
                We design and develop custom ERP, CRM, HRMS and SaaS platforms tailored to your exact processes.
              </p>
              <QuoteButton service="Custom Software Development" className="btn btn-primary relative mt-7">
                Discuss Your Idea <ArrowRight className="arrow h-4 w-4" />
              </QuoteButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
