import React, { useState } from "react";
import { techStackData } from "../data/companyData";
import { 
  Code, 
  Server, 
  Smartphone, 
  Sparkles, 
  Database, 
  Cloud, 
  CheckCircle,
  Terminal
} from "lucide-react";

export default function TechStackSection() {
  const [activeTab, setActiveTab] = useState("frontend");

  const tabs = [
    { key: "frontend", label: "Frontend", icon: <Code className="w-4 h-4" /> },
    { key: "backend", label: "Backend & APIs", icon: <Server className="w-4 h-4" /> },
    { key: "mobile", label: "Mobile Apps", icon: <Smartphone className="w-4 h-4" /> },
    { key: "ai", label: "Generative AI & ML", icon: <Sparkles className="w-4 h-4" /> },
    { key: "database", label: "Databases & Cache", icon: <Database className="w-4 h-4" /> },
    { key: "cloud", label: "Cloud & DevOps", icon: <Cloud className="w-4 h-4" /> },
    { key: "testing", label: "QA & Testing", icon: <CheckCircle className="w-4 h-4" /> },
  ];

  const currentStack = techStackData[activeTab] || [];

  return (
    <section id="tech-stack" className="py-24 relative overflow-hidden bg-[#0B1120]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>Modern Enterprise Technologies</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Our Battle-Tested{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Technology Stack
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            We build with reliable, modern, and open-source ecosystems that guarantee maximum performance, security, and developer velocity.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white border-transparent shadow-glow-cyan/50"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tech Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentStack.map((tech, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-5 rounded-2xl border border-white/10 flex items-start justify-between group"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h4 className="text-base font-bold text-white font-display group-hover:text-cyan-400 transition-colors">
                    {tech.name}
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {tech.desc}
                </p>
              </div>

              <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider flex-shrink-0 ml-3 ${
                tech.level === "Expert" || tech.level === "Core"
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                  : "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
              }`}>
                {tech.level}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-slate-900 to-indigo-950/30 border border-white/10 text-center max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h5 className="text-sm font-bold text-white">Have a specific tech requirement?</h5>
            <p className="text-xs text-slate-400 mt-0.5">We support legacy migrations, microservices, and hybrid cloud architectures.</p>
          </div>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white whitespace-nowrap transition-colors"
          >
            Consult Engineering Team
          </a>
        </div>

      </div>
    </section>
  );
}
