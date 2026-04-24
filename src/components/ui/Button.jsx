import { motion } from 'framer-motion'

const variants = {
  primary:   'bg-brand-600 hover:bg-brand-700 text-white shadow-md hover:shadow-glow',
  secondary: 'bg-brand-100 hover:bg-brand-200 text-brand-800 dark:bg-brand-900/40 dark:hover:bg-brand-800/60 dark:text-brand-200',
  outline:   'border-2 border-brand-400 text-brand-600 hover:bg-brand-50 dark:text-brand-300 dark:border-brand-500 dark:hover:bg-brand-900/30',
  ghost:     'text-brand-600 hover:bg-brand-50 dark:text-brand-300 dark:hover:bg-brand-900/30',
  white:     'bg-white text-brand-700 hover:bg-brand-50 shadow-md',
}

const sizes = {
  sm:  'px-4 py-2 text-sm',
  md:  'px-6 py-3 text-base',
  lg:  'px-8 py-4 text-lg',
  xl:  'px-10 py-5 text-xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  onClick,
  fullWidth = false,
  loading = false,
  icon,
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={[
        'inline-flex items-center justify-center gap-2 font-body font-medium rounded-full',
        'transition-all duration-200 cursor-pointer select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : icon ? (
        <span>{icon}</span>
      ) : null}
      {children}
    </motion.button>
  )
}
