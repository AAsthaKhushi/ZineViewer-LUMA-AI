import { useRef, useEffect, useState } from 'react'

interface SparkleTrailProps {
  mousePosition: { x: number; y: number }
}

const SparkleTrail = ({ mousePosition }: SparkleTrailProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [clicks, setClicks] = useState<{x: number, y: number, time: number}[]>([])
  
  // Track mouse clicks and movement
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      setClicks(prev => [...prev, {x: e.clientX, y: e.clientY, time: Date.now()}])
    }
    
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions to window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    // Initial size
    setCanvasSize()
    
    // Resize listener
    window.addEventListener('resize', setCanvasSize)
    
    // Particle storage
    let particles: Particle[] = []
    let trailPoints: TrailPoint[] = []
    let animationFrameId: number
    
    // Trail point class to create smooth flowing path
    class TrailPoint {
      x: number
      y: number
      age: number
      maxAge: number
      
      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.maxAge = 20 // Reduced from 45 for faster fading
        this.age = 0
      }
      
      update() {
        this.age++
      }
      
      getOpacity() {
        // Fade out as age increases
        return Math.max(0, 1 - this.age / this.maxAge)
      }
    }
    
    // Gentle particle class for trailing effect
    class Particle {
      x: number
      y: number
      size: number
      color: string
      life: number
      maxLife: number
      vx: number
      vy: number
      fromClick: boolean
      
      constructor(x: number, y: number, fromClick: boolean = false) {
        this.x = x + (Math.random() - 0.5) * 8 // Reduced spread for tighter trail
        this.y = y + (Math.random() - 0.5) * 8
        this.size = Math.random() * 2 + 0.5 // Smaller particles
        
        // Softer, more calming colors
        this.color = this.getRandomColor(fromClick)
        
        // Even shorter lifespan for better responsiveness
        this.maxLife = Math.random() * 20 + 10
        this.life = this.maxLife
        
        if (fromClick) {
          // Gentle ripple effect for clicks
          const angle = Math.random() * Math.PI * 2
          const speed = Math.random() * 1.5 + 0.5 // Slower expansion
          this.vx = Math.cos(angle) * speed
          this.vy = Math.sin(angle) * speed
        } else {
          // Very minimal movement for trail particles so they stay close to cursor path
          this.vx = (Math.random() - 0.5) * 0.3
          this.vy = (Math.random() - 0.5) * 0.3
        }
        
        this.fromClick = fromClick
      }
      
      getRandomColor(fromClick: boolean) {
        // Peaceful, calming colors
        const trailColors = [
          'rgba(170, 200, 255, 0.7)', // Soft blue
          'rgba(190, 220, 255, 0.7)', // Lighter blue
          'rgba(210, 230, 255, 0.7)', // Very light blue
          'rgba(220, 240, 255, 0.7)', // Almost white blue
          'rgba(230, 240, 255, 0.7)'  // Whiter blue
        ]
        
        const clickColors = [
          'rgba(190, 220, 255, 0.8)', // Soft blue
          'rgba(180, 210, 250, 0.8)', // Slightly more vibrant blue
          'rgba(210, 230, 255, 0.8)', // Light blue
          'rgba(220, 235, 255, 0.8)', // Very light blue
          'rgba(255, 255, 255, 0.8)'  // White
        ]
        
        const colors = fromClick ? clickColors : trailColors
        return colors[Math.floor(Math.random() * colors.length)]
      }
      
      update() {
        this.x += this.vx
        this.y += this.vy
        
        // Very subtle movement
        if (this.fromClick) {
          this.vx *= 0.97
          this.vy *= 0.97
        } else {
          this.vx *= 0.98
          this.vy *= 0.98
        }
        
        this.life--
      }
      
      draw() {
        if (!ctx) return
        
        const opacity = this.life / this.maxLife
        ctx.globalAlpha = opacity
        ctx.fillStyle = this.color
        
        // Simple circle for gentle effect
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    
    // Animation function
    const animate = () => {
      if (!ctx) return
      
      // Clear with fade effect - using dark blue for peaceful night-like feel
      ctx.fillStyle = 'rgba(5, 10, 20, 0.4)' // Even faster fade rate for responsiveness
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Add current position to trail
      if (mousePosition.x > 0 && mousePosition.y > 0) {
        // Always add the current position to ensure the trail keeps up
        trailPoints.push(new TrailPoint(mousePosition.x, mousePosition.y))
        
        // Create particles along the trail - reduced randomness for more consistency
        if (Math.random() > 0.3) { // Increased particle creation rate
          particles.push(new Particle(mousePosition.x, mousePosition.y))
        }
      }
      
      // Process clicks with gentler effect
      clicks.forEach((click, index) => {
        const age = Date.now() - click.time
        
        // Create gentle ripple effect when click is fresh
        if (age < 50) {
          // Create fewer particles for softer effect
          for (let i = 0; i < 12; i++) {
            particles.push(new Particle(click.x, click.y, true))
          }
        }
        
        // Remove old clicks
        if (age > 1000) {
          setClicks(prev => prev.filter((_, i) => i !== index))
        }
      })
      
      // Update and remove old trail points
      trailPoints.forEach((point, index) => {
        point.update()
        if (point.age > point.maxAge) {
          trailPoints.splice(index, 1)
        }
      })
      
      // Draw smooth flowing trail if we have points
      if (trailPoints.length > 1) { // Reduced from 2 for quicker trail rendering
        // Draw the trail as a smooth curved path
        ctx.beginPath()
        ctx.moveTo(trailPoints[0].x, trailPoints[0].y)
        
        // Use quadratic curves for smooth path
        for (let i = 0; i < trailPoints.length - 1; i++) {
          // Add interpolation to create smoother curves
          const xc = (trailPoints[i].x + trailPoints[i+1].x) / 2
          const yc = (trailPoints[i].y + trailPoints[i+1].y) / 2
          ctx.quadraticCurveTo(trailPoints[i].x, trailPoints[i].y, xc, yc)
        }
        
        // Finish the curve to the current position
        if (trailPoints.length > 1) {
          const lastPoint = trailPoints[trailPoints.length - 1]
          ctx.lineTo(lastPoint.x, lastPoint.y)
        }
        
        // Create a soft gradient for the trail
        const gradient = ctx.createLinearGradient(
          trailPoints[0].x, trailPoints[0].y,
          trailPoints[trailPoints.length - 1].x, trailPoints[trailPoints.length - 1].y
        )
        gradient.addColorStop(0, 'rgba(180, 210, 255, 0)')
        gradient.addColorStop(0.5, 'rgba(200, 225, 255, 0.3)')
        gradient.addColorStop(1, 'rgba(220, 235, 255, 0.6)') // Increased opacity for better visibility
        
        ctx.strokeStyle = gradient
        ctx.lineWidth = 4
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.stroke()
        
        // Soft glow effect
        ctx.shadowColor = 'rgba(200, 220, 255, 0.6)'
        ctx.shadowBlur = 10
        ctx.lineWidth = 2
        ctx.strokeStyle = 'rgba(220, 235, 255, 0.5)'
        ctx.stroke()
        ctx.shadowBlur = 0
      }
      
      // Update and draw particles
      particles.forEach((particle, index) => {
        particle.update()
        particle.draw()
        
        // Remove dead particles
        if (particle.life <= 0) {
          particles.splice(index, 1)
        }
      })
      
      // Gentle cursor glow that stays with cursor
      if (mousePosition.x > 0 && mousePosition.y > 0) {
        ctx.save()
        
        // Soft glow effect at cursor
        const glow = ctx.createRadialGradient(
          mousePosition.x, mousePosition.y, 0,
          mousePosition.x, mousePosition.y, 12
        )
        glow.addColorStop(0, 'rgba(220, 235, 255, 0.8)')
        glow.addColorStop(0.5, 'rgba(200, 225, 255, 0.4)')
        glow.addColorStop(1, 'rgba(180, 210, 255, 0)')
        
        ctx.globalAlpha = 0.7
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(mousePosition.x, mousePosition.y, 12, 0, Math.PI * 2)
        ctx.fill()
        
        // Small bright core
        ctx.globalAlpha = 0.9
        ctx.fillStyle = 'rgba(230, 240, 255, 0.9)'
        ctx.beginPath()
        ctx.arc(mousePosition.x, mousePosition.y, 3, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.restore()
      }
      
      // Keep a smaller number of trail points for better performance and responsiveness
      if (trailPoints.length > 20) { // Reduced from 40 for faster trail response
        trailPoints.splice(0, trailPoints.length - 20)
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
  }, [mousePosition, clicks])
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
    />
  )
}

export default SparkleTrail