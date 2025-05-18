import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import LandingPage from '../components/LandingPage'

const Home = () => {
  const navigate = useNavigate()

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

  const handleExplore = () => {
    navigate('/gallery')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      <LandingPage onExplore={handleExplore} />
    </motion.div>
  )
}

export default Home
