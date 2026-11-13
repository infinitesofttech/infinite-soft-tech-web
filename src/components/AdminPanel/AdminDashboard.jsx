import React, { useState, useEffect } from "react";
import { apiService } from "../../services/apiService";
import { companyInfo } from "../../data/companyData";
import { 
  Users, 
  Search, 
  Download, 
  MessageSquare, 
  Phone, 
  Mail, 
  Trash2, 
  LogOut, 
  Globe, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Edit3, 
  Save, 
  X,
  FileSpreadsheet,
  ArrowUpRight,
  TrendingUp,
  Settings,
  Filter
} from "lucide-react";

export default function AdminDashboard({ onLogout, onBackToSite }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("leads"); // "leads" or "settings"
  const [stats, setStats] = useState({
    totalInquiries: 0,
    newLeads: 0,
    inDiscussion: 0,
    proposalsSent: 0,
    closedDeals: 0,
    conversionRate: 0
  });

  // Notes editing state
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [tempNotes, setTempNotes] = useState("");

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await apiService.getInquiries();
      setInquiries(data);
      const metrics = await apiService.getStats();
      setStats(metrics);
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await apiService.updateInquiry(id, { status: newStatus });
    loadData();
  };

  const handleSaveNotes = async (id) => {
    await apiService.updateInquiry(id, { adminNotes: tempNotes });
    setEditingNotesId(null);
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead record?")) {
      await apiService.deleteInquiry(id);
      loadData();
    }
  };

  const exportCSV = () => {
    if (inquiries.length === 0) {
      alert("No inquiries to export.");
      return;
    }

    const headers = ["ID", "Date", "Name", "Email", "Phone", "Company", "Service", "Budget", "Status", "Source", "Message", "Admin Notes"];
    const rows = inquiries.map(i => [
      `"${i.id}"`,
      `"${new Date(i.createdAt).toLocaleString()}"`,
      `"${(i.name || '').replace(/"/g, '""')}"`,
      `"${(i.email || '').replace(/"/g, '""')}"`,
      `"${(i.phone || '').replace(/"/g, '""')}"`,
      `"${(i.company || '').replace(/"/g, '""')}"`,
      `"${(i.service || '').replace(/"/g, '""')}"`,
      `"${(i.budget || '').replace(/"/g, '""')}"`,
      `"${i.status || 'new'}"`,
      `"${(i.source || '').replace(/"/g, '""')}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`,
      `"${(i.adminNotes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `infinite_leads_export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter(i => {
    const matchesFilter = statusFilter === "all" || i.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      (i.name || '').toLowerCase().includes(query) ||
      (i.email || '').toLowerCase().includes(query) ||
      (i.phone || '').toLowerCase().includes(query) ||
      (i.company || '').toLowerCase().includes(query) ||
      (i.service || '').toLowerCase().includes(query) ||
      (i.message || '').toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1.5"><Clock className="w-3 h-3" /> New Lead</span>;
      case "contacted":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5"><Phone className="w-3 h-3" /> In Discussion</span>;
      case "proposal_sent":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5"><FileSpreadsheet className="w-3 h-3" /> Proposal Sent</span>;
      case "closed":
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3" /> Closed Won</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-500/20 text-slate-300">New</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col">
      
      {/* Top Navbar */}
      <header className="bg-[#0B1120] border-b border-white/10 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px] shadow-glow-cyan">
              <div className="w-full h-full bg-[#070B14] rounded-[10px] flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="10">
                  <path d="M30 50 C20 30, 45 25, 50 50 C55 75, 80 70, 70 50 C60 30, 35 25, 50 50 C65 75, 40 70, 30 50 Z" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white font-display flex items-center gap-2">
                <span>Infinite Soft Tech</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                  Live Admin
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">
                Lead Pipeline & Client Management Cockpit
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>View Website</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs text-rose-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Total Leads</span>
            <div className="text-3xl font-extrabold text-white mt-1 font-display">{stats.totalInquiries}</div>
            <span className="text-[11px] text-slate-500 mt-0.5 block">All submissions</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5">
            <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider block">Action Required</span>
            <div className="text-3xl font-extrabold text-amber-400 mt-1 font-display">{stats.newLeads}</div>
            <span className="text-[11px] text-amber-300/80 mt-0.5 block">New unread leads</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 bg-cyan-500/5">
            <span className="text-xs text-cyan-300 font-semibold uppercase tracking-wider block">In Discussion</span>
            <div className="text-3xl font-extrabold text-cyan-400 mt-1 font-display">{stats.inDiscussion}</div>
            <span className="text-[11px] text-cyan-300/80 mt-0.5 block">Active conversations</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/5">
            <span className="text-xs text-indigo-300 font-semibold uppercase tracking-wider block">Proposals Sent</span>
            <div className="text-3xl font-extrabold text-indigo-400 mt-1 font-display">{stats.proposalsSent}</div>
            <span className="text-[11px] text-indigo-300/80 mt-0.5 block">Awaiting sign-off</span>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 col-span-2 lg:col-span-1">
            <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider block">Pipeline Rate</span>
            <div className="text-3xl font-extrabold text-emerald-400 mt-1 font-display">{stats.conversionRate}%</div>
            <span className="text-[11px] text-emerald-300/80 mt-0.5 block">{stats.closedDeals} closed deals</span>
          </div>
        </div>

        {/* Tab Controls: Inquiries vs Company Info */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "leads"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Customer Inquiries ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "settings"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Company Info & Office Address
            </button>
          </div>

          {activeTab === "leads" && (
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export CSV (Excel)</span>
            </button>
          )}
        </div>

        {/* Tab 1: Leads View */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            
            {/* Filter Bar & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>

              {/* Status Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                {["all", "new", "contacted", "proposal_sent", "closed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      statusFilter === status
                        ? "bg-cyan-500 text-black font-bold"
                        : "bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    {status === "all" ? "All" : status.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries Cards / Table */}
            {loading ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                Loading lead records from serverless API...
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="p-12 text-center glass-panel rounded-2xl border border-white/10 text-slate-400 text-sm">
                No inquiries match your current filter.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInquiries.map((inq) => {
                  const isEditingNotes = editingNotesId === inq.id;
                  const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');
                  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(`Hello ${inq.name}, this is Hardik Daki from Infinite Soft Tech (Ahmedabad). Regarding your inquiry for ${inq.service}...`)}`;

                  return (
                    <div
                      key={inq.id}
                      className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all space-y-4"
                    >
                      {/* Top Header of Card */}
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-base font-bold text-white font-display">
                              {inq.name}
                            </h3>
                            {getStatusBadge(inq.status)}
                            <span className="text-[11px] text-slate-500 font-mono">
                              {new Date(inq.createdAt).toLocaleDateString()} at {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className="text-xs text-cyan-400 font-medium mt-0.5">
                            {inq.company || "Independent Individual"} • Source: <span className="text-slate-300">{inq.source || 'Website'}</span>
                          </div>
                        </div>

                        {/* Status Changer & Delete */}
                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status || "new"}
                            onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                            className="bg-[#0B1120] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                          >
                            <option value="new">Mark: New Lead</option>
                            <option value="contacted">Mark: In Discussion</option>
                            <option value="proposal_sent">Mark: Proposal Sent</option>
                            <option value="closed">Mark: Closed Won</option>
                          </select>

                          <button
                            onClick={() => handleDelete(inq.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Contact & Meta details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-2">
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Email</span>
                          <a href={`mailto:${inq.email}`} className="text-white hover:text-cyan-400 font-medium break-all mt-0.5 block">
                            {inq.email || "Not Provided"}
                          </a>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Phone</span>
                          <a href={`tel:${inq.phone}`} className="text-white hover:text-cyan-400 font-medium mt-0.5 block">
                            {inq.phone || "Not Provided"}
                          </a>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Service</span>
                          <span className="text-cyan-300 font-medium mt-0.5 block truncate">
                            {inq.service || "General"}
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                          <span className="text-slate-500 block text-[10px] uppercase font-semibold">Budget Bracket</span>
                          <span className="text-emerald-400 font-medium mt-0.5 block truncate">
                            {inq.budget || "Not Specified"}
                          </span>
                        </div>
                      </div>

                      {/* Message Content */}
                      {inq.message && (
                        <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 leading-relaxed">
                          <strong className="text-slate-400 block text-[10px] uppercase mb-1">Customer Message / Requirements:</strong>
                          {inq.message}
                        </div>
                      )}

                      {/* Admin Internal Notes */}
                      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs border-t border-white/5">
                        <div className="flex-1 w-full">
                          {isEditingNotes ? (
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={tempNotes}
                                onChange={(e) => setTempNotes(e.target.value)}
                                placeholder="Add internal follow-up notes..."
                                className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-cyan-400 text-xs text-white focus:outline-none"
                              />
                              <button
                                onClick={() => handleSaveNotes(inq.id)}
                                className="px-3 py-1.5 rounded-lg bg-cyan-500 text-black font-semibold flex items-center gap-1 hover:bg-cyan-400"
                              >
                                <Save className="w-3.5 h-3.5" /> Save
                              </button>
                              <button
                                onClick={() => setEditingNotesId(null)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 text-[11px]">
                                {inq.adminNotes ? (
                                  <><strong>Internal Notes:</strong> <span className="text-slate-300">{inq.adminNotes}</span></>
                                ) : (
                                  <span className="text-slate-500 italic">No internal notes added.</span>
                                )}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingNotesId(inq.id);
                                  setTempNotes(inq.adminNotes || "");
                                }}
                                className="text-cyan-400 hover:underline text-[11px] inline-flex items-center gap-1 ml-2"
                              >
                                <Edit3 className="w-3 h-3" /> Edit Notes
                              </button>
                            </div>
                          )}
                        </div>

                        {/* WhatsApp 1-Click Action Button */}
                        {cleanPhone && (
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 hover:text-black border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 transition-all flex-shrink-0"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>1-Click WhatsApp Reply</span>
                          </a>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* Tab 2: Settings & Office Details View */}
        {activeTab === "settings" && (
          <div className="glass-panel rounded-3xl p-8 border border-white/10 max-w-3xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white font-display">
                Company Profile & Coordinates
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                These coordinates are publicly rendered across your website and contact schemas.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Company Registered Name</label>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono">{companyInfo.name}</div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Headquarters Physical Address</label>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white leading-relaxed">{companyInfo.contact.address}</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Primary Phone</label>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono">{companyInfo.contact.phone}</div>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">WhatsApp Business</label>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-emerald-400 font-mono">{companyInfo.contact.whatsapp}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Public Inquiries Email</label>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-cyan-300 font-mono">{companyInfo.contact.email}</div>
                </div>

                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Operating Hours</label>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono">{companyInfo.contact.hours}</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 leading-relaxed">
              💡 <strong>Netlify Free Tier Deployment Note:</strong> When you commit and push to GitHub, Netlify automatically redeploys this entire React website and the Serverless API in less than 60 seconds with zero server fees.
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
