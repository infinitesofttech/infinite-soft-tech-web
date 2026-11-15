import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { SocialLinks } from "@/components/SocialIcons";
import { Reveal } from "@/components/ui";
import { SOLUTIONS } from "@/lib/solutions";
import type { Service, Settings } from "@/lib/types";
import { QuoteButton } from "./QuoteButton";

export function CtaBand() {
  return (
    <section className="relative z-10 -mb-24 pt-16 md:pt-24" aria-label="Start a project">
      <div className="container-x">
        <Reveal type="zoom">
          <div className="bg-brand-gradient relative overflow-hidden rounded-[32px] px-6 py-12 text-center shadow-[0_40px_80px_-30px_rgba(43,68,255,0.55)] sm:px-12 md:py-14 lg:flex lg:items-center lg:justify-between lg:text-left">
            <div className="grid-bg-dark pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
            <div className="animate-blob absolute -left-10 -top-16 h-56 w-56 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />
            <div className="animate-spin-slower absolute -bottom-40 -right-24 h-80 w-80 rounded-full border-[30px] border-white/10" aria-hidden="true" />
            <div className="relative max-w-[640px]">
              <h2 className="font-display text-[28px] font-bold leading-tight !text-white md:text-[38px]">
                Have a project in mind? Let&apos;s build it together.
              </h2>
              <p className="mt-3 text-[17px] text-white/80">
                Website, mobile app, ERP, CRM or AI — share your idea and get a free consultation & estimate.
              </p>
            </div>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3 lg:mt-0 lg:shrink-0">
              <QuoteButton className="btn btn-white btn-lg">
                Get Free Quote <ArrowRight className="arrow h-4 w-4" />
              </QuoteButton>
              <Link href="/contact" className="btn btn-ghost-light btn-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer({ settings: s, services }: { settings: Settings; services: Service[] }) {
  const year = new Date().getFullYear();
  const company = [
    { href: "/about", label: "About Us" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/products", label: "Our Products" },
    { href: "/internship", label: "Internship" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <CtaBand />
      <footer className="relative overflow-hidden bg-ink pt-40 text-white/70">
        <div className="grid-bg-dark mask-fade-y pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-brand/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-pink/15 blur-3xl" aria-hidden="true" />

        <div className="container-x relative grid grid-cols-2 gap-x-6 gap-y-12 pb-14 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block rounded-2xl bg-white px-4 py-3" aria-label="Infinite Soft Tech — Home">
              <Image src="/images/logo.png" alt="Infinite Soft Tech logo" width={1100} height={400} sizes="160px" className="h-12 w-auto" />
            </Link>
            <p className="mt-6 max-w-[320px] text-[15px] leading-relaxed">
              AI-powered software company in Ahmedabad building websites, mobile apps, ERP, CRM and SaaS products for modern businesses.
            </p>
            <p className="text-gradient mt-4 font-display text-[15px] font-semibold">{s.tagline}</p>
            <SocialLinks
              links={{
                linkedin: s.linkedin,
                instagram: s.instagram,
                youtube: s.youtube,
                facebook: s.facebook,
                twitter: s.twitter,
                whatsapp: `https://wa.me/${s.whatsapp}`,
              }}
              className="mt-6 flex flex-wrap gap-2.5"
              itemClassName="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-white hover:text-brand"
            />
          </div>

          <div>
            <h3 className="font-display text-base font-semibold !text-white">Services</h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              {services.slice(0, 5).map((svc) => (
                <li key={svc.slug}>
                  <Link href={`/services/${svc.slug}`} className="link-underline transition hover:text-white">
                    {svc.title}
                  </Link>
                </li>
              ))}
              {SOLUTIONS.map((sol) => (
                <li key={sol.slug}>
                  <Link href={`/solutions/${sol.slug}`} className="link-underline transition hover:text-white">
                    {sol.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold !text-white">Company</h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              {company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-display text-base font-semibold !text-white">Get in Touch</h3>
            <ul className="mt-5 space-y-4 text-[15px]">
              <li>
                <a href={s.mapUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 transition hover:text-white">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-pink" />
                  <span>
                    {s.address}, {s.city}, {s.state} {s.postalCode}
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${s.phone}`} className="flex gap-3 transition hover:text-white">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-pink" /> {s.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${s.email}`} className="flex gap-3 break-all transition hover:text-white">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-pink" /> {s.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-pink" />
                <span>
                  {s.hours.map((h) => (
                    <span key={h} className="block">
                      {h}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative border-t border-white/10">
          <div className="container-x flex flex-col items-center justify-between gap-3 pb-28 pt-6 text-center text-sm sm:flex-row sm:pb-6 sm:text-left">
            <p>
              © {year} {s.companyName}. All rights reserved.
            </p>
            <div className="flex gap-5">
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms of Use
              </Link>
              <Link href="/sitemap.xml" className="hover:text-white" prefetch={false}>
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
