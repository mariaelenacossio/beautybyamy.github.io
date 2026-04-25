import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Instagram, ArrowRight, Award, Shield, Sparkles, Heart } from 'lucide-react'
import BookingModal from '../components/booking/BookingModal'

const BASE = import.meta.env.BASE_URL

const CREDENTIALS = [
  { icon: Award,    label: '4+ Years Professional Experience' },
  { icon: Shield,   label: 'Licensed & Certified Nail Technician' },
  { icon: Sparkles, label: 'Trained in Latest Techniques' },
  { icon: Heart,    label: '500+ Satisfied Clients' },
]

const VALUES = [
  { no: '01', title: 'Precision',   desc: 'Every nail, every lash — crafted with meticulous attention to detail.' },
  { no: '02', title: 'Cleanliness', desc: 'Fully sanitized tools and a hygienic workspace, every single visit.'  },
  { no: '03', title: 'Connection',  desc: 'Building genuine relationships, not just appointments.'                 },
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

export default function About() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      {/* ── Hero Grid ─────────────────────────────────────── */}
      <section className="border-b border-editorial/10 dark:border-white/8">
        <div className="hidden lg:grid" style={{ gridTemplateColumns: '1.3fr 1fr', minHeight: '70vh' }}>
          {/* Left: Amy photo */}
          <div className="relative overflow-hidden border-r border-editorial/10 dark:border-white/8 group">
            <motion.img
              src={`${BASE}images/Amy-profile.png`}
              alt="Amy — Nail Technician & Beauty Specialist"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              initial={{ scale: 1.04, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-editorial/50 to-transparent" />
            {/* Bottom label */}
            <div className="absolute bottom-8 left-8">
              <p className="editorial-label text-white/60 mb-1">Beauty Specialist</p>
              <p className="font-display text-3xl italic text-white font-light">Amy</p>
            </div>
          </div>

          {/* Right: text */}
          <div className="bg-cream dark:bg-[#0D0808] p-12 pt-32 flex flex-col justify-between">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="editorial-label mb-5"
              >
                About Amy
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-editorial text-[clamp(3.5rem,5vw,5.5rem)] leading-none tracking-wide uppercase text-editorial dark:text-[#F0EBE8]"
              >
                HI,<br />
                <span className="font-display italic font-light text-[clamp(2rem,3.5vw,3.5rem)] text-brand-600">
                  I'm Amy.
                </span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-6"
            >
              <p className="font-body text-sm text-mid dark:text-[#A09590] leading-relaxed">
                I'm a beauty specialist passionate about nail art and eyelash extensions.
                Trained in the latest techniques and armed with an eye for detail,
                I'm here to make your hands — and eyes — look absolutely fantastic.
              </p>
              <div className="flex flex-col gap-3">
                <motion.button
                  onClick={() => setBookingOpen(true)}
                  whileHover={{ x: 4 }}
                  className="group flex items-center justify-between bg-brand-600 hover:bg-brand-700 text-white px-8 py-5 font-body text-xs font-medium tracking-widest uppercase transition-colors"
                >
                  Book with Amy
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </motion.button>
                <a
                  href="https://www.instagram.com/beautybyamy000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border border-editorial/15 dark:border-white/10 text-editorial dark:text-[#F0EBE8] px-8 py-5 font-body text-xs font-medium tracking-widest uppercase hover:border-editorial/30 transition-colors"
                >
                  <span className="flex items-center gap-2"><Instagram size={13} /> Follow on Instagram</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden" style={{ height: '60vh' }}>
            <img src={`${BASE}images/Amy-profile.png`} alt="Amy" className="w-full h-full object-cover object-top" />
            <div className="absolute inset-0 bg-gradient-to-t from-editorial/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="editorial-label text-white/60 mb-1">About</p>
              <h1 className="font-editorial text-5xl leading-none tracking-wide uppercase text-white">
                Hi, <span className="font-display italic font-light text-3xl text-brand-300">I'm Amy</span>
              </h1>
            </div>
          </div>
          <div className="section-padding py-10 space-y-5">
            <p className="font-body text-sm text-mid dark:text-[#A09590] leading-relaxed">
              I'm a beauty specialist passionate about nail art and eyelash extensions.
              Trained in the latest techniques and armed with an eye for detail.
            </p>
            <button
              onClick={() => setBookingOpen(true)}
              className="w-full bg-brand-600 text-white font-body text-xs font-medium tracking-widest uppercase py-4 hover:bg-brand-700 transition-colors"
            >
              Book with Amy
            </button>
          </div>
        </div>
      </section>

      {/* ── Credentials Strip ─────────────────────────────── */}
      <section className="border-b border-editorial/10 dark:border-white/8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {CREDENTIALS.map(({ icon: Icon, label }, i) => (
            <InView
              key={label}
              delay={i * 0.08}
              className={`flex items-center gap-4 p-8 ${
                i < CREDENTIALS.length - 1 ? 'border-b lg:border-b-0 border-r border-editorial/10 dark:border-white/8' : ''
              }`}
            >
              <div className="w-10 h-10 bg-brand-600 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-white" />
              </div>
              <span className="font-body text-xs text-mid dark:text-[#A09590] leading-snug">{label}</span>
            </InView>
          ))}
        </div>
      </section>

      {/* ── Story ─────────────────────────────────────────── */}
      <section className="border-b border-editorial/10 dark:border-white/8">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Story text */}
          <div className="section-padding py-16 sm:py-20 border-b lg:border-b-0 lg:border-r border-editorial/10 dark:border-white/8">
            <InView>
              <p className="editorial-label mb-5">My Story</p>
              <h2 className="font-editorial text-4xl sm:text-5xl tracking-wide uppercase text-editorial dark:text-[#F0EBE8] mb-8">
                Passion<br />Turned Into<br />Purpose
              </h2>
              <div className="space-y-5 font-body text-sm text-mid dark:text-[#A09590] leading-relaxed">
                <p>
                  I've always believed that beauty is a form of self-care — and that when you look good,
                  you feel unstoppable. That belief led me into the beauty industry, where I've spent
                  years honing my craft in nail artistry and eyelash extensions.
                </p>
                <p>
                  From intricate nail designs to perfectly applied volume lashes, every appointment
                  is a chance for me to blend artistry with technical skill. I stay current with
                  the latest trends and techniques so my clients always leave looking and feeling
                  their absolute best.
                </p>
                <p>
                  Working at Fancy Nails & Spa in Fairfax, Virginia, I serve clients who appreciate
                  quality, creativity, and a warm, personalized experience. Every set of nails tells a story —
                  and I'm here to help you tell yours.
                </p>
              </div>
            </InView>
          </div>

          {/* Values */}
          <div className="section-padding py-16 sm:py-20">
            <InView delay={0.1}>
              <p className="editorial-label mb-8">My Values</p>
              <div className="space-y-0">
                {VALUES.map((val, i) => (
                  <motion.div
                    key={val.no}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex gap-6 py-8 ${i < VALUES.length - 1 ? 'border-b border-editorial/10 dark:border-white/8' : ''}`}
                  >
                    <span className="font-body text-xs text-mid/40 dark:text-[#A09590]/40 mt-1">{val.no}</span>
                    <div>
                      <h3 className="font-editorial text-2xl tracking-wide uppercase text-editorial dark:text-[#F0EBE8] mb-2">
                        {val.title}
                      </h3>
                      <p className="font-body text-sm text-mid dark:text-[#A09590] leading-relaxed">{val.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </InView>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <InView className="container-xl section-padding text-center">
          <p className="editorial-label mb-4">Let's get started</p>
          <h2 className="font-editorial text-5xl sm:text-6xl lg:text-7xl tracking-wide uppercase text-editorial dark:text-[#F0EBE8] mb-10">
            BOOK WITH AMY
          </h2>
          <motion.button
            onClick={() => setBookingOpen(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex items-center gap-4 bg-brand-600 hover:bg-brand-700 text-white px-12 py-5 font-body text-sm font-medium tracking-widest uppercase transition-colors"
          >
            Book Appointment
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </InView>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
