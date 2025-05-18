export interface TransitionEffect {
  duration: number;
  easing: string;
  transform: string;
  opacity: number;
}

export interface OceanAnimationConfig {
  waveCount: number;
  bubbleCount: number;
  particleCount: number;
  rippleFrequency: number;
} 