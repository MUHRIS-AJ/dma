import React, { useEffect, useState } from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Sliders, Layers } from 'lucide-react';
import { useMascot } from '../../context/MascotContext';

export const CinematicHUD: React.FC = () => {
  const { activeSection } = useMascot();
  const [timecode, setTimecode] = useState('00:00:00:00');
  const { scrollYProgress, scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Velocity-driven anamorphic liquid light flare on quick scrolls
  const smoothVelocity = useSpring(scrollVelocity, { damping: 25, stiffness: 200 });
  const flareOpacity = useTransform(smoothVelocity, [-1500, 0, 1500], [0.55, 0, 0.55]);
  const flareScaleX = useTransform(smoothVelocity, [-1500, 0, 1500], [1.4, 0.8, 1.4]);
  const flareTranslateX = useTransform(smoothVelocity, [-1500, 0, 1500], [-80, 0, 80]);

  // Generate dynamic 60fps precision timeline counter from scroll position
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      // Map 0.0-1.0 to 180 seconds of master edit timeline (180s * 60fps = 10800 frames)
      const totalFrames = Math.floor(latest * 10800);
      const frames = String(totalFrames % 60).padStart(2, '0');
      const totalSeconds = Math.floor(totalFrames / 60);
      const seconds = String(totalSeconds % 60).padStart(2, '0');
      const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
      setTimecode(`00:${minutes}:${seconds}:${frames}`);
    });
  }, [scrollYProgress]);

  // Section names mapped to master edit chapters
  const sceneLabels: Record<string, string> = {
    hero: 'CH 01 // OVERTURE',
    courses: 'CH 02 // 21 PATHWAYS',
    specializations: 'CH 03 // 7 DIGITAL PILLARS',
    approvals: 'CH 04 // STATUTORY COVENANT',
    'why-us': 'CH 05 // SMART CAMPUS',
    journey: 'CH 06 // 5-STAGE CHRONICLE',
    instructors: 'CH 07 // FACULTY GUILD',
    feedback: 'CH 08 // STUDENT VOICES',
    pricing: 'CH 09 // UNIFORM TUITION',
    faq: 'CH 10 // PROTOCOLS',
    contact: 'CH 11 // THE LAUNCH GATE',
  };

  const currentScene = sceneLabels[activeSection] || 'CH 01 // OVERTURE';

  return (
    <>
      {/* 1. Anamorphic Horizontal Liquid Flare on High-Speed Scroll */}
      <motion.div
        className="fixed top-1/2 left-0 right-0 h-[2px] pointer-events-none z-40 -translate-y-1/2 mix-blend-screen"
        style={{
          opacity: flareOpacity,
          scaleX: flareScaleX,
          x: flareTranslateX,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(92, 225, 230, 0.8) 30%, rgba(255, 215, 0, 0.95) 50%, rgba(232, 17, 45, 0.8) 70%, transparent 100%)',
          boxShadow: '0 0 35px 4px rgba(255, 215, 0, 0.7), 0 0 70px 8px rgba(92, 225, 230, 0.5)',
        }}
      />

      {/* 2. Master Edit Precision HUD Pill (Top Right) */}
      <div className="fixed top-20 right-4 sm:right-8 z-30 pointer-events-none hidden md:flex items-center gap-3">
        <div className="glass-2 px-3.5 py-1.5 rounded-full border border-white/40 dark:border-white/10 shadow-glass-sm flex items-center gap-2.5 backdrop-blur-md">
          {/* Live Precision Indicator */}
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
          </span>

          <span className="font-mono text-[11px] font-extrabold text-brand-gold tracking-widest">
            {timecode}
          </span>

          <span className="text-slate-400 text-[10px]">|</span>

          <span className="font-mono text-[10px] font-bold text-slate-700 dark:text-slate-300 tracking-wider">
            {currentScene}
          </span>

          <span className="text-slate-400 text-[10px]">|</span>

          <span className="text-[9px] font-mono font-black uppercase text-brand-red tracking-wider px-1.5 py-0.5 rounded bg-brand-red/10">
            120 HZ PROMOTION
          </span>
        </div>
      </div>

      {/* 3. Fluid Timeline Progress Scrub Bar along Left Edge */}
      <div className="fixed left-2 sm:left-4 top-1/3 bottom-1/3 w-[2px] bg-white/20 dark:bg-white/10 rounded-full z-30 pointer-events-none hidden lg:block overflow-hidden">
        <motion.div
          className="w-full bg-gradient-to-b from-brand-gold via-brand-cyan to-brand-red"
          style={{
            height: useTransform(scrollYProgress, (v) => `${v * 100}%`),
          }}
        />
      </div>
    </>
  );
};
