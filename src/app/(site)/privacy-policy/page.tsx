import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { getSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Infinite Soft Tech collects, uses and protects the information you share through our website.",
  path: "/privacy-policy",
});

export default async function PrivacyPage() {
  const s = await getSettings();
  return (
    <>
      <PageHero crumbs={[{ name: "Privacy Policy" }]} title="Privacy Policy" text="Last updated: November 2026" />
      <section className="section-y">
        <div className="container-x max-w-[860px]">
          <div className="prose-ist">
            <p>
              {s.companyName} (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy explains what information we collect through
              this website and how we use it.
            </p>
            <h2>Information we collect</h2>
            <ul>
              <li>Details you submit in our forms — such as your name, e-mail, phone number, company, project requirements or internship application details.</li>
              <li>Basic technical data like browser type and pages visited, collected through analytics tools to improve our website.</li>
            </ul>
            <h2>How we use your information</h2>
            <ul>
              <li>To respond to your enquiries, prepare quotes and provide our services.</li>
              <li>To process internship applications and contact applicants.</li>
              <li>To improve our website, services and communication.</li>
            </ul>
            <p>We do not sell or rent your personal information to third parties.</p>
            <h2>Data security</h2>
            <p>
              We use reasonable technical and organisational measures to protect your data. Access to submitted information is restricted
              to authorised team members.
            </p>
            <h2>Cookies</h2>
            <p>
              Our website may use essential cookies and analytics cookies. You can control cookies through your browser settings.
            </p>
            <h2>Your rights</h2>
            <p>
              You can ask us to access, correct or delete the personal information you have shared with us by e-mailing{" "}
              <a href={`mailto:${s.email}`}>{s.email}</a>.
            </p>
            <h2>Contact</h2>
            <p>
              {s.companyName}, {s.address}, {s.city}, {s.state} {s.postalCode}, India · Phone: {s.phoneDisplay}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
