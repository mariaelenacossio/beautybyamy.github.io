import { Link } from 'react-router-dom'
import { Instagram, MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const BASE = import.meta.env.BASE_URL

const NAV = [
  { to: '/',         label: 'Home'      },
  { to: '/services', label: 'Services'  },
  { to: '/about',    label: 'About Amy' },
  { to: '/contact',  label: 'Contact'   },
]

const SERVICES_LIST = [
  'Acrylic Fullset', 'Acrylic Refill', 'Dipping Powder',
  'Volume Lashes', 'Classic Lashes', 'Gift Certificates',
]

export default function Footer({ onBookNow }) {
  return (
    <footer className="border-t border-editorial/10 dark:border-white/8 bg-editorial dark:bg-[#080404]">

      {/* Top CTA row */}
      <div className="border-b border-white/10">
        <div className="container-xl section-padding py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-body text-[10px] tracking-widest uppercase text-white/40 mb-1">Ready?</p>
            <p className="font-editorial text-2xl sm:text-3xl tracking-wide uppercase text-white">
              Book your appointment today
            </p>
          </div>
          <motion.button
            onClick={onBookNow}
            whileHover={{ backgroundColor: '#A00024' }}
            whileTap={{ scale: 0.97 }}
            className="group shrink-0 flex items-center gap-3 bg-brand-600 text-white px-8 py-4 font-body text-xs font-medium tracking-widest uppercase transition-colors"
          >
            Book Now
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container-xl section-padding py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <img src={`${BASE}images/Amys-logo.png`} alt="Beauty by Amy" className="h-7 w-auto brightness-0 invert" />
              <span className="font-editorial text-xl tracking-widest uppercase text-white group-hover:text-brand-400 transition-colors">
                Beauty by Amy
              </span>
            </Link>
            <p className="font-body text-sm text-white/40 leading-relaxed mb-6">
              Premium nail artistry and eyelash extensions. Crafted with care, delivered with love — in Fairfax, Virginia.
            </p>
            <a
              href="https://www.instagram.com/beautybyamy000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 transition-colors font-body text-xs tracking-widest uppercase"
            >
              <Instagram size={14} />
              @beautybyamy000
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-body text-[10px] tracking-widest uppercase text-white/30 mb-5">Navigation</p>
            <ul className="space-y-3">
              {NAV.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-body text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={onBookNow}
                  className="font-body text-sm text-brand-400 hover:text-brand-300 transition-colors"
                >
                  Book Now →
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-body text-[10px] tracking-widest uppercase text-white/30 mb-5">Services</p>
            <ul className="space-y-3">
              {SERVICES_LIST.map(s => (
                <li key={s}>
                  <span className="font-body text-sm text-white/50">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-[10px] tracking-widest uppercase text-white/30 mb-5">Contact</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-brand-400 mt-0.5 shrink-0" />
                <span className="font-body text-sm text-white/50 leading-snug">
                  13005 Lee Jackson Memorial Hwy<br />Fairfax, VA 22033
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-brand-400 shrink-0" />
                <a href="tel:+12028450968" className="font-body text-sm text-white/50 hover:text-white transition-colors">
                  (202) 845-0968
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="text-brand-400 shrink-0" />
                <a href="mailto:beautybyamy@gmail.com" className="font-body text-sm text-white/50 hover:text-white transition-colors">
                  beautybyamy@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/25">
            © 2026 Beauty by Amy · Educational portfolio project
          </p>
          <p className="font-body text-xs text-white/25">
            Designed & built with passion
          </p>
        </div>
      </div>
    </footer>
  )
}
