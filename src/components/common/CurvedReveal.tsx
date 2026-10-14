import React from 'react';
import { motion, Variants } from 'framer-motion';

export type CurvedDirection =
  | 'curve-left'
  | 'curve-right'
  | 'curve-up'
  | 'curve-down'
  | 'cosmic-spiral'
  | 'spider-swing';

interface CurvedRevealProps {
  children: React.ReactNode;
  direction?: CurvedDirection;
  delay?: number;
  duration?: number;
  className?: string;
  triggerOnce?: boolean;
}

const CUBIC_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EXPO_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const CurvedReveal: React.FC<CurvedRevealProps> = ({
  children,
  direction = 'curve-up',
  delay = 0,
  duration = 0.85,
  className = '',
  triggerOnce = true,
}) => {
  const getVariants = (): Variants => {
    switch (direction) {
      case 'curve-left':
        return {
          hidden: { opacity: 0, x: -100, y: 50, rotate: -5, scale: 0.94 },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            transition: {
              duration,
              delay,
              ease: CUBIC_EASE,
            },
          },
        };
      case 'curve-right':
        return {
          hidden: { opacity: 0, x: 100, y: 50, rotate: 5, scale: 0.94 },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            transition: {
              duration,
              delay,
              ease: CUBIC_EASE,
            },
          },
        };
      case 'curve-down':
        return {
          hidden: { opacity: 0, x: 30, y: -80, rotate: 3, scale: 0.96 },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            transition: {
              duration,
              delay,
              ease: CUBIC_EASE,
            },
          },
        };
      case 'cosmic-spiral':
        return {
          hidden: { opacity: 0, y: 60, scale: 0.85, rotate: -8 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            transition: {
              duration: duration + 0.15,
              delay,
              ease: EXPO_EASE,
            },
          },
        };
      case 'spider-swing':
        return {
          hidden: { opacity: 0, x: 70, y: -40, rotate: 14, originX: 0.5, originY: 0 },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            originX: 0.5,
            originY: 0,
            transition: {
              type: 'spring',
              stiffness: 90,
              damping: 14,
              delay,
            },
          },
        };
      case 'curve-up':
      default:
        return {
          hidden: { opacity: 0, x: -30, y: 90, rotate: -3, scale: 0.96 },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
            transition: {
              duration,
              delay,
              ease: CUBIC_EASE,
            },
          },
        };
    }
  };

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: triggerOnce, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Parallax curved wave background ribbon that flows with scroll
 */
export const CosmicCurvedRibbon: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="w-full h-full opacity-20 filter drop-shadow-[0_0_15px_#0056B3]"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M-100,200 C300,50 600,450 1000,150 C1250,-20 1400,300 1600,220"
          stroke="url(#cosmic-ribbon-grad1)"
          strokeWidth="3"
          strokeDasharray="12 8"
          initial={{ pathOffset: 0 }}
          animate={{ pathOffset: 1 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.path
          d="M-80,650 C250,850 650,450 950,750 C1200,920 1350,550 1550,700"
          stroke="url(#cosmic-ribbon-grad2)"
          strokeWidth="2.5"
          initial={{ pathOffset: 1 }}
          animate={{ pathOffset: 0 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <defs>
          <linearGradient id="cosmic-ribbon-grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0056B3" stopOpacity="0.1" />
            <stop offset="35%" stopColor="#00F0FF" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#FFD700" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E63946" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="cosmic-ribbon-grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E63946" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#FFD700" stopOpacity="0.75" />
            <stop offset="85%" stopColor="#0056B3" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#9333EA" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
