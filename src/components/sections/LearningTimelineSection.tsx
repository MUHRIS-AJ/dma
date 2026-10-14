import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Milestone, 
  Sparkles, 
  Compass, 
  Code2, 
  Layers, 
  Award, 
  Rocket, 
  ChevronRight, 
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight
} from 'lucide-react';
import { CurvedReveal, CosmicCurvedRibbon } from '../common/CurvedReveal';
import { useMascot } from '../../context/MascotContext';

interface TimelineStage {
  id: string;
  step: string;
  timeframe: string;
  title: string;
  badge: string;
  accent: 'blue' | 'gold' | 'red' | 'purple' | 'cyan';
  icon: React.ReactNode;
  summary: string;
  deliverables: string[];
  tools: string[];
  spiderVibe: string;
}

const timelineStages: TimelineStage[] = [
  {
    id: 'stage-1',
    step: 'Phase 01',
    timeframe: 'Weeks 1 – 2',
    title: 'Digital Genesis & System Foundations',
    badge: 'Foundation Core',
    accent: 'blue',
    icon: <Compass className="w-5 h-5 text-cyan-400" />,
    summary:
      'Immerse in modern computing architecture, terminal workflows, operating system mastery, and digital literacy with hands-on lab orientation.',
    deliverables: [
      'Workstation & Dev Environment Configuration',
      'Operating Systems & Cloud Drive Data Hygiene',
      'Computer Architecture & Networking Fundamentals',
    ],
    tools: ['Windows 11 Pro', 'Terminal & PowerShell', 'Cloud Workspace', 'Hardware Lab'],
    spiderVibe: 'Sensory Calibration & Base Web Assembly',
  },
  {
    id: 'stage-2',
    step: 'Phase 02',
    timeframe: 'Month 1 – 2',
    title: 'Discipline Immersion & Practical Drills',
    badge: 'Deep Immersion',
    accent: 'gold',
    icon: <Code2 className="w-5 h-5 text-amber-400" />,
    summary:
      'Deep dive into your chosen path (Coding, Graphic Design, Digital Marketing, Cyber Security, or AI Productivity) through direct practical lab exercises.',
    deliverables: [
      'Comprehensive Tool Mastery & Daily Assignments',
      'Production-Ready UI / Vector / Code Prototypes',
      'Weekly Instructor 1-on-1 Code & Design Reviews',
    ],
    tools: ['VS Code / Python', 'Adobe Suite / Figma', 'Canva Pro', 'Cyber Sec VMs'],
    spiderVibe: 'Refining The Precision Web-Spinning Arts',
  },
  {
    id: 'stage-3',
    step: 'Phase 03',
    timeframe: 'Month 3 – 4',
    title: 'Live Client Agency Simulation',
    badge: 'Real-World Production',
    accent: 'red',
    icon: <Layers className="w-5 h-5 text-rose-400" />,
    summary:
      'Step out of theory into our simulated digital agency environment. Tackle live client briefs, tight turnaround sprints, and teamwork pipelines.',
    deliverables: [
      'End-to-End Client Project Delivery',
      'Collaborative Agile Sprint Management',
      'Cross-Disciplinary Team Execution',
    ],
    tools: ['Git & GitHub', 'Meta Business Suite', 'Premiere & After Effects', 'Trello/Jira'],
    spiderVibe: 'High-Velocity City Sprints & Team Synergy',
  },
  {
    id: 'stage-4',
    step: 'Phase 04',
    timeframe: 'Month 5 – 6',
    title: 'Portfolio Curation & Defense Viva',
    badge: 'Industry Readiness',
    accent: 'purple',
    icon: <Award className="w-5 h-5 text-purple-400" />,
    summary:
      'Curate a world-class public portfolio on Behance, GitHub, or LinkedIn. Present and defend your capstone project before our academic review panel.',
    deliverables: [
      '3 Flagship Capstone Case Studies',
      'Live Panel Presentation & Technical Viva',
      'Polished Resume & Employer-Ready Profiles',
    ],
    tools: ['GitHub Pages', 'Behance / Dribbble', 'LinkedIn Creator', 'PDF Casebook'],
    spiderVibe: 'Crafting The Golden Hero Portfolio Armor',
  },
  {
    id: 'stage-5',
    step: 'Phase 05',
    timeframe: 'Graduation & Beyond',
    title: 'Official Credentialing & Career Liftoff',
    badge: 'Lifetime Network',
    accent: 'cyan',
    icon: <Rocket className="w-5 h-5 text-emerald-400" />,
    summary:
      'Receive your government-approved, verified certificate with unique QR code verification. Enter our lifetime alumni channel for job & freelance leads.',
    deliverables: [
      'Digitalmod Academy Verified Certificate',
      'Direct Industry & Freelance Placement Referrals',
      'Lifetime Access to Updated Curriculum & Community',
    ],
    tools: ['Alumni VIP Portal', 'Freelance Hubs', 'Global Job Boards', 'WhatsApp Circle'],
    spiderVibe: 'Leaping Into The Global Tech Skyline',
  },
];

export const LearningTimelineSection: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>('stage-1');
  const { playSound, setEnrollModalOpen } = useMascot();

  const activeStage = timelineStages.find((s) => s.id === activeStageId) || timelineStages[0];

  return (
    <section
      id="timeline"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#070A0F] dark:bg-[#070A0F] light:bg-slate-100 overflow-hidden"
    >
      {/* Background Cosmic Energy Ribbons */}
      <CosmicCurvedRibbon />
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-[#0056B3]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-[500px] h-[500px] bg-[#E63946]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Curved Reveal */}
        <CurvedReveal direction="curve-up" className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 dark:bg-white/5 light:bg-black/5 border border-[#FFD700]/40 backdrop-blur-md text-xs font-bold text-[#FFD700] mb-4 shadow-sm">
            <Milestone className="w-4 h-4 text-[#FFD700]" />
            <span>PROGRESSION ARCHITECTURE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white dark:text-white light:text-slate-950 tracking-tight leading-tight mb-5">
            The Academic & Practical{' '}
            <span className="bg-gradient-to-r from-[#FFD700] via-amber-300 to-[#E63946] bg-clip-text text-transparent">
              Timeline
            </span>
          </h2>
          <p className="text-slate-400 dark:text-slate-400 light:text-slate-600 text-sm sm:text-base leading-relaxed">
            From your very first lesson to client-ready execution and accredited graduation: follow our proven 5-stage transformation formula.
          </p>
        </CurvedReveal>

        {/* Interactive Curved Stage Navigator */}
        <CurvedReveal direction="curve-down" delay={0.1} className="mb-14">
          <div className="relative p-2 rounded-2xl sm:rounded-full bg-white/[0.04] dark:bg-white/[0.04] light:bg-white/80 backdrop-blur-2xl border border-white/10 dark:border-white/10 light:border-black/10 shadow-2xl flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 overflow-x-auto no-scrollbar">
            {timelineStages.map((stage, idx) => {
              const isSelected = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    playSound('click');
                    setActiveStageId(stage.id);
                  }}
                  className={`flex-1 min-w-[140px] px-4 py-3 rounded-xl sm:rounded-full text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 relative ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#0056B3] to-[#00F0FF] text-white shadow-lg shadow-cyan-500/25 scale-[1.02]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    isSelected ? 'bg-white text-slate-950 font-black' : 'bg-white/10 text-slate-400'
                  }`}>
                    0{idx + 1}
                  </span>
                  <span className="truncate">{stage.timeframe}</span>
                </button>
              );
            })}
          </div>
        </CurvedReveal>

        {/* Stage Highlight Display with Curved Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Stage Visual Card (Curved Left Reveal) */}
          <CurvedReveal
            direction="curve-left"
            delay={0.15}
            className="lg:col-span-5 p-8 rounded-[32px] bg-gradient-to-br from-white/[0.07] to-white/[0.02] dark:from-white/[0.07] dark:to-white/[0.02] light:from-white light:to-slate-50 backdrop-blur-3xl border border-[#FFD700]/30 shadow-2xl flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Glowing Corner Accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0056B3]/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/30">
                  {activeStage.step}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-[#00F0FF]" />
                  {activeStage.timeframe}
                </span>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-white/10 dark:bg-black/40 border border-white/20 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
                {activeStage.icon}
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-white dark:text-white light:text-slate-950 mb-3 leading-snug">
                {activeStage.title}
              </h3>

              <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 text-sm leading-relaxed mb-6">
                {activeStage.summary}
              </p>

              {/* Spider-Man / Cosmic Hero Tone Badge */}
              <div className="p-3.5 rounded-2xl bg-[#E63946]/10 border border-[#E63946]/30 mb-6 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E63946] animate-ping" />
                <div className="text-xs font-semibold text-slate-200">
                  <span className="text-[#E63946] font-bold">Kinetic Objective:</span> {activeStage.spiderVibe}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                playSound('magic');
                setEnrollModalOpen(true);
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#E63946] text-slate-950 font-display font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-amber-500/20 active:scale-98 transition-all"
            >
              <span>Enrol For Next Cohort</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </CurvedReveal>

          {/* Right Column: Deliverables & Tech Stack (Curved Right Reveal) */}
          <CurvedReveal
            direction="curve-right"
            delay={0.2}
            className="lg:col-span-7 flex flex-col gap-6 justify-between"
          >
            {/* Core Milestones Box */}
            <div className="p-8 rounded-[32px] bg-white/[0.04] dark:bg-white/[0.04] light:bg-white backdrop-blur-2xl border border-white/10 dark:border-white/10 light:border-black/10 shadow-xl">
              <h4 className="font-display font-bold text-lg text-white dark:text-white light:text-slate-900 mb-5 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00F0FF]" />
                <span>Core Milestones & Hand-In Deliverables</span>
              </h4>

              <div className="space-y-3.5">
                {activeStage.deliverables.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-2xl bg-white/[0.03] dark:bg-white/[0.03] light:bg-slate-50 border border-white/5 dark:border-white/5 light:border-slate-200 flex items-start gap-3.5 group hover:border-[#FFD700]/40 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0056B3]/30 border border-[#0056B3] flex items-center justify-center text-cyan-400 text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm font-medium text-slate-200 dark:text-slate-200 light:text-slate-800 leading-snug">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tools & Environment Badges */}
            <div className="p-6 rounded-[28px] bg-white/[0.03] dark:bg-white/[0.03] light:bg-white backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-black/10 shadow-lg">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                <span>Industry Tools & Production Platforms</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeStage.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/15 dark:border-white/15 light:border-slate-300 text-slate-200 dark:text-slate-200 light:text-slate-800"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </CurvedReveal>
        </div>
      </div>
    </section>
  );
};
