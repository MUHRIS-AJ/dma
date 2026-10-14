import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface SceneWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const CinematicSceneWrapper: React.FC<SceneWrapperProps> = ({
  children,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // 120Hz smooth ProMotion spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    mass: 0.3,
  });

  // Clean, crisp Apple-grade transition (No cinema blur, no cinema tilt)
  const opacity = useTransform(smoothProgress, [0, 0.12, 0.88, 1], [0.75, 1, 1, 0.75]);
  const y = useTransform(smoothProgress, [0, 0.15, 0.85, 1], [18, 0, 0, -12]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <motion.div
        style={{
          opacity,
          y,
          willChange: 'transform, opacity',
        }}
        className="relative"
      >
        {children}
      </motion.div>
    </div>
  );
};
