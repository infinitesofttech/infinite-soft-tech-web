import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, UserRound } from "lucide-react";
import { BlogCard } from "@/components/sections/FaqBlog";
import { LinkedinIcon, WhatsappIcon, XIcon, FacebookIcon } from "@/components/SocialIcons";
import { QuoteButton } from "@/components/site/QuoteButton";
import { Breadcrumbs, JsonLd, Reveal } from "@/components/ui";
import { getBySlug, getPublished } from "@/lib/content";
import { renderMarkdown } from "@/lib/markdown";
import { absUrl, articleLd, breadcrumbLd, pageMetadata } from "@/lib/seo";
import { formatDate, readingTime } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPublished("blog");
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBySlug("blog", slug);
  if (!post) return { title: "Article not found", robots: { index: false } };
  return pageMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.tags,
    image: post.cover || undefined,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, posts] = await Promise.all([getBySlug("blog", slug), getPublished("blog")]);
  if (!post) notFound();

  const html = renderMarkdown(post.content);
  const url = absUrl(`/blog/${post.slug}`);
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const share = [
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, Icon: LinkedinIcon },
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}`, Icon: WhatsappIcon },
    { label: "Share on X", href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`, Icon: XIcon },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, Icon: FacebookIcon },
  ];

  return (
    <>
      <JsonLd
        data={[
          articleLd(post),
          breadcrumbLd([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <article>
        <header className="relative overflow-hidden bg-soft pb-14 pt-12 md:pb-20 md:pt-16">
          <div className="grid-bg mask-fade-y pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="animate-blob pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-violet/15 blur-3xl" aria-hidden="true" />
          <div className="container-x relative max-w-[900px] text-center">
            <Reveal type="fade">
              <Breadcrumbs items={[{ name: "Blog", path: "/blog" }, { name: post.tags[0] ?? "Article" }]} />
            </Reveal>
            <Reveal delay={60} className="mt-6 flex flex-wrap justify-center gap-2">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand">
                  {t}
                </span>
              ))}
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-5 font-display text-[32px] font-bold leading-[1.15] text-ink md:text-[46px]">{post.title}</h1>
            </Reveal>
            <Reveal delay={180} className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-muted">
              <span className="flex items-center gap-1.5">
                <UserRound className="h-4 w-4" /> {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {readingTime(post.content)} min read
              </span>
            </Reveal>
          </div>
        </header>

        <div className="container-x grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0">
            {post.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={post.cover} alt={post.title} className="mb-10 aspect-[16/8] w-full rounded-3xl object-cover" />
            ) : null}
            <p className="mb-8 border-l-4 border-violet pl-5 text-lg font-medium leading-relaxed text-ink-3">{post.excerpt}</p>
            <div className="prose-ist" dangerouslySetInnerHTML={{ __html: html }} />

            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
              <Link href="/blog" className="inline-flex items-center gap-2 font-semibold text-brand">
                <ArrowLeft className="h-4 w-4" /> Back to blog
              </Link>
              <div className="flex items-center gap-2">
                <span className="mr-1 text-sm font-semibold text-ink">Share:</span>
                {share.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:-translate-y-0.5 hover:border-transparent hover:bg-ink hover:text-white"
                  >
                    <Icon width={16} height={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="bg-brand-gradient relative overflow-hidden rounded-3xl p-7 text-white">
              <div className="grid-bg-dark absolute inset-0 opacity-60" aria-hidden="true" />
              <div className="relative">
                <p className="font-display text-xl font-bold leading-snug">Planning a website, app or ERP?</p>
                <p className="mt-2 text-sm text-white/80">Get a free consultation and estimate from our experts.</p>
                <QuoteButton className="btn btn-white btn-sm mt-5">
                  Get Free Quote <ArrowRight className="arrow h-4 w-4" />
                </QuoteButton>
              </div>
            </div>
            <div className="mt-5 rounded-3xl border border-line p-6">
              <p className="font-display font-semibold text-ink">Are you a student?</p>
              <p className="mt-1 text-sm text-body">Join our live-project IT internship in Ahmedabad.</p>
              <Link href="/internship" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                View internship programs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </article>

      {related.length ? (
        <section className="section-y bg-soft">
          <div className="container-x">
            <h2 className="text-center font-display text-[28px] font-bold md:text-[34px]">
              Keep <span className="text-gradient">Reading</span>
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 100} className="h-full">
                  <BlogCard post={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
