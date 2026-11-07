import { Link } from "react-router-dom";
import { GraduationCap, ShieldCheck, ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          {/* Brand Info Column */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="logo-icon">
                <GraduationCap size={22} color="#ffffff" />
              </div>
              <span>GRANTLY</span>
            </Link>

            <p className="footer-brand-desc">
              Empowering students across India to discover, verify, and track genuine
              scholarships from the National Scholarship Portal (NSP) and verified trusts.
            </p>

            <div className="footer-verified-badge">
              <ShieldCheck size={16} />
              <span>National Scholarship Portal Verified Opportunities</span>
            </div>
          </div>

          {/* 3 Balanced Navigation Columns */}
          <div className="footer-links">
            <div className="footer-col">
              <h4>Platform</h4>
              <Link to="/scholarships">Explore Scholarships</Link>
              <Link to="/eligibility">Eligibility Checker</Link>
              <Link to="/dashboard">Student Dashboard</Link>
              <Link to="/dashboard?tab=saved">Saved Opportunities</Link>
            </div>

            <div className="footer-col">
              <h4>Official Schemes</h4>
              <Link to="/scholarships?category=Central+Govt">Central Govt Schemes</Link>
              <Link to="/scholarships?category=Technical+(AICTE)">AICTE Technical Grants</Link>
              <Link to="/scholarships?category=Social+Justice">Social Justice & Empowerment</Link>
              <Link to="/scholarships?category=Armed+Forces+&+Police">Defence & Police Wards</Link>
            </div>

            <div className="footer-col">
              <h4>Official Portals</h4>
              <a href="https://scholarships.gov.in/" target="_blank" rel="noopener noreferrer">
                NSP Official Portal <ExternalLink size={12} />
              </a>
              <a href="https://www.aicte-india.org/" target="_blank" rel="noopener noreferrer">
                AICTE India <ExternalLink size={12} />
              </a>
              <a href="https://socialjustice.gov.in/" target="_blank" rel="noopener noreferrer">
                Ministry of Social Justice <ExternalLink size={12} />
              </a>
              <a href="https://tribal.nic.in/" target="_blank" rel="noopener noreferrer">
                Ministry of Tribal Affairs <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Horizontal Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} GRANTLY Inc. Built for Student Opportunity Hackathon.</p>
          <div className="footer-bottom-right">
            <ShieldCheck size={14} />
            <span>Official Government Portal Data Synchronized</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
