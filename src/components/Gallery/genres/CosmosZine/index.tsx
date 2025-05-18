import { useState, useEffect, useRef, FC } from 'react';
import { Moon, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import CosmosFooter from './CosmosFooter';

interface CosmosZineProps {
  onBack: () => void;
}

const CosmosZine: FC<CosmosZineProps> = ({ onBack }) => {
  const [activeSlide, setActiveSlide] = useState<number>(1);
  const [showStars, setShowStars] = useState<boolean>(false);
  const [showConstellationHuman, setShowConstellationHuman] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slidesRef = useRef<HTMLDivElement | null>(null);
  
  // Initialize cosmic effects
  useEffect(() => {
    // Show stars with slight delay for better effect
    const timer = setTimeout(() => {
      setShowStars(true);
    }, 500);
    
    // Create random stars
    const createStars = (): void => {
      const starContainer = document.getElementById('starField');
      if (!starContainer) return;
      
      starContainer.innerHTML = '';
      
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 10}s`;
        star.style.animationDuration = `${3 + Math.random() * 7}s`;
        starContainer.appendChild(star);
      }
    };
    
    createStars();
    
    return () => clearTimeout(timer);
  }, []);
  
  // Cursor effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'cursorTrail';
    container.appendChild(cursor);
    
    const handleMouseMove = (e: MouseEvent): void => {
      const rect = container.getBoundingClientRect();
      cursor.style.left = `${e.clientX - rect.left}px`;
      cursor.style.top = `${e.clientY - rect.top}px`;
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor);
      } else {
        // Handle the case where cursor might already be removed
        console.warn("Cursor element not found for removal.");
      }
    };
  }, []);
  
  // Scroll-based effects and slide transitions
  useEffect(() => {
    // Include the footer as the 5th slide
    const slides = document.querySelectorAll('.slide');
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust threshold if needed
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const slideIndex = parseInt(entry.target.getAttribute('data-index') || '1');
          setActiveSlide(slideIndex);
          
          // Special effect for the final slide (now index 5)
          if (slideIndex === 5) { // Changed from 4 to 5
            setTimeout(() => {
              setShowConstellationHuman(true);
            }, 1500);
          } else {
            setShowConstellationHuman(false);
          }
        }
      });
    }, options);

    slides.forEach(slide => {
      observer.observe(slide);
    });

    return () => {
      slides.forEach(slide => {
        observer.unobserve(slide);
      });
    };
  }, []);

  // Creates comet/meteor animation
  const renderMeteor = (): JSX.Element => {
    return (
      <div className="meteor"></div>
    );
  };

  const renderCosmicDust = (): JSX.Element => {
    return (
      <div className="cosmicDust"></div>
    );
  };

  const navigateToSlide = (slideNumber: number): void => {
    setActiveSlide(slideNumber);
    // Correctly select the slide element
    const targetSlide = document.querySelector(`.slide[data-index="${slideNumber}"]`);
    if (targetSlide) {
      targetSlide.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      className="cosmosZineContainer" 
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
        // Removed paddingBottom here
      }}
    >
      <style >{`
        /* Base Styles */
        .cosmosZineContainer {
          width: 100%;
          height: 100vh;
          position: relative;
          overflow-y: auto;
          overflow-x: hidden;
          background-color: #000;
          color: #fff;
          font-family: 'Cormorant Garamond', serif;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
        }

        /* Star Field */
        #starField {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: twinkle 5s infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }

        /* Cursor Trail */
        .cursorTrail {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%);
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 1000;
          opacity: 0.6;
          mix-blend-mode: screen;
          transition: all 0.1s ease;
        }

        /* Cosmic Elements */
        .meteor {
          position: fixed;
          width: 2px;
          height: 80px;
          background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0) 100%);
          animation: meteor 10s linear infinite;
          top: 0;
          left: 20%;
          z-index: 2;
          transform: rotate(45deg);
          opacity: 0;
        }

        .meteor:nth-child(2) {
          left: 70%;
          animation-delay: 5s;
          height: 100px;
        }

        @keyframes meteor {
          0% { transform: rotate(45deg) translateX(0) translateY(0); opacity: 0; }
          10% { opacity: 1; }
          20% { transform: rotate(45deg) translateX(-100px) translateY(100px); opacity: 0; } /* Corrected typo */
          100% { transform: rotate(45deg) translateX(-100px) translateY(100px); opacity: 0; }
        }

        .cosmicDust {
          position: fixed;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(138, 43, 226, 0.2) 0%, rgba(138, 43, 226, 0) 70%);
          border-radius: 50%;
          filter: blur(8px);
          animation: drift 20s ease infinite;
          z-index: 1;
        }

        @keyframes drift {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(100px) translateY(-50px); } /* Corrected typo */
        }

        .nebulaMistBg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(ellipse at center, rgba(16, 0, 43, 0.5) 0%, rgba(0, 0, 0, 0) 70%);
          mix-blend-mode: screen;
          z-index: 0;
          pointer-events: none;
        }

        /* Header */
        .header {
          position: fixed;
          top: 20px;
          left: 0;
          width: 100%;
          text-align: center;
          z-index: 100;
          pointer-events: none;
        }

        .headerTop {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .title {
          font-size: 2rem;
          font-weight: 300;
          letter-spacing: 3px;
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
          text-transform: uppercase;
        }

        .subtitle {
          font-size: 1rem;
          font-weight: 300;
          margin: 0;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 2px;
        }

        .cosmicIcon {
          color: rgba(255, 255, 255, 0.7);
        }

        /* Back Button */
        .backButton {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.8);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }

        .backButton:hover {
          background: rgba(20, 20, 40, 0.7);
          color: white;
        }

        /* Slides */
        .slides {
          position: relative;
          width: 100%;
          z-index: 10;
        }

        .slide {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          scroll-snap-align: start;
          padding: 20px;
          box-sizing: border-box;
        }

        .slideContent {
          max-width: 700px;
          width: 100%;
          padding: 40px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          z-index: 20;
          transform: translateY(0); /* Adjusted */
          opacity: 1; /* Adjusted */
          transition: all 0.5s ease; /* Adjusted */
        }

        /* Removed activeSlide styles as IntersectionObserver handles visibility */

        .slideTitle {
          font-size: 2.5rem;
          font-weight: 300;
          margin-bottom: 20px;
          color: rgba(255, 255, 255, 0.9);
          text-align: center;
          letter-spacing: 2px;
        }

        .poemContainer {
          margin: 30px 0;
          text-align: center;
        }

        .poemLine {
          font-size: 1.2rem;
          line-height: 1.8;
          margin-bottom: 10px;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 300;
        }

        .factBox {
          background: rgba(30, 30, 60, 0.6);
          border-radius: 8px;
          padding: 15px;
          display: flex;
          align-items: center;
          margin-top: 30px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .factIcon {
          font-size: 1.5rem;
          margin-right: 15px;
          opacity: 0.9;
        }

        .factText {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          font-family: 'IBM Plex Mono', monospace;
        }

        .slideTheme {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 1px;
          font-style: italic;
        }

        /* Slide 1: Stardust */
        .slideStardust {
          background: linear-gradient(to bottom, #000000, #191231);
        }

        .supernovaFlash {
          position: absolute;
          width: 0;
          height: 0;
          background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          z-index: 10;
          opacity: 0;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: supernova 10s ease infinite;
        }

        @keyframes supernova {
          0%, 90%, 100% { opacity: 0; width: 0; height: 0; } /* Corrected keyframe */
          92% { opacity: 0.8; width: 300%; height: 300%; } /* Corrected keyframe */
        }

        /* Slide 2: Light */
        .slideLight {
          background: linear-gradient(to bottom, #191231, #121b33);
        }

        .gravitationalLens {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: transparent;
          border: 2px solid rgba(255, 255, 255, 0.1);
          filter: blur(2px);
          transform: rotate(-30deg) scale(1); /* Adjusted initial transform */
          animation: lensEffect 15s ease infinite;
          z-index: 5;
        }

        @keyframes lensEffect {
          0%, 100% { transform: rotate(-30deg) scale(1); opacity: 0.1; } /* Adjusted keyframe */
          50% { transform: rotate(30deg) scale(1.5); opacity: 0.3; } /* Adjusted keyframe */
        }

        /* Slide 3: Silence */
        .slideSilence {
          background: linear-gradient(to bottom, #121b33, #000000);
        }

        .radioWaves {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 5;
          animation: radioWave 4s linear infinite;
        }

        @keyframes radioWave {
          0% { width: 0; height: 0; opacity: 0.8; } /* Adjusted keyframe */
          100% { width: 600px; height: 600px; opacity: 0; } /* Adjusted keyframe */
        }

        .binaryCode {
          position: absolute;
          font-family: 'Courier New', monospace;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.2); /* Adjusted opacity */
          z-index: 1;
          top: 30%;
          left: 30%;
          animation: fadeInOut 8s linear infinite; /* Adjusted duration */
        }

        .binaryCode:before {
          content: "01001000 01100101 01101100 01101100 01101111"; /* Adjusted content */
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0; } /* Adjusted keyframe */
          50% { opacity: 0.4; } /* Adjusted keyframe */
        }

        /* Slide 4: Universe */
        .slideUniverse {
          background: linear-gradient(to bottom, #000000, #120724); /* Adjusted gradient */
        }

        .eyeNebula {
          position: absolute;
          width: 300px; /* Adjusted size */
          height: 300px; /* Adjusted size */
          border-radius: 50%;
          background: radial-gradient(circle, rgba(138, 43, 226, 0.3) 0%, rgba(20, 0, 50, 0) 70%);
          z-index: 1;
          filter: blur(15px); /* Adjusted blur */
          animation: pulse 10s ease infinite; /* Adjusted duration */
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; } /* Adjusted keyframe */
          50% { transform: scale(1.2); opacity: 0.5; } /* Adjusted keyframe */
        }

        .humanSilhouette {
          position: absolute;
          width: 100px; /* Adjusted size */
          height: 200px; /* Adjusted size */
          background: rgba(0, 0, 0, 0.8); /* Adjusted background */
          mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 100"><path d="M25,0 C30,0 35,5 35,15 C35,25 30,30 25,35 C20,30 15,25 15,15 C15,5 20,0 25,0 Z M15,35 L15,60 L10,100 L15,100 L20,70 L25,70 L30,70 L35,100 L40,100 L35,60 L35,35 C35,35 30,40 25,40 C20,40 15,35 15,35 Z"/></svg>'); /* Adjusted mask */
          mask-size: contain;
          mask-repeat: no-repeat;
          mask-position: center;
          -webkit-mask-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 100"><path d="M25,0 C30,0 35,5 35,15 C35,25 30,30 25,35 C20,30 15,25 15,15 C15,5 20,0 25,0 Z M15,35 L15,60 L10,100 L15,100 L20,70 L25,70 L30,70 L35,100 L40,100 L35,60 L35,35 C35,35 30,40 25,40 C20,40 15,35 15,35 Z"/></svg>'); /* Adjusted mask */
          -webkit-mask-size: contain;
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-position: center;
          bottom: 100px; /* Adjusted position */
          left: 50%;
          transform: translateX(-50%);
          z-index: 5;
          opacity: 0.7; /* Adjusted opacity */
        }

        .showConstellation {
          background: linear-gradient(to bottom, rgba(138, 43, 226, 0.6), rgba(43, 226, 226, 0.3)); /* Adjusted background */
          box-shadow: 0 0 20px rgba(138, 43, 226, 0.8); /* Adjusted shadow */
        }

        .finalMessage {
          position: absolute;
          bottom: 40px; /* Adjusted position */
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 30;
          font-size: 1.2rem; /* Adjusted font size */
          font-weight: 300;
          letter-spacing: 2px;
          color: rgba(255, 255, 255, 0.7); /* Adjusted color opacity */
          opacity: 0;
          animation: fadeIn 3s ease forwards; /* Adjusted duration */
          animation-delay: 2s;
        }

        .pulsingStar {
          width: 6px; /* Adjusted size */
          height: 6px; /* Adjusted size */
          background-color: white;
          border-radius: 50%;
          margin: 0 auto 10px;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8); /* Adjusted shadow */
          animation: starPulse 2s ease infinite; /* Adjusted duration */
        }

        @keyframes starPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; } /* Adjusted keyframe */
          50% { transform: scale(1.5); opacity: 1; } /* Adjusted keyframe */
        }

        @keyframes fadeIn {
          0% { opacity: 0; } /* Adjusted keyframe */
          100% { opacity: 1; } /* Adjusted keyframe */
        }

        /* Navigation */
        .slideNavigation {
          position: fixed;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 15px;
          z-index: 100;
        }

        .navDot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.3); /* Adjusted color opacity */
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .navDot:hover {
          background-color: rgba(255, 255, 255, 0.6); /* Adjusted color opacity */
          transform: scale(1.2);
        }

        .activeDot {
          width: 12px;
          height: 12px;
          background-color: rgba(255, 255, 255, 0.9); /* Adjusted color opacity */
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); /* Adjusted shadow */
        }
      `}</style>
      
      <button 
        className="backButton" 
        onClick={onBack}
      >
        Back to Gallery
      </button>
      
      {/* Star field and background effects */}
      <div id="starField"></div>
      {renderMeteor()}
      {renderMeteor()}
      {renderCosmicDust()}
      <div className="nebulaMistBg"></div>
      
      {/* Header */}
      <div className="header">
        <div className="headerTop">
          <Moon className="cosmicIcon" size={24} strokeWidth={1} />
          <h1 className="title">CosmosZine</h1>
          <Star className="cosmicIcon" size={20} strokeWidth={1} />
        </div>
        <h2 className="subtitle">Eclipse of Thought</h2>
      </div>
      
      {/* Slides */}
      <div className="slides" ref={slidesRef}>
        {/* Slide 1: We Are Stardust */}
        <div className={`slide slideStardust ${activeSlide === 1 ? 'activeSlide' : ''}`} data-index="1">
          <div className="slideContent">
            <h2 className="slideTitle">We Are Stardust</h2>
            <div className="poemContainer">
              <p className="poemLine">Before your name, there was iron</p>
              <p className="poemLine">Forged in the hearts of stars that died alone.</p>
              <p className="poemLine">You are a cosmic inheritance —</p>
              <p className="poemLine">wrapped in skin, carried by breath.</p>
            </div>
            
            <div className="factBox">
              <div className="factIcon">💫</div>
              <p className="factText">More than 90% of your body's mass comes from stardust.</p>
            </div>
            
            <div className="slideTheme">
              <span>The Stardust Revelation</span>
            </div>
          </div>
          
          <div className="supernovaFlash"></div>
        </div>
        
        {/* Slide 2: The Illusion of Light */}
        <div className={`slide slideLight ${activeSlide === 2 ? 'activeSlide' : ''}`} data-index="2">
          <div className="slideContent">
            <h2 className="slideTitle">The Illusion of Light</h2>
            <div className="poemContainer">
              <p className="poemLine">Look up.</p>
              <p className="poemLine">You are watching the past bleed through the sky.</p>
              <p className="poemLine">Light is slow. Stars lie.</p>
              <p className="poemLine">Some are long dead — and still shining.</p>
            </div>
            
            <div className="factBox">
              <div className="factIcon">🔭</div>
              <p className="factText">The light from the star Betelgeuse takes 642 years to reach us — it could already be gone.</p>
            </div>
            
            <div className="slideTheme">
              <span>Time Travel by Sight</span>
            </div>
          </div>
          
          <div className="gravitationalLens"></div>
        </div>
        
        {/* Slide 3: The Great Silence */}
        <div className={`slide slideSilence ${activeSlide === 3 ? 'activeSlide' : ''}`} data-index="3">
          <div className="slideContent">
            <h2 className="slideTitle">The Great Silence</h2>
            <div className="poemContainer">
              <p className="poemLine">In all directions, emptiness speaks volumes.</p>
              <p className="poemLine">Why haven't we heard anyone?</p>
              <p className="poemLine">Are we the first?</p>
              <p className="poemLine">Or the last?</p>
              <p className="poemLine">Or... are they listening too, afraid to speak?</p>
            </div>
            
            <div className="factBox">
              <div className="factIcon">👁️</div>
              <p className="factText">We've only listened to about 0.05% of our galaxy for intelligent signals.</p>
            </div>
            
            <div className="slideTheme">
              <span>Loneliness of Intelligence</span>
            </div>
          </div>
          
          <div className="radioWaves"></div>
          <div className="binaryCode"></div>
        </div>
        
        {/* Slide 4: You Are the Universe */}
        <div className={`slide slideUniverse ${activeSlide === 4 ? 'activeSlide' : ''}`} data-index="4">
          <div className="slideContent">
            <h2 className="slideTitle">You Are the Universe</h2>
            <div className="poemContainer">
              <p className="poemLine">You are not small.</p>
              <p className="poemLine">You are vast.</p>
              <p className="poemLine">You are the universe, briefly aware —</p>
              <p className="poemLine">a flicker of light with questions for the void.</p>
              <p className="poemLine">And that is enough.</p>
            </div>
            
            <div className="factBox">
              <div className="factIcon">🌠</div>
              <p className="factText">Your brain has more connections than there are stars in the galaxy.</p>
            </div>
            
            <div className="slideTheme">
              <span>Existential Mirror</span>
            </div>
          </div>
      
          <div className="eyeNebula"></div>
          <div className={`humanSilhouette ${showConstellationHuman ? 'showConstellation' : ''}`}></div>
          
          {/* Removed final message from here */}
        </div>
        
        {/* Slide 5: Footer */}
        <div className={`slide slideUniverse ${activeSlide === 5 ? 'activeSlide' : ''}`} data-index="5">
          <CosmosFooter />
        </div>

      </div>
      
      {/* Navigation dots */}
      <div className="slideNavigation">
        <div 
          onClick={() => navigateToSlide(1)} 
          className={`navDot ${activeSlide === 1 ? 'activeDot' : ''}`}
        />
        <div 
          onClick={() => navigateToSlide(2)} 
          className={`navDot ${activeSlide === 2 ? 'activeDot' : ''}`}
        />
        <div 
          onClick={() => navigateToSlide(3)} 
          className={`navDot ${activeSlide === 3 ? 'activeDot' : ''}`}
        />
        <div 
          onClick={() => navigateToSlide(4)} 
          className={`navDot ${activeSlide === 4 ? 'activeDot' : ''}`}
        />
        {/* Added new navigation dot for the footer */}
        <div 
          onClick={() => navigateToSlide(5)} 
          className={`navDot ${activeSlide === 5 ? 'activeDot' : ''}`}
        />
      </div>
      
      {/* Removed CosmosFooter from here */}
    </div>
  );
};

export default CosmosZine;