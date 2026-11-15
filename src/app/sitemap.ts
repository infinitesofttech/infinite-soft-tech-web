import type { MetadataRoute } from "next";
import { getPublished } from "@/lib/content";
import { absUrl } from "@/lib/seo";
import { SOLUTIONS } from "@/lib/solutions";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, products, blog] = await Promise.all([getPublished("services"), getPublished("products"), getPublished("blog")]);
  const now = new Date();

  const staticPages: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/internship", priority: 0.9, freq: "weekly" },
    { path: "/about", priority: 0.8, freq: "monthly" },
    { path: "/products", priority: 0.8, freq: "monthly" },
    { path: "/portfolio", priority: 0.8, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "yearly" },
    { path: "/blog", priority: 0.7, freq: "weekly" },
    { path: "/privacy-policy", priority: 0.2, freq: "yearly" },
    { path: "/terms", priority: 0.2, freq: "yearly" },
  ];

  return [
    ...staticPages.map((p) => ({ url: absUrl(p.path), lastModified: now, changeFrequency: p.freq, priority: p.priority })),
    ...SOLUTIONS.map((s) => ({ url: absUrl(`/solutions/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 })),
    ...services.map((s) => ({ url: absUrl(`/services/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 })),
    ...products.map((p) => ({ url: absUrl(`/products/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.75 })),
    ...blog.map((b) => ({
      url: absUrl(`/blog/${b.slug}`),
      lastModified: new Date(b.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
