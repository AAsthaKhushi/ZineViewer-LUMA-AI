import styles from './Styles.module.css';

interface PageTransition {
  duration: number;
  easing: string;
}

interface Position {
  x: number;
  y: number;
}

const LEAF_TYPES = [
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23a0e6c1"><path d="M17,8C8,10,5.9,16.17,3.82,21.34l1.89.66l.95-2.3c.48.28.98.53,1.5.76L9,22.34l.75-1.83c.53.17,1.07.31,1.62.42L13,21.5l.63-1.5c.56.1,1.13.17,1.7.2L17,20.5V8Z"/></svg>',
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23a0e6c1"><path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8S16.4,20,12,20z"/></svg>'
] as const;

const createLeaf = (x: number, y: number, isCursorLeaf: boolean = false): HTMLDivElement => {
  const leaf = document.createElement('div');
  leaf.className = isCursorLeaf ? styles.cursorLeaf : styles.leaf;
  
  // Random leaf properties
  const size = isCursorLeaf ? Math.random() * 15 + 8 : Math.random() * 20 + 10;
  const rotation = Math.random() * 360;
  const duration = isCursorLeaf ? 1.5 : Math.random() * 5 + 5;
  
  leaf.style.width = `${size}px`;
  leaf.style.height = `${size}px`;
  leaf.style.left = `${x}px`;
  leaf.style.top = `${y}px`;
  leaf.style.transform = `rotate(${rotation}deg)`;
  leaf.style.animation = `float ${duration}s ease-in-out forwards, glowPulse 3s ease-in-out infinite`;
  
  // Random leaf image
  leaf.style.backgroundImage = `url('${LEAF_TYPES[Math.floor(Math.random() * LEAF_TYPES.length)]}')`;
  
  return leaf;
};

export function runLeafAnimations(container: HTMLElement): () => void {
  const cursorTrailContainer = document.createElement('div');
  cursorTrailContainer.className = styles.cursorTrail;
  document.body.appendChild(cursorTrailContainer);
  
  // Background floating leaves
  const createBackgroundLeaf = () => {
    const x = Math.random() * window.innerWidth;
    const leaf = createLeaf(x, window.innerHeight + 20);
    container.appendChild(leaf);
    
    // Remove leaf after animation
    setTimeout(() => {
      if (leaf.parentNode === container) {
        container.removeChild(leaf);
      }
    }, 7000);
  };
  
  // Initial burst of leaves
  for (let i = 0; i < 5; i++) {
    setTimeout(createBackgroundLeaf, i * 150);
  }
  
  // Periodic background leaves
  const leafInterval = setInterval(createBackgroundLeaf, 2500);
  
  // Optimized mouse move handler with throttling
  let lastMoveTime = 0;
  const handleMouseMove = (e: MouseEvent) => {
    const now = Date.now();
    if (now - lastMoveTime < 50) return; // Throttle to 20fps
    lastMoveTime = now;
    
    // Create new leaf at cursor position with reduced frequency
    if (Math.random() > 0.6) {
      const leaf = createLeaf(e.clientX, e.clientY, true);
      cursorTrailContainer.appendChild(leaf);
      
      // Remove leaf after animation
      setTimeout(() => {
        if (leaf.parentNode === cursorTrailContainer) {
          cursorTrailContainer.removeChild(leaf);
        }
      }, 1200);
    }
  };
  
  // Add floating elements
  const createFloatingElement = () => {
    const element = document.createElement('div');
    element.className = styles.floatingElement;
    
    const size = Math.random() * 30 + 20;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 2 + 3; // Random duration between 3-5s
    
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.style.animation = `fadeInOut ${duration}s ease-in-out infinite, sway ${duration * 1.5}s ease-in-out infinite`;
    
    // Random floating element (leaf or sparkle)
    if (Math.random() > 0.5) {
      element.style.backgroundImage = `url('${LEAF_TYPES[Math.floor(Math.random() * LEAF_TYPES.length)]}')`;
    } else {
      element.style.background = 'radial-gradient(circle, rgba(160, 230, 193, 0.8) 0%, rgba(160, 230, 193, 0) 70%)';
      element.style.borderRadius = '50%';
    }
    
    // Make element interactive
    element.classList.add(styles.interactiveArea);
    
    container.appendChild(element);
    
    // Remove element after some time
    setTimeout(() => {
      if (element.parentNode === container) {
        container.removeChild(element);
      }
    }, 10000);
  };
  
  // Create initial floating elements
  for (let i = 0; i < 10; i++) {
    setTimeout(createFloatingElement, i * 500);
  }
  
  // Add floating elements periodically
  const floatingInterval = setInterval(createFloatingElement, 3000);
  
  // Add mouse move listener
  window.addEventListener('mousemove', handleMouseMove);
  
  // Add click effect
  const handleClick = (e: MouseEvent) => {
    // Create a burst of leaves on click
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const leaf = createLeaf(
          e.clientX + (Math.random() - 0.5) * 50,
          e.clientY + (Math.random() - 0.5) * 50,
          true
        );
        cursorTrailContainer.appendChild(leaf);
        
        setTimeout(() => {
          if (leaf.parentNode === cursorTrailContainer) {
            cursorTrailContainer.removeChild(leaf);
          }
        }, 1500);
      }, i * 100);
    }
  };
  
  window.addEventListener('click', handleClick);
  
  return () => {
    clearInterval(leafInterval);
    clearInterval(floatingInterval);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('click', handleClick);
    if (cursorTrailContainer.parentNode) {
      document.body.removeChild(cursorTrailContainer);
    }
  };
}

export function pageTransition(duration: number = 1000): PageTransition {
  return {
    duration,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
  };
} 