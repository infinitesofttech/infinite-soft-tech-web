import Link from "next/link";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Icon } from "@/components/Icon";
import { QuoteButton } from "@/components/site/QuoteButton";
import { Reveal, SectionHeading } from "@/components/ui";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Illustrated app mock-up (used when no screenshot is uploaded). */
export function AppMock({ title, icon, variant = 0, image }: { title: string; icon: string; variant?: number; image?: string }) {
  const tint = variant % 2 === 0 ? "from-brand to-violet" : "from-violet to-pink";
  return (
    <div className="relative">
      <div className={cn("absolute -inset-4 rounded-[32px] bg-gradient-to-br opacity-20 blur-2xl", tint)} aria-hidden="true" />
      <div className="relative overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_30px_60px_-25px_rgba(16,24,64,0.35)]">
        <div className="flex items-center gap-2 border-b border-line bg-soft px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 truncate rounded-md bg-white px-3 py-1 text-[11px] text-muted">{title}</span>
        </div>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={`${title} screenshot`} loading="lazy" className="aspect-[16/10] w-full object-cover" />
        ) : (
          <div className="grid aspect-[16/10] grid-cols-[26%_1fr]" aria-hidden="true">
            <div className={cn("bg-gradient-to-b p-3 text-white", tint)}>
              <div className="flex items-center gap-1.5">
                <Icon name={icon} className="h-4 w-4" />
                <span className="h-2 w-12 rounded-full bg-white/60" />
              </div>
              <div className="mt-5 space-y-2.5">
                {[80, 64, 72, 56, 68].map((w, i) => (
                  <div key={i} className={cn("flex items-center gap-1.5 rounded-md px-1.5 py-1", i === 0 && "bg-white/20")}>
                    <span className="h-2.5 w-2.5 rounded bg-white/70" />
                    <span className="h-1.5 rounded-full bg-white/60" style={{ width: `${w}%` }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3 p-3 sm:p-4">
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-lg border border-line p-2">
                    <span className="block h-1.5 w-8 rounded-full bg-soft-2" />
                    <span className={cn("mt-1.5 block h-3 w-10 rounded bg-gradient-to-r", tint)} />
                  </div>
                ))}
              </div>
              <div className="flex h-[38%] items-end gap-1.5 rounded-lg border border-line p-2">
                {[40, 65, 50, 80, 60, 90, 70, 85].map((h, i) => (
                  <span key={i} className={cn("flex-1 rounded-t bg-gradient-to-t opacity-80", tint)} style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="space-y-1.5">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-2 rounded-md bg-soft px-2 py-1.5">
                    <span className="h-3.5 w-3.5 rounded-full bg-brand-100" />
                    <span className="h-1.5 flex-1 rounded-full bg-soft-2" />
                    <span className="h-3 w-8 rounded-full bg-success/20" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProductFeature({ product, index }: { product: Product; index: number }) {
  const reverse = index % 2 === 1;
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal type={reverse ? "right" : "left"} className={cn(reverse && "lg:order-2")}>
        <AppMock title={product.name} icon={product.icon} variant={index} image={product.image} />
      </Reveal>
      <div>
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <span className="icon-tile !h-12 !w-12">
              <Icon name={product.icon} className="h-6 w-6" />
            </span>
            <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-success">{product.status}</span>
            <span className="text-sm font-semibold text-muted">{product.tagline}</span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h3 className="mt-5 font-display text-[28px] font-bold leading-tight md:text-[34px]">{product.name}</h3>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-4 text-[16px] leading-relaxed text-body">{product.description}</p>
        </Reveal>
        <Reveal delay={200}>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[15px] font-medium text-ink-3">
                <CircleCheck className="mt-0.5 h-[18px] w-[18px] shrink-0 text-brand" /> {f}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={260} className="mt-8 flex flex-wrap gap-3">
          <QuoteButton service={product.name} className="btn btn-primary">
            Request a Demo <ArrowRight className="arrow h-4 w-4" />
          </QuoteButton>
          <Link href={`/products/${product.slug}`} className="btn btn-outline">
            Learn More
          </Link>
        </Reveal>
      </div>
    </div>
  );
}

export function ProductsSection({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="section-y relative overflow-hidden" id="products">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Products"
          title={
            <>
              Ready-to-Use Software, <span className="text-gradient whitespace-nowrap">Built In-House</span>
            </>
          }
          text="Proven products that we build, run and keep improving — customisable for your organisation."
        />
        <div className="mt-16 space-y-24">
          {products.map((p, i) => (
            <ProductFeature key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
