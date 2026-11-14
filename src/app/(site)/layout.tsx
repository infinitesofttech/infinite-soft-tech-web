import { FloatingActions } from "@/components/site/FloatingActions";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { QuoteModal } from "@/components/site/QuoteModal";
import { RevealObserver } from "@/components/site/RevealObserver";
import { TopBar } from "@/components/site/TopBar";
import { JsonLd } from "@/components/ui";
import { getPublished, getSettings } from "@/lib/content";
import { localBusinessLd, organizationLd, websiteLd } from "@/lib/seo";

// Pages are static & fast; they refresh automatically when content is saved in the admin panel
// (on-demand revalidation) and at least every 5 minutes as a safety net.
export const revalidate = 300;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, services, products] = await Promise.all([
    getSettings(),
    getPublished("services"),
    getPublished("products"),
  ]);

  return (
    <>
      <JsonLd data={[organizationLd(settings), localBusinessLd(settings), websiteLd()]} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <TopBar settings={settings} />
      <Navbar
        services={services.map(({ slug, title, short, icon, category }) => ({ slug, title, short, icon, category }))}
        products={products.map(({ slug, name, tagline, icon }) => ({ slug, name, tagline, icon }))}
        phone={settings.phone}
        phoneDisplay={settings.phoneDisplay}
      />
      <main id="main">{children}</main>
      <Footer settings={settings} services={services} />
      <FloatingActions whatsapp={settings.whatsapp} />
      <QuoteModal
        services={services.map((s) => s.title)}
        whatsapp={settings.whatsapp}
        phone={settings.phone}
        phoneDisplay={settings.phoneDisplay}
        email={settings.email}
      />
      <RevealObserver />
    </>
  );
}
