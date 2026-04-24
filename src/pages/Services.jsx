import { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Calendar, Check } from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import BookingModal from '../components/booking/BookingModal'

const BASE = import.meta.env.BASE_URL

const SERVICES_DATA = [
  {
    title: 'Nail Care',
    icon: '💅',
    description: 'Precision-crafted nails using premium products for a flawless, long-lasting finish.',
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
    icon: '✨',
    description: 'Handcrafted lash sets that open your eyes and elevate your entire look.',
    video: `${BASE}images/eyelashes-1.mp4`,
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
    icon: '🎁',
    description: 'Treat someone you love to a luxurious beauty experience — the gift that never misses.',
    img: `${BASE}images/Nails-3.png`,
    instagramLink: 'https://www.instagram.com/p/CO0JQBosF9i/',
    items: [
      { name: 'Nails + Manicure',           price: 100, duration: null, popular: false },
      { name: 'Classic Eyelashes Set',      price: 250, duration: null, popular: false },
      { name: 'Nails + Eyelashes Combo',    price: 400, duration: null, popular: true  },
      { name: 'Custom Amount',              price: null, duration: null, popular: false, priceLabel: 'Min $65' },
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

export default function Services() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 overflow-hidden bg-gradient-to-b from-brand-50 to-white dark:from-[#130b0d] dark:to-[#0f0a0b]">
        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10">
          <video src={`${BASE}images/video-2.mp4`} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 container-xl section-padding text-center">
          <AnimatedSection>
            <p className="font-body text-sm text-brand-500 font-medium tracking-widest uppercase mb-3">Menu & Pricing</p>
            <h1 className="font-display text-5xl sm:text-6xl text-gray-900 dark:text-white font-light mb-4">
              Services
            </h1>
            <p className="section-subtitle max-w-lg mx-auto mb-8">
              Everything you need for nails and lashes that make you feel like the best version of yourself.
            </p>
            <Button onClick={() => setBookingOpen(true)} icon={<Calendar size={16} />}>
              Book an Appointment
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Service Cards ─────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0f0a0b]">
        <div className="container-xl section-padding space-y-16">
          {SERVICES_DATA.map((svc, idx) => (
            <AnimatedSection key={svc.title} delay={idx * 0.05}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-start ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Media */}
                <div className={idx % 2 !== 0 ? 'lg:order-2' : ''}>
                  <div className="relative rounded-3xl overflow-hidden aspect-square shadow-xl group">
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
                    <a
                      href={svc.instagramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full bg-white/90 dark:bg-black/70 backdrop-blur-sm text-xs font-body text-gray-700 dark:text-white hover:bg-white transition-colors shadow-md"
                    >
                      <Instagram size={13} /> View on Instagram
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className={`space-y-6 ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <div>
                    <span className="text-4xl mb-3 block">{svc.icon}</span>
                    <h2 className="font-display text-3xl sm:text-4xl text-gray-900 dark:text-white mb-3">{svc.title}</h2>
                    <p className="font-body text-gray-500 dark:text-gray-400 leading-relaxed">{svc.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-2">
                    {svc.items.map(item => (
                      <motion.div
                        key={item.name}
                        whileHover={{ x: 4 }}
                        className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-100 dark:border-white/10 hover:border-brand-200 dark:hover:border-brand-700/50 hover:bg-brand-50/50 dark:hover:bg-brand-900/10 transition-all group"
                      >
                        <div className="flex items-center gap-2">
                          {item.popular && (
                            <span className="px-1.5 py-0.5 rounded-md bg-brand-500 text-white text-xs font-body font-medium">
                              Popular
                            </span>
                          )}
                          <span className="font-body text-sm text-gray-800 dark:text-gray-200">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          {item.duration && (
                            <span className="font-body text-xs text-gray-400">{item.duration}</span>
                          )}
                          <span className="font-display text-lg text-brand-600 dark:text-brand-400 font-medium">
                            {item.price !== null ? `$${item.price}` : item.priceLabel}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setBookingOpen(true)}
                    icon={<Calendar size={15} />}
                  >
                    Book {svc.title}
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── Gallery Strip ──────────────────────────────────── */}
      <section className="py-14 bg-brand-50/50 dark:bg-[#130b0d]">
        <div className="container-xl section-padding">
          <AnimatedSection className="text-center mb-10">
            <p className="font-body text-sm text-brand-500 font-medium tracking-widest uppercase mb-2">Gallery</p>
            <h2 className="font-display text-3xl text-gray-900 dark:text-white">Recent work</h2>
          </AnimatedSection>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {GALLERY.map(({ src, alt }, i) => (
              <AnimatedSection key={src} delay={i * 0.06}>
                <motion.div
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-glow transition-shadow"
                >
                  <img src={src} alt={alt} className="w-full h-full object-cover" />
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="https://www.instagram.com/beautybyamy000"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" icon={<Instagram size={15} />}>
                See More on Instagram
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── What's Included ───────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-[#0f0a0b]">
        <div className="container-xl section-padding">
          <AnimatedSection className="text-center mb-10">
            <h2 className="font-display text-3xl text-gray-900 dark:text-white mb-3">Every appointment includes</h2>
            <p className="section-subtitle">No surprises. Just a premium experience every time.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              'Professional-grade products',
              'Sanitized tools & hygienic environment',
              'Nail shaping & cuticle care',
              'Design consultation',
              'Aftercare instructions',
              'Photo documentation',
              '100% satisfaction guarantee',
              'Easy rebooking',
            ].map((item, i) => (
              <AnimatedSection key={item} delay={i * 0.04}>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                  <Check size={14} className="text-brand-500 shrink-0" />
                  <span className="font-body text-sm text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gift cert disclaimer ──────────────────────────── */}
      <div className="bg-brand-50 dark:bg-[#130b0d] text-center py-4 font-body text-xs text-gray-400 dark:text-gray-500">
        * Gift Certificates expire at year end. Non-refundable. Valid for listed services only.
      </div>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
