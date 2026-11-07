import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Clock, 
  GraduationCap 
} from 'lucide-react';

export default function CTA({ onOpenEligibility }) {
  return (
    <section className="py-20 sm:py-28 bg-[#102820] text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#176B50]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#B9F27C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Floating badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#B9F27C] text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-[#B9F27C]" />
          <span>100% Free For All Indian & Global Students</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.15]">
          Your Future Is Waiting.{' '}
          <span className="text-[#B9F27C] relative inline-block">
            Let's Fund It.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto mt-6 leading-relaxed">
          Over ₹500 Crores in unclaimed corporate CSR and private education scholarships expire every year. Don't leave your hard-earned academic funding on the table.
        </p>

        {/* Primary Action Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenEligibility}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#B9F27C] hover:bg-[#a9e469] text-[#102820] font-bold text-base sm:text-lg shadow-xl shadow-[#B9F27C]/20 hover:scale-[1.02] active:scale-[0.98] transition-all group"
          >
            <span>Find Your Scholarship</span>
            <ArrowRight className="w-5 h-5 text-[#102820] group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#featured-scholarships"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-base border border-white/15 transition-all"
          >
            <span>Browse Directory</span>
          </a>
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-12 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-emerald-200/80">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#B9F27C]" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#B9F27C]" />
            <span>256-Bit Data Privacy</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-[#B9F27C]" />
            <span>Instant 3-Min Assessment</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-[#B9F27C]" />
            <span>Direct Portal Links Only</span>
          </div>
        </div>

      </div>
    </section>
  );
}

