// Netlify Serverless Function: api.js
// Handles /api/inquiries, /api/admin/login, /api/admin/inquiries, /api/admin/stats, /api/newsletter

// In-memory store (for serverless execution instance)
let inquiriesStore = [
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

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export const handler = async (event, context) => {
  // CORS Headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: JSON.stringify({ message: "OK" }) };
  }

  // Normalize path
  // Netlify routes /api/* to /.netlify/functions/api/:splat
  const path = event.path.replace(/\/\.netlify\/functions\/api/, "").replace(/^\/api/, "") || "/";
  const method = event.httpMethod;

  try {
    // 1. Health check
    if (method === "GET" && (path === "/" || path === "/health")) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          status: "online",
          service: "Infinite Soft Tech Serverless API",
          time: new Date().toISOString(),
          version: "2.0.0"
        })
      };
    }

    // 2. Submit Inquiry (Public)
    if (method === "POST" && path === "/inquiries") {
      const data = JSON.parse(event.body || "{}");
      if (!data.name || (!data.email && !data.phone)) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Name and at least Email or Phone are required." })
        };
      }

      const newInquiry = {
        id: "inq-" + Date.now().toString(36),
        createdAt: new Date().toISOString(),
        name: data.name,
        email: data.email || "",
        phone: data.phone || "",
        company: data.company || "Individual / Not Provided",
        service: data.service || "General Inquiry",
        budget: data.budget || "Not Specified",
        timeline: data.timeline || "Flexible",
        source: data.source || "Website Form",
        message: data.message || "",
        status: "new",
        adminNotes: ""
      };

      inquiriesStore.unshift(newInquiry);

      return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
          success: true,
          message: "Inquiry received successfully! Hardik Daki & the team will get in touch shortly.",
          inquiryId: newInquiry.id
        })
      };
    }

    // 3. Newsletter Subscription
    if (method === "POST" && path === "/newsletter") {
      const data = JSON.parse(event.body || "{}");
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: `Thank you for subscribing (${data.email || ""}) to Infinite Soft Tech insights!`
        })
      };
    }

    // 4. Admin Login
    if (method === "POST" && path === "/admin/login") {
      const data = JSON.parse(event.body || "{}");
      if (data.password === ADMIN_PASSWORD || data.pin === "1234") {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            token: "infinite_admin_token_" + Buffer.from(Date.now().toString()).toString("base64"),
            admin: {
              name: "Infinite Admin",
              role: "Super Admin",
              company: "Infinite Soft Tech"
            }
          })
        };
      } else {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: "Invalid password or PIN. Try 'admin123'." })
        };
      }
    }

    // 5. Admin Inquiries List
    if (method === "GET" && path === "/admin/inquiries") {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          count: inquiriesStore.length,
          data: inquiriesStore
        })
      };
    }

    // 6. Admin Update Inquiry Status / Notes
    if (method === "PATCH" && path.startsWith("/admin/inquiries/")) {
      const id = path.split("/").pop();
      const updates = JSON.parse(event.body || "{}");
      const index = inquiriesStore.findIndex(item => item.id === id);

      if (index === -1) {
        return { statusCode: 404, headers, body: JSON.stringify({ error: "Inquiry not found" }) };
      }

      inquiriesStore[index] = { ...inquiriesStore[index], ...updates };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, inquiry: inquiriesStore[index] })
      };
    }

    // 7. Admin Delete Inquiry
    if (method === "DELETE" && path.startsWith("/admin/inquiries/")) {
      const id = path.split("/").pop();
      inquiriesStore = inquiriesStore.filter(item => item.id !== id);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: "Inquiry deleted" })
      };
    }

    // 8. Admin Overview Stats
    if (method === "GET" && path === "/admin/stats") {
      const total = inquiriesStore.length;
      const newCount = inquiriesStore.filter(i => i.status === "new").length;
      const contacted = inquiriesStore.filter(i => i.status === "contacted").length;
      const proposals = inquiriesStore.filter(i => i.status === "proposal_sent").length;
      const closed = inquiriesStore.filter(i => i.status === "closed").length;

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          stats: {
            totalInquiries: total,
            newLeads: newCount,
            inDiscussion: contacted,
            proposalsSent: proposals,
            closedDeals: closed,
            conversionRate: total > 0 ? Math.round(((proposals + closed) / total) * 100) : 0
          }
        })
      };
    }

    // Fallback 404
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: `Route ${method} ${path} not found` })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error: " + err.message })
    };
  }
};
