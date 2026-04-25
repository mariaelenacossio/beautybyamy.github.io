import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle'

const BASE = import.meta.env.BASE_URL

const LEFT_LINKS  = [
  { to: '/services', label: 'Services' },
  { to: '/about',    label: 'About'    },
]
const RIGHT_LINKS = [
  { to: '/contact',  label: 'Contact'  },
]

const linkCls = (isActive) =>
  `font-body text-xs font-medium tracking-widest uppercase transition-colors duration-200 ${
    isActive
      ? 'text-brand-600 dark:text-brand-400'
      : 'text-editorial/60 hover:text-editorial dark:text-[#F0EBE8]/50 dark:hover:text-[#F0EBE8]'
  }`

export default function Navbar({ onBookNow }) {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/95 dark:bg-[#0D0808]/95 backdrop-blur-md border-b border-editorial/10 dark:border-white/8'
          : 'bg-cream dark:bg-[#0D0808]'
      }`}
    >
      {/* Main bar */}
      <div className="container-xl section-padding">
        <div className="flex items-center h-14 lg:h-16 gap-8">

          {/* Left nav — desktop */}
          <nav className="hidden lg:flex items-center gap-8 flex-1">
            {LEFT_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to} className={({ isActive }) => linkCls(isActive)}>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Center logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 mx-auto lg:mx-0 group shrink-0"
            onClick={() => setOpen(false)}
          >
            <img
              src={`${BASE}images/Amys-logo.png`}
              alt="Beauty by Amy"
              className="h-7 w-auto"
            />
            <span className="font-editorial text-xl tracking-widest uppercase text-editorial dark:text-[#F0EBE8] group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              Beauty by Amy
            </span>
          </Link>

          {/* Right nav — desktop */}
          <nav className="hidden lg:flex items-center gap-8 flex-1 justify-end">
            {RIGHT_LINKS.map(({ to, label }) => (
              <NavLink key={to} to={to} className={({ isActive }) => linkCls(isActive)}>
                {label}
              </NavLink>
            ))}
            <ThemeToggle />
            <motion.button
              onClick={onBookNow}
              whileHover={{ backgroundColor: '#A00024' }}
              whileTap={{ scale: 0.97 }}
              className="font-body text-xs font-medium tracking-widest uppercase bg-brand-600 text-white px-5 py-2.5 transition-colors duration-200"
            >
              Book Now
            </motion.button>
            <Link
              to="/admin"
              className="font-body text-[10px] tracking-widest uppercase text-editorial/30 hover:text-editorial/60 dark:text-white/20 dark:hover:text-white/50 transition-colors"
            >
              Admin
            </Link>
          </nav>

          {/* Mobile: right side */}
          <div className="flex lg:hidden items-center gap-4 ml-auto">
            <ThemeToggle />
            <button
              onClick={() => setOpen(p => !p)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="p-1 text-editorial dark:text-[#F0EBE8]"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Thin border line */}
      <div className="border-b border-editorial/8 dark:border-white/6" />

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-cream dark:bg-[#0D0808] border-b border-editorial/10 dark:border-white/8"
          >
            <nav className="section-padding py-8 flex flex-col gap-6">
              {[{ to: '/', label: 'Home' }, ...LEFT_LINKS, ...RIGHT_LINKS].map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `font-editorial text-4xl uppercase tracking-wide transition-colors ${
                        isActive ? 'text-brand-600' : 'text-editorial/80 dark:text-[#F0EBE8]/80 hover:text-brand-600'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4 flex flex-col gap-3"
              >
                <button
                  onClick={() => { setOpen(false); onBookNow() }}
                  className="w-full font-body text-sm font-medium tracking-widest uppercase bg-brand-600 text-white py-4 transition-colors hover:bg-brand-700"
                >
                  Book Appointment
                </button>
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="text-center font-body text-xs text-editorial/30 dark:text-white/25 hover:text-editorial/60 transition-colors py-2 tracking-widest uppercase"
                >
                  Admin
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
