import React from "react";
import { companyInfo } from "../data/companyData";
import { 
  ArrowRight, 
  Sparkles, 
  Code2, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Play,
  Terminal,
  Zap
} from "lucide-react";

export default function Hero({ onOpenQuote, onOpenCalculator }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden mesh-bg">
      {/* Background Radial Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/15 via-indigo-600/15 to-purple-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -top-10 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
          backgroundSize: '36px 36px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Floating Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-cyan-500/30 text-xs font-medium text-cyan-300 backdrop-blur-md shadow-glow-cyan/20">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 -ml-4" />
            <span className="tracking-wide">AI-Powered Web & Mobile Development Lab</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 font-semibold">Ahmedabad, India</span>
          </div>
        </div>

        {/* Hero Title & Pitch */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display text-white leading-[1.12]">
            Transforming Ideas Into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Intelligent Software
            </span>{" "}
            Beyond Limits.
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            At <strong className="text-white font-semibold">Infinite Soft Tech</strong>, we architect high-performance web applications, fluid mobile apps (Flutter / React Native), and custom enterprise SaaS with cutting-edge Generative AI.
          </p>

          {/* Action Button Row */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 shadow-glow-cyan hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenCalculator}
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-semibold text-sm text-slate-200 bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>Interactive Cost Estimator</span>
            </button>

            <a
              href="#products"
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>Explore In-House Products</span>
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Strict Non-Disclosure Agreement (NDA)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Code Ownership</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Agile 2-Week Sprints</span>
            </div>
          </div>
        </div>

        {/* Interactive Floating Tech Cockpit / Preview Banner */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="relative rounded-2xl bg-gradient-to-b from-white/10 to-transparent p-[1px] shadow-2xl">
            <div className="rounded-[15px] bg-[#0B1120]/90 backdrop-blur-xl border border-white/10 p-5 sm:p-8 overflow-hidden">
              
              {/* Window Header bar */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-cyan-400" />
                    infinite-core-v2.0 :: enterprise-ready
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  All Systems Operational
                </div>
              </div>

              {/* 3 Core Highlight Columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Feature 1 */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-semibold text-base mb-1">Web & Cloud Engineering</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    React 18, Next.js, and Python microservices deployed on high-speed serverless Edge CDN.
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-cyan-400 font-medium">
                    <span>Explore Web Capabilities</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-semibold text-base mb-1">Cross-Platform Mobile</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    High-performance Flutter and React Native apps for iOS & Android with offline sync.
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-indigo-400 font-medium">
                    <span>Explore Mobile Apps</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h4 className="text-white font-semibold text-base mb-1">In-House Enterprise Suites</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Live products: <strong>Infinite Employee HRMS</strong>, <strong>Vidyapeeth ERP</strong>, & <strong>Uma Commerce</strong>.
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-purple-400 font-medium">
                    <span>View Product Demos</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Live Counters / Stats Bar */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {companyInfo.stats.map((stat, idx) => (
            <div 
              key={idx}
              className="glass-panel glass-panel-hover p-5 rounded-2xl text-center"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 font-display">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-white mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {stat.change}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
