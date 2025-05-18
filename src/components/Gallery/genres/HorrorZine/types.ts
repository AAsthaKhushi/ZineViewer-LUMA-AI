/* src/components/Gallery/genres/HorrorZine/types.ts */

import { CSSProperties, ReactNode } from 'react';
import { Variants, HTMLMotionProps } from 'framer-motion';

export interface HorrorAnimationConfig {
  floatingEntityCount?: number;
  bloodSpotCount?: number;
  jumpScareFrequency?: number;
  textFlickerStrength?: number;
  cursorTrailLength?: number;
}

export interface SectionProps {
  id: string;
  title: string;
  content: ReactNode;
}

export interface FloatingEntityProps {
  id: string;
  animationProps: Variants;
  content?: string; // Emoji or other content to display
  style?: CSSProperties;
  type?: 'ghost' | 'skull' | 'bat' | 'eye' | 'spider' | 'mask' | 'silhouette';
}

export interface BloodSpotProps {
  id: string;
  animationProps: Variants;
  style?: CSSProperties;
  size?: 'small' | 'medium' | 'large';
  opacity?: number;
}

export interface CursorTrailProps {
  x: number;
  y: number;
  id: number;
  opacity?: number;
  scale?: number;
}

export interface JumpScareProps {
  id: string;
  imageUrl?: string;
  duration?: number;
  size?: CSSProperties;
}

export interface VHSEffectProps {
  scanlineIntensity?: number;
  staticAmount?: number;
  flickerFrequency?: number;
  glitchProbability?: number;
}

export interface WarpedContainerProps extends HTMLMotionProps<'div'> {
  clipPath?: string;
  distortionAmount?: number;
  pulseEffect?: boolean;
  pulseConfig?: {
    intensity: number;
    speed: number;
  };
}

export interface InteractiveMirrorProps {
  initialContent: ReactNode;
  revealContent: ReactNode;
  revealTrigger: 'hover' | 'click' | 'timed';
  revealDuration?: number;
}

export interface HorrorQuizQuestion {
  question: string;
  options: string[];
  resultMapping: Record<string, string>;
}

export interface PumpkinGameProps {
  puns: string[];
  pumpkins: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface HorrorFooterProps {
  mainText: string;
  subText: string;
  copyrightText: string;
  showTombstones?: boolean;
  showGhosts?: boolean;
}