// Animation properties generation for Framer Motion in FantasyZine

import { Variant } from 'framer-motion';
import { FantasyAnimationConfig } from './types';

// Function to generate animation properties for a single orb
export const getOrbAnimationProps = (containerSize: { width: number; height: number }) => ({
  y: [containerSize.height, -containerSize.height * (0.5 + Math.random() * 0.5)],
  x: [containerSize.width * Math.random(), containerSize.width * (Math.random() - 0.5) * 0.2],
  opacity: [0, 0.5 + Math.random() * 0.5, 0],
  scale: [0.5, 1 + Math.random() * 0.5, 0.5],
  transition: {
    duration: 10 + Math.random() * 10,
    repeat: Infinity,
    ease: 'linear',
    delay: Math.random() * 8,
  }
});

// Function to generate animation properties for a single glitter
export const getGlitterAnimationProps = (containerSize: { width: number; height: number }) => ({ 
  y: [containerSize.height * Math.random(), -containerSize.height],
  x: [containerSize.width * Math.random(), containerSize.width * (Math.random() - 0.5)],
  opacity: [0, 0.8, 0],
  scale: [0.5, 1, 0.5],
  rotate: [0, 360],
  transition: {
    duration: 5 + Math.random() * 5,
    repeat: Infinity,
    ease: 'linear',
    delay: Math.random() * 5,
  }
});

// Function to generate animation properties for floating bubbles
export const getBubbleAnimationProps = (containerSize: { width: number; height: number }) => ({
  y: [containerSize.height + 50, -100],
  x: [containerSize.width * Math.random(), containerSize.width * Math.random()],
  opacity: [0, 0.7, 0],
  scale: [0.5, 1.2, 0.8],
  transition: {
    duration: 15 + Math.random() * 10,
    repeat: Infinity,
    ease: 'easeInOut',
    delay: Math.random() * 10,
  }
});

// Function to generate animation properties for floating runes
export const getFloatingRuneProps = (containerSize: { width: number; height: number }) => ({
  y: [containerSize.height + 40, -80],
  x: [containerSize.width * Math.random(), containerSize.width * Math.random()],
  rotate: [0, 360],
  opacity: [0, 1, 0],
  transition: {
    duration: 20 + Math.random() * 10,
    repeat: Infinity,
    ease: 'easeInOut',
    delay: Math.random() * 10,
  }
});

export const textRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const sectionFadeInVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};
