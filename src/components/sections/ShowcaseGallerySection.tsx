import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Play, 
  Pause, 
  Eye, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  Sparkles,
  Download,
  Film,
  FileCheck
} from 'lucide-react';
import { CurvedReveal, CosmicCurvedRibbon } from '../common/CurvedReveal';
import { useMascot } from '../../context/MascotContext';

// 16 Verified Certificate items
const certificatesList = Array.from({ length: 16 }, (_, i) => ({
  id: `cert-${i + 1}`,
  title: `Verified Academy Credential #${i + 1}`,
  type: 'certificate' as const,
  src: `/showcase/certificates/cert-${i + 1}.jpeg`,
  category: i % 3 === 0 ? 'Information Technology' : i % 3 === 1 ? 'Graphic & Media Design' : 'Digital Marketing & Growth',
  code: `DMA-2026-VERIFIED-${String(i + 1).padStart(3, '0')}`,
}));

// 5 Showcase Videos
const videosList = [
  {
    id: 'vid-1',
    title: 'Student Showcase: Video Editing & Motion Cut',
    type: 'video' as const,
    src: '/showcase/videos/showcase-1.mp4',
    category: 'Video Editing & Visual FX',
    duration: 'Live Project',
  },
  {
    id: 'vid-2',
    title: 'Practical Lab: Graphic Design Studio Walkthrough',
    type: 'video' as const,
    src: '/showcase/videos/showcase-2.mp4',
    category: 'Graphic Design',
    duration: 'Classroom Demo',
  },
  {
    id: 'vid-3',
    title: 'Digital Marketing Campaign Live Optimization',
    type: 'video' as const,
    src: '/showcase/videos/showcase-3.mp4',
    category: 'Digital Marketing',
    duration: 'Live Brief',
  },
  {
    id: 'vid-4',
    title: 'Practical Computing & Software Deployment Sprint',
    type: 'video' as const,
    src: '/showcase/videos/showcase-4.mp4',
    category: 'Applied ICT',
    duration: 'Capstone Defense',
  },
  {
    id: 'vid-5',
    title: 'Cyber Security Fundamentals Defense Exercise',
    type: 'video' as const,
    src: '/showcase/videos/showcase-5.mp4',
    category: 'Cyber Defense',
    duration: 'Lab Exercise',
  },
];

type FilterTab = 'all' | 'certificates' | 'videos';

export const ShowcaseGallerySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [activeCertificateModal, setActiveCertificateModal] = useState<string | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const { playSound, setEnrollModalOpen } = useMascot();

  const allItems = [
    ...certificatesList,
    ...videosList,
  ];

  const displayedItems =
    activeTab === 'all'
      ? allItems
      : activeTab === 'certificates'
      ? certificatesList
      : videosList;

  return (
    <section
      id="showcase"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#05070A] dark:bg-[#05070A] light:bg-slate-100 overflow-hidden"
    >
      {/* Anchor for old verification links */}
      <div id="verification" className="absolute top-0 left-0" />

      {/* Cosmic background ribbons */}
      <CosmicCurvedRibbon />
      <div className="absolute top-1/4 -right-10 w-[600px] h-[600px] bg-[#0056B3]/15 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-10 w-[600px] h-[600px] bg-[#FFD700]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Curved Reveal */}
        <CurvedReveal direction="curve-up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#FFD700]/30 backdrop-blur-md text-xs font-bold text-[#FFD700] mb-4">
            <Award className="w-4 h-4 text-[#FFD700]" />
            <span>OFFICIAL ACADEMIC CREDENTIALS & VIDEO REPERTOIRE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white dark:text-white light:text-slate-950 tracking-tight leading-tight mb-4">
            Real Student Showcase &{' '}
            <span className="bg-gradient-to-r from-[#FFD700] via-amber-300 to-[#E63946] bg-clip-text text-transparent">
              Verified Certificates
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Authentic academic records, classroom video captures, and verified graduate credentials from Digitalmod Academy. Every certificate represents real-world practical achievement.
          </p>
        </CurvedReveal>

        {/* Filter Navigation Tabs */}
        <CurvedReveal direction="curve-down" delay={0.1} className="flex justify-center mb-14">
          <div className="p-1.5 rounded-full bg-white/[0.04] dark:bg-white/[0.04] light:bg-white/80 backdrop-blur-2xl border border-white/10 dark:border-white/10 light:border-black/10 shadow-xl flex items-center gap-1.5">
            <button
              onClick={() => {
                playSound('click');
                setActiveTab('all');
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-[#0056B3] to-[#00F0FF] text-white shadow-lg shadow-cyan-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Showcases (21)
            </button>
            <button
              onClick={() => {
                playSound('click');
                setActiveTab('certificates');
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'certificates'
                  ? 'bg-gradient-to-r from-[#FFD700] to-amber-500 text-black shadow-lg shadow-amber-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Official Certificates (16)</span>
            </button>
            <button
              onClick={() => {
                playSound('click');
                setActiveTab('videos');
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'videos'
                  ? 'bg-gradient-to-r from-[#E63946] to-rose-600 text-white shadow-lg shadow-rose-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Student Videos (5)</span>
            </button>
          </div>
        </CurvedReveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedItems.map((item, index) => {
            const isCert = item.type === 'certificate';
            const curvedDir = index % 3 === 0 ? 'curve-left' : index % 3 === 1 ? 'curve-up' : 'curve-right';

            return (
              <CurvedReveal key={item.id} direction={curvedDir} delay={0.06 * (index % 6)}>
                <div className="h-full rounded-[28px] bg-white/[0.04] dark:bg-white/[0.04] light:bg-white backdrop-blur-2xl border border-white/10 dark:border-white/10 light:border-black/10 shadow-xl overflow-hidden group hover:border-[#FFD700]/50 transition-all duration-300 flex flex-col justify-between">
                  {/* Media Content */}
                  <div className="relative aspect-[4/3] bg-black/40 overflow-hidden">
                    {isCert ? (
                      <>
                        <img
                          src={item.src}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                        {/* Verified Ribbon */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold font-mono uppercase backdrop-blur-md flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>Official Record</span>
                        </div>

                        {/* Lightbox Trigger Button */}
                        <button
                          onClick={() => {
                            playSound('magic');
                            setActiveCertificateModal(item.src);
                          }}
                          className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-black/60 border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 backdrop-blur-md"
                          title="Inspect Certificate"
                        >
                          <Eye className="w-5 h-5 text-[#FFD700]" />
                        </button>
                      </>
                    ) : (
                      <>
                        <video
                          src={item.src}
                          loop
                          muted
                          playsInline
                          controls
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#E63946]/20 border border-[#E63946]/40 text-rose-300 text-[10px] font-bold font-mono uppercase backdrop-blur-md flex items-center gap-1 pointer-events-none">
                          <Film className="w-3 h-3 text-[#E63946]" />
                          <span>Student Video</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Card Description Footer */}
                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FFD700] mb-1">
                        {item.category}
                      </div>
                      <h4 className="font-display font-bold text-sm text-white dark:text-white light:text-slate-900 leading-snug mb-2 line-clamp-2">
                        {item.title}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                      {isCert ? (
                        <span className="font-mono text-[10px] text-slate-400">
                          {(item as any).code}
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] text-cyan-400">
                          {(item as any).duration}
                        </span>
                      )}

                      {isCert && (
                        <button
                          onClick={() => {
                            playSound('click');
                            setActiveCertificateModal(item.src);
                          }}
                          className="text-[#FFD700] hover:underline font-semibold text-[11px] flex items-center gap-1"
                        >
                          <span>Full View</span>
                          <Eye className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </CurvedReveal>
            );
          })}
        </div>
      </div>

      {/* Certificate Modal Lightbox (iOS Specular Glass) */}
      <AnimatePresence>
        {activeCertificateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl"
            onClick={() => setActiveCertificateModal(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] rounded-[32px] bg-slate-900/90 border-2 border-[#FFD700]/50 shadow-2xl p-4 sm:p-6 flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-white">
                    Verified Digitalmod Academy Certificate Record
                  </span>
                </div>

                <button
                  onClick={() => setActiveCertificateModal(null)}
                  className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Certificate Image Frame */}
              <div className="overflow-auto flex-grow flex items-center justify-center rounded-2xl bg-black/50 p-2">
                <img
                  src={activeCertificateModal}
                  alt="Full Certificate Preview"
                  className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl"
                />
              </div>

              {/* Footer */}
              <div className="pt-4 mt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Government Registered Educational Institute • Polonnaruwa, Sri Lanka</span>
                </div>

                <button
                  onClick={() => {
                    setActiveCertificateModal(null);
                    setEnrollModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD700] to-[#E63946] text-black font-display font-black text-xs uppercase tracking-wider"
                >
                  Enrol In This Programme
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
