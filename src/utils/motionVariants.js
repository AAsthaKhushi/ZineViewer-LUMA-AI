/**
 * Common motion variants for framer-motion animations
 */

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.4 }
  }
}

export const slideUp = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: 'spring', 
      stiffness: 100,
      damping: 15
    }
  },
  exit: { 
    y: -30, 
    opacity: 0,
    transition: { duration: 0.4 }
  }
}

export const slideIn = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: 'spring',
      stiffness: 50,
      damping: 20
    }
  },
  exit: { 
    x: -100, 
    opacity: 0,
    transition: { duration: 0.3 }
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const cardHover = {
  rest: { 
    scale: 1,
    boxShadow: "0px 0px 0px rgba(0,0,0,0.2)"
  },
  hover: { 
    scale: 1.05,
    y: -5,
    boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
}

export const pageTransition = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
}
