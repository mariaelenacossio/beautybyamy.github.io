import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, Star, Award, Users, ArrowRight, Sparkles } from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import BookingModal from '../components/booking/BookingModal'

const STATS = [
  { icon: Users,  value: '500+', label: 'Happy Clients'      },
  { icon: Award,  value: '4+',   label: 'Years Experience'   },
  { icon: Star,   value: '5.0',  label: 'Average Rating'     },
  { icon: Sparkles, value: '100%', label: 'Satisfaction Rate' },
]

const TESTIMONIALS = [
  {
    name: 'Denisse C.', quote: 'Beyond gorgeous. Very modern and clean. Amy is the best nail technician I\'ve ever had.',
    img: '/images/img-1.png', link: 'https://www.instagram.com/p/CZctmlZPkR9/',
  },
  {
    name: 'Luisa A.', quote: 'Every visit is always a wonderful experience. She creates the most beautiful designs.',
    img: '/images/img-2.png', link: 'https://www.instagram.com/p/CZcthIePoOd/',
  },
  {
    name: 'Mariaelena C.', quote: 'Best nail technician in the state. I will never go anywhere else ever again.',
    img: '/images/Nails-5.png', link: 'https://www.instagram.com/p/CKRyVUml2ib/',
  },
]

const PREVIEW_SERVICES = [
  { title: 'Nail Care',        desc: 'Acrylic fullsets, refills & dipping powder — crafted to perfection.', icon: '💅', from: '$55' },
  { title: 'Eyelash Extensions', desc: 'Classic & volume sets that make your eyes truly unforgettable.',    icon: '✨', from: '$155' },
  { title: 'Gift Certificates',  desc: 'The perfect gift for someone you love. Redeemable for any service.', icon: '🎁', from: '$100' },
]

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <video
            src="/images/AmyBanner.mp4"
            autoPlay muted loop playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container-xl section-padding pt-24 pb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <span className="text-xs font-body text-white/80 tracking-wide">
                ✦ Nail Artistry & Eyelash Extensions — Fairfax, VA
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-tight mb-6"
            >
              Having your nails done
              <span className="block italic text-brand-300">is self-care.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-body text-lg text-white/75 mb-8 leading-relaxed"
            >
              Premium nail art and eyelash extensions, designed just for you.
              Book your appointment and transform how you feel — inside and out.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap gap-3"
            >
              <Button size="lg" onClick={() => setBookingOpen(true)} icon={<Calendar size={18} />}>
                Book Appointment
              </Button>
              <Button variant="white" size="lg">
                <Link to="/services" className="flex items-center gap-2">
                  View Services <ArrowRight size={16} />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-px h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0"
          />
        </motion.div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0f0a0b] border-y border-gray-100 dark:border-white/10">
        <div className="container-xl section-padding py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
            {STATS.map(({ icon: Icon, value, label }, i) => (
              <AnimatedSection key={label} delay={i * 0.1}>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center">
                    <Icon size={18} className="text-brand-600 dark:text-brand-400" />
                  </div>
                  <span className="font-display text-3xl sm:text-4xl text-gray-900 dark:text-white">{value}</span>
                  <span className="font-body text-sm text-gray-500 dark:text-gray-400">{label}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Preview ──────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-brand-50/50 dark:bg-[#130b0d]">
        <div className="container-xl section-padding">
          <AnimatedSection className="text-center mb-14">
            <p className="font-body text-sm text-brand-500 font-medium tracking-widest uppercase mb-3">What I Offer</p>
            <h2 className="section-title text-gray-900 dark:text-white mb-4">Services made for you</h2>
            <p className="section-subtitle max-w-md mx-auto">
              Whether it's stunning nail art or fluttery lashes, every appointment is tailored to you.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PREVIEW_SERVICES.map((svc, i) => (
              <AnimatedSection key={svc.title} delay={i * 0.1}>
                <Card className="h-full text-center group hover:border-brand-200 dark:hover:border-brand-700/50 transition-colors">
                  <div className="flex flex-col items-center gap-4">
                    <motion.span
                      className="text-4xl"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {svc.icon}
                    </motion.span>
                    <h3 className="font-display text-xl text-gray-900 dark:text-white">{svc.title}</h3>
                    <p className="font-body text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{svc.desc}</p>
                    <div className="flex items-center justify-between w-full pt-3 border-t border-gray-100 dark:border-white/10">
                      <span className="font-body text-xs text-gray-400">Starting from</span>
                      <span className="font-display text-lg text-brand-600 dark:text-brand-400">{svc.from}</span>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4} className="text-center mt-10">
            <Link to="/services">
              <Button variant="outline" size="lg">
                See Full Price List <ArrowRight size={16} />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-white dark:bg-[#0f0a0b]">
        <div className="container-xl section-padding">
          <AnimatedSection className="text-center mb-14">
            <p className="font-body text-sm text-brand-500 font-medium tracking-widest uppercase mb-3">Client Love</p>
            <h2 className="section-title text-gray-900 dark:text-white">What my clients say</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, quote, img, link }, i) => (
              <AnimatedSection key={name} delay={i * 0.1}>
                <Card className="flex flex-col gap-5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="fill-brand-400 text-brand-400" />
                    ))}
                  </div>
                  <p className="font-body text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">
                    "{quote}"
                  </p>
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100 dark:border-white/10">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        src={img}
                        alt={`${name}'s nails`}
                        className="w-12 h-12 rounded-full object-cover border-2 border-brand-200"
                      />
                    </a>
                    <div>
                      <p className="font-body text-sm font-semibold text-gray-800 dark:text-gray-200">{name}</p>
                      <p className="font-body text-xs text-gray-400">Verified Client</p>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/BG3-about.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/85 to-brand-700/75" />
        </div>
        <div className="relative z-10 container-xl section-padding py-20 text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-light mb-4">
              Ready for your<br /><span className="italic text-brand-300">dream nails?</span>
            </h2>
            <p className="font-body text-white/70 text-lg mb-8 max-w-md mx-auto">
              Book your appointment in under 2 minutes — no calls, no waiting.
            </p>
            <Button size="xl" variant="white" onClick={() => setBookingOpen(true)} icon={<Calendar size={20} />}>
              Book Now
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Newsletter ────────────────────────────────────── */}
      <section className="py-14 bg-brand-600 dark:bg-brand-800">
        <div className="container-xl section-padding">
          <AnimatedSection className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-3xl text-white mb-2">Stay in the loop</h3>
            <p className="font-body text-white/70 text-sm mb-6">
              Get exclusive offers, nail inspo & appointment reminders.
            </p>
            <form
              onSubmit={e => e.preventDefault()}
              className="flex gap-2 flex-col sm:flex-row"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 font-body text-sm focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              />
              <Button variant="white" type="submit">Subscribe</Button>
            </form>
          </AnimatedSection>
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
