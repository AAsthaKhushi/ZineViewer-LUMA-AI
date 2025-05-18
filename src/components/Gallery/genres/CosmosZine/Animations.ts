import styles from './Styles.module.css';

interface PageTransition {
  duration: number;
  easing: string;
  effect: TransitionEffect;
}

// Available transition effects
export enum TransitionEffect {
  COSMIC_ASCEND = 'cosmic-ascend',     // Fade-in + Slide-up
  STARFIELD_PARALLAX = 'starfield-parallax',  // Parallax scrolling stars
  WARP_SPEED = 'warp-speed',           // Zoom in from center
  NEBULA_FADE = 'nebula-fade',         // Nebula swirl with particles
  PLANETARY_ORBIT = 'planetary-orbit',  // Orbiting elements
  TYPOGRAPHIC_FLICKER = 'typographic-flicker' // Text flickering effect
}

// Star types for different cosmic elements
const STAR_TYPES = [
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff"><path d="M12,2L15.09,8.26L22,9.27L17,14.14L18.18,21.02L12,17.77L5.82,21.02L7,14.14L2,9.27L8.91,8.26L12,2Z"/></svg>',
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff"><circle cx="12" cy="12" r="2"/></svg>',
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ffffff"><path d="M12,2L14.4,7.2L20,8.4L16,12.6L16.8,18.4L12,16.2L7.2,18.4L8,12.6L4,8.4L9.6,7.2L12,2Z"/></svg>'
] as const;

// Planet types for orbital animations
const PLANET_TYPES = [
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2387CEEB"><circle cx="12" cy="12" r="10"/></svg>',
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23E39E54"><circle cx="12" cy="12" r="8"/></svg>',
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23A569BD"><circle cx="12" cy="12" r="12"/></svg>'
] as const;

const createStar = (x: number, y: number, isCursorStar: boolean = false): HTMLDivElement => {
  const star = document.createElement('div');
  star.className = isCursorStar ? styles.cursorStar : styles.star;
  
  // Random star properties
  const size = isCursorStar ? Math.random() * 12 + 6 : Math.random() * 8 + 4;
  const rotation = Math.random() * 360;
  const duration = isCursorStar ? 1.2 : Math.random() * 4 + 3;
  const twinkleDelay = Math.random() * 2;
  
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.left = `${x}px`;
  star.style.top = `${y}px`;
  star.style.transform = `rotate(${rotation}deg)`;
  star.style.animation = `twinkle ${duration}s ease-in-out ${twinkleDelay}s infinite`;
  
  // Random star image
  star.style.backgroundImage = `url('${STAR_TYPES[Math.floor(Math.random() * STAR_TYPES.length)]}')`;
  
  return star;
};

// Create orbiting planets for planetary orbit transition
const createOrbitingPlanet = (centerX: number, centerY: number): HTMLDivElement => {
  const planet = document.createElement('div');
  planet.className = styles.orbitingPlanet;
  
  const size = Math.random() * 20 + 10;
  const orbitRadius = Math.random() * 100 + 50;
  const orbitSpeed = Math.random() * 4 + 3;
  const startAngle = Math.random() * 360;
  
  planet.style.width = `${size}px`;
  planet.style.height = `${size}px`;
  
  // Set planet type
  planet.style.backgroundImage = `url('${PLANET_TYPES[Math.floor(Math.random() * PLANET_TYPES.length)]}')`;
  
  // Set initial position based on orbit
  const angle = startAngle * (Math.PI / 180);
  const x = centerX + Math.cos(angle) * orbitRadius;
  const y = centerY + Math.sin(angle) * orbitRadius;
  
  planet.style.left = `${x}px`;
  planet.style.top = `${y}px`;
  
  // Animation for orbit
  planet.style.animation = `orbit ${orbitSpeed}s linear infinite`;
  planet.dataset.centerX = centerX.toString();
  planet.dataset.centerY = centerY.toString();
  planet.dataset.radius = orbitRadius.toString();
  planet.dataset.startAngle = startAngle.toString();
  
  return planet;
};

// Create nebula effect for nebula fade transition
const createNebula = (x: number, y: number): HTMLDivElement => {
  const nebula = document.createElement('div');
  nebula.className = styles.nebula;
  
  const size = Math.random() * 300 + 200;
  const hue = Math.floor(Math.random() * 60) + 240; // Blue to purple range
  const opacity = Math.random() * 0.3 + 0.1;
  
  nebula.style.width = `${size}px`;
  nebula.style.height = `${size}px`;
  nebula.style.left = `${x - size/2}px`;
  nebula.style.top = `${y - size/2}px`;
  nebula.style.background = `radial-gradient(circle, hsla(${hue}, 80%, 60%, ${opacity}) 0%, hsla(${hue}, 80%, 60%, 0) 70%)`;
  nebula.style.filter = 'blur(20px)';
  nebula.style.transform = `rotate(${Math.random() * 360}deg)`;
  
  return nebula;
};

export function runCosmicAnimations(container: HTMLElement): () => void {
  const cursorTrailContainer = document.createElement('div');
  cursorTrailContainer.className = styles.cursorTrail;
  document.body.appendChild(cursorTrailContainer);
  
  // Background floating stars
  const createBackgroundStar = () => {
    const x = Math.random() * window.innerWidth;
    const star = createStar(x, Math.random() * window.innerHeight);
    container.appendChild(star);
    
    // Remove star after animation
    setTimeout(() => {
      if (star.parentNode === container) {
        container.removeChild(star);
      }
    }, 6000);
  };
  
  // Initial burst of stars
  for (let i = 0; i < 20; i++) {
    setTimeout(createBackgroundStar, i * 100);
  }
  
  // Periodic background stars
  const starInterval = setInterval(createBackgroundStar, 2000);
  
  // Create parallax star layers for starfield parallax
  const createParallaxLayers = () => {
    // Create three layers of stars with different speeds
    const layers = [0.2, 0.5, 0.8]; // Different speeds for parallax effect
    
    layers.forEach((speed, index) => {
      const layer = document.createElement('div');
      layer.className = styles.parallaxLayer;
      layer.style.zIndex = `${index + 1}`;
      layer.dataset.speed = speed.toString();
      container.appendChild(layer);
      
      // Add stars to this layer
      for (let i = 0; i < 15; i++) {
        const star = createStar(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight
        );
        layer.appendChild(star);
      }
    });
  };
  
  createParallaxLayers();
  
  // Optimized mouse move handler with throttling
  let lastMoveTime = 0;
  const handleMouseMove = (e: MouseEvent) => {
    const now = Date.now();
    if (now - lastMoveTime < 50) return; // Throttle to 20fps
    lastMoveTime = now;
    
    // Create new star at cursor position with reduced frequency
    if (Math.random() > 0.7) {
      const star = createStar(e.clientX, e.clientY, true);
      cursorTrailContainer.appendChild(star);
      
      // Remove star after animation
      setTimeout(() => {
        if (star.parentNode === cursorTrailContainer) {
          cursorTrailContainer.removeChild(star);
        }
      }, 1000);
    }
    
    // Update parallax layers on mouse move
    const parallaxLayers = document.querySelectorAll(`.${styles.parallaxLayer}`);
    parallaxLayers.forEach((layer) => {
      const speed = parseFloat((layer as HTMLElement).dataset.speed || '0.5');
      const x = (window.innerWidth / 2 - e.clientX) * speed;
      const y = (window.innerHeight / 2 - e.clientY) * speed;
      (layer as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
    });
  };
  
  // Add cosmic dust elements
  const createCosmicDust = () => {
    const dust = document.createElement('div');
    dust.className = styles.cosmicDust;
    
    const size = Math.random() * 40 + 20;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 3 + 4; // Random duration between 4-7s
    
    dust.style.width = `${size}px`;
    dust.style.height = `${size}px`;
    dust.style.left = `${x}px`;
    dust.style.top = `${y}px`;
    dust.style.animation = `drift ${duration}s ease-in-out infinite`;
    dust.style.background = `radial-gradient(circle, rgba(138, 43, 226, ${Math.random() * 0.2 + 0.1}) 0%, rgba(138, 43, 226, 0) 70%)`;
    dust.style.filter = 'blur(8px)';
    
    container.appendChild(dust);
    
    // Remove dust after some time
    setTimeout(() => {
      if (dust.parentNode === container) {
        container.removeChild(dust);
      }
    }, 12000);
  };
  
  // Create initial cosmic dust
  for (let i = 0; i < 8; i++) {
    setTimeout(createCosmicDust, i * 600);
  }
  
  // Add cosmic dust periodically
  const dustInterval = setInterval(createCosmicDust, 4000);
  
  // Add mouse move listener
  window.addEventListener('mousemove', handleMouseMove);
  
  // Add click effect
  const handleClick = (e: MouseEvent) => {
    // Create a burst of stars on click
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const star = createStar(
          e.clientX + (Math.random() - 0.5) * 60,
          e.clientY + (Math.random() - 0.5) * 60,
          true
        );
        cursorTrailContainer.appendChild(star);
        
        setTimeout(() => {
          if (star.parentNode === cursorTrailContainer) {
            cursorTrailContainer.removeChild(star);
          }
        }, 1200);
      }, i * 80);
    }
    
    // Create a cosmic dust burst
    const dustBurst = document.createElement('div');
    dustBurst.className = styles.cosmicDustBurst;
    dustBurst.style.left = `${e.clientX}px`;
    dustBurst.style.top = `${e.clientY}px`;
    container.appendChild(dustBurst);
    
    setTimeout(() => {
      if (dustBurst.parentNode === container) {
        container.removeChild(dustBurst);
      }
    }, 1000);
  };
  
  window.addEventListener('click', handleClick);
  
  return () => {
    clearInterval(starInterval);
    clearInterval(dustInterval);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('click', handleClick);
    if (cursorTrailContainer.parentNode) {
      document.body.removeChild(cursorTrailContainer);
    }
  };
}

// Function to apply a typographic flicker effect to an element
export function applyTypographicFlicker(element: HTMLElement, intensity: number = 0.7): void {
  element.className += ` ${styles.flickerText}`;
  element.style.setProperty('--flicker-intensity', intensity.toString());
  
  // Add individual letter animation for more realistic effect
  const text = element.textContent || '';
  element.textContent = '';
  
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement('span');
    span.textContent = text[i];
    span.style.animationDelay = `${Math.random() * 2}s`;
    span.style.animationDuration = `${Math.random() * 4 + 2}s`;
    element.appendChild(span);
  }
}

// Function to create and apply the warp speed transition effect
export function createWarpSpeedEffect(container: HTMLElement, duration: number = 1000): void {
  const warpContainer = document.createElement('div');
  warpContainer.className = styles.warpSpeedContainer;
  container.appendChild(warpContainer);
  
  // Create stars for the warp speed effect
  for (let i = 0; i < 100; i++) {
    const warpStar = document.createElement('div');
    warpStar.className = styles.warpStar;
    
    const size = Math.random() * 3 + 1;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const speed = Math.random() * 4 + 1;
    
    warpStar.style.width = `${size}px`;
    warpStar.style.height = `${size * 3}px`; // Elongated stars for speed effect
    warpStar.style.left = `${x}px`;
    warpStar.style.top = `${y}px`;
    warpStar.style.animationDuration = `${speed}s`;
    
    warpContainer.appendChild(warpStar);
  }
  
  // Remove after transition completes
  setTimeout(() => {
    if (warpContainer.parentNode === container) {
      container.removeChild(warpContainer);
    }
  }, duration);
}

// Apply planetary orbit effect
export function createPlanetaryOrbitEffect(container: HTMLElement, centerElement: HTMLElement, duration: number = 3000): void {
  const rect = centerElement.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  // Create orbiting planets
  for (let i = 0; i < 5; i++) {
    const planet = createOrbitingPlanet(centerX, centerY);
    container.appendChild(planet);
    
    // Fade out and remove after animation
    setTimeout(() => {
      planet.style.opacity = '0';
      setTimeout(() => {
        if (planet.parentNode === container) {
          container.removeChild(planet);
        }
      }, 1000);
    }, duration - 1000);
  }
}

// Create nebula fade transition
export function createNebulaFadeEffect(container: HTMLElement, duration: number = 3000): void {
  // Create central nebula
  const nebula = createNebula(
    window.innerWidth / 2,
    window.innerHeight / 2
  );
  container.appendChild(nebula);
  
  // Create floating particles
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.className = styles.nebulaParticle;
      
      const size = Math.random() * 8 + 4;
      const x = window.innerWidth / 2 + (Math.random() - 0.5) * 300;
      const y = window.innerHeight / 2 + (Math.random() - 0.5) * 300;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.background = `radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%)`;
      
      container.appendChild(particle);
      
      // Animate particle upward
      setTimeout(() => {
        particle.style.transform = 'translateY(-100px)';
        particle.style.opacity = '0';
        
        setTimeout(() => {
          if (particle.parentNode === container) {
            container.removeChild(particle);
          }
        }, 1000);
      }, 100);
    }, i * 200);
  }
  
  // Fade out and remove nebula
  setTimeout(() => {
    nebula.style.opacity = '0';
    setTimeout(() => {
      if (nebula.parentNode === container) {
        container.removeChild(nebula);
      }
    }, 1000);
  }, duration - 1000);
}

// Main page transition function with different effects
export function pageTransition(effect: TransitionEffect = TransitionEffect.COSMIC_ASCEND, duration: number = 1000): PageTransition {
  let easing = 'cubic-bezier(0.4, 0, 0.2, 1)';
  
  switch (effect) {
    case TransitionEffect.WARP_SPEED:
      easing = 'cubic-bezier(0.19, 1, 0.22, 1)'; // Exponential out for zoom effect
      break;
    case TransitionEffect.NEBULA_FADE:
      easing = 'cubic-bezier(0.25, 0.1, 0.25, 1)'; // Smooth for fade effect
      break;
    case TransitionEffect.STARFIELD_PARALLAX:
      easing = 'cubic-bezier(0.645, 0.045, 0.355, 1)'; // Ease in-out for smooth parallax
      break;
    case TransitionEffect.PLANETARY_ORBIT:
      easing = 'cubic-bezier(0.34, 1.56, 0.64, 1)'; // Bouncy effect for orbits
      break;
    case TransitionEffect.TYPOGRAPHIC_FLICKER:
      easing = 'cubic-bezier(0.22, 1, 0.36, 1)'; // Quick in, slow out
      break;
  }
  
  return {
    duration,
    easing,
    effect
  };
}