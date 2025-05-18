export interface Genre {
  id: string
  title: string
  description: string
  cover: string
  color: string
}

export const genreData: Genre[] = [
  {
    id: 'nature',
    title: 'Nature\'s Chronicle',
    description: 'Explore the beauty and wisdom of the natural world',
    cover: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: '#4caf50'
  },
  {
    id: 'cosmos',
    title: 'Cosmic Voyage',
    description: 'Journey through the wonders of space and time',
    cover: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: '#3f51b5'
  },
  {
    id: 'ocean',
    title: 'Deep Blue',
    description: 'Dive into the mysteries of the ocean depths',
    cover: 'https://i.pinimg.com/736x/85/f5/65/85f565cb89dcd4339552783d89264147.jpg',
    color: '#03a9f4'
  },
  {
    id: 'fantasy',
    title: 'Mythical Realms',
    description: 'Enter worlds of magic, myth, and wonder',
    cover: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    color: '#9c27b0'
  },
  {
    id: 'horror',
    title: 'Shadows & Whispers',
    description: 'Face your fears in these tales of the macabre',
    cover: 'https://i.pinimg.com/736x/eb/46/3d/eb463d0097073a0ff67e5b064387e082.jpg',
    color: '#f44336'
  }
]
