import React, { useState } from "react";
import { submitLead } from "../services/api";

const budgetTiers = [
  { label: "< ₹50,000", value: "<₹50k" },
  { label: "₹50k - ₹1 Lakh", value: "₹50k-₹1L" },
  { label: "₹1L - ₹2.5 Lakhs", value: "₹1L-₹2.5L" },
  { label: "₹2.5 Lakhs+", value: "₹2.5L+" },
];

const LeadForm = ({ onLeadCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "₹50k-₹1L",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successLead, setSuccessLead] = useState(null);
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid work email address";
    }
    if (!formData.budget) errs.budget = "Please select an estimated budget range";
    if (!formData.message.trim()) errs.message = "Please tell us briefly about your project goals";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setLoading(true);
    try {
      const response = await submitLead(formData);
      if (response.success && response.lead) {
        setSuccessLead(response.lead);
        if (onLeadCreated) onLeadCreated(response.lead);
      } else {
        setServerError(response.message || "Failed to submit project inquiry. Please try again.");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Server connection error. Please try again.";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessLead(null);
    setFormData({
      name: "",
      email: "",
      budget: "$10k-$25k",
      message: "",
    });
    setErrors({});
    setServerError("");
  };

  if (successLead) {
    return (
      <div className="glass-panel-gold rounded-2xl p-8 lg:p-10 text-center animate-fade-in relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-full bg-gold-400/20 border border-gold-400/40 text-gold-300 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gold-500/20">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="font-heading text-2xl font-bold text-white mb-2">
          Project Inquiry Received!
        </h3>
        <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
          Thank you, <span className="text-gold-300 font-semibold">{successLead.name}</span>. Our lead strategy team will review your requirements and respond within 24 hours.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-status-new text-xs font-semibold mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          Under Review
        </div>

        <div>
          <button
            onClick={handleReset}
            className="btn-obsidian px-6 py-2.5 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {serverError && (
        <div className="p-4 rounded-xl bg-red-950/50 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
          <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {serverError}
        </div>
      )}

      {/* Inputs grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
            Your Name <span className="text-gold-400">*</span>
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: null });
            }}
            className={`w-full px-4 py-3 rounded-xl bg-obsidian-900 border ${
              errors.name ? "border-red-500" : "border-obsidian-700 focus:border-gold-400/70"
            } text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-gold-400/50 transition-colors`}
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
            Work Email <span className="text-gold-400">*</span>
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: null });
            }}
            className={`w-full px-4 py-3 rounded-xl bg-obsidian-900 border ${
              errors.email ? "border-red-500" : "border-obsidian-700 focus:border-gold-400/70"
            } text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-gold-400/50 transition-colors`}
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
        </div>
      </div>

      {/* Budget Tier Selector */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
          Estimated Budget <span className="text-gold-400">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {budgetTiers.map((tier) => {
            const isSelected = formData.budget === tier.value;
            return (
              <button
                type="button"
                key={tier.value}
                onClick={() => setFormData({ ...formData, budget: tier.value })}
                className={`py-3 px-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer text-center ${
                  isSelected
                    ? "bg-gold-500/15 border-gold-400 text-gold-300 shadow-md shadow-gold-500/10"
                    : "bg-obsidian-900 border-obsidian-700 text-zinc-400 hover:border-zinc-600 hover:text-white"
                }`}
              >
                {tier.label}
              </button>
            );
          })}
        </div>
        {errors.budget && <p className="mt-1.5 text-xs text-red-400">{errors.budget}</p>}
      </div>

      {/* Message Brief */}
      <div>
        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
          Project Details <span className="text-gold-400">*</span>
        </label>
        <textarea
          rows={4}
          placeholder="Describe your project goals, scope (website, mobile app, e-commerce, or SEO), and timeline..."
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
            if (errors.message) setErrors({ ...errors, message: null });
          }}
          className={`w-full px-4 py-3 rounded-xl bg-obsidian-900 border ${
            errors.message ? "border-red-500" : "border-obsidian-700 focus:border-gold-400/70"
          } text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-gold-400/50 transition-colors resize-none`}
        />
        {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-gold py-3.5 px-6 rounded-xl font-heading text-sm font-bold tracking-wide flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin text-obsidian-950" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting Brief...
          </>
        ) : (
          <>
            Submit Project Inquiry
            <svg className="w-4 h-4 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
};

export default LeadForm;
