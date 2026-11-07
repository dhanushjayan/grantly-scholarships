import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  Building,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import TypewriterHeading from "../components/TypewriterHeading";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    educationLevel: "Undergraduate",
    course: "BCA",
    college: "Saveetha University",
    percentage: 85,
    incomeNumeric: 200000,
    state: "Tamil Nadu",
    category: "General"
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }
    register(formData);
    navigate("/profile");
  };

  return (
    <div className="auth-page-wrapper">
      <motion.div
        className="auth-card-container register-container"
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
            line1="Create Student"
            highlight="Account"
            suffix="."
            tag="h2"
            speed={26}
            initialDelay={100}
          />
          <p>Join thousands of scholars finding genuine funding for their education.</p>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-grid-2">
            <div className="form-group">
              <label>Full Name *</label>
              <div className="input-with-icon">
                <User size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="Hemant Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Student Email Address *</label>
              <div className="input-with-icon">
                <Mail size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="student@saveetha.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Password *</label>
            <div className="input-with-icon">
              <Lock size={18} />
              <input
                type="password"
                name="password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-divider-label">
            <span>Academic Details (Used for Eligibility Matching)</span>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>Education Level</label>
              <select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                className="auth-select"
              >
                <option value="Undergraduate">Undergraduate (UG)</option>
                <option value="Postgraduate">Postgraduate (PG)</option>
                <option value="School">School (Class 9–12)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Current Course / Stream</label>
              <div className="input-with-icon">
                <BookOpen size={18} />
                <input
                  type="text"
                  name="course"
                  placeholder="e.g. BCA, B.Tech, B.Sc"
                  value={formData.course}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label>College / University</label>
              <div className="input-with-icon">
                <Building size={18} />
                <input
                  type="text"
                  name="college"
                  placeholder="Saveetha University"
                  value={formData.college}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Home State / Domicile</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="auth-select"
              >
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Kerala">Kerala</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Delhi">Delhi</option>
                <option value="All India">Other State</option>
              </select>
            </div>
          </div>

          <button type="submit" className="auth-submit-btn">
            <span>Complete Registration & Setup Profile</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="auth-footer-prompt">
          Already have an account?{" "}
          <Link to="/login" className="auth-highlight-link">
            Sign In here
          </Link>
        </div>

        <div className="auth-security-badge">
          <ShieldCheck size={14} />
          <span>Verified Student Verification System</span>
        </div>
      </motion.div>
    </div>
  );
}

