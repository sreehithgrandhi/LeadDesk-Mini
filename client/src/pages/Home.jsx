import React from "react";
import Navbar from "../components/Navbar";
import LeadForm from "../components/LeadForm";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-obsidian-950 text-zinc-100 selection:bg-gold-500 selection:text-obsidian-950 flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-16 space-y-28">
        
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          <div className="lg:col-span-8 glass-panel rounded-3xl p-8 lg:p-14 relative overflow-hidden group">
            {/* Background Ambient Glow */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-gold-500/20 transition-all duration-700" />

            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-obsidian-900 border border-gold-500/30 text-gold-400 text-xs font-mono font-semibold tracking-wider mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                DIGITAL PRODUCT AGENCY
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
                We design & build high-impact digital products for <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-amber-400 to-amber-600">ambitious brands.</span>
              </h1>

              <p className="text-zinc-400 text-base lg:text-lg leading-relaxed mb-8 max-w-2xl">
                From bespoke business websites and mobile apps to scalable e-commerce storefronts, we turn your product vision into polished digital experiences engineered for revenue.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-10">
                <a
                  href="#start-project"
                  className="btn-gold px-6 py-3.5 rounded-xl font-heading text-sm font-bold flex items-center gap-2"
                >
                  Start Your Project
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a
                  href="#services"
                  className="btn-obsidian px-6 py-3.5 rounded-xl text-sm font-semibold hover:text-white"
                >
                  Explore Capabilities
                </a>
              </div>
            </div>
          </div>

          {/* Hero Side Highlight Card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass-panel-gold rounded-3xl p-8 flex-1 flex flex-col justify-between relative overflow-hidden">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-gold-400 mb-2 block">OUR CREDO</span>
                <h3 className="font-heading text-2xl font-bold text-white mb-3">
                  Digital products that elevate your brand positioning.
                </h3>
                <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                  We combine strategy, luxury UI/UX design, and clean full-stack architecture to build platforms that convert visitors into valuable customers.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian-950/90 border border-obsidian-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <span className="text-gold-400">★</span> Senior-led Development
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <span className="text-gold-400">★</span> Performance & SEO First
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <span className="text-gold-400">★</span> Transparent Milestones
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="space-y-12 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-400">SERVICES & CAPABILITIES</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mt-2">
              End-to-End Digital Product Engineering
            </h2>
            <p className="text-zinc-400 text-sm mt-3">
              Whether launching a new business or scaling an existing system, we build solutions tailored to your commercial targets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="glass-panel p-8 rounded-3xl border border-obsidian-800 hover:border-gold-500/40 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-obsidian-900 border border-obsidian-700 text-gold-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-gold-500/50 transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">Business Websites</h3>
                <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                  Custom brand-first web platforms with intuitive pacing, clean typography, and fast loading speeds to maximize conversion intent.
                </p>
              </div>
              <ul className="text-[11px] text-zinc-500 space-y-1.5 font-mono pt-4 border-t border-obsidian-800">
                <li>• Bespoke UI/UX Design</li>
                <li>• Responsive Layouts</li>
                <li>• Content Management</li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="glass-panel p-8 rounded-3xl border border-obsidian-800 hover:border-gold-500/40 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-obsidian-900 border border-obsidian-700 text-gold-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-gold-500/50 transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">Mobile Apps</h3>
                <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                  Cross-platform iOS and Android applications designed for high performance, smooth interactions, and long-term user retention.
                </p>
              </div>
              <ul className="text-[11px] text-zinc-500 space-y-1.5 font-mono pt-4 border-t border-obsidian-800">
                <li>• iOS & Android Native Feel</li>
                <li>• Realtime Offline Sync</li>
                <li>• API Integration</li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="glass-panel p-8 rounded-3xl border border-obsidian-800 hover:border-gold-500/40 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-obsidian-900 border border-obsidian-700 text-gold-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-gold-500/50 transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">E-commerce Stores</h3>
                <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                  High-converting digital storefronts built to showcase product catalogs, optimize checkout flows, and drive repeat customer purchases.
                </p>
              </div>
              <ul className="text-[11px] text-zinc-500 space-y-1.5 font-mono pt-4 border-t border-obsidian-800">
                <li>• Custom Cart & Checkout</li>
                <li>• Payment Gateways</li>
                <li>• Inventory Management</li>
              </ul>
            </div>

            {/* Service 4 */}
            <div className="glass-panel p-8 rounded-3xl border border-obsidian-800 hover:border-gold-500/40 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-obsidian-900 border border-obsidian-700 text-gold-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-gold-500/50 transition-all">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">SEO & Growth</h3>
                <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                  Technical SEO architecture, Core Web Vitals optimization, and keyword targeting engineered to capture search volume organically.
                </p>
              </div>
              <ul className="text-[11px] text-zinc-500 space-y-1.5 font-mono pt-4 border-t border-obsidian-800">
                <li>• Technical SEO Audits</li>
                <li>• Page Speed Optimization</li>
                <li>• Organic Traffic Growth</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION ("HOW WE WORK") */}
        <section id="process" className="space-y-12 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-400">HOW WE WORK</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white mt-2">
              A Transparent, 4-Step Engineering Process
            </h2>
            <p className="text-zinc-400 text-sm mt-3">
              We eliminate handoff friction with structured milestones and continuous client visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-obsidian-900 border border-obsidian-800 relative">
              <div className="text-xs font-mono font-bold text-gold-400 mb-2">STEP 01</div>
              <h4 className="font-heading text-lg font-bold text-white mb-2">Discovery & Strategy</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We analyze your business targets, target audience, and key performance metrics before writing a single line of code.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-obsidian-900 border border-obsidian-800 relative">
              <div className="text-xs font-mono font-bold text-gold-400 mb-2">STEP 02</div>
              <h4 className="font-heading text-lg font-bold text-white mb-2">UI/UX Architecture</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Our designers map wireframes and interactive prototypes with custom obsidian visual systems and clear user paths.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-obsidian-900 border border-obsidian-800 relative">
              <div className="text-xs font-mono font-bold text-gold-400 mb-2">STEP 03</div>
              <h4 className="font-heading text-lg font-bold text-white mb-2">Full-Stack Development</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Our senior engineers build your app using modern frontend frameworks, secure REST APIs, and optimized databases.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-obsidian-900 border border-obsidian-800 relative">
              <div className="text-xs font-mono font-bold text-gold-400 mb-2">STEP 04</div>
              <h4 className="font-heading text-lg font-bold text-white mb-2">Launch & Growth</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We perform rigorous QA testing, deploy to high-availability infrastructure, and monitor performance after launch.
              </p>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US SECTION */}
        <section id="why-us" className="glass-panel p-8 lg:p-12 rounded-3xl border border-obsidian-800 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-400">WHY AGENCY LEADDESK</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
                Built for brands that demand quality without compromise.
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                We don't use cookie-cutter templates. Every project is engineered from scratch to match your exact brand vision and business operational requirements.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-obsidian-900 border border-obsidian-800">
                <div className="text-gold-400 font-bold text-base mb-1">Pixel-Perfect Finish</div>
                <p className="text-xs text-zinc-400">Elevated dark theme aesthetics with responsive visual harmony across all mobile and desktop screens.</p>
              </div>

              <div className="p-5 rounded-2xl bg-obsidian-900 border border-obsidian-800">
                <div className="text-gold-400 font-bold text-base mb-1">Direct Developer Access</div>
                <p className="text-xs text-zinc-400">Work directly with senior lead engineers without account managers or communication delays.</p>
              </div>

              <div className="p-5 rounded-2xl bg-obsidian-900 border border-obsidian-800">
                <div className="text-gold-400 font-bold text-base mb-1">Transparent Pricing</div>
                <p className="text-xs text-zinc-400">Fixed milestone quotes based on budget tiers so you always know what to expect.</p>
              </div>

              <div className="p-5 rounded-2xl bg-obsidian-900 border border-obsidian-800">
                <div className="text-gold-400 font-bold text-base mb-1">High Conversion SLA</div>
                <p className="text-xs text-zinc-400">Form intake strategies engineered to turn potential inquiries into paying customers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* INTAKE FORM SECTION */}
        <section id="start-project" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-24">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-mono font-semibold">
              START YOUR BRIEF
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Get a custom proposal within 24 hours.
            </h2>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Tell us about what you are building. Share your project goals, estimated budget range, and timeline expectations, and our team will get back to you promptly.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 text-xs text-zinc-300 p-3.5 rounded-xl bg-obsidian-900 border border-obsidian-800">
                <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-300 flex items-center justify-center shrink-0">✓</div>
                <span>Confidential NDA protected project review</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-300 p-3.5 rounded-xl bg-obsidian-900 border border-obsidian-800">
                <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-300 flex items-center justify-center shrink-0">✓</div>
                <span>Transparent scope and milestone estimates</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-300 p-3.5 rounded-xl bg-obsidian-900 border border-obsidian-800">
                <div className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-300 flex items-center justify-center shrink-0">✓</div>
                <span>Direct consultation with lead tech architects</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-10 border border-obsidian-800 shadow-2xl">
            <LeadForm />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-obsidian-800/80 bg-obsidian-950 py-10 px-4 lg:px-8 mt-24 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-heading text-sm font-bold text-white">LeadDesk Mini Agency</span>
            <span className="text-zinc-400">High-Ticket Digital Products & Full-Stack Engineering</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-zinc-400">
            <a href="#services" className="hover:text-gold-300 transition-colors">Services</a>
            <a href="#process" className="hover:text-gold-300 transition-colors">Process</a>
            <a href="#start-project" className="hover:text-gold-300 transition-colors">Get Proposal</a>
            <Link to="/login" className="hover:text-gold-300 transition-colors text-zinc-500">Admin Portal</Link>
          </div>

          <div className="text-zinc-500 text-right">
            © {new Date().getFullYear()} LeadDesk Mini. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
