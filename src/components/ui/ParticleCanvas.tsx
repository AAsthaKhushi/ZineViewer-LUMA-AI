import { useRef, useEffect } from 'react'

interface ParticleCanvasProps {
  color?: string
  count?: number
  speed?: number
  className?: string
}

const ParticleCanvas = ({
  color = 'rgba(255, 255, 255, 0.5)',
  count = 50,
  speed = 1,
  className = ''
}: ParticleCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    
    // Initial size
    setCanvasSize()
    
    // Resize listener
    window.addEventListener('resize', setCanvasSize)
    
    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * speed
        this.speedY = (Math.random() - 0.5) * speed
      }
      
      update() {
        this.x += this.speedX
        this.y += this.speedY
        
        // Wrap around edges
        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }
      
      draw() {
        if (!ctx) return
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    
    // Create particles
    const particles: Particle[] = []
    for (let i = 0; i < count; i++) {
      particles.push(new Particle())
    }
    
    // Animation function
    let animationFrameId: number
    
    const animate = () => {
      if (!ctx) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      
      // Connect particles with lines when close enough
      const connectParticles = () => {
        const maxDistance = 100
        
        for (let i = 0; i < particles.length; i++) {
          for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < maxDistance) {
              // Draw a line between them with opacity based on distance
              const opacity = 1 - (distance / maxDistance)
              ctx.strokeStyle = color.replace('0.5', `${opacity * 0.5}`)
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.stroke()
            }
          }
        }
      }
      
      connectParticles()
      animationFrameId = requestAnimationFrame(animate)
    }
    
    // Start animation
    animate()
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [color, count, speed])
  
  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  )
}

export default ParticleCanvas
