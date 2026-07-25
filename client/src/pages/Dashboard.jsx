import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { getLeads, updateLeadStatus, deleteLead } from "../services/api";
import LeadTable from "../components/LeadTable";
import LeadCard from "../components/LeadCard";
import { Link } from "react-router-dom";

const budgetValues = {
  "<₹50k": 35000,
  "₹50k-₹1L": 75000,
  "₹1L-₹2.5L": 175000,
  "₹2.5L+": 350000,
  "<$5k": 250000,
  "$5k-$10k": 500000,
  "$10k-$25k": 1200000,
  "$25k+": 2500000,
};

const Dashboard = () => {
  const { admin, logout } = useAuth();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("list"); // 'list' | 'kanban'
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Deletion modal state
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchAllLeads = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getLeads();
      if (data.success) {
        setLeads(data.leads || []);
      } else {
        setError(data.message || "Failed to fetch leads");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error loading leads from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLeads();
  }, []);

  // Handle status update
  const handleStatusChange = async (id, newStatus) => {
    try {
      const data = await updateLeadStatus(id, newStatus);
      if (data.success && data.lead) {
        setLeads((prev) =>
          prev.map((item) => (item.id === id ? data.lead : item))
        );
        showToast(`Lead status updated to ${newStatus}`);
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to update status", "error");
    }
  };

  // Handle deletion
  const confirmDeleteLead = async () => {
    if (!leadToDelete) return;
    setDeleting(true);
    try {
      const data = await deleteLead(leadToDelete.id);
      if (data.success) {
        setLeads((prev) => prev.filter((item) => item.id !== leadToDelete.id));
        showToast("Lead successfully deleted");
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to delete lead", "error");
    } finally {
      setDeleting(false);
      setLeadToDelete(null);
    }
  };

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || (lead.status || "New") === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, statusFilter]);

  // Key metrics calculations
  const metrics = useMemo(() => {
    const total = leads.length;
    const newLeads = leads.filter((l) => (l.status || "New") === "New").length;
    const contacted = leads.filter((l) => l.status === "Contacted").length;
    const qualified = leads.filter((l) => l.status === "Qualified").length;
    const closed = leads.filter((l) => l.status === "Closed").length;

    const conversionRate = total > 0 ? Math.round(((qualified + closed) / total) * 100) : 0;

    const pipelineValue = leads.reduce((sum, l) => {
      const val = budgetValues[l.budget] || 10000;
      return sum + val;
    }, 0);

    return { total, newLeads, contacted, qualified, closed, conversionRate, pipelineValue };
  }, [leads]);

  return (
    <div className="min-h-screen bg-obsidian-950 text-zinc-100 flex flex-col selection:bg-gold-500 selection:text-obsidian-950">
      
      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 glass-panel border-b border-obsidian-800 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center shadow-md">
              <svg className="w-4 h-4 text-obsidian-950 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <span className="font-heading font-bold text-white text-base tracking-tight">
                LeadDesk <span className="text-gold-400 font-light">Mini</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={fetchAllLeads}
            disabled={loading}
            className="px-3 py-1.5 rounded-xl bg-obsidian-900 border border-obsidian-700 hover:border-gold-500/40 text-xs font-semibold text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            title="Reload database leads"
          >
            <svg className={`w-3.5 h-3.5 text-gold-400 ${loading ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="hidden sm:inline">Reload DB</span>
          </button>

          <Link
            to="/"
            className="hidden sm:inline-flex px-3 py-1.5 rounded-xl bg-obsidian-900 border border-obsidian-700 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            Public Site
          </Link>

          <div className="h-4 w-px bg-obsidian-800 hidden sm:block" />

          {/* Admin User info */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold-400/20 border border-gold-400/40 text-gold-300 font-bold text-xs flex items-center justify-center font-mono">
              {admin?.email ? admin.email.substring(0, 2).toUpperCase() : "AD"}
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="text-xs font-bold text-white leading-none">{admin?.email || "Admin"}</span>
              <span className="text-[10px] text-zinc-500 font-mono">LEAD OPERATOR</span>
            </div>
            <button
              onClick={logout}
              className="ml-1 p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-colors"
              title="Logout"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN DASHBOARD CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto px-4 lg:px-8 py-8 w-full space-y-8">
        
        {/* TOP HERO METRICS CARD */}
        <section className="w-full">
          <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-widest text-gold-400">ADMIN PIPELINE</span>
              </div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-2">
                A calmer, more premium view of every lead moving through your sales system.
              </h1>
              <p className="text-zinc-400 text-xs leading-relaxed max-w-2xl">
                Track inquiry origin, update stage progression, purge spam, and maintain clear operational control over your high-ticket pipeline.
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-obsidian-800">
              <div className="p-3 rounded-2xl bg-obsidian-950/80 border border-obsidian-800">
                <div className="text-[10px] font-mono text-zinc-500 uppercase mb-0.5">TOTAL LEADS</div>
                <div className="font-heading text-xl font-extrabold text-white">{metrics.total}</div>
                <div className="text-[10px] text-zinc-500">All captured</div>
              </div>

              <div className="p-3 rounded-2xl bg-obsidian-950/80 border border-obsidian-800">
                <div className="text-[10px] font-mono text-zinc-500 uppercase mb-0.5">NEW LEADS</div>
                <div className="font-heading text-xl font-extrabold text-blue-400">{metrics.newLeads}</div>
                <div className="text-[10px] text-zinc-500">Awaiting action</div>
              </div>

              <div className="p-3 rounded-2xl bg-obsidian-950/80 border border-obsidian-800">
                <div className="text-[10px] font-mono text-zinc-500 uppercase mb-0.5">CONVERSION</div>
                <div className="font-heading text-xl font-extrabold text-gold-400">{metrics.conversionRate}%</div>
                <div className="text-[10px] text-zinc-500">Qualified ratio</div>
              </div>

              <div className="p-3 rounded-2xl bg-obsidian-950/80 border border-obsidian-800">
                <div className="text-[10px] font-mono text-zinc-500 uppercase mb-0.5">PIPELINE VALUE</div>
                <div className="font-heading text-xl font-extrabold text-emerald-400">
                  {metrics.pipelineValue >= 100000
                    ? `₹${(metrics.pipelineValue / 100000).toFixed(1)}L`
                    : `₹${(metrics.pipelineValue / 1000).toFixed(0)}k`}
                </div>
                <div className="text-[10px] text-zinc-500">Est. total value</div>
              </div>
            </div>
          </div>
        </section>

        {/* SEARCH, FILTER & COMPACT VIEW TOGGLE BAR */}
        <section className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-obsidian-900 border border-obsidian-800">
          
          {/* Search Box & Status Filters (in List Mode) */}
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="relative flex-1 min-w-[240px] max-w-md">
              <svg className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search leads by name, email or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-obsidian-950 border border-obsidian-700 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-gold-400/60 transition-colors"
              />
            </div>

            {/* In List View: Show all status filter pills */}
            {viewMode === "list" && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {["All", "New", "Contacted", "Qualified", "Closed"].map((status) => {
                  const count = status === "All" ? leads.length : leads.filter((l) => (l.status || "New") === status).length;
                  const isSelected = statusFilter === status;
                  return (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-gold-500/20 border border-gold-400 text-gold-300"
                          : "bg-obsidian-950 border border-obsidian-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                      }`}
                    >
                      {status}
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${isSelected ? "bg-gold-400/30 text-gold-200" : "bg-obsidian-800 text-zinc-500"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Compact View Switcher Toggle */}
          <div className="flex items-center gap-1 p-1 bg-obsidian-950 rounded-xl border border-obsidian-800">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-gold-500/20 border border-gold-400 text-gold-300"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              List View
            </button>

            <button
              onClick={() => setViewMode("kanban")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "kanban"
                  ? "bg-gold-500/20 border border-gold-400 text-gold-300"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2m0 10V7m6 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              Kanban Board
            </button>
          </div>
        </section>

        {/* ERROR BANNER IF ANY */}
        {error && (
          <div className="p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
            <button onClick={fetchAllLeads} className="underline hover:text-white">Retry</button>
          </div>
        )}

        {/* MAIN DATA VIEW (LIST VS KANBAN) */}
        {loading ? (
          <div className="p-16 text-center bg-obsidian-900/40 rounded-2xl border border-obsidian-800">
            <svg className="w-8 h-8 text-gold-400 animate-spin mx-auto mb-3" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-zinc-400 text-sm font-medium">Fetching leads from PostgreSQL...</p>
          </div>
        ) : viewMode === "list" ? (
          <LeadTable
            leads={filteredLeads}
            onStatusChange={handleStatusChange}
            onDelete={(lead) => setLeadToDelete(lead)}
          />
        ) : (
          /* KANBAN BOARD VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {["New", "Contacted", "Qualified", "Closed"].map((statusKey) => {
              const columnLeads = filteredLeads.filter(
                (l) => (l.status || "New") === statusKey
              );

              return (
                <div
                  key={statusKey}
                  className="glass-panel p-4 rounded-2xl border border-obsidian-800 space-y-4 min-h-[420px] flex flex-col"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-obsidian-800">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          statusKey === "New"
                            ? "bg-blue-400"
                            : statusKey === "Contacted"
                            ? "bg-amber-400"
                            : statusKey === "Qualified"
                            ? "bg-purple-400"
                            : "bg-emerald-400"
                        }`}
                      />
                      <h4 className="font-heading font-bold text-sm text-white">{statusKey}</h4>
                    </div>

                    <span className="px-2 py-0.5 rounded-full bg-obsidian-900 border border-obsidian-700 text-xs font-mono text-zinc-400">
                      {columnLeads.length}
                    </span>
                  </div>

                  {/* Cards List */}
                  <div className="space-y-3 flex-1">
                    {columnLeads.length === 0 ? (
                      <div className="h-32 rounded-xl border border-dashed border-obsidian-800 flex items-center justify-center text-zinc-600 text-xs italic">
                        No leads in {statusKey}
                      </div>
                    ) : (
                      columnLeads.map((lead) => (
                        <LeadCard
                          key={lead.id}
                          lead={lead}
                          onStatusChange={handleStatusChange}
                          onDelete={(lead) => setLeadToDelete(lead)}
                        />
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* DELETE CONFIRMATION MODAL */}
      {leadToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel-gold max-w-md w-full p-6 rounded-3xl border border-red-500/40 shadow-2xl space-y-5 animate-scale-up">
            <div className="w-12 h-12 rounded-full bg-red-950 border border-red-800 text-red-400 flex items-center justify-center mx-auto">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>

            <div className="text-center">
              <h3 className="font-heading text-xl font-bold text-white mb-1">Delete Lead Inquiry?</h3>
              <p className="text-xs text-zinc-400">
                Are you sure you want to permanently delete the inquiry from{" "}
                <span className="text-white font-semibold">{leadToDelete.name}</span> ({leadToDelete.email})? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setLeadToDelete(null)}
                disabled={deleting}
                className="flex-1 btn-obsidian py-2.5 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteLead}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-heading text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                {deleting ? "Deleting..." : "Yes, Delete Lead"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
          <div className={`px-4 py-3 rounded-2xl shadow-2xl border text-xs font-semibold flex items-center gap-2.5 ${
            toast.type === "error"
              ? "bg-red-950 border-red-800 text-red-200"
              : "bg-obsidian-900 border-gold-400/50 text-gold-300 shadow-gold-500/10"
          }`}>
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            {toast.message}
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
