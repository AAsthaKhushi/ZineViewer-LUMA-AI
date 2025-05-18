import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Sparkles, Star, Wand } from 'lucide-react'
import Background from './Background'
import SparkleTrail from './SparkleTrail'
import Button from '../ui/Button'

const LandingPage = ({ onExplore = () => {} }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [isReady, setIsReady] = useState(false)
  // Using the imported SparkleTrail component instead of internal state for sparkle trails
  const controls = useAnimation()
  const audioRef = useRef(null)
  
  // Handle intro animation sequence - FASTER TIMING
  useEffect(() => {
    // First load the background
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 200) // Reduced from 500ms
    
    // Then start the main animations
    const readyTimer = setTimeout(() => {
      setIsReady(true)
    }, 600) // Reduced from 1500ms
    
    return () => {
      clearTimeout(timer)
      clearTimeout(readyTimer)
    }
  }, [])
  
  // Mouse movement handler
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  
  // Text animations - FASTER ANIMATIONS
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04, // Faster stagger
        delayChildren: 0.2, // Reduced delay
        when: "beforeChildren"
      }
    }
  }
  
  const letterVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      rotateY: 90,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 150 // Increased stiffness for faster animation
      }
    }
  }
  
  const sparkleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 1.0 + (i * 0.07), // Reduced delay
        duration: 0.4, // Faster animation
        type: "spring",
        stiffness: 350
      }
    })
  }
  
  const titleText = "ZINE MAGIC"
  
  // Enhanced floating elements
  const floatingElements = [
    { x: -20, y: 20, rotation: 15, delay: 0.3, duration: 8, size: 50 },
    { x: 30, y: -25, rotation: -10, delay: 0.7, duration: 10, size: 35 },
    { x: -15, y: -15, rotation: 5, delay: 1.1, duration: 9, size: 30 },
    { x: 25, y: 30, rotation: -5, delay: 0.5, duration: 7, size: 45 },
    { x: -25, y: -20, rotation: 20, delay: 0.9, duration: 11, size: 40 },
    { x: 15, y: 10, rotation: -15, delay: 0.2, duration: 12, size: 25 }
  ]
  
  // Background shooting stars
  const ShootingStars = () => {
    return (
      <div className="shooting-stars-container">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="shooting-star"
            initial={{ 
              top: `${Math.random() * 40}%`, 
              left: "0%", 
              opacity: 0 
            }}
            animate={{ 
              top: `${Math.random() * 60 + 20}%`, 
              left: "100%", 
              opacity: [0, 1, 1, 0],
            }}
            transition={{ 
              duration: Math.random() * 3 + 2, 
              delay: Math.random() * 15,
              repeat: Infinity,
              repeatDelay: Math.random() * 10 + 5
            }}
          />
        ))}
      </div>
    )
  }
  
  // Magical orbs that float around
  const FloatingOrbs = () => {
    return (
      <div className="floating-orbs-container">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-orb"
            style={{
              backgroundColor: `hsla(${220 + i * 20}, 80%, 70%, 0.4)`,
              boxShadow: `0 0 15px 5px hsla(${220 + i * 20}, 80%, 70%, 0.3)`
            }}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight, 
              scale: 0, 
              opacity: 0 
            }}
            animate={{ 
              x: [null, Math.random() * window.innerWidth, Math.random() * window.innerWidth], 
              y: [null, Math.random() * window.innerHeight, Math.random() * window.innerHeight], 
              scale: [0, Math.random() * 0.5 + 0.5],
              opacity: [0, 0.6]
            }}
            transition={{ 
              duration: Math.random() * 20 + 15, 
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
    )
  }
  
  // Magic dust that follows mouse
  const MagicDust = () => {
    return (
      <motion.div 
        className="magic-dust"
        animate={{
          x: mousePosition.x - 15,
          y: mousePosition.y - 15,
        }}
        transition={{
          type: "spring",
          damping: 10,
          mass: 0.1,
          stiffness: 100
        }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="dust-particle"
            animate={{
              x: Math.random() * 30 - 15,
              y: Math.random() * 30 - 15,
              scale: [0.5, 1, 0.5],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    )
  }
  
  // Legacy SparkleTrail, kept for reference
  // Now using the imported SparkleTrail component from SparkleTrail.tsx
  
  // Additional cinematic elements
  const CinematicElements = () => {
    return (
      <>
        <div className="vignette"></div>
        <div className="stars-container">
          {[...Array(200)].map((_, i) => (
            <motion.div
              key={i}
              className="star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`
              }}
              animate={{
                opacity: [0.1, 0.8, 0.1],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
        
        {/* Floating magical objects */}
        <div className="floating-elements-container">
          {floatingElements.map((el, i) => (
            <motion.div
              key={i}
              className={`floating-element floating-element-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: isReady ? 0.8 : 0, 
                scale: isReady ? 1 : 0,
                x: [el.x, -el.x, el.x],
                y: [el.y, -el.y, el.y],
                rotate: [el.rotation, -el.rotation, el.rotation]
              }}
              transition={{ 
                opacity: { delay: el.delay, duration: 1 },
                scale: { delay: el.delay, duration: 1 },
                x: { repeat: Infinity, duration: el.duration, ease: "easeInOut" },
                y: { repeat: Infinity, duration: el.duration * 1.2, ease: "easeInOut" },
                rotate: { repeat: Infinity, duration: el.duration * 1.5, ease: "easeInOut" }
              }}
            >
              {i % 3 === 0 ? '✨' : i % 3 === 1 ? '🔮' : '⭐'}
            </motion.div>
          ))}
        </div>
      </>
    )
  }
  
  // Castle icon SVG for Disney-like feel
  const CastleIcon = () => (
    <svg 
      className="castle-icon" 
      viewBox="0 0 100 100" 
      width="40" 
      height="40"
    >
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: 1, 
          opacity: 1,
          transition: { delay: 0.8, duration: 1 } // Faster animation
        }}
        d="M50,10 L55,20 L60,10 L65,20 L70,10 L75,20 L80,10 L85,20 L90,20 L90,50 L80,50 L80,90 L65,90 L65,70 L60,70 L60,90 L40,90 L40,70 L35,70 L35,90 L20,90 L20,50 L10,50 L10,20 L15,20 L20,10 L25,20 L30,10 L35,20 L40,10 L45,20 Z"
        stroke="rgba(255,240,200,0.9)"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
  
  return (
    <div className="landing-container">
      {/* Enhanced background elements */}
      <Background />
      <CinematicElements />
      <ShootingStars />
      <FloatingOrbs />
      <MagicDust />
      <SparkleTrail mousePosition={mousePosition} />
      
      <AnimatePresence>
        {isLoaded && (
          <motion.div 
            className="landing-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, ease: "easeOut" }} // Faster animation
          >
            {/* Disney-style castle icon */}
            <div className="castle-icon-container">
              <CastleIcon />
            </div>
            
            {/* Enhanced glowing title */}
            <div className="title-container">
              <motion.div
                className="title-glow"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.h1 
                className="landing-title"
                variants={titleContainerVariants}
                initial="hidden"
                animate={isReady ? "visible" : "hidden"}
              >
                {titleText.split('').map((letter, index) => (
                  <motion.span 
                    key={index} 
                    variants={letterVariants}
                    className={letter === ' ' ? 'space-letter' : ''}
                  >
                    {letter}
                    {/* Add sparkles to more letters */}
                    {(index === 1 || index === 4 || index === 5 || index === 8) && (
                      <motion.span 
                        className="title-sparkle"
                        custom={index}
                        variants={sparkleVariants}
                        initial="hidden"
                        animate={isReady ? "visible" : "hidden"}
                      >
                        ✨
                      </motion.span>
                    )}
                  </motion.span>
                ))}
              </motion.h1>
            </div>
            
            {/* Subtitle with faster staggered reveal */}
            <motion.p
              className="landing-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isReady ? 1 : 0, 
                y: isReady ? 0 : 20 
              }}
              transition={{ delay: 0.7, duration: 0.5 }} // Faster animation
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: isReady ? 1 : 0 }}
                transition={{ delay: 0.9, duration: 0.3 }} // Faster animation
              >
                Where every page turns into
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: isReady ? 1 : 0 }}
                transition={{ delay: 1.2, duration: 0.3 }} // Faster animation
                className="subtitle-highlight"
              >
                an adventure
              </motion.span>
            </motion.p>
            
            {/* Additional content - New feature showcase */}
            <motion.div
              className="feature-showcase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 20 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <motion.div 
                className="feature-item"
                whileHover={{ scale: 1.05 }}
              >
                <div className="feature-icon">📖</div>
                <h3>Interactive Stories</h3>
                <p>Immerse yourself in a world of wonder and magic</p>
              </motion.div>
              
              <motion.div 
                className="feature-item"
                whileHover={{ scale: 1.05 }}
              >
                <div className="feature-icon">✨</div>
                <h3>Magical Elements</h3>
                <p>Experience stories that come alive with magic</p>
              </motion.div>
              
              <motion.div 
                className="feature-item"
                whileHover={{ scale: 1.05 }}
              >
                <div className="feature-icon">🏰</div>
                <h3>Enchanted Worlds</h3>
                <p>Discover new realms filled with adventure</p>
              </motion.div>
            </motion.div>
            
            {/* Magic wand decoration with faster animation */}
            <motion.div 
              className="magic-wand"
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{ 
                opacity: isReady ? 1 : 0, 
                scale: isReady ? 1 : 0,
                rotate: isReady ? 0 : -45
              }}
              transition={{ delay: 1.0, duration: 0.6, type: "spring" }} // Faster animation
            >
              <div className="wand"></div>
              <div className="wand-star"></div>
            </motion.div>
            
            {/* Get Started Button with faster animation */}
            <motion.div
              className="landing-button-container"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              variants={{
                ready: { 
                  opacity: 1, 
                  scale: 1, 
                  y: 0 
                }
              }}
              animate={isReady ? "ready" : {}}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                delay: 1.4, // Faster animation
                duration: 0.4,
                type: "spring",
                stiffness: 400,
                damping: 15
              }}
            >
              <Button 
                onClick={onExplore}
                variant="rainbow"
                size="lg"
                className="relative font-medium"
              >
                <span className="button-text">Begin the Magic</span>
                <motion.span 
                  className="absolute top-1 right-3 text-sm"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { repeat: Infinity, duration: 5 },
                    scale: { repeat: Infinity, duration: 2 }
                  }}
                >
                  ✨
                </motion.span>
              </Button>
              
              {/* Enhanced button glow effect */}
              <div className="button-glow"></div>
            </motion.div>
            
            {/* New content - Cinematic tagline */}
            <motion.div
              className="cinematic-tagline"
              initial={{ opacity: 0 }}
              animate={{ opacity: isReady ? 1 : 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
            >
              <p>"A new dimension of storytelling awaits..."</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Add a scroll indicator */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: isReady ? [0.2, 0.8, 0.2] : 0, 
          y: isReady ? [0, 10, 0] : -10 
        }}
        transition={{ 
          delay: 2.5,
          duration: 2,
          repeat: Infinity
        }}
      >
        <div className="scroll-arrow">↓</div>
        <div className="scroll-text">Scroll to explore</div>
      </motion.div>
      
      <style jsx="true">{`
        /* Basic layout */
        .landing-container {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #0a0a1a, #1a1a3a);
          color: #fff;
          padding: 2rem;
        }
        
        /* Vignette effect */
        .vignette {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          box-shadow: inset 0 0 150px 60px rgba(0, 0, 0, 0.8);
          pointer-events: none;
          z-index: 2;
        }
        
        /* Stars background */
        .stars-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        
        .star {
          position: absolute;
          background-color: #fff;
          border-radius: 50%;
        }
        
        /* Shooting stars */
        .shooting-stars-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          overflow: hidden;
        }
        
        .shooting-star {
          position: absolute;
          width: 100px;
          height: 2px;
          background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8));
          transform: rotate(-45deg);
        }
        
        /* Floating orbs */
        .floating-orbs-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        
        .floating-orb {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          filter: blur(5px);
        }
        
        /* Magic dust */
        .magic-dust {
          position: fixed;
          width: 30px;
          height: 30px;
          pointer-events: none;
          z-index: 100;
        }
        
        .dust-particle {
          position: absolute;
          width: 5px;
          height: 5px;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          filter: blur(1px);
        }
        
        /* Floating elements */
        .floating-elements-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }
        
        .floating-element {
          position: absolute;
          font-size: 2rem;
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
        }
        
        .floating-element-0 { top: 15%; left: 20%; }
        .floating-element-1 { top: 70%; left: 15%; }
        .floating-element-2 { top: 25%; left: 80%; }
        .floating-element-3 { top: 60%; left: 75%; }
        .floating-element-4 { top: 45%; left: 10%; }
        .floating-element-5 { top: 30%; left: 65%; }
        
        /* Landing content */
        .landing-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          max-width: 1000px;
          padding: 2rem;
        }
        
        /* Castle icon */
        .castle-icon-container {
          margin-bottom: 1rem;
        }
        
        .castle-icon {
          filter: drop-shadow(0 0 8px rgba(255, 210, 125, 0.8));
        }
        
        /* Title styles */
        .title-container {
          position: relative;
          margin-bottom: 1rem;
        }
        
        .title-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120%;
          height: 150%;
          background: radial-gradient(ellipse at center, rgba(255, 215, 125, 0.3) 0%, rgba(255, 215, 125, 0) 70%);
          transform: translate(-50%, -50%);
          z-index: -1;
        }
        
        .landing-title {
          font-size: 4rem;
          font-weight: bold;
          margin-bottom: 1rem;
          letter-spacing: 4px;
          color: #fff;
          text-shadow: 
            0 0 10px rgba(255, 255, 255, 0.8),
            0 0 20px rgba(255, 215, 125, 0.5),
            0 0 30px rgba(255, 215, 125, 0.3);
          position: relative;
          display: flex;
          justify-content: center;
        }
        
        .title-sparkle {
          position: absolute;
          top: -15px;
          right: -10px;
          font-size: 1.2rem;
          animation: sparkle 2s infinite;
        }
        
        @keyframes sparkle {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.5); opacity: 1; }
        }
        
        /* Subtitle styles */
        .landing-subtitle {
          font-size: 1.5rem;
          margin-bottom: 2.5rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 300;
        }
        
        .subtitle-highlight {
          color: #a2c0ff;
          font-weight: 600;
          text-decoration: underline;
          text-decoration-color: rgba(162, 192, 255, 0.4);
          text-underline-offset: 5px;
        }
        
        /* Feature showcase */
        .feature-showcase {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin: 2rem 0;
          width: 100%;
        }
        
        .feature-item {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(5px);
          border-radius: 12px;
          padding: 1.5rem;
          width: 220px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .feature-item:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-5px);
        }
        
        .feature-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        .feature-item h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #fff;
        }
        
        .feature-item p {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }
        
        /* Magic wand */
        .magic-wand {
          position: absolute;
          top: 30%;
          right: 5%;
          transform: rotate(-30deg);
          z-index: 1;
        }
        
        .wand {
          position: relative;
          width: 8px;
          height: 120px;
          background: linear-gradient(to bottom, #ffea80, #a86e32);
          border-radius: 4px;
          transform: rotate(45deg);
        }
        
        .wand-star {
          position: absolute;
          top: -15px;
          left: -8px;
          width: 24px;
          height: 24px;
          background: #fff;
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
          animation: glow 2s infinite;
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.8); }
          50% { box-shadow: 0 0 25px 10px rgba(255, 255, 255, 0.8); }
        }
        
        /* Button styles */
        .landing-button-container {
          position: relative;
          margin-top: 1rem;
        }
        
        .button-text {
          position: relative;
          z-index: 2;
        }
        
        .button-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        .landing-button-container:hover .button-glow {
          opacity: 0.2;
        }
        
        /* Cinematic tagline */
        .cinematic-tagline {
          margin-top: 3rem;
          font-style: italic;
          opacity: 0.7;
          font-size: 1.2rem;
        }
        
        /* Scroll indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .scroll-arrow {
          font-size: 1.5rem;
          animation: bounce 2s infinite;
        }
        
        .scroll-text {
          font-size: 0.8rem;
          margin-top: 0.5rem;
        }
        
        /* SparkleTrail component */
        .cursor-sparkle {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 1000;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  )
}

export default LandingPage
