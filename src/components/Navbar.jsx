import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Bookmark,
  User,
  LogOut,
  Menu,
  X,
  Sparkles,
  Compass,
  CheckCircle2,
  LayoutDashboard,
  ArrowUpRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, savedScholarships } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Brand Logo */}
        <Link to="/" className="logo">
          <div className="logo-icon">
            <GraduationCap size={22} color="#ffffff" />
          </div>
          <span>GRANTLY</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="nav-links">
          <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
            Home
          </Link>
          <Link
            to="/scholarships"
            className={`nav-link ${isActive("/scholarships") ? "active" : ""}`}
          >
            <Compass size={15} />
            Explore Scholarships
          </Link>
          <Link
            to="/eligibility"
            className={`nav-link ${isActive("/eligibility") ? "active" : ""}`}
          >
            <CheckCircle2 size={15} />
            Eligibility Checker
          </Link>
          <Link
            to="/dashboard"
            className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
          >
            <LayoutDashboard size={15} />
            Dashboard
          </Link>
        </div>

        {/* Right CTA / Auth controls */}
        <div className="nav-actions">
          {/* Saved Shortlist Shortcut */}
          <Link
            to="/dashboard?tab=saved"
            className="nav-saved-btn"
            title="Saved Scholarships"
          >
            <Bookmark size={16} />
            {savedScholarships.length > 0 && (
              <span className="saved-count-pill">{savedScholarships.length}</span>
            )}
          </Link>

          {user ? (
            <div className="nav-user-dropdown">
              <Link to="/profile" className="nav-user-pill" title="View & Edit Student Profile">
                <div className="user-avatar-mini">{user.avatar || "S"}</div>
                <div className="user-info-mini">
                  <span className="user-name-mini">{user.name.split(" ")[0]}</span>
                  <span className="user-course-mini">{user.course || "Student"}</span>
                </div>
              </Link>
              <button
                onClick={logout}
                className="nav-logout-btn"
                title="Sign Out"
                aria-label="Sign out"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <div className="nav-auth-buttons">
              <Link to="/login" className="nav-login-btn">
                Log In
              </Link>
              <Link to="/register" className="nav-register-btn">
                <span>Get Started</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`mobile-nav-link ${isActive("/") ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/scholarships"
            onClick={() => setMobileMenuOpen(false)}
            className={`mobile-nav-link ${isActive("/scholarships") ? "active" : ""}`}
          >
            Explore Scholarships
          </Link>
          <Link
            to="/eligibility"
            onClick={() => setMobileMenuOpen(false)}
            className={`mobile-nav-link ${isActive("/eligibility") ? "active" : ""}`}
          >
            Eligibility Checker
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className={`mobile-nav-link ${isActive("/dashboard") ? "active" : ""}`}
          >
            Student Dashboard
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-nav-link"
              >
                My Profile ({user.name})
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="mobile-nav-link text-red"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="mobile-auth-group">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-auth-login"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-auth-register"
              >
                Get Started Free
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
