import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, GraduationCap, ChevronRight, Sparkles, Compass } from 'lucide-react';
import { useSmoothScroll } from '../common/SmoothScroll';
import { useMascot } from '../../context/MascotContext';

interface RoadmapStep {
  step: string;
  level: string;
  duration: string;
  outcome: string;
  description: string;
  color: string;
  accent: string;
  badge: string;
}

const steps: RoadmapStep[] = [
  {
    step: '01',
    level: 'Certificate',
    duration: '2 – 3 Months',
    outcome: 'Foundational Knowledge & Practical Literacy',
    description: 'Master computer fundamentals, office suites, digital marketing, or language proficiencies through hands-on exercises.',
    color: '#0056B3',
    accent: 'from-[#0056B3] to-blue-400',
    badge: 'ENTRY LEVEL',
  },
  {
    step: '02',
    level: 'Diploma',
    duration: '6 Months',
    outcome: 'Professional Competence & Applied Projects',
    description: 'Build comprehensive technical competence in Graphic Design, Web Development, Cyber Security, or IT Administration.',
    color: '#E63946',
    accent: 'from-[#E63946] to-rose-400',
    badge: 'PROFESSIONAL',
  },
  {
    step: '03',
    level: 'Higher National Diploma (HND)',
    duration: '1 Year',
    outcome: 'Advanced Technical Mastery & Industry Readiness',
    description: 'In-depth specialization in Computing and Software Engineering with enterprise-ready architecture and portfolio development.',
    color: '#FFD700',
    accent: 'from-[#FFD700] to-amber-300',
    badge: 'ADVANCED',
  },
  {
    step: '04',
    level: "Bachelor's Degree",
    duration: 'Undergraduate Pathway',
    outcome: 'Academic Degree & Global Opportunities',
    description: 'Articulation pathway towards international Bachelor of Science and ICT Honours qualifications in partnership with universities.',
    color: '#10B981',
    accent: 'from-emerald-500 to-teal-300',
    badge: 'DEGREE PATH',
  },
  {
    step: '05',
    level: "Master's / PhD",
    duration: 'Postgraduate Research',
    outcome: 'Specialist Leadership & Academic Excellence',
    description: 'Advanced strategic digital consulting, AI governance, research methodologies, and technological leadership.',
    color: '#8B5CF6',
    accent: 'from-purple-500 to-indigo-300',
    badge: 'EXECUTIVE',
  },
];

export const AcademicRoadmapSection: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const { playSound, setEnrollModalOpen } = useMascot();

  const handleExplore = () => {
    playSound('click');
    scrollTo('#courses', -80);
  };

  const handleEnroll = () => {
    playSound('magic');
    setEnrollModalOpen(true);
  };

  return (
    <section id="roadmap" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#0B0E14] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#0056B3]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#E63946]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#FFD700]/30 text-xs font-semibold text-[#FFD700] mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>PROGRESSIVE QUALIFICATIONS</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight mb-4">
            Your Academic <span className="bg-gradient-to-r from-[#FFD700] via-[#E63946] to-[#0056B3] bg-clip-text text-transparent">Roadmap</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From your very first computer lesson to advanced degree pathways — structured learning milestones designed to elevate your career confidence every step of the way.
          </p>
        </div>

        {/* Desktop 5-Stage Curved Roadmap */}
        <div className="relative hidden xl:block mb-12 py-10">
          {/* Curved SVG Connector Line with Animated Stroke */}
          <svg
            className="absolute top-28 left-0 w-full h-40 pointer-events-none z-0"
            viewBox="0 0 1200 160"
            fill="none"
          >
            <defs>
              <linearGradient id="roadmapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0056B3" />
                <stop offset="35%" stopColor="#E63946" />
                <stop offset="65%" stopColor="#FFD700" />
                <stop offset="85%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <path
              d="M 60 80 Q 300 10, 600 80 T 1140 80"
              stroke="url(#roadmapGradient)"
              strokeWidth="4"
              strokeDasharray="8 8"
              className="animate-[dash_30s_linear_infinite]"
            />
          </svg>

          {/* 5 Milestone Nodes & Cards */}
          <div className="grid grid-cols-5 gap-6 relative z-10">
            {steps.map((item, index) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Pulsing Energy Node */}
                <div className="relative mb-8">
                  {/* Outer Pulsing Ring 1 */}
                  <span
                    className="absolute -inset-2 rounded-full opacity-60 animate-ping [animation-duration:2.5s]"
                    style={{ backgroundColor: item.color }}
                  />
                  {/* Outer Pulsing Ring 2 */}
                  <span
                    className="absolute -inset-4 rounded-full opacity-30 animate-pulse [animation-duration:3s]"
                    style={{ backgroundColor: item.color }}
                  />
                  {/* Node Circle */}
                  <div
                    className="relative w-16 h-16 rounded-full bg-[#05070A] border-2 flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-115 group-hover:rotate-6 cursor-pointer"
                    style={{ borderColor: item.color }}
                  >
                    <GraduationCap className="w-7 h-7 text-white" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900 border border-white/20 text-[10px] font-mono font-bold text-white flex items-center justify-center">
                      {item.step}
                    </span>
                  </div>
                </div>

                {/* Floating Glassmorphism Card */}
                <div className="w-full p-6 rounded-[2.5rem] bg-white/[0.04] backdrop-blur-xl border border-white/10 group-hover:border-[#FFD700]/50 group-hover:-translate-y-2.5 transition-all duration-500 shadow-xl flex flex-col justify-between min-h-[260px] text-left">
                  <div>
                    <span
                      className="text-[9px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full text-white inline-block mb-3"
                      style={{ backgroundColor: `${item.color}33`, borderColor: `${item.color}66` }}
                    >
                      {item.badge}
                    </span>
                    <h3 className="font-display font-extrabold text-lg text-white mb-1 group-hover:text-[#FFD700] transition-colors">
                      {item.level}
                    </h3>
                    <p className="text-xs font-semibold text-[#FFD700] mb-2">{item.duration}</p>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={handleExplore}
                    className="mt-4 pt-3 border-t border-white/10 text-xs font-bold text-slate-300 group-hover:text-white flex items-center justify-between w-full transition-colors"
                  >
                    <span>Explore Courses</span>
                    <ChevronRight className="w-4 h-4 text-[#FFD700] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Timeline */}
        <div className="xl:hidden flex flex-col gap-6 relative">
          <div className="absolute top-4 bottom-4 left-6 w-0.5 bg-gradient-to-b from-[#0056B3] via-[#E63946] to-[#FFD700]" />

          {steps.map((item, index) => (
            <motion.div
              key={item.level}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-16 group"
            >
              {/* Node Icon on vertical line */}
              <div
                className="absolute left-2.5 top-5 w-8 h-8 rounded-full bg-[#05070A] border-2 flex items-center justify-center shadow-lg -translate-x-1/2"
                style={{ borderColor: item.color }}
              >
                <GraduationCap className="w-4 h-4 text-white" />
              </div>

              {/* Card */}
              <div className="p-6 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-[#FFD700]/50 transition-all shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[9px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: `${item.color}33` }}
                  >
                    STAGE {item.step} · {item.badge}
                  </span>
                  <span className="text-xs font-semibold text-[#FFD700]">{item.duration}</span>
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-2">{item.level}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">{item.description}</p>
                <button
                  onClick={handleExplore}
                  className="text-xs font-bold text-[#FFD700] flex items-center gap-1 hover:underline"
                >
                  <span>View Programmes</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
