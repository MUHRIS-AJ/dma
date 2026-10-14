import React from 'react';

export const BackgroundGradientMesh: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base radial backdrop */}
      <div className="absolute inset-0 bg-[#F8FAFC] dark:bg-[#0A0D14] transition-colors duration-700" />

      {/* Floating Orb 1: Primary Gold Glow */}
      <div className="absolute -top-[15%] left-[10%] w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-brand-gold/25 via-amber-400/20 to-transparent blur-[120px] animate-float-slow opacity-80 dark:opacity-60" />

      {/* Floating Orb 2: Electric Cyan Glow */}
      <div className="absolute top-[35%] -right-[10%] w-[750px] h-[750px] rounded-full bg-gradient-to-br from-brand-cyan/25 via-sky-400/20 to-transparent blur-[140px] animate-float-reverse opacity-75 dark:opacity-55" />

      {/* Floating Orb 3: Crimson Accent Glow */}
      <div className="absolute top-[70%] left-[20%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-brand-red/15 via-rose-500/15 to-transparent blur-[130px] animate-float-slow opacity-60 dark:opacity-40" />

      {/* Floating Orb 4: Deep Bottom Gold Shimmer */}
      <div className="absolute -bottom-[10%] right-[15%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-brand-gold/20 via-yellow-300/15 to-transparent blur-[120px] animate-pulse-glow opacity-70 dark:opacity-50" />

      {/* Subtle Noise / Stippling Overlay for tactile cinematic look */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
