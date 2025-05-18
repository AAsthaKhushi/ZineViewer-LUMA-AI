import { TransitionEffect } from './types';

// Animation durations and easing
const DURATIONS = {
  WAVE: 2000,
  CURRENT: 3000,
  BUBBLE: 1500,
  FADE: 800,
  RIPPLE: 1200,
  SWIM: 2500,
  GLOW: 4000,
  DEPTH: 5000,
  PARTICLE_FOLLOW: 1000, // New duration for particles following cursor
};

const EASINGS = {
  WAVE: 'cubic-bezier(0.4, 0, 0.2, 1)',
  CURRENT: 'cubic-bezier(0.65, 0, 0.35, 1)',
  BUBBLE: 'ease-out',
  FADE: 'ease-in-out',
  RIPPLE: 'cubic-bezier(0.4, 0, 0.2, 1)',
  SWIM: 'ease-in-out',
  GLOW: 'ease-in-out',
  DEPTH: 'cubic-bezier(0.4, 0, 0.2, 1)',
  PARTICLE_FOLLOW: 'easeOutQuad', // New easing for particle follow
};

export interface OceanAnimationConfig {
  waveCount: number;
  bubbleCount: number;
  particleCount: number;
  rippleFrequency: number;
}

// Default configuration
const DEFAULT_CONFIG: OceanAnimationConfig = {
  waveCount: 3,
  bubbleCount: 15,
  particleCount: 100,
  rippleFrequency: 0.02
};

// Transition effects for different ocean states
export enum OceanEffect {
  WAVES = 'waves',
  BUBBLES = 'bubbles',
  CURRENTS = 'currents',
  DEPTH_PARTICLES = 'depthParticles',
  RIPPLE = 'ripple',
  SWIM = 'swim'
}

// Page transition configurations
export const pageTransition = (effect: OceanEffect): TransitionEffect => {
  switch (effect) {
    case OceanEffect.RIPPLE:
      return {
        duration: DURATIONS.RIPPLE,
        easing: EASINGS.RIPPLE,
        transform: 'translateY(0)',
        opacity: 1,
      };
    case OceanEffect.CURRENTS:
      return {
        duration: DURATIONS.CURRENT,
        easing: EASINGS.CURRENT,
        transform: 'translateX(0)',
        opacity: 0.95,
      };
    case OceanEffect.DEPTH_PARTICLES:
      return {
        duration: DURATIONS.DEPTH,
        easing: EASINGS.DEPTH,
        transform: 'translateY(0)',
        opacity: 0.9,
      };
    case OceanEffect.SWIM:
      return {
        duration: DURATIONS.SWIM,
        easing: EASINGS.SWIM,
        transform: 'translateY(0)',
        opacity: 1,
      };
    default:
      return {
        duration: DURATIONS.FADE,
        easing: EASINGS.FADE,
        transform: 'none',
        opacity: 1,
      };
  }
};

// Create and manage ocean animations
export const runOceanAnimations = (container: HTMLElement, config?: Partial<OceanAnimationConfig>) => {
  // Merge default config with provided config
  const animConfig: OceanAnimationConfig = {
    ...DEFAULT_CONFIG,
    ...config
  };
  
  const waves: HTMLElement[] = [];
  const bubbles: HTMLElement[] = [];
  const depthParticles: HTMLElement[] = [];
  let currentElement: HTMLElement | null = null;

  // Create wave elements
  const createWaves = () => {
    const waveContainer = document.createElement('div');
    waveContainer.className = 'waveContainer';
    container.appendChild(waveContainer);

    for (let i = 0; i < animConfig.waveCount; i++) {
      const wave = document.createElement('div');
      wave.className = 'wave';
      wave.style.animationDelay = `${i * 0.5}s`;
      waveContainer.appendChild(wave);
    }
  };

  // Create bubble elements
  const createBubbles = () => {
    const bubbleContainer = document.createElement('div');
    bubbleContainer.className = 'bubbleContainer';
    container.appendChild(bubbleContainer);

    for (let i = 0; i < animConfig.bubbleCount; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDelay = `${Math.random() * 5}s`;
      bubble.style.animationDuration = `${2 + Math.random() * 3}s`;
      bubbleContainer.appendChild(bubble);
    }
  };

  // Create current effect
  const createCurrent = () => {
    const current = document.createElement('div');
    current.className = 'current';
    container.appendChild(current);
  };

  // Create depth particles
  const createDepthParticles = () => {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'depthParticles';
    container.appendChild(particleContainer);

    for (let i = 0; i < animConfig.particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'depthParticle';
      // Initial random position
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      particle.style.left = `${startX}vw`;
      particle.style.top = `${startY}vh`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particle.style.animationDuration = `${10 + Math.random() * 10}s`; // Longer base animation
      particleContainer.appendChild(particle);
      depthParticles.push(particle); // Store particles to update their position
    }
  };

  // Create ripple effect
  const createRipple = (x: number, y: number) => {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    container.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, DURATIONS.RIPPLE);
  };

  // Handle mouse movement for cursor interaction
  const handleMouseMove = (e: MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Example: Make particles slowly follow the cursor
    depthParticles.forEach(particle => {
      const particleRect = particle.getBoundingClientRect();
      const particleX = particleRect.left + particleRect.width / 2;
      const particleY = particleRect.top + particleRect.height / 2;

      const deltaX = mouseX - particleX;
      const deltaY = mouseY - particleY;

      // Move particle towards cursor, but with a delay/easing for a flowy effect
      // Using requestAnimationFrame for smoother updates (optional but recommended)
      // For simplicity here, I'll directly update style for now, but a more complex
      // implementation would use JS-based animation or physics.
      const currentTransform = particle.style.transform || 'translate(0, 0)';
      const currentTranslateX = parseFloat(currentTransform.split('(')[1]?.split(',')[0] || '0');
      const currentTranslateY = parseFloat(currentTransform.split(',')[1]?.split(')')[0] || '0');

      const easeFactor = 0.05; // Controls how quickly particles follow
      const newTranslateX = currentTranslateX + deltaX * easeFactor;
      const newTranslateY = currentTranslateY + deltaY * easeFactor;

      // Limit movement to prevent particles from going off-screen excessively
       const containerRect = container.getBoundingClientRect();
       const maxTranslateX = containerRect.width / 2;
       const maxTranslateY = containerRect.height / 2;

       const finalTranslateX = Math.max(Math.min(newTranslateX, maxTranslateX), -maxTranslateX);
       const finalTranslateY = Math.max(Math.min(newTranslateY, maxTranslateY), -maxTranslateY);

      particle.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;
    });

    // Example: Trigger ripples occasionally on mouse movement
    if (Math.random() < animConfig.rippleFrequency) {
        createRipple(mouseX, mouseY);
    }
  };

  // Initialize all animations
  const initializeAnimations = () => {
    createWaves();
    createBubbles();
    createCurrent();
    createDepthParticles();
    // Add mousemove listener to the container
    container.addEventListener('mousemove', handleMouseMove);
     // Consider adding click listener for more direct interaction
     // container.addEventListener('click', handleClick);
  };

  // Cleanup function (Modify to remove mousemove listener)
  const cleanup = () => {
    container.removeEventListener('mousemove', handleMouseMove);
    // container.removeEventListener('click', handleClick);
    const elements = container.querySelectorAll('.waveContainer, .bubbleContainer, .current, .depthParticles, .ripple');
    elements.forEach(el => el.remove());
  };

  // Start animations
  initializeAnimations();

  return cleanup;
};

// Export types
export type { TransitionEffect };


export const floatVariant = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0, 10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const fadeInFromDepth = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: 'easeOut',
    },
  },
};

// 3. DRIFTING IMAGE
// ------------------
// Used for floating fish, seaweed, or jellyfish.
export const driftVariant = {
  animate: {
    x: [0, 8, -6, 6, -8, 0],
    y: [0, -4, 4, -3, 3, 0],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// 4. BIOLUMINESCENT GLOW
// ------------------------
// Glowing highlight or text pulses gently.
export const glowPulse = {
  initial: { opacity: 0.7 },
  animate: {
    opacity: [0.7, 1, 0.8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// 5. BUBBLE RISE
// ----------------
// For circular elements or fun facts that rise slowly upward.
export const bubbleRise = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: [-20, -40, -60],
    transition: {
      duration: 6,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

// 6. SLIDE IN VERTICALLY (FOR PAGE ENTRANCE)
// -------------------------------------------
export const slideInVertical = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4,
      ease: 'easeOut',
    },
  },
};