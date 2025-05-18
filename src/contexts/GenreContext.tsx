import { createContext, useContext, useState, ReactNode } from 'react'

export type GenreType = 'nature' | 'cosmos' | 'ocean' | 'fantasy' | 'horror' | null

interface GenreContextType {
  currentGenre: GenreType
  setCurrentGenre: (genre: GenreType) => void
}

const GenreContext = createContext<GenreContextType | undefined>(undefined)

export const useGenre = () => {
  const context = useContext(GenreContext)
  if (context === undefined) {
    throw new Error('useGenre must be used within a GenreProvider')
  }
  return context
}

interface GenreProviderProps {
  children: ReactNode
}

export const GenreProvider = ({ children }: GenreProviderProps) => {
  const [currentGenre, setCurrentGenre] = useState<GenreType>(null)

  return (
    <GenreContext.Provider value={{ currentGenre, setCurrentGenre }}>
      {children}
    </GenreContext.Provider>
  )
}
