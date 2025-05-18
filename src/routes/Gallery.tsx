import { useEffect } from 'react'
import { motion } from 'framer-motion'
import GalleryComponent from '../components/Gallery'

const Gallery = () => {
  useEffect(() => {
    // Load Inter font
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen bg-[#050505]"
    >
      <GalleryComponent />
    </motion.div>
  )
}

export default Gallery
