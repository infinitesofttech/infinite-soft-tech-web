import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CircleCheck, ExternalLink, Users } from "lucide-react";
import { Icon } from "@/components/Icon";
import { AppMock } from "@/components/sections/Products";
import { QuoteButton } from "@/components/site/QuoteButton";
import { Eyebrow, JsonLd, Reveal, Breadcrumbs } from "@/components/ui";
import { getBySlug, getPublished } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await getPublished("products");
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getBySlug("products", slug);
  if (!product) return { title: "Product not found", robots: { index: false } };
  return pageMetadata({
    title: product.seoTitle || `${product.name} – ${product.tagline}`,
    description: product.seoDescription || product.short,
    path: `/products/${product.slug}`,
    keywords: [product.name, product.tagline, ...product.audience],
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [product, products] = await Promise.all([getBySlug("products", slug), getPublished("products")]);
  if (!product) notFound();
  const index = products.findIndex((p) => p.slug === product.slug);
  const others = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Products", path: "/products" },
          { name: product.name, path: `/products/${product.slug}` },
        ])}
      />
      <section className="relative overflow-hidden bg-soft pb-20 pt-12 md:pb-28 md:pt-16">
        <div className="grid-bg mask-fade-y pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="animate-blob pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand/15 blur-3xl" aria-hidden="true" />
        <div className="container-x relative">
          <Reveal type="fade" className="[&_ol]:justify-start">
            <Breadcrumbs items={[{ name: "Products", path: "/products" }, { name: product.name }]} />
          </Reveal>
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <Eyebrow>{product.tagline}</Eyebrow>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="mt-5 font-display text-[36px] font-bold leading-[1.1] text-ink md:text-[50px]">{product.name}</h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="mt-5 text-[17px] leading-relaxed text-body md:text-lg">{product.description}</p>
              </Reveal>
              <Reveal delay={200} className="mt-8 flex flex-wrap gap-3">
                <QuoteButton service={product.name} className="btn btn-primary btn-lg">
                  Request a Free Demo <ArrowRight className="arrow h-5 w-5" />
                </QuoteButton>
                {product.link ? (
                  <a href={product.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">
                    Visit <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
              </Reveal>
            </div>
            <Reveal type="zoom" delay={150}>
              <AppMock title={product.name} icon={product.icon} variant={Math.max(0, index)} image={product.image} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <div className="mx-auto max-w-[720px] text-center">
            <Reveal>
              <Eyebrow>Key Features</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="h-display mt-5">
                Everything You Need, <span className="text-gradient">In One Place</span>
              </h2>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((f, i) => (
              <Reveal key={f} delay={(i % 3) * 90}>
                <div className="card card-hover gborder group flex h-full items-start gap-4 p-6">
                  <span className="icon-tile !h-12 !w-12 shrink-0">
                    <CircleCheck className="h-6 w-6" />
                  </span>
                  <p className="pt-2.5 text-[16px] font-semibold text-ink">{f}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {product.audience.length ? (
            <Reveal className="mt-14">
              <div className="flex flex-col items-center gap-5 rounded-3xl bg-ink p-8 text-center text-white md:flex-row md:justify-between md:p-10 md:text-left">
                <div className="flex items-center gap-4">
                  <span className="bg-brand-gradient flex h-12 w-12 items-center justify-center rounded-2xl">
                    <Users className="h-6 w-6" />
                  </span>
                  <p className="font-display text-xl font-semibold">Ideal for</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {product.audience.map((a) => (
                    <span key={a} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      {others.length ? (
        <section className="pb-6">
          <div className="container-x">
            <h2 className="text-center font-display text-2xl font-bold">Other products</h2>
            <div className="mx-auto mt-8 grid max-w-[900px] gap-5 md:grid-cols-2">
              {others.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="card card-hover group flex items-center gap-4 p-6">
                  <span className="icon-tile !h-12 !w-12">
                    <Icon name={p.icon} className="h-6 w-6" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold text-ink group-hover:text-brand">{p.name}</span>
                    <span className="text-sm text-muted">{p.tagline}</span>
                  </span>
                  <ArrowRight className="h-5 w-5 text-muted transition group-hover:translate-x-1 group-hover:text-brand" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
