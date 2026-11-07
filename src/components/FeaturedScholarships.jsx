import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Calendar, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Bookmark, 
  Search, 
  Filter, 
  CheckCircle, 
  Info, 
  ChevronRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { SCHOLARSHIPS_DATA, CATEGORIES } from '../data/scholarshipsData';

export default function FeaturedScholarships({ 
  selectedCategory, 
  onSelectCategory, 
  searchQuery, 
  onSearchChange,
  onOpenDetails,
  bookmarkedIds,
  onToggleBookmark 
}) {
  const [filterType, setFilterType] = useState('all'); // all, closingSoon, highAmount

  // Filter scholarships based on category, search query, and additional filters
  const filteredScholarships = SCHOLARSHIPS_DATA.filter((item) => {
    const matchesCategory = 
      !selectedCategory || 
      selectedCategory === 'All Categories' || 
      item.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));

    const matchesSearch = 
      !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesCategory || !matchesSearch) return false;

    if (filterType === 'closingSoon') return item.deadlineDays <= 15;
    if (filterType === 'highAmount') return item.amountNumeric >= 100000;

    return true;
  });

  return (
    <section id="featured-scholarships" className="py-20 bg-[#F8FAF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F3ED] text-[#176B50] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Financial Opportunities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102820] font-display tracking-tight">
              Featured Scholarships
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-xl">
              Hand-picked, high-value opportunities with open application windows. Cross-matched to your career goals.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-white px-4 py-2.5 rounded-xl border border-gray-200/80 shadow-xs text-xs font-medium text-gray-700">
            <span className="w-2.5 h-2.5 rounded-full bg-[#176B50]" />
            <span>Showing <strong>{filteredScholarships.length}</strong> active programs</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-gray-200 shadow-sm mb-8 space-y-3">
          
          {/* Top row: Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                  (selectedCategory === cat || (!selectedCategory && cat === 'All Categories'))
                    ? 'bg-[#102820] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Bottom row: Search input & filter toggles */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-gray-100 text-xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Filter by keyword (e.g. Tata, Tech, MBBS)..."
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#176B50]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-gray-400 hidden sm:inline">Quick sort:</span>
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                  filterType === 'all'
                    ? 'bg-[#E7F3ED] border-[#176B50] text-[#176B50]'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                All Grants
              </button>
              <button
                onClick={() => setFilterType('closingSoon')}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                  filterType === 'closingSoon'
                    ? 'bg-rose-50 border-rose-300 text-rose-700'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Closing Soon
              </button>
              <button
                onClick={() => setFilterType('highAmount')}
                className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                  filterType === 'highAmount'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                ₹1 Lakh+
              </button>
            </div>
          </div>
        </div>

        {/* Scholarships Grid */}
        {filteredScholarships.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 max-w-lg mx-auto">
            <Info className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 text-lg">No matching scholarships found</h3>
            <p className="text-gray-500 text-xs mt-1">
              Try adjusting your search terms or select "All Categories" to view available opportunities.
            </p>
            <button
              onClick={() => {
                onSelectCategory('All Categories');
                onSearchChange('');
                setFilterType('all');
              }}
              className="mt-4 px-4 py-2 bg-[#176B50] text-white rounded-xl text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholarships.map((scholarship, index) => {
              const isBookmarked = bookmarkedIds.includes(scholarship.id);

              return (
                <motion.div
                  key={scholarship.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl border border-gray-200/90 shadow-[0_4px_20px_-4px_rgba(16,40,32,0.06)] hover:shadow-[0_12px_32px_-6px_rgba(16,40,32,0.12)] hover:border-[#176B50]/40 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Card Content Top */}
                  <div className="p-6">
                    {/* Header Row: Provider & Match Badge */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${scholarship.logoBg} shadow-xs`}>
                          {scholarship.logoLetter}
                        </div>
                        <div>
                          <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-gray-400" />
                            {scholarship.provider}
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                            {scholarship.category}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => onToggleBookmark(scholarship.id)}
                        className={`p-2 rounded-xl transition-colors ${
                          isBookmarked
                            ? 'bg-emerald-50 text-[#176B50]'
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                        }`}
                        title={isBookmarked ? 'Remove from saved' : 'Save scholarship'}
                        aria-label="Bookmark"
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#176B50]' : ''}`} />
                      </button>
                    </div>

                    {/* Scholarship Name */}
                    <h3 
                      onClick={() => onOpenDetails(scholarship)}
                      className="text-base sm:text-lg font-bold font-display text-[#102820] group-hover:text-[#176B50] transition-colors cursor-pointer leading-snug line-clamp-2"
                    >
                      {scholarship.title}
                    </h3>

                    {/* Funding Amount Highlight */}
                    <div className="mt-3.5 p-3 rounded-xl bg-[#F8FAF7] border border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium block">
                          Funding Amount
                        </span>
                        <span className="text-lg font-extrabold text-[#176B50] font-display">
                          {scholarship.amount}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-gray-500 block">Match Score</span>
                        <span className="text-xs font-bold text-[#102820] bg-[#B9F27C] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#102820]" />
                          {scholarship.matchRate}%
                        </span>
                      </div>
                    </div>

                    {/* Eligibility Snippet */}
                    <div className="mt-4 text-xs text-gray-600 space-y-1.5">
                      <div className="flex items-start gap-1.5">
                        <span className="font-semibold text-gray-900 shrink-0">Eligibility:</span>
                        <span className="line-clamp-2 text-gray-600">{scholarship.eligibility}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {scholarship.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom / Actions */}
                  <div className="px-6 py-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-gray-500">Deadline:</span>
                      <span className={`font-semibold ${scholarship.deadlineDays <= 7 ? 'text-rose-600 font-bold' : 'text-gray-800'}`}>
                        {scholarship.deadline}
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenDetails(scholarship)}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#176B50] text-[#176B50] hover:text-white border border-[#176B50]/30 hover:border-transparent text-xs font-semibold transition-all duration-200 shadow-2xs group/btn"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* View All Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-500 mb-3">
            Want to see private university and international research grants?
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-gray-50 text-[#102820] border border-gray-300 text-xs sm:text-sm font-semibold shadow-xs transition-colors"
          >
            <span>Load More Scholarships</span>
            <ArrowRight className="w-4 h-4 text-[#176B50]" />
          </a>
        </div>

      </div>
    </section>
  );
}

