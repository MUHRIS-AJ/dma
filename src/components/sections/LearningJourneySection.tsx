import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, BookOpen, Terminal, Award, Rocket, Sparkles } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

export const LearningJourneySection: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Enroll & Diagnose',
      desc: 'Seamless registration via WhatsApp or campus. Complete a quick diagnostic assessment so our mentors can tailor your exact learning pathway.',
      icon: UserCheck,
      color: 'from-amber-400 to-brand-gold',
      pill: 'Day 1',
    },
    {
      step: '02',
      title: 'Interactive Learning',
      desc: 'Attend live lectures in Polonnaruwa or via high-def Zoom. Enjoy visual concept explanations, interactive slides, and real-time screen sharing.',
      icon: BookOpen,
      color: 'from-brand-cyan to-teal-400',
      pill: 'Weeks 1–8',
    },
    {
      step: '03',
      title: 'Deep Practical Labs',
      desc: 'Hands-on coding in Python, software database design, and time-pressured past paper marathons with individual error-analysis sheets.',
      icon: Terminal,
      color: 'from-blue-500 to-indigo-600',
      pill: 'Continuous',
    },
    {
      step: '04',
      title: 'Certification & Distinction',
      desc: 'Score top marks in official school exams and receive your tamper-proof UBE-recognized certificate of technical achievement.',
      icon: Award,
      color: 'from-brand-red to-rose-600',
      pill: 'Milestone',
    },
    {
      step: '05',
      title: 'Career & University Pathway',
      desc: 'Graduates receive guidance for university applications (B.Sc ICT / Engineering) or internship opportunities in Sri Lanka’s expanding tech sector.',
      icon: Rocket,
      color: 'from-brand-gold via-amber-300 to-yellow-500',
      pill: 'Future',
    },
  ];

  return (
    <section id="journey" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-1 border border-white/40 dark:border-white/10 text-brand-gold text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE 5-STAGE ROADMAP</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-brand-ink dark:text-white tracking-tight mb-4">
            Your Proven Learning{' '}
            <span className="text-gradient-gold">Journey</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            A battle-tested 5-stage transformation that takes students from beginners to top examination scorers and digital builders.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Central Glowing Connector Line on Desktop */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-brand-gold via-brand-cyan to-brand-red -translate-x-1/2 opacity-30 pointer-events-none" />

          <div className="space-y-12 lg:space-y-16">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 1;

              return (
                <div
                  key={item.step}
                  className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-14 ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card (Half width on desktop) */}
                  <div className="w-full lg:w-1/2">
                    <GlassCard level={2} className="p-7">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-extrabold text-brand-gold bg-brand-gold/15 px-3 py-1 rounded-full">
                          Stage {item.step}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          {item.pill}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-xl text-brand-ink dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </GlassCard>
                  </div>

                  {/* Central Node Badge */}
                  <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-white to-slate-200 dark:from-slate-800 dark:to-slate-900 border-2 border-white/60 dark:border-white/20 shadow-glass-md flex items-center justify-center shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-tr ${item.color} flex items-center justify-center text-brand-ink shadow-sm`}
                    >
                      <Icon className="w-5 h-5 text-brand-ink" />
                    </div>
                  </div>

                  {/* Empty Spacer on Desktop for Alternating Rhythm */}
                  <div className="hidden lg:block lg:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
