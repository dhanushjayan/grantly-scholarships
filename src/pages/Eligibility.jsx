import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Percent,
  IndianRupee,
  GraduationCap,
  Building,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Zap,
  Award,
  Landmark,
  Filter,
  Info
} from "lucide-react";
import { SCHOLARSHIPS, evaluateEligibility } from "../data/scholarships";
import { useAuth } from "../context/AuthContext";
import TypewriterHeading from "../components/TypewriterHeading";

export default function Eligibility() {
  const { user, applyScholarship } = useAuth();

  // Interactive profile simulation form
  const [profile, setProfile] = useState({
    name: user?.name || "Hemant Kumar",
    educationLevel: user?.educationLevel || "Undergraduate",
    course: user?.course || "BCA",
    college: user?.college || "Saveetha University",
    percentage: user?.percentage || 85,
    incomeNumeric: user?.incomeNumeric || 200000,
    state: user?.state || "Tamil Nadu",
    category: user?.category || "General",
    gender: user?.gender || "Male"
  });

  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'eligible' | 'ineligible'

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Run deterministic evaluation across all scholarships
  const evaluatedScholarships = useMemo(() => {
    return SCHOLARSHIPS.map((scholarship) => {
      const evaluation = evaluateEligibility(profile, scholarship);
      return {
        ...scholarship,
        evaluation
      };
    });
  }, [profile]);

  const eligibleCount = evaluatedScholarships.filter((s) => s.evaluation.isEligible).length;
  const ineligibleCount = evaluatedScholarships.filter((s) => !s.evaluation.isEligible).length;

  const displayedScholarships = evaluatedScholarships.filter((s) => {
    if (activeTab === "eligible") return s.evaluation.isEligible;
    if (activeTab === "ineligible") return !s.evaluation.isEligible;
    return true;
  });

  return (
    <div className="eligibility-page-wrapper">
      {/* Header */}
      <div className="eligibility-hero-section">
        <motion.div
          className="eligibility-container"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="eligibility-badge">
            <Sparkles size={15} />
            <span>Deterministic Criteria Engine</span>
          </div>
          <TypewriterHeading
            line1="Intelligent Scholarship"
            highlight="Eligibility Checker"
            suffix="."
            tag="h1"
            speed={24}
            initialDelay={120}
          />
          <p>
            No guesswork or arbitrary percentages. GRANTLY tests your academic percentage,
            family income ceiling, degree level, and social criteria against official NSP guidelines.
          </p>
        </motion.div>
      </div>

      <div className="eligibility-container eligibility-layout">
        {/* =========================================
            TOP PROFILE SIMULATOR CONTROLS
        ========================================= */}
        <div className="eligibility-simulator-card">
          <div className="simulator-header">
            <div>
              <h3>Test Profile Parameters</h3>
              <p>Adjust your academic scores or income to see instant qualification updates.</p>
            </div>
            <Link to="/profile" className="simulator-edit-link">
              Edit Master Profile ↗
            </Link>
          </div>

          <div className="simulator-grid">
            <div className="sim-field">
              <label>Education Level</label>
              <select
                name="educationLevel"
                value={profile.educationLevel}
                onChange={handleChange}
                className="sim-select"
              >
                <option value="Undergraduate">Undergraduate (BCA, B.Tech)</option>
                <option value="Postgraduate">Postgraduate (M.Tech, MBA)</option>
                <option value="School">School (Class 9–12)</option>
              </select>
            </div>

            <div className="sim-field">
              <label>Academic Score (%)</label>
              <div className="sim-input-box">
                <Percent size={14} />
                <input
                  type="number"
                  name="percentage"
                  min="35"
                  max="100"
                  value={profile.percentage}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sim-field">
              <label>Family Income (₹/yr)</label>
              <div className="sim-input-box">
                <IndianRupee size={14} />
                <input
                  type="number"
                  name="incomeNumeric"
                  step="25000"
                  value={profile.incomeNumeric}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sim-field">
              <label>State / Domicile</label>
              <select
                name="state"
                value={profile.state}
                onChange={handleChange}
                className="sim-select"
              >
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Kerala">Kerala</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="All India">Other State</option>
              </select>
            </div>

            <div className="sim-field">
              <label>Category</label>
              <select
                name="category"
                value={profile.category}
                onChange={handleChange}
                className="sim-select"
              >
                <option value="General">General / Open</option>
                <option value="EWS">EWS (Economically Weaker)</option>
                <option value="SC">SC (Scheduled Caste)</option>
                <option value="ST">ST (Scheduled Tribe)</option>
                <option value="Minority">Notified Minority</option>
                <option value="Differently-Abled (PwD)">Differently-Abled (PwD)</option>
                <option value="Armed Forces / Police Ward">Armed Forces Ward</option>
              </select>
            </div>
          </div>
        </div>

        {/* =========================================
            TABS & SUMMARY KPI BAR
        ========================================= */}
        <div className="eligibility-stats-bar">
          <div className="eligibility-tabs">
            <button
              className={`eligibility-tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All Evaluated ({SCHOLARSHIPS.length})
            </button>
            <button
              className={`eligibility-tab eligible-tab ${activeTab === "eligible" ? "active" : ""}`}
              onClick={() => setActiveTab("eligible")}
            >
              <CheckCircle2 size={15} />
              Eligible ({eligibleCount})
            </button>
            <button
              className={`eligibility-tab ineligible-tab ${activeTab === "ineligible" ? "active" : ""}`}
              onClick={() => setActiveTab("ineligible")}
            >
              <AlertCircle size={15} />
              Criteria Not Met ({ineligibleCount})
            </button>
          </div>

          <div className="eligibility-summary-badge">
            Your Profile: <strong>{profile.percentage}%</strong> • ₹
            {parseFloat(profile.incomeNumeric || 0).toLocaleString("en-IN")}/yr • {profile.state}
          </div>
        </div>

        {/* =========================================
            EVALUATION RESULTS LIST
        ========================================= */}
        <div className="evaluation-cards-stack">
          {displayedScholarships.map((scholarship) => {
            const { isEligible, reasons, failures, matchScore } = scholarship.evaluation;

            return (
              <motion.div
                key={scholarship.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45 }}
                className={`evaluation-card ${isEligible ? "card-eligible" : "card-ineligible"}`}
              >
                {/* Status Indicator Bar */}
                <div className={`eval-status-indicator ${isEligible ? "bg-green" : "bg-amber"}`} />

                <div className="eval-card-main">
                  {/* Top Row: Icon + Name + Verification + Verdict */}
                  <div className="eval-card-top">
                    <div className="eval-title-group">
                      <div className={`scholarship-icon-badge ${scholarship.color}`}>
                        {scholarship.category === "Technical (AICTE)" ? (
                          <Zap size={18} />
                        ) : scholarship.category === "Armed Forces & Police" ? (
                          <ShieldCheck size={18} />
                        ) : scholarship.category === "Social Justice" ? (
                          <Award size={18} />
                        ) : (
                          <Landmark size={18} />
                        )}
                      </div>
                      <div>
                        <div className="eval-badges">
                          <span className="eval-scheme-code">{scholarship.schemeCode || "NSP"}</span>
                          {scholarship.isDemo ? (
                            <span className="card-demo-verified"><Info size={11} /> Demo Record</span>
                          ) : (
                            <span className="card-govt-verified"><CheckCircle2 size={11} /> Govt Verified</span>
                          )}
                          <span className="eval-category-chip">{scholarship.category}</span>
                        </div>
                        <Link to={`/scholarships/${scholarship.id}`}>
                          <h3 className="eval-scheme-title">{scholarship.name}</h3>
                        </Link>
                        <p className="eval-provider-text">{scholarship.provider}</p>
                      </div>
                    </div>

                    <div className="eval-verdict-box">
                      <div className={`verdict-pill ${isEligible ? "pill-eligible" : "pill-ineligible"}`}>
                        {isEligible ? (
                          <>
                            <CheckCircle2 size={16} />
                            <span>ELIGIBLE ({matchScore}%)</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle size={16} />
                            <span>NOT ELIGIBLE</span>
                          </>
                        )}
                      </div>
                      <span className="eval-disbursal-amount">{scholarship.amount}</span>
                    </div>
                  </div>

                  {/* Criteria Diagnostic Explanation */}
                  <div className="eval-reasons-container">
                    <div className="reasons-column">
                      <strong className="reasons-heading">Requirements Checklist:</strong>
                      <ul className="reasons-bullets">
                        {reasons.map((r, idx) => (
                          <li key={idx} className="reason-bullet success">
                            <CheckCircle2 size={14} />
                            <span>{r}</span>
                          </li>
                        ))}
                        {failures.map((f, idx) => (
                          <li key={idx} className="reason-bullet failure">
                            <AlertCircle size={14} />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="eval-actions-footer">
                    <div className="eval-deadline">
                      <Clock size={13} />
                      <span>Application Closes: {scholarship.deadline}</span>
                    </div>

                    <div className="eval-buttons-group">
                      <Link to={`/scholarships/${scholarship.id}`} className="eval-btn-secondary">
                        View Complete Details ↗
                      </Link>

                      {isEligible && (
                        <button
                          onClick={() => applyScholarship(scholarship)}
                          className="eval-btn-primary"
                        >
                          <span>Apply for Scheme</span>
                          <ArrowRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

