import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  GraduationCap, 
  IndianRupee, 
  CheckCircle2, 
  Award, 
  Loader2 
} from 'lucide-react';

export default function EligibilityModal({ isOpen, onClose, onApplyFilter }) {
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [formData, setFormData] = useState({
    level: 'Undergraduate',
    field: 'Engineering & Tech',
    income: '< ₹6 LPA',
    score: 'Above 80%',
    category: 'General / EWS'
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        setStep(4);
      }, 900);
    }
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  const handleViewMatches = () => {
    onClose();
    if (onApplyFilter) {
      onApplyFilter(formData.field);
    }
    const el = document.getElementById('featured-scholarships');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-10"
        >
          {/* Header */}
          <div className="bg-[#102820] text-white p-6 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#176B50] flex items-center justify-center text-[#B9F27C]">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-bold text-lg text-white font-display">Instant Eligibility Matcher</h3>
                  <p className="text-xs text-emerald-200/80">3-minute AI profile assessment</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white p-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Progress Indicators */}
            {step <= 3 && (
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
                <div className={`h-1.5 rounded-full flex-1 transition-colors ${step >= 1 ? 'bg-[#B9F27C]' : 'bg-white/20'}`} />
                <div className={`h-1.5 rounded-full flex-1 transition-colors ${step >= 2 ? 'bg-[#B9F27C]' : 'bg-white/20'}`} />
                <div className={`h-1.5 rounded-full flex-1 transition-colors ${step >= 3 ? 'bg-[#B9F27C]' : 'bg-white/20'}`} />
              </div>
            )}
          </div>

          {/* Body */}
          <div className="p-6">
            {isCalculating ? (
              <div className="py-12 text-center space-y-4">
                <Loader2 className="w-10 h-10 text-[#176B50] animate-spin mx-auto" />
                <h4 className="font-bold text-lg text-gray-900">Cross-referencing 5,000+ Grants...</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Matching your academic credentials against government, trust, and private CSR criteria.
                </p>
              </div>
            ) : step === 1 ? (
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#176B50]">Step 1 of 3</span>
                <h4 className="text-lg font-bold text-gray-900">What is your current education level & stream?</h4>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Education Level</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Class 11 - 12', 'Undergraduate (UG)', 'Postgraduate (PG)', 'PhD / Doctorate'].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setFormData({ ...formData, level: lvl })}
                        className={`p-2.5 text-xs font-medium rounded-xl border text-left transition-all ${
                          formData.level === lvl
                            ? 'border-[#176B50] bg-[#E7F3ED] text-[#102820] font-semibold ring-1 ring-[#176B50]'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Primary Field / Stream</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Engineering & Tech', 'Medicine & Healthcare', 'Women in STEM', 'Commerce & Arts'].map((fld) => (
                      <button
                        key={fld}
                        type="button"
                        onClick={() => setFormData({ ...formData, field: fld })}
                        className={`p-2.5 text-xs font-medium rounded-xl border text-left transition-all ${
                          formData.field === fld
                            ? 'border-[#176B50] bg-[#E7F3ED] text-[#102820] font-semibold ring-1 ring-[#176B50]'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {fld}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : step === 2 ? (
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#176B50]">Step 2 of 3</span>
                <h4 className="text-lg font-bold text-gray-900">Family Income & Financial Category</h4>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Annual Household Gross Income</label>
                  <div className="space-y-2">
                    {['Less than ₹2.5 Lakhs / year', '₹2.5 Lakhs – ₹6 Lakhs / year', '₹6 Lakhs – ₹12 Lakhs / year', 'Above ₹12 Lakhs / year'].map((inc) => (
                      <button
                        key={inc}
                        type="button"
                        onClick={() => setFormData({ ...formData, income: inc })}
                        className={`w-full p-3 text-xs font-medium rounded-xl border text-left flex items-center justify-between transition-all ${
                          formData.income === inc
                            ? 'border-[#176B50] bg-[#E7F3ED] text-[#102820] font-semibold ring-1 ring-[#176B50]'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>{inc}</span>
                        {formData.income === inc && <CheckCircle2 className="w-4 h-4 text-[#176B50]" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : step === 3 ? (
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#176B50]">Step 3 of 3</span>
                <h4 className="text-lg font-bold text-gray-900">Academic Standing & Reservation Criteria</h4>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Latest Academic Percentage / CGPA</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Above 85%', '70% – 85%', '60% – 70%'].map((sc) => (
                      <button
                        key={sc}
                        type="button"
                        onClick={() => setFormData({ ...formData, score: sc })}
                        className={`p-3 text-xs font-medium rounded-xl border text-center transition-all ${
                          formData.score === sc
                            ? 'border-[#176B50] bg-[#E7F3ED] text-[#102820] font-semibold ring-1 ring-[#176B50]'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {sc}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Special Quota / Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['General', 'OBC - Non Creamy', 'SC / ST', 'Single Girl Child'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat })}
                        className={`p-2.5 text-xs font-medium rounded-xl border text-left transition-all ${
                          formData.category === cat
                            ? 'border-[#176B50] bg-[#E7F3ED] text-[#102820] font-semibold ring-1 ring-[#176B50]'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Result Screen */
              <div className="text-center py-2 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#E7F3ED] text-[#176B50] flex items-center justify-center mx-auto ring-8 ring-[#E7F3ED]/40">
                  <Award className="w-8 h-8" />
                </div>
                
                <div>
                  <span className="bg-[#B9F27C] text-[#102820] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                    High Probability Matches
                  </span>
                  <h4 className="text-2xl font-bold font-display text-gray-900 mt-2">
                    Found 14 Eligible Scholarships
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 max-w-sm mx-auto">
                    Based on your profile in <strong>{formData.field}</strong> ({formData.score}), you qualify for estimated funding up to:
                  </p>
                </div>

                <div className="bg-[#102820] text-white p-5 rounded-2xl max-w-sm mx-auto shadow-xl relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-32 h-32 bg-[#176B50]/40 rounded-full blur-2xl" />
                  <span className="text-xs text-emerald-300 block uppercase font-medium">Estimated Funding Pool</span>
                  <p className="text-3xl font-extrabold text-[#B9F27C] font-display mt-0.5">₹4,25,000</p>
                  <span className="text-[11px] text-emerald-200/80 mt-1 block">Includes Reliance Foundation & Tata Trusts opportunities</span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
                  <button
                    onClick={handleViewMatches}
                    className="px-6 py-3 rounded-xl bg-[#176B50] text-white font-semibold text-sm hover:bg-[#102820] transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <span>View Matched Scholarships</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Controls for Steps 1-3 */}
          {step <= 3 && !isCalculating && (
            <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : <div />}

              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#176B50] hover:bg-[#102820] text-white text-xs sm:text-sm font-semibold transition-all shadow-md ml-auto"
              >
                <span>{step === 3 ? 'Calculate Matches' : 'Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

