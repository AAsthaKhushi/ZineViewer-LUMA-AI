import { motion } from 'framer-motion';

const NatureZineFooter = () => {
  const currentYear = new Date().getFullYear();

  // Keyframe for shimmer
  const shimmerKeyframes = `
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `;

  const shimmerStyle = {
    background: 'linear-gradient(to right, #ffffff44 0%, #c5f6c7 50%, #ffffff44 100%)',
    backgroundSize: '200% auto',
    color: 'transparent',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    animation: 'shimmer 3s infinite',
    fontFamily: "'Marck Script', cursive",
    fontSize: '2rem',
    textShadow: '0 0 10px rgba(144,255,180,0.4)',
    fontWeight: 600,
    marginBottom: '1rem',
  };

  const quoteStyle = {
    fontSize: '1.8rem',
    fontWeight: 700,
    fontFamily: "'Playfair Display', serif",
    color: '#e0ffe0',
    textShadow: '0 0 15px rgba(34,255,144,0.25)',
    marginBottom: '1.2rem',
    lineHeight: '2.4rem',
    maxWidth: '90%',
    margin: '0 auto',
  };

  const subTextStyle = {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: "'Crimson Text', serif",
    marginTop: '0.75rem',
  };

  const floatingElements = [
    { size: 30, color: '#d0f0d0', glow: 'rgba(160,255,160,0.3)' },
    { size: 24, color: '#f0e6d0', glow: 'rgba(255,234,175,0.2)' },
    { size: 18, color: '#f0d0e6', glow: 'rgba(255,200,230,0.25)' },
    { size: 26, color: '#d0fff0', glow: 'rgba(160,255,230,0.25)' },
  ];

  return (
    <>
      <style>{shimmerKeyframes}</style>

      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{
          background: 'linear-gradient(to top, #0a1a0a, #0f2e0f)',
          padding: '3rem 1rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          color: '#d5f8e3',
          fontFamily: "'Crimson Text', serif",
        }}
      >
        {/* 🌸 Floating flower/leaf elements */}
        {floatingElements.map((el, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              bottom: 0,
              left: `${Math.random() * 100}%`,
              width: el.size,
              height: el.size,
              backgroundColor: el.color,
              boxShadow: `0 0 8px ${el.glow}`,
              borderRadius: '50%',
              opacity: 0.5,
              zIndex: 0,
              pointerEvents: 'none',
              filter: 'blur(1px)',
            }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 0.4, 0], y: [-10, -40, -90] }}
            transition={{
              duration: 7 + i * 2,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}

        {/* 📝 Dramatic forest quote */}
        <div style={quoteStyle}>
          “And into the forest I go, to lose my mind and find my soul.”
        </div>

        {/* 🌿 Shimmered mystical subheading */}
        <div style={shimmerStyle}>Nature's Whisper</div>

        {/* 📅 Tagline */}
        <p style={subTextStyle}>
          Created with 💚 for Earth • {currentYear}
        </p>
      </motion.footer>
    </>
  );
};

export default NatureZineFooter;
