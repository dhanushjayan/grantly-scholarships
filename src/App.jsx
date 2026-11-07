import { useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X } from "lucide-react";

import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Scholarships from "./pages/Scholarships";
import ScholarshipDetails from "./pages/ScholarshipDetails";
import Eligibility from "./pages/Eligibility";
import Dashboard from "./pages/Dashboard";
import ProfileSetup from "./pages/ProfileSetup";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";

// Auto scroll to top on page navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

// Global Toast Renderer connected to AuthContext
function ToastContainer() {
  const { toasts, removeToast } = useAuth();

  return (
    <div className="global-toast-container">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`global-toast-item ${toast.type || "success"}`}
          >
            <div className="toast-icon">
              {toast.type === "info" ? <Info size={18} /> : <CheckCircle2 size={18} />}
            </div>
            <div className="toast-text">{toast.message}</div>
            <button
              className="toast-close"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss toast"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function MainApp() {
  return (
    <div className="app-layout">
      <ScrollToTop />
      <Navbar />

      <main className="app-main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/scholarships/:id" element={<ScholarshipDetails />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfileSetup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Fallback route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </HashRouter>
  );
}
