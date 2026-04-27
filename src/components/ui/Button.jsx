import { motion } from 'framer-motion'

const variants = {
  primary:   'bg-brand-600 hover:bg-brand-700 text-white shadow-soft hover:shadow-glow-sm',
  secondary: 'bg-brand-50 hover:bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:hover:bg-brand-900/50 dark:text-brand-300',
  outline:   'border border-warm-300 dark:border-warm-600 text-warm-700 dark:text-warm-200 hover:border-brand-400 hover:text-brand-600 dark:hover:border-brand-500 dark:hover:text-brand-400 bg-transparent',
  ghost:     'text-warm-700 dark:text-warm-300 hover:bg-warm-100 dark:hover:bg-warm-800 bg-transparent',
  white:     'bg-white text-warm-900 hover:bg-warm-100 shadow-soft border border-warm-200',
}

const sizes = {
  sm:  'px-5 py-2.5 text-xs rounded-full gap-2',
  md:  'px-6 py-3 text-sm rounded-full gap-2',
  lg:  'px-8 py-3.5 text-sm rounded-full gap-2.5',
  xl:  'px-10 py-4 text-base rounded-full gap-3',
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
      whileHover={{ scale: disabled ? 1 : 1.015 }}
      whileTap={{ scale: disabled ? 1 : 0.985 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={[
        'inline-flex items-center justify-center font-body font-medium tracking-wide',
        'transition-all duration-200 cursor-pointer select-none',
        'disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </motion.button>
  )
}
