import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { genreData } from '../../utils/genreData'
import Button from '../ui/Button'
import BackButton from '../ui/BackButton'
import { useGenre } from '../../contexts/GenreContext'
import MagicParticles from '../MagicParticles'

const Gallery = () => {
  const navigate = useNavigate()
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  
  // Preload images for smooth transitions
  useEffect(() => {
    genreData.forEach(genre => {
      const img = new Image()
      img.src = genre.cover
    })
    
    // Set page as loaded after a short delay for dramatic entrance
    setTimeout(() => setIsPageLoaded(true), 300)
  }, [])

  useEffect(() => {
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    const link2 = document.createElement('link')
    link2.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap'
    link2.rel = 'stylesheet'
    document.head.appendChild(link2)

    return () => {
      document.head.removeChild(link)
      document.head.removeChild(link2)
    }
  }, [])

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth) - 0.5
      const y = (clientY / window.innerHeight) - 0.5
      
      cardsRef.current.forEach((card) => {
        if (card) {
          card.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`
        }
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.6 }
    }
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.2
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  }

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 12
      }
    }
  }

  const { setCurrentGenre } = useGenre()

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre)
    
    // Add selection animation and then navigate
    setTimeout(() => {
      setCurrentGenre(genre as any)
      navigate(`/genre/${genre}`)
    }, 600)
  }

  const handleBackClick = () => {
    // Add exit animation
    const timeline = setTimeout(() => {
      navigate('/')
      clearTimeout(timeline)
    }, 300)
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-[#050505] to-[#0a0a18] p-6 md:p-10 text-white relative overflow-hidden"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Animated background elements - themed based on hovered card */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute w-64 h-64 rounded-full blur-3xl"
            style={{ 
              backgroundColor: hoveredCard ? 
                `${genreData.find(g => g.id === hoveredCard)?.color}30` || 'rgba(147, 51, 234, 0.2)' : 
                'rgba(147, 51, 234, 0.2)'
            }}
            animate={{ 
              x: [0, 100, 50, 0], 
              y: [0, 50, 100, 0],
              scale: [1, 1.2, 0.9, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              repeatType: "mirror"
            }}
            
          />
          <motion.div 
            className="absolute w-96 h-96 rounded-full blur-3xl"
            animate={{ 
              x: [0, -70, -20, 0], 
              y: [0, 80, 20, 0],
              scale: [1, 0.8, 1.1, 1]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              repeatType: "mirror" 
            }}
            style={{ 
              top: '40%', 
              right: '10%',
              backgroundColor: hoveredCard ? 
                `${genreData.find(g => g.id === hoveredCard)?.color}20` || 'rgba(37, 99, 235, 0.2)' : 
                'rgba(37, 99, 235, 0.2)'
            }}
          />
          <motion.div 
            className="absolute w-72 h-72 rounded-full blur-3xl"
            animate={{ 
              x: [0, 50, -50, 0], 
              y: [0, -100, -50, 0],
              scale: [1, 1.2, 0.9, 1]
            }}
            transition={{ 
              duration: 22, 
              repeat: Infinity, 
              repeatType: "mirror" 
            }}
            style={{ 
              bottom: '10%', 
              left: '30%',
              backgroundColor: hoveredCard ? 
                `${genreData.find(g => g.id === hoveredCard)?.color}25` || 'rgba(236, 72, 153, 0.2)' : 
                'rgba(236, 72, 153, 0.2)'
            }}
          />
        </div>
        
        <MagicParticles burstOnClick={true} enableRunes={true} />
        
        <div className="container mx-auto z-10 relative">
          {/* Header with animations */}
          <motion.div 
            className="flex items-center mb-10"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            <BackButton 
              label="Back"
              onClick={handleBackClick}
              size="sm"
            />
            <motion.h1 
              className="text-3xl md:text-5xl font-bold ml-4 bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent tracking-tight"
              whileHover={{ 
                backgroundPosition: ["0%", "100%"],
                transition: { duration: 1, repeat: Infinity, repeatType: "mirror" }
              }}
            >
              Zine Gallery
            </motion.h1>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isPageLoaded ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {genreData.map((genre, index) => (
              <motion.div
                key={genre.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, zIndex: 20 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleGenreSelect(genre.id)}
                onHoverStart={() => setHoveredCard(genre.id)}
                onHoverEnd={() => setHoveredCard(null)}
                ref={el => cardsRef.current[index] = el}
                className="relative overflow-hidden rounded-2xl cursor-pointer border border-white/10 shadow-[0_4px_40px_rgba(255,255,255,0.08)] transition-all duration-500 ease-in-out group"
                style={{ 
                  aspectRatio: '3/4',
                  transformStyle: 'preserve-3d',
                  boxShadow: hoveredCard === genre.id ? 
                    `0 22px 70px 4px ${genre.color}40, 0 0 0 1px rgba(255, 255, 255, 0.1)` : 
                    '0 4px 40px rgba(255, 255, 255, 0.08)'
                }}
              >
                {/* Shine effect overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 z-20"
                  animate={hoveredCard === genre.id ? {
                    backgroundPosition: ['200% 50%', '-200% 50%'],
                  } : {}}
                  transition={hoveredCard === genre.id ? {
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'mirror'
                  } : {}}
                />
              
                <motion.div 
                  className="absolute inset-0 bg-cover bg-center z-0"
                  style={{ backgroundImage: `url(${genre.cover})` }}
                  animate={{
                    scale: hoveredCard === genre.id ? 1.15 : 1
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                />

                {/* Enhanced Gradient Overlay with pulsating effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 backdrop-blur-sm"
                  animate={{
                    opacity: hoveredCard === genre.id ? [0.8, 0.6, 0.8] : 0.7
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                />

                {/* Floating glow dots */}
                {hoveredCard === genre.id && (
                  <>
                    <motion.div
                      className="absolute w-2 h-2 rounded-full blur-sm z-20"
                      style={{ backgroundColor: `${genre.color}B3` }}
                      animate={{ 
                        x: [0, 10, 0], 
                        y: [0, -10, 0],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute w-2 h-2 rounded-full blur-sm z-20"
                      animate={{ 
                        x: [0, -15, 0], 
                        y: [0, 15, 0],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      style={{ top: '60%', right: '25%', backgroundColor: `${genre.color}99` }}
                    />
                    <motion.div
                      className="absolute w-1 h-1 rounded-full blur-sm z-20"
                      animate={{ 
                        x: [0, 8, 0], 
                        y: [0, 8, 0],
                        opacity: [0.6, 1, 0.6]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ top: '25%', right: '30%', backgroundColor: `${genre.color}B3` }}
                    />
                  </>
                )}

                {/* Improved Text Overlay with animations */}
                <motion.div 
                  className="absolute bottom-0 left-0 p-6 z-20 backdrop-blur-lg bg-black/30 rounded-tr-xl w-full"
                  initial={{ y: 10, opacity: 0.8 }}
                  animate={{ 
                    y: hoveredCard === genre.id ? 0 : 10,
                    opacity: hoveredCard === genre.id ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h3 
                    className="text-2xl font-bold mb-1 text-white drop-shadow"
                    animate={{ 
                      scale: hoveredCard === genre.id ? [1, 1.05, 1] : 1
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: hoveredCard === genre.id ? Infinity : 0, 
                      repeatType: "reverse"
                    }}
                  >
                    {genre.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-sm text-white/90"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: hoveredCard === genre.id ? 1 : 0.8,
                      height: "auto" 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {genre.description}
                  </motion.p>
                </motion.div>

                {/* Enhanced Button with glow effect */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: hoveredCard === genre.id ? 1 : 0, 
                    y: hoveredCard === genre.id ? 0 : 10
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center z-30"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      className="bg-white/90 text-black hover:bg-white relative overflow-hidden group"
                    >
                      <span className="relative z-10">Explore</span>
                      <motion.span 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 z-0"
                        style={{ backgroundColor: `${genre.color}80` }}
                        animate={{ 
                          opacity: [0, 0.5, 0],
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity
                        }}
                      />
                    </Button>
                  </motion.div>
                </motion.div>
                
                {/* Selection indicator */}
                {selectedGenre === genre.id && (
                  <motion.div
                    className="absolute inset-0 z-40"
                    style={{ backgroundColor: genre.color }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Gallery