import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, admin } = useAuth();
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-obsidian-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center shadow-lg shadow-gold-500/20 group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 text-obsidian-950 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              LeadDesk <span className="text-gold-400 font-light">Mini</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono -mt-1">DIGITAL AGENCY</span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <button
            onClick={() => scrollToSection("services")}
            className="hover:text-gold-300 transition-colors cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("process")}
            className="hover:text-gold-300 transition-colors cursor-pointer"
          >
            Process
          </button>
          <button
            onClick={() => scrollToSection("why-us")}
            className="hover:text-gold-300 transition-colors cursor-pointer"
          >
            Why Us
          </button>
          <button
            onClick={() => scrollToSection("start-project")}
            className="hover:text-gold-300 transition-colors cursor-pointer"
          >
            Get a Quote
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden sm:inline-flex text-xs font-medium text-zinc-400 hover:text-gold-300 transition-colors mr-1"
          >
            Admin Portal
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="px-3.5 py-1.5 rounded-lg bg-obsidian-800 border border-obsidian-700 text-xs font-semibold text-gold-300 hover:border-gold-500/40 transition-all flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Dashboard ({admin?.email?.split("@")[0] || "Admin"})
              </Link>
              <button
                onClick={logout}
                className="px-3 py-1.5 text-xs text-zinc-400 hover:text-red-400 transition-colors"
                title="Sign out"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => scrollToSection("start-project")}
              className="btn-gold px-4 py-2 rounded-lg text-xs font-semibold tracking-wide flex items-center gap-1.5 cursor-pointer"
            >
              Start Project
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
