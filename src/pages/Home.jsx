import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Instagram } from 'lucide-react'
import BookingModal from '../components/booking/BookingModal'

const BASE = import.meta.env.BASE_URL

/* ─── animation helpers ──────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 32 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

const staggerContainer = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const wordReveal = {
  hidden: { y: '105%', opacity: 0 },
  show:   { y: '0%', opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

function InView({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── data ───────────────────────────────────────────── */
const STATS = [
  { value: '500+', label: 'Happy Clients'     },
  { value: '4+',   label: 'Years of Artistry' },
  { value: '5.0',  label: 'Star Rating'       },
  { value: '100%', label: 'Satisfaction'       },
]

const SERVICES_PREVIEW = [
  {
    no: '01',
    title: 'Nail Care',
    sub: 'Acrylics · Dipping Powder · Refills',
    from: 'From $55',
    img: `${BASE}images/Nails-1.png`,
  },
  {
    no: '02',
    title: 'Eyelash Extensions',
    sub: 'Classic · Volume Sets · Refills',
    from: 'From $155',
    img: `${BASE}images/img-2.png`,
  },
  {
    no: '03',
    title: 'Gift Certificates',
    sub: 'For someone you love',
    from: 'From $100',
    img: `${BASE}images/Nails-3.png`,
  },
]

const GALLERY_IMAGES = [
  { src: `${BASE}images/Nails-1.png`, alt: 'Nail art' },
  { src: `${BASE}images/Nails-2.png`, alt: 'Design detail' },
  { src: `${BASE}images/Nails-4.png`, alt: 'Nail art' },
  { src: `${BASE}images/Nails-5.png`, alt: 'Nail art' },
  { src: `${BASE}images/img-1.png`,   alt: 'Client nails' },
  { src: `${BASE}images/Nails-3.png`, alt: 'Gallery' },
  { src: `${BASE}images/Nails-1.png`, alt: 'Nail art' },
  { src: `${BASE}images/Nails-2.png`, alt: 'Design detail' },
]

const TESTIMONIALS = [
  {
    name: 'Denisse C.',
    quote: 'Beyond gorgeous. Very modern and clean. Amy is the best nail technician I\'ve ever had.',
    img: `${BASE}images/img-1.png`,
  },
  {
    name: 'Luisa A.',
    quote: 'Every visit is always a wonderful experience. She creates the most beautiful designs.',
    img: `${BASE}images/img-2.png`,
  },
  {
    name: 'Mariaelena C.',
    quote: 'Best nail technician in the state. I will never go anywhere else ever again.',
    img: `${BASE}images/Nails-5.png`,
  },
]

/* ─── component ──────────────────────────────────────── */
export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [hoveredService, setHoveredService] = useState(null)

  return (
    <>
      {/* ══════════════════════════════════════════
          HERO — editorial asymmetric grid
      ══════════════════════════════════════════ */}
      <section className="relative h-screen min-h-[600px] border-b border-editorial/10 dark:border-white/8">
        {/* Desktop: 3-col grid */}
        <div className="hidden lg:grid h-full" style={{ gridTemplateColumns: '2fr 1.15fr 1.4fr' }}>

          {/* ── Col 1: large media panel with staggered word overlay ── */}
          <div className="relative overflow-hidden border-r border-editorial/10 dark:border-white/8">
            <video
              src={`${BASE}images/AmyBanner.mp4`}
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover scale-105"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-editorial/20 via-editorial/10 to-editorial/60" />

            {/* Staggered editorial words */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="absolute inset-0 flex flex-col justify-between p-10 pt-28 pb-12"
            >
              <div className="overflow-hidden">
                <motion.span variants={wordReveal} className="block font-editorial text-[clamp(4rem,7vw,7rem)] leading-none text-white/90 tracking-wide uppercase">
                  BEAUTY
                </motion.span>
              </div>
              <div className="overflow-hidden self-center">
                <motion.span variants={wordReveal} className="block font-editorial text-[clamp(3rem,5vw,5rem)] leading-none text-white/70 tracking-widest uppercase italic font-display">
                  by Amy
                </motion.span>
              </div>
              <div className="overflow-hidden self-end">
                <motion.span variants={wordReveal} className="block font-editorial text-[clamp(3.5rem,6vw,6.5rem)] leading-none text-white/90 tracking-wide uppercase">
                  NAILS
                </motion.span>
              </div>
            </motion.div>
          </div>

          {/* ── Col 2: two stacked image panels ── */}
          <div className="grid border-r border-editorial/10 dark:border-white/8" style={{ gridTemplateRows: '55% 45%' }}>
            {/* Top: nail close-up */}
            <div className="relative overflow-hidden border-b border-editorial/10 dark:border-white/8 group">
              <motion.img
                src={`${BASE}images/Nails-1.png`}
                alt="Nail art"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.3 }}
              />
              {/* "NEW LOOK" chip */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute bottom-4 right-4 flex items-center gap-2 bg-brand-600 text-white px-4 py-2"
              >
                <span className="font-body text-[10px] font-bold tracking-widest uppercase">New Looks</span>
                <ArrowRight size={10} />
              </motion.div>
            </div>

            {/* Bottom: Amy profile */}
            <div className="relative overflow-hidden group">
              <motion.img
                src={`${BASE}images/Amy-profile.png`}
                alt="Amy — nail technician"
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-editorial/30 to-transparent" />
              {/* "Summer Euphoria Look" label */}
              <div className="absolute bottom-4 left-4">
                <p className="font-body text-[10px] text-white/80 tracking-widest uppercase font-medium">Nail Artistry</p>
              </div>
            </div>
          </div>

          {/* ── Col 3: cream text panel ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col justify-between bg-cream dark:bg-[#0D0808] p-10 pt-24"
          >
            {/* Top label */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="editorial-label text-brand-600"
            >
              Style is for all
            </motion.p>

            {/* Brand name */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="font-editorial text-[clamp(3.5rem,5.5vw,5.5rem)] leading-[0.9] tracking-wide uppercase text-editorial dark:text-[#F0EBE8]">
                  BEAUTY<br />
                  <span className="font-display italic font-light text-[clamp(2.5rem,4vw,4rem)] tracking-normal text-brand-600">
                    by Amy
                  </span>
                  <br />
                  NAIL<br />STUDIO
                </h1>
              </motion.div>
            </div>

            {/* Tagline + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="space-y-6"
            >
              <p className="font-body text-sm text-mid dark:text-[#A09590] leading-relaxed">
                Premium nail artistry and eyelash extensions crafted with care, delivered with love — in Fairfax, Virginia.
              </p>
              <div className="flex flex-col gap-3">
                <motion.button
                  onClick={() => setBookingOpen(true)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center justify-between w-full bg-brand-600 hover:bg-brand-700 text-white px-6 py-4 transition-colors duration-200"
                >
                  <span className="font-body text-sm font-medium tracking-widest uppercase">Book Now</span>
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </motion.button>
                <Link
                  to="/services"
                  className="group flex items-center justify-between w-full border border-editorial/15 dark:border-white/10 text-editorial dark:text-[#F0EBE8] px-6 py-4 hover:border-editorial/40 transition-colors duration-200"
                >
                  <span className="font-body text-sm font-medium tracking-widest uppercase">View Services</span>
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://www.instagram.com/beautybyamy000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-mid dark:text-[#A09590] hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <Instagram size={14} />
                  <span className="font-body text-[11px] tracking-widest uppercase">@beautybyamy000</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Mobile hero (stacked) ── */}
        <div className="lg:hidden relative h-full flex flex-col">
          {/* Media */}
          <div className="relative flex-1 overflow-hidden">
            <video
              src={`${BASE}images/AmyBanner.mp4`}
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-editorial/10 via-transparent to-editorial/80" />
            {/* Overlay text */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pb-32">
              <p className="editorial-label mb-2">Style is for all</p>
              <h1 className="font-editorial text-6xl leading-none tracking-wide uppercase text-white">
                BEAUTY<br />
                <span className="font-display italic font-light text-4xl text-brand-300">by Amy</span><br />
                NAILS
              </h1>
            </div>
          </div>
          {/* CTA strip */}
          <div className="bg-cream dark:bg-[#0D0808] px-6 py-6 flex gap-3 border-t border-editorial/10">
            <button
              onClick={() => setBookingOpen(true)}
              className="flex-1 bg-brand-600 text-white font-body text-xs font-medium tracking-widest uppercase py-4 hover:bg-brand-700 transition-colors"
            >
              Book Now
            </button>
            <Link
              to="/services"
              className="flex-1 border border-editorial/15 text-editorial dark:text-[#F0EBE8] dark:border-white/10 font-body text-xs font-medium tracking-widest uppercase py-4 text-center hover:border-editorial/40 transition-colors"
            >
              Services
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS MARQUEE
      ══════════════════════════════════════════ */}
      <section className="border-b border-editorial/10 dark:border-white/8 overflow-hidden bg-brand-600">
        <div className="flex animate-marquee whitespace-nowrap py-4">
          {[...STATS, ...STATS, ...STATS, ...STATS].map((s, i) => (
            <div key={i} className="inline-flex items-center gap-8 px-10">
              <span className="font-editorial text-2xl tracking-widest text-white">{s.value}</span>
              <span className="font-body text-[10px] tracking-widest uppercase text-white/70">{s.label}</span>
              <span className="text-white/30 text-lg">·</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES PREVIEW — editorial list
      ══════════════════════════════════════════ */}
      <section className="border-b border-editorial/10 dark:border-white/8">
        <div className="container-xl section-padding">
          {/* Header */}
          <InView className="flex items-end justify-between py-12 border-b border-editorial/10 dark:border-white/8">
            <div>
              <p className="editorial-label mb-3">What we do</p>
              <h2 className="font-editorial text-5xl sm:text-6xl lg:text-7xl tracking-wide uppercase text-editorial dark:text-[#F0EBE8]">
                Services
              </h2>
            </div>
            <Link
              to="/services"
              className="hidden sm:flex items-center gap-2 font-body text-xs tracking-widest uppercase text-mid hover:text-brand-600 dark:text-[#A09590] dark:hover:text-brand-400 transition-colors group"
            >
              View all
              <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </InView>

          {/* Services list */}
          <div>
            {SERVICES_PREVIEW.map((svc, i) => (
              <InView key={svc.no} delay={i * 0.08}>
                <motion.div
                  className="group grid grid-cols-12 items-center gap-6 py-8 border-b border-editorial/10 dark:border-white/8 cursor-pointer"
                  onHoverStart={() => setHoveredService(i)}
                  onHoverEnd={() => setHoveredService(null)}
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  onClick={() => setBookingOpen(true)}
                >
                  {/* Number */}
                  <div className="col-span-1">
                    <span className="font-body text-xs text-mid/50 dark:text-[#A09590]/50">{svc.no}</span>
                  </div>
                  {/* Title */}
                  <div className="col-span-5 sm:col-span-4">
                    <h3 className="font-editorial text-3xl sm:text-4xl tracking-wide uppercase text-editorial dark:text-[#F0EBE8] group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300">
                      {svc.title}
                    </h3>
                  </div>
                  {/* Sub */}
                  <div className="hidden sm:block col-span-3">
                    <p className="font-body text-xs text-mid dark:text-[#A09590] tracking-wide">{svc.sub}</p>
                  </div>
                  {/* Price */}
                  <div className="col-span-3 sm:col-span-2">
                    <span className="font-body text-sm font-medium text-editorial dark:text-[#F0EBE8]">{svc.from}</span>
                  </div>
                  {/* Arrow */}
                  <div className="col-span-3 sm:col-span-2 flex justify-end">
                    <AnimatePresence>
                      {hoveredService === i && (
                        <motion.div
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 8 }}
                          className="flex items-center gap-2 bg-brand-600 text-white px-4 py-2"
                        >
                          <span className="font-body text-[10px] tracking-widest uppercase font-medium">Book</span>
                          <ArrowRight size={10} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {hoveredService !== i && (
                      <ArrowRight size={16} className="text-editorial/30 dark:text-white/20 group-hover:text-brand-600 transition-colors duration-200" />
                    )}
                  </div>
                </motion.div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          GALLERY — horizontal scroll strip
      ══════════════════════════════════════════ */}
      <section className="border-b border-editorial/10 dark:border-white/8 py-16">
        <InView className="container-xl section-padding mb-8 flex items-end justify-between">
          <div>
            <p className="editorial-label mb-2">Our work</p>
            <h2 className="font-editorial text-4xl sm:text-5xl tracking-wide uppercase text-editorial dark:text-[#F0EBE8]">
              Gallery
            </h2>
          </div>
          <a
            href="https://www.instagram.com/beautybyamy000"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 font-body text-xs tracking-widest uppercase text-mid hover:text-brand-600 dark:text-[#A09590] dark:hover:text-brand-400 transition-colors group"
          >
            <Instagram size={13} />
            Instagram
          </a>
        </InView>

        {/* Scrollable image strip */}
        <div className="overflow-x-auto no-scrollbar px-5 sm:px-8 lg:px-12">
          <div className="flex gap-3 w-max">
            {GALLERY_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                className="relative overflow-hidden shrink-0 group"
                style={{ width: 'clamp(200px, 22vw, 320px)', height: 'clamp(260px, 28vw, 400px)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/20 transition-colors duration-300 flex items-end p-4"
                >
                  <span className="font-body text-[10px] text-white tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                    {img.alt}
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BIG RED CTA BLOCK
      ══════════════════════════════════════════ */}
      <section className="border-b border-editorial/10 dark:border-white/8">
        <InView className="relative overflow-hidden bg-brand-600">
          {/* Background image */}
          <img
            src={`${BASE}images/BG3-about.jpg`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-multiply"
          />
          <div className="relative z-10 container-xl section-padding py-20 sm:py-28">
            <div className="max-w-4xl">
              <p className="font-body text-xs text-white/60 tracking-widest uppercase mb-6">Ready?</p>
              <h2 className="font-editorial text-[clamp(3.5rem,8vw,8rem)] leading-none tracking-wide uppercase text-white mb-10">
                BOOK YOUR<br />
                <span className="font-display italic font-light text-white/80 text-[clamp(2rem,5vw,5rem)]">dream nails</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={() => setBookingOpen(true)}
                  whileHover={{ backgroundColor: '#FAF7F4', color: '#C8102E' }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center justify-between sm:justify-center gap-4 bg-white text-brand-600 px-10 py-5 font-body text-sm font-medium tracking-widest uppercase transition-colors duration-200"
                >
                  Book Appointment
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </motion.button>
                <Link
                  to="/services"
                  className="group flex items-center justify-between sm:justify-center gap-4 border border-white/40 hover:border-white text-white px-10 py-5 font-body text-sm font-medium tracking-widest uppercase transition-colors duration-200"
                >
                  See Services
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </InView>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section className="border-b border-editorial/10 dark:border-white/8 py-16 sm:py-24">
        <div className="container-xl section-padding">
          <InView className="mb-12">
            <p className="editorial-label mb-3">What clients say</p>
            <h2 className="font-editorial text-4xl sm:text-5xl tracking-wide uppercase text-editorial dark:text-[#F0EBE8]">
              Testimonials
            </h2>
          </InView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-editorial/10 dark:border-white/8">
            {TESTIMONIALS.map((t, i) => (
              <InView
                key={t.name}
                delay={i * 0.1}
                className={`p-8 sm:p-10 ${i < TESTIMONIALS.length - 1 ? 'border-b md:border-b-0 md:border-r border-editorial/10 dark:border-white/8' : ''}`}
              >
                {/* Nail image thumbnail */}
                <div className="w-16 h-16 overflow-hidden mb-6">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                </div>
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array(5).fill(0).map((_, j) => (
                    <span key={j} className="text-brand-600 text-sm">★</span>
                  ))}
                </div>
                <blockquote className="font-display text-xl italic font-light text-editorial dark:text-[#F0EBE8] leading-relaxed mb-6">
                  "{t.quote}"
                </blockquote>
                <p className="font-body text-xs tracking-widest uppercase text-mid dark:text-[#A09590]">{t.name}</p>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INSTAGRAM STRIP
      ══════════════════════════════════════════ */}
      <section className="py-16 sm:py-20">
        <InView className="container-xl section-padding text-center">
          <p className="editorial-label mb-4">Follow along</p>
          <a
            href="https://www.instagram.com/beautybyamy000"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 font-editorial text-4xl sm:text-5xl tracking-wide uppercase text-editorial dark:text-[#F0EBE8] hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-300"
          >
            <Instagram size={36} className="shrink-0" />
            @beautybyamy000
            <ArrowRight size={24} className="transition-transform duration-300 group-hover:translate-x-2" />
          </a>
        </InView>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
