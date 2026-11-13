import React from "react";
import { processSteps } from "../data/companyData";
import { GitBranch, ShieldCheck, ArrowRight } from "lucide-react";

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 relative overflow-hidden bg-[#0B1120]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-4">
            <GitBranch className="w-3.5 h-3.5" />
            <span>Agile Delivery Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            How We Build &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Deliver Your Product
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            A disciplined, transparent, and iterative 6-stage lifecycle that eliminates surprise costs and guarantees on-time delivery.
          </p>
        </div>

        {/* 6 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processSteps.map((step, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover rounded-3xl p-7 relative border border-white/10 group"
            >
              {/* Step Number with Gradient Glow */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-indigo-600 font-display">
                  {step.step}
                </span>
                <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-cyan-400 group-hover:border-cyan-500/40">
                  ✓
                </span>
              </div>

              <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-cyan-400 transition-colors">
                {step.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {step.description}
              </p>

              {/* Progress Connector Indicator */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Phase {step.step} of 06</span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Verified <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
