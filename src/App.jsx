import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductsSection from "./components/ProductsSection";
import ServicesSection from "./components/ServicesSection";
import TechStackSection from "./components/TechStackSection";
import PortfolioSection from "./components/PortfolioSection";
import ProcessSection from "./components/ProcessSection";
import EngagementModels from "./components/EngagementModels";
import TeamSection from "./components/TeamSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import QuoteModal from "./components/QuoteModal";
import CostCalculatorModal from "./components/CostCalculatorModal";
import AdminLogin from "./components/AdminPanel/AdminLogin";
import AdminDashboard from "./components/AdminPanel/AdminDashboard";
import { apiService } from "./services/apiService";
import { MessageSquare, Sparkles } from "lucide-react";
import { companyInfo } from "./data/companyData";

export default function App() {
  const [currentRoute, setCurrentRoute] = useState("home"); // "home" or "admin"
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteDefaultItem, setQuoteDefaultItem] = useState("");
  const [calculatorModalOpen, setCalculatorModalOpen] = useState(false);

  // Sync hash routing e.g. #admin or /admin
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes("admin")) {
        setCurrentRoute("admin");
      } else {
        setCurrentRoute("home");
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);

    // Check existing session
    setIsAdminLoggedIn(apiService.isAdminLoggedIn());

    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const navigateTo = (route) => {
    setCurrentRoute(route);
    if (route === "admin") {
      window.location.hash = "#admin";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.hash = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleOpenQuote = (defaultItem = "") => {
    setQuoteDefaultItem(defaultItem);
    setQuoteModalOpen(true);
  };

  const handleOpenCalculator = () => {
    setCalculatorModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
  };

  const handleAdminLogout = () => {
    apiService.logoutAdmin();
    setIsAdminLoggedIn(false);
    navigateTo("home");
  };

  // Render Admin View
  if (currentRoute === "admin") {
    if (!isAdminLoggedIn) {
      return (
        <AdminLogin
          onLoginSuccess={handleLoginSuccess}
          onBackToSite={() => navigateTo("home")}
        />
      );
    }
    return (
      <AdminDashboard
        onLogout={handleAdminLogout}
        onBackToSite={() => navigateTo("home")}
      />
    );
  }

  // Render Public Website
  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col relative selection:bg-cyan-500 selection:text-black">
      
      {/* Navigation */}
      <Navbar
        onOpenQuote={() => handleOpenQuote("")}
        onOpenCalculator={handleOpenCalculator}
        currentRoute={currentRoute}
        navigateTo={navigateTo}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero
          onOpenQuote={() => handleOpenQuote("")}
          onOpenCalculator={handleOpenCalculator}
        />

        <ProductsSection
          onSelectProductForQuote={(prodTitle) => handleOpenQuote(`In-House Product: ${prodTitle}`)}
        />

        <ServicesSection
          onSelectServiceForQuote={(srvTitle) => handleOpenQuote(`Service: ${srvTitle}`)}
        />

        <TechStackSection />

        <PortfolioSection
          onSelectProjectForQuote={(projTitle) => handleOpenQuote(`Case Study Interest: ${projTitle}`)}
        />

        <ProcessSection />

        <EngagementModels
          onSelectModelForQuote={(modelTitle) => handleOpenQuote(`Engagement Model: ${modelTitle}`)}
        />

        <TeamSection />

        <TestimonialsSection />

        <FAQSection />

        <ContactSection
          prefilledService={quoteDefaultItem}
        />
      </main>

      {/* Footer */}
      <Footer
        navigateTo={navigateTo}
        onOpenQuote={() => handleOpenQuote("")}
      />

      {/* Floating Action Button (WhatsApp Quick Connect) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Floating Cost Calculator trigger */}
        <button
          onClick={handleOpenCalculator}
          className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs shadow-glow-cyan hover:scale-105 active:scale-95 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Estimate Project Cost</span>
        </button>

        {/* Floating WhatsApp Button */}
        <a
          href={`https://wa.me/${companyInfo.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent(companyInfo.contact.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black shadow-glow-emerald flex items-center justify-center transition-all hover:scale-110 active:scale-95 ml-auto"
          title="Direct WhatsApp with Hardik Daki"
        >
          <MessageSquare className="w-7 h-7 fill-black text-emerald-500" />
        </a>
      </div>

      {/* Interactive Cost Calculator Modal */}
      <CostCalculatorModal
        isOpen={calculatorModalOpen}
        onClose={() => setCalculatorModalOpen(false)}
      />

      {/* General Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        defaultItem={quoteDefaultItem}
      />

    </div>
  );
}
