import { Link } from 'react-router-dom'
import { Instagram, MapPin, Phone, Mail, Heart } from 'lucide-react'

const BASE = import.meta.env.BASE_URL

export default function Footer({ onBookNow }) {
  return (
    <footer className="bg-gray-50 dark:bg-[#0a0608] border-t border-gray-100 dark:border-white/10">
      <div className="container-xl section-padding py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={`${BASE}images/Amys-logo.png`} alt="Beauty by Amy" className="h-10 w-auto" />
              <span className="font-display text-xl text-gray-900 dark:text-white">
                Beauty <span className="text-brand-500">by Amy</span>
              </span>
            </Link>
            <p className="font-body text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Premium nail artistry and eyelash extensions. Crafted with care, delivered with love.
            </p>
            <a
              href="https://www.instagram.com/beautybyamy000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-500 transition-colors font-body text-sm"
            >
              <Instagram size={16} />
              @beautybyamy000
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-base font-medium text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/',         label: 'Home'     },
                { to: '/services', label: 'Services' },
                { to: '/about',    label: 'About Amy' },
                { to: '/contact',  label: 'Contact'  },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-body text-sm text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={onBookNow}
                  className="font-body text-sm text-brand-600 hover:text-brand-500 dark:text-brand-400 transition-colors"
                >
                  Book Now →
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-base font-medium text-gray-900 dark:text-white mb-4">Services</h3>
            <ul className="space-y-2">
              {['Acrylic Nails', 'Dipping Powder', 'Volume Lashes', 'Classic Lashes', 'Gift Certificates'].map(s => (
                <li key={s}>
                  <span className="font-body text-sm text-gray-500 dark:text-gray-400">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-base font-medium text-gray-900 dark:text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-brand-500 mt-0.5 shrink-0" />
                <span className="font-body text-sm text-gray-500 dark:text-gray-400">
                  13005 Lee Jackson Memorial Hwy, Fairfax, VA 22033
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-brand-500 shrink-0" />
                <a href="tel:+12028450968" className="font-body text-sm text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors">
                  (202) 845-0968
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-brand-500 shrink-0" />
                <a href="mailto:beautybyamy@gmail.com" className="font-body text-sm text-gray-500 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400 transition-colors">
                  beautybyamy@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-gray-400 dark:text-gray-500">
            © 2026 Beauty by Amy. Educational project — not a commercial site.
          </p>
          <p className="font-body text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
            Made with <Heart size={11} className="text-brand-400 fill-brand-400" /> as a portfolio project
          </p>
        </div>
      </div>
    </footer>
  )
}
