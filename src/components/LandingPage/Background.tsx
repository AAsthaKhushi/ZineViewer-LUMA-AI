import { useRef, useEffect } from 'react'

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas dimensions to fill the screen
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initial size
    setCanvasSize()

    // Resize event
    window.addEventListener('resize', setCanvasSize)

    // Animation variables
    let stars: Star[] = []
    let magicDust: MagicDust[] = []
    let animationFrameId: number

    // Disney-themed color palette
    const disneyColors = {
      darkBlue: 'rgba(10, 20, 40, 0.8)',
      midnightBlue: 'rgba(15, 30, 60, 0.6)',
      purple: 'rgba(80, 30, 120, 0.4)',
      magenta: 'rgba(120, 20, 80, 0.3)',
      gold: 'rgba(220, 180, 80, 0.25)'
    }

    // Star class for twinkling background
    class Star {
      x: number
      y: number
      radius: number
      color: string
      twinkleSpeed: number
      opacity: number
      twinkleDirection: number
      
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 1.5 + 0.5
        this.color = this.getStarColor()
        this.twinkleSpeed = Math.random() * 0.03 + 0.01
        this.opacity = Math.random()
        this.twinkleDirection = Math.random() > 0.5 ? 1 : -1
      }
      
      getStarColor() {
        const colors = [
          'rgba(255, 255, 255, 0.8)',
          'rgba(220, 240, 255, 0.8)',
          'rgba(255, 240, 200, 0.8)',
          'rgba(220, 220, 255, 0.8)'
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }
      
      update() {
        // Twinkle effect
        this.opacity += this.twinkleSpeed * this.twinkleDirection
        
        if (this.opacity > 1) {
          this.opacity = 1
          this.twinkleDirection = -1
        } else if (this.opacity < 0.2) {
          this.opacity = 0.2
          this.twinkleDirection = 1
        }
      }
      
      draw() {
        if (!ctx) return
        
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        
        // Add glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 4
        )
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        
        ctx.globalAlpha = this.opacity * 0.3
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.restore()
      }
    }

    // Magic dust floating in the background
    class MagicDust {
      x: number
      y: number
      size: number
      color: string
      vx: number
      vy: number
      angle: number
      va: number
      opacity: number
      
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 100 + 50
        this.color = this.getMagicColor()
        this.vx = Math.random() * 0.3 - 0.15
        this.vy = Math.random() * 0.3 - 0.15
        this.angle = Math.random() * Math.PI * 2
        this.va = Math.random() * 0.002 - 0.001
        this.opacity = Math.random() * 0.07 + 0.03
      }
      
      getMagicColor() {
        const colors = [
          disneyColors.darkBlue,
          disneyColors.midnightBlue,
          disneyColors.purple,
          disneyColors.magenta,
          disneyColors.gold
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }
      
      update() {
        this.x += this.vx
        this.y += this.vy
        this.angle += this.va
        
        // Gentle wrap around edges
        if (this.x < -this.size) this.x = canvas.width + this.size
        if (this.x > canvas.width + this.size) this.x = -this.size
        if (this.y < -this.size) this.y = canvas.height + this.size
        if (this.y > canvas.height + this.size) this.y = -this.size
      }
      
      draw() {
        if (!ctx) return
        
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        
        // Draw a soft, layered blob
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()
        
        // Create a cloud-like shape with multiple overlapping circles
        for (let i = 0; i < 5; i++) {
          const offsetX = (Math.random() - 0.5) * this.size * 0.5
          const offsetY = (Math.random() - 0.5) * this.size * 0.5
          const radius = this.size * (0.5 + Math.random() * 0.5)
          ctx.moveTo(offsetX + radius, offsetY)
          ctx.arc(offsetX, offsetY, radius, 0, Math.PI * 2)
        }
        
        ctx.fill()
        ctx.restore()
      }
    }

    // Create stars
    for (let i = 0; i < 150; i++) {
      stars.push(new Star())
    }

    // Create magic dust
    for (let i = 0; i < 8; i++) {
      magicDust.push(new MagicDust())
    }

    // Draw castle silhouette
    const drawCastleSilhouette = () => {
      if (!ctx) return
      
      const castleWidth = canvas.width * 0.4
      const castleHeight = canvas.height * 0.3
      const baseX = canvas.width / 2 - castleWidth / 2
      const baseY = canvas.height - castleHeight * 0.8
      
      ctx.globalAlpha = 0.08
      ctx.fillStyle = 'rgba(20, 30, 70, 1)'
      
      // Draw the basic castle shape
      ctx.beginPath()
      
      // Main castle body
      ctx.moveTo(baseX, baseY + castleHeight * 0.5)
      ctx.lineTo(baseX, baseY)
      
      // Left towers and details
      ctx.lineTo(baseX + castleWidth * 0.2, baseY)
      ctx.lineTo(baseX + castleWidth * 0.2, baseY - castleHeight * 0.2)
      ctx.lineTo(baseX + castleWidth * 0.25, baseY - castleHeight * 0.2)
      ctx.lineTo(baseX + castleWidth * 0.25, baseY)
      
      // Central tower (tallest)
      ctx.lineTo(baseX + castleWidth * 0.4, baseY)
      ctx.lineTo(baseX + castleWidth * 0.4, baseY - castleHeight * 0.4)
      ctx.lineTo(baseX + castleWidth * 0.45, baseY - castleHeight * 0.5)
      ctx.lineTo(baseX + castleWidth * 0.5, baseY - castleHeight * 0.4)
      ctx.lineTo(baseX + castleWidth * 0.55, baseY - castleHeight * 0.5)
      ctx.lineTo(baseX + castleWidth * 0.6, baseY - castleHeight * 0.4)
      ctx.lineTo(baseX + castleWidth * 0.6, baseY)
      
      // Right towers and details
      ctx.lineTo(baseX + castleWidth * 0.75, baseY)
      ctx.lineTo(baseX + castleWidth * 0.75, baseY - castleHeight * 0.2)
      ctx.lineTo(baseX + castleWidth * 0.8, baseY - castleHeight * 0.2)
      ctx.lineTo(baseX + castleWidth * 0.8, baseY)
      ctx.lineTo(baseX + castleWidth, baseY)
      ctx.lineTo(baseX + castleWidth, baseY + castleHeight * 0.5)
      
      ctx.closePath()
      ctx.fill()
    }

    // Animation function
    const animate = () => {
      if (!ctx) return
      
      // Clear canvas with a dark blue background
      ctx.fillStyle = 'rgba(5, 10, 25, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw magic dust (background)
      magicDust.forEach(dust => {
        dust.update()
        dust.draw()
      })
      
      // Draw the castle silhouette
      drawCastleSilhouette()
      
      // Update and draw stars (foreground)
      stars.forEach(star => {
        star.update()
        star.draw()
      })
      
      animationFrameId = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  )
}

export default Background