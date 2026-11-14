import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async redirects() {
    // Old URLs from the previous website -> new pages (keeps Google rankings).
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/services-3.html", destination: "/services", permanent: true },
      { source: "/service-details.html", destination: "/services", permanent: true },
      { source: "/product.html", destination: "/products", permanent: true },
      { source: "/product-details.html", destination: "/products", permanent: true },
      { source: "/portfolio.html", destination: "/portfolio", permanent: true },
      { source: "/projects.html", destination: "/portfolio", permanent: true },
      { source: "/project-details.html", destination: "/portfolio", permanent: true },
      { source: "/gallery-filter.html", destination: "/about", permanent: true },
      { source: "/team.html", destination: "/about#team", permanent: true },
      { source: "/team-details.html", destination: "/about#team", permanent: true },
      { source: "/technology.html", destination: "/services", permanent: true },
      { source: "/technology-details.html", destination: "/services", permanent: true },
      { source: "/industries.html", destination: "/about#industries", permanent: true },
      { source: "/industries-details.html", destination: "/about#industries", permanent: true },
      { source: "/faq.html", destination: "/contact#faq", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/blog-grid-2.html", destination: "/blog", permanent: true },
      { source: "/blog.html", destination: "/blog", permanent: true },
      { source: "/cart.html", destination: "/", permanent: true },
      { source: "/checkout.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
