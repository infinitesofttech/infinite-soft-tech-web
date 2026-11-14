import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const ACCENTS: Record<Project["accent"], string> = {
  blue: "from-[#2b44ff] to-[#5b7bff]",
  violet: "from-[#6d28d9] to-[#a855f7]",
  pink: "from-[#e8178c] to-[#ff6fb5]",
  emerald: "from-[#059669] to-[#34d399]",
  orange: "from-[#ea580c] to-[#fbbf24]",
};

export function ProjectCard({ project }: { project: Project }) {
  const external = project.link?.startsWith("http");
  const gradient = ACCENTS[project.accent] ?? ACCENTS.blue;
  const inner = (
    <>
      <div className={cn("relative aspect-[4/3] overflow-hidden bg-gradient-to-br", gradient)}>
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={`${project.title} project screenshot`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" aria-hidden="true">
            <div className="grid-bg-dark absolute inset-0 opacity-60" />
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
            <div className="absolute inset-x-[10%] bottom-0 top-[18%] rounded-t-2xl bg-white/95 p-4 shadow-2xl transition-transform duration-700 group-hover:-translate-y-2">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              </div>
              <p className={cn("mt-4 bg-gradient-to-r bg-clip-text font-display text-xl font-extrabold text-transparent", gradient)}>{project.title}</p>
              <div className="mt-3 space-y-2">
                <span className="block h-2 w-[85%] rounded-full bg-soft-2" />
                <span className="block h-2 w-[65%] rounded-full bg-soft-2" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <span key={i} className={cn("h-10 rounded-lg bg-gradient-to-br opacity-25", gradient)} />
                ))}
              </div>
            </div>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink backdrop-blur">{project.category}</span>
        {project.status ? (
          <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold text-white backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-success" /> {project.status}
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {project.client ? <p className="text-xs font-semibold uppercase tracking-wider text-muted">{project.client}</p> : null}
        <h3 className="mt-1.5 text-xl font-semibold transition-colors group-hover:text-brand">{project.title}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-body">{project.summary}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full bg-soft px-2.5 py-1 text-xs font-medium text-ink-3">
                {t}
              </span>
            ))}
          </div>
          {project.link ? (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-ink group-hover:text-white">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          ) : null}
        </div>
      </div>
    </>
  );

  const cls = "card card-hover group flex h-full flex-col overflow-hidden";
  if (!project.link) return <div className={cls}>{inner}</div>;
  return external ? (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${project.title} (opens in new tab)`}>
      {inner}
    </a>
  ) : (
    <Link href={project.link} className={cls}>
      {inner}
    </Link>
  );
}

export function PortfolioSection({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;
  return (
    <section className="section-y bg-soft" id="portfolio">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Our Work"
            title={
              <>
                Projects That <span className="text-gradient">Speak for Us</span>
              </>
            }
            text="A selection of products and platforms we have designed, built and launched."
          />
          <Reveal>
            <Link href="/portfolio" className="btn btn-outline shrink-0">
              View All Projects <ArrowRight className="arrow h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 110} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
