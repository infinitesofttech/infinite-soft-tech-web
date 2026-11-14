import type { Metadata } from "next";

// Admin pages depend on the login cookie and env vars at request time — never prerender them.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Admin Panel", template: "%s | Admin · Infinite Soft Tech" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-soft text-ink">{children}</div>;
}
