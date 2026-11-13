import React from "react";
import { teamMembers } from "../data/companyData";
import { Users, Linkedin, ShieldCheck } from "lucide-react";

export default function TeamSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0B1120]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-4">
            <Users className="w-3.5 h-3.5" />
            <span>Leadership & Engineering Talent</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Meet The Minds{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Behind Infinite Soft Tech
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Based in Ahmedabad, Gujarat, our leadership team combines decades of hands-on cloud architecture, AI development, and client delivery success.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/10 flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Role Header */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-cyan-400">
                      {member.role}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {member.bio}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                  {member.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-slate-400"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
