import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { getSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms and conditions for using the Infinite Soft Tech website.",
  path: "/terms",
});

export default async function TermsPage() {
  const s = await getSettings();
  return (
    <>
      <PageHero crumbs={[{ name: "Terms of Use" }]} title="Terms of Use" text="Last updated: November 2026" />
      <section className="section-y">
        <div className="container-x max-w-[860px]">
          <div className="prose-ist">
            <p>By using this website you agree to the following terms. Please read them carefully.</p>
            <h2>Use of this website</h2>
            <p>
              The content on this website is provided for general information about {s.companyName} and our services. It may change
              without notice.
            </p>
            <h2>Intellectual property</h2>
            <p>
              All content, branding, logos and designs on this website belong to {s.companyName} unless stated otherwise and may not be
              copied without written permission.
            </p>
            <h2>Quotes and proposals</h2>
            <p>
              Estimates shared through this website are indicative. Final scope, pricing and timelines are confirmed in a written proposal
              or agreement.
            </p>
            <h2>Third-party links</h2>
            <p>This website may link to external websites. We are not responsible for their content or privacy practices.</p>
            <h2>Limitation of liability</h2>
            <p>
              We make every effort to keep information accurate, but we are not liable for any loss arising from the use of this website.
            </p>
            <h2>Governing law</h2>
            <p>These terms are governed by the laws of India, with courts in Ahmedabad, Gujarat having jurisdiction.</p>
            <h2>Contact</h2>
            <p>
              Questions about these terms? E-mail <a href={`mailto:${s.email}`}>{s.email}</a> or call {s.phoneDisplay}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
