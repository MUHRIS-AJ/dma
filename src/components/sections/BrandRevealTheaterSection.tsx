import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  Film, 
  ShieldCheck, 
  GraduationCap, 
  ArrowRight 
} from 'lucide-react';
import { CurvedReveal, CosmicCurvedRibbon } from '../common/CurvedReveal';
import { useMascot } from '../../context/MascotContext';

export const BrandRevealTheaterSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const { playSound, setEnrollModalOpen } = useMascot();

  const togglePlay = () => {
    playSound('click');
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    playSound('click');
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    playSound('click');
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section
      id="brand-theater"
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#030508] overflow-hidden"
    >
      <CosmicCurvedRibbon />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0056B3]/15 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <CurvedReveal direction="curve-up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#FFD700]/40 backdrop-blur-md text-xs font-bold text-[#FFD700] mb-4 shadow-sm">
            <Film className="w-4 h-4 text-[#FFD700]" />
            <span>4K CINEMATIC BRAND SHOWCASE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-4">
            The Digitalmod Academy{' '}
            <span className="bg-gradient-to-r from-[#00F0FF] via-[#FFD700] to-[#E63946] bg-clip-text text-transparent">
              Brand Reveal
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Experience our official 4K cinema brand reveal. Watch how our curriculum bridges Sri Lankan talent to high-growth global digital professions.
          </p>
        </CurvedReveal>

        {/* Apple-Style Cinema Theater Stage */}
        <CurvedReveal direction="cosmic-spiral" delay={0.15}>
          <div className="relative rounded-[36px] p-2 sm:p-4 bg-gradient-to-b from-white/10 to-white/0 backdrop-blur-3xl border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden group">
            {/* Ambient Bloom behind the video screen */}
            <div className="absolute inset-4 rounded-[32px] bg-gradient-to-r from-[#0056B3]/40 via-[#FFD700]/30 to-[#E63946]/40 blur-3xl opacity-60 pointer-events-none" />

            {/* Video Container Frame */}
            <div className="relative aspect-video rounded-[28px] overflow-hidden bg-black/90 shadow-2xl">
              <video
                ref={videoRef}
                src="/videos/brand_reveal_4k.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Theater Ambient Overlay Controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Top Bar Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#FFD700]/40 text-[11px] font-mono font-bold text-[#FFD700]">
                  <span className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse" />
                  <span>4K MASTER DIGITAL BROADCAST</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black/90 backdrop-blur-md transition-colors"
                    title={isMuted ? 'Unmute video' : 'Mute video'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-slate-300" /> : <Volume2 className="w-4 h-4 text-[#FFD700]" />}
                  </button>

                  <button
                    onClick={handleFullscreen}
                    className="w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-black/90 backdrop-blur-md transition-colors"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Center Play/Pause Glass Trigger */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/50 hover:bg-black/75 border border-white/30 text-white flex items-center justify-center backdrop-blur-md shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 sm:w-8 sm:h-8 text-[#FFD700]" />
                  ) : (
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 text-[#FFD700] ml-1" />
                  )}
                </button>
              </div>

              {/* Bottom Feature Ticker */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 pointer-events-auto">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold">Digitalmod Academy (Pvt) Ltd • Polonnaruwa, Sri Lanka</span>
                </div>

                <button
                  onClick={() => {
                    playSound('magic');
                    setEnrollModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD700] via-amber-400 to-[#E63946] text-black font-display font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:brightness-110 transition-all"
                >
                  <span>Enrol On WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </CurvedReveal>
      </div>
    </section>
  );
};
