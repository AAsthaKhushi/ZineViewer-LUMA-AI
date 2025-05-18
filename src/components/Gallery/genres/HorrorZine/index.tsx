import { useState, useEffect, useRef, FC, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Styles.module.css';
import BackButton from '../../../ui/BackButton';
import {
  getFloatingEntityAnimationProps,
  getBloodSpotAnimationProps,
  textFlickerVariants,
} from './Animations';
import { HorrorAnimationConfig, FloatingEntityProps, BloodSpotProps } from './types';

interface HorrorZineProps {
  onNavigate: (path: string) => void;
}

function getWarpedClipPath(index: number): string {
  const clipPaths = [
    'polygon(0 0, 100% 10%, 90% 100%, 10% 90%)',
    'polygon(10% 0%, 90% 0%, 100% 50%, 80% 100%, 0% 90%)',
    'polygon(0 15%, 100% 0, 85% 100%, 15% 85%)',
    'polygon(5% 5%, 95% 0, 100% 95%, 0 100%)',
    'polygon(0 0, 100% 0, 100% 85%, 0% 100%)',
  ];
  return clipPaths[index % clipPaths.length];
}

const HorrorZine: FC<HorrorZineProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [cursorTrail, setCursorTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [floatingEntities, setFloatingEntities] = useState<FloatingEntityProps[]>([]);
  const [bloodSpots, setBloodSpots] = useState<BloodSpotProps[]>([]);
  const [showJumpScare, setShowJumpScare] = useState(false);
  
  // Interactive state variables
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [showReflection, setShowReflection] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(false);

  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    abyss: false,
    whispers: false,
    vhs: false,
    meat: false,
    puns: false,
  });

  useEffect(() => {
    const loadFont = (fontFamily: string) => {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      return () => document.head.removeChild(link);
    };

    const cleanupCreepster = loadFont('Creepster');
    const cleanupNosifer = loadFont('Nosifer');

    return () => {
      cleanupCreepster();
      cleanupNosifer();
    };
  }, []);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setContainerSize({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setContainerSize({ width: offsetWidth, height: offsetHeight });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (containerSize.width === 0 || containerSize.height === 0) return;

    const config: HorrorAnimationConfig = {
      floatingEntityCount: 15,
      bloodSpotCount: 20,
    };

    // Create floating entities with varied emojis
    const entities = ['👻', '💀', '🦇', '👁️', '🕷️', '🎭'];
    setFloatingEntities(
      Array.from({ length: (config.floatingEntityCount ?? 0) as number }).map((_, i) => ({
        id: `entity-${i}`,
        animationProps: getFloatingEntityAnimationProps(containerSize),
        content: entities[Math.floor(Math.random() * entities.length)],
      }))
    );

    setBloodSpots(
      Array.from({ length: (config.bloodSpotCount ?? 0) as number }).map((_, i) => ({
        id: `bloodspot-${i}`,
        animationProps: getBloodSpotAnimationProps(),
        style: { top: `${Math.random() * 100}vh`, left: `${Math.random() * 100}vw` },
      }))
    );
    
    // Setup random jump scares
    const jumpScareInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setShowJumpScare(true);
        setTimeout(() => setShowJumpScare(false), 150);
      }
    }, 15000);
    
    return () => clearInterval(jumpScareInterval);
  }, [containerSize]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorTrail((prev) => [
        { x: e.clientX, y: e.clientY, id: Date.now() },
        ...prev.slice(0, 20),
      ]);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTrail((prev) => prev.slice(1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Function to toggle section expansion
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));

    // Add some random chance of showing jumpscares when opening sections
    if (Math.random() > 0.7) {
      setShowJumpScare(true);
      setTimeout(() => setShowJumpScare(false), 200);
    }
  };

  // Function to handle the quiz interactions
  const handleQuizAnswer = (answer: string) => {
    setQuizAnswer(answer);
    
    // Trigger jump scare on certain answers
    if (answer === 'eyes' || answer === 'blood') {
      setTimeout(() => {
        setShowJumpScare(true);
        setTimeout(() => setShowJumpScare(false), 300);
      }, 500);
    }
  };

  // Function to handle video playback
  const startVideo = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.error('Error playing video:', err));
      setPlayingVideo(true);
      
      // Schedule jump scare during video
      setTimeout(() => {
        setShowJumpScare(true);
        setTimeout(() => setShowJumpScare(false), 200);
      }, 3000);
    }
  };

  const sections = [
    { 
      id: 'abyss', 
      title: "Mind's Abyss",
      content: (
        <div className={styles.abyssContent}>
          <p className={styles.quote}>"In the silence of thought, there lies a scream."</p>
          
          <motion.div 
            className={`${styles.collapsibleSection} ${expandedSections.abyss ? styles.expanded : ''}`}
            onClick={() => toggleSection('abyss')}
          >
            <h3 className={styles.collapsibleHeader}>
              Peer into the depths...
              <span className={styles.expandIcon}>{expandedSections.abyss ? '−' : '+'}</span>
            </h3>
            
            {expandedSections.abyss && (
              <motion.div 
                className={styles.collapsibleContent}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
              >
                <p>Peer into the cavernous depths of your own mind, where shadows twist your memories and fear wears the face of someone you trust. The further you look, the more you'll realize it's looking back at you.</p>
                <p className={styles.disturbingText}>They're in your walls. They've always been there. Watching. Waiting. Listening to your every thought.</p>
              </motion.div>
            )}
          </motion.div>
          
          <div className={styles.journalEntry}>
            <h4>Asylum Journal #37</h4>
            <p>They say the walls don't move, but I've seen them breathe. The doctor claims my medication will help, but the pills whisper at night. I've started collecting them under my tongue. The shadows know I'm planning something.</p>
          </div>
          
          <div className={styles.horrorQuiz}>
            <h4>Quiz: Are You The Monster?</h4>
            <p>What do you see in the dark when your eyes are closed?</p>
            
            <div className={styles.quizOptions}>
              <motion.button 
                className={`${styles.quizButton} ${quizAnswer === 'nothing' ? styles.selectedAnswer : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuizAnswer('nothing')}
              >
                Nothing but darkness
              </motion.button>
              
              <motion.button 
                className={`${styles.quizButton} ${quizAnswer === 'eyes' ? styles.selectedAnswer : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuizAnswer('eyes')}
              >
                Eyes watching me
              </motion.button>
              
              <motion.button 
                className={`${styles.quizButton} ${quizAnswer === 'blood' ? styles.selectedAnswer : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuizAnswer('blood')}
              >
                Blood and viscera
              </motion.button>
              
              <motion.button 
                className={`${styles.quizButton} ${quizAnswer === 'myself' ? styles.selectedAnswer : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleQuizAnswer('myself')}
              >
                Another version of myself
              </motion.button>
            </div>
            
            {quizAnswer && (
              <motion.div 
                className={styles.quizResult}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {quizAnswer === 'nothing' && (
                  <p>You say you see nothing, but something sees you. It's always there, in the corner of your vision. Turn around. Quickly.</p>
                )}
                {quizAnswer === 'eyes' && (
                  <p>The eyes belong to them. They've been watching you your entire life. They know what you did. They're coming for you.</p>
                )}
                {quizAnswer === 'blood' && (
                  <p>The blood you see is your own. In another timeline, you've already died. That timeline is bleeding into this one.</p>
                )}
                {quizAnswer === 'myself' && (
                  <p>That's not you. It never was. It's what's replacing you, piece by piece, memory by memory.</p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      )
    },
    { 
      id: 'whispers', 
      title: 'Mirror Whispers',
      content: (
        <div className={styles.mirrorsContent}>
          <p className={styles.quote}>"Mirrors reflect truth. Even when you don't want them to."</p>
          
          <motion.div 
            className={`${styles.collapsibleSection} ${expandedSections.whispers ? styles.expanded : ''}`}
            onClick={() => toggleSection('whispers')}
          >
            <h3 className={styles.collapsibleHeader}>
              Secrets behind the glass...
              <span className={styles.expandIcon}>{expandedSections.whispers ? '−' : '+'}</span>
            </h3>
            
            {expandedSections.whispers && (
              <motion.div 
                className={styles.collapsibleContent}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
              >
                <p className={styles.disturbingText}>Have you ever noticed your reflection moving a split second after you? That's because it's not a reflection at all. It's trying to break free.</p>
                <p>The old legend says if you speak your name three times in front of a mirror in complete darkness, you'll summon your doppelgänger. What they don't tell you is that it's already there. Waiting.</p>
              </motion.div>
            )}
          </motion.div>
          
          <div className={styles.mirrorStory}>
            <h4>The Girl in the Glass</h4>
            <p>She only appears at 3:33 AM. Always smiling, always watching. I've covered all the mirrors in my house, but somehow, I still see her reflection in my phone screen, computer monitor, and the dark window at night.</p>
          </div>
          
          <motion.div 
            className={styles.interactiveMirror}
            whileHover={{ filter: 'brightness(1.5) contrast(1.2)' }}
            onClick={() => setShowReflection(true)}
          >
            <p>{showReflection ? "You shouldn't have looked..." : "Tap to see your reflection..."}</p>
            
            {showReflection && (
              <motion.div 
                className={styles.mirrorReflection}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0.3, 1] }}
                transition={{ duration: 1.5, times: [0, 0.3, 0.5, 1] }}
              >
                <div className={styles.distortedFace}>
                  <div className={styles.eyes}></div>
                  <div className={styles.mouth}></div>
                  <div className={styles.bloodDrip}></div>
                </div>
                <div className={styles.handprint}></div>
              </motion.div>
            )}
          </motion.div>
          
          <div className={styles.bloodMirrorCollection}>
            <h4>Cursed Mirrors Collection</h4>
            <div className={styles.bloodMirrorGrid}>
              {[1, 2, 3].map(num => (
                <motion.div
                  key={`bloody-mirror-${num}`}
                  className={styles.bloodMirror}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 20px rgba(255, 0, 0, 0.7)',
                    transition: { duration: 0.3 }
                  }}
                  onClick={() => {
                    if (Math.random() > 0.5) {
                      setShowJumpScare(true);
                      setTimeout(() => setShowJumpScare(false), 200);
                    }
                  }}
                >
                  <div className={styles.bloodFingerprints}></div>
                  <div className={styles.bloodDrips}></div>
                  <div className={styles.mirrorCrack}></div>
                  <div className={styles.mirrorFigure}></div>
                </motion.div>
              ))}
            </div>
            <p className={styles.bloodMirrorCaption}>These mirrors were recovered from crime scenes. Touch at your own risk. The last person who did hasn't been seen since.</p>
          </div>
        </div>
      )
    },
    { 
      id: 'vhs', 
      title: 'Haunted VHS',
      content: (
        <div className={styles.vhsContent}>
          <p className={styles.quote}>"The tape was blank... until midnight."</p>
          
          <motion.div 
            className={`${styles.collapsibleSection} ${expandedSections.vhs ? styles.expanded : ''}`}
            onClick={() => toggleSection('vhs')}
          >
            <h3 className={styles.collapsibleHeader}>
              Lost footage...
              <span className={styles.expandIcon}>{expandedSections.vhs ? '−' : '+'}</span>
            </h3>
            
            {expandedSections.vhs && (
              <motion.div 
                className={styles.collapsibleContent}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
              >
                <p className={styles.disturbingText}>The cameras capture things our eyes can't see. Faces in the static. Shapes in the dead air. Messages in the white noise.</p>
                <p>They found the tape in an abandoned house. The first three minutes show a family dinner. The next five minutes show the same family sleeping. The rest of the tape shows what happened to them. No one knows who was holding the camera.</p>
              </motion.div>
            )}
          </motion.div>
          
          <div className={styles.vhsPlayer}>
            <div className={styles.vhsScreen} onClick={startVideo}>
              <div className={styles.scanlines}></div>
              <div className={styles.static}></div>
              {playingVideo ? (
                <video 
                  ref={videoRef}
                  className={styles.hauntedVideo}
                  muted
                  loop
                  onEnded={() => setPlayingVideo(false)}
                >
                  <source src="/api/placeholder/400/400" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <>
                  <p className={styles.timestamp}>REC 10:37 PM 06/13/1998</p>
                  <p className={styles.playPrompt}>Click to play haunted footage</p>
                </>
              )}
            </div>
            <div className={styles.vhsControls}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={startVideo}
              >
                PLAY
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
              >
                REWIND
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setPlayingVideo(false)}
              >
                STOP
              </motion.button>
            </div>
          </div>
          
          <div className={styles.archivistLog}>
            <h4>Archivist Log Entry #42</h4>
            <p>Found another unmarked tape today. The label only had strange symbols. During playback, the static formed shapes that looked like faces. At 18:22, I could hear what sounded like breathing behind the white noise. Will continue investigation tomorrow.</p>
            <p className={styles.hiddenText}>UPDATE: Something followed me home from the tape. It's standing in my hallway right now.</p>
          </div>
          
          <div className={styles.vhsCaseArt}>
            <h4>DIY VHS Case Template</h4>
            <p>Print your own cursed VHS label. Just don't watch what you record.</p>
          </div>
        </div>
      )
    },
    { 
      id: 'meat', 
      title: 'The Meat Section',
      content: (
        <div className={styles.meatContent}>
          <p className={styles.quote}>"Everything's fresh. Especially the screams."</p>
          
          <motion.div 
            className={`${styles.collapsibleSection} ${expandedSections.meat ? styles.expanded : ''}`}
            onClick={() => toggleSection('meat')}
          >
            <h3 className={styles.collapsibleHeader}>
              Fresh cuts...
              <span className={styles.expandIcon}>{expandedSections.meat ? '−' : '+'}</span>
            </h3>
            
            {expandedSections.meat && (
              <motion.div 
                className={styles.collapsibleContent}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
              >
                <p className={styles.disturbingText}>They say you are what you eat. But what if what you're eating was once like you? The butcher doesn't just sell meat.</p>
                <p>Hunger is just the body's way of telling you it needs sustenance. It doesn't care where that sustenance comes from. Or who.</p>
              </motion.div>
            )}
          </motion.div>
          
          <div className={styles.meatCuts}>
            <h4>Special Cuts</h4>
            <motion.div 
              className={styles.meatDiagram}
              whileHover={{ rotate: 3 }}
            >
              <div className={styles.cutLabel} style={{ top: '20%', left: '30%' }}>Memory Lobe</div>
              <div className={styles.cutLabel} style={{ top: '50%', left: '70%' }}>Dream Tenderloin</div>
              <div className={styles.cutLabel} style={{ top: '75%', left: '40%' }}>Nightmare Ribs</div>
              <div className={styles.bloodSplatters}></div>
            </motion.div>
          </div>
          
          <div className={styles.recipe}>
            <h4>Recipe: Memory Stew</h4>
            <p>Ingredients:</p>
            <ul>
              <li>3 forgotten childhood moments</li>
              <li>1 cup of repressed emotions</li>
              <li>2 tablespoons of deja vu</li>
              <li>A pinch of existential dread</li>
              <li>Fresh blood (type O preferred)</li>
            </ul>
            <p>Simmer on low heat until the past becomes clear. Serve cold, like revenge.</p>
          </div>
          
          <div className={styles.comicStrip}>
            <h4>The Chopping Block Diaries</h4>
            <div className={styles.comicPanels}>
              {[1, 2, 3].map(num => (
                <motion.div 
                  key={`panel-${num}`} 
                  className={styles.comicPanel}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => {
                    if (Math.random() > 0.7) {
                      setShowJumpScare(true);
                      setTimeout(() => setShowJumpScare(false), 150);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )
    },
    { 
      id: 'puns', 
      title: 'Pumpkin Puns',
      content: (
        <div className={styles.punsContent}>
          <p className={styles.quote}>"Let's carve out some fun."</p>
          
          <motion.div 
            className={`${styles.collapsibleSection} ${expandedSections.puns ? styles.expanded : ''}`}
            onClick={() => toggleSection('puns')}
          >
            <h3 className={styles.collapsibleHeader}>
              The dark humor...
              <span className={styles.expandIcon}>{expandedSections.puns ? '−' : '+'}</span>
            </h3>
            
            {expandedSections.puns && (
              <motion.div 
                className={styles.collapsibleContent}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
              >
                <p className={styles.disturbingText}>Do you hear that? The laughter in the dark? It's not laughing with you. It's laughing at what's about to happen to you.</p>
                <p>Every joke has a victim. Every pun has a punchline. And sometimes, that punchline is you.</p>
              </motion.div>
            )}
          </motion.div>
          
          <div className={styles.punList}>
            <h4>13 Un-boo-lievable Puns</h4>
            <ul>
              <li>Why don't pumpkins ever quarrel? They patch things up!</li>
              <li>What do you call a pumpkin that works at the beach? A life-gourd!</li>
              <li>How do pumpkins communicate? Through vine messages!</li>
              <li>What's a pumpkin's favorite sport? Squash!</li>
              <li>Why did the pumpkin cross the road? To get to the other vine!</li>
            </ul>
          </div>
          
          <div className={styles.pumpkinGame}>
            <h4>Mini-game: Match the Pun to the Pumpkin</h4>
            <p>Drag the puns to their matching carved expressions!</p>
            <p className={styles.hiddenPunText}>The carved faces are watching you. They know your fears.</p>
          </div>
        </div>
      )
    },
  ];

  return (
    <motion.div
      className={styles.horrorZineContainer}
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className={styles.backgroundTexture} />
      <div className={styles.mistOverlay} />

      <AnimatePresence>
        {cursorTrail.map((point) => (
          <motion.div
            key={point.id}
            className={styles.cursorTrail}
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.5 } }}
            style={{ left: point.x, top: point.y }}
          />
        ))}
      </AnimatePresence>

      {floatingEntities.map((entity) => (
        <motion.div
          key={entity.id}
          className={styles.floatingEntity}
          variants={entity.animationProps}
          initial="initial"
          animate="animate"
        >
          {entity.content}
        </motion.div>
      ))}

      {bloodSpots.map((spot) => (
        <motion.div
          key={spot.id}
          className={styles.bloodSpot}
          variants={spot.animationProps}
          initial="initial"
          animate="animate"
          style={spot.style}
        />
      ))}
      
      {showJumpScare && (
        <div className={styles.jumpScare}>
          {Math.random() > 0.5 ? (
            <img src="/api/placeholder/400/400" alt="jump scare" className={styles.jumpScareImage} />
          ) : (
            <div className={styles.jumpScareText}>BEHIND YOU</div>
          )}
        </div>
      )}

      <BackButton
        onClick={() => onNavigate('/gallery')}
        label="Back to Gallery"
        size="md"
        className={styles.backButton}
      />

      <div className={styles.contentContainer}>
        <h1 className={styles.zineTitle}>Shadows & Whispers</h1>
        
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={styles.zineSection}
            style={{ clipPath: getWarpedClipPath(index) }}
          >
            <motion.div 
              className={styles.sectionContent}
              whileHover={{ 
                scale: 1.02, 
                transition: { duration: 0.3 } 
              }}
            >
              <motion.h2 
                variants={textFlickerVariants}
                initial="initial"
                animate="animate"
              >
                {section.title}
              </motion.h2>
              {section.content}
            </motion.div>
          </section>
        ))}
      </div>

      <footer
  style={{
    background: '#0a0000',
    color: '#ffeded',
    padding: '40px 20px',
    fontFamily: "'Creepster', cursive",
    position: 'relative',
    overflow: 'hidden',
    textAlign: 'center',
    borderTop: '2px dashed #6c0000',
  }}
>
  {/* Floating Ghost */}
  <div
    style={{
      position: 'absolute',
      top: '10%',
      left: '5%',
      fontSize: '2rem',
      animation: 'floatGhost 6s ease-in-out infinite',
      opacity: 0.4,
      pointerEvents: 'none',
    }}
  >
    👻
  </div>

  {/* Floating Skull */}
  <div
    style={{
      position: 'absolute',
      bottom: '15%',
      right: '10%',
      fontSize: '1.8rem',
      animation: 'floatSkull 7s ease-in-out infinite',
      opacity: 0.3,
      pointerEvents: 'none',
    }}
  >
    💀
  </div>

  {/* Flickering Main Text */}
  <p
    style={{
      fontSize: '2rem',
      color: '#ff0000',
      textShadow: '0 0 10px #ff4444, 0 0 20px #aa0000',
      animation: 'flickerText 3s infinite alternate',
      marginBottom: '20px',
    }}
  >
    Some doors are best left unopened...
  </p>

  {/* Subtext */}
  <p
    style={{
      fontSize: '1.1rem',
      fontFamily: "'Nosifer', sans-serif",
      color: '#fce4e4',
      lineHeight: 1.6,
      maxWidth: '600px',
      margin: '0 auto 20px',
    }}
  >
    Thanks for wandering through the HorrorZine — where nightmares are curated, not cured.
    <br />
    New issues materialize each full moon. Until then...
    <br />
    Leave the lights on. Or don't. 🕷️
  </p>

  {/* Copyright */}
  <p
    style={{
      fontSize: '0.9rem',
      color: '#933',
      fontStyle: 'italic',
      letterSpacing: '1px',
    }}
  >
    © 2025 HorrorZine. Unearth responsibly.
  </p>

  {/* Embedded Animation Keyframes */}
  <style>
    {`
      @keyframes floatGhost {
        0% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(3deg); }
        100% { transform: translateY(0px) rotate(-3deg); }
      }

      @keyframes floatSkull {
        0% { transform: translateY(0px); }
        50% { transform: translateY(15px); }
        100% { transform: translateY(0px); }
      }

      @keyframes flickerText {
        0% { opacity: 1; text-shadow: 0 0 10px #ff4444; }
        10% { opacity: 0.8; }
        20% { opacity: 0.3; }
        30% { opacity: 0.9; text-shadow: 0 0 20px #aa0000; }
        40% { opacity: 0.6; }
        50% { opacity: 1; }
        60% { opacity: 0.4; }
        70% { opacity: 0.95; text-shadow: 0 0 10px #ff4444, 0 0 5px #990000; }
        80% { opacity: 0.2; }
        90% { opacity: 0.9; }
        100% { opacity: 1; }
      }
    `}
  </style>
</footer>

    </motion.div>
  );
};

export default HorrorZine;