import React, { useState } from "react";
import { companyInfo } from "../data/companyData";
import { apiService } from "../services/apiService";
import { 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Facebook, 
  Github, 
  Lock, 
  Sparkles,
  ArrowUp
} from "lucide-react";

export default function Footer({ navigateTo, onOpenQuote }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) return;
    await apiService.subscribeNewsletter(email);
    setSubscribed(true);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#05080F] text-slate-400 text-xs border-t border-white/10 relative overflow-hidden">
      
      {/* Top CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 border-b border-white/10">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-purple-950/30 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="relative z-10 text-center lg:text-left">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-semibold uppercase tracking-wider inline-block mb-3">
              Ready to Accelerate Growth?
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              Let's Build Something Extraordinary Together.
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-xl">
              Turn your concept into high-performance software. Partner with Ahmedabad's premier AI & full-stack development team.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 flex-shrink-0">
            <button
              onClick={onOpenQuote}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:shadow-glow-cyan text-white text-xs font-semibold tracking-wide transition-all"
            >
              Request Free Consultation
            </button>
            <a
              href={`https://wa.me/${companyInfo.contact.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-semibold transition-all"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[1.5px] shadow-glow-cyan">
                <div className="w-full h-full bg-[#070B14] rounded-[10px] flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="10">
                    <path d="M30 50 C20 30, 45 25, 50 50 C55 75, 80 70, 70 50 C60 30, 35 25, 50 50 C65 75, 40 70, 30 50 Z" />
                  </svg>
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                Infinite<span className="text-cyan-400">SoftTech</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {companyInfo.shortDescription}
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span>{companyInfo.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <a href={`tel:${companyInfo.contact.phone}`} className="hover:text-cyan-400">{companyInfo.contact.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <a href={`mailto:${companyInfo.contact.email}`} className="hover:text-cyan-400">{companyInfo.contact.email}</a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a href={companyInfo.socials.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-400 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={companyInfo.socials.instagram} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={companyInfo.socials.youtube} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-400 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href={companyInfo.socials.facebook} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-400 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-display mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Web Application Development</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Mobile App Engineering</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Custom Software & ERP/CRM</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Generative AI & Automation</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Cloud Infrastructure & DevOps</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Dedicated Developer Hiring</a></li>
            </ul>
          </div>

          {/* In-House Flagship Products */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-display mb-4">
              Products & Solutions
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#products" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <span>Infinite Employee HRMS</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono">Live</span>
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <span>Vidyapeeth ERP Suite</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400 font-mono">Live</span>
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <span>Infinite Commerce</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-400 font-mono">Live</span>
                </a>
              </li>
              <li><a href="#portfolio" className="hover:text-cyan-400 transition-colors">Case Studies Portfolio</a></li>
              <li><a href="#tech-stack" className="hover:text-cyan-400 transition-colors">Technology Ecosystem</a></li>
              <li><a href="#process" className="hover:text-cyan-400 transition-colors">6-Stage Delivery Process</a></li>
            </ul>
          </div>

          {/* Newsletter & Tech Radar */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-display mb-4">
              Engineering Insights
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Subscribe to get periodic tech playbooks on AI tools, scalable architecture, and engineering trends.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs">
                ✓ You are subscribed! Welcome to Infinite Insights.
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter work email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-cyan-500 text-black font-semibold text-xs hover:bg-cyan-400 transition-colors"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-white/5">
              <button
                onClick={() => navigateTo("admin")}
                className="inline-flex items-center gap-2 text-[11px] text-slate-500 hover:text-cyan-400 transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Login Portal</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
        <div>
          © {new Date().getFullYear()} Infinite Soft Tech. All Rights Reserved. Engineered with React.js & Netlify Serverless.
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
          <a href="#" className="hover:text-slate-300">Security & NDA</a>
          <button
            onClick={scrollToTop}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Scroll to Top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </footer>
  );
}
