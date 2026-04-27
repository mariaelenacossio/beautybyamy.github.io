import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Check, Instagram } from 'lucide-react'
import BookingModal from '../components/booking/BookingModal'

const BASE = import.meta.env.BASE_URL

function Reveal({ children, className = '', delay = 0 }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-72px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const SERVICES_DATA = [
  {
    title: 'Nail Care',
    description: 'Precision-crafted nails using premium products for a flawless, long-lasting finish. From intricate designs to clean classics.',
    img: `${BASE}images/Nails-1.png`,
    instagramLink: 'https://www.instagram.com/p/CTkdAn7nCN6/',
    items: [
      { name: 'Acrylic Fullset',         price: 80,  duration: '90 min', popular: true  },
      { name: 'Acrylic Refill',           price: 65,  duration: '60 min', popular: false },
      { name: 'Dipping Powder',           price: 75,  duration: '75 min', popular: true  },
      { name: 'Dipping Powder Refill',    price: 55,  duration: '60 min', popular: false },
    ],
  },
  {
    title: 'Eyelash Extensions',
    description: 'Handcrafted lash sets that open your eyes and elevate your entire look — from natural classics to dramatic volumes.',
    img: `${BASE}images/allef-vinicius-v75vjSfgLDc-unsplash.jpg`,
    instagramLink: 'https://www.instagram.com/p/CTadPXfvTgA/',
    items: [
      { name: 'Volume Eyelash Set',  price: 300, duration: '2.5 hr', popular: true  },
      { name: 'Volume Refill',       price: 175, duration: '90 min', popular: false },
      { name: 'Classic Eyelashes',   price: 275, duration: '2 hr',   popular: true  },
      { name: 'Classic Refill',      price: 155, duration: '60 min', popular: false },
    ],
  },
  {
    title: 'Gift Certificates',
    description: 'Treat someone you love to a luxurious beauty experience. Redeemable for any service — the gift that never misses.',
    img: `${BASE}images/Nails-3.png`,
    instagramLink: 'https://www.instagram.com/p/CO0JQBosF9i/',
    items: [
      { name: 'Nails + Manicure',           price: 100,  duration: null, popular: false },
      { name: 'Classic Eyelashes Set',       price: 250,  duration: null, popular: false },
      { name: 'Nails + Eyelashes Combo',     price: 400,  duration: null, popular: true  },
      { name: 'Custom Amount',               price: null, duration: null, popular: false, priceLabel: 'Min $65' },
    ],
  },
]

const GALLERY = [
  `${BASE}images/Nails-1.png`,
  `${BASE}images/Nails-2.png`,
  `${BASE}images/Nails-3.png`,
  `${BASE}images/Nails-4.png`,
  `${BASE}images/Nails-5.png`,
  `${BASE}images/img-1.png`,
]

const INCLUDES = [
  'Sanitized tools for every appointment',
  'Premium product brands only',
  'Personalised nail consultation',
  'Touch-up guarantee policy',
  'Relaxed, welcoming environment',
]

export default function Services() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-warm-50 dark:bg-warm-900">
        <div className="wrap text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="label mb-4">Menu & Pricing</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal text-warm-900 dark:text-warm-100 mb-6">
              Services
            </h1>
            <p className="body-lg max-w-lg mx-auto mb-8">
              Everything you need to look and feel your absolute best,
              crafted with care and precision every time.
            </p>
            <motion.button
              onClick={() => setBookingOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-3.5 rounded-full font-body text-sm font-medium transition-colors shadow-soft"
            >
              Book an Appointment
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Service Sections ──────────────────────────────── */}
      {SERVICES_DATA.map((svc, idx) => (
        <section
          key={svc.title}
          className={[
            'section border-t border-warm-200 dark:border-warm-700',
            idx % 2 === 0 ? 'bg-white dark:bg-warm-800' : 'bg-warm-50 dark:bg-warm-900',
          ].join(' ')}
        >
          <div className="wrap-lg">
            <div className={[
              'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center',
              idx % 2 !== 0 ? 'lg:flex-row-reverse' : '',
            ].join(' ')}>
              {/* Image */}
              <Reveal className={idx % 2 !== 0 ? 'lg:order-2' : ''}>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                  <img
                    src={svc.img}
                    alt={svc.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <a
                    href={svc.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white/90 dark:bg-warm-900/90 backdrop-blur-sm text-warm-700 dark:text-warm-200 hover:text-brand-600 dark:hover:text-brand-400 px-3 py-2 rounded-full text-xs font-body font-medium shadow-soft transition-colors"
                  >
                    <Instagram size={12} /> View on Instagram
                  </a>
                </div>
              </Reveal>

              {/* Content */}
              <Reveal delay={0.1} className={idx % 2 !== 0 ? 'lg:order-1' : ''}>
                <div>
                  <p className="label mb-3">{String(idx + 1).padStart(2, '0')} / {String(SERVICES_DATA.length).padStart(2, '0')}</p>
                  <h2 className="font-display text-4xl sm:text-5xl font-normal text-warm-900 dark:text-warm-100 mb-4">
                    {svc.title}
                  </h2>
                  <p className="body-lg mb-8">{svc.description}</p>

                  {/* Pricing table */}
                  <div className="space-y-2 mb-8">
                    {svc.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between py-3.5 px-5 bg-warm-50 dark:bg-warm-900/50 rounded-xl border border-warm-100 dark:border-warm-700 group hover:border-brand-200 dark:hover:border-brand-700/50 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          {item.popular && (
                            <span className="px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 font-body text-2xs font-medium tracking-wide">
                              Popular
                            </span>
                          )}
                          <span className="font-body text-sm text-warm-800 dark:text-warm-200">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          {item.duration && (
                            <span className="font-body text-xs text-warm-400 dark:text-warm-500 hidden sm:block">{item.duration}</span>
                          )}
                          <span className="font-body text-sm font-medium text-brand-600 dark:text-brand-400">
                            {item.price !== null ? `$${item.price}` : item.priceLabel}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setBookingOpen(true)}
                    className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-7 py-3 rounded-full font-body text-sm font-medium transition-colors shadow-soft group"
                  >
                    Book {svc.title}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* ── Gallery ───────────────────────────────────────── */}
      <section className="section border-t border-warm-200 dark:border-warm-700 bg-warm-50 dark:bg-warm-900">
        <div className="wrap-lg">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="label mb-3">Our work</p>
              <h2 className="h-section text-warm-900 dark:text-warm-100">Recent gallery</h2>
            </div>
            <a
              href="https://www.instagram.com/beautybyamy000"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 font-body text-sm text-warm-500 dark:text-warm-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors group"
            >
              <Instagram size={14} /> @beautybyamy000
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {GALLERY.map((src, i) => (
              <motion.div
                key={i}
                className="overflow-hidden rounded-2xl aspect-square"
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
              >
                <motion.img
                  src={src}
                  alt={`Nail art ${i + 1}`}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Includes ──────────────────────────────────────── */}
      <section className="section border-t border-warm-200 dark:border-warm-700 bg-white dark:bg-warm-800">
        <div className="wrap-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <p className="label mb-4">Every appointment</p>
              <h2 className="h-section text-warm-900 dark:text-warm-100 mb-8">
                What's always included
              </h2>
              <ul className="space-y-4">
                {INCLUDES.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <div className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-brand-600 dark:text-brand-400" />
                    </div>
                    <span className="font-body text-sm text-warm-700 dark:text-warm-300">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <button
                onClick={() => setBookingOpen(true)}
                className="mt-10 inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-3.5 rounded-full font-body text-sm font-medium transition-colors shadow-soft group"
              >
                Book Now
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="rounded-2xl overflow-hidden aspect-[3/4] hidden lg:block">
                <img
                  src={`${BASE}images/Nails-4.png`}
                  alt="Nail artistry"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
