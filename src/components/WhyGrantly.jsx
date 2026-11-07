import React from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Target, 
  Layers, 
  Bell, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Smartphone, 
  ArrowUpRight,
  TrendingUp,
  FileCheck2
} from 'lucide-react';

export default function WhyGrantly() {
  const benefits = [
    {
      title: "Smart Scholarship Matching",
      tagline: "Proprietary algorithmic precision",
      desc: "Our neural matching engine evaluates over 40 parameters—including domicile, parent income, gender quotas, and academic CGPA—cutting down 200+ hours of manual portal searching into seconds.",
      icon: <Cpu className="w-6 h-6 text-[#176B50]" />,
      pill: "98% Accuracy",
      stat: "40+ Parameters Evaluated",
      metric: "98.4%",
      metricLabel: "Precision Match Rate",
      highlight: false
    },
    {
      title: "Personalized Recommendations",
      tagline: "Curated exclusively for your profile",
      desc: "Never apply to a grant you are disqualified from. We rank opportunities by win probability and funding size, ensuring your time is spent where your odds are highest.",
      icon: <Target className="w-6 h-6 text-[#176B50]" />,
      pill: "AI Ranked",
      stat: "Zero Irrelevant Suggestions",
      metric: "3.2x",
      metricLabel: "Higher Acceptance Ratio",
      highlight: true
    },
    {
      title: "Application Tracking",
      tagline: "End-to-end command center",
      desc: "Organize applications across multiple portals in one unified dashboard. Track required documents, submission receipts, interview calls, and disbursal milestones seamlessly.",
      icon: <Layers className="w-6 h-6 text-[#176B50]" />,
      pill: "Unified Dashboard",
      stat: "Document Readiness Checks",
      metric: "100%",
      metricLabel: "Paperwork Audit Rate",
      highlight: false
    },
    {
      title: "Deadline Reminders",
      tagline: "Never forfeit funding to late submissions",
      desc: "Get intelligent automated notifications via WhatsApp, SMS, and Calendar sync at 14 days, 7 days, and 48 hours before official portal deadlines close.",
      icon: <Bell className="w-6 h-6 text-[#176B50]" />,
      pill: "Zero Missed Windows",
      stat: "WhatsApp & Calendar Sync",
      metric: "0%",
      metricLabel: "Missed Deadline Rate",
      highlight: false
    }
  ];

  return (
    <section id="why-grantly" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F3ED] text-[#176B50] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Built for Modern Students
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102820] font-display tracking-tight">
            Why Choose GRANTLY?
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Traditional scholarship searching is broken, opaque, and scattered across dozens of disjointed portals. GRANTLY brings venture-scale clarity, automation, and speed.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                benefit.highlight
                  ? 'bg-gradient-to-br from-[#102820] to-[#176B50] text-white border-transparent shadow-xl'
                  : 'bg-[#F8FAF7] text-[#102820] border-gray-100 hover:border-[#176B50]/30 hover:shadow-lg'
              }`}
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs ${
                    benefit.highlight ? 'bg-white/10 text-[#B9F27C]' : 'bg-white text-[#176B50]'
                  }`}>
                    {benefit.icon}
                  </div>

                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    benefit.highlight
                      ? 'bg-[#B9F27C] text-[#102820]'
                      : 'bg-[#E7F3ED] text-[#176B50]'
                  }`}>
                    {benefit.pill}
                  </span>
                </div>

                <h3 className={`text-xl sm:text-2xl font-bold font-display ${benefit.highlight ? 'text-white' : 'text-[#102820]'}`}>
                  {benefit.title}
                </h3>
                <p className={`text-xs sm:text-sm font-semibold mt-1 ${benefit.highlight ? 'text-emerald-300' : 'text-[#176B50]'}`}>
                  {benefit.tagline}
                </p>

                <p className={`text-sm mt-3 leading-relaxed ${benefit.highlight ? 'text-emerald-100/80' : 'text-gray-600'}`}>
                  {benefit.desc}
                </p>
              </div>

              {/* Bottom Metric Strip */}
              <div className={`mt-8 pt-5 border-t flex items-center justify-between ${
                benefit.highlight ? 'border-white/15' : 'border-gray-200/80'
              }`}>
                <div>
                  <span className={`text-2xl sm:text-3xl font-extrabold font-display ${
                    benefit.highlight ? 'text-[#B9F27C]' : 'text-[#176B50]'
                  }`}>
                    {benefit.metric}
                  </span>
                  <span className={`block text-xs ${benefit.highlight ? 'text-white/60' : 'text-gray-500'}`}>
                    {benefit.metricLabel}
                  </span>
                </div>

                <div className={`text-xs font-medium flex items-center gap-1.5 ${
                  benefit.highlight ? 'text-emerald-200' : 'text-gray-700'
                }`}>
                  <ShieldCheck className={`w-4 h-4 ${benefit.highlight ? 'text-[#B9F27C]' : 'text-[#176B50]'}`} />
                  <span>{benefit.stat}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature comparison banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#E7F3ED]/60 border border-[#176B50]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#176B50] text-[#B9F27C] flex items-center justify-center shrink-0">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#102820] text-base sm:text-lg">
                Are you an Educational Institute or NGO Trust?
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm">
                Partner with GRANTLY to disburse grants directly to your student body with 100% compliance audit logs.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-xl bg-[#102820] hover:bg-[#176B50] text-white text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-xs flex items-center gap-1.5"
          >
            <span>Partner With Us</span>
            <ArrowUpRight className="w-4 h-4 text-[#B9F27C]" />
          </a>
        </div>

      </div>
    </section>
  );
}

