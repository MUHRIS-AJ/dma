import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Star, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';

export const TestimonialsSection: React.FC = () => {
  const notifications = [
    {
      id: 'n1',
      student: 'Dulshan Perera',
      title: 'G.C.E O/L District 1st in ICT',
      badge: 'Grade A Distinct',
      time: 'Just now',
      message:
        'Suhith Sir’s model papers and past paper discussions were the game changer for me. The questions in the actual national exam felt identical to the mock exams we practiced at the Sungavila campus!',
      avatar: '👨‍🎓',
      score: '98/100 Final Exam',
    },
    {
      id: 'n2',
      student: 'Fathima Nusra',
      title: 'Online Zoom Student (Colombo)',
      badge: 'Full-Stack Portfolio',
      time: '12m ago',
      message:
        'Even though I attended remotely from Colombo, the interactive Zoom screen sharing and live code reviews made me feel like I was right there in the front row of the Polonnaruwa lab.',
      avatar: '👩‍💻',
      score: 'A* Grade & Live Web App',
    },
    {
      id: 'n3',
      student: 'Thilina Bandara',
      title: 'A/L Combined Mathematics & ICT',
      badge: 'Campus Distinction',
      time: '1h ago',
      message:
        'The algorithm visualization methods and Python programming breakdown made complex concepts so intuitive. I went from struggling with flowcharts to scoring top distinction in my term exams!',
      avatar: '🚀',
      score: 'Distinction Star',
    },
    {
      id: 'n4',
      student: 'Kavindi Jayawardena',
      title: 'Junior Coding & 3D Web Cohort',
      badge: 'Young Creator Award',
      time: '3h ago',
      message:
        'The 3D Blender character modeling and modern WebGL practical classes gave me the confidence to design interactive web experiences. The best academy in Polonnaruwa by far!',
      avatar: '🎨',
      score: 'Certified UBE Scholar',
    },
  ];

  return (
    <section id="testimonials" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-1 border border-white/40 dark:border-white/10 text-brand-gold text-xs font-semibold mb-4">
            <Bell className="w-3.5 h-3.5 animate-bounce" />
            <span>REAL STUDENT RESULTS</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-brand-ink dark:text-white tracking-tight mb-4">
            iOS-Style Notifications of{' '}
            <span className="text-gradient-gold">Student Success</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            Every semester, Digital MOD Academy students achieve top exam distinctions and publish real-world digital projects.
          </p>
        </div>

        {/* Stacked iOS Notification Cards */}
        <div className="space-y-5">
          {notifications.map((n, idx) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -25 : 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
            >
              <GlassCard
                level={2}
                className="p-5 sm:p-6 shadow-glass-md hover:border-brand-gold/40 transition-colors"
              >
                {/* iOS Notification Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    {/* App Icon */}
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-brand-gold to-brand-red p-0.5 shadow-sm">
                      <div className="w-full h-full bg-white dark:bg-black/50 rounded-[10px] flex items-center justify-center text-xs">
                        🎓
                      </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-ink dark:text-white">
                      Digital MOD Academy
                    </span>
                    <span className="text-slate-400 text-xs hidden sm:inline">•</span>
                    <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                      Verified Review
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400">
                    {n.time}
                  </span>
                </div>

                {/* Notification Content Body */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 dark:bg-white/10 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                    {n.avatar}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h3 className="font-display font-bold text-base sm:text-lg text-brand-ink dark:text-white">
                        {n.student}{' '}
                        <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                          ({n.title})
                        </span>
                      </h3>

                      <div className="flex items-center gap-1 bg-brand-gold/15 text-brand-gold px-2.5 py-0.5 rounded-full text-xs font-bold font-mono">
                        <CheckCircle className="w-3 h-3" />
                        <span>{n.score}</span>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                      "{n.message}"
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
