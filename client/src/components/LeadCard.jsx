import React from "react";

const statusColors = {
  New: "badge-status-new",
  Contacted: "badge-status-contacted",
  Qualified: "badge-status-qualified",
  Closed: "badge-status-closed",
};

const LeadCard = ({ lead, onStatusChange, onDelete }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "Just now";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4 rounded-xl bg-obsidian-900 border border-obsidian-800 hover:border-obsidian-700 transition-all shadow-md group relative flex flex-col justify-between">
      <div>
        {/* Top Header: Name & Budget */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h4 className="font-heading text-sm font-bold text-white group-hover:text-gold-300 transition-colors">
              {lead.name}
            </h4>
            <a
              href={`mailto:${lead.email}`}
              className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors truncate block max-w-[180px]"
            >
              {lead.email}
            </a>
          </div>

          <span className="px-2 py-0.5 rounded-full bg-obsidian-800 border border-obsidian-700 text-[11px] font-semibold text-gold-400 shrink-0">
            {lead.budget}
          </span>
        </div>

        {/* Message brief */}
        <div className="text-xs text-zinc-300 whitespace-pre-wrap break-all [overflow-wrap:anywhere] mb-4 bg-obsidian-950/80 p-3 rounded-xl border border-obsidian-800/80 italic max-h-44 overflow-y-auto">
          "{lead.message}"
        </div>
      </div>

      {/* Footer Controls */}
      <div className="pt-2 border-t border-obsidian-800/60 flex items-center justify-between gap-2 mt-auto">
        <span className="text-[10px] text-zinc-500 font-mono">
          {formatDate(lead.created_at)}
        </span>

        <div className="flex items-center gap-1.5">
          {/* Status Dropdown */}
          <select
            value={lead.status || "New"}
            onChange={(e) => onStatusChange(lead.id, e.target.value)}
            className={`text-[11px] font-semibold px-2 py-1 rounded-lg focus:outline-none cursor-pointer ${
              statusColors[lead.status] || statusColors.New
            }`}
          >
            <option value="New" className="bg-obsidian-900 text-blue-400">New</option>
            <option value="Contacted" className="bg-obsidian-900 text-amber-400">Contacted</option>
            <option value="Qualified" className="bg-obsidian-900 text-purple-400">Qualified</option>
            <option value="Closed" className="bg-obsidian-900 text-emerald-400">Closed</option>
          </select>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(lead)}
            className="p-1 text-zinc-500 hover:text-red-400 hover:bg-red-950/40 rounded transition-colors"
            title="Delete Lead"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;
