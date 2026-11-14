import type { MetadataRoute } from "next";
import { absUrl } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] }],
    sitemap: absUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
