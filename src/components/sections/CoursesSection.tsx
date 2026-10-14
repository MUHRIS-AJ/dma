import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  BookOpen,
  Clock,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { onlineCourses, departmentCourses, AcademyCourse } from '../../premium/catalog';
import { useMascot } from '../../context/MascotContext';

export const CoursesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { playSound, setSelectedCourse, setEnrollModalOpen } = useMascot();

  // Combine all 65 courses
  const allCatalogCourses = useMemo(() => {
    return [...onlineCourses, ...departmentCourses];
  }, []);

  const tabs = [
    { id: 'All', label: 'All Courses (65)' },
    { id: 'online', label: 'Online Certificates (30)' },
    { id: 'Language Courses', label: 'Languages (6)' },
    { id: 'Psychology & Counselling', label: 'Psychology (6)' },
    { id: 'HRM & Administration', label: 'HRM & Admin (5)' },
    { id: 'Computer & IT', label: 'Computer & IT (5)' },
    { id: 'Design & Digital Media', label: 'Design & Media (4)' },
    { id: 'Business & Professional Skills', label: 'Business (4)' },
    { id: 'department', label: 'Departmental IT (35)' },
  ];

  const filteredCourses = useMemo(() => {
    return allCatalogCourses.filter((course) => {
      // Tab matching
      let tabMatch = true;
      if (activeTab === 'online') tabMatch = course.mode === 'online';
      else if (activeTab === 'department') tabMatch = course.mode === 'department';
      else if (activeTab !== 'All') tabMatch = course.category === activeTab;

      // Search matching
      const query = searchQuery.toLowerCase().trim();
      const searchMatch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.fee.toLowerCase().includes(query) ||
        (course.duration && course.duration.toLowerCase().includes(query));

      return tabMatch && searchMatch;
    });
  }, [allCatalogCourses, activeTab, searchQuery]);

  const handleEnrollCourse = (course: AcademyCourse) => {
    playSound('magic');
    setSelectedCourse(course.title);
    setEnrollModalOpen(true);
  };

  return (
    <section id="courses" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0E14] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#0056B3]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#E63946]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#FFD700]/30 text-xs font-semibold text-[#FFD700] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OFFICIAL CURRICULUM</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight mb-4">
            Explore Our <span className="bg-gradient-to-r from-[#FFD700] via-[#E63946] to-[#0056B3] bg-clip-text text-transparent">Courses</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Choose from <strong>30 fully online certificates</strong> and <strong>35 departmental IT programmes</strong> designed to give you direct practical mastery.
          </p>
        </div>

        {/* Infinite Course Marquee Ticker */}
        <div className="relative w-full overflow-hidden mb-16 py-3 border-y border-white/10 bg-white/[0.02]">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B0E14] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B0E14] to-transparent z-10 pointer-events-none" />

          <div className="flex w-max gap-4 animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused]">
            {[...onlineCourses, ...onlineCourses].slice(0, 20).map((c, i) => (
              <div
                key={`marquee-${c.id}-${i}`}
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 hover:border-[#FFD700]/50 transition-colors whitespace-nowrap cursor-pointer"
                onClick={() => handleEnrollCourse(c)}
              >
                <span className="w-2 h-2 rounded-full bg-[#FFD700]" />
                <span className="text-xs font-bold text-white">{c.title}</span>
                <span className="text-[10px] text-slate-400 font-mono">({c.duration})</span>
                <span className="text-xs font-extrabold text-[#FFD700] font-mono bg-white/5 px-2 py-0.5 rounded-full">
                  {c.fee}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by course title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FFD700]/60 transition-colors"
            />
          </div>

          {/* Results Count Badge */}
          <div className="text-xs text-slate-400 font-mono">
            Showing <strong className="text-white">{filteredCourses.length}</strong> of {allCatalogCourses.length} programmes
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playSound('click');
                  setActiveTab(tab.id);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  active
                    ? 'bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#E63946] text-slate-950 shadow-lg shadow-amber-500/10 font-bold'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Course Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCourses.map((course) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={course.id}
                className="group relative p-6 rounded-[24px] bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#FFD700]/50 hover:-translate-y-2 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#0056B3]/20 border border-[#0056B3]/40 text-[#5CE1E6]">
                      {course.category}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                        course.mode === 'online'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/30'
                      }`}
                    >
                      {course.mode === 'online' ? '100% ONLINE' : 'CLASSROOM LAB'}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="font-display font-extrabold text-lg text-white mb-2 group-hover:text-[#FFD700] transition-colors leading-snug">
                    {course.title}
                  </h3>

                  {/* Duration & Metadata */}
                  {course.duration && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#FFD700]" />
                      <span>Duration: {course.duration}</span>
                    </div>
                  )}
                </div>

                {/* Bottom Fee & Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">Proposed Tuition</span>
                    <span className="font-display font-black text-base text-[#FFD700]">{course.fee}</span>
                  </div>

                  <button
                    onClick={() => handleEnrollCourse(course)}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#FFD700] text-white hover:text-slate-950 font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 shadow-sm group-hover:bg-[#FFD700] group-hover:text-slate-950"
                  >
                    <span>Enrol</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-white/10">
            <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white mb-1">No courses found matching your query</h4>
            <p className="text-xs text-slate-400 mb-4">Try searching with a different keyword or select another category tab.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('All');
              }}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
