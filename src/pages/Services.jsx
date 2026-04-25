import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Instagram, Check } from 'lucide-react'
import BookingModal from '../components/booking/BookingModal'

const BASE = import.meta.env.BASE_URL

const SERVICES_DATA = [
  {
    no: '01',
    title: 'Nail Care',
    icon: '💅',
    description: 'Precision-crafted nails using premium products for a flawless, long-lasting finish.',
    img: `${BASE}images/Nails-1.png`,
    instagramLink: 'https://www.instagram.com/p/CTkdAn7nCN6/',
    items: [
      { name: 'Acrylic Fullset',      price: 80,  duration: '90 min', popular: true  },
      { name: 'Acrylic Refill',        price: 65,  duration: '60 min', popular: false },
      { name: 'Dipping Powder',        price: 75,  duration: '75 min', popular: true  },
      { name: 'Dipping Powder Refill', price: 55,  duration: '60 min', popular: false },
    ],
  },
  {
    no: '02',
    title: 'Eyelash Extensions',
    icon: '✨',
    description: 'Handcrafted lash sets that open your eyes and elevate your entire look.',
    video: `${BASE}images/eyelashes-1.mp4`,
    instagramLink: 'https://www.instagram.com/p/CTadPXfvTgA/',
    items: [
      { name: 'Volume Eyelash Set', price: 300, duration: '2.5 hr', popular: true  },
      { name: 'Volume Refill',      price: 175, duration: '90 min', popular: false },
      { name: 'Classic Eyelashes',  price: 275, duration: '2 hr',   popular: true  },
      { name: 'Classic Refill',     price: 155, duration: '60 min', popular: false },
    ],
  },
  {
    no: '03',
    title: 'Gift Certificates',
    icon: '🎁',
    description: 'Treat someone you love to a luxurious beauty experience — the gift that never misses.',
    img: `${BASE}images/Nails-3.png`,
    instagramLink: 'https://www.instagram.com/p/CO0JQBosF9i/',
    items: [
      { name: 'Nails + Manicure',        price: 100,  duration: null, popular: false },
      { name: 'Classic Eyelashes Set',   price: 250,  duration: null, popular: false },
      { name: 'Nails + Eyelashes Combo', price: 400,  duration: null, popular: true  },
      { name: 'Custom Amount',           price: null, duration: null, popular: false, priceLabel: 'Min $65' },
    ],
  },
]

const GALLERY = [
  { src: `${BASE}images/Nails-1.png`, alt: 'Acrylic nail art' },
  { src: `${BASE}images/Nails-2.png`, alt: 'Nail design' },
  { src: `${BASE}images/Nails-3.png`, alt: 'Nail art close-up' },
  { src: `${BASE}images/Nails-4.png`, alt: 'Nail design detail' },
  { src: `${BASE}images/Nails-5.png`, alt: 'Nail art gallery' },
  { src: `${BASE}images/img-1.png`,   alt: 'Client nails' },
]

const INCLUDES = [
  'Sanitized tools every visit',
  'Premium product brands only',
  'Personalized nail consultation',
  'Touch-up guarantee',
]

function InView({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Services() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-editorial/10 dark:border-white/8">
        <div className="hidden lg:grid" style={{ gridTemplateColumns: '1fr 1fr', minHeight: '55vh' }}>
          {/* Left: media */}
          <div className="relative overflow-hidden border-r border-editorial/10 dark:border-white/8 group">
            <video
              src={`${BASE}images/video-2.mp4`}
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-editorial/30" />
            <div className="relative z-10 p-12 pt-32 flex flex-col justify-end h-full">
              <p className="editorial-label text-white/60 mb-2">Menu & Pricing</p>
              <h1 className="font-editorial text-[clamp(4rem,7vw,7rem)] leading-none tracking-wide uppercase text-white">
                Services
              </h1>
            </div>
          </div>
          {/* Right: text + CTA */}
          <div className="bg-cream dark:bg-[#0D0808] p-12 pt-32 flex flex-col justify-end gap-8">
            <p className="font-body text-sm text-mid dark:text-[#A09590] leading-relaxed max-w-xs">
              Everything you need for nails and lashes that make you feel like the best version of yourself.
            </p>
            <div className="flex flex-col gap-3">
              <motion.button
                onClick={() => setBookingOpen(true)}
                whileHover={{ x: 4 }}
                className="group flex items-center justify-between bg-brand-600 hover:bg-brand-700 text-white px-8 py-5 font-body text-xs font-medium tracking-widest uppercase transition-colors"
              >
                Book an Appointment
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile hero */}
        <div className="lg:hidden relative overflow-hidden" style={{ minHeight: '40vh' }}>
          <video
            src={`${BASE}images/video-2.mp4`}
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-editorial/40" />
          <div className="relative z-10 section-padding pt-24 pb-10 flex flex-col justify-end h-full">
            <p className="editorial-label text-white/60 mb-2">Menu & Pricing</p>
            <h1 className="font-editorial text-6xl leading-none tracking-wide uppercase text-white">Services</h1>
          </div>
        </div>
      </section>

      {/* ── Service Sections ────────────────────────────── */}
      {SERVICES_DATA.map((svc, idx) => (
        <section key={svc.no} className="border-b border-editorial/10 dark:border-white/8">
          <div className="container-xl section-padding py-16 sm:py-20">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${idx % 2 !== 0 ? 'lg:[direction:rtl]' : ''}`}>
              {/* Media */}
              <InView className={idx % 2 !== 0 ? 'lg:[direction:ltr]' : ''}>
                <div className="relative overflow-hidden aspect-[4/5] group">
                  {svc.video ? (
                    <video
                      src={svc.video}
                      autoPlay muted loop playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={svc.img}
                      alt={svc.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  {/* Number overlay */}
                  <div className="absolute top-6 left-6">
                    <span className="font-editorial text-8xl text-white/20 leading-none">{svc.no}</span>
                  </div>
                  <a
                    href={svc.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 dark:bg-editorial/80 backdrop-blur-sm text-editorial dark:text-white px-4 py-2 text-[10px] font-body font-medium tracking-widest uppercase hover:bg-white transition-colors"
                  >
                    <Instagram size={10} /> Instagram
                  </a>
                </div>
              </InView>

              {/* Content */}
              <InView delay={0.1} className={idx % 2 !== 0 ? 'lg:[direction:ltr]' : ''}>
                <div className="space-y-8">
                  <div>
                    <p className="editorial-label mb-3">{svc.no} / {String(SERVICES_DATA.length).padStart(2,'0')}</p>
                    <h2 className="font-editorial text-5xl sm:text-6xl tracking-wide uppercase text-editorial dark:text-[#F0EBE8] mb-4">
                      {svc.title}
                    </h2>
                    <p className="font-body text-sm text-mid dark:text-[#A09590] leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  {/* Pricing rows */}
                  <div className="space-y-0 border border-editorial/10 dark:border-white/8">
                    {svc.items.map((item, j) => (
                      <motion.div
                        key={item.name}
                        whileHover={{ backgroundColor: 'rgba(200,16,46,0.04)' }}
                        className={`flex items-center justify-between px-6 py-5 ${
                          j < svc.items.length - 1 ? 'border-b border-editorial/8 dark:border-white/6' : ''
                        } group`}
                      >
                        <div className="flex items-center gap-3">
                          {item.popular && (
                            <span className="bg-brand-600 text-white font-body text-[9px] font-bold tracking-widest uppercase px-2 py-1">
                              Popular
                            </span>
                          )}
                          <span className="font-body text-sm text-editorial dark:text-[#F0EBE8]">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-6">
                          {item.duration && (
                            <span className="font-body text-xs text-mid dark:text-[#A09590] hidden sm:block">{item.duration}</span>
                          )}
                          <span className="font-body text-base font-semibold text-brand-600 dark:text-brand-400">
                            {item.price !== null ? `$${item.price}` : item.priceLabel}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    onClick={() => setBookingOpen(true)}
                    whileHover={{ x: 4 }}
                    className="group flex items-center gap-4 font-body text-xs font-medium tracking-widest uppercase text-editorial dark:text-[#F0EBE8] hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    Book {svc.title}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </InView>
            </div>
          </div>
        </section>
      ))}

      {/* ── Gallery ─────────────────────────────────────── */}
      <section className="py-16 border-b border-editorial/10 dark:border-white/8">
        <div className="container-xl section-padding">
          <InView className="flex items-end justify-between mb-10">
            <div>
              <p className="editorial-label mb-3">Recent work</p>
              <h2 className="font-editorial text-4xl sm:text-5xl tracking-wide uppercase text-editorial dark:text-[#F0EBE8]">Gallery</h2>
            </div>
            <a
              href="https://www.instagram.com/beautybyamy000"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 font-body text-xs tracking-widest uppercase text-mid hover:text-brand-600 transition-colors group"
            >
              <Instagram size={12} /> Instagram
              <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </InView>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {GALLERY.map(({ src, alt }, i) => (
              <motion.div
                key={i}
                className="relative aspect-square overflow-hidden group"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ scale: 1.02, zIndex: 10 }}
              >
                <img src={src} alt={alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/10 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Includes ────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="container-xl section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <InView>
              <p className="editorial-label mb-4">Every visit</p>
              <h2 className="font-editorial text-5xl sm:text-6xl tracking-wide uppercase text-editorial dark:text-[#F0EBE8] mb-8">
                What's<br />Included
              </h2>
              <div className="space-y-4">
                {INCLUDES.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-7 h-7 bg-brand-600 flex items-center justify-center shrink-0">
                      <Check size={13} className="text-white" />
                    </div>
                    <span className="font-body text-sm text-editorial dark:text-[#F0EBE8]">{item}</span>
                  </motion.div>
                ))}
              </div>
              <motion.button
                onClick={() => setBookingOpen(true)}
                whileHover={{ x: 4 }}
                className="group mt-10 flex items-center gap-4 bg-brand-600 hover:bg-brand-700 text-white px-8 py-5 font-body text-xs font-medium tracking-widest uppercase transition-colors"
              >
                Book Now
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </InView>
            <InView delay={0.15}>
              <div className="relative aspect-[3/4] overflow-hidden group">
                <img
                  src={`${BASE}images/Nails-4.png`}
                  alt="Nail artistry"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </InView>
          </div>
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
