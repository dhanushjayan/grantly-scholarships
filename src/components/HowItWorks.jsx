import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserPlus, 
  Search, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  FileCheck, 
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function HowItWorks({ onOpenEligibility }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      tagline: "Enter your academic and financial details.",
      desc: "Answer a few smart questions regarding your coursework, GPA/percentage, family income bracket, and state domicile in under 2 minutes. We never sell your data.",
      icon: <UserPlus className="w-5 h-5 text-[#176B50]" />,
      previewTitle: "Smart Profile Questionnaire",
      previewData: [
        { label: "Degree Program", value: "B.Tech Computer Science" },
        { label: "Academic Standing", value: "8.9 CGPA / 86% in 12th" },
        { label: "Household Income", value: "< ₹6,00,000 / Year" },
        { label: "Eligibility Parameters", value: "42 Rules Mapped Automatically" }
      ]
    },
    {
      number: "02",
      title: "Discover Opportunities",
      tagline: "Find scholarships matching your profile.",
      desc: "Our matching engine indexes 5,000+ verified central, state, corporate CSR, and trust schemes to eliminate false leads and show programs you actually qualify to win.",
      icon: <Search className="w-5 h-5 text-[#176B50]" />,
      previewTitle: "Real-Time Opportunity Ranking",
      previewData: [
        { label: "Reliance Foundation Grant", value: "98% Match · ₹2,00,000" },
        { label: "Tata Trusts Engineering Aid", value: "96% Match · ₹1,50,000" },
        { label: "HDFC Badhte Kadam ECSS", value: "94% Match · ₹75,000" },
        { label: "Total Eligible Funds", value: "₹4,25,000 across 14 programs" }
      ]
    },
    {
      number: "03",
      title: "Apply & Track",
      tagline: "Manage applications and monitor their progress.",
      desc: "Auto-generate required document checklists, craft winning statements of purpose, track multi-stage deadlines, and receive automated WhatsApp alerts before portals close.",
      icon: <Send className="w-5 h-5 text-[#176B50]" />,
      previewTitle: "Unified Application Command Center",
      previewData: [
        { label: "Reliance Foundation UG", value: "Submitted · Under Review ⏳" },
        { label: "Tata Trusts Tech Grant", value: "Documents Verified ✅" },
        { label: "Next Critical Deadline", value: "Dec 15, 2026 (WhatsApp alert set)" },
        { label: "Scholarship Disbursal", value: "Direct to Student Bank Account" }
      ]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#E7F3ED]/50 relative border-y border-emerald-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#176B50] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#176B50]/20 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            Zero Guesswork
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102820] font-display tracking-tight">
            How GRANTLY Works
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            A frictionless, 3-step pathway from college enrollment to direct financial grant disbursal.
          </p>
        </div>

        {/* Interactive Step Selector and Preview Area */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: 3 Steps Cards */}
          <div className="lg:col-span-6 space-y-4">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.number}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-200 border text-left ${
                    isActive
                      ? 'bg-white border-[#176B50] shadow-lg ring-1 ring-[#176B50]/30'
                      : 'bg-white/60 hover:bg-white border-transparent hover:border-gray-200 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#102820] text-[#B9F27C] shadow-md'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {step.number}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold font-display text-[#102820]">
                          {step.title}
                        </h3>
                        {isActive && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#176B50] bg-[#E7F3ED] px-2.5 py-0.5 rounded-full">
                            Active Step
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-[#176B50] mt-0.5">
                        {step.tagline}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Product Simulation Box */}
          <div className="lg:col-span-6">
            <div className="bg-[#102820] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-emerald-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#176B50]/30 rounded-full blur-3xl pointer-events-none" />
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
                <span className="text-emerald-300 font-mono text-[11px] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B9F27C]" />
                  GRANTLY OS · Step {steps[activeStep].number} In Action
                </span>
                <span className="bg-white/10 text-emerald-200 text-[10px] px-2.5 py-0.5 rounded-full font-medium">
                  Simulation Preview
                </span>
              </div>

              {/* Step Display Animated */}
              <div className="py-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#176B50] flex items-center justify-center text-[#B9F27C]">
                    {steps[activeStep].icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base font-display">
                      {steps[activeStep].previewTitle}
                    </h4>
                    <p className="text-xs text-emerald-200/70">
                      Step {steps[activeStep].number} of 03
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {steps[activeStep].previewData.map((item, i) => (
                    <motion.div
                      key={item.label + activeStep}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.08 }}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs"
                    >
                      <span className="text-gray-300 font-medium">{item.label}</span>
                      <span className="font-bold text-[#B9F27C]">{item.value}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Simulated action bottom */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-gray-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#B9F27C]" />
                    Direct API validation with National Scholarship registries
                  </span>
                </div>
              </div>

              {/* Call to action within how it works */}
              <button
                type="button"
                onClick={onOpenEligibility}
                className="w-full mt-2 py-3 bg-[#176B50] hover:bg-[#1f8061] text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span>Start Step 01 Free (No Sign Up Needed)</span>
                <ArrowRight className="w-4 h-4 text-[#B9F27C]" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

