import { motion } from "framer-motion";
import { useState } from "react";
import React from 'react'; // Import React here

export default function OceanFooter({ handleInteractiveElementClick }: any) {
  const [showMystery, setShowMystery] = useState(false);

  const footerStyle: React.CSSProperties = {
    position: "relative",
    padding: "4rem 2rem",
    background: "linear-gradient(to top, #000814, #001d3d)",
    textAlign: "center",
    overflow: "hidden",
    color: "#cdebf9",
    fontFamily: "'Cormorant Garamond', serif",
  };

  const footerTextStyle: React.CSSProperties = {
    fontSize: "1.6rem",
    fontStyle: "italic",
    textShadow: "0 0 12px #0088ff88",
    zIndex: 2,
    position: "relative",
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: "1.5rem",
    padding: "0.75rem 2rem",
    fontSize: "1rem",
    backgroundColor: "rgba(0, 70, 130, 0.3)",
    color: "#ffffff",
    border: "1px solid #0077ff",
    borderRadius: "10px",
    cursor: "pointer",
    fontFamily: "'Unica One', sans-serif",
    transition: "all 0.3s ease-in-out",
    zIndex: 2,
    position: "relative",
  };

  const mysteryTextStyle: React.CSSProperties = {
    marginTop: "2rem",
    fontSize: "1.25rem",
    color: "#9cd3ff",
    fontFamily: "'Almendra SC', serif",
    textShadow: "0 0 10px rgba(0, 255, 255, 0.3)",
    zIndex: 2,
    position: "relative",
  };

  const bubbleBaseStyle: React.CSSProperties = {
    position: "absolute",
    bottom: 0,
    width: "8px",
    height: "8px",
    backgroundColor: "rgba(0, 180, 255, 0.3)",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 0,
  };

  return (
    <motion.footer
      style={footerStyle}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            ...bubbleBaseStyle,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 0.4, 0], y: [-10, -50, -100] }}
          transition={{
            duration: 8 + i * 1.5,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Footer text */}
      <p style={footerTextStyle}>
        You've reached the deepest known point... <em>Or have you?</em>
      </p>

      {/* Explore button */}
      <motion.button
        style={buttonStyle}
        whileHover={{
          scale: 1.05,
          backgroundColor: "rgba(0, 100, 255, 0.3)",
          boxShadow: "0 0 12px rgba(0, 255, 255, 0.4)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          handleInteractiveElementClick(
            "The Unexplored",
            "Scientists believe many species in the deep ocean remain undiscovered."
          );
          setShowMystery(true);
        }}
      >
        Explore the Unknown
      </motion.button>

      {/* Mysterious final quote */}
      {showMystery && (
        <motion.p
          style={mysteryTextStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        >
          “We know more about the surface of Mars than the bottom of our oceans.”
        </motion.p>
      )}
    </motion.footer>
  );
} 