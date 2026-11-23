import type { Metadata } from "next";
import { ArrowDown, GraduationCap, Mail, Phone } from "lucide-react";
import { Icon } from "@/components/Icon";
import { WhatsappIcon } from "@/components/SocialIcons";
import { Accordion } from "@/components/sections/Accordion";
import { ProgramCard } from "@/components/sections/Internship";
import { InternshipForm } from "@/components/site/Forms";
import { Eyebrow, JsonLd, PageHero, Reveal, SectionHeading } from "@/components/ui";
import { getPublished, getSettings } from "@/lib/content";
import { breadcrumbLd, coursesLd, faqLd, pageMetadata } from "@/lib/seo";
import { INTERNSHIP_BENEFITS, INTERNSHIP_STEPS } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "IT Internship in Ahmedabad with Live Projects",
  description:
    "Apply for an IT internship in Ahmedabad at Infinite Soft Tech. Work on live projects in MERN, React, Python Django, Java, Flutter, UI/UX, testing and AI/ML with mentorship and a certificate.",
  path: "/internship",
  keywords: [
    "IT internship Ahmedabad",
    "internship for BCA MCA students",
    "computer engineering internship Ahmedabad",
    "MERN stack internship",
    "Python Django internship",
    "Flutter internship",
    "live project training Ahmedabad",
  ],
});

export default async function InternshipPage() {
  const [settings, programs, faqs] = await Promise.all([getSettings(), getPublished("internships"), getPublished("faqs")]);
  const internshipFaqs = faqs.filter((f) => f.category === "Internship");

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Internship", path: "/internship" }]),
          ...(programs.length ? [coursesLd(programs)] : []),
          ...(internshipFaqs.length ? [faqLd(internshipFaqs)] : []),
        ]}
      />
      <PageHero
        eyebrow={settings.internshipOpen ? "Admissions Open" : "Internship Program"}
        crumbs={[{ name: "Internship" }]}
        title={
          <>
            IT Internship in Ahmedabad <span className="text-gradient">With Live Projects</span>
          </>
        }
        text="Learn industry-ready skills by building real software with our developers. For BE / B.Tech, BCA, MCA, B.Sc IT, Diploma students and freshers."
      >
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#apply" className="btn btn-primary btn-lg">
            Apply Now <ArrowDown className="arrow h-5 w-5" />
          </a>
          <a href="#programs" className="btn btn-outline btn-lg">
            Explore Programs
          </a>
          <a
            href={whatsappLink(settings.whatsapp, "Hi Infinite Soft Tech, I want to know about the internship program.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-lg"
          >
            <WhatsappIcon width={20} height={20} /> Ask on WhatsApp
          </a>
        </div>
      </PageHero>

      {/* Benefits */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why Intern With Us"
            title={
              <>
                More Than an Internship — <span className="text-gradient">A Career Launchpad</span>
              </>
            }
            text="Our interns learn the way professional developers work every day."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {INTERNSHIP_BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) * 90}>
                <div className="card card-hover gborder group h-full p-7">
                  <span className="icon-tile">
                    <Icon name={b.icon} className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{b.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-body">{b.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="section-y bg-soft" id="programs">
        <div className="container-x">
          <SectionHeading
            eyebrow="Internship Programs"
            title={
              <>
                Choose Your <span className="text-gradient">Technology</span>
              </>
            }
            text="Every program includes fundamentals, guided practice and contribution to a live project."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((p, i) => (
              <ProgramCard key={p.id} program={p} index={i} applyInline />
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-y">
        <div className="container-x">
          <SectionHeading
            eyebrow="How It Works"
            title={
              <>
                Your Journey in <span className="text-gradient">5 Simple Steps</span>
              </>
            }
          />
          <div className="relative mt-14">
          <div className="bg-brand-gradient pointer-events-none absolute left-[10%] right-[10%] top-8 hidden h-0.5 opacity-30 md:block" aria-hidden="true" />
          <ol className="relative grid gap-6 md:grid-cols-5">
            {INTERNSHIP_STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 110} className="relative text-center">
                <div className="group">
                  <span className="bg-brand-gradient relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl font-display text-xl font-bold text-white shadow-[var(--shadow-glow)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-body">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          </div>
        </div>
      </section>

      {/* Apply form + FAQ */}
      <section className="section-y bg-soft" id="apply">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <Reveal>
              <Eyebrow>Apply Online</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="h-display mt-5">
                Start Your <span className="text-gradient">Tech Career</span> Today
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 text-[17px] leading-relaxed text-body">
                Fill in the form and our HR team will contact you with batch details. Questions? Call or e-mail us anytime.
              </p>
            </Reveal>
            <Reveal delay={200} className="mt-6 space-y-3">
              <a href={`tel:${settings.phone}`} className="flex items-center gap-3 font-semibold text-ink hover:text-brand">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand">
                  <Phone className="h-4 w-4" />
                </span>
                {settings.phoneDisplay}
              </a>
              <a href={`mailto:${settings.email}`} className="flex items-center gap-3 font-semibold text-ink hover:text-brand">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand">
                  <Mail className="h-4 w-4" />
                </span>
                {settings.email}
              </a>
            </Reveal>
            {internshipFaqs.length ? (
              <Reveal delay={260} className="mt-10">
                <h3 className="mb-4 text-xl font-bold">Internship FAQs</h3>
                <Accordion items={internshipFaqs.map(({ id, question, answer }) => ({ id, question, answer }))} />
              </Reveal>
            ) : null}
          </div>
          <Reveal type="right" className="lg:sticky lg:top-28 lg:self-start">
            <div className="card overflow-hidden">
              <div className="bg-brand-gradient flex items-center gap-4 p-6 text-white">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                  <GraduationCap className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-display text-xl font-bold">Internship Application</p>
                  <p className="text-sm text-white/80">Takes less than 2 minutes</p>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <InternshipForm programs={programs.map((p) => p.title)} whatsapp={settings.whatsapp} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
