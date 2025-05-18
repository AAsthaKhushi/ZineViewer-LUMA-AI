import { GenreType } from '../../contexts/GenreContext'

interface ParticleProps {
  x: number
  y: number
  size: number
  color: string
  life: number
  maxLife: number
  vx: number
  vy: number
  opacity: number
  genre: GenreType
}

class Particle {
  x: number
  y: number
  size: number
  color: string
  life: number
  maxLife: number
  vx: number
  vy: number
  opacity: number
  genre: GenreType
  
  constructor({ x, y, size, color, life, maxLife, vx, vy, opacity, genre }: ParticleProps) {
    this.x = x
    this.y = y
    this.size = size
    this.color = color
    this.life = life
    this.maxLife = maxLife
    this.vx = vx
    this.vy = vy
    this.opacity = opacity
    this.genre = genre
  }
  
  update() {
    this.x += this.vx
    this.y += this.vy
    this.life--
    this.opacity = (this.life / this.maxLife) * 0.8
    
    // Add genre-specific behavior
    if (this.genre === 'nature') {
      // Gentle floating motion
      this.vy -= 0.01
      this.vx += Math.sin(this.life * 0.1) * 0.02
    } else if (this.genre === 'cosmos') {
      // Subtle twinkling
      this.size *= (0.995 + Math.sin(this.life * 0.2) * 0.01)
    } else if (this.genre === 'horror') {
      // Smoky dissipation
      this.size *= 1.01
      this.opacity *= 0.98
    } else if (this.genre === 'fantasy') {
      // Magical spiral
      const angle = this.life * 0.05
      this.vx += Math.cos(angle) * 0.01
      this.vy += Math.sin(angle) * 0.01
    } else if (this.genre === 'ocean') {
      // Bubble float
      this.vy -= 0.03
      this.vx += Math.sin(this.life * 0.08) * 0.03
    }
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.opacity
    
    // Different drawing methods per genre
    if (this.genre === 'nature') {
      // Soft, rounded particles
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.fill()
    } else if (this.genre === 'cosmos') {
      // Star-like particles
      this.drawStar(ctx)
    } else if (this.genre === 'horror') {
      // Smoky, irregular particles
      this.drawSmoke(ctx)
    } else if (this.genre === 'fantasy') {
      // Glowing magical particles
      this.drawGlow(ctx)
    } else if (this.genre === 'ocean') {
      // Bubble-like particles
      this.drawBubble(ctx)
    } else {
      // Default
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.fill()
    }
    
    ctx.globalAlpha = 1
  }
  
  private drawStar(ctx: CanvasRenderingContext2D) {
    const spikes = 5
    const outerRadius = this.size
    const innerRadius = this.size / 2
    
    let rot = Math.PI / 2 * 3
    let x = this.x
    let y = this.y
    let step = Math.PI / spikes
    
    ctx.beginPath()
    ctx.moveTo(x, y - outerRadius)
    
    for (let i = 0; i < spikes; i++) {
      x = this.x + Math.cos(rot) * outerRadius
      y = this.y + Math.sin(rot) * outerRadius
      ctx.lineTo(x, y)
      rot += step
      
      x = this.x + Math.cos(rot) * innerRadius
      y = this.y + Math.sin(rot) * innerRadius
      ctx.lineTo(x, y)
      rot += step
    }
    
    ctx.lineTo(this.x, this.y - outerRadius)
    ctx.closePath()
    ctx.fillStyle = this.color
    ctx.fill()
  }
  
  private drawSmoke(ctx: CanvasRenderingContext2D) {
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size
    )
    gradient.addColorStop(0, this.color)
    gradient.addColorStop(1, 'rgba(30, 30, 30, 0)')
    
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()
  }
  
  private drawGlow(ctx: CanvasRenderingContext2D) {
    // Inner glow
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size * 1.5
    )
    gradient.addColorStop(0, this.color)
    gradient.addColorStop(1, 'rgba(70, 0, 255, 0)')
    
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()
    
    // Core
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
    ctx.fill()
  }
  
  private drawBubble(ctx: CanvasRenderingContext2D) {
    // Main bubble
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(120, 220, 255, ${this.opacity * 0.3})`
    ctx.fill()
    
    // Rim
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`
    ctx.lineWidth = 1
    ctx.stroke()
    
    // Highlight
    ctx.beginPath()
    ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.2, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.7})`
    ctx.fill()
  }
}

export default Particle
