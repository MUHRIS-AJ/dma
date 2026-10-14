import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on devices with a fine pointer (mouse/trackpad)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handlePointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('[role="button"]') ||
        target?.closest('.glass-card') ||
        target?.closest('.interactive')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handlePointerOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handlePointerOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Outer Frosted Glass Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white/40 dark:border-white/20 bg-white/10 dark:bg-white/5 backdrop-blur-md shadow-glass-sm flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          x: smoothX,
          y: smoothY,
          width: isHovered ? 56 : 32,
          height: isHovered ? 56 : 32,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        {/* Inner Golden Dot */}
        <motion.div
          className="rounded-full bg-gradient-to-tr from-brand-gold via-amber-300 to-brand-cyan"
          animate={{
            width: isHovered ? 12 : 6,
            height: isHovered ? 12 : 6,
            boxShadow: isHovered
              ? '0 0 15px rgba(255, 215, 0, 0.8)'
              : '0 0 6px rgba(255, 215, 0, 0.5)',
          }}
        />
      </motion.div>
    </div>
  );
};
