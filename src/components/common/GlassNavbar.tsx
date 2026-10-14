import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor, Volume2, VolumeX, Menu, X, ArrowUpRight, GraduationCap } from 'lucide-react';
import { useSmoothScroll } from './SmoothScroll';
import { useMascot } from '../../context/MascotContext';
import { ThemeMode } from '../../types/mascot';

export const GlassNavbar: React.FC<{
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}> = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();
  const { soundEnabled, toggleSound, playSound, setEnrollModalOpen, themeMode, setThemeMode, isDarkEffective } = useMascot();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Skill Tree', href: '#skill-tree' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Courses (65)', href: '#courses' },
    { label: 'Dimension II', href: '#dimension-2' },
    { label: 'Showcase (21)', href: '#showcase' },
    { label: 'Cinema 4K', href: '#brand-theater' },
    { label: 'Approvals', href: '#approvals' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    playSound('click');
    setMobileMenuOpen(false);
    scrollTo(href, -70);
  };

  const handleOpenEnroll = () => {
    playSound('magic');
    setEnrollModalOpen(true);
  };

  const cycleTheme = (mode: ThemeMode) => {
    playSound('click');
    setThemeMode(mode);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out flex justify-center ${
        scrolled ? 'pt-3 pb-1' : 'pt-0 pb-0'
      }`}
    >
      <div
        className={`transition-all duration-500 ease-out flex items-center justify-between ${
          scrolled
            ? 'w-[94%] max-w-7xl rounded-full px-5 py-2.5 bg-[#0B0E14]/85 dark:bg-[#0B0E14]/85 light:bg-white/85 backdrop-blur-2xl border border-[#FFD700]/40 shadow-2xl shadow-black/40'
            : 'w-full px-6 sm:px-10 py-3.5 bg-slate-950/60 dark:bg-slate-950/60 light:bg-white/80 backdrop-blur-xl border-b border-[#FFD700]/25'
        }`}
      >
        {/* Brand Crest & Title */}
        <div
          onClick={() => handleNavClick('#hero')}
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="relative w-11 h-11 rounded-full p-1 flex items-center justify-center bg-white/10 dark:bg-black/40 border border-[#FFD700]/50 shadow-md group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
            <img
              src="/logo.png"
              alt="Digitalmod Academy"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5 font-display font-black text-base sm:text-lg tracking-tight text-white dark:text-white light:text-slate-900">
              <span>DIGITAL<span className="text-[#FFD700]">MOD</span></span>
              <span className="text-[10px] font-sans font-bold tracking-widest text-[#E63946] border border-[#E63946]/40 px-1.5 py-0.2 rounded-full uppercase bg-[#E63946]/10">
                ACADEMY
              </span>
            </div>
            <p className="text-[9px] uppercase font-mono tracking-widest text-slate-400 dark:text-slate-400 light:text-slate-500 hidden sm:block">
              Learn Skills. Build Your Future.
            </p>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-0.5 bg-white/5 dark:bg-white/5 light:bg-black/5 p-1 rounded-full border border-white/10 dark:border-white/10 light:border-black/10">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="relative px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-black hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/5 transition-all duration-200 group whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-1 left-3 right-3 h-[2px] bg-gradient-to-r from-[#0056B3] via-[#E63946] to-[#FFD700] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
            </button>
          ))}
        </nav>

        {/* Controls & CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              toggleSound();
              playSound('click');
            }}
            className="w-8.5 h-8.5 rounded-full bg-white/5 border border-white/10 hover:border-white/25 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            title={soundEnabled ? 'Disable audio' : 'Enable audio'}
            aria-label="Toggle audio effects"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#FFD700]" /> : <VolumeX className="w-4 h-4 opacity-50" />}
          </button>

          {/* Tri-State Theme Selector (Light | System | Dark) */}
          <div className="flex items-center p-0.5 rounded-full bg-black/40 border border-white/15 backdrop-blur-md">
            <button
              onClick={() => cycleTheme('light')}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                themeMode === 'light'
                  ? 'bg-amber-400 text-black shadow-md font-bold scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Light Mode"
              aria-label="Switch to light mode"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => cycleTheme('system')}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                themeMode === 'system'
                  ? 'bg-blue-600 text-white shadow-md font-bold scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="System Auto Mode"
              aria-label="Switch to system theme"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => cycleTheme('dark')}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                themeMode === 'dark'
                  ? 'bg-purple-600 text-white shadow-md font-bold scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Dark Mode"
              aria-label="Switch to dark mode"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Enrol Now CTA Pill Button */}
          <button
            onClick={handleOpenEnroll}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-display font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#E63946] hover:brightness-110 shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Enrol Now</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => {
              playSound('click');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="xl:hidden w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden fixed top-20 left-4 right-4 bg-[#0B0E14]/95 backdrop-blur-3xl rounded-3xl p-6 border border-[#FFD700]/30 shadow-2xl z-50 flex flex-col gap-3"
          >
            <div className="flex flex-col gap-1 max-h-[60vh] overflow-y-auto">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2.5 rounded-xl text-left text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenEnroll();
              }}
              className="mt-2 w-full py-3 rounded-2xl bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#E63946] text-slate-950 font-display font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Enrol on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
