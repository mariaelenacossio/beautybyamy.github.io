import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Instagram, Star } from 'lucide-react'
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

const CREDENTIALS = [
  { value: '4+',    label: 'Years of experience'    },
  { value: '500+',  label: 'Satisfied clients'       },
  { value: '5.0',   label: 'Average star rating'     },
  { value: '100%',  label: 'Satisfaction guaranteed' },
]

const VALUES = [
  {
    title: 'Precision',
    desc:  'I believe the difference between good and great is attention to detail. Every nail, every lash — crafted exactly as envisioned.',
  },
  {
    title: 'Cleanliness',
    desc:  'Fully sanitized tools and a pristine workspace, without exception. Your health and comfort always come first.',
  },
  {
    title: 'Connection',
    desc:  'I build real relationships with my clients. Not just appointments — genuine care about how you look and feel.',
  },
]

export default function About() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="pt-32 pb-0 bg-warm-50 dark:bg-warm-900">
        <div className="wrap-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="pb-16 lg:pb-24"
            >
              <p className="label mb-5">About Amy</p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal text-warm-900 dark:text-warm-100 leading-tight mb-6">
                Hi there,<br />
                <em className="text-brand-500 dark:text-brand-400">I'm Amy.</em>
              </h1>
              <p className="body-lg mb-8 max-w-md">
                I'm a licensed nail technician and beauty specialist with a
                passion for creating looks that make you feel truly beautiful.
              </p>
              <div className="flex flex-wrap gap-3">
                <motion.button
                  onClick={() => setBookingOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-7 py-3 rounded-full font-body text-sm font-medium transition-colors shadow-soft"
                >
                  Book with Amy
                </motion.button>
                <a
                  href="https://www.instagram.com/beautybyamy000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-warm-200 dark:border-warm-600 text-warm-700 dark:text-warm-300 hover:border-brand-300 hover:text-brand-600 dark:hover:text-brand-400 px-7 py-3 rounded-full font-body text-sm transition-all"
                >
                  <Instagram size={15} /> Instagram
                </a>
              </div>
            </motion.div>

            {/* Photo — bleeds to bottom */}
            <Reveal delay={0.1} className="relative lg:self-end">
              <div className="relative rounded-t-2xl overflow-hidden aspect-[3/4] max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                <img
                  src={`${BASE}images/Amy-profile.png`}
                  alt="Amy — Nail Technician & Beauty Specialist"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section className="bg-white dark:bg-warm-800 border-y border-warm-200 dark:border-warm-700">
        <div className="wrap-lg">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {CREDENTIALS.map((c, i) => (
              <Reveal
                key={c.label}
                delay={i * 0.07}
                className={[
                  'py-10 px-6 text-center',
                  i < CREDENTIALS.length - 1 ? 'border-b lg:border-b-0 border-r border-warm-100 dark:border-warm-700' : '',
                ].join(' ')}
              >
                <p className="font-display text-4xl font-normal text-warm-900 dark:text-warm-100 mb-1">{c.value}</p>
                <p className="label">{c.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story ─────────────────────────────────────────── */}
      <section className="section bg-warm-50 dark:bg-warm-900">
        <div className="wrap-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <Reveal>
              <p className="label mb-4">My story</p>
              <h2 className="font-display text-4xl sm:text-5xl font-normal text-warm-900 dark:text-warm-100 mb-8">
                Passion turned<br /><em className="text-brand-500 dark:text-brand-400">into purpose.</em>
              </h2>
              <div className="space-y-5 body-lg">
                <p>
                  I've always believed that beauty is a form of self-care — and that when you look
                  good, you feel unstoppable. That belief led me into the beauty industry, where
                  I've spent years honing my craft in nail artistry and eyelash extensions.
                </p>
                <p>
                  From intricate nail designs to perfectly applied volume lashes, every appointment
                  is a chance for me to blend artistry with technical precision. I stay current with
                  the latest trends and techniques so my clients always leave looking their best.
                </p>
                <p>
                  Working at Fancy Nails & Spa in Fairfax, Virginia, I serve clients who
                  appreciate quality, creativity, and a warm, personal experience.
                </p>
              </div>
            </Reveal>

            {/* Values */}
            <Reveal delay={0.1}>
              <p className="label mb-8">What I stand for</p>
              <div className="space-y-8">
                {VALUES.map((v, i) => (
                  <motion.div
                    key={v.title}
                    className="pb-8 border-b border-warm-200 dark:border-warm-700 last:border-0 last:pb-0"
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <h3 className="font-display text-xl font-normal text-warm-900 dark:text-warm-100 mb-2">
                      {v.title}
                    </h3>
                    <p className="body-sm">{v.desc}</p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Gallery strip ─────────────────────────────────── */}
      <section className="overflow-hidden border-y border-warm-200 dark:border-warm-700">
        <div className="grid grid-cols-4 h-48 sm:h-64 lg:h-72">
          {[
            `${BASE}images/Nails-1.png`,
            `${BASE}images/Nails-2.png`,
            `${BASE}images/BG-about.jpg`,
            `${BASE}images/Nails-5.png`,
          ].map((src, i) => (
            <div key={i} className="overflow-hidden group relative">
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="section bg-brand-50 dark:bg-brand-900/20">
        <div className="wrap text-center">
          <Reveal>
            <div className="flex justify-center gap-0.5 mb-6">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} size={16} className="fill-brand-400 text-brand-400" />
              ))}
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-normal text-warm-900 dark:text-warm-100 mb-4">
              Ready to book with Amy?
            </h2>
            <p className="body-lg max-w-md mx-auto mb-10">
              Choose your service, pick a time that works for you, and I'll take care of the rest.
            </p>
            <motion.button
              onClick={() => setBookingOpen(true)}
              whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(160,85,73,0.22)' }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-9 py-4 rounded-full font-body text-sm font-medium transition-colors shadow-soft"
            >
              Book an Appointment
            </motion.button>
          </Reveal>
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
