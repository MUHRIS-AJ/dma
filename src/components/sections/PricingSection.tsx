import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, ArrowRight, Zap, Info, ShieldCheck } from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { useSmoothScroll } from '../common/SmoothScroll';
import { useMascot } from '../../context/MascotContext';

export const PricingSection: React.FC = () => {
  const { scrollTo } = useSmoothScroll();
  const { playSound, triggerBurst, setEnrollModalOpen } = useMascot();

  const handleSelectPlan = (planName: string) => {
    playSound('magic');
    triggerBurst();
    setEnrollModalOpen(true);
  };

  const plans = [
    {
      name: 'Certificate Level',
      target: '2 to 3 Months Fast-Track',
      priceLKR: 'Rs. 5,000',
      period: 'per course',
      priceUSD: '$16',
      desc: 'Ideal foundation in ICT, Canva, Graphic Design, Video Editing, Digital Marketing, AI Tools, and Cyber Security.',
      isPopular: false,
      glow: 'none' as const,
      features: [
        'Complete course materials & software guides',
        'Practical sessions at Polonnaruwa / Zoom',
        'Continuous assignments & assessments',
        'Official Digitalmod Academy Certificate',
        'Online learning support & recordings',
        'Direct instructor guidance by Suhith Sir',
        'Lifetime access to selected resources',
      ],
      buttonVariant: 'glass' as const,
      buttonText: 'Enroll in Certificate (Rs. 5,000)',
    },
    {
      name: 'Diploma Level',
      target: '6 Months Professional Track',
      priceLKR: 'Rs. 5,000',
      period: 'per course',
      priceUSD: '$16',
      desc: 'Our flagship diploma qualifications in IT, Graphic Design, Cyber Security, Digital Marketing, and AI & Digital Skills.',
      isPopular: true,
      glow: 'gold' as const,
      features: [
        'In-depth 6-month structured curriculum',
        'Physical smart lab workstation seat at Sungavila',
        'Real-world portfolio & project builds',
        'Advanced assignments & midterm examinations',
        'Official Diploma Certificate with verification record',
        'UBE & CCB approved academic standards',
        'Priority 1-on-1 career & academic mentorship',
      ],
      buttonVariant: 'gold' as const,
      buttonText: 'Enroll in Diploma (Rs. 5,000)',
    },
    {
      name: 'Advanced & HND Level',
      target: '9 Months to 1 Year Career Track',
      priceLKR: 'Rs. 5,000',
      period: 'tuition fee',
      priceUSD: '$16',
      desc: 'Higher National Diploma (HND) in IT, Computing, and Advanced Diplomas in Cyber Security, Marketing & Design.',
      isPopular: false,
      glow: 'cyan' as const,
      features: [
        'Comprehensive higher diploma academic lectures',
        'Full software engineering & enterprise networking',
        'Final year capstone project & thesis mentorship',
        'University pathway recommendation & counseling',
        'Official Digitalmod Academy course transcript',
        '24/7 video vault & live code repository access',
        'Flexible weekday & weekend class batches',
      ],
      buttonVariant: 'glass' as const,
      buttonText: 'Enroll in HND / Advanced (Rs. 5,000)',
    },
  ];

  return (
    <section id="pricing" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-1 border border-brand-gold/40 text-brand-gold text-xs font-bold mb-4 shadow-sm">
            <Zap className="w-4 h-4 text-brand-gold" />
            <span>UNIFORM FEE STRUCTURE • ALL 21 COURSES</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-brand-ink dark:text-white tracking-tight mb-4">
            Transparent Tuition of <span className="text-gradient-gold">Rs. 5,000</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            Every programme at Digitalmod Academy is offered at an accessible uniform fee of 
            <strong> Rs. 5,000</strong>, with complete practical lab training, course materials, and verifiable certification.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col ${
                p.isPopular ? 'lg:-translate-y-4' : ''
              }`}
            >
              {/* Highlight Ribbon on Popular Plan */}
              {p.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-brand-gold via-amber-400 to-yellow-500 text-brand-ink font-black text-[11px] uppercase tracking-widest px-4 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-brand-ink" />
                  <span>Most Popular Track</span>
                </div>
              )}

              <GlassCard
                level={p.isPopular ? 3 : 2}
                glow={p.glow}
                className={`p-8 sm:p-9 flex flex-col justify-between h-full ${
                  p.isPopular
                    ? 'border-2 border-brand-gold/60 shadow-gold-glow'
                    : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-black text-2xl text-brand-ink dark:text-white">
                      {p.name}
                    </h3>
                  </div>
                  <p className="text-xs font-semibold text-brand-gold mb-4 uppercase tracking-wider">
                    {p.target}
                  </p>

                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                    {p.desc}
                  </p>

                  {/* Price Tag */}
                  <div className="mb-6 pb-6 border-b border-white/20 dark:border-white/10">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display font-black text-3xl sm:text-4xl text-brand-ink dark:text-white font-mono">
                        {p.priceLKR}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        / {p.period}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      International: {p.priceUSD}
                    </span>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {p.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
                      >
                        <div className="w-4 h-4 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plan CTA Button */}
                <GlassButton
                  variant={p.buttonVariant}
                  size="md"
                  onClick={() => handleSelectPlan(p.name)}
                  className="w-full text-center"
                >
                  <span>{p.buttonText}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </GlassButton>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* HND & Advanced Diploma Awarding Clarification Note */}
        <div className="p-4 rounded-2xl glass-1 border border-white/30 dark:border-white/10 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-3 max-w-4xl mx-auto">
          <Info className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-brand-ink dark:text-white">Awarding Body Qualification Note:</strong>{' '}
            For HND and Advanced Diploma qualifications, the <strong>Rs. 5,000 fee</strong> is Digitalmod Academy’s 
            course tuition and internal instruction fee. External awarding body or university qualification assessment 
            fees are separate and subject to the respective external awarding body guidelines.
          </p>
        </div>
      </div>
    </section>
  );
};
