import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";
import type { BlogPost, Faq, InternshipProgram, Service, Settings } from "./types";

export const DEFAULT_KEYWORDS = [
  "software development company in Ahmedabad",
  "IT company in Ahmedabad",
  "website development company Ahmedabad",
  "mobile app development company Ahmedabad",
  "custom ERP software development",
  "CRM software development",
  "custom software development India",
  "e-commerce website development",
  "SaaS development company",
  "AI development company India",
  "IT internship in Ahmedabad",
  "internship for computer engineering students",
  "Infinite Soft Tech",
];

export function absUrl(path = "/") {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function ogImageUrl(title: string, subtitle?: string) {
  const params = new URLSearchParams({ title });
  if (subtitle) params.set("subtitle", subtitle);
  return `/og?${params.toString()}`;
}

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  absoluteTitle?: boolean;
}

/** Builds complete SEO metadata (canonical, Open Graph, Twitter) for a page. */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  image,
  type = "website",
  publishedTime,
  absoluteTitle,
}: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const ogImage = image || ogImageUrl(title);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: [...(keywords ?? []), ...DEFAULT_KEYWORDS].slice(0, 20),
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      locale: "en_IN",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

/* ------------------------------ JSON-LD ------------------------------ */

const ORG_ID = `${SITE_URL}/#organization`;

function sameAs(s: Settings) {
  return [s.linkedin, s.instagram, s.youtube, s.facebook, s.twitter].filter(Boolean);
}

export function organizationLd(s: Settings) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: s.companyName,
    alternateName: ["Infinite SoftTech", "IST"],
    url: SITE_URL,
    logo: absUrl("/images/logo.png"),
    slogan: s.tagline,
    email: s.email,
    telephone: s.phone,
    sameAs: sameAs(s),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: s.phone,
        email: s.email,
        contactType: "sales",
        areaServed: "Worldwide",
        availableLanguage: ["English", "Hindi", "Gujarati"],
      },
    ],
  };
}

export function localBusinessLd(s: Settings) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness`,
    name: s.companyName,
    description:
      "Software development company in Ahmedabad offering website, mobile app, ERP, CRM, SaaS and AI development, plus IT internships for students.",
    url: SITE_URL,
    image: absUrl("/images/logo.png"),
    logo: absUrl("/images/logo.png"),
    telephone: s.phone,
    email: s.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: s.address,
      addressLocality: s.city,
      addressRegion: s.state,
      postalCode: s.postalCode,
      addressCountry: "IN",
    },
    hasMap: s.mapUrl,
    areaServed: ["Ahmedabad", "Gujarat", "India", "Worldwide"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "16:00" },
    ],
    parentOrganization: { "@id": ORG_ID },
    sameAs: sameAs(s),
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en-IN",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  };
}

export function serviceLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url: absUrl(`/services/${service.slug}`),
    provider: { "@id": ORG_ID, "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    areaServed: ["India", "Worldwide"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} services`,
      itemListElement: service.features.map((f) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: f },
      })),
    },
  };
}

export function faqLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [post.cover ? absUrl(post.cover) : absUrl(ogImageUrl(post.title))],
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author || SITE_NAME, url: SITE_URL },
    publisher: { "@id": ORG_ID, "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: absUrl("/images/logo.png") } },
    mainEntityOfPage: absUrl(`/blog/${post.slug}`),
    keywords: post.tags.join(", "),
  };
}

export function coursesLd(programs: InternshipProgram[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "IT Internship Programs in Ahmedabad",
    itemListElement: programs.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: `${p.title} Internship`,
        description: p.description,
        url: absUrl("/internship"),
        provider: { "@type": "Organization", name: SITE_NAME, sameAs: SITE_URL },
      },
    })),
  };
}
