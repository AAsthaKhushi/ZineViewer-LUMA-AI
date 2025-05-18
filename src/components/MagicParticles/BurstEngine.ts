import { GenreType } from '../../contexts/GenreContext'
import Particle from './SparkleTrail'

interface BurstEngineProps {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  particles: Particle[]
}

class BurstEngine {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  particles: Particle[]
  
  constructor({ canvas, ctx, particles }: BurstEngineProps) {
    this.canvas = canvas
    this.ctx = ctx
    this.particles = particles
  }
  
  createBurst(x: number, y: number, genre: GenreType) {
    const particleCount = this.getGenreParticleCount(genre)
    const colors = this.getGenreColors(genre)
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 2 + 1
      
      const vx = Math.cos(angle) * speed
      const vy = Math.sin(angle) * speed
      
      const color = colors[Math.floor(Math.random() * colors.length)]
      const size = Math.random() * 3 + 1
      const life = Math.random() * 40 + 40
      
      this.particles.push(
        new Particle({
          x,
          y,
          size,
          color,
          life,
          maxLife: life,
          vx,
          vy,
          opacity: 0.8,
          genre
        })
      )
    }
  }
  
  private getGenreParticleCount(genre: GenreType): number {
    switch(genre) {
      case 'nature': return 30
      case 'cosmos': return 40
      case 'fantasy': return 35
      case 'horror': return 25
      case 'ocean': return 20
      default: return 30
    }
  }
  
  private getGenreColors(genre: GenreType): string[] {
    switch(genre) {
      case 'nature':
        return [
          '#76c893', '#52b69a', '#99d98c', '#d9ed92', '#fcbf49'
        ]
      case 'cosmos':
        return [
          '#4895ef', '#4cc9f0', '#7209b7', '#f72585', '#ffffff'
        ]
      case 'fantasy':
        return [
          '#9d4edd', '#c77dff', '#e0aaff', '#ff99c8', '#fcf6bd'
        ]
      case 'horror':
        return [
          '#590d22', '#800f2f', '#a4133c', '#ff595e', '#1a1a1a'
        ]
      case 'ocean':
        return [
          '#00b4d8', '#48cae4', '#90e0ef', '#ade8f4', '#caf0f8'
        ]
      default:
        return ['#ffffff', '#eeeeee', '#dddddd']
    }
  }
}

export default BurstEngine
