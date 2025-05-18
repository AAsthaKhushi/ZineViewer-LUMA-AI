import React, { ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'rainbow'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) => {
  // Base styles
  let buttonClasses = 'font-medium transition-all duration-300 '
  
  // Size classes
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-5 text-base',
    lg: 'py-3 px-8 text-lg'
  }
  
  // Variant classes
  const variantClasses = {
    primary: 'rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white hover:shadow-lg hover:shadow-indigo-500/30',
    secondary: 'rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20',
    outline: 'rounded-full bg-transparent border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500/10',
    rainbow: 'button-85 text-white cursor-pointer relative z-0 rounded-lg'
  }
  
  buttonClasses += sizeClasses[size] + ' ' + variantClasses[variant] + ' ' + className
  
  // For rainbow variant, we need to apply the specific animation and styling
  if (variant === 'rainbow') {
    return (
      <motion.button
        className={buttonClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        <style jsx>{`
          .button-85:before {
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
            animation: glowing-button-85 20s linear infinite;
            transition: opacity 0.3s ease-in-out;
            border-radius: 10px;
          }
          
          @keyframes glowing-button-85 {
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
          
          .button-85:after {
            z-index: -1;
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            background: #222;
            left: 0;
            top: 0;
            border-radius: 10px;
          }
        `}</style>
        {children}
      </motion.button>
    )
  }
  
  // Default return for other variants
  return (
    <motion.button
      className={buttonClasses}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button