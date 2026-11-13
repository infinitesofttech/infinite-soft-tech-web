import React, { useState } from "react";
import { companyInfo, services } from "../data/companyData";
import { apiService } from "../services/apiService";
import confetti from "canvas-confetti";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Clock
} from "lucide-react";

export default function ContactSection({ prefilledService }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: prefilledService || "Web Application Engineering",
    budget: "₹1,50,000 - ₹3,00,000",
    message: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || (!formData.email && !formData.phone)) {
      alert("Please provide your name and either an email or phone number.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiService.submitInquiry({
        ...formData,
        source: "Contact Section Form"
      });

      setSuccessMessage(res.message || "Inquiry sent successfully!");
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
      } catch (e) {}

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "Web Application Engineering",
        budget: "₹1,50,000 - ₹3,00,000",
        message: ""
      });
    } catch (err) {
      alert("Submission failed. Please WhatsApp us directly at +91 94092 59294.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#070B14]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Let's Discuss Your Project</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Start Your Partnership With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Infinite Soft Tech
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Have a project in mind, need to license our ERP/HRMS products, or want to hire dedicated developers? We respond within 4 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Maps (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
              <h3 className="text-xl font-bold text-white font-display">
                Headquarters & Communication
              </h3>
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Physical Office</h4>
                  <p className="text-sm text-white font-medium mt-0.5 leading-relaxed">
                    {companyInfo.contact.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Call Us Directly</h4>
                  <div className="flex flex-col gap-0.5 mt-0.5">
                    <a href={`tel:${companyInfo.contact.phone}`} className="text-sm text-white font-semibold hover:text-cyan-400 transition-colors">
                      {companyInfo.contact.phone}
                    </a>
                    <a href={`tel:${companyInfo.contact.phoneSecondary}`} className="text-xs text-slate-300 hover:text-cyan-400 transition-colors">
                      {companyInfo.contact.phoneSecondary} (Alternate)
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Official Inquiries</h4>
                  <a href={`mailto:${companyInfo.contact.email}`} className="text-sm text-white font-medium hover:text-cyan-400 transition-colors mt-0.5 block">
                    {companyInfo.contact.email}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Operating Hours</h4>
                  <p className="text-sm text-white font-medium mt-0.5">
                    {companyInfo.contact.hours}
                  </p>
                </div>
              </div>

              {/* WhatsApp Quick Chat CTA */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href={`https://wa.me/${companyInfo.contact.whatsapp.replace('+', '')}?text=${encodeURIComponent(companyInfo.contact.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500 hover:text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-glow-emerald/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly (+91 94092 59294)</span>
                </a>
              </div>

            </div>

            {/* Google Maps Location Preview Card */}
            <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 h-52 relative">
              <iframe
                title="Office Location Map"
                src={companyInfo.contact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-md px-3 py-1 rounded-md text-[10px] text-cyan-300 border border-white/10">
                Emerald Complex, C.G. Road, Ahmedabad
              </div>
            </div>

          </div>

          {/* Right Column: Contact & Project Request Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10">
              
              <h3 className="text-2xl font-bold text-white font-display mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-8">
                Fill in the details below. Our founders and solution architects will get back to you with architectural guidance and quotation.
              </p>

              {successMessage ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Thank You for Reaching Out!</h4>
                  <p className="text-xs sm:text-sm text-emerald-200">
                    {successMessage}
                  </p>
                  <button
                    onClick={() => setSuccessMessage("")}
                    className="px-6 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Patel"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. rahul@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98250 XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        placeholder="Company or Startup Name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Service or Product of Interest
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0B1120] border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                      >
                        <option value="Web Application Engineering">Web Application Engineering</option>
                        <option value="Mobile App Development">Mobile App Development (Flutter/React Native)</option>
                        <option value="Custom Software & ERP/CRM">Custom Software & ERP/CRM</option>
                        <option value="Generative AI & Intelligent Automation">Generative AI & Automation</option>
                        <option value="Cloud Infrastructure & DevOps">Cloud Infrastructure & DevOps</option>
                        <option value="Infinite Employee HRMS License">Infinite Employee HRMS Demo</option>
                        <option value="Vidyapeeth ERP License">Vidyapeeth ERP Demo</option>
                        <option value="Dedicated Developer Hiring">Hire Dedicated Developers</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Target Budget Bracket
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0B1120] border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                      >
                        <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000 ($1.2k - $3k)</option>
                        <option value="₹2,50,000 - ₹5,00,000">₹2,50,000 - ₹5,00,000 ($3k - $6k)</option>
                        <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000 ($6k - $12k)</option>
                        <option value="₹10,00,000+ Enterprise">₹10,00,000+ ($12k+ Enterprise)</option>
                        <option value="Monthly Dedicated Hiring">Monthly Dedicated Staffing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Tell Us About Your Project & Deliverables *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe what you want to build, existing bottlenecks, key features, or reference websites..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Strict NDA Signed Prior to Discovery Call</span>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:shadow-glow-cyan text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                    >
                      {submitting ? (
                        <span>Sending to Hardik & Durgesh...</span>
                      ) : (
                        <>
                          <span>Submit Inquiry</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
