import Link from "next/link";
import { ArrowRight, ArrowUpRight, Calendar, Clock, MessageCircle, Phone } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui";
import type { BlogPost, Faq } from "@/lib/types";
import { formatDate, readingTime, whatsappLink } from "@/lib/utils";
import { Accordion } from "./Accordion";

export function FaqSection({
  faqs,
  phone,
  phoneDisplay,
  whatsapp,
  title,
  id = "faq",
}: {
  faqs: Faq[];
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  title?: React.ReactNode;
  id?: string;
}) {
  if (!faqs.length) return null;
  return (
    <section className="section-y" id={id}>
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title={
              title ?? (
                <>
                  Frequently Asked <span className="text-gradient">Questions</span>
                </>
              )
            }
            text="Can't find your answer? Talk to our team — we're happy to help."
          />
          <Reveal delay={220}>
            <div className="mt-8 overflow-hidden rounded-3xl bg-ink p-7 text-white">
              <div className="flex items-center gap-3">
                <span className="bg-brand-gradient flex h-12 w-12 items-center justify-center rounded-2xl">
                  <MessageCircle className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold">Still have questions?</p>
                  <p className="text-sm text-white/60">We usually reply within a few hours.</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href={`tel:${phone}`} className="btn btn-white btn-sm">
                  <Phone className="h-4 w-4" /> {phoneDisplay}
                </a>
                <a href={whatsappLink(whatsapp)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light btn-sm">
                  WhatsApp us
                </a>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={100}>
          <Accordion items={faqs.map(({ id: fid, question, answer }) => ({ id: fid, question, answer }))} />
        </Reveal>
      </div>
    </section>
  );
}

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
      <div className={`relative overflow-hidden ${featured ? "aspect-[16/8]" : "aspect-[16/9]"}`}>
        {post.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className="bg-brand-gradient relative flex h-full w-full items-end p-6 transition-transform duration-700 group-hover:scale-105" aria-hidden="true">
            <div className="grid-bg-dark absolute inset-0 opacity-70" />
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border-[18px] border-white/15" />
            <p className="relative line-clamp-2 font-display text-xl font-bold leading-snug text-white/95">{post.tags[0] ?? "Insights"}</p>
          </div>
        )}
        {post.cover ? (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-brand">{post.tags[0] ?? "Blog"}</span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-muted">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {readingTime(post.content)} min read
          </span>
        </div>
        <h3 className={`mt-3 font-semibold leading-snug transition-colors group-hover:text-brand ${featured ? "text-2xl" : "text-lg"}`}>{post.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-[15px] leading-relaxed text-body">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          Read article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function BlogSection({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;
  return (
    <section className="section-y bg-soft" id="blog">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Insights"
            title={
              <>
                Latest From <span className="text-gradient">Our Blog</span>
              </>
            }
            text="Practical guides on software, ERP, apps and tech careers."
          />
          <Reveal>
            <Link href="/blog" className="btn btn-outline shrink-0">
              All Articles <ArrowRight className="arrow h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} delay={i * 110} className="h-full">
              <BlogCard post={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
