import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Users, Laptop, Zap, CheckCircle2, Sparkles, Building2 } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

export const WhyUsSection: React.FC = () => {
  return (
    <section id="why-us" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-1 border border-white/40 dark:border-white/10 text-brand-gold text-xs font-semibold mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>THE DIGITAL MOD ADVANTAGE</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-brand-ink dark:text-white tracking-tight mb-4">
            Why Hundreds of Students Choose{' '}
            <span className="text-gradient-gold">Digital MOD</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            We reject the outdated tuition model of passive rote memorization. At Digital MOD Academy, 
            every student receives active hands-on computer experience under world-recognized academic guidance.
          </p>
        </div>

        {/* Apple-Style Bento Grid with Real Campus & Lab Photography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Bento Tile 1: Smart Campus Lab (Span 7 cols) */}
          <div className="lg:col-span-7">
            <GlassCard level={3} glow="gold" className="p-0 h-full flex flex-col justify-between overflow-hidden group">
              <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80"
                  alt="Digitalmod Academy Smart Computer Lab"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-brand-gold text-xs font-mono font-bold border border-brand-gold/30">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>112 Sungavila, Polonnaruwa</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-brand-ink dark:text-white mb-3">
                    Modern Smart Campus & Hands-On Workstations
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                    Our academy features air-conditioned physical computer workstations, high-speed fiber internet, 
                    and interactive projection displays. Islandwide students join through synchronized Zoom lectures 
                    with live screen sharing and recording portals.
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                      <span>Dedicated Workstations</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                      <span>Full LMS Recording Vault</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                      <span>Air-Conditioned Study Labs</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                      <span>Model Exam Test Center</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Open 7 Days a Week</span>
                  <span className="text-brand-gold font-bold">Physical & Online Admissions Open</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Bento Tile 2: UBE Accreditation (Span 5 cols) */}
          <div className="lg:col-span-5">
            <GlassCard level={2} glow="cyan" className="p-0 h-full flex flex-col justify-between overflow-hidden group">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80"
                  alt="UBE Recognized Global Certification"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-brand-cyan text-xs font-mono font-bold border border-brand-cyan/30">
                  <Award className="w-3.5 h-3.5" />
                  <span>UBE & CCB Approved</span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl text-brand-ink dark:text-white mb-2">
                    Universal Bureau of Education (UBE)
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    Awarded intercontinental academic recognition in October 2024. 
                    Every Digitalmod graduate receives official, verifiable certificates backed by the academy's 
                    registered transcript system.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 text-xs text-brand-cyan font-bold pt-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Internationally Aligned IT Curriculum</span>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Bento Tile 3: 1-on-1 Mentorship (Span 5 cols) */}
          <div className="lg:col-span-5">
            <GlassCard level={2} className="p-0 h-full flex flex-col justify-between overflow-hidden group">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80"
                  alt="Personal Mentorship"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-brand-gold text-xs font-mono font-bold border border-brand-gold/30">
                  <Users className="w-3.5 h-3.5" />
                  <span>1-on-1 Mentorship</span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl text-brand-ink dark:text-white mb-2">
                    Personalized Coaching by Suhith Sir
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    Never get lost in a crowd. Our founder, <strong>Mohomed Suhith (B.ICT Hons)</strong>, 
                    personally reviews assignments, assesses code repositories, and conducts individualized problem-solving sessions.
                  </p>
                </div>

                <div className="text-xs text-slate-500 font-mono">
                  98% Student Distinction & Completion Rate
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Bento Tile 4: Coding & 3D Web Portfolios (Span 7 cols) */}
          <div className="lg:col-span-7">
            <GlassCard level={2} glow="red" className="p-0 h-full flex flex-col justify-between overflow-hidden group">
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1000&auto=format&fit=crop&q=80"
                  alt="Practical Industry Web Portfolios"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-brand-red text-xs font-mono font-bold border border-brand-red/30">
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Job-Ready Practical Skills</span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl text-brand-ink dark:text-white mb-2">
                    Real-World Coding, Design & 3D Portfolios
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    We bridge school ICT with high-paying modern digital crafts: Python, Adobe Suite, Figma, 
                    Three.js, Web Security, and AI Productivity Tools. Every student graduates with tangible, 
                    client-ready work.
                  </p>
                </div>

                <div className="text-xs text-brand-red font-bold font-mono">
                  Guaranteed Portfolio Deliverables for Every Level • Rs. 5,000 Uniform
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
