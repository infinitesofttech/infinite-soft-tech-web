import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, Target } from "lucide-react";
import { DeliveryGroups, EngagementSection, IndustriesSection, StatsBand, ValuesGrid } from "@/components/sections/Blocks";
import { TechStackGrid } from "@/components/sections/Services";
import { TeamGrid } from "@/components/sections/Social";
import { QuoteButton } from "@/components/site/QuoteButton";
import { Eyebrow, JsonLd, PageHero, Reveal, SectionHeading } from "@/components/ui";
import { getPublished, getSettings } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Us – Software Development Company in Ahmedabad",
  description:
    "Infinite Soft Tech is a custom software development company in Ahmedabad that partners with businesses to build, design and scale reliable digital products — websites, apps, ERP, CRM and AI.",
  path: "/about",
  keywords: ["about Infinite Soft Tech", "IT company Ahmedabad", "software company CG Road Ahmedabad"],
});

export default async function AboutPage() {
  const [settings, team] = await Promise.all([getSettings(), getPublished("team")]);

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "About", path: "/about" }])} />
      <PageHero
        eyebrow="About Infinite Soft Tech"
        crumbs={[{ name: "About" }]}
        title={
          <>
            We Build Technology That <span className="text-gradient">Moves Businesses Forward</span>
          </>
        }
        text="A custom software development company in Ahmedabad that partners with businesses to build, design and scale reliable digital products."
      />

      {/* Who we are */}
      <section className="section-y">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal type="left">
            <div className="relative mx-auto max-w-[520px]">
              <div className="bg-brand-gradient absolute -inset-4 rounded-[36px] opacity-20 blur-2xl" aria-hidden="true" />
              <div className="relative grid grid-cols-2 gap-4">
                <div className="bg-brand-gradient flex aspect-square flex-col justify-end rounded-3xl p-6 text-white shadow-xl">
                  <p className="font-display text-5xl font-extrabold">{settings.stats[0]?.value ?? 2}{settings.stats[0]?.suffix ?? "+"}</p>
                  <p className="mt-1 text-sm font-medium text-white/85">{settings.stats[0]?.label ?? "Years of Experience"}</p>
                </div>
                <div className="card mt-10 flex aspect-square flex-col justify-end p-6">
                  <p className="text-gradient font-display text-5xl font-extrabold">{settings.stats[1]?.value ?? 12}{settings.stats[1]?.suffix ?? "+"}</p>
                  <p className="mt-1 text-sm font-medium text-body">{settings.stats[1]?.label ?? "Services Offered"}</p>
                </div>
                <div className="card -mt-10 flex aspect-square flex-col justify-end p-6">
                  <p className="text-gradient font-display text-5xl font-extrabold">{settings.stats[2]?.value ?? 10}{settings.stats[2]?.suffix ?? "+"}</p>
                  <p className="mt-1 text-sm font-medium text-body">{settings.stats[2]?.label ?? "Industries Served"}</p>
                </div>
                <div className="flex aspect-square flex-col justify-end rounded-3xl bg-ink p-6 text-white shadow-xl">
                  <p className="font-display text-5xl font-extrabold">{settings.stats[3]?.value ?? 30}{settings.stats[3]?.suffix ?? "+"}</p>
                  <p className="mt-1 text-sm font-medium text-white/75">{settings.stats[3]?.label ?? "Technologies"}</p>
                </div>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <Eyebrow>Who We Are</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="h-display mt-5">
                The Advantage of Partnering With <span className="text-gradient">Infinite Soft Tech</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 text-[17px] leading-relaxed text-body">
                Infinite Soft Tech (IST) is a custom software development company based on CG Road, Ahmedabad. We partner with startups,
                SMEs and large companies to build, design and scale reliable digital products — from business websites and mobile apps to
                enterprise ERP, CRM and AI-driven solutions.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-4 text-[17px] leading-relaxed text-body">
                Our promise is simple: a structured engineering process, dependable delivery and scalable technology. We also train the
                next generation of developers through our live-project internship programs.
              </p>
            </Reveal>
            <Reveal delay={260} className="mt-8 flex flex-wrap gap-3">
              <QuoteButton className="btn btn-primary">
                Start a Project <ArrowRight className="arrow h-4 w-4" />
              </QuoteButton>
              <Link href="/portfolio" className="btn btn-outline">
                View Our Work
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="section-y bg-soft">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal type="left">
              <div className="card card-hover group h-full p-8 md:p-10">
                <span className="icon-tile">
                  <Eye className="h-7 w-7" />
                </span>
                <h2 className="mt-6 text-2xl font-bold">Our Vision</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-body">
                  To build dependable digital systems that help businesses operate efficiently, adapt to change and remain competitive in
                  evolving markets.
                </p>
              </div>
            </Reveal>
            <Reveal type="right">
              <div className="card card-hover group h-full p-8 md:p-10">
                <span className="icon-tile">
                  <Target className="h-7 w-7" />
                </span>
                <h2 className="mt-6 text-2xl font-bold">Our Mission</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-body">
                  To deliver future-ready AI, mobile, web and enterprise software with a structured engineering process — and to empower
                  students with real-world skills through hands-on internships.
                </p>
              </div>
            </Reveal>
          </div>
          <div className="mt-16">
            <SectionHeading eyebrow="Our Values" title={<>What We <span className="text-gradient">Stand For</span></>} />
            <div className="mt-12">
              <ValuesGrid />
            </div>
          </div>
        </div>
      </section>

      <div className="pt-16 md:pt-24">
        <StatsBand stats={settings.stats} />
      </div>
      <DeliveryGroups />
      <TeamGrid team={team} />
      <IndustriesSection />
      <EngagementSection />
      <TechStackGrid />
    </>
  );
}
