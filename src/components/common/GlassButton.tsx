import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface GlassButtonProps {
  children: React.ReactNode;
  variant?: 'gold' | 'glass' | 'red' | 'cyan';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  magnetic = true,
  className = '',
  onClick,
  href,
  type = 'button',
  target,
  rel,
}) => {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  // Magnetic displacement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 220 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.25);
    y.set((e.clientY - centerY) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const variantStyles = {
    gold: 'bg-gradient-to-r from-brand-gold via-amber-400 to-yellow-500 text-brand-ink font-bold shadow-lg shadow-brand-gold/30 hover:shadow-brand-gold/50 border border-white/40',
    glass: 'glass-2 text-slate-800 dark:text-white font-semibold hover:bg-white/40 dark:hover:bg-white/10 shadow-glass-sm border border-white/50 dark:border-white/20',
    red: 'bg-gradient-to-r from-brand-red via-red-500 to-rose-600 text-white font-bold shadow-lg shadow-brand-red/30 hover:shadow-brand-red/50 border border-white/30',
    cyan: 'bg-gradient-to-r from-brand-cyan via-teal-400 to-cyan-500 text-brand-ink font-bold shadow-lg shadow-brand-cyan/30 hover:shadow-brand-cyan/50 border border-white/40',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs rounded-full gap-1.5',
    md: 'px-6 py-3 text-sm rounded-full gap-2',
    lg: 'px-8 py-4 text-base rounded-full gap-2.5',
  };

  const content = (
    <motion.div
      style={magnetic ? { x: smoothX, y: smoothY } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className={`specular-sheen inline-flex items-center justify-center transition-all duration-200 cursor-pointer select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className="inline-block"
    >
      {content}
    </button>
  );
};
