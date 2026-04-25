import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const variants = {
  primary:   'bg-brand-600 hover:bg-brand-700 text-white border border-brand-600 hover:border-brand-700',
  secondary: 'bg-transparent hover:bg-brand-600 text-brand-600 hover:text-white border border-brand-600',
  outline:   'bg-transparent hover:bg-editorial text-editorial hover:text-white border border-editorial dark:text-[#F0EBE8] dark:border-[#F0EBE8]/30 dark:hover:bg-[#F0EBE8] dark:hover:text-editorial dark:hover:border-[#F0EBE8]',
  ghost:     'bg-transparent text-brand-600 hover:text-brand-700 border border-transparent',
  white:     'bg-white text-editorial hover:bg-cream border border-white',
  cream:     'bg-cream text-editorial hover:bg-warm-white border border-cream',
}

const sizes = {
  sm:  'px-5 py-2.5 text-xs',
  md:  'px-7 py-3.5 text-sm',
  lg:  'px-9 py-4 text-sm',
  xl:  'px-11 py-5 text-base',
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
  arrow = false,
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.015 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      className={[
        'group inline-flex items-center justify-center gap-2.5 font-body font-medium tracking-wide',
        'transition-all duration-200 cursor-pointer select-none',
        'disabled:opacity-40 disabled:cursor-not-allowed',
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
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
      {arrow && (
        <motion.span
          className="shrink-0 inline-flex"
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
        </motion.span>
      )}
    </motion.button>
  )
}
