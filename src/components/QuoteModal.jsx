import React, { useState } from "react";
import { apiService } from "../services/apiService";
import { companyInfo } from "../data/companyData";
import confetti from "canvas-confetti";
import { 
  X, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Phone,
  MessageSquare
} from "lucide-react";

export default function QuoteModal({ isOpen, onClose, defaultItem }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: defaultItem || "Web Application Engineering",
    budget: "₹2,50,000 - ₹5,00,000",
    timeline: "1-2 Months",
    message: defaultItem ? `I would like to explore or license ${defaultItem}.` : ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || (!formData.email && !formData.phone)) {
      alert("Please provide your name and either an email or phone number.");
      return;
    }

    setSubmitting(true);
    try {
      await apiService.submitInquiry({
        ...formData,
        source: defaultItem ? `Quick Modal (${defaultItem})` : "General Quote Modal"
      });

      setSubmitted(true);
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch (err) {}
    } catch (err) {
      alert("Submission error. You can WhatsApp us directly at +91 94092 59294.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#0B1120] border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-9 text-white my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold font-display text-white mb-2">
              Inquiry Dispatched Successfully!
            </h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed mb-6">
              Thank you, <strong>{formData.name}</strong>. Hardik Daki & Durgesh Jadav have received your request and will contact you via WhatsApp / Phone within 4 business hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${companyInfo.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent(`Hi, I just submitted an inquiry for ${formData.service} from ${formData.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 text-black font-semibold text-xs flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant Follow-Up on WhatsApp</span>
              </a>
              <button
                onClick={() => { setSubmitted(false); onClose(); }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Direct Founder & Engineering Consultation</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                Request a Free Quote & Architecture Review
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Tell us about your project requirements and receive a detailed technical proposal with budget breakdown.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hardik Patel"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 94092 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Company or Startup Name"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Service / Solution
                  </label>
                  <input
                    type="text"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Target Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B1120] border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000 ($1.2k - $3k)</option>
                    <option value="₹2,50,000 - ₹5,00,000">₹2,50,000 - ₹5,00,000 ($3k - $6k)</option>
                    <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000 ($6k - $12k)</option>
                    <option value="₹10,00,000+ Enterprise">₹10,00,000+ ($12k+ Enterprise)</option>
                    <option value="Dedicated Hiring Monthly">Monthly Dedicated Staffing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project Scope & Details
                </label>
                <textarea
                  rows={3}
                  placeholder="Share a brief overview of features, target timeline, or reference applications..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Strict NDA • Zero Spam Guaranteed</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:shadow-glow-cyan text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Send Free Proposal Request"}
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
