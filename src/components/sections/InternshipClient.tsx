"use client";

import { ArrowRight } from "lucide-react";
import { SELECT_PROGRAM_EVENT } from "@/components/site/Forms";

/** "Apply" button on the internship page: pre-selects the program and scrolls to the form. */
export function ApplyButton({ program }: { program: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new CustomEvent(SELECT_PROGRAM_EVENT, { detail: { program } }));
        document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
    >
      Apply for this program <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
}
