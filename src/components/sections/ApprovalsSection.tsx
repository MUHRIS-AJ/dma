import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, CheckCircle, FileText, Lock, Globe, Building, Sparkles } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

export const ApprovalsSection: React.FC = () => {
  const commitments = [
    'Quality-focused education',
    'Structured course programmes',
    'Practical learning & smart labs',
    'Qualified and certified instructors',
    'Continuous student assessment',
    'Professional & verifiable certification',
    'Transparent academic procedures',
    'Continuous skills development',
  ];

  return (
    <section id="approvals" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-1 border border-brand-gold/40 text-brand-gold text-xs font-bold mb-4 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span>GOVERNMENT REGISTERED & INTERNATIONALLY APPROVED</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-brand-ink dark:text-white tracking-tight mb-4">
            Approved & Registered{' '}
            <span className="text-gradient-gold">Institution</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            Digitalmod Academy is an approved and government-registered educational and professional 
            training institute in Sri Lanka, committed to delivering structured, practical, and career-focused education.
          </p>
        </div>

        {/* 3 Main Approvals Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* UBE Approval Card */}
          <GlassCard level={3} glow="gold" className="p-8 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-gold/20 text-brand-gold flex items-center justify-center mb-6 shadow-sm">
                <Globe className="w-7 h-7" />
              </div>
              <div className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/15 px-3 py-1 rounded-full mb-3">
                Global Standard
              </div>
              <h3 className="font-display font-black text-2xl text-brand-ink dark:text-white mb-3">
                UBE Approved
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Our academy operates with <strong>Universal Bureau of Education (UBE)</strong> approval 
                for its educational and professional training programmes, ensuring international quality benchmarks.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20 dark:border-white/10 flex items-center gap-2 text-xs font-semibold text-brand-gold">
              <CheckCircle className="w-4 h-4" />
              <span>Intercontinental Accreditation</span>
            </div>
          </GlassCard>

          {/* CCB Approval Card */}
          <GlassCard level={3} glow="cyan" className="p-8 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-cyan/20 text-brand-cyan flex items-center justify-center mb-6 shadow-sm">
                <Building className="w-7 h-7" />
              </div>
              <div className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-brand-cyan bg-brand-cyan/15 px-3 py-1 rounded-full mb-3">
                Professional Body
              </div>
              <h3 className="font-display font-black text-2xl text-brand-ink dark:text-white mb-3">
                CCB Approved
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Digitalmod Academy is approved by <strong>CCB</strong> for its relevant educational and 
                professional training activities, validating technical and vocational training rigor.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20 dark:border-white/10 flex items-center gap-2 text-xs font-semibold text-brand-cyan">
              <CheckCircle className="w-4 h-4" />
              <span>Vocational Competence Approved</span>
            </div>
          </GlassCard>

          {/* Government Registered Card */}
          <GlassCard level={3} glow="red" className="p-8 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-red/20 text-brand-red flex items-center justify-center mb-6 shadow-sm">
                <Award className="w-7 h-7" />
              </div>
              <div className="inline-block text-[11px] font-mono font-bold uppercase tracking-wider text-brand-red bg-brand-red/15 px-3 py-1 rounded-full mb-3">
                Legal Authority
              </div>
              <h3 className="font-display font-black text-2xl text-brand-ink dark:text-white mb-3">
                Sri Lankan Government Registered
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Digitalmod Academy is a legally registered educational institution in Sri Lanka and operates in 
                full accordance with applicable national registration and regulatory statutory requirements.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20 dark:border-white/10 flex items-center gap-2 text-xs font-semibold text-brand-red">
              <CheckCircle className="w-4 h-4" />
              <span>Full Statutory Compliance</span>
            </div>
          </GlassCard>
        </div>

        {/* Certificate Recognition & Official Commitment Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Certificate Verification Details */}
          <div className="lg:col-span-7">
            <GlassCard level={2} className="p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-brand-gold" />
                <h3 className="font-display font-bold text-2xl text-brand-ink dark:text-white">
                  Official Certificate & Academic Recognition
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                Students who successfully complete the requirements of their selected programme will receive 
                an official <strong>Digitalmod Academy Certificate</strong>.
              </p>
              <div className="p-4 rounded-2xl bg-white/30 dark:bg-black/30 border border-white/40 dark:border-white/10 mb-6 space-y-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                  <CheckCircle className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <span>
                    Issued with relevant course/programme details, student registration index, and graduation distinction.
                  </span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                  <CheckCircle className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <span>
                    Directly verifiable through the academy’s official records, subject to applicable verification procedures.
                  </span>
                </div>
              </div>

              {/* Verified seal preview */}
              <div className="flex items-center gap-4 pt-2">
                <div className="w-16 h-16 rounded-2xl overflow-hidden p-1 bg-white/40 dark:bg-white/10 border border-white/50 flex items-center justify-center shrink-0">
                  <img src="/logo.png" alt="Digitalmod Academy Official Seal" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-display font-black text-sm text-brand-ink dark:text-white">
                    DIGITALMOD ACADEMY CERTIFIED
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">
                    Official Student Transcript & Verification Record
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Our Commitment Checklist */}
          <div className="lg:col-span-5">
            <GlassCard level={2} glow="gold" className="p-8 sm:p-9">
              <div className="flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-wider mb-2">
                <Lock className="w-4 h-4" />
                <span>OUR COMMITMENT</span>
              </div>
              <h3 className="font-display font-black text-xl text-brand-ink dark:text-white mb-6">
                Guaranteed Educational Excellence
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {commitments.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                    <div className="w-4 h-4 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{c}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/20 dark:border-white/10 text-center">
                <p className="font-display font-black text-base text-brand-ink dark:text-white tracking-wide">
                  Learn Skills. <span className="text-gradient-gold">Build Your Future.</span>
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
