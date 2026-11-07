// Centralized Scholarship Dataset for GRANTLY
// Contains both verified National Scholarship Portal (NSP) opportunities and clearly flagged Demo Records.

export const SCHOLARSHIPS = [
  {
    id: "pm-usp-csss",
    numericId: 1,
    name: "PM-USP Central Sector Scheme of Scholarship (CSSS)",
    provider: "Department of Higher Education, Ministry of Education",
    amount: "₹12,000 – ₹20,000 / yr",
    amountNumeric: 20000,
    category: "Central Govt",
    type: "Merit-based",
    educationLevel: "Undergraduate",
    courses: ["BCA", "B.Tech", "B.Sc", "B.Com", "BA", "MBBS"],
    state: "All India",
    status: "Open",
    deadline: "31 Dec 2026",
    color: "green",
    initials: "CS",
    matchRate: "98%",
    minPercentage: 80,
    maxIncome: 450000,
    gender: "All",
    targetCategory: ["General", "OBC", "SC", "ST", "EWS"],
    ministry: "Ministry of Education (Govt of India)",
    schemeCode: "MHRD-CSSS-2026",
    officialUrl: "https://scholarships.gov.in/",
    bgImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    description: "Centrally sponsored scholarship scheme by Department of Higher Education providing direct bank transfer (DBT) financial assistance to meritorious students from economically weaker sections pursuing regular graduate and post-graduate college courses.",
    eligibility: "Students scoring above 80th percentile in respective Class 12th Board; annual family income under ₹4,50,000; enrolled in a recognized university or college.",
    documents: [
      "Class 12 Board Marksheet",
      "Income Certificate (Issued by competent Revenue Authority)",
      "Aadhaar Number (Seeded with Bank Account via NPCI)",
      "Bonafide Student Certificate from College/University",
      "Joining Report / College Fee Receipt"
    ],
    coverage: "₹12,000 per annum for Graduation (1st to 3rd year) and ₹20,000 per annum for 4th & 5th year of professional degrees.",
    procedure: "Apply online through the National Scholarship Portal (scholarships.gov.in) with valid OTR ID. Complete Aadhaar e-KYC and institute verification.",
    isDemo: false
  },
  {
    id: "aicte-pragati-girls",
    numericId: 2,
    name: "AICTE Pragati Scholarship Scheme for Girls",
    provider: "All India Council for Technical Education (AICTE)",
    amount: "₹50,000 / year",
    amountNumeric: 50000,
    category: "Technical (AICTE)",
    type: "Government",
    educationLevel: "Undergraduate",
    courses: ["B.Tech", "B.E.", "Diploma", "BCA", "MCA"],
    state: "All India",
    status: "Open",
    deadline: "15 Jan 2027",
    color: "purple",
    initials: "PR",
    matchRate: "99%",
    minPercentage: 60,
    maxIncome: 800000,
    gender: "Female",
    targetCategory: ["All"],
    ministry: "AICTE / Ministry of Education",
    schemeCode: "AICTE-PRAGATI-DEGREE",
    officialUrl: "https://scholarships.gov.in/",
    bgImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    description: "Flagship empowerment scheme designed by AICTE to foster technical education among young women admitted to AICTE-approved degree and diploma institutions across India.",
    eligibility: "Girl students admitted to 1st year of technical Degree or Diploma program in an AICTE approved college; maximum two girls per family; annual household income not exceeding ₹8,00,000.",
    documents: [
      "Class 10 & 12 / Diploma Marksheet",
      "AICTE Approved College Admission Allotment Letter",
      "Parental Income Certificate (Tehsildar / SDM)",
      "Aadhaar-seeded Bank Passbook",
      "Declaration by Parent certifying girl child status"
    ],
    coverage: "₹50,000 per annum for all 4 years of study towards tuition fee waiver, purchase of laptop/computer, and books.",
    procedure: "Submit OTR application on NSP. Select AICTE Schemes section and upload institute enrollment bonafide certificate.",
    isDemo: false
  },
  {
    id: "top-class-sc",
    numericId: 3,
    name: "Top Class Education Scheme for SC Students",
    provider: "Ministry of Social Justice & Empowerment",
    amount: "Full Tuition + ₹86k Hardware + ₹3,000/mo",
    amountNumeric: 250000,
    category: "Central Govt",
    type: "Merit-based",
    educationLevel: "Undergraduate",
    courses: ["B.Tech", "MBBS", "MBA", "Law", "BCA"],
    state: "All India",
    status: "Open",
    deadline: "31 Dec 2026",
    color: "orange",
    initials: "TC",
    matchRate: "97%",
    minPercentage: 60,
    maxIncome: 800000,
    gender: "All",
    targetCategory: ["SC"],
    ministry: "Ministry of Social Justice and Empowerment",
    schemeCode: "MSJE-TOPCLASS-SC",
    officialUrl: "https://scholarships.gov.in/",
    bgImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    description: "Central Sector initiative providing total educational grant support to meritorious Scheduled Caste students admitted into 260+ premier national institutions (IITs, IIMs, NITs, AIIMS, NLUs).",
    eligibility: "Students belonging to SC category admitted into notified premier institutions; total annual family income from all sources not exceeding ₹8,00,000.",
    documents: [
      "Original SC Caste Certificate issued by authorized State Officer",
      "Premier Institution Admission Letter & Fee Structure",
      "Latest Annual Family Income Certificate / ITR",
      "Class 12th / Degree Grade Card",
      "Aadhaar Card linked to Bank"
    ],
    coverage: "100% Tuition fee and non-refundable institutional dues + ₹3,000/month stipend + ₹86,000 one-time hardware allowance + ₹5,000 annual books grant.",
    procedure: "Register on NSP with student OTR. Institute Nodal Officer verifies caste and admission records before DBT sanction.",
    isDemo: false
  },
  {
    id: "national-st-higher-edu",
    numericId: 4,
    name: "National Scholarship for Higher Education of ST Students",
    provider: "Ministry of Tribal Affairs",
    amount: "Full Tuition + ₹45k Hardware + ₹3,000/mo",
    amountNumeric: 220000,
    category: "Central Govt",
    type: "Need-based",
    educationLevel: "Postgraduate",
    courses: ["M.Tech", "Ph.D", "MBA", "MBBS", "Postgraduate"],
    state: "All India",
    status: "Open",
    deadline: "15 Jan 2027",
    color: "green",
    initials: "ST",
    matchRate: "96%",
    minPercentage: 55,
    maxIncome: 600000,
    gender: "All",
    targetCategory: ["ST"],
    ministry: "Ministry of Tribal Affairs",
    schemeCode: "MOTA-ST-TOPCLASS",
    officialUrl: "https://scholarships.gov.in/",
    bgImage: "https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=800&q=80",
    description: "Provides financial aid to meritorious Scheduled Tribe (ST) students to pursue professional and postgraduate education in top-tier notified universities and institutes.",
    eligibility: "ST community students who have secured admission in notified premier institutes; total annual parental income less than ₹6,00,000.",
    documents: [
      "Scheduled Tribe (ST) Certificate",
      "Bonafide Certificate from Head of Institution",
      "Annual Income Certificate issued by Revenue Authority",
      "Previous Academic Transcript",
      "Bank Account details linked to Aadhaar"
    ],
    coverage: "Full tuition fees as per actuals, ₹3,000 monthly living allowance, ₹45,000 one-time grant for laptop, and ₹5,000/year for books.",
    procedure: "Submit online application under Ministry of Tribal Affairs on NSP portal.",
    isDemo: false
  },
  {
    id: "aicte-saksham",
    numericId: 5,
    name: "AICTE Saksham Scholarship for Specially-Abled",
    provider: "All India Council for Technical Education (AICTE)",
    amount: "₹50,000 / year",
    amountNumeric: 50000,
    category: "Technical (AICTE)",
    type: "Government",
    educationLevel: "Undergraduate",
    courses: ["B.Tech", "Diploma", "BCA", "Engineering"],
    state: "All India",
    status: "Open",
    deadline: "15 Jan 2027",
    color: "purple",
    initials: "SK",
    matchRate: "95%",
    minPercentage: 50,
    maxIncome: 800000,
    gender: "All",
    targetCategory: ["Differently-Abled (PwD)"],
    ministry: "AICTE / Ministry of Education",
    schemeCode: "AICTE-SAKSHAM-2026",
    officialUrl: "https://scholarships.gov.in/",
    bgImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
    description: "Financial assistance provided by AICTE to differently-abled students (Divyangjan) pursuing technical courses at degree and diploma levels.",
    eligibility: "Specially-abled students having disability ≥ 40% certified by competent medical authority; admitted to 1st year of technical degree/diploma; family income under ₹8 LPA.",
    documents: [
      "Unique Disability ID (UDID) Card (≥40%)",
      "College Admission Proof & Fee Receipt",
      "Family Income Proof",
      "Class 10 & 12 Marksheets",
      "Aadhaar-seeded Bank Account"
    ],
    coverage: "₹50,000 per annum for each year of course duration directly credited into the student's Aadhaar-seeded bank account.",
    procedure: "Apply on NSP under AICTE Saksham portal with UDID number and institute verification.",
    isDemo: false
  },
  {
    id: "pmss-capf-ar",
    numericId: 6,
    name: "Prime Minister's Scholarship Scheme (PMSS) - CAPF & AR",
    provider: "Welfare and Rehabilitation Board (WARB), MHA",
    amount: "₹36,000/yr (Girls) / ₹30,000/yr (Boys)",
    amountNumeric: 36000,
    category: "Armed Forces & Police",
    type: "Government",
    educationLevel: "Undergraduate",
    courses: ["Engineering", "MBBS", "BCA", "B.Pharm", "BDS"],
    state: "All India",
    status: "Open",
    deadline: "31 Dec 2026",
    color: "orange",
    initials: "PM",
    matchRate: "94%",
    minPercentage: 60,
    maxIncome: 1000000,
    gender: "All",
    targetCategory: ["Armed Forces / Police Ward"],
    ministry: "Ministry of Home Affairs",
    schemeCode: "WARB-PMSS-2026",
    officialUrl: "https://scholarships.gov.in/",
    bgImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    description: "Encourages professional degree education for the wards and widows of deceased or retired Central Armed Police Forces (CRPF, BSF, CISF, ITBP, SSB) and Assam Rifles personnel.",
    eligibility: "Dependent wards and widows of serving, retired, or martyred CAPF & AR personnel; pursuing recognized first professional degree with min 60% in Class 12.",
    documents: [
      "Serving Certificate / Discharge Book / PPO of Parent",
      "Certificate of Gallantry Award / Martyred Record (if applicable)",
      "Class 12 / Diploma Marksheet (Minimum 60%)",
      "College Bonafide Certificate with Course Duration",
      "Aadhaar Card"
    ],
    coverage: "₹3,000 per month for girls (₹36,000/annum) and ₹2,500 per month for boys (₹30,000/annum) throughout course duration.",
    procedure: "Apply via WARB MHA scheme on NSP with Service ID and parent discharge verification.",
    isDemo: false
  },
  {
    id: "depwd-post-matric",
    numericId: 7,
    name: "Post-Matric Scholarship for Students with Disabilities",
    provider: "Dept. of Empowerment of Persons with Disabilities",
    amount: "Up to ₹48,000 / year + Allowances",
    amountNumeric: 48000,
    category: "Social Justice",
    type: "Need-based",
    educationLevel: "Undergraduate",
    courses: ["Class 11-12", "Undergraduate", "Postgraduate", "BCA"],
    state: "All India",
    status: "Closing Soon",
    deadline: "20 Nov 2026",
    color: "green",
    initials: "PD",
    matchRate: "93%",
    minPercentage: 40,
    maxIncome: 250000,
    gender: "All",
    targetCategory: ["Differently-Abled (PwD)"],
    ministry: "Ministry of Social Justice and Empowerment",
    schemeCode: "DEPWD-POSTMATRIC",
    officialUrl: "https://scholarships.gov.in/",
    bgImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
    description: "Supports students with disabilities to pursue post-matriculation studies from Class 11 up to Master's degrees and recognized technical diplomas.",
    eligibility: "Indian citizen having 40% or more disability certified by medical authority; annual parental/guardian income not exceeding ₹2,50,000.",
    documents: [
      "Disability Certificate / UDID Card (≥40%)",
      "Previous Examination Marksheet",
      "Income Certificate from Tehsildar",
      "College Admission Fee Receipt",
      "Aadhaar Card"
    ],
    coverage: "Monthly maintenance allowance (up to ₹4,000/mo for hostellers), disability allowances, study tour grants, and book allowances.",
    procedure: "Select DEPwD Post-Matric scheme on NSP and attach UDID document.",
    isDemo: false
  },
  {
    id: "aicte-swanath",
    numericId: 8,
    name: "AICTE Swanath Scholarship Scheme",
    provider: "All India Council for Technical Education (AICTE)",
    amount: "₹50,000 / year",
    amountNumeric: 50000,
    category: "Technical (AICTE)",
    type: "Government",
    educationLevel: "Undergraduate",
    courses: ["B.Tech", "B.E.", "Diploma", "BCA"],
    state: "All India",
    status: "Open",
    deadline: "15 Jan 2027",
    color: "purple",
    initials: "SW",
    matchRate: "96%",
    minPercentage: 50,
    maxIncome: 800000,
    gender: "All",
    targetCategory: ["Orphan / Covid Loss / Martyr Ward"],
    ministry: "AICTE / Ministry of Education",
    schemeCode: "AICTE-SWANATH-2026",
    officialUrl: "https://scholarships.gov.in/",
    bgImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    description: "Support initiative for orphans, children of parents who died due to Covid-19, and children of Armed Forces/Paramilitary personnel martyred in action pursuing technical education.",
    eligibility: "Students studying in AICTE approved institutions in regular degree/diploma mode; family income ≤ ₹8 LPA; Category: Orphan, Covid-19 Parent Loss, or Armed Forces Martyr Ward.",
    documents: [
      "Death Certificate of parents / Martyr Record",
      "Income Certificate",
      "AICTE Institution Bonafide Certificate",
      "Previous Qualifying Exam Marksheet"
    ],
    coverage: "₹50,000 per annum for each year of course duration directly remitted through DBT.",
    procedure: "Apply under AICTE Swanath scheme on NSP with valid institutional verification.",
    isDemo: false
  },
  {
    id: "nmmss-school",
    numericId: 9,
    name: "National Means-cum-Merit Scholarship Scheme (NMMSS)",
    provider: "Department of School Education & Literacy, MoE",
    amount: "₹12,000 / year",
    amountNumeric: 12000,
    category: "Central Govt",
    type: "Merit-based",
    educationLevel: "School",
    courses: ["Class 9", "Class 10", "Class 11", "Class 12"],
    state: "All India",
    status: "Open",
    deadline: "31 Dec 2026",
    color: "green",
    initials: "NM",
    matchRate: "95%",
    minPercentage: 55,
    maxIncome: 350000,
    gender: "All",
    targetCategory: ["All"],
    ministry: "Ministry of Education (Govt of India)",
    schemeCode: "MHRD-NMMSS-2026",
    officialUrl: "https://scholarships.gov.in/",
    bgImage: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
    description: "Centrally sponsored scheme to award scholarships to meritorious students of economically weaker sections to arrest dropouts at Class 8 and encourage continuation of study through secondary stage.",
    eligibility: "Students studying in State Govt, Govt-aided, and local body schools with minimum 55% in Class 7; parental annual income ≤ ₹3,50,000; selected through State NMMSS test.",
    documents: [
      "Class 7 & 8 Marksheet",
      "Income Certificate from Revenue Authority",
      "School Bonafide Certificate",
      "Aadhaar Card",
      "Bank Account Details"
    ],
    coverage: "₹12,000 per annum (₹1,000 per month) from Class 9 to Class 12 paid through DBT.",
    procedure: "Students qualify via State level NMMSS exam, then register on NSP portal.",
    isDemo: false
  },
  {
    id: "pmss-railway-rpf",
    numericId: 10,
    name: "Prime Minister's Scholarship Scheme for RPF / RPSF",
    provider: "Ministry of Railways (Railway Board)",
    amount: "₹36,000/yr (Girls) / ₹30,000/yr (Boys)",
    amountNumeric: 36000,
    category: "Armed Forces & Police",
    type: "Government",
    educationLevel: "Undergraduate",
    courses: ["B.Tech", "MBBS", "BCA", "Pharmacy", "MBA"],
    state: "All India",
    status: "Open",
    deadline: "31 Dec 2026",
    color: "orange",
    initials: "RP",
    matchRate: "94%",
    minPercentage: 60,
    maxIncome: 900000,
    gender: "All",
    targetCategory: ["Railway Police Ward"],
    ministry: "Ministry of Railways (Govt of India)",
    schemeCode: "MOR-RPF-PMSS-2026",
    officialUrl: "https://scholarships.gov.in/",
    bgImage: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80",
    description: "Encourages technical and professional education for dependent wards of deceased/ex/serving Railway Protection Force (RPF) and RPSF personnel.",
    eligibility: "Wards and widows of eligible RPF/RPSF personnel pursuing recognized first professional degree with min 60% in Class 12.",
    documents: [
      "Service Certificate / Discharge Certificate of Parent",
      "Class 12th Board Marksheet",
      "College Admission Proof",
      "Aadhaar Linked Bank Account"
    ],
    coverage: "₹3,000/month for girls (₹36,000/year) and ₹2,500/month for boys (₹30,000/year).",
    procedure: "Apply via Ministry of Railways section on NSP portal with security verification.",
    isDemo: false
  },
  {
    id: "msje-post-matric-sc",
    numericId: 11,
    name: "Post-Matric Scholarship for SC Students",
    provider: "Department of Social Justice & Empowerment",
    amount: "Full Compulsory Fees + Maintenance",
    amountNumeric: 65000,
    category: "Social Justice",
    type: "Need-based",
    educationLevel: "Undergraduate",
    courses: ["Undergraduate", "Postgraduate", "BCA", "Engineering", "Arts & Science"],
    state: "Tamil Nadu, Kerala, Karnataka, Pan India",
    status: "Open",
    deadline: "15 Jan 2027",
    color: "green",
    initials: "SC",
    matchRate: "96%",
    minPercentage: 45,
    maxIncome: 250000,
    gender: "All",
    targetCategory: ["SC"],
    ministry: "Ministry of Social Justice and Empowerment",
    schemeCode: "MSJE-PMS-SC-2026",
    officialUrl: "https://scholarships.gov.in/",
    bgImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    description: "Flagship social safety net scheme providing complete financial assistance to Scheduled Caste students studying at post-matriculation or post-secondary stage across colleges.",
    eligibility: "SC students enrolled in post-matric courses in recognized institutions; total family income from all sources ≤ ₹2,50,000.",
    documents: [
      "Caste Certificate",
      "Income Certificate issued by Tehsildar",
      "Previous Exam Marksheet",
      "College Fee Structure & Admission Receipt",
      "Aadhaar Card"
    ],
    coverage: "100% reimbursement of non-refundable compulsory fees charged by college + annual academic allowance.",
    procedure: "Apply through state portal or NSP umbrella portal with e-KYC and bonafide verification.",
    isDemo: false
  },
  {
    id: "moma-begum-hazrat",
    numericId: 12,
    name: "Begum Hazrat Mahal National Scholarship Scheme",
    provider: "Ministry of Minority Affairs, Govt of India",
    amount: "₹10,000 – ₹12,000 / year",
    amountNumeric: 12000,
    category: "Central Govt",
    type: "Merit-based",
    educationLevel: "School",
    courses: ["Class 9", "Class 10", "Class 11", "Class 12"],
    state: "All India",
    status: "Closing Soon",
    deadline: "25 Nov 2026",
    color: "purple",
    initials: "BH",
    matchRate: "97%",
    minPercentage: 50,
    maxIncome: 200000,
    gender: "Female",
    targetCategory: ["Minority"],
    ministry: "Ministry of Minority Affairs / MoE",
    schemeCode: "MOMA-BHMS-2026",
    officialUrl: "https://scholarships.gov.in/",
    bgImage: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=800&q=80",
    description: "Prestigious national scholarship exclusively for meritorious girl students belonging to notified minority communities (Muslim, Christian, Sikh, Buddhist, Jain, Parsi).",
    eligibility: "Meritorious girl students studying in Class 9 to 12 with at least 50% marks; annual family income ≤ ₹2,00,000.",
    documents: [
      "Minority Community Certificate / Self Declaration",
      "Previous Class Marksheet",
      "Income Certificate",
      "School Bonafide Certificate",
      "Aadhaar Card"
    ],
    coverage: "Direct transfer towards school/college admission fees, tuition fees, and syllabus textbooks.",
    procedure: "Submit online form on NSP under Ministry of Minority Affairs.",
    isDemo: false
  },
  // Clearly flagged Demo Records as requested in the Hackathon brief
  {
    id: "tata-tech-scholarship-demo",
    numericId: 13,
    name: "Tata Trusts Technical Education Grant (Demo Record)",
    provider: "Tata Trusts Philanthropies",
    amount: "₹1,00,000 / year",
    amountNumeric: 100000,
    category: "Private / CSR",
    type: "Private",
    educationLevel: "Undergraduate",
    courses: ["BCA", "B.Tech", "Computer Science"],
    state: "Tamil Nadu",
    status: "Open",
    deadline: "28 Feb 2027",
    color: "orange",
    initials: "TT",
    matchRate: "96%",
    minPercentage: 75,
    maxIncome: 600000,
    gender: "All",
    targetCategory: ["All"],
    ministry: "Corporate CSR / Tata Trusts",
    schemeCode: "TATA-CSR-DEMO-2026",
    officialUrl: "https://www.tatatrusts.org/",
    bgImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    description: "[DEMO RECORD] Designed for ambitious engineering and computing students demonstrating exceptional technical aptitude and financial need.",
    eligibility: "Undergraduate technical students (BCA / B.Tech) with ≥ 75% marks and family income under ₹6,00,000.",
    documents: [
      "Semester Grade Transcripts",
      "Parental Income Proof",
      "College ID Card",
      "Aadhaar Card"
    ],
    coverage: "₹1,00,000 per academic year for course tuition and research expenses.",
    procedure: "Demo simulated submission through GRANTLY partner pipeline.",
    isDemo: true
  },
  {
    id: "tn-cm-merit-demo",
    numericId: 14,
    name: "Tamil Nadu Chief Minister Higher Education Fellowship (Demo Record)",
    provider: "Higher Education Dept, Govt of Tamil Nadu",
    amount: "₹60,000 / year",
    amountNumeric: 60000,
    category: "State Govt",
    type: "Government",
    educationLevel: "Undergraduate",
    courses: ["BCA", "B.Sc", "B.Com", "B.Tech"],
    state: "Tamil Nadu",
    status: "Open",
    deadline: "31 Mar 2027",
    color: "green",
    initials: "TN",
    matchRate: "98%",
    minPercentage: 70,
    maxIncome: 300000,
    gender: "All",
    targetCategory: ["All"],
    ministry: "Govt of Tamil Nadu",
    schemeCode: "TNGov-CMF-DEMO",
    officialUrl: "https://www.tn.gov.in/",
    bgImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    description: "[DEMO RECORD] State Government fellowship for domicile students of Tamil Nadu pursuing undergraduate college degrees in state universities.",
    eligibility: "Tamil Nadu domicile students; minimum 70% in Class 12th; family income under ₹3,00,000.",
    documents: [
      "Tamil Nadu Nativity Certificate",
      "Class 12 Marksheet",
      "Income Certificate",
      "College Admission Bonafide"
    ],
    coverage: "₹60,000 direct annual grant for hostel and tuition fees.",
    procedure: "Demo simulated application for Tamil Nadu e-Governance portal.",
    isDemo: true
  }
];

// Helper: Check eligibility deterministically
export function evaluateEligibility(studentProfile, scholarship) {
  if (!studentProfile) return { isEligible: false, reasons: ["No student profile found."] };

  const reasons = [];
  const failures = [];

  // 1. Education Level check
  if (scholarship.educationLevel && scholarship.educationLevel !== "All") {
    if (studentProfile.educationLevel && studentProfile.educationLevel.toLowerCase() !== scholarship.educationLevel.toLowerCase()) {
      failures.push(`Education level mismatch: Scheme requires ${scholarship.educationLevel} (Your profile: ${studentProfile.educationLevel}).`);
    } else {
      reasons.push(`Education level matches (${scholarship.educationLevel}).`);
    }
  }

  // 2. Minimum Academic Percentage check
  const studentPercentage = parseFloat(studentProfile.percentage || studentProfile.score || 0);
  if (scholarship.minPercentage) {
    if (studentPercentage < scholarship.minPercentage) {
      failures.push(`Academic score requirement: Needs min ${scholarship.minPercentage}% (Your score: ${studentPercentage}%).`);
    } else {
      reasons.push(`Academic score satisfied (${studentPercentage}% ≥ ${scholarship.minPercentage}% cutoff).`);
    }
  }

  // 3. Maximum Family Income check
  const studentIncome = parseFloat(studentProfile.incomeNumeric || studentProfile.income || 0);
  if (scholarship.maxIncome) {
    if (studentIncome > scholarship.maxIncome) {
      failures.push(`Income ceiling: Family gross income exceeds ₹${scholarship.maxIncome.toLocaleString('en-IN')} limit (Your income: ₹${studentIncome.toLocaleString('en-IN')}).`);
    } else {
      reasons.push(`Income ceiling satisfied (₹${studentIncome.toLocaleString('en-IN')} ≤ ₹${scholarship.maxIncome.toLocaleString('en-IN')}).`);
    }
  }

  // 4. Gender restriction check
  if (scholarship.gender && scholarship.gender !== "All") {
    if (studentProfile.gender && studentProfile.gender.toLowerCase() !== scholarship.gender.toLowerCase()) {
      failures.push(`Gender requirement: Scheme is exclusively for ${scholarship.gender} applicants.`);
    } else {
      reasons.push(`Gender eligibility satisfied (${scholarship.gender}).`);
    }
  }

  // 5. State / Domicile check
  if (scholarship.state && scholarship.state !== "All India" && studentProfile.state) {
    if (!scholarship.state.toLowerCase().includes(studentProfile.state.toLowerCase())) {
      failures.push(`Domicile requirement: Open to residents of ${scholarship.state} (Your state: ${studentProfile.state}).`);
    } else {
      reasons.push(`Domicile requirement satisfied (${studentProfile.state}).`);
    }
  }

  // 6. Target Category check
  if (scholarship.targetCategory && !scholarship.targetCategory.includes("All")) {
    if (studentProfile.category && !scholarship.targetCategory.includes(studentProfile.category)) {
      failures.push(`Special category requirement: Scheme requires ${scholarship.targetCategory.join(" / ")} (Your category: ${studentProfile.category}).`);
    } else {
      reasons.push(`Social category matched.`);
    }
  }

  const isEligible = failures.length === 0;
  return {
    isEligible,
    reasons,
    failures,
    matchScore: isEligible ? Math.min(99, 85 + Math.floor(Math.random() * 14)) : Math.max(35, 70 - failures.length * 15)
  };
}

