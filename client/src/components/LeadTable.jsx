import React from "react";

const statusClasses = {
  New: "badge-status-new",
  Contacted: "badge-status-contacted",
  Qualified: "badge-status-qualified",
  Closed: "badge-status-closed",
};

const LeadTable = ({ leads, onStatusChange, onDelete }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "Just now";
    const date = new Date(dateStr);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  if (!leads || leads.length === 0) {
    return (
      <div className="p-12 text-center bg-obsidian-900/40 rounded-2xl border border-obsidian-800">
        <div className="w-12 h-12 rounded-full bg-obsidian-800 border border-obsidian-700 text-zinc-500 flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <p className="text-zinc-400 font-medium text-sm">No leads match your current filter.</p>
        <p className="text-zinc-600 text-xs mt-1">Submit a new project inquiry from the public landing page.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-obsidian-800 bg-obsidian-900/60 backdrop-blur-md">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-obsidian-800 bg-obsidian-950/80 text-zinc-500 font-mono uppercase tracking-wider text-[11px]">
            <th className="py-4 px-6 font-semibold">Lead Details</th>
            <th className="py-4 px-4 font-semibold">Budget Range</th>
            <th className="py-4 px-4 font-semibold">Received</th>
            <th className="py-4 px-4 font-semibold">Pipeline Status</th>
            <th className="py-4 px-6 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-obsidian-800/60">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-obsidian-800/40 transition-colors group">
              {/* Lead Details */}
              <td className="py-4 px-6 max-w-lg">
                <div className="font-heading font-bold text-sm text-white group-hover:text-gold-300 transition-colors">
                  {lead.name}
                </div>
                <div className="text-xs text-zinc-400 font-mono mb-1">
                  {lead.email}
                </div>
                <div className="text-xs text-zinc-300 whitespace-pre-wrap break-all [overflow-wrap:anywhere] italic mt-2 p-3 rounded-xl bg-obsidian-950/80 border border-obsidian-800/80 max-h-40 overflow-y-auto">
                  "{lead.message}"
                </div>
              </td>

              {/* Budget Range */}
              <td className="py-4 px-4 whitespace-nowrap">
                <span className="px-3 py-1 rounded-full bg-obsidian-800 border border-obsidian-700 font-mono text-xs font-semibold text-gold-300">
                  {lead.budget}
                </span>
              </td>

              {/* Received */}
              <td className="py-4 px-4 whitespace-nowrap font-mono text-zinc-400 text-xs">
                {formatDate(lead.created_at)}
              </td>

              {/* Pipeline Status */}
              <td className="py-4 px-4 whitespace-nowrap">
                <div className="relative inline-block">
                  <select
                    value={lead.status || "New"}
                    onChange={(e) => onStatusChange(lead.id, e.target.value)}
                    className={`px-3 py-1.5 rounded-xl font-semibold text-xs border focus:outline-none cursor-pointer pr-6 appearance-none ${
                      statusClasses[lead.status] || statusClasses.New
                    }`}
                  >
                    <option value="New" className="bg-obsidian-900 text-blue-400">New</option>
                    <option value="Contacted" className="bg-obsidian-900 text-amber-400">Contacted</option>
                    <option value="Qualified" className="bg-obsidian-900 text-purple-400">Qualified</option>
                    <option value="Closed" className="bg-obsidian-900 text-emerald-400">Closed</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-70">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </td>

              {/* Actions */}
              <td className="py-4 px-6 text-right whitespace-nowrap">
                <button
                  onClick={() => onDelete(lead)}
                  className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-900/50 rounded-xl transition-all"
                  title="Delete lead inquiry"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
