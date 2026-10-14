import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette,
  Search,
  Cpu,
  Sparkles,
  BarChart3,
  Target,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Zap,
  Globe,
  Share2,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { useMascot } from '../../context/MascotContext';
import { useSmoothScroll } from '../common/SmoothScroll';

interface SpecializationPillar {
  id: string;
  tag: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeClass: string;
  borderClass: string;
  glowClass: string;
  keySkills: string[];
  practicalDeliverables: string[];
  associatedCourses: string[];
}

export const SpecializationsSection: React.FC = () => {
  const { playSound } = useMascot();
  const { scrollTo } = useSmoothScroll();
  const [activePillarId, setActivePillarId] = useState<string>('ui-ux');

  const pillars: SpecializationPillar[] = [
    {
      id: 'ui-ux',
      tag: 'PILLAR 01',
      title: 'UI/UX',
      tagline: 'Design effective websites.',
      description:
        'Transform complex concepts into intuitive, visually stunning digital experiences. Master user psychology, wireframing, interactive prototyping in Figma, and high-conversion design systems.',
      icon: Palette,
      accentColor: '#FFD700',
      badgeClass: 'bg-brand-gold/15 text-brand-gold border-brand-gold/30',
      borderClass: 'hover:border-brand-gold/50',
      glowClass: 'from-brand-gold/20 via-transparent to-transparent',
      keySkills: [
        'User Journey & Wireframing',
        'Figma Design Systems & Components',
        'Mobile-First & Liquid Glass UX',
        'Interactive Micro-Animations',
      ],
      practicalDeliverables: [
        'Production Figma UI Kits',
        'Interactive Clickable Prototypes',
        'Design System Documentation',
      ],
      associatedCourses: [
        'Certificate in Graphic Design',
        'Diploma in Graphic Design',
        'Diploma in IT',
      ],
    },
    {
      id: 'seo',
      tag: 'PILLAR 02',
      title: 'SEO',
      tagline: 'Help people discover your website.',
      description:
        'Master organic search mechanics to capture high-intent audiences on Google. Learn search intent clustering, on-page optimization, topical authority architecture, and sustainable rank strategies.',
      icon: Search,
      accentColor: '#5CE1E6',
      badgeClass: 'bg-brand-cyan/15 text-brand-cyan border-brand-cyan/30',
      borderClass: 'hover:border-brand-cyan/50',
      glowClass: 'from-brand-cyan/20 via-transparent to-transparent',
      keySkills: [
        'Search Intent & Keyword Strategy',
        'On-Page Optimization & Meta Architecture',
        'Internal Linking & Topic Clusters',
        'Competitor SERP Gap Analysis',
      ],
      practicalDeliverables: [
        'Full Website SEO Audit Report',
        'Keyword Strategy Matrix',
        'Content Optimization Blueprint',
      ],
      associatedCourses: [
        'Certificate in Digital Marketing',
        'Diploma in Digital Marketing',
        'Advanced Diploma in Digital Marketing',
      ],
    },
    {
      id: 'technical-seo',
      tag: 'PILLAR 03',
      title: 'Technical SEO',
      tagline: 'Improve website structure, indexing and performance.',
      description:
        'Go under the hood to ensure search engine crawlers flawlessly render, understand, and index your web architecture. Master Core Web Vitals, JSON-LD Schema markup, and speed engineering.',
      icon: Cpu,
      accentColor: '#10B981',
      badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      borderClass: 'hover:border-emerald-500/50',
      glowClass: 'from-emerald-500/20 via-transparent to-transparent',
      keySkills: [
        'Core Web Vitals (LCP, INP, CLS)',
        'Crawl Budget & Indexation Control',
        'Schema.org JSON-LD Structured Data',
        'Sitemaps, Canonicalization & Robots.txt',
      ],
      practicalDeliverables: [
        'Technical Site Health Audit',
        'Structured Schema Markup Template',
        'Performance & Indexation Fix Checklist',
      ],
      associatedCourses: [
        'Diploma in Information Technology',
        'HND in Computing',
        'Certificate in ICT',
      ],
    },
    {
      id: 'aeo-geo',
      tag: 'PILLAR 04',
      title: 'AEO & GEO',
      tagline: 'Understand search and AI-answer visibility.',
      description:
        'The frontier of modern search: Answer Engine Optimization (AEO) and Generative Engine Optimization (GEO). Position your brand to be cited directly by ChatGPT, Perplexity, Gemini, and Claude.',
      icon: Sparkles,
      accentColor: '#A855F7',
      badgeClass: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
      borderClass: 'hover:border-purple-500/50',
      glowClass: 'from-purple-500/20 via-transparent to-transparent',
      keySkills: [
        'AI Answer Engine Retrieval Models',
        'Generative Search Optimization (GEO)',
        'Entity Authority & Knowledge Graphs',
        'LLM Source Citation Engineering',
      ],
      practicalDeliverables: [
        'AI Answer Visibility Audit',
        'Entity Knowledge Graph Blueprint',
        'AEO Content Formatting Framework',
      ],
      associatedCourses: [
        'Certificate in AI Tools & Productivity',
        'Diploma in AI & Digital Skills',
        'Advanced Diploma in Digital Marketing',
      ],
    },
    {
      id: 'analytics',
      tag: 'PILLAR 05',
      title: 'Google Analytics',
      tagline: 'Measure website visitors and user behavior.',
      description:
        'Turn raw digital traffic into actionable business intelligence with Google Analytics 4 (GA4). Track conversion events, user navigation funnels, attribution channels, and build live client dashboards.',
      icon: BarChart3,
      accentColor: '#F59E0B',
      badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      borderClass: 'hover:border-amber-500/50',
      glowClass: 'from-amber-500/20 via-transparent to-transparent',
      keySkills: [
        'GA4 Implementation & Enhanced Measurement',
        'Custom Events & Conversion Funnels',
        'User Retention & Demographic Cohorts',
        'Google Looker Studio Visual Dashboards',
      ],
      practicalDeliverables: [
        'Interactive Client Analytics Dashboard',
        'Event Tracking Architecture Plan',
        'Multi-Channel Attribution Report',
      ],
      associatedCourses: [
        'Diploma in Digital Marketing',
        'Diploma in Computer Applications',
        'Advanced Diploma in Digital Marketing',
      ],
    },
    {
      id: 'cro',
      tag: 'PILLAR 06',
      title: 'CRO',
      tagline: 'Improve conversions.',
      description:
        'Conversion Rate Optimization (CRO) combines behavioral psychology and statistical testing. Transform existing website visitors into paying leads and customers without spending more on ads.',
      icon: Target,
      accentColor: '#E8112D',
      badgeClass: 'bg-brand-red/15 text-brand-red border-brand-red/30',
      borderClass: 'hover:border-brand-red/50',
      glowClass: 'from-brand-red/20 via-transparent to-transparent',
      keySkills: [
        'A/B & Multivariate Split Testing',
        'Behavioral Heatmaps & Session Replays',
        'Checkout & Form Friction Elimination',
        'High-Converting Value Propositions',
      ],
      practicalDeliverables: [
        'Landing Page Conversion Audit',
        'A/B Testing Hypothesis Backlog',
        'Optimized High-Converting Checkout Wireframe',
      ],
      associatedCourses: [
        'Diploma in Digital Marketing',
        'Certificate in Digital Marketing',
        'Certificate in Canva Design',
      ],
    },
    {
      id: 'sem-smm',
      tag: 'PILLAR 07',
      title: 'SEM & SMM',
      tagline: 'Grow your audience through advertising and social platforms.',
      description:
        'Scale digital reach rapidly with high-ROI paid advertising and viral social media marketing. Master Google Ads search/display, Meta Ads Manager, LinkedIn B2B, and TikTok creator workflows.',
      icon: TrendingUp,
      accentColor: '#3B82F6',
      badgeClass: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
      borderClass: 'hover:border-blue-500/50',
      glowClass: 'from-blue-500/20 via-transparent to-transparent',
      keySkills: [
        'Google Ads (Search, Display & Performance Max)',
        'Meta Ads (Facebook & Instagram Retargeting)',
        'TikTok & Short-Form Social Growth',
        'Ad Budget Optimization & ROAS Tracking',
      ],
      practicalDeliverables: [
        'Live Paid Campaign Setup & Budget Strategy',
        'High-Performing Ad Creative Suite',
        'Social Media Editorial & Content Calendar',
      ],
      associatedCourses: [
        'Certificate in Social Media Marketing',
        'Certificate in Video Editing',
        'Diploma in Digital Marketing',
      ],
    },
  ];

  const activePillar = pillars.find((p) => p.id === activePillarId) || pillars[0];
  const ActiveIcon = activePillar.icon;

  return (
    <section id="specializations" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-brand-gold/10 via-brand-cyan/10 to-brand-red/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-2 border border-brand-gold/30 text-xs font-mono font-bold text-brand-gold uppercase tracking-widest shadow-glass-sm">
            <Zap className="w-3.5 h-3.5 text-brand-gold" />
            <span>Modern Digital Mastery • Industry Standards</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-ink dark:text-white tracking-tight">
            The 7 Pillars of <span className="text-gradient-gold">Digital Growth</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Beyond generic theory — learn the exact core disciplines high-growth tech companies, digital agencies, 
            and global clients rely upon every single day.
          </p>
        </div>

        {/* 7 Quick Pillar Badges / Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isSelected = pillar.id === activePillarId;

            return (
              <button
                key={pillar.id}
                onClick={() => {
                  playSound('click');
                  setActivePillarId(pillar.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-brand-ink text-white dark:bg-white dark:text-brand-ink shadow-glass-md scale-105 border border-brand-gold'
                    : 'glass-1 text-slate-700 dark:text-slate-300 hover:glass-2 border border-white/30 dark:border-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-brand-gold' : 'text-slate-400'}`} />
                <span>{pillar.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Featured Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="mb-14"
          >
            <div className="glass-2 p-6 sm:p-10 rounded-3xl border border-white/50 dark:border-white/10 shadow-glass-lg relative overflow-hidden">
              {/* Pillar Gradient Rim */}
              <div
                className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${activePillar.glowClass} rounded-full blur-3xl pointer-events-none`}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left Column: Description & Tagline */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-mono font-black uppercase border ${activePillar.badgeClass}`}
                    >
                      {activePillar.tag}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Digitalmod Practical Syllabus
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-brand-ink dark:text-white flex items-center gap-3">
                      <span>{activePillar.title}</span>
                      <span className="text-slate-400 text-lg sm:text-xl font-normal">—</span>
                      <span className="text-brand-gold italic text-lg sm:text-xl font-bold">
                        {activePillar.tagline}
                      </span>
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activePillar.description}
                  </p>

                  {/* Skills Grid */}
                  <div className="pt-2">
                    <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-3">
                      Core Competencies Acquired:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activePillar.keySkills.map((skill, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2.5 rounded-xl bg-white/40 dark:bg-black/40 border border-white/40 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-200"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Deliverables & Quick Enrollment */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-white/50 dark:border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-gold">
                        Real-World Portfolio Output
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-cyan/20 text-brand-cyan font-bold">
                        100% Practical
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      {activePillar.practicalDeliverables.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-gold/15 via-white/40 dark:via-black/40 to-brand-cyan/15 border border-brand-gold/30 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-500 dark:text-slate-400">Academy Fee:</span>
                      <strong className="text-base font-black font-mono text-brand-gold">
                        Uniform Rs. 5,000 / Level
                      </strong>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-slate-400 block">
                        Included In Courses:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activePillar.associatedCourses.map((c, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/60 dark:bg-black/50 text-slate-700 dark:text-slate-300 border border-white/30"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        onClick={() => {
                          playSound('click');
                          scrollTo('#courses', 0);
                        }}
                        className="flex-1 py-2 rounded-xl bg-brand-ink text-white dark:bg-white dark:text-brand-ink text-xs font-bold hover:bg-brand-gold hover:text-brand-ink transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>View 21 Courses</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href="https://wa.me/94741145464"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl glass-2 text-emerald-500 hover:border-emerald-500/50 transition-colors"
                        title="Inquire about this pillar on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Complete 7 Pillars Grid (Overview Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isCurrent = pillar.id === activePillarId;

            return (
              <div
                key={pillar.id}
                onClick={() => {
                  playSound('click');
                  setActivePillarId(pillar.id);
                }}
                className={`p-5 rounded-2xl glass-1 border cursor-pointer transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between ${
                  isCurrent
                    ? 'border-brand-gold bg-white/40 dark:bg-white/10 shadow-glass-md'
                    : 'border-white/30 dark:border-white/10 hover:border-white/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl glass-2 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-brand-gold" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {pillar.tag}
                    </span>
                  </div>

                  <h4 className="font-display font-black text-lg text-brand-ink dark:text-white mb-1">
                    {pillar.title}
                  </h4>

                  <p className="text-xs font-bold text-brand-gold mb-2">
                    {pillar.tagline}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-white/20 dark:border-white/10 mt-3">
                  <span>Explore Syllabus</span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isCurrent ? 'translate-x-1 text-brand-gold' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
