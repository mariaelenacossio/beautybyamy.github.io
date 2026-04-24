import { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Calendar, Heart, Award, Sparkles, Shield } from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'
import Button from '../components/ui/Button'
import BookingModal from '../components/booking/BookingModal'

const CREDENTIALS = [
  { icon: Award,    label: '4+ Years Professional Experience' },
  { icon: Shield,   label: 'Licensed & Certified Nail Technician' },
  { icon: Sparkles, label: 'Trained in Latest Techniques' },
  { icon: Heart,    label: '500+ Satisfied Clients' },
]

const VALUES = [
  { title: 'Precision',   desc: 'Every nail, every lash — crafted with meticulous attention to detail.' },
  { title: 'Cleanliness', desc: 'Fully sanitized tools and a hygienic workspace, every single visit.'  },
  { title: 'Connection',  desc: 'Building genuine relationships, not just appointments.'                 },
]

export default function About() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative pt-28 pb-0 bg-gradient-to-b from-brand-50 to-white dark:from-[#130b0d] dark:to-[#0f0a0b] overflow-hidden">
        <div className="container-xl section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            {/* Text */}
            <AnimatedSection className="pb-12 lg:pb-20">
              <p className="font-body text-sm text-brand-500 font-medium tracking-widest uppercase mb-4">
                About Amy
              </p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-gray-900 dark:text-white font-light leading-tight mb-6">
                Hi there! <br />
                <span className="italic text-brand-500">I'm Amy.</span>
              </h1>
              <p className="font-body text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                I'm a beauty specialist passionate about nail art and eyelash extensions.
                Trained in the latest techniques and armed with an eye for detail,
                I'm here to make your hands — and eyes — look absolutely fantastic.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => setBookingOpen(true)} icon={<Calendar size={16} />}>
                  Book with Amy
                </Button>
                <a
                  href="https://www.instagram.com/beautybyamy000"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" icon={<Instagram size={15} />}>
                    Follow on Instagram
                  </Button>
                </a>
              </div>
            </AnimatedSection>

            {/* Photo */}
            <AnimatedSection direction="left" className="relative">
              <div className="relative max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                  className="relative z-10"
                >
                  <img
                    src="/images/Amy-profile.png"
                    alt="Amy — Nail Technician & Beauty Specialist"
                    className="w-full rounded-3xl shadow-2xl shadow-brand-200/40 dark:shadow-brand-900/40"
                  />
                </motion.div>
                {/* Decorative blob */}
                <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-200/40 to-brand-400/20 dark:from-brand-900/30 dark:to-brand-700/10 blur-xl" />
                <div className="absolute bottom-6 -right-4 bg-white dark:bg-[#1a1012] rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100 dark:border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                    <Heart size={18} className="text-brand-600 dark:text-brand-400 fill-brand-200" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-gray-400">Client satisfaction</p>
                    <p className="font-display text-lg text-gray-900 dark:text-white font-medium">100%</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Credentials ───────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-[#0f0a0b] border-y border-gray-100 dark:border-white/10">
        <div className="container-xl section-padding">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CREDENTIALS.map(({ icon: Icon, label }, i) => (
              <AnimatedSection key={label} delay={i * 0.1}>
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-brand-50/50 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-800/30">
                  <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-brand-600 dark:text-brand-400" />
                  </div>
                  <span className="font-body text-sm text-gray-700 dark:text-gray-300">{label}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story ─────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white dark:bg-[#0f0a0b]">
        <div className="container-xl section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="font-body text-sm text-brand-500 font-medium tracking-widest uppercase mb-4">My Story</p>
              <h2 className="font-display text-4xl sm:text-5xl text-gray-900 dark:text-white font-light mb-6">
                Passion turned into purpose
              </h2>
              <div className="space-y-4 font-body text-gray-600 dark:text-gray-300 leading-relaxed">
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
                  Beyond the beauty work, I value genuine connection. I want every client to feel
                  welcomed, heard, and pampered from the moment they sit down.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {['/images/Home-1.jpg', '/images/Home-2.jpg', '/images/darren-nunis-cxE7SXKnzv0-unsplash.jpg', '/images/allef-vinicius-v75vjSfgLDc-unsplash.jpg'].map((src, i) => (
                  <motion.div
                    key={src}
                    whileHover={{ scale: 1.04, zIndex: 5 }}
                    className={`rounded-2xl overflow-hidden shadow-md ${i === 1 ? 'mt-6' : ''} ${i === 3 ? 'mt-6' : ''}`}
                  >
                    <img src={src} alt="Amy's work" className="w-full h-40 object-cover" />
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────── */}
      <section className="py-16 bg-brand-50/50 dark:bg-[#130b0d]">
        <div className="container-xl section-padding">
          <AnimatedSection className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl text-gray-900 dark:text-white">What drives me</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {VALUES.map(({ title, desc }, i) => (
              <AnimatedSection key={title} delay={i * 0.1}>
                <div className="text-center p-6 rounded-2xl bg-white dark:bg-[#1a1012] border border-gray-100 dark:border-white/10 shadow-sm">
                  <h3 className="font-display text-2xl text-brand-600 dark:text-brand-400 mb-3">{title}</h3>
                  <p className="font-body text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-16 text-center bg-white dark:bg-[#0f0a0b]">
        <AnimatedSection>
          <h2 className="font-display text-3xl sm:text-4xl text-gray-900 dark:text-white mb-4">
            Ready to meet in person?
          </h2>
          <p className="section-subtitle mb-8 max-w-sm mx-auto">
            I can't wait to create something beautiful for you.
          </p>
          <Button size="lg" onClick={() => setBookingOpen(true)} icon={<Calendar size={18} />}>
            Book Your Appointment
          </Button>
        </AnimatedSection>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
