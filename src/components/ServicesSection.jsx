import React from "react";
import { services } from "../data/companyData";
import { 
  Globe, 
  Smartphone, 
  Cpu, 
  Sparkles, 
  Cloud, 
  Palette, 
  ArrowRight, 
  CheckCircle2,
  Terminal
} from "lucide-react";

export default function ServicesSection({ onSelectServiceForQuote }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "Globe":
        return <Globe className="w-6 h-6 text-cyan-400" />;
      case "Smartphone":
        return <Smartphone className="w-6 h-6 text-indigo-400" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-purple-400" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-amber-400" />;
      case "Cloud":
        return <Cloud className="w-6 h-6 text-sky-400" />;
      case "Palette":
        return <Palette className="w-6 h-6 text-pink-400" />;
      default:
        return <Terminal className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-[#070B14]">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>End-to-End Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Comprehensive Digital{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Services & Expertise
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            From initial requirement architecture to high-concurrency cloud scaling, we craft bespoke software solutions tailored to your industry.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="glass-panel glass-panel-hover rounded-3xl p-7 flex flex-col justify-between group border border-white/10"
            >
              <div>
                {/* Icon & Title */}
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-cyan-500/40 transition-all duration-300">
                  {getIcon(service.icon)}
                </div>

                <h3 className="text-xl font-bold text-white font-display mb-2 group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs font-medium text-cyan-300/80 mb-4">
                  {service.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Capabilities checklist */}
                <div className="space-y-2 mb-6">
                  {service.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 mb-6">
                  {service.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] font-mono text-slate-300 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => onSelectServiceForQuote(service.title)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-indigo-600 hover:text-white border border-white/10 hover:border-transparent text-xs font-semibold text-slate-300 transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>Inquire for {service.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
