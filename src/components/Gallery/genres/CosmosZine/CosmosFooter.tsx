import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const CosmosFooter = () => {
  const [showConstellation, setShowConstellation] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const timer = setTimeout(() => setShowConstellation(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const shimmerKeyframes = `
    @keyframes cosmicShimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `;

  const shimmerStyle: React.CSSProperties = {
    background: 'linear-gradient(to right, #ffffff22 0%, #a5b4fc 50%, #ffffff22 100%)',
    backgroundSize: '200% auto',
    color: 'transparent',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    animation: 'cosmicShimmer 4s infinite',
    fontFamily: "'Orbitron', sans-serif",
    fontSize: '2rem',
    textShadow: '0 0 15px rgba(165, 180, 252, 0.6)',
  };

  return (
    <>
      <style>{shimmerKeyframes}</style>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        style={{
          height: '100vh',
          width: '100%',
          background: 'radial-gradient(circle at center, #0a0f1c, #05010a)',
          color: '#e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Floating stars */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              borderRadius: '50%',
              backgroundColor: 'white',
              opacity: Math.random() * 0.8 + 0.2,
              boxShadow: '0 0 6px white',
              zIndex: 0,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Floating planets */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`planet-${i}`}
            style={{
              position: 'absolute',
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 100}%`,
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, #a5b4fc, #4338ca)`,
              boxShadow: '0 0 15px #818cf8',
              opacity: 0.7,
              zIndex: 1,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 8 + Math.random() * 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Optional: Shooting stars */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`shooting-star-${i}`}
            style={{
              position: 'absolute',
              width: '80px',
              height: '2px',
              background: 'linear-gradient(to right, white, transparent)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: 'rotate(45deg)',
              opacity: 0,
            }}
            animate={{
              x: [0, 200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 4,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Content */}
        <div style={{ zIndex: 2 }}>
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#a5b4fc',
              margin: '0 auto 1rem',
              boxShadow: '0 0 12px #a5b4fc',
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            style={shimmerStyle}
          >
            Keep Looking Up
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1.5, duration: 1 }}
            style={{
              marginTop: '1rem',
              fontSize: '1.1rem',
              fontFamily: "'Space Grotesk', sans-serif",
              color: '#a5b4fc',
            }}
          >
            The cosmos is within us. We are made of star-stuff.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2, duration: 1 }}
            style={{
              marginTop: '2rem',
              fontSize: '0.9rem',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <span style={{ marginRight: '1rem' }}>Cosmic Voyage</span>
            <span style={{ marginRight: '1rem' }}>•</span>
            <span>{currentYear}</span>
          </motion.div>
        </div>

        {/* Floating Spaceship Emojis */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '10%',
            fontSize: '40px', // Adjust size as needed
            opacity: 0.85,
            zIndex: 2,
            filter: 'drop-shadow(0 0 8px rgba(165, 180, 252, 0.6))', // Optional: add glow
          }}
          animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          🚀
        </motion.div>

        <motion.div
          style={{
            position: 'absolute',
            bottom: '8%',
            right: '12%',
            fontSize: '35px', // Adjust size as needed
            opacity: 0.75,
            transform: 'rotateY(180deg)', // Flip the emoji horizontally if needed
            zIndex: 2,
            filter: 'drop-shadow(0 0 8px rgba(165, 180, 252, 0.5))', // Optional: add glow
          }}
          animate={{ y: [0, -12, 0], x: [0, -5, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        >
          🚀
        </motion.div>

      </motion.footer>
    </>
  );
};

export default CosmosFooter;
