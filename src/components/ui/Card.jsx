import { motion } from 'framer-motion'

export default function Card({
  children,
  className = '',
  hover = true,
  glass = false,
  onClick,
  padding = true,
}) {
  const base = glass
    ? 'bg-white/80 dark:bg-white/5 backdrop-blur-md border border-white/30 dark:border-white/10'
    : 'bg-white dark:bg-[#1a1012] border border-gray-100 dark:border-white/10'

  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px rgba(201,24,74,0.12)' } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`rounded-2xl shadow-sm ${base} ${padding ? 'p-6' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  )
}
