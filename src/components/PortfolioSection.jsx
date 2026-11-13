import React, { useState } from "react";
import { portfolioProjects } from "../data/companyData";
import { 
  FolderGit2, 
  ExternalLink, 
  Sparkles, 
  ArrowUpRight, 
  Layers,
  CheckCircle2,
  TrendingUp
} from "lucide-react";

export default function PortfolioSection({ onSelectProjectForQuote }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { key: "all", label: "All Case Studies" },
    { key: "enterprise", label: "Enterprise & ERP" },
    { key: "web", label: "Web Applications" },
    { key: "mobile", label: "Mobile Apps" },
    { key: "ai", label: "AI & Automation" },
  ];

  const filteredProjects = activeFilter === "all" 
    ? portfolioProjects 
    : portfolioProjects.filter(p => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden bg-[#070B14]">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-4">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Proven Engineering Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Featured Case Studies &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Client Solutions
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Real software built for real businesses. Discover how our custom engineering drove quantifiable growth and operational efficiency.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                activeFilter === cat.key
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-glow-cyan/20"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel glass-panel-hover rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />
                  
                  {/* Category & Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-black/60 backdrop-blur-md text-cyan-300 border border-white/10">
                      {project.categoryLabel}
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-cyan-500/20 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
                      {project.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-xs text-slate-400 font-mono mb-1">
                    Client: {project.client}
                  </div>
                  <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {project.summary}
                  </p>

                  {/* Impact Highlight */}
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-start gap-2.5 mb-5">
                    <TrendingUp className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-cyan-200 font-medium">
                      <strong>Impact:</strong> {project.impact}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Tech & CTA */}
              <div className="px-6 pb-6 pt-2 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-slate-400 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onSelectProjectForQuote(project.title)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-indigo-600 hover:text-white border border-white/10 text-xs font-semibold text-slate-300 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Build A Similar Solution</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
