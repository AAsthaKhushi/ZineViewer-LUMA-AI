import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  label?: string
  onClick?: () => void
  variant?: 'default' | 'primary' | 'outline' | 'rainbow'
  size?: 'sm' | 'md' | 'lg'
  iconSize?: number
  className?: string
}

const BackButton: React.FC<BackButtonProps> = ({
  label = 'Back',
  onClick,
  variant = 'default',
  size = 'sm',
  iconSize = 16,
  className = ''
}) => {
  // Base styles
  let buttonClasses = 'flex items-center gap-2 font-medium transition-all duration-300 '
  
  // Size classes
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-2 px-5 text-lg'
  }
  
  // Variant classes
  const variantClasses = {
    default: 'popout-effect bg-white/10 backdrop-blur-sm text-white rounded-md hover:bg-white/20',
    primary: 'rounded-md bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:shadow-lg hover:shadow-indigo-500/30',
    outline: 'rounded-md bg-transparent border border-indigo-500 text-indigo-500 hover:bg-indigo-500/10',
    rainbow: 'button-rainbow text-white cursor-pointer relative z-0 rounded-md'
  }
  
  buttonClasses += sizeClasses[size] + ' ' + variantClasses[variant] + ' ' + className
  
  // For popout effect (default variant)
  if (variant === 'default') {
    return (
      <motion.button
        className={buttonClasses}
        onClick={onClick}
        whileHover={{ scale: 1.05, x: -3 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={iconSize} />
        {label}
      </motion.button>
    )
  }
  
  // For rainbow variant
  if (variant === 'rainbow') {
    return (
      <motion.button
        className={buttonClasses}
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <style jsx>{`
          .button-rainbow:before {
            content: "";
            background: linear-gradient(
              45deg,
              #ff0000,
              #ff7300,
              #fffb00,
              #48ff00,
              #00ffd5,
              #002bff,
              #7a00ff,
              #ff00c8,
              #ff0000
            );
            position: absolute;
            top: -2px;
            left: -2px;
            background-size: 400%;
            z-index: -1;
            filter: blur(5px);
            width: calc(100% + 4px);
            height: calc(100% + 4px);
            animation: glowing-button 20s linear infinite;
            transition: opacity 0.3s ease-in-out;
            border-radius: 6px;
          }
          
          @keyframes glowing-button {
            0% {
              background-position: 0 0;
            }
            50% {
              background-position: 400% 0;
            }
            100% {
              background-position: 0 0;
            }
          }
          
          .button-rainbow:after {
            z-index: -1;
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background: #222;
            left: 0;
            top: 0;
            border-radius: 6px;
          }
        `}</style>
        <ArrowLeft size={iconSize} />
        {label}
      </motion.button>
    )
  }
  
  // For other variants
  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowLeft size={iconSize} />
      {label}
    </motion.button>
  )
}

export { BackButton }
export default BackButton
