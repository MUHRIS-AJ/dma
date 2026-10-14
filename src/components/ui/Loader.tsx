import React, { useEffect, useState } from 'react';

export const Loader: React.FC = () => {
  const [faded, setFaded] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFaded(true);
            setTimeout(() => setHidden(true), 800);
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 20) + 10;
      });
    }, 150);

    // Guaranteed fallback timeout so user is never trapped
    const fallback = setTimeout(() => {
      setProgress(100);
      setFaded(true);
      setTimeout(() => setHidden(true), 800);
    }, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(fallback);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05070A] transition-all duration-700 ease-out select-none ${
        faded ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#0056B3]/25 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#E63946]/20 rounded-full blur-[120px] pointer-events-none animate-pulse delay-700" />
      <div className="absolute center w-72 h-72 bg-[#FFD700]/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Center Cinematic Emblem Card */}
      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Glowing Multi-Color Ring Halo */}
        <div className="relative mb-6">
          <div className="absolute -inset-2 bg-gradient-to-r from-[#0056B3] via-[#E63946] to-[#FFD700] rounded-full blur-md opacity-70 animate-spin [animation-duration:8s]" />
          <div className="relative w-24 h-24 rounded-full bg-[#0B0E14]/90 p-2 border border-white/20 shadow-2xl flex items-center justify-center backdrop-blur-xl">
            <img
              src="/logo.png"
              alt="Digitalmod Academy"
              className="w-full h-full object-contain filter drop-shadow-md animate-bounce [animation-duration:2.5s]"
            />
          </div>
          <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-[#FFD700] to-amber-500 text-[#05070A] font-black text-[9px] px-2 py-0.5 rounded-full shadow-lg border border-black/20">
            OFFICIAL
          </span>
        </div>

        {/* Title & Brand */}
        <h2 className="text-2xl font-black tracking-widest text-white font-display mb-1.5 uppercase">
          DIGITAL<span className="text-[#FFD700]">MOD</span> ACADEMY
        </h2>
        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400 font-medium mb-8">
          Learn Skills. Build Your Future.
        </p>

        {/* Shimmer Progress Bar */}
        <div className="w-64 h-2 bg-slate-900/90 rounded-full overflow-hidden border border-white/10 p-[1px] shadow-inner relative">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#0056B3] via-[#E63946] to-[#FFD700] transition-all duration-300 ease-out relative"
            style={{ width: `${Math.min(100, progress)}%` }}
          >
            {/* Shimmer traveling wave */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
        </div>

        <div className="flex items-center justify-between w-64 mt-2 text-[10px] font-mono text-slate-500">
          <span>INITIALIZING</span>
          <span className="text-[#FFD700] font-semibold">{Math.min(100, progress)}%</span>
        </div>
      </div>
    </div>
  );
};
