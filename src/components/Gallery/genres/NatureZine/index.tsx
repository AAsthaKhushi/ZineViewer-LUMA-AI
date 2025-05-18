import { useState, useEffect, useRef, ReactNode } from 'react';
import { Leaf } from 'lucide-react';
import BackButton from '../../../ui/BackButton';
import styles from './Styles.module.css';
import NatureZineFooter from './NatureZineFooter';

// Common props interface for floating elements
interface FloatingElementProps {
  size: number;
  delay: number;
  duration: number;
  top: number;
  left: number;
}

interface GlowOrbProps extends FloatingElementProps {
  color: string;
}

interface SunRayProps extends Omit<FloatingElementProps, 'size'> {
  rotation: number;
  width: number;
}

interface FogLayerProps {
  top: number;
  left: number;
  width: number;
  height: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface AnimatedTextProps {
  children: ReactNode;
  delay?: number;
}

// Enhanced Animation helper components with fade in/out effects
const LeafElement = ({ size, delay, duration, top, left }: FloatingElementProps) => {
  const randomPath = Math.floor(Math.random() * 3) + 1; // 3 different path variations
  
  return (
    <div 
      className={`${styles.leafElement} ${styles.floatingElement} ${styles[`floatingPath${randomPath}`]}`}
      style={{
        top: `${top}%`,
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        opacity: 0 // Start invisible for fade-in effect
      }}
    >
      <Leaf 
        size={size} 
        className={`text-emerald-300/40 ${styles.pulseFade}`} 
        style={{
          animationDelay: `${delay + 1}s`,
          animationDuration: `${duration * 0.7}s`
        }}
      />
    </div>
  );
};

const ButterflyElement = ({ size, delay, duration, top, left }: FloatingElementProps) => {
  const randomPath = Math.floor(Math.random() * 4) + 1; // 4 different path variations
  
  return (
    <div 
      className={`${styles.butterflyElement} ${styles.floatingElement} ${styles[`floatingPath${randomPath}`]}`}
      style={{
        top: `${top}%`,
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        opacity: 0 // Start invisible for fade-in effect
      }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none"
        className={styles.flutterWings}
        style={{
          animationDuration: '2s',
          animationDelay: `${delay * 0.5}s`
        }}
      >
        <path 
          d="M12 8C8 4 2 3 2 8C2 13 8 16 12 20C16 16 22 13 22 8C22 3 16 4 12 8Z" 
          fill="#f0a6ca" 
          fillOpacity="0.5"
          className={styles.pulseFade}
          style={{
            animationDuration: `${duration * 0.5}s`,
            animationDelay: `${delay + 1.5}s`
          }}
        />
      </svg>
    </div>
  );
};

const SparkleElement = ({ size, delay, duration, top, left }: FloatingElementProps) => {
  const randomPath = Math.floor(Math.random() * 3) + 1; // 3 different path variations
  
  return (
    <div 
      className={`${styles.sparkleElement} ${styles.floatingElement} ${styles[`sparklingPath${randomPath}`]}`}
      style={{
        top: `${top}%`,
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        width: size,
        height: size,
        opacity: 0 // Start invisible for fade-in effect
      }}
    />
  );
};

// New dramatic elements
const GlowOrb = ({ size, delay, duration, top, left, color }: GlowOrbProps) => {
  return (
    <div 
      className={`${styles.glowOrb} ${styles.floatingElement} ${styles.pulseGlow}`}
      style={{
        top: `${top}%`,
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 70%)`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        opacity: 0 // Start invisible for fade-in effect
      }}
    />
  );
};

const SunRay = ({ rotation, delay, duration, top, left, width }: SunRayProps) => {
  return (
    <div 
      className={`${styles.sunRay} ${styles.fadeInOut}`}
      style={{
        top: `${top}%`,
        left: `${left}%`,
        transform: `rotate(${rotation}deg)`,
        width: `${width}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        opacity: 0 // Start invisible for fade-in effect
      }}
    />
  );
};

// New element: Firefly for magical forest effect
const Firefly = ({ size, delay, duration, top, left }: FloatingElementProps) => {
  const randomPath = Math.floor(Math.random() * 5) + 1; // 5 different path variations
  
  return (
    <div 
      className={`${styles.fireflyElement} ${styles.floatingElement} ${styles[`fireflyPath${randomPath}`]}`}
      style={{
        top: `${top}%`,
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        opacity: 0 // Start invisible for fade-in effect
      }}
    >
      <div 
        className={styles.fireflyGlow}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${delay * 0.3}s`,
          animationDuration: `${duration * 0.2}s`
        }}
      />
    </div>
  );
};

// New element: Fog layer for depth
const FogLayer = ({ top, left, width, height, delay, duration, opacity }: FogLayerProps) => {
  return (
    <div 
      className={`${styles.fogLayer} ${styles.driftAnimation}`}
      style={{
        top: `${top}%`,
        left: `${left}%`,
        width: `${width}px`,
        height: `${height}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        opacity: opacity,
        background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0) 100%)'
      }}
    />
  );
};

const AnimatedText = ({ children, delay = 0 }: AnimatedTextProps) => {
  return (
    <span 
      className={styles.animateFadeIn}
      style={{ animationDelay: `${delay}s`, animationFillMode: 'forwards' }}
    >
      {children}
    </span>
  );
};

interface NatureZineProps {
  onBack: () => void;
}

const NatureZine = ({ onBack }: NatureZineProps) => {
  const [scrollY, setScrollY] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showEntranceAnimation, setShowEntranceAnimation] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sectionRefs = useRef<HTMLElement[]>([]);
  
  const addToRefs = (el: HTMLElement | null) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Load fonts
    const links = [
      {
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        rel: 'stylesheet'
      },
      {
        href: 'https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap',
        rel: 'stylesheet'
      }
    ];
    
    const addedLinks = links.map(link => {
      const el = document.createElement('link');
      Object.entries(link).forEach(([key, value]) => {
        el.setAttribute(key, value);
      });
      document.head.appendChild(el);
      return el;
    });
    
    // Entrance animation effect
    const entranceTimeout = setTimeout(() => {
      setShowEntranceAnimation(false);
    }, 2500);
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealSection);
            entry.target.classList.remove(styles.hiddenSection);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );
    
    sectionRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      addedLinks.forEach(link => {
        if (link.parentNode) {
          document.head.removeChild(link);
        }
      });
      sectionRefs.current.forEach(el => {
        if (el) observer.unobserve(el);
      });
      clearTimeout(entranceTimeout);
    };
  }, []);
  
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };
  
  // Generate floating elements with more variety and drama
  const leaves = [
    { size: 30, delay: 0, duration: 8, top: 10, left: 5 },
    { size: 20, delay: 2, duration: 9, top: 20, left: 80 },
    { size: 15, delay: 4, duration: 7, top: 60, left: 15 },
    { size: 25, delay: 3, duration: 10, top: 75, left: 90 },
    { size: 18, delay: 1, duration: 12, top: 40, left: 95 },
    { size: 22, delay: 5, duration: 11, top: 30, left: 30 },
    { size: 16, delay: 2.5, duration: 9.5, top: 85, left: 50 },
    { size: 28, delay: 6, duration: 10.5, top: 15, left: 40 },
    { size: 17, delay: 3.5, duration: 8.5, top: 65, left: 75 },
    { size: 24, delay: 4.5, duration: 11.5, top: 50, left: 20 }
  ];
  
  const butterflies = [
    { size: 24, delay: 0, duration: 25, top: 15, left: 75 },
    { size: 18, delay: 8, duration: 20, top: 45, left: 10 },
    { size: 20, delay: 15, duration: 18, top: 70, left: 80 },
    { size: 22, delay: 5, duration: 22, top: 35, left: 45 },
    { size: 26, delay: 12, duration: 24, top: 25, left: 60 },
    { size: 19, delay: 3, duration: 23, top: 80, left: 25 }
  ];
  
  const sparkles = [
    { size: 5, delay: 0, duration: 3, top: 25, left: 25 },
    { size: 3, delay: 1, duration: 2, top: 50, left: 85 },
    { size: 4, delay: 2, duration: 2.5, top: 85, left: 30 },
    { size: 3, delay: 0.5, duration: 2, top: 30, left: 60 },
    { size: 2, delay: 1.5, duration: 1.5, top: 65, left: 15 },
    { size: 4, delay: 2.5, duration: 3, top: 15, left: 45 },
    { size: 3, delay: 3, duration: 2.5, top: 55, left: 70 },
    { size: 2, delay: 2, duration: 2, top: 75, left: 40 },
    { size: 3, delay: 4, duration: 2.2, top: 40, left: 20 },
    { size: 4, delay: 1.2, duration: 3.5, top: 60, left: 65 },
    { size: 3, delay: 0.7, duration: 2.7, top: 20, left: 50 },
    { size: 4, delay: 3.2, duration: 3.2, top: 70, left: 55 },
    { size: 2, delay: 2.8, duration: 2.3, top: 35, left: 85 },
    { size: 3, delay: 1.8, duration: 2.8, top: 90, left: 10 }
  ];
  
  // New dramatic elements
  const glowOrbs = [
    { size: 150, delay: 3, duration: 15, top: 20, left: 15, color: 'rgba(160, 230, 193, 0.15)' },
    { size: 200, delay: 8, duration: 18, top: 70, left: 75, color: 'rgba(240, 166, 202, 0.1)' },
    { size: 180, delay: 15, duration: 20, top: 50, left: 30, color: 'rgba(208, 235, 163, 0.12)' },
    { size: 120, delay: 5, duration: 13, top: 30, left: 85, color: 'rgba(184, 210, 235, 0.1)' },
    { size: 160, delay: 12, duration: 16, top: 80, left: 20, color: 'rgba(160, 230, 193, 0.08)' }
  ];
  
  const sunRays = [
    { rotation: 20, delay: 5, duration: 9, top: -10, left: 20, width: 300 },
    { rotation: 160, delay: 8, duration: 12, top: 90, left: 70, width: 250 },
    { rotation: 60, delay: 3, duration: 10, top: 30, left: -10, width: 200 },
    { rotation: 120, delay: 10, duration: 8, top: 60, left: 90, width: 280 }
  ];

  // New fireflies for magical effect
  const fireflies = [
    { size: 4, delay: 1, duration: 6, top: 25, left: 15 },
    { size: 3, delay: 2, duration: 8, top: 40, left: 80 },
    { size: 5, delay: 0.5, duration: 7, top: 75, left: 30 },
    { size: 3, delay: 3, duration: 5, top: 55, left: 65 },
    { size: 4, delay: 4, duration: 9, top: 15, left: 50 },
    { size: 3, delay: 2.5, duration: 7, top: 60, left: 10 },
    { size: 4, delay: 1.5, duration: 6, top: 85, left: 70 },
    { size: 5, delay: 3.5, duration: 8, top: 30, left: 90 },
    { size: 3, delay: 0.8, duration: 7.5, top: 50, left: 45 },
    { size: 4, delay: 2.8, duration: 6.5, top: 70, left: 25 },
    { size: 3, delay: 1.8, duration: 5.5, top: 20, left: 60 }
  ];

  // Fog layers for depth
  const fogLayers = [
    { top: 30, left: -10, width: 500, height: 40, delay: 0, duration: 45, opacity: 0.03 },
    { top: 60, left: -20, width: 600, height: 30, delay: 10, duration: 60, opacity: 0.02 },
    { top: 20, left: 0, width: 550, height: 25, delay: 25, duration: 55, opacity: 0.04 },
    { top: 80, left: -15, width: 650, height: 35, delay: 15, duration: 50, opacity: 0.025 }
  ];
  
  return (
    <div className={styles.container}>
      {/* Entrance animation overlay */}
      {showEntranceAnimation && (
        <div className={styles.entranceOverlay}>
          <div className={styles.entranceContent}>
            <Leaf size={40} className="text-emerald-300" />
            <h2 className={`text-2xl mt-4 text-emerald-300 ${styles.natureTitle}`}>
              Nature's Whisper
            </h2>
          </div>
        </div>
      )}

      {/* Ambient audio */}
      <audio 
        ref={audioRef} 
        loop 
        src="https://cdn.freesound.org/previews/531/531949_2463454-lq.mp3" 
      />
      
      {/* Audio control button */}
      <div className={`${styles.audioControl} ${styles.pulseAnimation}`} onClick={toggleAudio}>
        {isAudioPlaying ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a0e6c1" strokeWidth="2">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a0e6c1" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </div>
      
      {/* Background pastel glows with enhanced animations */}
      <div className={`${styles.pastelGlow} ${styles.breathingGlow}`} style={{ 
        width: '350px', 
        height: '350px', 
        top: '15%', 
        right: '-50px', 
        background: 'radial-gradient(circle, rgba(160, 230, 193, 0.2) 0%, rgba(160, 230, 193, 0) 70%)',
        animationDuration: '10s'
      }} />
      
      <div className={`${styles.pastelGlow} ${styles.breathingGlow}`} style={{ 
        width: '400px', 
        height: '400px', 
        bottom: '10%', 
        left: '-100px', 
        background: 'radial-gradient(circle, rgba(240, 166, 202, 0.1) 0%, rgba(240, 166, 202, 0) 70%)',
        animationDuration: '13s'
      }} />
      
      {/* Enhanced Floating elements */}
      {leaves.map((leaf, i) => (
        <LeafElement key={`leaf-${i}`} {...leaf} />
      ))}
      
      {butterflies.map((butterfly, i) => (
        <ButterflyElement key={`butterfly-${i}`} {...butterfly} />
      ))}
      
      {sparkles.map((sparkle, i) => (
        <SparkleElement key={`sparkle-${i}`} {...sparkle} />
      ))}
      
      {/* New dramatic elements */}
      {glowOrbs.map((orb, i) => (
        <GlowOrb key={`orb-${i}`} {...orb} />
      ))}
      
      {sunRays.map((ray, i) => (
        <SunRay key={`ray-${i}`} {...ray} />
      ))}

      {/* New fireflies for magical effect */}
      {fireflies.map((firefly, i) => (
        <Firefly key={`firefly-${i}`} {...firefly} />
      ))}

      {/* Fog layers for depth */}
      {fogLayers.map((fog, i) => (
        <FogLayer key={`fog-${i}`} {...fog} />
      ))}
      
      {/* Background overlay effect with parallax */}
      <div 
        className={`${styles.ambientBg} ${styles.fadeIn}`}
        style={{ 
          backgroundImage: `url('https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          transform: `translateY(${scrollY * 0.2}px)` 
        }}
      />
      
      <div className="container mx-auto px-4 py-8 relative">
        {/* Header */}
        <div className="flex items-center mb-8 relative z-20">
          <BackButton 
            label="Back to Gallery"
            onClick={onBack}
            size="sm"
          />
          <h1 className={`text-3xl md:text-5xl font-bold ml-4 text-[#a0e6c1] ${styles.natureTitle} ${styles.animateFadeIn} ${styles.textGlow}`} style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            Nature's Whisper
          </h1>
        </div>
        
        <div className="space-y-16 md:space-y-24">
          {/* Hero Section with enhanced effects */}
          <div 
            ref={addToRefs} 
            className={`${styles.heroSection} ${styles.hiddenSection}`}
          >
            <div 
              className={`w-full h-full bg-cover bg-center ${styles.zoomEffect}`}
              style={{ 
                backgroundImage: `url('https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
                transform: `translateY(${scrollY * 0.1}px)` 
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a2719]/80 via-transparent to-[#0a2719]" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h2 className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white ${styles.natureTitle} mb-6 ${styles.textGlow}`}>
                <AnimatedText delay={0.5}>The Forest</AnimatedText> <br />
                <AnimatedText delay={1.0}>Awakens</AnimatedText>
              </h2>
              
              <p className={`max-w-xl text-xl md:text-2xl text-white/90 ${styles.natureText} mt-4`}>
                <AnimatedText delay={1.5}>
                  A journey into the heart of untamed beauty
                </AnimatedText>
              </p>
            </div>
          </div>
          
          {/* Introduction with dramatic glow effects */}
          <div 
            ref={addToRefs}
            className={`${styles.introSection} ${styles.hiddenSection}`}
          >
            <div className={`absolute -top-16 -left-12 w-24 h-24 bg-[#a0e6c1]/10 rounded-full blur-2xl ${styles.pulseGlow}`} />
            <div className={`absolute -bottom-8 -right-16 w-32 h-32 bg-[#a0e6c1]/10 rounded-full blur-2xl ${styles.pulseGlow}`} style={{ animationDelay: '1s' }} />
            
            <div className={`bg-gradient-to-br from-[#0a2719]/80 to-[#143a27]/80 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-[#a0e6c1]/20 relative overflow-hidden ${styles.glowBorder}`}>
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a0e6c1]/30 to-transparent ${styles.shimmerLine}`} />
              
              <p className={`text-xl md:text-2xl text-white/90 ${styles.natureText} leading-relaxed`}>
                Morning dew glistens on every leaf as the forest stirs to life. The air, crisp and sweet, 
                carries whispers between the ancient trees. This is not merely a place—it is a 
                <span className={`${styles.textHighlight} ${styles.shimmerEffect} ${styles.textGlow}`}> living tapestry of countless interconnected stories</span>, 
                each one unfolding in its own rhythm.
              </p>
            </div>
          </div>
          
          {/* Seasons Section with enhanced hover effects */}
          <div 
            ref={addToRefs}
            className={`${styles.hiddenSection} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto`}
          >
            {[
              {
                title: "Spring",
                content: "New life emerges from soil still cool from winter's touch. Buds unfurl in slow-motion celebration, a testament to the persistent cycle of rebirth that defines the forest's existence.",
                image: "https://images.pexels.com/photos/1028225/pexels-photo-1028225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                transform: "md:translate-y-12"
              },
              {
                title: "Summer",
                content: "The canopy thickens, transforming sunlight into the energy that powers this vast community. In the dappled light below, countless stories unfold in the warmth of long days.",
                image: "https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                transform: "md:translate-y-0"
              },
              {
                title: "Autumn",
                content: "Trees prepare for rest, their leaves a final brilliant display before returning to the earth. The forest floor becomes a mosaic of crimson and gold, a celebration of endings that lead to beginnings.",
                image: "https://images.pexels.com/photos/1808329/pexels-photo-1808329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                transform: "md:translate-y-24"
              }
            ].map((season, index) => (
              <div key={season.title} className={`transform ${season.transform}`}>
                <div className={`${styles.seasonCard} ${styles.hoverLift}`}>
                  <div className={`absolute ${index % 2 === 0 ? '-top-10 -right-10' : '-bottom-10 -left-10'} w-20 h-20 bg-[#a0e6c1]/10 rounded-full blur-xl ${styles.pulseGlow}`} />
                  
                  <h4 className={`text-2xl font-medium text-[#a0e6c1] mb-4 ${styles.natureTitle} ${styles.textGlow}`}>{season.title}</h4>
                  <p className={`text-white/80 ${styles.natureText}`}>
                    {season.content}
                  </p>
                  
                  <div className="mt-6 h-40 rounded-lg overflow-hidden relative">
                    <div 
                      className={`w-full h-full bg-cover bg-center rounded-lg ${styles.zoomOnHover}`} 
                      style={{ backgroundImage: `url(${season.image})` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Winter Card with enhanced effects */}
          <div className="transform md:translate-y-12 mt-8 md:mt-0 max-w-6xl mx-auto">
            <div className={`${styles.seasonCard} ${styles.hoverLift}`}>
              <div className={`absolute -bottom-10 -right-10 w-20 h-20 bg-[#a0e6c1]/10 rounded-full blur-xl ${styles.pulseGlow}`} />
              <h4 className={`text-2xl font-medium text-[#a0e6c1] mb-4 ${styles.natureTitle} ${styles.textGlow}`}>Winter</h4>
              <p className={`text-white/80 ${styles.natureText}`}>
                Silence blankets the landscape as the forest enters its deepest meditation.
                In this dormancy, energy is conserved and the unseen work of renewal continues
                beneath the surface of snow and frozen earth.
              </p>
              <div className="mt-6 h-40 rounded-lg overflow-hidden relative">
                <div
                  className={`w-full h-full bg-cover bg-center rounded-lg ${styles.zoomOnHover}`}
                  style={{
                    backgroundImage: `url('https://images.pexels.com/photos/688660/pexels-photo-688660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
                  }}
                  />
                  </div>
                </div>
              </div>
              
              {/* Featured Quote - Elegant display with enhanced glow effect */}
              <div 
                ref={addToRefs}
                className={`${styles.hiddenSection} relative max-w-4xl mx-auto py-16`}
              >
                <div className={`absolute top-0 left-1/4 w-40 h-40 bg-[#f0a6ca]/10 rounded-full blur-3xl ${styles.pulseGlow}`} style={{ animationDelay: '0.5s' }} />
                <div className={`absolute bottom-0 right-1/4 w-32 h-32 bg-[#a0e6c1]/10 rounded-full blur-3xl ${styles.pulseGlow}`} style={{ animationDelay: '1.5s' }} />
                
                <blockquote className={`${styles.quoteCard} ${styles.shimmerBorder}`}>
                  <div className={`text-5xl text-[#a0e6c1]/30 absolute -top-6 left-6 ${styles.textGlow}`}>"</div>
                  <div className={`text-5xl text-[#a0e6c1]/30 absolute -bottom-16 right-6 ${styles.textGlow}`}>"</div>
                  
                  <p className={`text-xl md:text-2xl lg:text-3xl italic text-white/90 ${styles.natureText} leading-relaxed mb-6`}>
                    In the forest, time flows differently.
                    A single moment may contain centuries of wisdom,
                    and a thousand years might pass in the blink of an eye.
                  </p>
                  
                  <footer className={`text-lg text-[#a0e6c1] ${styles.natureTitle} ${styles.shimmerEffect}`}>
                    — The Ancient Whisper
                  </footer>
                </blockquote>
              </div>
              
              {/* Forest Life Section with dynamic hover cards */}
              <div 
                ref={addToRefs}
                className={`${styles.hiddenSection} py-12`}
              >
                <h3 className={`text-3xl md:text-4xl font-bold text-[#a0e6c1] mb-12 text-center ${styles.natureTitle} ${styles.textGlow}`}>
                  The Symphony of Forest Life
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                  {[
                    {
                      title: "The Canopy",
                      content: "High above the forest floor, a complex network of branches creates a world of its own. Here, birds build nests, insects establish colonies, and sunlight is filtered into the dappled patterns that dance across the understory.",
                      icon: (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a0e6c1" strokeWidth="1.5">
                          <path d="M12 22V8M20 22v-9M4 22v-9M16 5l-4-2-4 2M16 5v3a2 2 0 1 1-4 0M8 5v3a2 2 0 1 0 4 0"/>
                        </svg>
                      )
                    },
                    {
                      title: "The Understory",
                      content: "Younger trees and shrubs create a middle world between the towering canopy and the forest floor. This layer is a critical habitat for birds and mammals that thrive in the filtered light and abundant food sources.",
                      icon: (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a0e6c1" strokeWidth="1.5">
                          <path d="M21 21H3M6 13V5.5a2.5 2.5 0 0 1 5 0V13M6 8h5M18 13V5.5a2.5 2.5 0 0 0-5 0V13M18 8h-5M12 13v8"/>
                        </svg>
                      )
                    },
                    {
                      title: "The Forest Floor",
                      content: "A realm of decomposition and rebirth, where fallen leaves and branches are transformed back into soil. Fungi networks connect trees in underground conversations, sharing nutrients and information across great distances.",
                      icon: (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a0e6c1" strokeWidth="1.5">
                          <path d="M2 22h20M5.1 17.8l3.9-3.9M5 17.8V14M19 17.8l-3.9-3.9M19 17.8V14M12 2v5M10 7h4M8 22v-5c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v5"/>
                        </svg>
                      )
                    },
                    {
                      title: "The Root System",
                      content: "Beneath our feet lies an invisible world as vast as the forest above. Roots extend far beyond the tree's canopy, intertwining with fungi to form mycorrhizal networks—the internet of the forest.",
                      icon: (
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#a0e6c1" strokeWidth="1.5">
                          <path d="M12 2v8M12 22v-8M4.93 7.93l10.14 10.14M19.07 7.93L8.93 18.07"/>
                        </svg>
                      )
                    }
                  ].map((item) => (
                    <div key={item.title} className={`${styles.forestLifeCard} ${styles.hoverGlow}`}>
                      <div className="flex items-start">
                        <div className={`${styles.iconWrapper} ${styles.pulseAnimation}`}>
                          {item.icon}
                        </div>
                        <div className="ml-5">
                          <h4 className={`text-xl font-semibold text-[#a0e6c1] mb-3 ${styles.natureTitle} ${styles.textGlow}`}>
                            {item.title}
                          </h4>
                          <p className={`text-white/80 ${styles.natureText}`}>
                            {item.content}
                          </p>
                        </div>
                      </div>
                      <div className={`${styles.cardHighlight}`} />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Interactive Section - Cycle of Life */}
              <div 
                ref={addToRefs}
                className={`${styles.hiddenSection} py-16 relative`}
              >
                <div className={`absolute inset-0 bg-[#0a2719]/50 backdrop-blur-sm -z-10 ${styles.ambientGlow}`} />
                
                <h3 className={`text-3xl md:text-4xl font-bold text-[#a0e6c1] mb-10 text-center ${styles.natureTitle} ${styles.textGlow}`}>
                  The Eternal Cycle
                </h3>
                
                <div className="max-w-4xl mx-auto relative">
                  <div className={`${styles.cycleRing}`} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      {
                        phase: "Birth",
                        content: "Seeds germinate, pushing through soil to reach sunlight. Each tiny sprout contains the blueprint for a forest giant.",
                        icon: "🌱"
                      },
                      {
                        phase: "Growth",
                        content: "Saplings stretch skyward, competing for light and nutrients. Only the strongest will reach the canopy.",
                        icon: "🌿"
                      },
                      {
                        phase: "Maturity",
                        content: "Trees reach their full height, becoming homes and hubs for countless species in the ecosystem.",
                        icon: "🌳"
                      },
                      {
                        phase: "Renewal",
                        content: "Fallen trees decompose, returning nutrients to the soil and creating space for new life to begin.",
                        icon: "🍂"
                      }
                    ].map((phase, index) => (
                      <div 
                        key={phase.phase} 
                        className={`${styles.cyclePhaseCard} transition-transform duration-500 ${styles.fadeUpElement}`}
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <div className={`text-4xl mb-4 ${styles.phaseIcon}`}>{phase.icon}</div>
                        <h4 className={`text-xl font-medium text-[#a0e6c1] mb-3 ${styles.natureTitle} ${styles.textGlow}`}>
                          {phase.phase}
                        </h4>
                        <p className={`text-white/80 ${styles.natureText}`}>
                          {phase.content}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Image Gallery with parallax effects */}
              <div 
                ref={addToRefs}
                className={`${styles.hiddenSection} py-12`}
              >
                <h3 className={`text-3xl md:text-4xl font-bold text-[#a0e6c1] mb-10 text-center ${styles.natureTitle} ${styles.textGlow}`}>
                  Glimpses of Wonder
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {[
                    {
                      url: "https://images.pexels.com/photos/1366913/pexels-photo-1366913.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                      title: "Morning Light",
                      description: "Sunbeams pierce through morning mist"
                    },
                    {
                      url: "https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                      title: "Hidden Stream",
                      description: "Water carves its path through ancient stones"
                    },
                    {
                      url: "https://images.pexels.com/photos/1643113/pexels-photo-1643113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                      title: "Woodland Creatures",
                      description: "Each resident plays a vital ecological role"
                    },
                    {
                      url: "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                      title: "Autumn's Canvas",
                      description: "A vibrant farewell before winter's rest"
                    },
                    {
                      url: "https://images.pexels.com/photos/1144687/pexels-photo-1144687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                      title: "Forest Detail",
                      description: "Tiny ecosystems thrive in every crevice"
                    },
                    {
                      url: "https://images.pexels.com/photos/1643409/pexels-photo-1643409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                      title: "Twilight Magic",
                      description: "The transition hour when worlds overlap"
                    }
                  ].map((image, index) => (
                    <div 
                      key={index} 
                      className={`${styles.galleryCard} ${styles.hoverLift} ${index % 3 === 1 ? 'md:transform md:translate-y-12' : ''}`}
                    >
                      <div className="h-64 overflow-hidden rounded-lg">
                        <div 
                          className={`w-full h-full bg-cover bg-center ${styles.parallaxImage}`} 
                          style={{ 
                            backgroundImage: `url(${image.url})`,
                            transform: `translateY(${scrollY * 0.05}px)`
                          }}
                        />
                      </div>
                      <div className="pt-4">
                        <h5 className={`text-lg font-medium text-[#a0e6c1] ${styles.natureTitle} ${styles.textGlow}`}>
                          {image.title}
                        </h5>
                        <p className={`text-sm text-white/70 ${styles.natureText}`}>
                          {image.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Conclusion Section with call to action */}
              <div 
                ref={addToRefs}
                className={`${styles.hiddenSection} py-16 relative`}
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-[#143a27]/80 to-[#0a2719]/80 overflow-hidden ${styles.glowBorder} -z-10`}>
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a0e6c1]/30 to-transparent ${styles.shimmerLine}`} />
                </div>
                
                <div className="max-w-3xl mx-auto text-center px-4 py-10">
                  <h3 className={`text-3xl md:text-4xl font-bold text-[#a0e6c1] mb-6 ${styles.natureTitle} ${styles.textGlow}`}>
                    Listen to the Forest's Whisper
                  </h3>
                  
                  <p className={`text-xl text-white/90 ${styles.natureText} leading-relaxed mb-8`}>
                    The forest doesn't speak in words, but in sensations—the cool touch of mist on skin, 
                    the rustling conversation of leaves, the rich scent of earth after rain. 
                    To hear its voice is to remember our place in the greater symphony of life.
                  </p>
                  
                  <div className={`${styles.ctaButton} ${styles.pulseAnimation}`}>
                    <span>Explore More</span>
                    <svg className="ml-2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Replace the old footer with the new component */}
              <NatureZineFooter />
            </div>
      </div>
    </div>
      );
    };

    export default NatureZine;