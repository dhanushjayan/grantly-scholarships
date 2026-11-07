import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  GraduationCap,
  Building,
  MapPin,
  Percent,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import TypewriterHeading from "../components/TypewriterHeading";

export default function ProfileSetup() {
  const { user, updateProfile, showToast } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "Hemant Kumar",
    email: user?.email || "student@saveetha.edu",
    educationLevel: user?.educationLevel || "Undergraduate",
    course: user?.course || "BCA",
    college: user?.college || "Saveetha University",
    currentYear: user?.currentYear || "3rd Year",
    state: user?.state || "Tamil Nadu",
    percentage: user?.percentage || 85,
    incomeNumeric: user?.incomeNumeric || 200000,
    category: user?.category || "General",
    gender: user?.gender || "Male"
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile({
      ...formData,
      percentage: parseFloat(formData.percentage) || 80,
      incomeNumeric: parseFloat(formData.incomeNumeric) || 200000,
      incomeFormatted: `₹${parseFloat(formData.incomeNumeric || 200000).toLocaleString("en-IN")}`
    });
    showToast("Profile saved! Your eligibility scores have been recalculated.");
  };

  return (
    <div className="profile-page-wrapper">
      <div className="profile-container">
        {/* Header */}
        <motion.div
          className="profile-header-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="profile-avatar-large">
            {formData.name.charAt(0).toUpperCase()}
          </div>
          <div className="profile-header-info">
            <div className="profile-badges-row">
              <span className="profile-status-badge">
                <CheckCircle2 size={13} /> Active Student Profile
              </span>
              <span className="profile-univ-badge">{formData.college}</span>
            </div>
            <TypewriterHeading
              line1=""
              highlight={formData.name}
              suffix=""
              tag="h2"
              speed={28}
              initialDelay={100}
            />
            <p className="profile-subtitle">
              {formData.course} • {formData.educationLevel} ({formData.currentYear}) • {formData.state}
            </p>
          </div>
          <div className="profile-action-box">
            <Link to="/eligibility" className="profile-check-cta">
              <Sparkles size={16} />
              <span>Test Eligibility With This Profile</span>
            </Link>
          </div>
        </motion.div>

        {/* Profile Edit Form */}
        <div className="profile-card">
          <div className="profile-section-title">
            <GraduationCap size={20} />
            <div>
              <h3>Academic & Financial Information</h3>
              <p>GRANTLY uses these values to calculate real eligibility across NSP schemes.</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="profile-form">
            <div className="form-grid-3">
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <User size={16} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>College / University</label>
                <div className="input-with-icon">
                  <Building size={16} />
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Current Course</label>
                <div className="input-with-icon">
                  <BookOpen size={16} />
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    placeholder="e.g. BCA, B.Tech, B.Sc"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-grid-3">
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
                <label>Current Year of Study</label>
                <select
                  name="currentYear"
                  value={formData.currentYear}
                  onChange={handleChange}
                  className="auth-select"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="5th Year">5th Year (Integrated)</option>
                </select>
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

            <div className="form-grid-3">
              <div className="form-group">
                <label>Academic Percentage (Score %)</label>
                <div className="input-with-icon">
                  <Percent size={16} />
                  <input
                    type="number"
                    name="percentage"
                    min="35"
                    max="100"
                    step="0.1"
                    value={formData.percentage}
                    onChange={handleChange}
                    required
                  />
                </div>
                <small className="field-hint">e.g. Class 12th Board or latest CGPA %</small>
              </div>

              <div className="form-group">
                <label>Annual Gross Family Income (₹)</label>
                <div className="input-with-icon">
                  <IndianRupee size={16} />
                  <input
                    type="number"
                    name="incomeNumeric"
                    min="0"
                    step="10000"
                    value={formData.incomeNumeric}
                    onChange={handleChange}
                    required
                  />
                </div>
                <small className="field-hint">
                  Current: ₹{parseFloat(formData.incomeNumeric || 0).toLocaleString("en-IN")} / yr
                </small>
              </div>

              <div className="form-group">
                <label>Social / Reservation Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="auth-select"
                >
                  <option value="General">General / Open</option>
                  <option value="EWS">Economically Weaker Section (EWS)</option>
                  <option value="OBC">Other Backward Class (OBC)</option>
                  <option value="SC">Scheduled Caste (SC)</option>
                  <option value="ST">Scheduled Tribe (ST)</option>
                  <option value="Minority">Notified Religious Minority</option>
                  <option value="Differently-Abled (PwD)">Differently-Abled (PwD ≥ 40%)</option>
                  <option value="Armed Forces / Police Ward">Armed Forces / Police Ward</option>
                </select>
              </div>
            </div>

            <div className="profile-form-footer">
              <button type="submit" className="profile-save-btn">
                <span>Save Student Profile</span>
                <CheckCircle2 size={18} />
              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="profile-cancel-btn"
              >
                Go to Dashboard ↗
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

