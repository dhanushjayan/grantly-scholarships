import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  Calendar, 
  Award, 
  CheckCircle, 
  FileText, 
  Building2, 
  Share2, 
  Bookmark, 
  ShieldCheck, 
  Clock, 
  Sparkles 
} from 'lucide-react';

export default function ScholarshipModal({ scholarship, onClose, onBookmark, isBookmarked, onShowToast }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [hasApplied, setHasApplied] = useState(false);

  if (!scholarship) return null;

  const handleApplyClick = () => {
    setHasApplied(true);
    if (onShowToast) {
      onShowToast({
        title: "Application Redirect Initiated",
        message: `Redirecting to official portal for ${scholarship.provider}. Application ID: GRT-${Math.floor(100000 + Math.random() * 900000)} generated.`,
        type: "success"
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    if (onShowToast) {
      onShowToast({
        title: "Link Copied",
        message: `Share link for "${scholarship.title}" copied to clipboard.`,
        type: "info"
      });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-10 my-8"
        >
          {/* Header Bar */}
          <div className="bg-[#102820] text-white p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#176B50]/30 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-start justify-between relative z-10 gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${scholarship.logoBg} shadow-inner`}>
                  {scholarship.logoLetter}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-emerald-300 font-medium flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {scholarship.provider}
                    </span>
                    <span className="bg-[#B9F27C]/20 text-[#B9F27C] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#B9F27C]/30 flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" />
                      Verified
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white mt-1 leading-snug">
                    {scholarship.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics Bar inside Header */}
            <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-white/10 text-xs">
              <div>
                <span className="text-emerald-300/70 block">Grant Amount</span>
                <span className="text-base sm:text-lg font-bold text-[#B9F27C]">{scholarship.amount}</span>
              </div>
              <div>
                <span className="text-emerald-300/70 block">Your Match Score</span>
                <span className="text-base sm:text-lg font-bold text-white flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-[#B9F27C]" />
                  {scholarship.matchRate}% Match
                </span>
              </div>
              <div>
                <span className="text-emerald-300/70 block">Application Deadline</span>
                <span className="text-sm sm:text-base font-semibold text-rose-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {scholarship.deadline}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-100 px-6 bg-gray-50/70 text-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-3 font-medium transition-colors border-b-2 -mb-px ${
                activeTab === 'overview'
                  ? 'border-[#176B50] text-[#176B50]'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Overview & Scope
            </button>
            <button
              onClick={() => setActiveTab('eligibility')}
              className={`py-3 px-3 font-medium transition-colors border-b-2 -mb-px ${
                activeTab === 'eligibility'
                  ? 'border-[#176B50] text-[#176B50]'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Eligibility & Rules
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`py-3 px-3 font-medium transition-colors border-b-2 -mb-px ${
                activeTab === 'documents'
                  ? 'border-[#176B50] text-[#176B50]'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Required Documents
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 max-h-[55vh] overflow-y-auto space-y-4">
            {activeTab === 'overview' && (
              <div className="space-y-4 text-sm text-gray-600">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Scholarship Description</h4>
                  <p className="leading-relaxed">{scholarship.description}</p>
                </div>

                <div className="bg-[#E7F3ED]/60 rounded-xl p-4 border border-[#176B50]/15">
                  <h5 className="font-semibold text-[#102820] text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#176B50]" />
                    Coverage & Benefits
                  </h5>
                  <p className="text-[#102820]/90 text-sm">{scholarship.coverage}</p>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-[#176B50]/10">
                    <span>Disbursement Duration: <strong>{scholarship.tenure}</strong></span>
                    <span>Total Seats: <strong>{scholarship.seats}</strong></span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Category Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {scholarship.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'eligibility' && (
              <div className="space-y-4 text-sm text-gray-600">
                <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200/60 text-amber-900">
                  <h4 className="font-semibold text-amber-900 mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    <CheckCircle className="w-4 h-4 text-amber-700" />
                    Strict Eligibility Criteria
                  </h4>
                  <p className="leading-relaxed text-sm mt-1">{scholarship.eligibility}</p>
                </div>

                <div className="space-y-2.5">
                  <h4 className="font-semibold text-gray-900">Who Can Apply?</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#176B50] shrink-0 mt-0.5" />
                      <span>Students enrolled in recognized Indian colleges / universities in regular mode.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#176B50] shrink-0 mt-0.5" />
                      <span>Valid domicile and institutional bonafide certification.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#176B50] shrink-0 mt-0.5" />
                      <span>Family annual income must be supported by official Tehsildar / ITR document.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="space-y-4 text-sm text-gray-600">
                <p className="text-gray-500 text-xs">
                  Prepare clear scanned copies (PDF / JPEG under 2MB) of each required item before proceeding to apply.
                </p>

                <div className="grid sm:grid-cols-2 gap-3">
                  {scholarship.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-gray-200 bg-gray-50 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-md bg-white border border-gray-200 flex items-center justify-center text-[#176B50] shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-gray-800 text-xs">{doc}</span>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>All documents are securely processed with 256-bit institutional encryption.</span>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => onBookmark(scholarship.id)}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-colors ${
                  isBookmarked
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-emerald-700 text-emerald-700' : ''}`} />
                {isBookmarked ? 'Shortlisted' : 'Shortlist'}
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-700 text-xs font-semibold hover:bg-gray-100 transition-colors"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>

            <button
              onClick={handleApplyClick}
              disabled={hasApplied}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md ${
                hasApplied
                  ? 'bg-emerald-800 text-white cursor-default'
                  : 'bg-[#176B50] hover:bg-[#102820] text-white hover:shadow-lg'
              }`}
            >
              {hasApplied ? (
                <>
                  <CheckCircle className="w-4 h-4 text-[#B9F27C]" />
                  Application Portal Linked
                </>
              ) : (
                <>
                  <span>Apply on Official Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

