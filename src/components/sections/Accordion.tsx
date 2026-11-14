"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({ items }: { items: { id: string; question: string; answer: string }[] }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              "rounded-2xl border bg-white transition-all duration-300",
              isOpen ? "border-transparent shadow-[var(--shadow-lift)]" : "border-line hover:border-brand-100",
            )}
          >
            <h3 className="!font-sans">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[16px] font-semibold text-ink"
                aria-expanded={isOpen}
                aria-controls={`faq-${item.id}`}
                onClick={() => setOpen(isOpen ? null : item.id)}
              >
                {item.question}
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                    isOpen ? "bg-brand-gradient rotate-45 text-white" : "bg-soft text-ink",
                  )}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={`faq-${item.id}`}
              role="region"
              className={cn("grid transition-all duration-300", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-[15px] leading-relaxed text-body">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
