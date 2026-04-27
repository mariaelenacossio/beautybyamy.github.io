import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Instagram } from 'lucide-react'
import BookingModal from '../components/booking/BookingModal'

const BASE = import.meta.env.BASE_URL

/* ── Scroll-reveal wrapper ──────────────────────────── */
function Reveal({ children, className = '', delay = 0, y = 18 }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-72px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Data ───────────────────────────────────────────── */
const STATS = [
  { value: '500+', label: 'Happy clients'    },
  { value: '4+ yrs', label: 'Experience'    },
  { value: '5.0 ★', label: 'Average rating' },
  { value: '100%',  label: 'Satisfaction'   },
]

const SERVICES_PREVIEW = [
  {
    slug: 'nails',
    title: 'Nail Care',
    sub: 'Acrylics · Dipping Powder · Refills',
    from: 'From $55',
    img: `${BASE}images/Nails-1.png`,
  },
  {
    slug: 'lashes',
    title: 'Lash Extensions',
    sub: 'Classic · Volume · Refills',
    from: 'From $155',
    img: `${BASE}images/allef-vinicius-v75vjSfgLDc-unsplash.jpg`,
  },
  {
    slug: 'gifts',
    title: 'Gift Certificates',
    sub: 'The perfect thoughtful gift',
    from: 'From $100',
    img: `${BASE}images/Nails-3.png`,
  },
]

const GALLERY = [
  `${BASE}images/Nails-1.png`,
  `${BASE}images/Nails-2.png`,
  `${BASE}images/Nails-4.png`,
  `${BASE}images/Nails-5.png`,
  `${BASE}images/img-1.png`,
  `${BASE}images/Nails-3.png`,
]

const TESTIMONIALS = [
  {
    quote: 'Beyond gorgeous. Very modern and clean. Amy is the best nail technician I\'ve ever had.',
    author: 'Denisse C.',
    img: `${BASE}images/img-1.png`,
  },
  {
    quote: 'Every visit is a wonderful experience. She creates the most beautiful, lasting designs.',
    author: 'Luisa A.',
    img: `${BASE}images/img-2.png`,
  },
  {
    quote: 'Best nail technician in the state. I will never go anywhere else ever again.',
    author: 'Mariaelena C.',
    img: `${BASE}images/Nails-5.png`,
  },
]

/* ── Component ──────────────────────────────────────── */
export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex">

        {/* Left — content */}
        <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 lg:px-16 xl:px-24 pt-28 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg"
          >
            <p className="label mb-5">Nail Artistry · Fairfax, Virginia</p>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-[3.75rem] xl:text-[4.25rem] font-normal leading-[1.08] tracking-tight text-warm-900 dark:text-warm-100 mb-6">
              Premium nails,<br />
              <em className="text-brand-600 dark:text-brand-400 not-italic font-normal">crafted for you.</em>
            </h1>

            <p className="body-lg mb-10 max-w-sm">
              Hand-crafted nail artistry and eyelash extensions — where beauty
              meets precision, every single visit.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <motion.button
                onClick={() => setBookingOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-3.5 rounded-full font-body text-sm font-medium transition-colors shadow-soft"
              >
                Book an Appointment
              </motion.button>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 text-warm-600 dark:text-warm-300 hover:text-brand-600 dark:hover:text-brand-400 font-body text-sm font-medium transition-colors group"
              >
                See services
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-3 mt-12 pt-8 border-t border-warm-200 dark:border-warm-700">
              <div className="flex gap-0.5">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} size={14} className="fill-brand-400 text-brand-400" />
                ))}
              </div>
              <span className="font-body text-sm text-warm-500 dark:text-warm-400">
                5.0 · Trusted by 500+ clients in Northern Virginia
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right — image */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            <img
              src={`${BASE}images/Home-1.jpg`}
              alt="Beautiful nail artistry"
              className="w-full h-full object-cover"
            />
            {/* Soft inner shadow on left edge to blend */}
            <div className="absolute inset-0 bg-gradient-to-r from-warm-50 dark:from-warm-900 via-transparent to-transparent w-32 pointer-events-none" />
          </motion.div>
        </div>

        {/* Mobile image (below fold) */}
        <div className="lg:hidden absolute inset-0 -z-10">
          <img
            src={`${BASE}images/Home-1.jpg`}
            alt=""
            className="w-full h-full object-cover opacity-10 dark:opacity-5"
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS
      ═══════════════════════════════════════ */}
      <section className="bg-white dark:bg-warm-800 border-y border-warm-200 dark:border-warm-700">
        <div className="wrap-lg">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.07}
                className={[
                  'py-10 px-6 text-center',
                  i < STATS.length - 1 ? 'border-b lg:border-b-0 border-r border-warm-100 dark:border-warm-700' : '',
                ].join(' ')}
              >
                <p className="font-display text-3xl sm:text-4xl font-normal text-warm-900 dark:text-warm-100 mb-1">
                  {s.value}
                </p>
                <p className="label">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SERVICES PREVIEW
      ═══════════════════════════════════════ */}
      <section className="section bg-warm-50 dark:bg-warm-900">
        <div className="wrap-lg">
          {/* Header */}
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="label mb-3">What I offer</p>
              <h2 className="h-section text-warm-900 dark:text-warm-100">Services</h2>
            </div>
            <Link
              to="/services"
              className="hidden sm:inline-flex items-center gap-1.5 font-body text-sm text-warm-500 dark:text-warm-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors group"
            >
              Full menu & pricing
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES_PREVIEW.map((svc, i) => (
              <Reveal key={svc.slug} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="group bg-white dark:bg-warm-800 rounded-2xl overflow-hidden shadow-soft hover:shadow-soft-md transition-shadow cursor-pointer border border-warm-100 dark:border-warm-700"
                  onClick={() => setBookingOpen(true)}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={svc.img}
                      alt={svc.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-display text-xl font-normal text-warm-900 dark:text-warm-100 mb-1">
                      {svc.title}
                    </h3>
                    <p className="font-body text-xs text-warm-400 dark:text-warm-500 mb-3">{svc.sub}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sm font-medium text-brand-600 dark:text-brand-400">{svc.from}</span>
                      <span className="inline-flex items-center gap-1 font-body text-xs text-warm-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        Book <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ABOUT STRIP
      ═══════════════════════════════════════ */}
      <section className="section bg-white dark:bg-warm-800">
        <div className="wrap-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <Reveal>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden aspect-[3/4] max-w-sm mx-auto lg:mx-0">
                  <img
                    src={`${BASE}images/Amy-profile.png`}
                    alt="Amy — Nail Technician"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Floating credential card */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="absolute -bottom-4 -right-4 lg:-right-8 bg-white dark:bg-warm-700 rounded-2xl px-5 py-4 shadow-soft-md border border-warm-100 dark:border-warm-600"
                >
                  <div className="flex gap-0.5 mb-1">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} size={12} className="fill-brand-400 text-brand-400" />
                    ))}
                  </div>
                  <p className="font-body text-xs font-medium text-warm-900 dark:text-warm-100">Licensed & Certified</p>
                  <p className="font-body text-2xs text-warm-400 dark:text-warm-500">4+ years professional</p>
                </motion.div>
              </div>
            </Reveal>

            {/* Text */}
            <Reveal delay={0.1}>
              <p className="label mb-4">About Amy</p>
              <h2 className="font-display text-4xl sm:text-5xl font-normal text-warm-900 dark:text-warm-100 mb-6">
                Hi, I'm Amy —<br />
                <em className="text-brand-500 dark:text-brand-400">a passion for beauty.</em>
              </h2>
              <p className="body-lg mb-4">
                I'm a licensed nail technician and beauty specialist based in Fairfax, Virginia.
                With over four years of professional experience, I specialise in creating
                custom nail designs and eyelash extensions that feel as good as they look.
              </p>
              <p className="body-sm mb-8">
                Every appointment is a personal experience — I take the time to understand
                what you want and bring it to life with precision and care.
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
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 px-7 py-3 rounded-full border border-warm-200 dark:border-warm-600 font-body text-sm text-warm-700 dark:text-warm-300 hover:border-brand-300 hover:text-brand-600 dark:hover:text-brand-400 transition-all"
                >
                  Learn more
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════ */}
      <section className="section bg-warm-100 dark:bg-warm-800/60">
        <div className="wrap-lg">
          <Reveal className="text-center mb-14">
            <p className="label mb-3">Kind words</p>
            <h2 className="h-section text-warm-900 dark:text-warm-100">What clients say</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.08}>
                <div className="bg-white dark:bg-warm-800 rounded-2xl p-7 shadow-soft border border-warm-100 dark:border-warm-700 h-full flex flex-col">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-5">
                    {Array(5).fill(0).map((_, j) => (
                      <Star key={j} size={13} className="fill-brand-400 text-brand-400" />
                    ))}
                  </div>
                  {/* Quote */}
                  <blockquote className="font-display text-lg font-normal italic text-warm-800 dark:text-warm-200 leading-relaxed flex-1 mb-6">
                    "{t.quote}"
                  </blockquote>
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-warm-100 dark:border-warm-700 shrink-0">
                      <img src={t.img} alt={t.author} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-body text-sm font-medium text-warm-900 dark:text-warm-100">{t.author}</p>
                      <p className="font-body text-2xs text-warm-400 dark:text-warm-500 tracking-wide">Verified client</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          GALLERY
      ═══════════════════════════════════════ */}
      <section className="section bg-warm-50 dark:bg-warm-900">
        <div className="wrap-lg">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="label mb-3">Our work</p>
              <h2 className="h-section text-warm-900 dark:text-warm-100">Gallery</h2>
            </div>
            <a
              href="https://www.instagram.com/beautybyamy000"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 font-body text-sm text-warm-500 dark:text-warm-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors group"
            >
              <Instagram size={14} />
              @beautybyamy000
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {GALLERY.map((src, i) => (
              <motion.div
                key={i}
                className="overflow-hidden rounded-2xl aspect-square group"
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
              >
                <motion.img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════ */}
      <section className="section bg-brand-50 dark:bg-brand-900/20">
        <div className="wrap">
          <Reveal className="text-center">
            <p className="label mb-4">Ready?</p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal text-warm-900 dark:text-warm-100 mb-4 text-balance">
              Book your appointment today
            </h2>
            <p className="body-lg max-w-md mx-auto mb-10">
              Online booking, no phone call required. Choose your service, pick a time, and you're all set.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <motion.button
                onClick={() => setBookingOpen(true)}
                whileHover={{ scale: 1.02, boxShadow: '0 0 28px rgba(160,85,73,0.25)' }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-9 py-4 rounded-full font-body text-sm font-medium transition-colors shadow-soft"
              >
                Book Now
              </motion.button>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-warm-300 dark:border-warm-600 text-warm-700 dark:text-warm-300 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 px-9 py-4 rounded-full font-body text-sm font-medium transition-all"
              >
                Get in touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
