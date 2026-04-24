import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Calendar } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle'
import Button from '../ui/Button'

const BASE = import.meta.env.BASE_URL

const NAV_LINKS = [
  { to: '/',         label: 'Home'     },
  { to: '/services', label: 'Services' },
  { to: '/about',    label: 'About'    },
  { to: '/contact',  label: 'Contact'  },
]

export default function Navbar({ onBookNow }) {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#0f0a0b]/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container-xl section-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
            <img
              src={`${BASE}images/Amys-logo.png`}
              alt="Beauty by Amy"
              className="h-10 w-auto transition-transform duration-200 group-hover:scale-105"
            />
            <span className="font-display text-xl font-medium text-gray-900 dark:text-white">
              Beauty <span className="text-brand-500">by Amy</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300'
                      : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50 dark:text-gray-300 dark:hover:text-brand-300 dark:hover:bg-brand-900/20'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Button size="sm" onClick={onBookNow} icon={<Calendar size={15} />}>
              Book Now
            </Button>
            <Link
              to="/admin"
              className="text-xs font-body text-gray-400 hover:text-brand-500 dark:text-gray-500 dark:hover:text-brand-400 transition-colors"
            >
              Admin
            </Link>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setOpen(prev => !prev)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
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
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white dark:bg-[#0f0a0b] border-t border-gray-100 dark:border-white/10"
          >
            <nav className="section-padding py-4 flex flex-col gap-1">
              {NAV_LINKS.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl font-body text-base font-medium transition-all ${
                        isActive
                          ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300'
                          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-white/5'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="pt-3 flex flex-col gap-2">
                <Button
                  fullWidth
                  onClick={() => { setOpen(false); onBookNow() }}
                  icon={<Calendar size={16} />}
                >
                  Book Appointment
                </Button>
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="text-center text-sm font-body text-gray-400 hover:text-brand-500 transition-colors py-2"
                >
                  Admin Dashboard
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
