import React, { useState, useEffect, useRef, FC, useLayoutEffect } from 'react';
import BackButton from '../../../ui/BackButton';
import styles from './Styles.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getOrbAnimationProps,
  getGlitterAnimationProps,
  textRevealVariants,
  sectionFadeInVariants,
  getBubbleAnimationProps,
  getFloatingRuneProps
} from './Animations';
import { FantasyAnimationConfig, SectionProps } from './types';

interface FantasyZineProps {
  onNavigate: (path: string) => void;
}

interface SubSectionProps {
  title: string;
  content: React.ReactNode;
  color: string;
}

const FantasyZine: FC<FantasyZineProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [orbs, setOrbs] = useState<any[]>([]);
  const [glitters, setGlitters] = useState<any[]>([]);
  const [bubbles, setBubbles] = useState<any[]>([]);
  const [runes, setRunes] = useState<any[]>([]);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState<{x: number, y: number, id: number}[]>([]);
  const [activeSection, setActiveSection] = useState<string>('introduction');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedBoxes, setExpandedBoxes] = useState<{[key: string]: boolean}>({});

  const handleBack = () => {
    onNavigate('/gallery');
  };

  // Toggle expanded state for subsection boxes
  const toggleBox = (sectionId: string, boxId: string) => {
    const key = `${sectionId}-${boxId}`;
    setExpandedBoxes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Check if a box is expanded
  const isBoxExpanded = (sectionId: string, boxId: string) => {
    const key = `${sectionId}-${boxId}`;
    return expandedBoxes[key] || false;
  };

  useLayoutEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setContainerSize({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      // Calculate scroll progress (0 to 1)
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = Math.max(0, Math.min(1, scrollTop / scrollHeight));
      setScrollProgress(progress);
      
      // Determine active section
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'introduction';
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight / 2) {
          currentSection = section.id;
        }
      });
      
      setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return;

    const animationConfig: FantasyAnimationConfig = {
      orbCount: 25,
      glitterCount: 70,
      bubbleCount: 40,
      runeCount: 15
    };

    setOrbs(
      Array.from({ length: animationConfig.orbCount }).map((_, i) => ({
        id: `orb-${i}`,
        animationProps: getOrbAnimationProps(containerSize),
        style: { 
          position: 'absolute', 
          width: `${Math.random() * 20 + 15}px`,
          height: `${Math.random() * 20 + 15}px`,
          filter: `blur(${Math.random() * 2}px) brightness(${1 + Math.random() * 0.5})`,
          opacity: 0.2 + Math.random() * 0.6
        }
      }))
    );

    setGlitters(
      Array.from({ length: animationConfig.glitterCount }).map((_, i) => ({
        id: `glitter-${i}`,
        animationProps: getGlitterAnimationProps(containerSize),
        style: { 
          position: 'absolute', 
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          filter: `blur(${Math.random() * 1}px) brightness(${1.5 + Math.random()})`,
          opacity: 0.5 + Math.random() * 0.5
        }
      }))
    );

    setBubbles(
      Array.from({ length: animationConfig.bubbleCount }).map((_, i) => ({
        id: `bubble-${i}`,
        animationProps: getBubbleAnimationProps(containerSize),
        style: { 
          position: 'absolute', 
          width: `${Math.random() * 25 + 10}px`,
          height: `${Math.random() * 25 + 10}px`,
          borderRadius: '50%',
          filter: `blur(${Math.random() * 2}px)`,
          opacity: 0.1 + Math.random() * 0.3
        }
      }))
    );

    setRunes(
      Array.from({ length: animationConfig.runeCount }).map((_, i) => ({
        id: `rune-${i}`,
        animationProps: getFloatingRuneProps(containerSize),
        style: { 
          position: 'absolute', 
          width: `${Math.random() * 15 + 20}px`,
          height: `${Math.random() * 15 + 20}px`,
          filter: `drop-shadow(0 0 ${Math.random() * 5 + 3}px rgba(140, 100, 255, 0.8))`,
          opacity: 0.6 + Math.random() * 0.4,
          transform: `rotate(${Math.random() * 360}deg)`
        }
      }))
    );
  }, [containerSize]);

  // Enhanced cursor effects
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Add to trail with unique ID
      setCursorTrail(prev => {
        const newTrail = [
          { x: e.clientX, y: e.clientY, id: Date.now() },
          ...prev.slice(0, 10)
        ];
        return newTrail;
      });
    };

    window.addEventListener('mousemove', updateCursorPosition);
    return () => window.removeEventListener('mousemove', updateCursorPosition);
  }, []);

  // Trail cleanup effect
  useEffect(() => {
    const trailCleanupInterval = setInterval(() => {
      setCursorTrail(prev => {
        if (prev.length > 0) {
          return prev.slice(0, -1);
        }
        return prev;
      });
    }, 80);

    return () => clearInterval(trailCleanupInterval);
  }, []);

  // Expandable box component for subsections
  const ExpandableBox: FC<{ 
    title: string; 
    content: React.ReactNode; 
    color: string;
    sectionId: string;
    boxId: string;
  }> = ({ title, content, color, sectionId, boxId }) => {
    const isExpanded = isBoxExpanded(sectionId, boxId);
    
    return (
      <motion.div 
        className={styles.expandableBox}
        style={{ borderColor: color, backgroundColor: `${color}10` }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        whileHover={{ 
          boxShadow: `0 0 15px ${color}80`,
          scale: 1.02
        }}
      >
        <div 
          className={styles.boxHeader}
          onClick={() => toggleBox(sectionId, boxId)}
          style={{ backgroundColor: `${color}30` }}
        >
          <h4>{title}</h4>
          <motion.div 
            className={styles.expandIcon}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ▼
          </motion.div>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              className={styles.boxContent}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {content}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  // Section theme colors
  const sectionThemes = {
    introduction: '#e384ff', // Soft purple
    lore: '#ff84a1',         // Pink
    creatures: '#84adff',    // Light blue
    realms: '#84ffd4',       // Mint
    codex: '#c484ff'         // Lavender
  };

  // Introduction section subsections
  const introductionSubSections: SubSectionProps[] = [
    {
      title: "Welcome to the Mythical Realms",
      content: (
        <div>
          <p>The Mythical Realms exist at the intersection of dreams and reality. Here, the impossible becomes possible, and magic flows through every living thing.</p>
          <p>As you journey through these lands, you'll encounter creatures of legend, visit places beyond imagination, and perhaps discover truths about yourself along the way.</p>
        </div>
      ),
      color: sectionThemes.introduction
    },
    {
      title: "How to Navigate",
      content: (
        <div>
          <p>The magical compass in your hands responds to your intentions. Think of where you wish to go, and the path will reveal itself.</p>
          <p>Beware of wandering too far from the marked paths - while not all who wander are lost, the Mythical Realms have ways of testing the unprepared.</p>
        </div>
      ),
      color: sectionThemes.introduction
    }
  ];

  // Lore section subsections
  const loreSubSections: SubSectionProps[] = [
    {
      title: "The Creation Myth",
      content: (
        <div>
          <p>In the beginning, there was only the Void and the Song. When the first note of the Song echoed through the Void, reality began to take shape.</p>
          <p>The Seven Ancients emerged from this first harmony, each embodying a different aspect of creation: Light, Shadow, Earth, Water, Air, Fire, and Spirit.</p>
        </div>
      ),
      color: sectionThemes.lore
    },
    {
      title: "The Great War",
      content: (
        <div>
          <p>A thousand years ago, the Mythical Realms were nearly torn apart by the conflict between the Fae Courts and the Dragon Kingdoms.</p>
          <p>Only through the sacrifice of the legendary hero Elyndria was peace restored, as she used the last of her strength to forge the Pact of Harmony that still holds today.</p>
        </div>
      ),
      color: sectionThemes.lore
    }
  ];

  // Creatures section subsections
  const creaturesSubSections: SubSectionProps[] = [
    {
      title: "Glimmerscale Dragons",
      content: (
        <div>
          <p>The majestic Glimmerscale Dragons are the oldest living beings in the Mythical Realms. Their scales shimmer with the light of long-dead stars, and their breath can heal or harm depending on their intent.</p>
          <p>Though few in number, they act as guardians of ancient knowledge and maintain the balance of magic throughout the realms.</p>
        </div>
      ),
      color: sectionThemes.creatures
    },
    {
      title: "Whisperleaf Sprites",
      content: (
        <div>
          <p>No larger than a human hand, Whisperleaf Sprites inhabit the deepest parts of enchanted forests. They communicate through a language of light and movement that resembles dancing.</p>
          <p>They are known to guide lost travelers to safety, though sometimes their playful nature leads wanderers on unexpected detours.</p>
        </div>
      ),
      color: sectionThemes.creatures
    }
  ];

  // Realms section subsections
  const realmsSubSections: SubSectionProps[] = [
    {
      title: "Crystal Caverns",
      content: (
        <div>
          <p>Deep beneath the surface lies a network of caves lined with crystals that sing with harmonic resonance. The Crystal Caverns are home to the Stone Singers, beings who can shape reality through their songs.</p>
          <p>The central chamber, known as the Hall of Echoes, is said to reveal visions of possible futures to those pure of heart.</p>
        </div>
      ),
      color: sectionThemes.realms
    },
    {
      title: "Astral Forests",
      content: (
        <div>
          <p>The trees of the Astral Forests reach not just toward the sky but toward other dimensions. Their canopy glimmers with starlight even in broad daylight, and stepping between certain trees can transport you across vast distances.</p>
          <p>The forest shifts and changes with the phases of the moon, revealing new paths and hiding others.</p>
        </div>
      ),
      color: sectionThemes.realms
    }
  ];

  // Codex section subsections
  const codexSubSections: SubSectionProps[] = [
    {
      title: "Elemental Magic",
      content: (
        <div>
          <p>The foundation of all magic in the Mythical Realms lies in the understanding and manipulation of the five elemental forces: Earth, Water, Air, Fire, and Aether.</p>
          <p>Most practitioners specialize in one element, though rare individuals known as Harmony Mages can wield all five in perfect balance.</p>
        </div>
      ),
      color: sectionThemes.codex
    },
    {
      title: "Runic Language",
      content: (
        <div>
          <p>The ancient language of Runes is more than just a means of communication—it is a direct interface with the fabric of reality. Each rune captures an aspect of creation, and when properly arranged, they can reshape the world.</p>
          <p>The First Runes, said to be taught to mortals by the Seven Ancients themselves, remain the most powerful and dangerous to use.</p>
        </div>
      ),
      color: sectionThemes.codex
    }
  ];

  const sections: SectionProps[] = [
    {
      id: 'introduction',
      title: 'Introduction Portal',
      content: (
        <motion.div className={styles.portalContent}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.2 }}
          >
            Step through the shimmering veil into the Mythical Realms.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
          >
            A world woven from dreams and starlight awaits.
          </motion.p>
          <motion.div 
            className={styles.portalGlow}
            style={{ backgroundColor: `${sectionThemes.introduction}40` }}
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.5, 0.7, 0.5] 
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <div className={styles.subsectionContainer}>
            {introductionSubSections.map((subsection, idx) => (
              <ExpandableBox 
                key={`intro-box-${idx}`}
                title={subsection.title}
                content={subsection.content}
                color={subsection.color}
                sectionId="introduction"
                boxId={`box-${idx}`}
              />
            ))}
          </div>
        </motion.div>
      )
    },
    {
      id: 'lore',
      title: 'Lore Scrolls',
      content: (
        <div className={styles.scrollContainer}>
          <motion.div 
            className={`${styles.scroll} ${styles.scrollOne}`}
            style={{ borderColor: sectionThemes.lore }}
            initial={{ opacity: 0, y: 50, rotateZ: -5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <p>Discover ancient tales etched onto ethereal scrolls.</p>
          </motion.div>
          <motion.div 
            className={`${styles.scroll} ${styles.scrollTwo}`}
            style={{ borderColor: sectionThemes.lore }}
            initial={{ opacity: 0, y: 50, rotateZ: 3 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p>Whispers of forgotten heroes and legendary beasts.</p>
          </motion.div>
          
          <div className={styles.subsectionContainer}>
            {loreSubSections.map((subsection, idx) => (
              <ExpandableBox 
                key={`lore-box-${idx}`}
                title={subsection.title}
                content={subsection.content}
                color={subsection.color}
                sectionId="lore"
                boxId={`box-${idx}`}
              />
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'creatures',
      title: 'Creature Showcase',
      content: (
        <div className={styles.creatureContainer}>
          <motion.div 
            className={styles.creatureFrame}
            style={{ borderColor: sectionThemes.creatures }}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            whileHover={{ 
              scale: 1.05,
              filter: `drop-shadow(0 0 10px ${sectionThemes.creatures})`
            }}
          >
            <div className={styles.creatureContent}>
              <h3>Glimmerscale Dragon</h3>
              <p>Behold the fantastical inhabitants of these lands.</p>
            </div>
          </motion.div>
          <motion.div 
            className={styles.creatureFrame}
            style={{ borderColor: sectionThemes.creatures }}
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ 
              scale: 1.05,
              filter: `drop-shadow(0 0 10px ${sectionThemes.creatures})`
            }}
          >
            <div className={styles.creatureContent}>
              <h3>Whisperleaf Sprite</h3>
              <p>From majestic dragons to mischievous sprites.</p>
            </div>
          </motion.div>
          
          <div className={styles.subsectionContainer}>
            {creaturesSubSections.map((subsection, idx) => (
              <ExpandableBox 
                key={`creature-box-${idx}`}
                title={subsection.title}
                content={subsection.content}
                color={subsection.color}
                sectionId="creatures"
                boxId={`box-${idx}`}
              />
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'realms',
      title: 'Realm Portals',
      content: (
        <div className={styles.realmContainer}>
          <motion.div 
            className={`${styles.realmPortal} ${styles.realmOne}`}
            style={{ borderColor: sectionThemes.realms }}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            whileHover={{ 
              scale: 1.05, 
              filter: `hue-rotate(20deg) brightness(1.2)`,
              boxShadow: `0 0 20px ${sectionThemes.realms}`
            }}
          >
            <h3>Crystal Caverns</h3>
            <p>Gaze into gateways to other dimensions.</p>
            <div className={styles.portalRipple} style={{ borderColor: sectionThemes.realms }}></div>
          </motion.div>
          <motion.div 
            className={`${styles.realmPortal} ${styles.realmTwo}`}
            style={{ borderColor: sectionThemes.realms }}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ 
              scale: 1.05, 
              filter: `hue-rotate(-20deg) brightness(1.2)`,
              boxShadow: `0 0 20px ${sectionThemes.realms}`
            }}
          >
            <h3>Astral Forests</h3>
            <p>Each shimmer promises a new adventure.</p>
            <div className={styles.portalRipple} style={{ borderColor: sectionThemes.realms }}></div>
          </motion.div>
          
          <div className={styles.subsectionContainer}>
            {realmsSubSections.map((subsection, idx) => (
              <ExpandableBox 
                key={`realm-box-${idx}`}
                title={subsection.title}
                content={subsection.content}
                color={subsection.color}
                sectionId="realms"
                boxId={`box-${idx}`}
              />
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'codex',
      title: 'Enchanted Codex',
      content: (
        <div className={styles.codexContainer}>
          <motion.div 
            className={styles.codexPage}
            style={{ borderColor: sectionThemes.codex }}
            initial={{ opacity: 0, rotateY: -20 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className={styles.runeSymbols}>
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div 
                  key={`rune-symbol-${i}`}
                  className={styles.runeSymbol}
                  style={{ backgroundColor: `${sectionThemes.codex}40` }}
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 10 + i * 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </div>
            <p>Unravel the secrets of arcane magic.</p>
          </motion.div>
          <motion.div 
            className={styles.codexPage}
            style={{ borderColor: sectionThemes.codex }}
            initial={{ opacity: 0, rotateY: 20 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className={styles.runeSymbols}>
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div 
                  key={`rune-symbol-alt-${i}`}
                  className={styles.runeSymbolAlt}
                  style={{ backgroundColor: `${sectionThemes.codex}40` }}
                  animate={{ 
                    rotate: [0, -360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 12 + i * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
            </div>
            <p>Learn the runes and spells that shape this world.</p>
          </motion.div>
          
          <div className={styles.subsectionContainer}>
            {codexSubSections.map((subsection, idx) => (
              <ExpandableBox 
                key={`codex-box-${idx}`}
                title={subsection.title}
                content={subsection.content}
                color={subsection.color}
                sectionId="codex"
                boxId={`box-${idx}`}
              />
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <motion.div
      className={styles.fantasyZineContainer}
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Ambient Background with updated color scheme */}
      <div className={styles.ambientBackground}>
        <div className={styles.cosmicVoid} style={{ background: 'linear-gradient(135deg, #ffffff, #fff1f8, #f8edff)' }} />
        <div className={styles.starfield} />
        <div className={styles.nebulaMist} style={{ background: 'radial-gradient(ellipse at center, rgba(255, 210, 255, 0.1), rgba(210, 200, 255, 0.05), transparent)' }} />
      </div>

      {/* Cursor Star Trail with updated colors */}
      {cursorTrail.map((point, index) => (
        <motion.div
          key={point.id}
          className={styles.cursorStar}
          initial={{ opacity: 0.8, scale: 1.2 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.8 }}
          style={{ 
            left: point.x, 
            top: point.y,
            width: `${8 - index * 0.5}px`,
            height: `${8 - index * 0.5}px`,
            background: `radial-gradient(circle, ${sectionThemes[activeSection as keyof typeof sectionThemes] || '#e384ff'}, transparent)`
          }}
        />
      ))}

      <motion.div
        className={styles.cursorTrail}
        animate={{ x: cursorPosition.x, y: cursorPosition.y }}
        transition={{ type: 'spring', stiffness: 100, damping: 10, mass: 0.5 }}
        style={{ 
          boxShadow: `0 0 20px ${sectionThemes[activeSection as keyof typeof sectionThemes] || '#e384ff'}` 
        }}
      />

      {/* Navigation and Scroll Indicator with theme colors */}
      <div className={styles.navigationWrapper}>
        <BackButton
          onClick={handleBack}
          label="Back to Gallery"
          size="md"
          className={styles.backButton}
        />
        <div className={styles.scrollIndicator}>
          <motion.div 
            className={styles.scrollProgress}
            style={{ 
              height: `${scrollProgress * 100}%`,
              backgroundColor: sectionThemes[activeSection as keyof typeof sectionThemes] || '#e384ff'
            }}
          />
          {sections.map(section => (
            <motion.div
              key={`nav-${section.id}`}
              className={`${styles.sectionIndicator} ${activeSection === section.id ? styles.activeSectionIndicator : ''}`}
              style={{ 
                backgroundColor: activeSection === section.id 
                  ? sectionThemes[section.id as keyof typeof sectionThemes] 
                  : '#ffffff',
                border: `2px solid ${sectionThemes[section.id as keyof typeof sectionThemes]}`
              }}
              whileHover={{ scale: 1.2 }}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
            />
          ))}
        </div>
      </div>

      {/* Ambient Floating Elements with updated colors */}
      {orbs.map(orb => (
        <motion.div
          key={orb.id}
          className={styles.floatingOrb}
          style={{
            ...orb.style,
            background: `radial-gradient(circle, ${sectionThemes[activeSection as keyof typeof sectionThemes] || '#e384ff'}40, transparent)`
          }}
          variants={orb.animationProps}
          initial="initial"
          animate="animate"
          custom={containerSize}
        />
      ))}

      {glitters.map(glitter => (
        <motion.div
          key={glitter.id}
          className={styles.floatingGlitter}
          style={{
            ...glitter.style,
            backgroundColor: `${sectionThemes[activeSection as keyof typeof sectionThemes] || '#e384ff'}`
          }}
          variants={glitter.animationProps}
          initial="initial"
          animate="animate"
          custom={containerSize}
        />
      ))}

      {bubbles.map(bubble => (
        <motion.div
          key={bubble.id}
          className={styles.floatingBubble}
          style={{
            ...bubble.style,
            border: `1px solid ${sectionThemes[activeSection as keyof typeof sectionThemes] || '#e384ff'}50`
          }}
          variants={bubble.animationProps}
          initial="initial"
          animate="animate"
        />
      ))}

      {runes.map(rune => (
        <motion.div
          key={rune.id}
          className={styles.floatingRune}
          style={{
            ...rune.style,
            filter: `drop-shadow(0 0 ${Math.random() * 5 + 3}px ${sectionThemes[activeSection as keyof typeof sectionThemes] || '#e384ff'})`
          }}
          variants={rune.animationProps}
          initial="initial"
          animate="animate"
        />
      ))}

      {/* Main Content Sections */}
      <div className={styles.contentContainer}>
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            id={section.id}
            className={`${styles.zineSection} ${styles[section.id + 'Section']}`}
            variants={sectionFadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            style={{
              alignItems: index % 2 === 0 ? 'flex-start' : 'flex-end',
              ...(getClipPathForSection(index) as React.CSSProperties),
              borderColor: sectionThemes[section.id as keyof typeof sectionThemes],
              backgroundColor: `${sectionThemes[section.id as keyof typeof sectionThemes]}10`,
            }}
          >
            <motion.div
              className={styles.sectionContent}
              variants={textRevealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <motion.h2 
                className={styles.sectionTitle}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ color: sectionThemes[section.id as keyof typeof sectionThemes] }}
              >
                {/* Animated text reveal */}
                {section.title.split('').map((char, i) => (
                  <motion.span
                    key={`${section.id}-char-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.03 }}
                    className={styles.animatedChar}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h2>
              {section.content}
            </motion.div>
          </motion.section>
        ))}
      </div>
    </motion.div>
  );
};

// Helper function to generate unique clip paths for section shapes
function getClipPathForSection(index: number): React.CSSProperties {
  const clipPaths = [
    // Portal - gentle curve
    { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' },
    // Lore Scrolls - torn paper
    { clipPath: 'polygon(0 5%, 98% 0, 100% 93%, 5% 100%)' },
    // Creatures - hexagonal
    { clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' },
    // Realms - wavy
    { clipPath: 'polygon(0% 0%, 100% 10%, 98% 90%, 0% 100%)' },
    // Codex - book page
    { clipPath: 'polygon(10% 0, 100% 5%, 95% 100%, 0% 95%)' }
  ];
  
  return clipPaths[index % clipPaths.length];
}

export default FantasyZine;