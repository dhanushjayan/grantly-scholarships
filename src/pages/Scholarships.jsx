import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  X,
  Bookmark,
  Clock,
  Landmark,
  Zap,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  SlidersHorizontal,
  ChevronDown,
  Info,
  Check
} from "lucide-react";
import { SCHOLARSHIPS } from "../data/scholarships";
import { useAuth } from "../context/AuthContext";
import TypewriterHeading from "../components/TypewriterHeading";

// Interactive 3D physical tilt card component
function TiltScholarshipCard({ children, className = "" }) {
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
      className={`scholarship-card ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </div>
  );
}

export default function Scholarships() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { savedScholarships, toggleSave } = useAuth();

  // Search query & filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [educationLevel, setEducationLevel] = useState(searchParams.get("level") || "All");
  const [scholarshipType, setScholarshipType] = useState(searchParams.get("type") || "All");
  const [stateFilter, setStateFilter] = useState(searchParams.get("state") || "All");
  const [amountRange, setAmountRange] = useState(searchParams.get("amount") || "All");
  const [statusFilter, setStatusFilter] = useState(searchParams.get("status") || "All");
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "All");
  const [sortBy, setSortBy] = useState("recommended");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync with URL params
  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null && q !== searchQuery) setSearchQuery(q);
    const cat = searchParams.get("category");
    if (cat !== null && cat !== categoryFilter) setCategoryFilter(cat);
  }, [searchParams]);

  const activeFiltersCount = [
    educationLevel !== "All",
    scholarshipType !== "All",
    stateFilter !== "All",
    amountRange !== "All",
    statusFilter !== "All",
    categoryFilter !== "All",
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSearchQuery("");
    setEducationLevel("All");
    setScholarshipType("All");
    setStateFilter("All");
    setAmountRange("All");
    setStatusFilter("All");
    setCategoryFilter("All");
    setSortBy("recommended");
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredScholarships = useMemo(() => {
    return SCHOLARSHIPS.filter((s) => {
      // 1. Text Search (Name, Provider, Category, Course, SchemeCode)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = s.name.toLowerCase().includes(query);
        const matchesProvider = s.provider.toLowerCase().includes(query);
        const matchesCategory = s.category.toLowerCase().includes(query);
        const matchesCode = (s.schemeCode || "").toLowerCase().includes(query);
        const matchesCourse = (s.courses || []).some((c) =>
          c.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesProvider && !matchesCategory && !matchesCode && !matchesCourse) {
          return false;
        }
      }

      // 2. Education Level
      if (educationLevel !== "All") {
        if (s.educationLevel.toLowerCase() !== educationLevel.toLowerCase()) {
          return false;
        }
      }

      // 3. Scholarship Type
      if (scholarshipType !== "All") {
        if (s.type.toLowerCase() !== scholarshipType.toLowerCase()) {
          return false;
        }
      }

      // 4. State
      if (stateFilter !== "All") {
        if (s.state !== "All India" && !s.state.includes(stateFilter)) {
          return false;
        }
      }

      // 5. Amount Range
      if (amountRange !== "All") {
        const amt = s.amountNumeric;
        if (amountRange === "under25k" && amt > 25000) return false;
        if (amountRange === "25k-50k" && (amt < 25000 || amt > 50000)) return false;
        if (amountRange === "50k-100k" && (amt < 50000 || amt > 100000)) return false;
        if (amountRange === "above100k" && amt < 100000) return false;
      }

      // 6. Application Status
      if (statusFilter !== "All") {
        if (s.status.toLowerCase() !== statusFilter.toLowerCase()) {
          return false;
        }
      }

      // 7. Category Filter
      if (categoryFilter !== "All") {
        if (!s.category.toLowerCase().includes(categoryFilter.toLowerCase())) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "highestAmount") {
        return b.amountNumeric - a.amountNumeric;
      }
      if (sortBy === "deadline") {
        return a.deadline.localeCompare(b.deadline);
      }
      if (sortBy === "alphabetical") {
        return a.name.localeCompare(b.name);
      }
      // "recommended" (default): verified schemes first, then higher amounts
      if (a.isDemo !== b.isDemo) {
        return a.isDemo ? 1 : -1;
      }
      return b.amountNumeric - a.amountNumeric;
    });
  }, [
    searchQuery,
    educationLevel,
    scholarshipType,
    stateFilter,
    amountRange,
    statusFilter,
    categoryFilter,
    sortBy,
  ]);

  return (
    <div className="discovery-page">
      {/* Page Header */}
      <div className="discovery-header-section">
        <motion.div
          className="discovery-header-container"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="discovery-badge">
            <Sparkles size={14} />
            <span>National Scholarship Portal & Verified Trusts</span>
          </div>
          <TypewriterHeading
            line1="Explore"
            highlight="Scholarships"
            suffix="."
            tag="h1"
            speed={28}
            initialDelay={100}
          />
          <p>
            Filter by education level, funding amount, eligibility requirements,
            and domicile state to unlock the opportunities meant for you.
          </p>
        </motion.div>
      </div>

      <div className="discovery-main-layout">
        {/* =========================================
            LEFT SIDEBAR: ADVANCED FILTERS
        ========================================= */}
        <aside className={`discovery-sidebar ${mobileFilterOpen ? "mobile-open" : ""}`}>
          <div className="sidebar-header">
            <div className="sidebar-title">
              <SlidersHorizontal size={18} />
              <span>Advanced Filters</span>
            </div>
            {activeFiltersCount > 0 && (
              <button onClick={resetFilters} className="clear-filters-btn">
                Reset All ({activeFiltersCount})
              </button>
            )}
            <button
              className="sidebar-close-btn"
              onClick={() => setMobileFilterOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div className="sidebar-scrollable">
            {/* Filter: Category */}
            <div className="filter-group">
              <label className="filter-title">Scholarship Category</label>
              <div className="filter-options-stack">
                {[
                  "All",
                  "Central Govt",
                  "Technical (AICTE)",
                  "Armed Forces & Police",
                  "Social Justice",
                  "Private / CSR",
                  "State Govt"
                ].map((cat) => (
                  <button
                    key={cat}
                    className={`filter-chip ${categoryFilter === cat ? "active" : ""}`}
                    onClick={() => setCategoryFilter(cat)}
                  >
                    <span>{cat}</span>
                    {categoryFilter === cat && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter: Education Level */}
            <div className="filter-group">
              <label className="filter-title">Education Level</label>
              <div className="filter-options-stack">
                {["All", "School", "Undergraduate", "Postgraduate"].map((level) => (
                  <button
                    key={level}
                    className={`filter-chip ${educationLevel === level ? "active" : ""}`}
                    onClick={() => setEducationLevel(level)}
                  >
                    <span>{level}</span>
                    {educationLevel === level && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter: Scholarship Type */}
            <div className="filter-group">
              <label className="filter-title">Scholarship Type</label>
              <div className="filter-options-stack">
                {["All", "Merit-based", "Need-based", "Government", "Private"].map((type) => (
                  <button
                    key={type}
                    className={`filter-chip ${scholarshipType === type ? "active" : ""}`}
                    onClick={() => setScholarshipType(type)}
                  >
                    <span>{type}</span>
                    {scholarshipType === type && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter: Domicile State */}
            <div className="filter-group">
              <label className="filter-title">State / Domicile</label>
              <div className="filter-options-stack">
                {["All", "Tamil Nadu", "Kerala", "Karnataka", "Maharashtra"].map((st) => (
                  <button
                    key={st}
                    className={`filter-chip ${stateFilter === st ? "active" : ""}`}
                    onClick={() => setStateFilter(st)}
                  >
                    <span>{st === "All" ? "All India & State Schemes" : st}</span>
                    {stateFilter === st && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter: Funding Amount Range */}
            <div className="filter-group">
              <label className="filter-title">Funding Amount</label>
              <div className="filter-options-stack">
                {[
                  { id: "All", label: "Any Amount" },
                  { id: "under25k", label: "Up to ₹25,000 / yr" },
                  { id: "25k-50k", label: "₹25,000 – ₹50,000 / yr" },
                  { id: "50k-100k", label: "₹50,000 – ₹1,00,000 / yr" },
                  { id: "above100k", label: "Above ₹1,00,000 / yr" }
                ].map((item) => (
                  <button
                    key={item.id}
                    className={`filter-chip ${amountRange === item.id ? "active" : ""}`}
                    onClick={() => setAmountRange(item.id)}
                  >
                    <span>{item.label}</span>
                    {amountRange === item.id && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter: Application Status */}
            <div className="filter-group">
              <label className="filter-title">Application Status</label>
              <div className="filter-options-stack">
                {[
                  { id: "All", label: "All Schemes" },
                  { id: "Open", label: "🟢 Open Now" },
                  { id: "Closing Soon", label: "⏳ Closing Soon (Next 14 Days)" }
                ].map((item) => (
                  <button
                    key={item.id}
                    className={`filter-chip ${statusFilter === item.id ? "active" : ""}`}
                    onClick={() => setStatusFilter(item.id)}
                  >
                    <span>{item.label}</span>
                    {statusFilter === item.id && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* =========================================
            RIGHT MAIN: SEARCH BAR, SORT & 3-COL GRID
        ========================================= */}
        <main className="discovery-content">
          {/* Top Control Bar */}
          <div className="discovery-top-bar">
            {/* Search Input */}
            <div className="discovery-search-box">
              <Search size={18} className="search-icon-svg" />
              <input
                type="text"
                placeholder="Search by scholarship, course (e.g. BCA), ministry, or scheme code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="search-clear-btn"
                  onClick={() => setSearchQuery("")}
                  title="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Sorting & Mobile Filter Toggle */}
            <div className="discovery-controls-right">
              <button
                className="mobile-filter-trigger"
                onClick={() => setMobileFilterOpen(true)}
              >
                <Filter size={16} />
                <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
              </button>

              <div className="sort-dropdown-box">
                <span className="sort-label">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="recommended">⭐ Recommended</option>
                  <option value="highestAmount">💰 Highest Funding</option>
                  <option value="deadline">⏳ Closing Soonest</option>
                  <option value="alphabetical">🔤 Scheme Name (A–Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Result Counter & Active Filter Pills */}
          <div className="discovery-status-row">
            <div className="results-count-text">
              Showing <strong>{filteredScholarships.length}</strong> of {SCHOLARSHIPS.length} scholarships
            </div>

            {activeFiltersCount > 0 && (
              <div className="active-filters-summary">
                <span>Active Filters:</span>
                {categoryFilter !== "All" && (
                  <span className="summary-pill">
                    {categoryFilter}{" "}
                    <X size={12} onClick={() => setCategoryFilter("All")} />
                  </span>
                )}
                {educationLevel !== "All" && (
                  <span className="summary-pill">
                    {educationLevel}{" "}
                    <X size={12} onClick={() => setEducationLevel("All")} />
                  </span>
                )}
                {scholarshipType !== "All" && (
                  <span className="summary-pill">
                    {scholarshipType}{" "}
                    <X size={12} onClick={() => setScholarshipType("All")} />
                  </span>
                )}
                {stateFilter !== "All" && (
                  <span className="summary-pill">
                    State: {stateFilter}{" "}
                    <X size={12} onClick={() => setStateFilter("All")} />
                  </span>
                )}
                {amountRange !== "All" && (
                  <span className="summary-pill">
                    Amount: {amountRange}{" "}
                    <X size={12} onClick={() => setAmountRange("All")} />
                  </span>
                )}
                {statusFilter !== "All" && (
                  <span className="summary-pill">
                    Status: {statusFilter}{" "}
                    <X size={12} onClick={() => setStatusFilter("All")} />
                  </span>
                )}
                <button onClick={resetFilters} className="reset-inline-btn">
                  Clear All
                </button>
              </div>
            )}
          </div>

          {/* =========================================
              3-COLUMN SCHOLARSHIP CARDS GRID
          ========================================= */}
          <div className="discovery-cards-grid">
            {filteredScholarships.map((scholarship, index) => {
              const isSaved = savedScholarships.includes(scholarship.id);

              return (
                <motion.div
                  key={scholarship.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: (index % 6) * 0.05 }}
                  style={{ display: "flex", flexDirection: "column", height: "100%" }}
                >
                  <TiltScholarshipCard>
                    {/* Subtle top accent bar */}
                    <div className="card-top-accent" />

                    {/* Thematic Low-Opacity Background related to the scheme */}
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

                    {/* Header: Institutional Icon Badge + Scheme Info & Match + Actions */}
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
                          {scholarship.isDemo ? (
                            <span className="card-demo-verified">
                              <Info size={11} /> Demo Record
                            </span>
                          ) : (
                            <span className="card-govt-verified">
                              <CheckCircle2 size={11} /> Govt Verified
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="card-top-actions">
                        {scholarship.matchRate && (
                          <span className="card-match-pill" title="AI Match Rate">
                            <Sparkles size={11} /> {scholarship.matchRate}
                          </span>
                        )}

                        <button
                          className={`bookmark-btn ${isSaved ? "saved" : ""}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSave(scholarship.id);
                          }}
                          aria-label="Save scholarship"
                          title={isSaved ? "Saved in Shortlist" : "Save to Shortlist"}
                        >
                          <Bookmark
                            size={15}
                            fill={isSaved ? "currentColor" : "none"}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Category & Education Level Chips */}
                    <div className="card-category-row">
                      <span className="scholarship-category">{scholarship.category}</span>
                      <span className="scholarship-level-chip">{scholarship.educationLevel}</span>
                      {scholarship.status === "Closing Soon" && (
                        <span className="card-closing-pill">⏳ Closing Soon</span>
                      )}
                    </div>

                    {/* Title & Ministry */}
                    <div className="card-title-group">
                      <Link
                        to={`/scholarships/${scholarship.id}`}
                        className="clickable-title-link"
                        title="View complete scholarship details"
                      >
                        <h3>{scholarship.name}</h3>
                      </Link>
                      <p className="scholarship-provider">
                        <Landmark size={12} className="provider-icon" />
                        <span>{scholarship.provider}</span>
                      </p>
                    </div>

                    {/* Eligibility Brief Requirements Box */}
                    <div className="card-eligibility-summary">
                      <span className="eligibility-title-mini">CRITERIA:</span>
                      <p>{scholarship.eligibility}</p>
                    </div>

                    {/* Dedicated Funding Box */}
                    <div className="card-funding-box">
                      <div className="funding-box-header">
                        <span className="funding-box-label">GRANT DISBURSAL</span>
                        <span className="dbt-pill">Direct Bank Transfer</span>
                      </div>
                      <div className="funding-box-amount">
                        <h2>{scholarship.amount}</h2>
                      </div>
                    </div>

                    {/* Card Footer: Deadline + Actions */}
                    <div className="scholarship-footer">
                      <div className="card-deadline">
                        <Clock size={13} />
                        <span>Closes {scholarship.deadline}</span>
                      </div>

                      <div className="card-action-buttons">
                        <Link
                          to={`/scholarships/${scholarship.id}`}
                          className="card-cta-btn"
                        >
                          <span>Details</span>
                          <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </TiltScholarshipCard>
                </motion.div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredScholarships.length === 0 && (
            <div className="discovery-empty-state">
              <Search size={40} className="empty-search-icon" />
              <h3>No scholarships match your filters</h3>
              <p>
                Try broadening your criteria, searching with a different keyword, or
                resetting applied filters.
              </p>
              <button onClick={resetFilters} className="empty-reset-btn">
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

