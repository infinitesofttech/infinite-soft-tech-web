import React from "react";
import { engagementModels } from "../data/companyData";
import { Users, CheckCircle2, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function EngagementModels({ onSelectModelForQuote }) {
  return (
    <section id="engagement" className="py-24 relative overflow-hidden bg-[#070B14]">
      {/* Background Orbs */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Hiring & Partnership Flexibility</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Tailored Engagement{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Pricing Models
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Whether you need a full turnkey product build, dedicated full-time engineers, or sprint-by-sprint scaling, we offer transparent billing models.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {engagementModels.map((model, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                model.popular
                  ? "bg-[#0B1120] border-2 border-cyan-400/80 shadow-glow-cyan/40 scale-105 z-10"
                  : "glass-panel glass-panel-hover border border-white/10"
              }`}
            >
              {model.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 text-black text-[11px] font-extrabold tracking-wide uppercase shadow-md">
                  Most Popular for Enterprises
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold text-white font-display mb-2">
                  {model.title}
                </h3>
                <p className="text-xs text-cyan-300 font-medium mb-4">
                  {model.tagline}
                </p>
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 mb-6">
                  <strong>Best for:</strong> {model.bestFor}
                </div>

                <div className="space-y-3 mb-8">
                  {model.perks.map((perk, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={() => onSelectModelForQuote(model.title)}
                  className={`w-full py-3.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                    model.popular
                      ? "bg-gradient-to-r from-cyan-400 to-indigo-500 text-black shadow-glow-cyan hover:opacity-95"
                      : "bg-white/10 hover:bg-white/15 text-white border border-white/10"
                  }`}
                >
                  <span>{model.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
