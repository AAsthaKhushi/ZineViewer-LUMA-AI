import React, { useEffect, useRef, useState } from 'react'
import { useGenre } from '../../contexts/GenreContext'
import Particle from './SparkleTrail'
import BurstEngine from './BurstEngine'
import Runes from './Runes'
import { playGenreSound, preloadSounds } from './audio'

interface MagicParticlesProps {
  enableRunes?: boolean
  burstOnClick?: boolean
  sparkleLength?: 'short' | 'medium' | 'long'
  soundEnabled?: boolean
  blendMode?: 'normal' | 'screen' | 'multiply' | 'overlay'
  className?: string
}

const MagicParticles: React.FC<MagicParticlesProps> = ({
  enableRunes = true,
  burstOnClick = true,
  sparkleLength = 'medium',
  soundEnabled = true,
  blendMode = 'screen',
  className = '',
}) => {
  const { currentGenre } = useGenre()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const burstEngineRef = useRef<BurstEngine | null>(null)
  const trailActive = useRef(false)
  
  // Preload all sounds
  useEffect(() => {
    if (soundEnabled) {
      preloadSounds(['nature', 'cosmos', 'fantasy', 'horror', 'ocean'])
    }
  }, [soundEnabled])
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Initialize canvas
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)
    
    // Initialize burst engine
    burstEngineRef.current = new BurstEngine({
      canvas,
      ctx,
      particles: particles.current
    })
    
    // Animation loop
    let animationFrameId: number
    
    const animate = () => {
      // Apply blend mode
      if (ctx) {
        ctx.globalCompositeOperation = blendMode === 'normal' ? 'source-over' : blendMode
      }
      
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'source-over'
      
      // Update and draw particles
      for (let i = 0; i < particles.current.length; i++) {
        particles.current[i].update()
        particles.current[i].draw(ctx)
        
        // Remove dead particles
        if (particles.current[i].life <= 0) {
          particles.current.splice(i, 1)
          i--
        }
      }
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    // Start animation
    animate()
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [blendMode])
  
  // Mouse tracking for trails
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      if (trailActive.current && currentGenre) {
        createTrailParticles(e.clientX, e.clientY)
      }
    }
    
    const handleMouseDown = () => {
      trailActive.current = true
    }
    
    const handleMouseUp = () => {
      trailActive.current = false
    }
    
    const handleClick = (e: MouseEvent) => {
      if (burstOnClick && currentGenre && burstEngineRef.current) {
        burstEngineRef.current.createBurst(e.clientX, e.clientY, currentGenre)
        
        if (soundEnabled) {
          playGenreSound(currentGenre)
        }
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('click', handleClick)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('click', handleClick)
    }
  }, [burstOnClick, currentGenre, soundEnabled])
  
  // Create trail particles based on genre
  const createTrailParticles = (x: number, y: number) => {
    if (!currentGenre) return
    
    // Number of particles based on trail length setting
    const particleCount = {
      short: 1,
      medium: 2,
      long: 4
    }[sparkleLength]
    
    for (let i = 0; i < particleCount; i++) {
      // Get genre-specific properties
      const { color, size, life } = getGenreParticleProps(currentGenre)
      
      // Add small random offsets
      const offsetX = (Math.random() - 0.5) * 10
      const offsetY = (Math.random() - 0.5) * 10
      
      particles.current.push(
        new Particle({
          x: x + offsetX,
          y: y + offsetY,
          size,
          color,
          life,
          maxLife: life,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          opacity: 0.8,
          genre: currentGenre
        })
      )
    }
  }
  
  // Get genre-specific particle properties
  const getGenreParticleProps = (genre: string) => {
    const baseSize = Math.random() * 3 + 2
    const baseLife = Math.random() * 20 + 40
    
    switch(genre) {
      case 'nature':
        return {
          color: `rgba(${118 + Math.random() * 50}, ${200 + Math.random() * 55}, ${73 + Math.random() * 50}, 0.8)`,
          size: baseSize * 1.2,
          life: baseLife * 1.2
        }
      case 'cosmos':
        return {
          color: `rgba(${72 + Math.random() * 50}, ${149 + Math.random() * 50}, ${239 + Math.random() * 16}, 0.8)`,
          size: baseSize * 0.8,
          life: baseLife * 1.5
        }
      case 'fantasy':
        return {
          color: `rgba(${157 + Math.random() * 50}, ${78 + Math.random() * 100}, ${221 + Math.random() * 34}, 0.8)`,
          size: baseSize,
          life: baseLife
        }
      case 'horror':
        return {
          color: `rgba(${164 + Math.random() * 50}, ${19 + Math.random() * 50}, ${60 + Math.random() * 30}, 0.7)`,
          size: baseSize * 1.5,
          life: baseLife * 0.7
        }
      case 'ocean':
        return {
          color: `rgba(${0 + Math.random() * 72}, ${180 + Math.random() * 52}, ${216 + Math.random() * 32}, 0.8)`,
          size: baseSize * 1.1,
          life: baseLife * 1.1
        }
      default:
        return {
          color: `rgba(255, 255, 255, 0.8)`,
          size: baseSize,
          life: baseLife
        }
    }
  }
  
  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed top-0 left-0 w-full h-full pointer-events-none z-10 ${className}`}
      />
      {enableRunes && currentGenre && (
        <Runes genre={currentGenre} mousePosition={mousePosition} />
      )}
    </>
  )
}

export default MagicParticles
