import React, { useState } from "react";
import { apiService } from "../services/apiService";
import confetti from "canvas-confetti";
import { 
  X, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Calculator, 
  Clock, 
  Cpu, 
  DollarSign,
  Send,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";

export default function CostCalculatorModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [projectType, setProjectType] = useState("web");
  const [timeline, setTimeline] = useState("standard");
  const [selectedFeatures, setSelectedFeatures] = useState(["auth", "admin"]);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currency, setCurrency] = useState("INR"); // INR or USD

  const projectTypes = [
    { id: "web", title: "Web App / SaaS", baseINR: 120000, baseUSD: 1600 },
    { id: "mobile", title: "Mobile App (Flutter/React Native)", baseINR: 180000, baseUSD: 2400 },
    { id: "erp", title: "Enterprise ERP / CRM Suite", baseINR: 280000, baseUSD: 3600 },
    { id: "ai", title: "AI Agent & Automation Platform", baseINR: 220000, baseUSD: 2900 },
    { id: "full", title: "Full Ecosystem (Web + Mobile + ERP)", baseINR: 450000, baseUSD: 5800 },
  ];

  const featuresList = [
    { id: "auth", name: "User Auth & Role Hierarchies", inr: 20000, usd: 250 },
    { id: "payments", name: "Payment Gateway & Subscriptions", inr: 25000, usd: 320 },
    { id: "chat", name: "Real-Time Chat & Push Notifications", inr: 30000, usd: 380 },
    { id: "ai", name: "Generative AI Assistant / LLM Search", inr: 45000, usd: 580 },
    { id: "admin", name: "Executive Admin & Analytics Dashboard", inr: 35000, usd: 450 },
    { id: "cloud", name: "High-Availability Netlify/AWS Setup", inr: 25000, usd: 320 },
  ];

  const toggleFeature = (id) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  // Calculate pricing
  const currentType = projectTypes.find(t => t.id === projectType) || projectTypes[0];
  const featureSumINR = selectedFeatures.reduce((acc, fId) => {
    const f = featuresList.find(x => x.id === fId);
    return acc + (f ? f.inr : 0);
  }, 0);
  const featureSumUSD = selectedFeatures.reduce((acc, fId) => {
    const f = featuresList.find(x => x.id === fId);
    return acc + (f ? f.usd : 0);
  }, 0);

  const totalMinINR = currentType.baseINR + featureSumINR;
  const totalMaxINR = Math.round(totalMinINR * 1.35);

  const totalMinUSD = currentType.baseUSD + featureSumUSD;
  const totalMaxUSD = Math.round(totalMinUSD * 1.35);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contactInfo.name || (!contactInfo.email && !contactInfo.phone)) {
      alert("Please enter your name and at least an email or phone number.");
      return;
    }

    setSubmitting(true);
    const selectedFeatureNames = selectedFeatures.map(f => featuresList.find(x => x.id === f)?.name).filter(Boolean);
    
    const formattedBudget = currency === "INR" 
      ? `₹${totalMinINR.toLocaleString('en-IN')} - ₹${totalMaxINR.toLocaleString('en-IN')}`
      : `$${totalMinUSD.toLocaleString('en-US')} - $${totalMaxUSD.toLocaleString('en-US')}`;

    try {
      await apiService.submitInquiry({
        name: contactInfo.name,
        email: contactInfo.email,
        phone: contactInfo.phone,
        company: contactInfo.company,
        service: currentType.title,
        budget: formattedBudget,
        timeline: timeline === "rapid" ? "3-5 Weeks" : timeline === "standard" ? "6-10 Weeks" : "12+ Weeks",
        source: "Interactive Cost Estimator",
        message: `Selected Features: ${selectedFeatureNames.join(", ")}. Notes: ${contactInfo.notes || 'None'}`
      });

      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    } catch (err) {
      alert("Error submitting. Please try again or WhatsApp us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-[#0B1120] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-10 my-8 max-h-[90vh] overflow-y-auto text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-2">
              Quotation Estimate Generated!
            </h3>
            <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed mb-6">
              Thank you, <strong>{contactInfo.name}</strong>. Our engineering leads (Hardik Daki & Durgesh Jadav) have received your scope and will contact you via WhatsApp/Email with a formal architecture proposal.
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 max-w-sm mx-auto mb-8 text-center text-xs text-cyan-300">
              Estimated Bracket: <strong>{currency === "INR" ? `₹${totalMinINR.toLocaleString('en-IN')} - ₹${totalMaxINR.toLocaleString('en-IN')}` : `$${totalMinUSD.toLocaleString('en-US')} - $${totalMaxUSD.toLocaleString('en-US')}`}</strong>
            </div>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-semibold text-sm hover:shadow-glow-cyan"
            >
              Close Estimator
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-8 pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
                <Calculator className="w-3.5 h-3.5" />
                <span>Transparent Engineering Pricing</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Interactive Project Cost Calculator
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Configure your project requirements to calculate an immediate ballpark engineering estimate.
              </p>
            </div>

            {/* Currency Selector */}
            <div className="flex justify-end mb-4">
              <div className="inline-flex rounded-lg p-1 bg-white/5 border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setCurrency("INR")}
                  className={`px-3 py-1 rounded-md font-semibold ${currency === "INR" ? "bg-cyan-500 text-black" : "text-slate-400"}`}
                >
                  ₹ INR
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("USD")}
                  className={`px-3 py-1 rounded-md font-semibold ${currency === "USD" ? "bg-cyan-500 text-black" : "text-slate-400"}`}
                >
                  $ USD
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Project Type */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                  1. Select Core Platform Type:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setProjectType(type.id)}
                      className={`p-3.5 rounded-xl text-left border transition-all text-xs sm:text-sm font-semibold flex items-center justify-between ${
                        projectType === type.id
                          ? "bg-cyan-500/20 border-cyan-400 text-white shadow-glow-cyan/20"
                          : "bg-white/5 border-white/10 text-slate-300 hover:border-white/20"
                      }`}
                    >
                      <span>{type.title}</span>
                      {projectType === type.id && <Check className="w-4 h-4 text-cyan-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Features */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                  2. Select Desired Capabilities & Features:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {featuresList.map((f) => {
                    const isSelected = selectedFeatures.includes(f.id);
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => toggleFeature(f.id)}
                        className={`p-3 rounded-xl text-left border transition-all text-xs flex items-center justify-between ${
                          isSelected
                            ? "bg-indigo-500/20 border-indigo-400 text-white"
                            : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isSelected ? "bg-cyan-500 border-cyan-400 text-black" : "border-slate-500"
                          }`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                          <span>{f.name}</span>
                        </div>
                        <span className="font-mono text-cyan-400 font-semibold">
                          +{currency === "INR" ? `₹${(f.inr / 1000)}k` : `$${f.usd}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Price Estimation Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                    Estimated Engineering Investment
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 font-display mt-0.5">
                    {currency === "INR" 
                      ? `₹${totalMinINR.toLocaleString('en-IN')} - ₹${totalMaxINR.toLocaleString('en-IN')}`
                      : `$${totalMinUSD.toLocaleString('en-US')} - $${totalMaxUSD.toLocaleString('en-US')}`}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Includes source code handover, NDA, 30 days post-launch warranty, and QA testing.
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Typical Delivery:</span>
                  <span className="text-sm font-semibold text-white">4 to 8 Weeks</span>
                </div>
              </div>

              {/* Step 3: Contact details to receive the quote */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  3. Enter Your Details to Lock-In This Quotation:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name *"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work Email Address *"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp Number *"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Company Name (Optional)"
                    value={contactInfo.company}
                    onChange={(e) => setContactInfo({ ...contactInfo, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Any specific instructions or existing system you want to replace? (Optional)"
                  value={contactInfo.notes}
                  onChange={(e) => setContactInfo({ ...contactInfo, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>No spam. 100% confidential. Direct founder response.</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:shadow-glow-cyan text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Submitting Quotation...</span>
                  ) : (
                    <>
                      <span>Lock-In Estimate & Submit</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
