import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Bookmark,
  CheckCircle2,
  Clock,
  FileText,
  User,
  GraduationCap,
  Building,
  ArrowRight,
  ArrowUpRight,
  AlertCircle,
  TrendingUp,
  Award,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Zap,
  Landmark,
  Plus,
  MapPin,
  Percent,
  IndianRupee,
  Layers,
  Check,
  Calendar
} from "lucide-react";
import { SCHOLARSHIPS, evaluateEligibility } from "../data/scholarships";
import { useAuth } from "../context/AuthContext";
import TypewriterHeading from "../components/TypewriterHeading";

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, savedScholarships, toggleSave, applications, applyScholarship } = useAuth();

  const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "overview");

  // Calculate matching scholarships based on user's profile
  const { matchingScholarships, recommendedCount } = useMemo(() => {
    const list = SCHOLARSHIPS.filter((s) => {
      const evaluation = evaluateEligibility(user, s);
      return evaluation.isEligible;
    });
    return { matchingScholarships: list, recommendedCount: list.length };
  }, [user]);

  // Saved scholarships objects
  const savedList = useMemo(() => {
    return SCHOLARSHIPS.filter((s) => savedScholarships.includes(s.id));
  }, [savedScholarships]);

  // Upcoming deadlines (closing within next 30 days)
  const upcomingDeadlines = useMemo(() => {
    return SCHOLARSHIPS.slice(0, 4);
  }, []);

  const totalGrantApproved = applications.filter((a) => a.status === "Approved").length;
  const underReviewCount = applications.length - totalGrantApproved;

  return (
    <div className="dashboard-page-wrapper">
      <div className="dashboard-container">
        {/* =========================================
            TOP WELCOME BANNER (EXECUTIVE SCHOLAR HERO)
        ========================================= */}
        <motion.div
          className="dashboard-welcome-banner"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="welcome-left">
            <div className="welcome-avatar-wrapper">
              <div className="welcome-avatar">
                {user?.avatar || (user?.name ? user.name.charAt(0).toUpperCase() : "D")}
              </div>
              <span className="avatar-status-dot" title="NSP Portal Synced" />
            </div>

            <div className="welcome-text-block">
              <div className="welcome-pill-row">
                <span className="welcome-verified-badge">
                  <ShieldCheck size={13} />
                  <span>NSP OTR Verified Scholar</span>
                </span>
                <span className="welcome-status-pill">
                  <span className="pulse-indicator-dot" />
                  <span>Real-time DBT Sync</span>
                </span>
              </div>

              <TypewriterHeading
                line2Prefix="Welcome back, "
                highlight={user?.name?.split(" ")[0] || "Student"}
                suffix=" 👋"
                tag="h1"
                speed={26}
                initialDelay={100}
              />

              <div className="welcome-meta-chips">
                <span className="meta-chip">
                  <GraduationCap size={13} />
                  <span>{user?.course || "BCA"} ({user?.educationLevel || "Undergraduate"})</span>
                </span>
                <span className="meta-chip">
                  <Building size={13} />
                  <span>{user?.college || "Saveetha University"}</span>
                </span>
                <span className="meta-chip score-chip">
                  <Sparkles size={13} />
                  <span>Academic Score: <strong>{user?.percentage || 85}%</strong></span>
                </span>
              </div>
            </div>
          </div>

          <div className="welcome-right">
            <Link to="/profile" className="btn-edit-profile">
              <User size={15} />
              <span>Edit Profile</span>
            </Link>
            <Link to="/eligibility" className="btn-run-check">
              <Sparkles size={15} />
              <span>Eligibility Diagnostic</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        {/* =========================================
            KPI OVERVIEW CARDS (FINTECH METRIC TILES)
        ========================================= */}
        <div className="dashboard-metrics-grid">
          {[
            {
              icon: <Sparkles size={22} />,
              colorClass: "bg-emerald",
              tag: "MATCHING SCHOLARSHIPS",
              value: `${recommendedCount} Opportunities`,
              note: "100% verified to your academic criteria",
              noteClass: "text-green",
              tab: "recommended",
              badge: "Verified"
            },
            {
              icon: <Bookmark size={22} />,
              colorClass: "bg-purple",
              tag: "SAVED SHORTLIST",
              value: `${savedScholarships.length} Saved`,
              note: "Bookmarked for immediate application",
              noteClass: "",
              tab: "saved",
              badge: "Shortlist"
            },
            {
              icon: <FileText size={22} />,
              colorClass: "bg-blue",
              tag: "APPLICATIONS TRACKED",
              value: `${applications.length} Submitted`,
              note: `${totalGrantApproved} Approved • ${underReviewCount} Under Review`,
              noteClass: "text-blue",
              tab: "applications",
              badge: "Active"
            },
            {
              icon: <Clock size={22} />,
              colorClass: "bg-amber",
              tag: "ACTIVE DEADLINES",
              value: "3 Closing Soon",
              note: "National Scholarship Portal alerts",
              noteClass: "text-amber",
              tab: "overview",
              badge: "Urgent"
            }
          ].map((metric, i) => (
            <motion.div
              key={metric.tag}
              className={`dashboard-metric-card ${activeTab === metric.tab ? "metric-card-selected" : ""}`}
              onClick={() => setActiveTab(metric.tab)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div className="metric-card-top-row">
                <div className={`metric-icon-box ${metric.colorClass}`}>
                  {metric.icon}
                </div>
                <span className={`metric-corner-badge ${metric.colorClass}`}>
                  {metric.badge}
                </span>
              </div>

              <div className="metric-details">
                <span className="metric-tag">{metric.tag}</span>
                <h2>{metric.value}</h2>
                <p className={`metric-note ${metric.noteClass}`}>
                  <span className="metric-bullet">●</span> {metric.note}
                </p>
              </div>

              <div className="metric-hover-arrow">
                <span>View {metric.tab}</span>
                <ChevronRight size={13} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* =========================================
            SEGMENTED NAVIGATION TABS (MACOS PILL TRACK)
        ========================================= */}
        <div className="dashboard-tabs-track">
          <button
            className={`dashboard-nav-tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <TrendingUp size={15} />
            <span>Dashboard Overview</span>
          </button>
          <button
            className={`dashboard-nav-tab ${activeTab === "recommended" ? "active" : ""}`}
            onClick={() => setActiveTab("recommended")}
          >
            <Sparkles size={15} />
            <span>Recommended For You</span>
            <span className="tab-count-pill">{recommendedCount}</span>
          </button>
          <button
            className={`dashboard-nav-tab ${activeTab === "applications" ? "active" : ""}`}
            onClick={() => setActiveTab("applications")}
          >
            <FileText size={15} />
            <span>My Applications</span>
            <span className="tab-count-pill">{applications.length}</span>
          </button>
          <button
            className={`dashboard-nav-tab ${activeTab === "saved" ? "active" : ""}`}
            onClick={() => setActiveTab("saved")}
          >
            <Bookmark size={15} />
            <span>Saved Shortlist</span>
            <span className="tab-count-pill">{savedList.length}</span>
          </button>
        </div>

        {/* =========================================
            TAB 1: OVERVIEW TAB CONTENT
        ========================================= */}
        {activeTab === "overview" && (
          <div className="dashboard-tab-content">
            <div className="dashboard-split-layout">
              {/* Left Main Column */}
              <div className="dashboard-main-column">
                <div className="dash-section-header">
                  <div>
                    <h3>Top Matched Scholarships For You</h3>
                    <p>
                      Calculated using your Saveetha University profile ({user?.course || "BCA"}, {user?.percentage || 85}%)
                    </p>
                  </div>
                  <Link to="/scholarships" className="dash-view-all">
                    <span>Explore All ({SCHOLARSHIPS.length})</span>
                    <ArrowUpRight size={14} />
                  </Link>
                </div>

                <div className="dash-recommended-stack">
                  {matchingScholarships.slice(0, 3).map((scholarship) => (
                    <motion.div
                      key={scholarship.id}
                      className="dash-scholarship-card"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="dash-card-left">
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

                        <div className="dash-card-info-group">
                          <div className="dash-scheme-badges">
                            <span className="card-scheme-code">{scholarship.schemeCode || "NSP"}</span>
                            <span className="card-govt-verified">
                              <CheckCircle2 size={11} /> Govt Verified
                            </span>
                            <span className="card-match-pill">
                              <Sparkles size={11} /> 98% Match
                            </span>
                          </div>

                          <Link to={`/scholarships/${scholarship.id}`} className="dash-card-title-link">
                            <h4>{scholarship.name}</h4>
                          </Link>

                          <div className="dash-card-provider">
                            <Landmark size={13} />
                            <span>{scholarship.provider}</span>
                          </div>
                        </div>
                      </div>

                      <div className="dash-card-right">
                        <div className="dash-card-funding">
                          <strong>{scholarship.amount}</strong>
                          <span className="dbt-tag">Direct Bank Transfer</span>
                        </div>

                        <div className="dash-card-actions">
                          <Link to={`/scholarships/${scholarship.id}`} className="btn-dash-details">
                            Details
                          </Link>
                          <button
                            onClick={() => applyScholarship(scholarship)}
                            className="btn-dash-apply"
                          >
                            <span>Apply</span>
                            <ArrowUpRight size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Applications Pipeline Quick View */}
                <div className="dash-section-header" style={{ marginTop: "42px" }}>
                  <div>
                    <h3>My Application Pipeline</h3>
                    <p>Real-time simulated tracking for your scholarship applications</p>
                  </div>
                  <button onClick={() => setActiveTab("applications")} className="dash-view-all">
                    <span>View Full Tracker</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>

                <div className="dash-pipeline-table-card">
                  <table className="dash-pipeline-table">
                    <thead>
                      <tr>
                        <th>SCHOLARSHIP SCHEME</th>
                        <th>DISBURSAL</th>
                        <th>DATE</th>
                        <th>STATUS</th>
                        <th>TRACKING REF</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app) => (
                        <tr key={app.id}>
                          <td>
                            <strong>{app.scholarshipName}</strong>
                          </td>
                          <td className="text-bold-grant">{app.amount}</td>
                          <td>{app.appliedDate}</td>
                          <td>
                            <span className={`status-pill ${app.status.toLowerCase().replace(" ", "-")}`}>
                              {app.status === "Approved" && <CheckCircle2 size={13} />}
                              {app.status === "Under Review" && <Clock size={13} />}
                              {app.status === "Applied" && <FileText size={13} />}
                              <span>{app.status}</span>
                            </span>
                          </td>
                          <td>
                            <code className="ref-code">{app.referenceId}</code>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Side Column */}
              <div className="dashboard-side-column">
                {/* Verified Student Profile Card */}
                <div className="dash-sidebar-box">
                  <div className="sidebar-box-header">
                    <div className="sidebar-title-badge">
                      <GraduationCap size={16} />
                      <h4>Student Profile</h4>
                    </div>
                    <Link to="/profile" className="sidebar-edit-pill">
                      <span>Edit</span>
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>

                  <div className="profile-meta-list">
                    <div className="profile-meta-row">
                      <span className="profile-meta-label">
                        <Building size={13} />
                        <span>University:</span>
                      </span>
                      <strong className="profile-meta-val">{user?.college || "Saveetha University"}</strong>
                    </div>

                    <div className="profile-meta-row">
                      <span className="profile-meta-label">
                        <GraduationCap size={13} />
                        <span>Course:</span>
                      </span>
                      <strong className="profile-meta-val">{user?.course || "BCA"} ({user?.educationLevel || "Undergraduate"})</strong>
                    </div>

                    <div className="profile-meta-row">
                      <span className="profile-meta-label">
                        <Calendar size={13} />
                        <span>Current Year:</span>
                      </span>
                      <strong className="profile-meta-val">{user?.currentYear || "3rd Year"}</strong>
                    </div>

                    <div className="profile-meta-row">
                      <span className="profile-meta-label">
                        <Percent size={13} />
                        <span>Academic Score:</span>
                      </span>
                      <strong className="profile-meta-val text-green">{user?.percentage || 85}% Aggregate</strong>
                    </div>

                    <div className="profile-meta-row">
                      <span className="profile-meta-label">
                        <IndianRupee size={13} />
                        <span>Family Income:</span>
                      </span>
                      <strong className="profile-meta-val">{user?.incomeFormatted || "₹2,00,000"}</strong>
                    </div>

                    <div className="profile-meta-row">
                      <span className="profile-meta-label">
                        <MapPin size={13} />
                        <span>Domicile:</span>
                      </span>
                      <strong className="profile-meta-val">{user?.state || "Tamil Nadu"}</strong>
                    </div>

                    <div className="profile-meta-row">
                      <span className="profile-meta-label">
                        <Award size={13} />
                        <span>Category:</span>
                      </span>
                      <strong className="profile-meta-val">{user?.category || "General"}</strong>
                    </div>
                  </div>

                  <Link to="/profile" className="btn-full-profile">
                    <span>Update Profile Parameters</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Direct Benefit Transfer (DBT) Readiness Status */}
                <div className="dash-sidebar-box dbt-readiness-box">
                  <div className="sidebar-box-header">
                    <div className="sidebar-title-badge">
                      <ShieldCheck size={16} />
                      <h4>DBT Disbursal Readiness</h4>
                    </div>
                    <span className="dbt-verified-chip">100% Ready</span>
                  </div>

                  <div className="dbt-status-list">
                    <div className="dbt-status-item">
                      <CheckCircle2 size={16} className="text-green" />
                      <div>
                        <strong>Aadhaar NPCI Seeding</strong>
                        <p>Linked & Active for Direct Bank Transfer</p>
                      </div>
                    </div>

                    <div className="dbt-status-item">
                      <CheckCircle2 size={16} className="text-green" />
                      <div>
                        <strong>NSP One-Time Registration</strong>
                        <p>14-Digit OTR ID Verified</p>
                      </div>
                    </div>

                    <div className="dbt-status-item">
                      <CheckCircle2 size={16} className="text-green" />
                      <div>
                        <strong>Institute Nodal Officer</strong>
                        <p>Saveetha Univ Nodal Verification Active</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Deadlines Widget */}
                <div className="dash-sidebar-box">
                  <div className="sidebar-box-header">
                    <div className="sidebar-title-badge">
                      <Clock size={16} />
                      <h4>Upcoming Deadlines</h4>
                    </div>
                    <span className="urgent-tag">Next 30 Days</span>
                  </div>

                  <div className="deadlines-list">
                    {upcomingDeadlines.map((item) => (
                      <div key={item.id} className="deadline-item">
                        <Clock size={16} className="text-closing" />
                        <div>
                          <Link to={`/scholarships/${item.id}`}>
                            <strong>{item.name}</strong>
                          </Link>
                          <span>Closes: {item.deadline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================
            TAB 2: RECOMMENDED SCHOLARSHIPS
        ========================================= */}
        {activeTab === "recommended" && (
          <div className="dashboard-tab-content">
            <div className="tab-banner">
              <div>
                <h3>Personalized Recommendations ({recommendedCount})</h3>
                <p>
                  These schemes match your course ({user?.course}), academic score ({user?.percentage}%), and income ceiling.
                </p>
              </div>
              <Link to="/eligibility" className="btn-re-check">
                <Sparkles size={16} /> Re-verify Criteria
              </Link>
            </div>

            <div className="dash-recommended-grid">
              {matchingScholarships.map((scholarship) => (
                <div key={scholarship.id} className="dash-scholarship-card">
                  <div className="dash-card-left">
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
                      <div className="dash-scheme-badges">
                        <span className="card-scheme-code">{scholarship.schemeCode || "NSP"}</span>
                        <span className="card-govt-verified"><CheckCircle2 size={11} /> Govt Verified</span>
                        <span className="card-match-pill"><Sparkles size={11} /> 98% Match</span>
                      </div>
                      <Link to={`/scholarships/${scholarship.id}`}>
                        <h4>{scholarship.name}</h4>
                      </Link>
                      <span className="dash-card-provider">{scholarship.provider}</span>
                      <p className="dash-eligibility-preview">{scholarship.eligibility}</p>
                    </div>
                  </div>

                  <div className="dash-card-right">
                    <div className="dash-card-funding">
                      <strong>{scholarship.amount}</strong>
                      <small>Closes {scholarship.deadline}</small>
                    </div>
                    <div className="dash-card-actions">
                      <Link to={`/scholarships/${scholarship.id}`} className="btn-dash-details">
                        View Details
                      </Link>
                      <button
                        onClick={() => applyScholarship(scholarship)}
                        className="btn-dash-apply"
                      >
                        Apply Now ↗
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================
            TAB 3: MY APPLICATIONS TRACKING
        ========================================= */}
        {activeTab === "applications" && (
          <div className="dashboard-tab-content">
            <div className="tab-banner">
              <div>
                <h3>Application Management Pipeline ({applications.length})</h3>
                <p>Track your submitted applications, view review stages, and manage documentation.</p>
              </div>
              <Link to="/scholarships" className="btn-re-check">
                <Plus size={16} /> Apply to New Scheme
              </Link>
            </div>

            <div className="applications-pipeline-container">
              {applications.length === 0 ? (
                <div className="dash-empty-state">
                  <FileText size={40} />
                  <h4>No applications submitted yet</h4>
                  <p>Explore matching scholarships and click "Apply" to simulate application tracking.</p>
                  <Link to="/scholarships" className="btn-primary-dash">
                    Explore Scholarships
                  </Link>
                </div>
              ) : (
                <div className="applications-list-cards">
                  {applications.map((app) => (
                    <div key={app.id} className="app-pipeline-card">
                      <div className="app-pipeline-header">
                        <div>
                          <div className="app-ref-line">
                            <span className="ref-tag">APPLICATION REF:</span>
                            <code>{app.referenceId}</code>
                            <span className="app-date">Submitted on {app.appliedDate}</span>
                          </div>
                          <h3>{app.scholarshipName}</h3>
                        </div>
                        <div className="app-status-badge-container">
                          <span className={`status-pill large ${app.status.toLowerCase().replace(" ", "-")}`}>
                            {app.status === "Approved" && <CheckCircle2 size={16} />}
                            {app.status === "Under Review" && <Clock size={16} />}
                            {app.status === "Applied" && <FileText size={16} />}
                            <span>{app.status}</span>
                          </span>
                        </div>
                      </div>

                      {/* Application Steps Progress Bar */}
                      <div className="app-stepper">
                        <div className="step-point completed">
                          <div className="step-circle"><CheckCircle2 size={14} /></div>
                          <span>1. Submitted</span>
                        </div>
                        <div className={`step-line ${app.status !== "Applied" ? "completed" : ""}`} />
                        <div className={`step-point ${app.status === "Under Review" || app.status === "Approved" ? "completed" : ""}`}>
                          <div className="step-circle"><Clock size={14} /></div>
                          <span>2. Institute Nodal Verification</span>
                        </div>
                        <div className={`step-line ${app.status === "Approved" ? "completed" : ""}`} />
                        <div className={`step-point ${app.status === "Approved" ? "completed" : ""}`}>
                          <div className="step-circle"><Award size={14} /></div>
                          <span>3. Ministry Sanction & DBT</span>
                        </div>
                      </div>

                      <div className="app-card-footer">
                        <div className="app-grant-amount">
                          <span>Sanctioned Grant:</span>
                          <strong>{app.amount}</strong>
                        </div>
                        <Link to={`/scholarships`} className="app-view-link">
                          View Scheme Guidelines ↗
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================
            TAB 4: SAVED SHORTLIST
        ========================================= */}
        {activeTab === "saved" && (
          <div className="dashboard-tab-content">
            <div className="tab-banner">
              <div>
                <h3>Saved Scholarships Shortlist ({savedList.length})</h3>
                <p>Opportunities bookmarked for quick comparison and application before deadlines.</p>
              </div>
              <Link to="/scholarships" className="btn-re-check">
                <Plus size={16} /> Browse More Opportunities
              </Link>
            </div>

            {savedList.length === 0 ? (
              <div className="dash-empty-state">
                <Bookmark size={40} />
                <h4>Your shortlist is empty</h4>
                <p>Click the bookmark icon on any scholarship card to save it here for fast access.</p>
                <Link to="/scholarships" className="btn-primary-dash">
                  Explore Scholarships
                </Link>
              </div>
            ) : (
              <div className="dash-recommended-grid">
                {savedList.map((scholarship) => (
                  <div key={scholarship.id} className="dash-scholarship-card">
                    <div className="dash-card-left">
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
                        <div className="dash-scheme-badges">
                          <span className="card-scheme-code">{scholarship.schemeCode || "NSP"}</span>
                          <span className="card-govt-verified"><CheckCircle2 size={11} /> Govt Verified</span>
                        </div>
                        <Link to={`/scholarships/${scholarship.id}`}>
                          <h4>{scholarship.name}</h4>
                        </Link>
                        <span className="dash-card-provider">{scholarship.provider}</span>
                      </div>
                    </div>

                    <div className="dash-card-right">
                      <div className="dash-card-funding">
                        <strong>{scholarship.amount}</strong>
                        <small>Closes {scholarship.deadline}</small>
                      </div>
                      <div className="dash-card-actions">
                        <button
                          onClick={() => toggleSave(scholarship.id)}
                          className="btn-dash-remove"
                        >
                          Remove
                        </button>
                        <Link to={`/scholarships/${scholarship.id}`} className="btn-dash-details">
                          Details
                        </Link>
                        <button
                          onClick={() => applyScholarship(scholarship)}
                          className="btn-dash-apply"
                        >
                          Apply ↗
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
