import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Calendar,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Clock,
  Sparkles,
  FileCheck,
  AlertCircle,
  HelpCircle,
  Award,
  Zap,
  Building,
  GraduationCap,
  ChevronRight,
  Info
} from "lucide-react";
import { SCHOLARSHIPS, evaluateEligibility } from "../data/scholarships";
import { useAuth } from "../context/AuthContext";
import TypewriterHeading from "../components/TypewriterHeading";

export default function ScholarshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, savedScholarships, toggleSave, applyScholarship, showToast } = useAuth();

  const [eligibilityModalOpen, setEligibilityModalOpen] = useState(false);

  const scholarship = SCHOLARSHIPS.find((s) => s.id === id || s.numericId === Number(id)) || SCHOLARSHIPS[0];
  const isSaved = savedScholarships.includes(scholarship.id);

  // Evaluate user eligibility against this scholarship
  const eligibilityResult = evaluateEligibility(user, scholarship);

  const handleApply = () => {
    applyScholarship(scholarship);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard!");
    }
  };

  return (
    <div className="details-page-wrapper">
      {/* Breadcrumbs Navigation */}
      <div className="details-breadcrumb-bar">
        <div className="details-container">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <ChevronRight size={14} className="breadcrumb-sep" />
          <Link to="/scholarships" className="breadcrumb-item">Scholarships</Link>
          <ChevronRight size={14} className="breadcrumb-sep" />
          <span className="breadcrumb-current">{scholarship.name}</span>
        </div>
      </div>

      {/* Hero Header Banner with Thematic Low-Opacity Backdrop */}
      <section className="details-hero-banner">
        {scholarship.bgImage && (
          <div
            className="details-hero-bg"
            style={{ backgroundImage: `url(${scholarship.bgImage})` }}
            aria-hidden="true"
          />
        )}
        <div className="details-hero-overlay" />

        <div className="details-container details-hero-content">
          <div className="details-back-row">
            <button onClick={() => navigate(-1)} className="details-back-btn">
              <ArrowLeft size={16} />
              <span>Back to Scholarships</span>
            </button>
            <div className="details-hero-actions">
              <button onClick={handleShare} className="details-icon-action" title="Share opportunity">
                <Share2 size={16} />
              </button>
              <button
                onClick={() => toggleSave(scholarship.id)}
                className={`details-icon-action ${isSaved ? "saved" : ""}`}
                title={isSaved ? "Saved in Shortlist" : "Save opportunity"}
              >
                <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          <div className="details-title-card">
            <div className="details-badges-row">
              <div className="details-icon-pill">
                {scholarship.category === "Technical (AICTE)" ? (
                  <Zap size={16} />
                ) : scholarship.category === "Armed Forces & Police" ? (
                  <ShieldCheck size={16} />
                ) : scholarship.category === "Social Justice" ? (
                  <Award size={16} />
                ) : (
                  <Landmark size={16} />
                )}
                <span>{scholarship.category}</span>
              </div>

              {scholarship.isDemo ? (
                <span className="details-demo-badge">
                  <Info size={13} /> Demo Record
                </span>
              ) : (
                <span className="details-verified-badge">
                  <ShieldCheck size={13} /> NSP Verified Opportunity
                </span>
              )}

              {scholarship.schemeCode && (
                <span className="details-code-badge">{scholarship.schemeCode}</span>
              )}
            </div>

            <TypewriterHeading
              line1={scholarship.name}
              tag="h1"
              className="details-main-heading"
              speed={20}
              initialDelay={100}
            />

            <p className="details-provider-line">
              <Building size={16} />
              <span>{scholarship.provider}</span>
            </p>

            {/* Quick Metrics Bar */}
            <div className="details-metrics-grid">
              <div className="metric-cell">
                <span className="metric-label">GRANT AMOUNT</span>
                <strong className="metric-value text-accent">{scholarship.amount}</strong>
                <small className="metric-sub">Direct Bank Transfer (DBT)</small>
              </div>

              <div className="metric-cell">
                <span className="metric-label">EDUCATION LEVEL</span>
                <strong className="metric-value">{scholarship.educationLevel}</strong>
                <small className="metric-sub">Eligible Degree/Course</small>
              </div>

              <div className="metric-cell">
                <span className="metric-label">APPLICATION DEADLINE</span>
                <strong className="metric-value">{scholarship.deadline}</strong>
                <small className="metric-sub text-closing">
                  <Clock size={11} /> Closes Soon
                </small>
              </div>

              <div className="metric-cell">
                <span className="metric-label">ELIGIBILITY MATCH</span>
                <strong className={`metric-value ${eligibilityResult.isEligible ? "text-green" : "text-amber"}`}>
                  {eligibilityResult.isEligible ? "Eligible (98%)" : "Check Criteria"}
                </strong>
                <small className="metric-sub">Based on your student profile</small>
              </div>
            </div>

            {/* Core Action CTAs: Check Eligibility & Apply Now */}
            <div className="details-cta-bar">
              <button
                className="btn-check-eligibility"
                onClick={() => setEligibilityModalOpen(true)}
              >
                <Sparkles size={18} />
                <span>Check My Eligibility</span>
              </button>

              <button className="btn-apply-now" onClick={handleApply}>
                <span>Apply Now (Simulate Application)</span>
                <CheckCircle2 size={18} />
              </button>

              <a
                href={scholarship.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-official-portal"
              >
                <span>Official NSP Portal</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="details-container details-body-layout">
        <div className="details-main-content">
          {/* NSP OTR Notice */}
          <div className="details-nsp-alert">
            <ShieldCheck size={24} className="alert-shield-icon" />
            <div>
              <h4>National Scholarship Portal (NSP) Application Requirement</h4>
              <p>
                To apply for this scheme, you must have an active One-Time Registration (OTR) ID on scholarships.gov.in.
                Ensure your Aadhaar is linked with your active NPCI bank account for seamless Direct Benefit Transfer.
              </p>
            </div>
          </div>

          {/* Scheme Description */}
          <motion.section
            className="details-content-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">
              <GraduationCap size={20} />
              <span>Description & Scheme Overview</span>
            </h2>
            <p className="section-body-text">{scholarship.description}</p>
          </motion.section>

          {/* Eligibility Criteria Detailed */}
          <motion.section
            className="details-content-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <h2 className="section-title">
              <Sparkles size={20} />
              <span>Eligibility Requirements</span>
            </h2>
            <div className="eligibility-highlight-box">
              <p>{scholarship.eligibility}</p>
            </div>

            <div className="criteria-specs-grid">
              <div className="spec-card">
                <span className="spec-label">Education Level</span>
                <strong className="spec-val">{scholarship.educationLevel}</strong>
              </div>
              <div className="spec-card">
                <span className="spec-label">Minimum Academic Score</span>
                <strong className="spec-val">≥ {scholarship.minPercentage}% in qualifying exam</strong>
              </div>
              <div className="spec-card">
                <span className="spec-label">Family Income Ceiling</span>
                <strong className="spec-val">≤ ₹{(scholarship.maxIncome || 0).toLocaleString("en-IN")} per annum</strong>
              </div>
              <div className="spec-card">
                <span className="spec-label">Target Beneficiary</span>
                <strong className="spec-val">{(scholarship.targetCategory || ["All"]).join(", ")}</strong>
              </div>
            </div>
          </motion.section>

          {/* Required Documents */}
          <motion.section
            className="details-content-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="section-title">
              <FileCheck size={20} />
              <span>Mandatory Documents Required</span>
            </h2>
            <p className="section-subtext">
              Ensure you have scanned PDF copies (under 200 KB) ready before beginning the application:
            </p>
            <ul className="documents-checklist">
              {(scholarship.documents || [
                "Class 10/12 Marksheet",
                "Income Certificate",
                "Aadhaar Card",
                "Bonafide Student Certificate"
              ]).map((doc, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} className="doc-check-icon" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Financial Coverage */}
          <motion.section
            className="details-content-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="section-title">
              <Award size={20} />
              <span>Disbursal & Financial Coverage</span>
            </h2>
            <div className="coverage-card">
              <p>{scholarship.coverage}</p>
            </div>
          </motion.section>

          {/* Application Procedure */}
          <motion.section
            className="details-content-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="section-title">
              <HelpCircle size={20} />
              <span>Step-by-Step Application Procedure</span>
            </h2>
            <div className="procedure-steps">
              <div className="procedure-step">
                <div className="step-num">1</div>
                <div>
                  <strong>Complete NSP One-Time Registration (OTR)</strong>
                  <p>Register using Aadhaar on scholarships.gov.in and obtain your 14-digit OTR ID.</p>
                </div>
              </div>
              <div className="procedure-step">
                <div className="step-num">2</div>
                <div>
                  <strong>Select Scheme & Fill Details</strong>
                  <p>Log in to NSP, search for {scholarship.schemeCode || scholarship.name}, and enter academic credentials.</p>
                </div>
              </div>
              <div className="procedure-step">
                <div className="step-num">3</div>
                <div>
                  <strong>Upload Documents & Submit</strong>
                  <p>Upload income certificate, marksheet, and bonafide letter from college.</p>
                </div>
              </div>
              <div className="procedure-step">
                <div className="step-num">4</div>
                <div>
                  <strong>Institutional Verification</strong>
                  <p>Your college/university Nodal Officer verifies your enrollment on the portal.</p>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Sidebar Info & Sticky Actions */}
        <aside className="details-sidebar">
          <div className="sidebar-sticky-card">
            <h3>Ready to Apply?</h3>
            <p className="sidebar-deadline-notice">
              <Clock size={16} />
              <span>Application closes on <strong>{scholarship.deadline}</strong></span>
            </p>

            <button className="sidebar-apply-btn" onClick={handleApply}>
              <span>Start Application Simulation</span>
              <CheckCircle2 size={16} />
            </button>

            <button
              className="sidebar-check-btn"
              onClick={() => setEligibilityModalOpen(true)}
            >
              <Sparkles size={16} />
              <span>Check My Eligibility</span>
            </button>

            <div className="sidebar-divider" />

            <div className="sidebar-info-row">
              <span>Authority:</span>
              <strong>{scholarship.ministry || scholarship.provider}</strong>
            </div>
            <div className="sidebar-info-row">
              <span>State:</span>
              <strong>{scholarship.state}</strong>
            </div>
            <div className="sidebar-info-row">
              <span>Portal:</span>
              <a href={scholarship.officialUrl} target="_blank" rel="noopener noreferrer">
                NSP Portal <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* Interactive Eligibility Diagnostic Modal */}
      {eligibilityModalOpen && (
        <div className="modal-backdrop" onClick={() => setEligibilityModalOpen(false)}>
          <motion.div
            className="eligibility-diagnostic-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
          >
            <div className="diagnostic-header">
              <div className="diagnostic-header-left">
                <Sparkles size={22} className="text-accent" />
                <div>
                  <h3>Eligibility Diagnostic Report</h3>
                  <span>{scholarship.name}</span>
                </div>
              </div>
              <button
                className="diagnostic-close"
                onClick={() => setEligibilityModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="diagnostic-result-banner">
              <div className={`result-tag ${eligibilityResult.isEligible ? "eligible" : "ineligible"}`}>
                {eligibilityResult.isEligible ? (
                  <>
                    <CheckCircle2 size={20} />
                    <span>You are ELIGIBLE for this scholarship!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={20} />
                    <span>Action Required: Criteria Not Met</span>
                  </>
                )}
              </div>
            </div>

            <div className="diagnostic-body">
              <div className="diagnostic-student-snapshot">
                <h4>Your Student Profile Snapshot:</h4>
                <div className="snapshot-grid">
                  <div><span>Level:</span> <strong>{user?.educationLevel || "Undergraduate"}</strong></div>
                  <div><span>Course:</span> <strong>{user?.course || "BCA"}</strong></div>
                  <div><span>Percentage:</span> <strong>{user?.percentage || 85}%</strong></div>
                  <div><span>Annual Income:</span> <strong>{user?.incomeFormatted || "₹2,00,000"}</strong></div>
                  <div><span>State:</span> <strong>{user?.state || "Tamil Nadu"}</strong></div>
                  <div><span>Category:</span> <strong>{user?.category || "General"}</strong></div>
                </div>
              </div>

              <div className="diagnostic-reasons">
                <h4>Evaluation Details:</h4>
                <ul className="reasons-list">
                  {eligibilityResult.reasons.map((r, i) => (
                    <li key={`r-${i}`} className="reason-item success">
                      <CheckCircle2 size={16} />
                      <span>{r}</span>
                    </li>
                  ))}
                  {eligibilityResult.failures.map((f, i) => (
                    <li key={`f-${i}`} className="reason-item failure">
                      <AlertCircle size={16} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="diagnostic-footer">
              <button
                className="diagnostic-btn-edit"
                onClick={() => {
                  setEligibilityModalOpen(false);
                  navigate("/profile");
                }}
              >
                Update My Profile
              </button>
              {eligibilityResult.isEligible ? (
                <button
                  className="diagnostic-btn-proceed"
                  onClick={() => {
                    setEligibilityModalOpen(false);
                    handleApply();
                  }}
                >
                  Proceed to Apply ↗
                </button>
              ) : (
                <button
                  className="diagnostic-btn-proceed"
                  onClick={() => {
                    setEligibilityModalOpen(false);
                    navigate("/scholarships");
                  }}
                >
                  Explore Other Scholarships
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

