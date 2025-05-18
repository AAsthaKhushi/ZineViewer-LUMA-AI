/* src/components/Gallery/genres/HorrorZine/Animations.ts */

import { Variants } from 'framer-motion';

interface ContainerSize {
  width: number;
  height: number;
}

// --- Floating Entity Animations ---

export const getFloatingEntityAnimationProps = (containerSize: ContainerSize): Variants => {
  const floatingDistance = 50; // Pixels the entity floats up and down
  const duration = Math.random() * 5 + 5; // Animation duration between 5-10 seconds
  const delay = Math.random() * 2; // Stagger delay

  // Random starting position
  const startX = Math.random() * containerSize.width;
  const startY = Math.random() * containerSize.height;

  return {
    initial: {
      x: startX,
      y: startY,
      opacity: 0,
      scale: Math.random() * 0.5 + 0.5, // Random scale between 0.5 and 1
      rotate: Math.random() * 360,
    },
    animate: {
      x: [startX, startX + Math.random() * 100 - 50, startX], // Gentle horizontal drift
      y: [startY, startY - floatingDistance, startY + floatingDistance, startY], // Floating up and down
      opacity: [0, Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.3, 0], // Fade in and out
      scale: [Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5], // Subtle scale change
      rotate: [Math.random() * 360, Math.random() * 360, Math.random() * 360], // Rotate randomly
      transition: {
        duration: duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay: delay,
      },
    },
  };
};

// --- Blood Spot Animations ---

export const getBloodSpotAnimationProps = (): Variants => {
  const duration = Math.random() * 3 + 2; // Animation duration between 2-5 seconds
  const delay = Math.random() * 3; // Stagger delay

  return {
    initial: {
      opacity: 0,
      scale: 0.5,
    },
    animate: {
      opacity: [0, 0.8, 0.8, 0.2, 0], // Pulse and fade
      scale: [0.5, 1, 1, 0.8, 0.5], // Grow and shrink slightly
      transition: {
        duration: duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay: delay,
      },
    },
  };
};

// --- Text & Glitch Animations ---

export const textFlickerVariants: Variants = {
  initial: { opacity: 1 },
  animate: {
    opacity: [1, 0.8, 1, 0.5, 1, 0.7, 1], // Simulates flickering
    transition: { duration: 0.5, repeat: Infinity, ease: 'step-end' },
  },
};

export const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

// Note: Advanced glitch effects often require SVG filters or canvas manipulation,
// which are more complex than standard Framer Motion variants alone.
// These variants provide basic opacity/position animations.
