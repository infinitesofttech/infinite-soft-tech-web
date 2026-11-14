import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type RevealType = "up" | "down" | "left" | "right" | "zoom" | "fade";

/** Scroll-reveal wrapper (animation handled by RevealObserver + CSS). */
export function Reveal({
  children,
  type = "up",
  delay = 0,
  className,
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  type?: RevealType;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "span";
  id?: string;
}) {
  return (
    <Tag id={id} data-reveal={type} className={className} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span className={cn("eyebrow", dark && "eyebrow-dark")}>
      <span className="eyebrow-dot" aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  dark = false,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-[760px] text-center" : "max-w-[640px]", className)}>
      {eyebrow ? (
        <Reveal type="up">
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <Reveal type="up" delay={80}>
        <Tag className={cn("h-display mt-5", dark && "!text-white")}>{title}</Tag>
      </Reveal>
      {text ? (
        <Reveal type="up" delay={160}>
          <p className={cn("mt-5 text-[17px] leading-relaxed", dark ? "text-white/70" : "text-body")}>{text}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center justify-center gap-1.5 text-sm text-muted">
        <li>
          <Link href="/" className="link-underline hover:text-brand">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.name} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
            {item.path ? (
              <Link href={item.path} className="link-underline hover:text-brand">
                {item.name}
              </Link>
            ) : (
              <span className="font-medium text-ink" aria-current="page">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Hero banner used at the top of inner pages. */
export function PageHero({
  eyebrow,
  title,
  text,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  crumbs: { name: string; path?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-soft pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="grid-bg mask-fade-y pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="animate-blob pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand/15 blur-3xl" aria-hidden="true" />
      <div className="animate-blob pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-pink/15 blur-3xl [animation-delay:-6s]" aria-hidden="true" />
      <div className="container-x relative text-center">
        <Reveal type="fade">
          <Breadcrumbs items={crumbs} />
        </Reveal>
        {eyebrow ? (
          <Reveal type="up" delay={60} className="mt-6">
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        ) : null}
        <Reveal type="up" delay={120}>
          <h1 className="mx-auto mt-5 max-w-[880px] font-display text-[34px] font-bold leading-[1.12] text-ink sm:text-[44px] lg:text-[54px]">
            {title}
          </h1>
        </Reveal>
        {text ? (
          <Reveal type="up" delay={200}>
            <p className="mx-auto mt-5 max-w-[720px] text-[17px] leading-relaxed text-body md:text-lg">{text}</p>
          </Reveal>
        ) : null}
        {children ? (
          <Reveal type="up" delay={280} className="mt-8">
            {children}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
