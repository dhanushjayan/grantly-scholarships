import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  IndianRupee, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Building 
} from 'lucide-react';
import { PLATFORM_STATS } from '../data/scholarshipsData';

export default function Stats() {
  const icons = [
    <GraduationCap className="w-6 h-6 text-[#176B50]" />,
    <IndianRupee className="w-6 h-6 text-[#176B50]" />,
    <Users className="w-6 h-6 text-[#176B50]" />,
    <TrendingUp className="w-6 h-6 text-[#176B50]" />
  ];

  return (
    <section className="bg-white py-14 sm:py-20 border-y border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F3ED] text-[#176B50] text-xs font-semibold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Empowering Higher Education
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#102820]">
            India's Leading Scholarship Intelligence Platform
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Real-time verified funding metrics aggregated across government portals, corporate CSR initiatives, and philanthropic endowments.
          </p>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PLATFORM_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-[#F8FAF7] border border-gray-100 hover:border-[#176B50]/30 transition-all duration-200 hover:shadow-md group"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-gray-200/80 shadow-xs flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {icons[index]}
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#102820] font-display tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[11px] font-semibold text-[#176B50] bg-[#E7F3ED] px-2 py-0.5 rounded-full">
                  {stat.change}
                </span>
              </div>

              <h3 className="text-base font-bold text-gray-900 mt-2">
                {stat.label}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {stat.subtext}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Verification banner */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-400 gap-4">
          <div className="flex items-center gap-2 text-gray-500">
            <CheckCircle2 className="w-4 h-4 text-[#176B50]" />
            <span>Figures based on actively listed endowments, government gazettes, and official CSR audits (Demo verified).</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-gray-600 font-medium">
              <Building className="w-3.5 h-3.5 text-gray-400" />
              Over 280+ CSR Trusts Registered
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

