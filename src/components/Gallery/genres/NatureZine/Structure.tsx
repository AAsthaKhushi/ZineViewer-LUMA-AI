import React, { useEffect, useRef } from 'react'
import { motion, MotionProps } from 'framer-motion'
import { runLeafAnimations } from './Animations'
import styles from './Styles.module.css'

interface StructureProps extends MotionProps {
  children: React.ReactNode
  className?: string
}

const Structure: React.FC<StructureProps> = ({ children, className, ...motionProps }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    let cleanup: (() => void) | undefined
    
    if (containerRef.current) {
      cleanup = runLeafAnimations(containerRef.current)
    }
    
    return () => {
      if (cleanup) cleanup()
    }
  }, [])
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      ref={containerRef}
      className={`${styles.container} ${className || ''}`}
      style={{ minHeight: '70vh' }}
      {...motionProps}
    >
      <div className={styles.natureZineContainer}>
        <div className={styles.vineTopLeft} aria-hidden="true" />
        <div className={styles.vineBottomRight} aria-hidden="true" />
        {/* Main content */}
        <div className="relative z-0 w-full h-full">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

export default Structure
