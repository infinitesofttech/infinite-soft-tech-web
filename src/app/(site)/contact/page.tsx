import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaqSection } from "@/components/sections/FaqBlog";
import { WhatsappIcon } from "@/components/SocialIcons";
import { LeadForm } from "@/components/site/Forms";
import { Eyebrow, JsonLd, PageHero, Reveal } from "@/components/ui";
import { getPublished, getSettings } from "@/lib/content";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us – Get a Free Quote",
  description:
    "Contact Infinite Soft Tech, CG Road, Ahmedabad for website, mobile app, ERP, CRM and AI development. Call +91 94092 59294 or send your requirements for a free quote.",
  path: "/contact",
  keywords: ["contact software company Ahmedabad", "get quote website development", "Infinite Soft Tech contact"],
});

export default async function ContactPage() {
  const [settings, services, faqs] = await Promise.all([getSettings(), getPublished("services"), getPublished("faqs")]);
  const s = settings;
  const cards = [
    { title: "Call Us", value: s.phoneDisplay, href: `tel:${s.phone}`, Icon: Phone, external: false },
    { title: "E-mail Us", value: s.email, href: `mailto:${s.email}`, Icon: Mail, external: false },
    { title: "WhatsApp", value: "Chat instantly", href: whatsappLink(s.whatsapp, "Hi Infinite Soft Tech!"), Icon: WhatsappIcon, external: true },
    { title: "Visit Office", value: `${s.address}, ${s.city}`, href: s.mapUrl, Icon: MapPin, external: true },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Contact", path: "/contact" }])} />
      <PageHero
        eyebrow="Contact Us"
        crumbs={[{ name: "Contact" }]}
        title={
          <>
            Let&apos;s Talk About <span className="text-gradient">Your Project</span>
          </>
        }
        text="Have a project in mind or need expert IT solutions? Share your requirements — we're here to help."
      />

      <section className="relative -mt-10 pb-6">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ title, value, href, Icon, external }, i) => (
            <Reveal key={title} delay={i * 90} className="h-full">
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="card card-hover gborder group flex h-full items-center gap-4 p-6"
              >
                <span className="icon-tile !h-12 !w-12 shrink-0">
                  <Icon className="h-5 w-5" width={20} height={20} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-muted">{title}</span>
                  <span className="block break-words font-semibold text-ink group-hover:text-brand">{value}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-[1.25fr_1fr]">
          <Reveal type="left">
            <div className="card p-6 sm:p-10">
              <Eyebrow>Send a Message</Eyebrow>
              <h2 className="mt-4 font-display text-[28px] font-bold leading-tight md:text-[34px]">
                Get a <span className="text-gradient">Free Quote</span>
              </h2>
              <p className="mt-2 text-body">Fill in the details and our team will get back to you within 24 working hours.</p>
              <div className="mt-8">
                <LeadForm type="contact" services={services.map((x) => x.title)} whatsapp={s.whatsapp} />
              </div>
            </div>
          </Reveal>
          <div className="space-y-6">
            <Reveal type="right">
              <div className="overflow-hidden rounded-3xl border border-line shadow-[var(--shadow-card)]">
                <iframe
                  title="Infinite Soft Tech office location on Google Maps"
                  src={s.mapEmbedUrl}
                  className="h-[340px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
            <Reveal type="right" delay={100}>
              <div className="rounded-3xl bg-ink p-7 text-white">
                <div className="flex items-center gap-3">
                  <span className="bg-brand-gradient flex h-11 w-11 items-center justify-center rounded-xl">
                    <Clock className="h-5 w-5" />
                  </span>
                  <p className="font-display text-lg font-semibold">Working Hours</p>
                </div>
                <ul className="mt-5 space-y-2.5 text-[15px] text-white/80">
                  {s.hours.map((h) => (
                    <li key={h} className="flex items-center justify-between gap-4 border-b border-white/10 pb-2.5 last:border-0">
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-start gap-3 text-[15px] text-white/80">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-pink" />
                  {s.address}, {s.city}, {s.state} {s.postalCode}, India
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="bg-soft">
        <FaqSection
          faqs={faqs.filter((f) => f.category === "General")}
          phone={s.phone}
          phoneDisplay={s.phoneDisplay}
          whatsapp={s.whatsapp}
        />
      </div>
    </>
  );
}
