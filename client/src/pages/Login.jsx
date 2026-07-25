import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-obsidian-950 text-zinc-100 flex flex-col selection:bg-gold-500 selection:text-obsidian-950">
      {/* Top Bar */}
      <header className="border-b border-obsidian-800/80 px-6 py-4 glass-panel flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center shadow-md">
            <svg className="w-4 h-4 text-obsidian-950 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-heading font-bold text-white text-base tracking-tight">
            LeadDesk <span className="text-gold-400 font-light">Mini</span>
          </span>
        </Link>

        <div className="flex items-center gap-4 text-xs">
          <Link
            to="/"
            className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 font-medium"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 lg:px-8 py-12 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Column: Context & Highlights */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-mono font-semibold mb-4">
                INTERNAL OPERATIONS PORTAL
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                Secure access for the agency team running client growth.
              </h1>

              <p className="text-zinc-400 text-sm leading-relaxed max-w-lg">
                An editorial login experience built to match the premium Obsidian and Champagne system. Monitor leads, review pipeline momentum, and move opportunities with confidence.
              </p>
            </div>
          </div>

          {/* Right Column: Login Card */}
          <div className="lg:col-span-6 max-w-md mx-auto w-full">
            <div className="glass-panel-gold rounded-3xl p-8 border border-gold-500/30 shadow-2xl relative">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-obsidian-800">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400">ADMIN SIGN IN</span>
                  <h2 className="font-heading text-2xl font-bold text-white">Welcome back</h2>
                </div>
                <div className="w-10 h-10 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>

              <LoginForm onSuccess={() => navigate("/dashboard")} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Login;
