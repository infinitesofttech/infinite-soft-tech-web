import React, { useState, useEffect } from "react";
import { companyInfo } from "../data/companyData";
import { 
  Menu, 
  X, 
  Phone, 
  MessageSquare, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  Lock,
  Layers,
  ArrowUpRight
} from "lucide-react";

export default function Navbar({ onOpenQuote, onOpenCalculator, currentRoute, navigateTo }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Products", href: "#products" },
    { name: "Tech Stack", href: "#tech-stack" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Process", href: "#process" },
    { name: "Engagement", href: "#engagement" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (currentRoute !== "home") {
      navigateTo("home");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#070B14]/90 backdrop-blur-md border-b border-white/10 shadow-glass py-3.5" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); navigateTo("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[1.5px] shadow-glow-cyan transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#070B14] rounded-[10px] flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="10">
                  <path d="M30 50 C20 30, 45 25, 50 50 C55 75, 80 70, 70 50 C60 30, 35 25, 50 50 C65 75, 40 70, 30 50 Z" />
                </svg>
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1 font-display">
                Infinite<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">SoftTech</span>
              </span>
              <span className="block text-[10px] text-cyan-400/90 font-medium tracking-wider uppercase -mt-0.5">
                AI & Software Lab
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Cost Calculator trigger button */}
            <button
              onClick={onOpenCalculator}
              className="hidden xl:flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              Cost Estimator
            </button>

            {/* Direct WhatsApp Callout */}
            <a
              href={`https://wa.me/${companyInfo.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent(companyInfo.contact.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors border border-transparent hover:border-emerald-500/30"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-5 h-5 text-emerald-400" />
            </a>

            {/* Admin Quick Portal Access */}
            <button
              onClick={() => navigateTo(currentRoute === "admin" ? "home" : "admin")}
              className={`p-2 rounded-lg transition-all border ${
                currentRoute === "admin"
                  ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/40"
                  : "text-slate-400 hover:text-white bg-white/5 border-white/5 hover:border-white/15"
              }`}
              title="Admin CRM Dashboard"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Primary CTA */}
            <button
              onClick={onOpenQuote}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wide text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 p-[1px] shadow-glow-cyan hover:shadow-cyan-500/50 transition-all duration-300"
            >
              <span className="relative px-4 py-2 rounded-[11px] bg-[#070B14]/80 group-hover:bg-transparent transition-all duration-300 flex items-center gap-2">
                <span>Get a Free Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => navigateTo(currentRoute === "admin" ? "home" : "admin")}
              className="p-2 text-slate-400 hover:text-white"
              title="Admin"
            >
              <Lock className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B1120]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="py-2.5 px-3 rounded-lg text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-white/5 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenCalculator(); }}
              className="w-full py-3 px-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Launch Cost Estimator
            </button>

            <button
              onClick={() => { setMobileMenuOpen(false); onOpenQuote(); }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-glow-cyan"
            >
              <span>Get a Free Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between pt-3 text-xs text-slate-400 border-t border-white/10">
              <a href={`tel:${companyInfo.contact.phone}`} className="flex items-center gap-1.5 hover:text-cyan-400">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                {companyInfo.contact.phone}
              </a>
              <span className="text-slate-600">|</span>
              <a 
                href={`https://wa.me/${companyInfo.contact.whatsapp.replace('+', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-400 hover:underline"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp Direct
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
