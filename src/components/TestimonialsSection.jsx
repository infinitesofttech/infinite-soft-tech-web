import React from "react";
import { testimonials } from "../data/companyData";
import { Star, MessageSquareQuote, ShieldCheck } from "lucide-react";

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#070B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-4">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Trusted by Leaders &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Innovative Enterprises
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Read what founders and technology heads say about partnering with Infinite Soft Tech.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/10 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="font-bold text-white text-sm font-display">{t.name}</div>
                <div className="text-xs text-cyan-400 font-medium">{t.role}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{t.company} • {t.location}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
