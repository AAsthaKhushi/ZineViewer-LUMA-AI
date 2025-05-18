import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../ui/BackButton';
import styles from './Styles.module.css';
import { runOceanAnimations, OceanAnimationConfig, fadeInFromDepth, bubbleRise, floatVariant, driftVariant, glowPulse } from './Animations';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import OceanFooter from './OceanFooter';

interface OceanZineProps {
  onNavigate: (path: string) => void;
}

const OceanZine: React.FC<OceanZineProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<{title: string, content: React.ReactNode}>({title: '', content: null});
  
  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Parallax effect values
  const surfaceParallax = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const coralParallax = useTransform(scrollYProgress, [0.2, 0.5], [0, -40]);
  const twilightParallax = useTransform(scrollYProgress, [0.4, 0.7], [0, -30]);
  const abyssParallax = useTransform(scrollYProgress, [0.6, 1], [0, -20]);

  const slides = [
    {
      id: 'surface',
      title: 'The Surface Realm',
      subtitle: 'Where sunlight kisses the waves',
      content: (
        <>
          <p>Dive into the vibrant layer where light reigns supreme. Schools of fish dart through coral gardens, painted in hues of the sunlit spectrum.</p>
        </>
      ),
      funFact: "Only 5% of the ocean has been explored. We know more about the surface of Mars than our own seabeds.",
      interactiveElements: [
        { id: 'surface-fish', title: 'Surface Fish', content: 'Surface fish have adapted to life in the sunlit zone with vibrant colors that help with camouflage or attracting mates.' },
        { id: 'surface-waves', title: 'Wave Dynamics', content: 'Waves are formed by wind transferring energy to the water surface, creating the rhythmic pattern we observe.' }
      ],
      parallax: surfaceParallax
    },
    {
      id: 'coral',
      title: 'The Coral Kingdom',
      subtitle: 'A city of color and life',
      content: (
        <>
          <p>Explore the bustling metropolis of coral reefs, teeming with biodiversity. A fragile ecosystem pulsating with life and intricate beauty.</p>
        </>
      ),
      funFact: "Coral reefs support more species per unit area than any other marine environment.",
      interactiveElements: [
        { id: 'coral-polyps', title: 'Coral Polyps', content: 'Though they may look like plants, corals are actually animals related to jellyfish and sea anemones.' },
        { id: 'coral-symbiosis', title: 'Reef Symbiosis', content: 'Coral polyps have a symbiotic relationship with algae called zooxanthellae, which provide nutrients through photosynthesis.' }
      ],
      parallax: coralParallax
    },
    {
      id: 'twilight',
      title: 'The Twilight Zone',
      subtitle: 'Where light fades and mystery begins',
      content: (
        <>
          <p>Descend into the mesopelagic zone, where sunlight dwindles and bioluminescent creatures glow in the perpetual dusk.</p>
        </>
      ),
      funFact: "The twilight zone begins around 200 meters deep—where light barely reaches but life still thrives.",
      interactiveElements: [
        { id: 'twilight-bioluminescence', title: 'Bioluminescence', content: 'Many twilight zone creatures produce their own light through chemical reactions to attract prey, find mates, or confuse predators.' },
        { id: 'twilight-adaptation', title: 'Deep Adaptations', content: 'Animals here have developed large eyes to capture scarce light, or transparent bodies to avoid being seen.' }
      ],
      parallax: twilightParallax
    },
    {
      id: 'abyss',
      title: 'The Abyssal Mystery',
      subtitle: 'Into the crushing dark',
      content: (
        <>
          <p>Enter the abyss, a world of extreme pressure and absolute darkness. Yet, life persists, adapted to this alien environment.</p>
        </>
      ),
      funFact: "The pressure in the abyss can crush a human, but bizarre creatures survive and thrive here.",
      interactiveElements: [
        { id: 'abyss-anglerfish', title: 'Anglerfish', content: 'The iconic anglerfish uses a bioluminescent lure to attract prey in the pitch-black depths.' },
        { id: 'abyss-pressure', title: 'Extreme Pressure', content: 'At abyssal depths, pressure can exceed 11,000 pounds per square inch - equivalent to an elephant standing on a postage stamp.' }
      ],
      parallax: abyssParallax
    }
  ];

  // Navigation dots indicator
  const handleDotClick = (index: number) => {
    const element = document.getElementById(slides[index].id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSlideIndex(index);
    }
  };

  // Update active slide based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let i = slides.length - 1; i >= 0; i--) {
        const section = document.getElementById(slides[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSlideIndex(i);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slides]);

  // Interactive element handler
  const handleInteractiveElementClick = (title: string, content: React.ReactNode) => {
    setSelectedDetail({ title, content });
    setShowDetailModal(true);
  };

  const handleBack = () => {
    onNavigate('/gallery');
  };

  // Animation configuration
  const animationConfig: OceanAnimationConfig = {
    waveCount: 5,
    bubbleCount: 40, // Increased bubble count
    particleCount: 120, // Increased particle count
    rippleFrequency: 1200 // Slightly faster ripples
  };

  useEffect(() => {
    const container = containerRef.current;
    console.log('OceanZine container', container);
    if (!container) {
      console.error('OceanZine container not found');
      return;
    }

    // Run the ocean animations, passing the container element and config
    const cleanup = runOceanAnimations(container, animationConfig);

    // Cleanup animations on component unmount
    return () => {
      cleanup();
    };
  }, []);

  return (
    <motion.main 
      className={styles.oceanZineContainer} 
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <BackButton
        onClick={handleBack}
        label="Back to Gallery"
        size="md"
        className={styles.backButton}
      />

      {/* Navigation Indicators */}
      <div className={styles.navigationDots}>
        {slides.map((slide, index) => (
          <button 
            key={`nav-${slide.id}`} 
            className={`${styles.navDot} ${activeSlideIndex === index ? styles.activeNavDot : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Navigate to ${slide.title}`}
          >
            <span className={styles.navDotTooltip}>{slide.title}</span>
          </button>
        ))}
      </div>

      {/* Main content sections */}
      {slides.map((slide, index) => (
        <motion.section
          key={slide.id}
          id={slide.id}
          className={`${styles.zineSection} ${styles[slide.id + 'Section']}`}
          style={{ y: slide.parallax }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-100px" }}
          transition={{ staggerChildren: 0.2 }}
        >
          {/* Background/Overlay Elements */}
          {slide.id === 'surface' && (
            <div className={styles.surfaceEffects}>
              <motion.div 
                className={styles.lightRay} 
                animate={{ 
                  opacity: [0.5, 0.8, 0.5], 
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, 0] 
                }} 
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }} 
              />
              <motion.div 
                className={`${styles.lightRay} ${styles.lightRay2}`} 
                animate={{ 
                  opacity: [0.7, 0.4, 0.7], 
                  scale: [1, 1.03, 1],
                  rotate: [0, -1, 0] 
                }} 
                transition={{ 
                  duration: 12, 
                  repeat: Infinity, 
                  ease: "easeInOut", 
                  delay: 1 
                }} 
              />
              <motion.div 
                className={styles.surfaceFish}
                initial={{ x: -100, opacity: 0 }}
                animate={{ 
                  x: [null, 100, -100],
                  opacity: [null, 1, 0]
                }}
                transition={{
                  duration: 15,
                  times: [0, 0.7, 1],
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          )}
          
          {slide.id === 'coral' && (
            <div className={styles.coralEffects}>
              <motion.div 
                className={styles.floatingJellyfish} 
                variants={driftVariant} 
                initial="initial" 
                animate="animate" 
                whileHover={{ 
                  scale: 1.1,
                  filter: "brightness(1.2)"
                }}
                onClick={() => handleInteractiveElementClick("Jellyfish", "Jellies can pulse their bell-shaped bodies to move through water and use their tentacles to catch prey.")}
              />
              <motion.div 
                className={`${styles.floatingJellyfish} ${styles.jellyfish2}`} 
                variants={{
                  ...driftVariant,
                  animate: {
                    ...driftVariant.animate,
                    transition: {
                      ...driftVariant.animate.transition,
                      delay: 1.5
                    }
                  }
                }} 
                initial="initial" 
                animate="animate"
                whileHover={{ 
                  scale: 1.1,
                  filter: "brightness(1.2)"
                }}
                onClick={() => handleInteractiveElementClick("Moon Jelly", "Moon jellies are recognized by their four distinct circular gonads visible through the top of their translucent bell.")}
              />
              <motion.div 
                className={styles.coralFormation}
                whileHover={{ 
                  scale: 1.05,
                  filter: "saturate(1.2)"
                }}
                onClick={() => handleInteractiveElementClick("Coral Formation", "Coral reefs are built over thousands of years as generations of coral polyps secrete calcium carbonate skeletons.")}
              />
            </div>
          )}
          
          {slide.id === 'twilight' && (
            <div className={styles.twilightEffects}>
              <motion.div 
                className={styles.glowingOrb} 
                variants={glowPulse} 
                initial="initial" 
                animate="animate"
                whileHover={{ 
                  scale: 1.2,
                  filter: "brightness(1.3)"
                }}
                onClick={() => handleInteractiveElementClick("Bioluminescent Organism", "Many deep-sea creatures produce light through chemical reactions to communicate, attract prey, or confuse predators.")}
              />
              <motion.div 
                className={`${styles.glowingOrb} ${styles.glowingOrb2}`} 
                variants={{
                  ...glowPulse,
                  animate: {
                    ...glowPulse.animate,
                    transition: {
                      ...glowPulse.animate.transition,
                      delay: 1.2
                    }
                  }
                }} 
                initial="initial" 
                animate="animate"
                whileHover={{ 
                  scale: 1.2,
                  filter: "brightness(1.3)"
                }}
                onClick={() => handleInteractiveElementClick("Deep Sea Lanternfish", "Lanternfish have light-producing photophores along their bodies and are among the most common deep-sea fish.")}
              />
              <motion.div 
                className={styles.mysteriousShape}
                animate={{ 
                  opacity: [0.6, 0.9, 0.6],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ filter: "contrast(1.2) brightness(1.1)" }}
                onClick={() => handleInteractiveElementClick("Deep Sea Squid", "Many deep-sea squids have adaptations like enormous eyes and specialized light organs to survive in the darkness.")}
              />
            </div>
          )}
          
          {slide.id === 'abyss' && (
            <div className={styles.abyssEffects}>
              <motion.div 
                className={styles.abyssParticleEffect} 
                variants={glowPulse} 
                initial="initial" 
                animate="animate" 
              />
              <motion.div 
                className={styles.abyssCreature}
                initial={{ opacity: 0.3, x: -50 }}
                animate={{ 
                  opacity: [0.3, 0.7, 0.3],
                  x: [-50, 0, -50],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.1, filter: "brightness(1.5)" }}
                onClick={() => handleInteractiveElementClick("Anglerfish", "Female anglerfish have a bioluminescent lure extending from their forehead to attract prey in the darkness.")}
              />
              <motion.div
                className={styles.hydrothermalVent}
                animate={{
                  filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleInteractiveElementClick("Hydrothermal Vent", "These underwater geysers spew superheated water rich in minerals, supporting unique ecosystems independently of sunlight.")}
              />
            </div>
          )}

          <div className={styles.slideContent}>
            <motion.h2
              className={styles.slideTitle}
              variants={fadeInFromDepth}
            >
              {slide.title}
            </motion.h2>
            <motion.h3
              className={styles.slideSubtitle}
              variants={fadeInFromDepth}
            >
              {slide.subtitle}
            </motion.h3>
            <motion.div
              className={styles.slideText}
              variants={fadeInFromDepth}
            >
              {slide.content}
            </motion.div>
            
            <motion.div
              className={styles.interactiveElementsContainer}
              variants={fadeInFromDepth}
            >
              {slide.interactiveElements.map(element => (
                <motion.button
                  key={element.id}
                  className={styles.interactiveButton}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.25)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleInteractiveElementClick(element.title, element.content)}
                >
                  {element.title}
                </motion.button>
              ))}
            </motion.div>
            
            <motion.div
              className={styles.funFactBubble}
              variants={bubbleRise}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(255, 255, 255, 0.3)"
              }}
            >
              <span className={styles.funFactIcon}>🐠</span>
              <p className={styles.funFactText}>{slide.funFact}</p>
            </motion.div>
          </div>
        </motion.section>
      ))}

      <OceanFooter handleInteractiveElementClick={handleInteractiveElementClick} />
      
      {/* Information Modal */}
      <AnimatePresence>
        {showDetailModal && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <h3>{selectedDetail.title}</h3>
              <p>{selectedDetail.content}</p>
              <motion.button 
                className={styles.closeButton}
                onClick={() => setShowDetailModal(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <motion.div 
        className={styles.progressBar} 
        style={{ scaleX: scrollYProgress }} 
      />
    </motion.main>
  );
};

export default OceanZine;