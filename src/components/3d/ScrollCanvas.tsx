import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { FloatingElements } from './FloatingElements';
import { MicroInteractionBurst } from './MicroInteractionBurst';

gsap.registerPlugin(ScrollTrigger);

export const ScrollCanvas: React.FC<{
  onLoadingProgress?: (percent: number) => void;
  onLoaded?: () => void;
}> = ({ onLoadingProgress, onLoaded }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [useVideoFallback, setUseVideoFallback] = useState<boolean>(false);

  // 50 frames extracted from pre-rendered video sequence
  const FRAME_COUNT = 50;
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);

  // Progressive Preloading of Frames
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const padNum = String(i).padStart(3, '0');
      img.src = `/frames/hero/ezgif-frame-${padNum}.jpg`;

      img.onload = () => {
        loadedCount++;
        const percent = Math.round((loadedCount / FRAME_COUNT) * 100);
        if (onLoadingProgress) onLoadingProgress(percent);

        if (loadedCount === 1) {
          renderFrame(0);
        }

        if (loadedCount >= FRAME_COUNT) {
          if (onLoaded) onLoaded();
        }
      };

      img.onerror = () => {
        setUseVideoFallback(true);
        if (onLoaded) onLoaded();
      };

      images.push(img);
    }

    imagesRef.current = images;
  }, []);

  // Frame Rendering with Cover Aspect Ratio
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const x = (canvasWidth - imgWidth * scale) / 2;
    const y = (canvasHeight - imgHeight * scale) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
  };

  // Resize canvas to match display pixel ratio (Retina / 4K ready)
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP ScrollTrigger frame scrubbing (Tuned for 120Hz high refresh rate)
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.max(0, Math.floor(self.progress * FRAME_COUNT))
        );
        currentFrameRef.current = frameIndex;
        renderFrame(frameIndex);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
    >
      {/* 1. Pre-rendered 4K-Enhanced 3D Frame Scrubbing Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          imageRendering: 'auto',
          filter: 'contrast(1.08) saturate(1.1) brightness(1.02)',
        }}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          useVideoFallback ? 'opacity-0' : 'opacity-95 dark:opacity-85'
        }`}
      />

      {/* 2. Seamless High-Definition 4K-Enhanced Video Fallback Loop */}
      {useVideoFallback && (
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            filter: 'contrast(1.08) saturate(1.1) brightness(1.02)',
          }}
          className="absolute inset-0 w-full h-full object-cover opacity-95 dark:opacity-85"
        >
          <source src="/videos/hero_background.mp4" type="video/mp4" />
        </video>
      )}

      {/* 3. Soft Apple Glass Radial Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30 dark:to-black/60 pointer-events-none" />

      {/* 4. Real-Time Overlay: Floating 3D Academy Crystals, Laurel Particles & Star Bursts */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#FFF8E7" />
          <pointLight position={[-4, 2, -2]} intensity={2.0} color="#5CE1E6" />
          <pointLight position={[4, 2, -2]} intensity={2.2} color="#FFD700" />

          {/* Interactive Floating 3D Particles */}
          <FloatingElements />
          <MicroInteractionBurst />
        </Canvas>
      </div>
    </div>
  );
};
