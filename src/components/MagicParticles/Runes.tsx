import React, { useEffect, useRef } from 'react'
import { GenreType } from '../../contexts/GenreContext'

interface RuneProps {
  genre: GenreType
  mousePosition: { x: number; y: number }
}

const Runes: React.FC<RuneProps> = ({ genre, mousePosition }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const runesRef = useRef<Array<{
    x: number
    y: number
    size: number
    opacity: number
    rotation: number
    shape: number // Index for which rune to draw
  }>>([])
  
  // Maps each genre to its unique rune shape drawing function
  const drawGenreRune = (
    ctx: CanvasRenderingContext2D, 
    x: number, 
    y: number, 
    size: number, 
    rotation: number, 
    shape: number, 
    genre: GenreType
  ) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotation)
    
    switch(genre) {
      case 'nature':
        drawNatureRune(ctx, size, shape)
        break
      case 'cosmos':
        drawCosmosRune(ctx, size, shape)
        break
      case 'fantasy':
        drawFantasyRune(ctx, size, shape)
        break
      case 'horror':
        drawHorrorRune(ctx, size, shape)
        break
      case 'ocean':
        drawOceanRune(ctx, size, shape)
        break
      default:
        // Default simple rune
        ctx.beginPath()
        ctx.arc(0, 0, size, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.stroke()
    }
    
    ctx.restore()
  }
  
  const drawNatureRune = (ctx: CanvasRenderingContext2D, size: number, shape: number) => {
    const shapes = [
      // Leaf
      () => {
        ctx.beginPath()
        ctx.moveTo(0, -size)
        ctx.quadraticCurveTo(size, -size/2, 0, size)
        ctx.quadraticCurveTo(-size, -size/2, 0, -size)
        ctx.fillStyle = 'rgba(118, 200, 147, 0.4)'
        ctx.fill()
      },
      // Flower
      () => {
        for (let i = 0; i < 5; i++) {
          ctx.beginPath()
          ctx.ellipse(0, -size, size/3, size/2, (i * Math.PI * 2) / 5, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(252, 191, 73, 0.4)'
          ctx.fill()
        }
      },
      // Tree
      () => {
        ctx.beginPath()
        ctx.rect(-size/8, 0, size/4, size)
        ctx.fillStyle = 'rgba(121, 85, 72, 0.4)'
        ctx.fill()
        
        ctx.beginPath()
        ctx.arc(0, 0, size/2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(76, 175, 80, 0.3)'
        ctx.fill()
      }
    ]
    
    shapes[shape % shapes.length]()
  }
  
  const drawCosmosRune = (ctx: CanvasRenderingContext2D, size: number, shape: number) => {
    const shapes = [
      // Star
      () => {
        const spikes = 5
        const outerRadius = size
        const innerRadius = size/2
        
        let rot = Math.PI/2*3
        let x = 0
        let y = 0
        let step = Math.PI / spikes
        
        ctx.beginPath()
        ctx.moveTo(0, -outerRadius)
        
        for (let i = 0; i < spikes; i++) {
          x = Math.cos(rot) * outerRadius
          y = Math.sin(rot) * outerRadius
          ctx.lineTo(x, y)
          rot += step
          
          x = Math.cos(rot) * innerRadius
          y = Math.sin(rot) * innerRadius
          ctx.lineTo(x, y)
          rot += step
        }
        
        ctx.lineTo(0, -outerRadius)
        ctx.fillStyle = 'rgba(72, 149, 239, 0.4)'
        ctx.fill()
      },
      // Planet with ring
      () => {
        // Planet
        ctx.beginPath()
        ctx.arc(0, 0, size/2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(114, 9, 183, 0.3)'
        ctx.fill()
        
        // Ring
        ctx.beginPath()
        ctx.ellipse(0, 0, size, size/3, 0, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(247, 37, 133, 0.4)'
        ctx.lineWidth = 2
        ctx.stroke()
      },
      // Galaxy spiral
      () => {
        ctx.beginPath()
        for (let i = 0; i < 100; i++) {
          const angle = 0.1 * i
          const radius = 2 * size * (i / 100)
          const x = radius * Math.cos(angle)
          const y = radius * Math.sin(angle)
          
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.strokeStyle = 'rgba(76, 201, 240, 0.3)'
        ctx.lineWidth = 2
        ctx.stroke()
      }
    ]
    
    shapes[shape % shapes.length]()
  }
  
  const drawFantasyRune = (ctx: CanvasRenderingContext2D, size: number, shape: number) => {
    const shapes = [
      // Magical circle
      () => {
        ctx.beginPath()
        ctx.arc(0, 0, size, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(224, 170, 255, 0.4)'
        ctx.lineWidth = 2
        ctx.stroke()
        
        // Inner circle
        ctx.beginPath()
        ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(157, 78, 221, 0.4)'
        ctx.stroke()
        
        // Cross lines
        ctx.beginPath()
        ctx.moveTo(-size, 0)
        ctx.lineTo(size, 0)
        ctx.moveTo(0, -size)
        ctx.lineTo(0, size)
        ctx.strokeStyle = 'rgba(199, 125, 255, 0.3)'
        ctx.stroke()
      },
      // Arcane symbol
      () => {
        // Triangle
        ctx.beginPath()
        ctx.moveTo(0, -size)
        ctx.lineTo(-size, size)
        ctx.lineTo(size, size)
        ctx.closePath()
        ctx.strokeStyle = 'rgba(255, 153, 200, 0.4)'
        ctx.lineWidth = 2
        ctx.stroke()
        
        // Eye in center
        ctx.beginPath()
        ctx.ellipse(0, 0, size/3, size/4, 0, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(157, 78, 221, 0.3)'
        ctx.fill()
      },
      // Rune letters
      () => {
        // F-like rune (Ansuz)
        ctx.beginPath()
        ctx.moveTo(-size/2, -size)
        ctx.lineTo(-size/2, size)
        ctx.moveTo(-size/2, -size/2)
        ctx.lineTo(size/2, -size/2)
        ctx.moveTo(-size/2, 0)
        ctx.lineTo(size/3, 0)
        ctx.strokeStyle = 'rgba(252, 246, 189, 0.4)'
        ctx.lineWidth = 3
        ctx.stroke()
      }
    ]
    
    shapes[shape % shapes.length]()
  }
  
  const drawHorrorRune = (ctx: CanvasRenderingContext2D, size: number, shape: number) => {
    const shapes = [
      // Pentagram
      () => {
        const points = 5
        const outerRadius = size
        
        ctx.beginPath()
        for (let i = 0; i <= points * 2; i++) {
          const angle = (i * Math.PI) / points
          const radius = i % 2 === 0 ? outerRadius : outerRadius / 2
          
          const x = radius * Math.sin(angle)
          const y = -radius * Math.cos(angle)
          
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()
        ctx.strokeStyle = 'rgba(164, 19, 60, 0.5)'
        ctx.lineWidth = 2
        ctx.stroke()
      },
      // Skull silhouette
      () => {
        // Main skull
        ctx.beginPath()
        ctx.arc(0, 0, size/2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(26, 26, 26, 0.4)'
        ctx.fill()
        
        // Eyes
        ctx.beginPath()
        ctx.arc(-size/5, -size/8, size/8, 0, Math.PI * 2)
        ctx.arc(size/5, -size/8, size/8, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 89, 94, 0.5)'
        ctx.fill()
      },
      // Dripping blood
      () => {
        // Circle
        ctx.beginPath()
        ctx.arc(0, 0, size/2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(128, 15, 47, 0.4)'
        ctx.fill()
        
        // Drips
        ctx.beginPath()
        ctx.moveTo(-size/3, size/2)
        ctx.quadraticCurveTo(-size/3, size, -size/4, size)
        
        ctx.moveTo(0, size/2)
        ctx.quadraticCurveTo(0, size * 1.2, size/6, size * 1.2)
        
        ctx.moveTo(size/3, size/2)
        ctx.quadraticCurveTo(size/3, size * 0.8, size/2, size * 0.8)
        
        ctx.strokeStyle = 'rgba(164, 19, 60, 0.5)'
        ctx.lineWidth = 3
        ctx.stroke()
      }
    ]
    
    shapes[shape % shapes.length]()
  }
  
  const drawOceanRune = (ctx: CanvasRenderingContext2D, size: number, shape: number) => {
    const shapes = [
      // Wave
      () => {
        ctx.beginPath()
        ctx.moveTo(-size, 0)
        
        ctx.quadraticCurveTo(-size/2, -size/2, 0, 0)
        ctx.quadraticCurveTo(size/2, size/2, size, 0)
        
        ctx.strokeStyle = 'rgba(0, 180, 216, 0.4)'
        ctx.lineWidth = 3
        ctx.stroke()
      },
      // Bubble group
      () => {
        // Main bubble
        ctx.beginPath()
        ctx.arc(0, 0, size/2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(144, 224, 239, 0.3)'
        ctx.fill()
        ctx.strokeStyle = 'rgba(173, 232, 244, 0.5)'
        ctx.lineWidth = 1
        ctx.stroke()
        
        // Small bubbles
        ctx.beginPath()
        ctx.arc(size/2, -size/3, size/4, 0, Math.PI * 2)
        ctx.arc(-size/2, size/3, size/5, 0, Math.PI * 2)
        ctx.arc(size/4, size/2, size/6, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(202, 240, 248, 0.3)'
        ctx.fill()
      },
      // Fish outline
      () => {
        // Fish body
        ctx.beginPath()
        ctx.ellipse(0, 0, size, size/2, 0, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(72, 202, 228, 0.3)'
        ctx.fill()
        
        // Tail
        ctx.beginPath()
        ctx.moveTo(size, 0)
        ctx.lineTo(size * 1.5, -size/2)
        ctx.lineTo(size * 1.5, size/2)
        ctx.closePath()
        ctx.fillStyle = 'rgba(0, 180, 216, 0.3)'
        ctx.fill()
      }
    ]
    
    shapes[shape % shapes.length]()
  }
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    // Initialize canvas
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)
    
    // Draw loop for runes
    let animationFrameId: number
    
    // Should we add a new rune?
    const shouldAddRune = () => Math.random() < 0.1 // 10% chance per frame
    
    const addNewRune = () => {
      if (!genre) return
      
      runesRef.current.push({
        x: mousePosition.x,
        y: mousePosition.y,
        size: Math.random() * 20 + 10,
        opacity: 0.8,
        rotation: Math.random() * Math.PI * 2,
        shape: Math.floor(Math.random() * 3) // 3 shapes per genre
      })
    }
    
    const animate = () => {
      if (!ctx || !genre) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }
      
      // Fade effect
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Add a new rune?
      if (shouldAddRune() && mousePosition.x && mousePosition.y) {
        addNewRune()
      }
      
      // Update and draw all runes
      for (let i = 0; i < runesRef.current.length; i++) {
        const rune = runesRef.current[i]
        
        // Update rune
        rune.opacity -= 0.01
        
        // Remove if fully faded
        if (rune.opacity <= 0) {
          runesRef.current.splice(i, 1)
          i--
          continue
        }
        
        // Draw rune
        ctx.globalAlpha = rune.opacity
        drawGenreRune(ctx, rune.x, rune.y, rune.size, rune.rotation, rune.shape, genre)
      }
      
      // Reset global alpha
      ctx.globalAlpha = 1
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    // Start animation
    animate()
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [genre, mousePosition])
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-20"
      style={{ mixBlendMode: 'lighten' }}
    />
  )
}

export default Runes
