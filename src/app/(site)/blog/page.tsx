import type { Metadata } from "next";
import { BlogCard } from "@/components/sections/FaqBlog";
import { JsonLd, PageHero, Reveal } from "@/components/ui";
import { getPublished } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog – Software, ERP, App Development & Tech Careers",
  description:
    "Practical guides on custom software, ERP and CRM, mobile app development costs, AI and IT internships from the Infinite Soft Tech team in Ahmedabad.",
  path: "/blog",
  keywords: ["software development blog", "ERP guide", "app development cost India", "IT internship guide"],
});

export default async function BlogPage() {
  const posts = [...(await getPublished("blog"))].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = posts;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Blog", path: "/blog" }])} />
      <PageHero
        eyebrow="Insights & Guides"
        crumbs={[{ name: "Blog" }]}
        title={
          <>
            Ideas, Guides & <span className="text-gradient">Tech Insights</span>
          </>
        }
        text="Helpful articles for business owners planning software — and students building a career in tech."
      />
      <section className="section-y">
        <div className="container-x">
          {featured ? (
            <div className="grid gap-6 lg:grid-cols-3">
              <Reveal className="h-full lg:col-span-2">
                <BlogCard post={featured} featured />
              </Reveal>
              {rest.map((p, i) => (
                <Reveal key={p.id} delay={((i + 1) % 3) * 100} className="h-full">
                  <BlogCard post={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-center text-body">New articles are coming soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
