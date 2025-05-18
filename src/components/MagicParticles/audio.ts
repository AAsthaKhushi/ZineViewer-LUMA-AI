import { Howl } from 'howler'
import { GenreType } from '../../contexts/GenreContext'

// Define sound paths
const SOUND_PATHS = {
  nature: '/assets/sounds/leaf-chime.mp3',
  cosmos: '/assets/sounds/cosmic-ping.mp3',
  fantasy: '/assets/sounds/magic-whoosh.mp3',
  horror: '/assets/sounds/dry-crackle.mp3',
  ocean: '/assets/sounds/bubble-pop.mp3',
}

// Cache for loaded sounds
const soundCache: Record<string, Howl> = {}

/**
 * Preloads sounds for specified genres
 * @param genres Array of genres to preload
 */
export const preloadSounds = (genres: GenreType[]) => {
  genres.forEach(genre => {
    if (genre && !soundCache[genre]) {
      soundCache[genre] = new Howl({
        src: [SOUND_PATHS[genre]],
        volume: 0.4,
        preload: true,
      })
    }
  })
}

/**
 * Plays sound effect for the specified genre
 * @param genre Current genre
 */
export const playGenreSound = (genre: GenreType) => {
  if (!genre) return
  
  if (!soundCache[genre]) {
    soundCache[genre] = new Howl({
      src: [SOUND_PATHS[genre]],
      volume: 0.4,
    })
  }
  
  soundCache[genre].play()
}

/**
 * Sets global volume for all sound effects
 * @param volume Volume level (0.0 - 1.0)
 */
export const setGlobalVolume = (volume: number) => {
  Howler.volume(volume)
}
