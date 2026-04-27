import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle'

const BASE = import.meta.env.BASE_URL

const LINKS = [
  { to: '/services', label: 'Services' },
  { to: '/about',    label: 'About'    },
  { to: '/contact',  label: 'Contact'  },
]

export default function Navbar({ onBookNow }) {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <motion.header
      initial={{ y: -56, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={[
        'fixed top-0 inset-x-0 z-40 transition-all duration-500',
        scrolled
          ? 'bg-warm-50/95 dark:bg-warm-900/95 backdrop-blur-md shadow-soft border-b border-warm-200/60 dark:border-warm-700/60'
          : 'bg-warm-50 dark:bg-warm-900',
      ].join(' ')}
    >
      <div className="wrap-lg">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 group"
          >
            <img
              src={`${BASE}images/Amys-logo.png`}
              alt=""
              className="h-8 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <span className="font-display text-lg font-medium text-warm-900 dark:text-warm-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              Beauty <em>by Amy</em>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => [
                  'px-4 py-2 rounded-full font-body text-sm transition-all duration-200',
                  isActive
                    ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30'
                    : 'text-warm-600 dark:text-warm-300 hover:text-warm-900 dark:hover:text-warm-100 hover:bg-warm-100 dark:hover:bg-warm-800',
                ].join(' ')}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <motion.button
              onClick={onBookNow}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden md:flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-full font-body text-sm font-medium transition-colors shadow-soft"
            >
              Book Now
            </motion.button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(p => !p)}
              aria-label="Toggle menu"
              className="md:hidden p-2 -mr-2 text-warm-700 dark:text-warm-200 hover:bg-warm-100 dark:hover:bg-warm-800 rounded-xl transition-colors"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-warm-200 dark:border-warm-700 bg-warm-50 dark:bg-warm-900"
          >
            <nav className="wrap-lg py-6 flex flex-col gap-1">
              {[{ to: '/', label: 'Home' }, ...LINKS].map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => [
                      'block px-4 py-3 rounded-xl font-body text-base transition-all',
                      isActive
                        ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/30'
                        : 'text-warm-700 dark:text-warm-200 hover:bg-warm-100 dark:hover:bg-warm-800',
                    ].join(' ')}
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}

              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={() => { setOpen(false); onBookNow() }}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3.5 rounded-full font-body text-sm font-medium transition-colors"
                >
                  Book an Appointment
                </button>
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="text-center font-body text-xs text-warm-400 hover:text-warm-600 dark:hover:text-warm-300 transition-colors py-2"
                >
                  Admin
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
