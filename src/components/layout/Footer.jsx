import { Link } from 'react-router-dom'
import { Instagram, MapPin, Phone, Mail, Heart } from 'lucide-react'

const BASE = import.meta.env.BASE_URL

export default function Footer({ onBookNow }) {
  return (
    <footer className="bg-white dark:bg-warm-800 border-t border-warm-200 dark:border-warm-700">
      <div className="wrap-lg py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={`${BASE}images/Amys-logo.png`}
                alt="Beauty by Amy"
                className="h-8 w-auto opacity-70 group-hover:opacity-100 transition-opacity"
              />
              <span className="font-display text-lg font-medium text-warm-900 dark:text-warm-100">
                Beauty <em>by Amy</em>
              </span>
            </Link>
            <p className="font-body text-sm text-warm-500 dark:text-warm-400 leading-relaxed">
              Premium nail artistry and eyelash extensions, crafted with care — in Fairfax, Virginia.
            </p>
            <a
              href="https://www.instagram.com/beautybyamy000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
            >
              <Instagram size={14} /> @beautybyamy000
            </a>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-body text-xs font-medium tracking-widest uppercase text-warm-400 dark:text-warm-500 mb-4">Navigation</p>
            <ul className="space-y-2.5">
              {[
                { to: '/',         label: 'Home'      },
                { to: '/services', label: 'Services'  },
                { to: '/about',    label: 'About Amy' },
                { to: '/contact',  label: 'Contact'   },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-body text-sm text-warm-600 dark:text-warm-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={onBookNow}
                  className="font-body text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors font-medium"
                >
                  Book Now →
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-body text-xs font-medium tracking-widest uppercase text-warm-400 dark:text-warm-500 mb-4">Services</p>
            <ul className="space-y-2.5">
              {['Acrylic Nails', 'Dipping Powder', 'Volume Lashes', 'Classic Lashes', 'Gift Certificates'].map(s => (
                <li key={s}>
                  <span className="font-body text-sm text-warm-500 dark:text-warm-400">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-xs font-medium tracking-widest uppercase text-warm-400 dark:text-warm-500 mb-4">Contact</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-brand-400 mt-0.5 shrink-0" />
                <span className="font-body text-sm text-warm-500 dark:text-warm-400 leading-snug">
                  13005 Lee Jackson Memorial Hwy<br />Fairfax, VA 22033
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-brand-400 shrink-0" />
                <a href="tel:+12028450968" className="font-body text-sm text-warm-500 dark:text-warm-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  (202) 845-0968
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-brand-400 shrink-0" />
                <a href="mailto:beautybyamy@gmail.com" className="font-body text-sm text-warm-500 dark:text-warm-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  beautybyamy@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-warm-100 dark:border-warm-700 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-warm-400 dark:text-warm-500">
            © 2026 Beauty by Amy · Portfolio project
          </p>
          <p className="font-body text-xs text-warm-400 dark:text-warm-500 flex items-center gap-1">
            Made with <Heart size={11} className="text-brand-400 fill-brand-300" /> as a portfolio project
          </p>
        </div>
      </div>
    </footer>
  )
}
