import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggle } = useTheme()

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 ${
        isDark ? 'bg-brand-600' : 'bg-brand-200'
      } ${className}`}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center ${
          isDark ? 'left-6' : 'left-0.5'
        }`}
      >
        {isDark
          ? <Moon size={11} className="text-brand-600" />
          : <Sun size={11} className="text-brand-400" />
        }
      </motion.span>
    </motion.button>
  )
}
