import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  IndianRupee, 
  SlidersHorizontal,
  ChevronRight,
  Bell
} from 'lucide-react';

export default function Hero({ onOpenEligibility, onSearchSubmit, onSelectScholarship }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPill, setSelectedPill] = useState('');
  const [dashboardTab, setDashboardTab] = useState('matches');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery);
    }
    const el = document.getElementById('featured-scholarships');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePillClick = (pill) => {
    const newPill = selectedPill === pill ? '' : pill;
    setSelectedPill(newPill);
    if (onSearchSubmit) {
      onSearchSubmit(newPill);
    }
    const el = document.getElementById('featured-scholarships');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickPills = [
    'Engineering & CS',
    'Medicine & MBBS',
    'Women in STEM',
    'Merit-cum-Means',
    'Study Abroad'
  ];

  return (
    <section id="home" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#F8FAF7]">
      {/* Background Subtle Gradient & Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] bg-[#B9F27C]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy & Search Interaction */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Tagline / Trust Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7F3ED] border border-[#176B50]/20 text-[#102820] text-xs font-semibold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#176B50] animate-pulse" />
              <span className="text-[#176B50] font-bold">GRANTLY</span>
              <span className="text-gray-400">•</span>
              <span>Unlock Your Potential. We'll Help Fund It.</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#102820] font-display tracking-tight leading-[1.12]">
              Your Dreams Deserve Funding.{' '}
              <span className="text-[#176B50] relative inline-block">
                Find It Here.
                <svg
                  className="absolute left-0 -bottom-1.5 w-full h-3 text-[#B9F27C]/70"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
              Discover scholarships that match your academic achievements, financial needs, and career aspirations. Find the right opportunities and take the next step towards your future.
            </p>

            {/* Interactive Search Bar */}
            <div className="pt-2">
              <form onSubmit={handleSearch} className="relative group">
                <div className="flex items-center bg-white rounded-2xl shadow-[0_8px_30px_rgb(16,40,32,0.08)] border border-gray-200/80 p-2 transition-all focus-within:ring-2 focus-within:ring-[#176B50] focus-within:border-transparent">
                  <div className="pl-3 pr-2 text-gray-400">
                    <Search className="w-5 h-5 text-[#176B50]" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter scholarship name, degree, or stream (e.g. B.Tech, Tata, Need-based)..."
                    className="w-full py-2.5 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 bg-transparent focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#176B50] hover:bg-[#102820] text-white font-semibold text-sm transition-colors shadow-sm shrink-0 flex items-center gap-1.5"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-4 h-4 text-[#B9F27C]" />
                  </button>
                </div>
              </form>

              {/* Quick Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
                <span className="text-gray-500 font-medium flex items-center gap-1">
                  <SlidersHorizontal className="w-3 h-3 text-gray-400" />
                  Popular:
                </span>
                {quickPills.map((pill) => (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => handlePillClick(pill)}
                    className={`px-2.5 py-1 rounded-lg border transition-all ${
                      selectedPill === pill
                        ? 'bg-[#176B50] text-white border-[#176B50] font-semibold'
                        : 'bg-white/80 hover:bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {pill}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#featured-scholarships"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#176B50] hover:bg-[#102820] text-white font-semibold text-sm sm:text-base shadow-lg shadow-emerald-950/15 hover:shadow-xl transition-all duration-200 group"
              >
                <span>Explore Scholarships</span>
                <ArrowRight className="w-4 h-4 text-[#B9F27C] group-hover:translate-x-0.5 transition-transform" />
              </a>

              <button
                type="button"
                onClick={onOpenEligibility}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-[#102820] border border-gray-300 font-semibold text-sm sm:text-base shadow-sm hover:border-[#176B50]/40 transition-all duration-200 group"
              >
                <Sparkles className="w-4 h-4 text-[#176B50] group-hover:rotate-12 transition-transform" />
                <span>Check My Eligibility</span>
              </button>
            </div>

            {/* Social Trust Proof */}
            <div className="pt-4 flex items-center gap-4 border-t border-gray-200/60 text-xs text-gray-500">
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Student 1"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Student 2"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                  alt="Student 3"
                />
                <div className="h-8 w-8 rounded-full bg-[#102820] text-[#B9F27C] ring-2 ring-white text-[10px] font-bold flex items-center justify-center">
                  50k+
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-800">50,000+ ambitious students funded</p>
                <p className="text-[11px] text-gray-500">Free, impartial guidance across pan-India trusts & CSR funds</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Floating Dashboard Preview (Deep Green Theme) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 relative"
          >
            {/* Ambient Backlight Glow */}
            <div className="absolute inset-0 bg-radial from-[#176B50]/30 via-[#102820]/10 to-transparent blur-2xl rounded-3xl -z-10" />

            {/* Main SaaS Dashboard Preview Card in Deep Green (#102820) */}
            <div className="relative rounded-3xl bg-[#102820] text-white p-5 sm:p-7 shadow-[0_25px_60px_-15px_rgba(16,40,32,0.4)] border border-emerald-500/20 overflow-hidden">
              {/* Subtle mesh background inside */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#176B50]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#B9F27C]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Window Title Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-emerald-300/80 tracking-wide">
                    grantly-student-os · active
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B9F27C] animate-pulse" />
                  <span className="text-[11px] text-[#B9F27C] font-semibold">Live Sync</span>
                </div>
              </div>

              {/* Student Profile Bar */}
              <div className="mt-4 flex items-center justify-between gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#176B50] flex items-center justify-center font-bold text-white shadow-inner">
                    AS
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                      <span>Aarav Sharma</span>
                      <ShieldCheck className="w-4 h-4 text-[#B9F27C]" />
                    </h4>
                    <p className="text-xs text-emerald-200/70">B.Tech Computer Science · 3rd Year · IIT Kharagpur</p>
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-300/70 block">Profile Match Score</span>
                  <span className="text-xs font-bold text-[#B9F27C] bg-[#B9F27C]/10 px-2 py-0.5 rounded-md border border-[#B9F27C]/30">
                    94% Verified
                  </span>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
                <div className="bg-white/[0.04] p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-300/70 block">Total Eligible Pool</span>
                  <p className="text-lg sm:text-xl font-extrabold text-[#B9F27C] font-display mt-0.5">₹18,50,000</p>
                  <span className="text-[10px] text-white/50">Across 6 matched grants</span>
                </div>

                <div className="bg-white/[0.04] p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-300/70 block">Match Accuracy</span>
                  <p className="text-lg sm:text-xl font-extrabold text-white font-display mt-0.5 flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-[#B9F27C]" />
                    98.4%
                  </p>
                  <span className="text-[10px] text-[#B9F27C]">High success bracket</span>
                </div>

                <div className="col-span-2 sm:col-span-1 bg-white/[0.04] p-3 rounded-xl border border-white/5">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-300/70 block">Disbursed Pool</span>
                  <p className="text-lg sm:text-xl font-extrabold text-white font-display mt-0.5">₹500 Cr+</p>
                  <span className="text-[10px] text-white/50">Annual foundation total</span>
                </div>
              </div>

              {/* Dashboard Preview Tabs */}
              <div className="flex gap-2 border-b border-white/10 pb-2 mb-3 text-xs font-semibold">
                <button
                  onClick={() => setDashboardTab('matches')}
                  className={`pb-1 px-1 transition-colors ${
                    dashboardTab === 'matches'
                      ? 'text-[#B9F27C] border-b-2 border-[#B9F27C]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Matched Grants (6)
                </button>
                <button
                  onClick={() => setDashboardTab('deadlines')}
                  className={`pb-1 px-1 transition-colors ${
                    dashboardTab === 'deadlines'
                      ? 'text-[#B9F27C] border-b-2 border-[#B9F27C]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Upcoming Deadlines (2)
                </button>
              </div>

              {/* Interactive Scholarship Preview Card (Inside Dashboard) */}
              <div className="space-y-2.5">
                {/* Card 1 */}
                <div 
                  onClick={() => onSelectScholarship('reliance-ug-2026')}
                  className="bg-white/10 hover:bg-white/15 transition-all p-3.5 rounded-2xl border border-white/10 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-[#B9F27C] flex items-center justify-center font-bold text-xs">
                        RF
                      </div>
                      <div>
                        <h5 className="font-bold text-xs sm:text-sm text-white group-hover:text-[#B9F27C] transition-colors">
                          Reliance Foundation UG Scholar
                        </h5>
                        <p className="text-[11px] text-emerald-200/70">Reliance CSR · Pan India</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs sm:text-sm font-extrabold text-[#B9F27C]">₹2,00,000</span>
                      <span className="block text-[10px] text-white/60">Annual Grant</span>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                    <span className="bg-[#B9F27C]/20 text-[#B9F27C] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      98% Match
                    </span>
                    <span className="text-rose-300 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Closes Dec 15
                    </span>
                  </div>
                </div>

                {/* Card 2: Upcoming Deadline Alert Notification */}
                <div 
                  onClick={() => onSelectScholarship('tata-trusts-tech-2026')}
                  className="bg-gradient-to-r from-amber-500/15 to-transparent p-3.5 rounded-2xl border border-amber-400/30 cursor-pointer hover:border-amber-400/60 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                      <Bell className="w-4 h-4 animate-bounce" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                          Urgent Deadline
                        </span>
                        <span className="text-[10px] text-white/50">• Closes in 3 days</span>
                      </div>
                      <h5 className="font-bold text-xs text-white">Tata Trusts Tech Grant (₹1.5 Lakhs)</h5>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-300 shrink-0" />
                </div>
              </div>

              {/* Bottom live stats toast inside preview */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-200/70">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B9F27C]" />
                  Verified through National Scholarship Portal & Trust Registries
                </span>
                <span className="text-[#B9F27C] font-semibold hidden sm:inline">Updated 2m ago</span>
              </div>
            </div>

            {/* Floating Floating Accent Badge: Total Funding Available */}
            <div className="hidden sm:flex absolute -top-5 -right-4 bg-white text-[#102820] px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 items-center gap-2.5 animate-bounce [animation-duration:4s]">
              <div className="w-7 h-7 rounded-lg bg-[#E7F3ED] text-[#176B50] flex items-center justify-center">
                <IndianRupee className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-gray-500 block leading-tight">Total Funding</span>
                <span className="text-xs font-bold text-[#102820]">₹500 Cr+ Available</span>
              </div>
            </div>

            {/* Floating Floating Accent Badge: 98% Match */}
            <div className="hidden sm:flex absolute -bottom-5 -left-4 bg-white text-[#102820] px-4 py-2.5 rounded-2xl shadow-xl border border-gray-100 items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#B9F27C] text-[#102820] flex items-center justify-center font-bold">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-gray-500 block leading-tight">AI Matching</span>
                <span className="text-xs font-bold text-[#102820]">98% High Precision</span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

