import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Flame, 
  Compass, 
  Layers, 
  ArrowRight, 
  GraduationCap, 
  CheckCircle2, 
  Cpu, 
  ShieldAlert,
  Zap,
  Globe2
} from 'lucide-react';
import { CurvedReveal, CosmicCurvedRibbon } from '../common/CurvedReveal';
import { useSmoothScroll } from '../common/SmoothScroll';
import { useMascot } from '../../context/MascotContext';

export const SecondHeroSection: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const { playSound, setEnrollModalOpen } = useMascot();

  const handleExploreCourses = () => {
    playSound('click');
    scrollTo('#courses', -80);
  };

  const handleEnroll = () => {
    playSound('magic');
    setEnrollModalOpen(true);
  };

  return (
    <section
      id="dimension-2"
      className="relative min-h-[90vh] py-28 px-4 sm:px-6 lg:px-8 bg-[#040609] overflow-hidden flex items-center justify-center"
    >
      {/* Background Dynamic Video Layer: cosmic_action.mp4 (xfxdg.mp4) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-30">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/media/hero2-preview.jpg"
          className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.2]"
        >
          <source src="/videos/cosmic_action.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Cosmic Gradient & Radial Overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#040609] via-transparent to-[#040609] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-radial-vignette pointer-events-none" />

      {/* Spider-Man Neon Web Curve Ribbons */}
      <CosmicCurvedRibbon />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#E63946]/20 rounded-full blur-[180px] pointer-events-none z-[1]"
      />
      <motion.div
        animate={{ scale: [1.08, 1, 1.08], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] bg-[#0056B3]/25 rounded-full blur-[170px] pointer-events-none z-[1]"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Epic Dimension II Narrative (Curved Left Reveal) */}
          <CurvedReveal direction="curve-left" className="lg:col-span-7 text-left">
            {/* Royal Harry Potter / Spider-Man Hybrid Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#E63946]/20 via-[#FFD700]/15 to-[#0056B3]/20 border border-[#FFD700]/50 backdrop-blur-xl text-xs font-bold text-[#FFD700] mb-6 shadow-lg shadow-[#FFD700]/10">
              <Zap className="w-4 h-4 text-[#FFD700] animate-bounce" />
              <span>DIMENSION II • ADVANCED PRACTICAL LABS</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] mb-6">
              Beyond The Classroom.{' '}
              <span className="bg-gradient-to-r from-[#00F0FF] via-[#FFD700] to-[#E63946] bg-clip-text text-transparent block">
                The Practical Arena.
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
              Equipped with modern computer hardware, high-speed fiber internet, and industry software suites: Digitalmod Academy at Sungawila Junction gives you the physical and virtual sandbox to build real projects, execute live digital marketing campaigns, and master advanced IT skills.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              <div className="p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#FFD700] shrink-0" />
                <span className="text-xs font-semibold text-slate-200">100% Practical Project-Driven Sprints</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00F0FF] shrink-0" />
                <span className="text-xs font-semibold text-slate-200">1-on-1 Instructor Mentorship</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#E63946] shrink-0" />
                <span className="text-xs font-semibold text-slate-200">Dual Delivery: Offline Lab & Live Online</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">Government Registered Certification</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleEnroll}
                className="px-7 py-3.5 rounded-full font-display font-black text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#E63946] hover:brightness-110 shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Reserve Lab Seat Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleExploreCourses}
                className="px-7 py-3.5 rounded-full font-display font-bold text-xs uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/20 backdrop-blur-md hover:scale-105 active:scale-95 transition-all"
              >
                <span>Browse All 65 Courses</span>
              </button>
            </div>
          </CurvedReveal>

          {/* Right Column: Floating iOS Specular Glass Portal (Curved Right Reveal) */}
          <CurvedReveal direction="curve-right" delay={0.2} className="lg:col-span-5">
            <div className="relative p-6 sm:p-8 rounded-[36px] bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-3xl border border-white/20 shadow-2xl overflow-hidden group">
              {/* Specular Glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#00F0FF]/20 rounded-full blur-3xl pointer-events-none" />

              {/* Hero 2 Visual Preview Card */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black/60 border border-white/10 mb-6 group-hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="/media/hero2-preview.jpg"
                  alt="Dimension II Lab Gateway"
                  className="w-full h-full object-cover filter contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-mono font-bold text-[#FFD700]">LAB 02 • POLONNARUWA</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-mono">
                    ACTIVE SESSIONS
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-center">
                  <div className="font-display font-black text-2xl text-[#FFD700]">65+</div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">Total Courses</div>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-center">
                  <div className="font-display font-black text-2xl text-[#00F0FF]">1,200+</div>
                  <div className="text-[10px] font-mono uppercase text-slate-400">Graduates</div>
                </div>
              </div>

              {/* Quick WhatsApp Inquiry */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Direct WhatsApp Hotline</div>
                  <div className="text-[11px] font-mono text-emerald-400">+94 78 445 0088</div>
                </div>
                <button
                  onClick={handleEnroll}
                  className="px-3.5 py-1.5 rounded-full bg-emerald-500 text-black font-bold text-[11px] hover:brightness-110 transition-all"
                >
                  Chat Now
                </button>
              </div>
            </div>
          </CurvedReveal>
        </div>
      </div>
    </section>
  );
};
