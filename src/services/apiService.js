// Unified Client API Service
// Connects to Netlify Functions (/api/*) with seamless local persistent fallback

const STORAGE_KEY = "infinite_inquiries_db";
const ADMIN_TOKEN_KEY = "infinite_admin_auth";

// Initial seed data for offline / local preview
const initialSeedData = [
  {
    id: "inq-101",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    name: "Vikram Shah",
    email: "vikram@surattextiles.com",
    phone: "+91 98251 12345",
    company: "Surat Textiles & Apparel",
    service: "Custom Software & ERP/CRM",
    budget: "₹3,00,000 - ₹5,00,000",
    timeline: "2-3 Months",
    source: "Cost Estimator",
    message: "We need an inventory and fabric dispatch management system with barcode scanner support and GST invoicing.",
    status: "new",
    adminNotes: "Promising lead. Requires demo of Infinite Employee HRMS as well."
  },
  {
    id: "inq-102",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    name: "Dr. Ananya Joshi",
    email: "ananya.joshi@gujaratuniv.org",
    phone: "+91 98980 54321",
    company: "Shree Sarvajanik Trust",
    service: "Web Application Engineering",
    budget: "₹1,50,000 - ₹3,00,000",
    timeline: "1-2 Months",
    source: "Contact Form",
    message: "Interested in implementing Vidyapeeth ERP for our 3 campuses in Ahmedabad. Would like an in-person meeting at your CG Road office.",
    status: "contacted",
    adminNotes: "Meeting scheduled with Hardik Daki on Tuesday 11:30 AM."
  },
  {
    id: "inq-103",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    name: "Marcus Vance",
    email: "marcus@vancetechpartners.com",
    phone: "+1 415 555 2671",
    company: "Vance Technologies LLC (US)",
    service: "Mobile App Development",
    budget: "$5,000 - $10,000",
    timeline: "3-4 Months",
    source: "Consultation Modal",
    message: "Looking to hire 2 dedicated Flutter developers for a cross-platform logistics application.",
    status: "proposal_sent",
    adminNotes: "Shared rate card and developer profiles of Kenil Shah."
  }
];

function getLocalInquiries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSeedData));
      return initialSeedData;
    }
    return JSON.parse(raw);
  } catch (e) {
    return initialSeedData;
  }
}

function saveLocalInquiries(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

export const apiService = {
  // 1. Submit Inquiry
  async submitInquiry(formData) {
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const data = await res.json();
        // Also sync local
        const current = getLocalInquiries();
        current.unshift({
          id: data.inquiryId || "inq-" + Date.now().toString(36),
          createdAt: new Date().toISOString(),
          status: "new",
          adminNotes: "",
          ...formData
        });
        saveLocalInquiries(current);
        return data;
      }
    } catch (err) {
      console.warn("Netlify function offline, using local storage engine:", err);
    }

    // Local fallback
    const current = getLocalInquiries();
    const newEntry = {
      id: "inq-" + Date.now().toString(36),
      createdAt: new Date().toISOString(),
      status: "new",
      adminNotes: "",
      ...formData
    };
    current.unshift(newEntry);
    saveLocalInquiries(current);
    return {
      success: true,
      message: "Inquiry received! Our team at Emerald Complex, Ahmedabad will reach out shortly.",
      inquiryId: newEntry.id
    };
  },

  // 2. Newsletter Signup
  async subscribeNewsletter(email) {
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { success: true, message: `Thank you for subscribing (${email})!` };
  },

  // 3. Admin Login
  async loginAdmin(credentials) {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
      });
      if (res.ok) {
        const data = await res.json();
        sessionStorage.setItem(ADMIN_TOKEN_KEY, data.token);
        return { success: true, admin: data.admin };
      }
    } catch (e) {
      console.warn("Netlify function offline, checking local admin credentials");
    }

    // Local fallback authentication: accepts "admin123" or "1234"
    if (credentials.password === "admin123" || credentials.pin === "1234") {
      const fakeToken = "local_admin_token_" + Date.now();
      sessionStorage.setItem(ADMIN_TOKEN_KEY, fakeToken);
      return {
        success: true,
        admin: { name: "Hardik Daki / Admin", role: "Super Admin", company: "Infinite Soft Tech" }
      };
    }

    throw new Error("Invalid password or PIN. Try 'admin123'.");
  },

  isAdminLoggedIn() {
    return Boolean(sessionStorage.getItem(ADMIN_TOKEN_KEY));
  },

  logoutAdmin() {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  },

  // 4. Fetch Inquiries
  async getInquiries() {
    try {
      const res = await fetch("/api/admin/inquiries");
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) return json.data;
      }
    } catch (e) {}
    return getLocalInquiries();
  },

  // 5. Update Status & Notes
  async updateInquiry(id, updates) {
    try {
      await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
    } catch (e) {}

    const current = getLocalInquiries();
    const idx = current.findIndex(i => i.id === id);
    if (idx !== -1) {
      current[idx] = { ...current[idx], ...updates };
      saveLocalInquiries(current);
    }
    return { success: true };
  },

  // 6. Delete Inquiry
  async deleteInquiry(id) {
    try {
      await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
    } catch (e) {}

    const current = getLocalInquiries();
    const updated = current.filter(i => i.id !== id);
    saveLocalInquiries(updated);
    return { success: true };
  },

  // 7. Get Overview Statistics
  async getStats() {
    const inquiries = await this.getInquiries();
    const total = inquiries.length;
    const newLeads = inquiries.filter(i => i.status === "new").length;
    const contacted = inquiries.filter(i => i.status === "contacted").length;
    const proposals = inquiries.filter(i => i.status === "proposal_sent").length;
    const closed = inquiries.filter(i => i.status === "closed").length;

    return {
      totalInquiries: total,
      newLeads,
      inDiscussion: contacted,
      proposalsSent: proposals,
      closedDeals: closed,
      conversionRate: total > 0 ? Math.round(((proposals + closed) / total) * 100) : 0
    };
  }
};
