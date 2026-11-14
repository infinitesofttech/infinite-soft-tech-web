"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./Portfolio";

export function PortfolioFilter({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const [active, setActive] = useState("All");
  const list = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0" role="tablist" aria-label="Filter projects">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={active === c}
            onClick={() => setActive(c)}
            className={cn(
              "shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300",
              active === c ? "bg-brand-gradient border-transparent text-white shadow-[var(--shadow-glow)]" : "border-line bg-white text-ink-3 hover:border-brand hover:text-brand",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <div key={`${active}-${p.id}`} className="animate-slide-up-in h-full" style={{ animationDelay: `${i * 70}ms` }}>
            <ProjectCard project={p} />
          </div>
        ))}
      </div>
    </>
  );
}
