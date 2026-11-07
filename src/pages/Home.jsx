import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Search,
  GraduationCap,
  CalendarDays,
  Bookmark,
  CheckCircle2,
  Sparkles,
  Target,
  FileCheck,
  ShieldCheck,
  Users,
  TrendingUp,
  Globe,
  ArrowUpRight,
  ChevronRight,
  Wallet,
  ExternalLink,
  Award,
  Layers,
  Scale,
  Landmark,
  Clock,
  Zap,
  Info
} from "lucide-react";
import { SCHOLARSHIPS } from "../data/scholarships";
import { useAuth } from "../context/AuthContext";
import TypewriterHeading from "../components/TypewriterHeading";

// 3D Tilt Card
function InteractiveTiltCard({ children }) {
  const cardRef = useRef(null);

  const handlePointerMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const hw = rect.width / 2;
    const hh = rect.height / 2;
    const rawX = (e.clientX - (rect.x + hw)) / hw;
    const rawY = (e.clientY - (rect.y + hh)) / hh;
    const ratioX = Math.max(-1, Math.min(1, rawX));
    const ratioY = Math.max(-1, Math.min(1, rawY));
    card.style.setProperty("--ratio-x", ratioX.toFixed(3));
    card.style.setProperty("--ratio-y", ratioY.toFixed(3));
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--ratio-x", "0");
    card.style.setProperty("--ratio-y", "0");
  };

  return (
    <div
      ref={cardRef}
      className="scholarship-card"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { savedScholarships, toggleSave, showToast } = useAuth();

  const [heroSearch, setHeroSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [compareIds, setCompareIds] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/scholarships?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate("/scholarships");
    }
  };

  const handleFilterClick = (cat) => {
    navigate(`/scholarships?category=${encodeURIComponent(cat)}`);
  };

  const toggleCompare = (id) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter((item) => item !== id));
      showToast("Removed from comparison list.", "info");
    } else {
      if (compareIds.length >= 3) {
        showToast("You can compare up to 3 scholarships at a time.", "info");
        return;
      }
      setCompareIds([...compareIds, id]);
      showToast("Added scheme to side-by-side comparison!");
    }
  };

  const featuredScholarships = SCHOLARSHIPS.slice(0, 6);

  return (
    <div className="home-page">
      {/* =========================================
          HERO SECTION
      ========================================= */}
      <section className="hero" id="home">
        <div className="hero-container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="hero-badge">
              <Sparkles size={15} />
              <span>Making Education Accessible to Everyone</span>
            </div>

            <TypewriterHeading
              line1="Your dreams deserve"
              highlight="funding."
              suffix=" Find it here."
              tag="h1"
              speed={28}
              initialDelay={200}
            />

            <p className="hero-description">
              Discover scholarships that match your academic achievements,
              financial needs, and ambitions. Your journey to a brighter
              future starts with the right opportunity.
            </p>

            {/* Live Search Form connecting to Discovery Page */}
            <form className="hero-search" onSubmit={handleSearchSubmit}>
              <Search size={21} />
              <input
                type="text"
                placeholder="Search scholarships, courses (BCA, B.Tech) or ministries..."
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
              />
              <button type="submit">
                Explore <ArrowRight size={17} />
              </button>
            </form>

            {/* Quick Tag Recommendations */}
            <div className="hero-tags">
              <span>Popular Categories:</span>
              <button type="button" onClick={() => handleFilterClick("Central Govt")}>
                Central Govt
              </button>
              <button type="button" onClick={() => handleFilterClick("Technical (AICTE)")}>
                AICTE Technical
              </button>
              <button type="button" onClick={() => handleFilterClick("Armed Forces & Police")}>
                Armed Forces
              </button>
              <button type="button" onClick={() => handleFilterClick("Social Justice")}>
                Social Justice
              </button>
            </div>
          </motion.div>

          {/* Hero Interactive Preview */}
          <motion.div
            className="hero-preview"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="dashboard-card">
              <div className="dashboard-header">
                <div>
                  <span className="dashboard-small">GRANTLY ENGINE</span>
                  <h3>Saveetha University Scholar 👋</h3>
                </div>
                <div className="dashboard-avatar">H</div>
              </div>

              <div className="dashboard-metric">
                <span className="metric-title">POTENTIAL GRANT MATCH</span>
                <span className="metric-amount">₹2,00,000+</span>
                <span className="metric-highlight">
                  <TrendingUp size={14} /> 12 Active Opportunities
                </span>
              </div>

              <div className="dashboard-info">
                <div className="info-box">
                  <span className="info-label">Eligibility Match</span>
                  <span className="info-value">98% Verified</span>
                </div>
                <div className="info-box">
                  <span className="info-label">Degree Course</span>
                  <span className="info-value">BCA (3rd Year)</span>
                </div>
              </div>

              <div className="hero-card-cta-row">
                <Link to="/eligibility" className="hero-card-check-btn">
                  <Sparkles size={15} />
                  <span>Test Your Eligibility</span>
                </Link>
                <Link to="/scholarships" className="hero-card-view-btn">
                  <span>Explore Schemes</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          STATS COUNTER BAR
      ========================================= */}
      <section className="stats-section">
        <motion.div
          className="stats-container"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="stat-card">
            <h3>5,000+</h3>
            <p>Annual Opportunities</p>
          </div>
          <div className="stat-card">
            <h3>₹500 Cr+</h3>
            <p>Disbursed via DBT</p>
          </div>
          <div className="stat-card">
            <h3>50,000+</h3>
            <p>Scholars Empowered</p>
          </div>
          <div className="stat-card">
            <h3>100%</h3>
            <p>Govt Portal Synchronized</p>
          </div>
        </motion.div>
      </section>

      {/* =========================================
          FEATURED SCHOLARSHIPS SECTION
      ========================================= */}
      <section className="scholarship-section" id="scholarships">
        <div className="scholarship-container">
          <div className="section-heading">
            <div>
              <div className="section-badge">EXPLORE OPPORTUNITIES</div>
              <TypewriterHeading
                line1="Funding your future,"
                highlight="one opportunity"
                suffix=" at a time."
                tag="h2"
                speed={26}
                initialDelay={150}
              />
            </div>
            <p>
              Explore handpicked scholarship opportunities from National Scholarship Portal (NSP)
              designed to support your academic journey.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="scholarship-toolbar">
            <div className="category-pills">
              {[
                "All",
                "Central Govt",
                "Technical (AICTE)",
                "Armed Forces & Police",
                "Social Justice",
              ].map((category) => (
                <button
                  key={category}
                  className={`category-pill ${activeCategory === category ? "active" : ""}`}
                  onClick={() => {
                    setActiveCategory(category);
                    if (category !== "All") {
                      navigate(`/scholarships?category=${encodeURIComponent(category)}`);
                    }
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            <Link to="/scholarships" className="explore-all-link">
              <span>View All 14 Schemes</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="scholarship-grid">
            {featuredScholarships.map((scholarship, index) => {
              const isSaved = savedScholarships.includes(scholarship.id);
              const isCompared = compareIds.includes(scholarship.id);

              return (
                <motion.div
                  key={scholarship.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                  style={{ height: "100%", display: "flex", flexDirection: "column" }}
                >
                  <InteractiveTiltCard>
                    <div className="card-top-accent" />

                    {/* Thematic Low-Opacity Background */}
                    <div className="card-thematic-backdrop" aria-hidden="true">
                      {scholarship.bgImage && (
                        <div
                          className="card-thematic-image"
                          style={{ backgroundImage: `url(${scholarship.bgImage})` }}
                        />
                      )}
                      <div className="card-thematic-overlay" />
                      <div className="card-thematic-watermark">
                        {scholarship.category === "Technical (AICTE)" ? (
                          <Zap size={145} strokeWidth={1.1} />
                        ) : scholarship.category === "Armed Forces & Police" ? (
                          <ShieldCheck size={145} strokeWidth={1.1} />
                        ) : scholarship.category === "Social Justice" ? (
                          <Award size={145} strokeWidth={1.1} />
                        ) : (
                          <Landmark size={145} strokeWidth={1.1} />
                        )}
                      </div>
                    </div>

                    {/* Clean Relaxed Top Row: Icon Badge + Code + Match & Bookmark */}
                    <div className="card-top">
                      <div className="card-top-left">
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
                        <div className="card-scheme-info">
                          <span className="card-scheme-code">{scholarship.schemeCode || "NSP"}</span>
                          <span className="card-govt-verified">
                            <CheckCircle2 size={11} /> Govt Verified
                          </span>
                        </div>
                      </div>

                      <div className="card-top-actions">
                        <span className="card-match-pill" title="AI Match Rate">
                          <Sparkles size={11} /> {scholarship.matchRate}
                        </span>

                        <button
                          className={`bookmark-btn ${isSaved ? "saved" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSave(scholarship.id);
                          }}
                          aria-label="Save scholarship"
                          title={isSaved ? "Saved" : "Save"}
                        >
                          <Bookmark size={15} fill={isSaved ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>

                    {/* Category & Level Badges */}
                    <div className="card-category-row">
                      <span className="scholarship-category">{scholarship.category}</span>
                      <span className="scholarship-level-chip">{scholarship.educationLevel}</span>
                    </div>

                    {/* Title & Ministry */}
                    <div className="card-title-group">
                      <Link to={`/scholarships/${scholarship.id}`} className="clickable-title">
                        <h3>{scholarship.name}</h3>
                      </Link>
                      <p className="scholarship-provider">
                        <Landmark size={12} className="provider-icon" />
                        <span>{scholarship.provider}</span>
                      </p>
                    </div>

                    {/* Funding Support Box */}
                    <div className="card-funding-box">
                      <div className="funding-box-header">
                        <span className="funding-box-label">GRANT SUPPORT</span>
                        <span className="dbt-pill">Direct Bank Transfer</span>
                      </div>
                      <div className="funding-box-amount">
                        <h2>{scholarship.amount}</h2>
                      </div>
                    </div>

                    {/* Footer: Deadline & Action Buttons */}
                    <div className="scholarship-footer">
                      <div className="card-deadline">
                        <Clock size={13} />
                        <span>Closes {scholarship.deadline}</span>
                      </div>

                      <div className="card-footer-actions">
                        <button
                          className={`card-compare-pill-btn ${isCompared ? "active" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCompare(scholarship.id);
                          }}
                          title={isCompared ? "Remove from comparison" : "Compare side-by-side"}
                        >
                          <Scale size={12} />
                          <span>{isCompared ? "Comparing" : "Compare"}</span>
                        </button>

                        <Link to={`/scholarships/${scholarship.id}`} className="card-cta-btn">
                          <span>Details</span>
                          <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </InteractiveTiltCard>
                </motion.div>
              );
            })}
          </div>

          <div className="view-all-container">
            <Link to="/scholarships" className="view-all-btn">
              <span>Explore Complete Scholarship Directory</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================
          HOW IT WORKS SECTION
      ========================================= */}
      <section className="how-it-works" id="how-it-works">
        <div className="how-container">
          <motion.div
            className="center-heading"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-badge">SIMPLE. SMART. SEAMLESS.</div>
            <TypewriterHeading
              line1="Your scholarship journey,"
              highlight="made effortless."
              suffix=""
              tag="h2"
              speed={28}
              initialDelay={150}
            />
            <p>Finding financial assistance shouldn't be complicated. We make the entire journey simple.</p>
          </motion.div>

          <div className="steps-grid">
            {[
              {
                icon: <Search size={24} />,
                step: "STEP 01",
                title: "Discover & Filter",
                desc: "Explore verified central and state government schemes matching your course and domicile."
              },
              {
                icon: <Sparkles size={24} />,
                step: "STEP 02",
                title: "Check Eligibility",
                desc: "Input your academic marks, family income, and college to check your criteria deterministically."
              },
              {
                icon: <GraduationCap size={24} />,
                step: "STEP 03",
                title: "Apply & Track",
                desc: "Follow step-by-step NSP OTR guidance, submit documents, and monitor application milestones."
              }
            ].map((st, i) => (
              <motion.div
                key={st.step}
                className="step-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                <div className="step-icon">{st.icon}</div>
                <span className="step-number">{st.step}</span>
                <h3>{st.title}</h3>
                <p>{st.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          WHY GRANTLY SECTION (Clean 2-Column Format)
      ========================================= */}
      <section className="features-section" id="why-us">
        <div className="features-container">
          <div className="features-layout">
            <motion.div
              className="features-intro"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="section-badge">WHY GRANTLY?</div>
              <TypewriterHeading
                line1="More than a search."
                highlight="A smarter way forward."
                suffix=""
                tag="h2"
                speed={26}
                initialDelay={150}
              />
              <p>
                We bring scholarship discovery, eligibility checking, and application
                management together in one place. Spend less time searching and more time achieving.
              </p>
              <Link to="/register" className="features-btn">
                <span>Start Your Journey</span>
                <ArrowUpRight size={18} />
              </Link>
            </motion.div>

            <div className="features-grid">
              {[
                {
                  icon: <ShieldCheck size={22} />,
                  title: "100% Verified Schemes",
                  desc: "All listings synchronize with official gazettes and scholarships.gov.in notices."
                },
                {
                  icon: <Sparkles size={22} />,
                  title: "Deterministic Matching",
                  desc: "Clear explanations of why you qualify or what requirements are missing."
                },
                {
                  icon: <Clock size={22} />,
                  title: "Deadline Protection",
                  desc: "Never miss a closing date with intelligent countdown reminders."
                },
                {
                  icon: <Award size={22} />,
                  title: "Direct Bank Transfer",
                  desc: "Guidance for Aadhaar NPCI seeding so grant funds disburse straight to your bank."
                }
              ].map((feat, i) => (
                <motion.div
                  key={feat.title}
                  className="feature-card"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="feature-icon">{feat.icon}</div>
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          FINAL CALL TO ACTION
      ========================================= */}
      <section className="cta-section">
        <div className="cta-container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-badge light">YOUR FUTURE STARTS HERE</div>
            <TypewriterHeading
              line1="Don't let finances"
              highlight="limit your dreams."
              suffix=""
              tag="h2"
              speed={28}
              initialDelay={150}
            />
            <p>
              The right opportunity could change everything. Discover scholarships
              and take your first step today.
            </p>
            <Link to="/scholarships" className="cta-btn">
              <span>Find My Scholarship</span>
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          FLOATING COMPARISON DRAWER
      ========================================= */}
      <AnimatePresence>
        {compareIds.length > 0 && (
          <motion.div
            className="compare-drawer"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
          >
            <div className="compare-drawer-inner">
              <div className="compare-drawer-left">
                <Scale size={20} />
                <div>
                  <strong>Side-by-Side Comparison</strong>
                  <span>{compareIds.length} of 3 scholarships selected</span>
                </div>
              </div>

              <div className="compare-chips">
                {compareIds.map((id) => {
                  const s = SCHOLARSHIPS.find((x) => x.id === id);
                  return (
                    <div key={id} className="compare-chip">
                      <span>{s?.name?.slice(0, 24)}...</span>
                      <button onClick={() => toggleCompare(id)}>✕</button>
                    </div>
                  );
                })}
              </div>

              <div className="compare-actions">
                <button onClick={() => setCompareIds([])} className="compare-clear-btn">
                  Clear
                </button>
                <Link to="/scholarships" className="compare-proceed-btn">
                  View Full Directory
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

