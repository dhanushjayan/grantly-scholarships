import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const DEFAULT_DEMO_USER = {
  id: "student-saveetha-01",
  name: "Hemant Kumar",
  email: "student@saveetha.edu",
  educationLevel: "Undergraduate",
  course: "BCA",
  college: "Saveetha University",
  currentYear: "3rd Year",
  state: "Tamil Nadu",
  percentage: 85,
  incomeNumeric: 200000,
  incomeFormatted: "₹2,00,000",
  category: "General",
  gender: "Male",
  avatar: "H",
  isProfileComplete: true,
};

const DEFAULT_SAVED_IDS = [
  "pm-usp-csss",
  "tn-cm-merit-demo"
];

const DEFAULT_APPLICATIONS = [
  {
    id: "app-101",
    scholarshipId: "pm-usp-csss",
    scholarshipName: "PM-USP Central Sector Scheme of Scholarship (CSSS)",
    amount: "₹20,000 / yr",
    appliedDate: "12 Oct 2026",
    status: "Under Review",
    referenceId: "NSP-2026-94812",
    documentsAttached: 4
  },
  {
    id: "app-102",
    scholarshipId: "tn-cm-merit-demo",
    scholarshipName: "Tamil Nadu Chief Minister Higher Education Fellowship (Demo)",
    amount: "₹60,000 / yr",
    appliedDate: "28 Oct 2026",
    status: "Approved",
    referenceId: "TN-GOV-77124",
    documentsAttached: 3
  }
];

export function AuthProvider({ children }) {
  // 1. User state with localStorage fallback
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("grantly_user");
      return stored ? JSON.parse(stored) : DEFAULT_DEMO_USER;
    } catch {
      return DEFAULT_DEMO_USER;
    }
  });

  // 2. Saved scholarships with localStorage fallback
  const [savedScholarships, setSavedScholarships] = useState(() => {
    try {
      const stored = localStorage.getItem("grantly_saved");
      return stored ? JSON.parse(stored) : DEFAULT_SAVED_IDS;
    } catch {
      return DEFAULT_SAVED_IDS;
    }
  });

  // 3. Applications with localStorage fallback
  const [applications, setApplications] = useState(() => {
    try {
      const stored = localStorage.getItem("grantly_applications");
      return stored ? JSON.parse(stored) : DEFAULT_APPLICATIONS;
    } catch {
      return DEFAULT_APPLICATIONS;
    }
  });

  // 4. Global Toast Notifications
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      if (user) localStorage.setItem("grantly_user", JSON.stringify(user));
      else localStorage.removeItem("grantly_user");
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem("grantly_saved", JSON.stringify(savedScholarships));
    } catch (e) {
      console.error(e);
    }
  }, [savedScholarships]);

  useEffect(() => {
    try {
      localStorage.setItem("grantly_applications", JSON.stringify(applications));
    } catch (e) {
      console.error(e);
    }
  }, [applications]);

  const showToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const login = (email, password) => {
    const loggedInUser = {
      ...DEFAULT_DEMO_USER,
      email,
      name: email.split("@")[0].replace(".", " ").toUpperCase(),
    };
    setUser(loggedInUser);
    showToast(`Welcome back, ${loggedInUser.name}!`);
    return true;
  };

  const register = (userData) => {
    const newUser = {
      id: "student-" + Date.now(),
      name: userData.name || "Student",
      email: userData.email,
      educationLevel: userData.educationLevel || "Undergraduate",
      course: userData.course || "BCA",
      college: userData.college || "University",
      currentYear: userData.currentYear || "1st Year",
      state: userData.state || "Tamil Nadu",
      percentage: parseFloat(userData.percentage) || 80,
      incomeNumeric: parseFloat(userData.incomeNumeric) || 200000,
      incomeFormatted: `₹${parseFloat(userData.incomeNumeric || 200000).toLocaleString("en-IN")}`,
      category: userData.category || "General",
      gender: userData.gender || "All",
      avatar: (userData.name || "S").charAt(0).toUpperCase(),
      isProfileComplete: true,
    };
    setUser(newUser);
    showToast(`Account created! Welcome to GRANTLY, ${newUser.name}.`);
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast("Signed out successfully.", "info");
  };

  const updateProfile = (updatedFields) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedFields };
      if (updatedFields.name) {
        next.avatar = updatedFields.name.charAt(0).toUpperCase();
      }
      return next;
    });
    showToast("Student profile updated successfully!");
  };

  const toggleSave = (scholarshipId) => {
    setSavedScholarships((prev) => {
      const isSaved = prev.includes(scholarshipId);
      if (isSaved) {
        showToast("Removed opportunity from saved list.", "info");
        return prev.filter((id) => id !== scholarshipId);
      } else {
        showToast("Saved to your shortlist! Accessible in your Dashboard.");
        return [...prev, scholarshipId];
      }
    });
  };

  const applyScholarship = (scholarship) => {
    const existing = applications.find((a) => a.scholarshipId === scholarship.id);
    if (existing) {
      showToast(`Already applied to this scheme! Status: ${existing.status}`, "info");
      return;
    }

    const newApp = {
      id: "app-" + Date.now(),
      scholarshipId: scholarship.id,
      scholarshipName: scholarship.name,
      amount: scholarship.amount,
      appliedDate: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }),
      status: "Applied",
      referenceId: "NSP-" + Math.floor(10000 + Math.random() * 90000),
      documentsAttached: 4
    };

    setApplications((prev) => [newApp, ...prev]);
    showToast(`Application simulated for ${scholarship.name}! Tracking ID: ${newApp.referenceId}`);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        savedScholarships,
        toggleSave,
        applications,
        applyScholarship,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

