import React, { useState } from "react";
import { products } from "../data/companyData";
import { 
  Check, 
  ExternalLink, 
  Sparkles, 
  Users, 
  GraduationCap, 
  ShoppingBag, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export default function ProductsSection({ onSelectProductForQuote }) {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);

  const getProductIcon = (id) => {
    switch (id) {
      case "hrms":
        return <Users className="w-5 h-5 text-cyan-400" />;
      case "erp":
        return <GraduationCap className="w-5 h-5 text-indigo-400" />;
      case "ecommerce":
        return <ShoppingBag className="w-5 h-5 text-purple-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="products" className="py-24 relative overflow-hidden bg-[#070B14]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proprietary Software Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Enterprise In-House{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Flagship Products
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Beyond custom client consulting, Infinite Soft Tech engineers, licenses, and maintains high-impact enterprise software products used by thousands of active users every day.
          </p>
        </div>

        {/* Product Navigation Pills (Desktop & Mobile) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {products.map((p) => {
            const isSelected = selectedProduct.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProduct(p)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 border ${
                  isSelected
                    ? "bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 border-cyan-400 text-white shadow-glow-cyan/30"
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {getProductIcon(p.id)}
                <span>{p.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                  Live
                </span>
              </button>
            );
          })}
        </div>

        {/* Featured Product Detail Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-white/10">
          
          {/* Top Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {selectedProduct.badge}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {selectedProduct.status}
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold text-white font-display mt-3">
                {selectedProduct.title}
              </h3>
              <p className="text-sm sm:text-base text-cyan-300 font-medium mt-1">
                {selectedProduct.tagline}
              </p>
            </div>

            <button
              onClick={() => onSelectProductForQuote(selectedProduct.title)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:shadow-glow-cyan text-white text-sm font-semibold flex items-center gap-2 transition-all"
            >
              <span>Schedule Live Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            
            {/* Description & Features (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {selectedProduct.description}
              </p>

              <div>
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  Key Modules & Capabilities Included:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProduct.features.map((feature, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-colors flex items-start gap-3"
                    >
                      <div className="mt-0.5 p-1 rounded-full bg-cyan-500/20 text-cyan-400">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-200 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Callout */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-transparent border border-indigo-500/30 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-indigo-200">
                  <strong>Deployment Metric:</strong> {selectedProduct.metrics}
                </span>
              </div>
            </div>

            {/* Tech Stack & Architecture (4 cols) */}
            <div className="lg:col-span-4 rounded-2xl bg-black/40 border border-white/10 p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
                  Built With Enterprise Architecture
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.techStack.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-8 space-y-3 pt-6 border-t border-white/10 text-xs text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Multi-Tenant Cloud:</span>
                    <span className="text-white font-medium">Supported</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>On-Premise Deployment:</span>
                    <span className="text-white font-medium">Available</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Custom API Webhooks:</span>
                    <span className="text-white font-medium">REST & GraphQL</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Data Encryption:</span>
                    <span className="text-emerald-400 font-medium">AES-256 at Rest</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <button
                  onClick={() => onSelectProductForQuote(selectedProduct.title)}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <span>Request Custom Licensing & Pricing</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
