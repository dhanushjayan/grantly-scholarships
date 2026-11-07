import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import TypewriterHeading from "../components/TypewriterHeading";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    login(email, password);
    navigate(location.state?.from || "/dashboard");
  };

  const handleDemoLogin = () => {
    setEmail("student@saveetha.edu");
    setPassword("hackathon2026");
    login("student@saveetha.edu", "hackathon2026");
    navigate("/dashboard");
  };

  return (
    <div className="auth-page-wrapper">
      <motion.div
        className="auth-card-container"
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Brand Header */}
        <div className="auth-brand-head">
          <Link to="/" className="auth-logo">
            <div className="logo-icon">
              <GraduationCap size={24} color="#ffffff" />
            </div>
            <span>GRANTLY</span>
          </Link>
          <TypewriterHeading
            line1="Welcome"
            highlight="Back"
            suffix="."
            tag="h2"
            speed={28}
            initialDelay={100}
          />
          <p>Access your personalized dashboard, track applications, and verify eligibility.</p>
        </div>

        {/* Demo Credentials Quick Button for Judges */}
        <div className="demo-login-callout">
          <div className="demo-callout-text">
            <Sparkles size={16} />
            <span>Hackathon Quick Access:</span>
          </div>
          <button type="button" onClick={handleDemoLogin} className="demo-autofill-btn">
            ⚡ One-Click Demo Student Login (Saveetha Univ)
          </button>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Student Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} />
              <input
                type="email"
                placeholder="student@saveetha.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="label-with-link">
              <label>Password</label>
              <a href="#forgot" onClick={(e) => e.preventDefault()} className="forgot-link">
                Forgot password?
              </a>
            </div>
            <div className="input-with-icon">
              <Lock size={18} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-submit-btn">
            <span>Sign In to GRANTLY</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-footer-prompt">
          Don't have an account yet?{" "}
          <Link to="/register" className="auth-highlight-link">
            Create Free Account
          </Link>
        </div>

        <div className="auth-security-badge">
          <ShieldCheck size={14} />
          <span>Encrypted Session • NSP Student Privacy Protected</span>
        </div>
      </motion.div>
    </div>
  );
}

