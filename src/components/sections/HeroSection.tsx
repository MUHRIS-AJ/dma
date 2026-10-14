import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  GraduationCap, 
  Award, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  BookOpen, 
  Clock, 
  Users,
  Compass,
  Layers,
  Zap
} from 'lucide-react';
import { useSmoothScroll } from '../common/SmoothScroll';
import { useMascot } from '../../context/MascotContext';
import { CurvedReveal, CosmicCurvedRibbon } from '../common/CurvedReveal';

export const HeroSection: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const { playSound, setEnrollModalOpen } = useMascot();
  const [heroMode, setHeroMode] = useState<'hero1' | 'hero2'>('hero1');

  const handleExplore = () => {
    playSound('click');
    scrollTo('#courses', -80);
  };

  const handleEnroll = () => {
    playSound('magic');
    setEnrollModalOpen(true);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-36 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#05070A] dark:bg-[#05070A] light:bg-slate-100"
    >
      {/* Background Layer 1: High-Definition Video Loop (Hero 1 vs Hero 2 switchable) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-45">
        <video
          key={heroMode}
          autoPlay
          loop
          muted
          playsInline
          poster={heroMode === 'hero1' ? '/media/hero1-preview.jpg' : '/media/hero2-preview.jpg'}
          className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.15]"
        >
          {heroMode === 'hero1' ? (
            <>
              <source src="/media/hero-1080.mp4" type="video/mp4" />
              <source src="/videos/hero_background.mp4" type="video/mp4" />
            </>
          ) : (
            <>
              <source src="/videos/brand_reveal_4k.mp4" type="video/mp4" />
              <source src="/videos/cosmic_action.mp4" type="video/mp4" />
            </>
          )}
        </video>
      </div>

      {/* Background Layer 2: Cinematic Gradient Overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#05070A]/80 via-[#0B0E14]/65 to-[#0B0E14] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-radial-vignette pointer-events-none" />

      {/* Cosmic Curved Ribbons */}
      <CosmicCurvedRibbon />

      {/* Background Layer 3: Vertical Floating Blurred Ambient Orbs */}
      <motion.div
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-1/4 w-[480px] h-[480px] bg-[#0056B3]/25 rounded-full blur-[140px] pointer-events-none z-[1]"
      />
      <motion.div
        animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-1/3 right-1/4 w-[420px] h-[420px] bg-[#E63946]/20 rounded-full blur-[130px] pointer-events-none z-[1]"
      />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-[#FFD700]/10 rounded-full blur-[120px] pointer-events-none z-[1]" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full text-center my-auto">
        {/* Dual Hero Mode Selector (Cosmic Odyssey / Quantum Citadel) */}
        <div className="flex justify-center mb-6">
          <div className="p-1 rounded-full bg-black/50 border border-white/20 backdrop-blur-xl flex items-center gap-1">
            <button
              onClick={() => {
                playSound('click');
                setHeroMode('hero1');
              }}
              className={`px-3.5 py-1 rounded-full text-[11px] font-bold font-mono uppercase transition-all flex items-center gap-1.5 ${
                heroMode === 'hero1'
                  ? 'bg-gradient-to-r from-[#0056B3] to-[#00F0FF] text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-[#FFD700]" />
              <span>Hero I: Cosmic Core</span>
            </button>
            <button
              onClick={() => {
                playSound('click');
                setHeroMode('hero2');
              }}
              className={`px-3.5 py-1 rounded-full text-[11px] font-bold font-mono uppercase transition-all flex items-center gap-1.5 ${
                heroMode === 'hero2'
                  ? 'bg-gradient-to-r from-[#E63946] to-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3 h-3 text-[#FFD700]" />
              <span>Hero II: Quantum 4K</span>
            </button>
          </div>
        </div>

        {/* Accreditation Status Badge with Curved Entrance */}
        <CurvedReveal direction="curve-down" delay={0.05} className="inline-block mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-[#FFD700]/40 backdrop-blur-md shadow-lg shadow-[#FFD700]/5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFD700]" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-slate-200">
              Approved & Registered Institution <span className="text-[#FFD700] mx-1">•</span> Sungawila Junction, Polonnaruwa
            </span>
          </div>
        </CurvedReveal>

        {/* Master Heading with Curved Left Arc */}
        <CurvedReveal direction="curve-left" delay={0.1}>
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white dark:text-white light:text-slate-950 leading-[1.08] mb-6 max-w-5xl mx-auto">
            Learn Skills.{' '}
            <span className="bg-gradient-to-r from-[#FFD700] via-amber-300 to-[#E63946] bg-clip-text text-transparent block sm:inline">
              Build Your Future.
            </span>
          </h1>
        </CurvedReveal>

        {/* Gradient Keywords with Curved Right Arc */}
        <CurvedReveal direction="curve-right" delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-wider mb-6">
            <span className="text-[#0056B3] bg-[#0056B3]/10 px-3 py-1 rounded-full border border-[#0056B3]/30">
              Practical IT Education
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-[#FFD700] bg-[#FFD700]/10 px-3 py-1 rounded-full border border-[#FFD700]/30">
              Professional Skills
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-[#E63946] bg-[#E63946]/10 px-3 py-1 rounded-full border border-[#E63946]/30">
              Career Development
            </span>
          </div>
        </CurvedReveal>

        {/* Supporting Narrative with Curved Up Arc */}
        <CurvedReveal direction="curve-up" delay={0.2}>
          <p className="text-slate-300 dark:text-slate-300 light:text-slate-700 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            Digitalmod Academy is dedicated to developing digital literacy, technical expertise, and career competence through structured lessons and hands-on classroom activities. Explore <strong>30 Online Certificates</strong> and <strong>35 Departmental IT programmes</strong> designed for students, school leavers, and working professionals.
          </p>
        </CurvedReveal>

        {/* Dual Primary Call-to-Actions with Cosmic Spiral Arc */}
        <CurvedReveal direction="cosmic-spiral" delay={0.25} className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-16">
          <button
            onClick={handleEnroll}
            className="group px-7 py-3.5 rounded-full font-display font-extrabold text-sm uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#E63946] shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5"
          >
            <GraduationCap className="w-5 h-5 text-slate-950" />
            <span>Enrol on WhatsApp</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleExplore}
            className="px-7 py-3.5 rounded-full font-display font-bold text-sm uppercase tracking-wider text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-xl hover:border-[#0056B3]/60 shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-[#0056B3]" />
            <span>Explore 65 Courses</span>
          </button>
        </CurvedReveal>

        {/* Responsive Statistics Grid with Alternating Curved Entrances */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <CurvedReveal direction="curve-left" delay={0.3}>
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-[#FFD700]/40 transition-all text-center">
              <div className="w-9 h-9 rounded-xl bg-[#FFD700]/15 text-[#FFD700] flex items-center justify-center mx-auto mb-2">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">30</div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Online Certificates</p>
            </div>
          </CurvedReveal>

          <CurvedReveal direction="curve-down" delay={0.35}>
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-[#0056B3]/50 transition-all text-center">
              <div className="w-9 h-9 rounded-xl bg-[#0056B3]/20 text-[#0056B3] flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">35</div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Departmental Modules</p>
            </div>
          </CurvedReveal>

          <CurvedReveal direction="curve-up" delay={0.4}>
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-[#E63946]/50 transition-all text-center">
              <div className="w-9 h-9 rounded-xl bg-[#E63946]/15 text-[#E63946] flex items-center justify-center mx-auto mb-2">
                <Clock className="w-5 h-5" />
              </div>
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">100%</div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Practical Sessions</p>
            </div>
          </CurvedReveal>

          <CurvedReveal direction="curve-right" delay={0.45}>
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-emerald-500/50 transition-all text-center">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                <Award className="w-5 h-5" />
              </div>
              <div className="font-display font-extrabold text-xl sm:text-2xl text-white">LKR 3,500+</div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Transparent Tuition</p>
            </div>
          </CurvedReveal>
        </div>
      </div>

      {/* Elegant SVG Wave Separator */}
      <div className="relative z-10 w-full overflow-hidden leading-none mt-12">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 text-[#0B0E14] fill-current"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
};
