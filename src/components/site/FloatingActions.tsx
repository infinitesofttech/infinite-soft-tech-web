"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { WhatsappIcon } from "@/components/SocialIcons";
import { whatsappLink } from "@/lib/utils";

/** Scroll progress bar + floating WhatsApp + back-to-top buttons. */
export function FloatingActions({ whatsapp }: { whatsapp: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      setShowTop(window.scrollY > 700);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden="true">
        <div ref={barRef} className="bg-brand-gradient h-full origin-left" style={{ transform: "scaleX(0)" }} />
      </div>

      <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-brand hover:text-brand ${
            showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
          }`}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
        <a
          href={whatsappLink(whatsapp, "Hi Infinite Soft Tech, I would like to discuss a project.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition hover:scale-110"
        >
          <span className="animate-pulse-ring absolute inset-0 rounded-full bg-[#25D366]" aria-hidden="true" />
          <WhatsappIcon width={28} height={28} className="relative" />
          <span className="pointer-events-none absolute right-[68px] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition group-hover:opacity-100 sm:block">
            Chat with us
          </span>
        </a>
      </div>
    </>
  );
}
