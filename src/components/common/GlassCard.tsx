import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3;
  tilt?: boolean;
  glow?: 'gold' | 'cyan' | 'red' | 'none';
  className?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  level = 2,
  tilt = true,
  glow = 'none',
  className = '',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 260 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-7, 7]);
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mousePosX = e.clientX - rect.left;
    const mousePosY = e.clientY - rect.top;

    x.set(mousePosX / width - 0.5);
    y.set(mousePosY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const levelClass =
    level === 1 ? 'glass-1' : level === 3 ? 'glass-3' : 'glass-2';

  const glowClass =
    glow === 'gold'
      ? 'shadow-gold-glow border-brand-gold/40'
      : glow === 'cyan'
      ? 'shadow-cyan-glow border-brand-cyan/40'
      : glow === 'red'
      ? 'shadow-red-glow border-brand-red/40'
      : '';

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={tilt ? { perspective: 1200, rotateX, rotateY } : {}}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      className={`relative rounded-squircle specular-sheen overflow-hidden transition-all duration-300 ${levelClass} ${glowClass} ${className}`}
    >
      {/* Dynamic Specular Glare following mouse */}
      {tilt && (
        <motion.div
          className="pointer-events-none absolute -inset-full opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              'radial-gradient(circle at center, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 65%)',
            left: glareX,
            top: glareY,
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
