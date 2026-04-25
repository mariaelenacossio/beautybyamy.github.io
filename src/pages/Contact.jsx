import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, Instagram, ArrowRight, CheckCircle } from 'lucide-react'
import BookingModal from '../components/booking/BookingModal'

const BASE = import.meta.env.BASE_URL

const CONTACT_INFO = [
  { icon: MapPin,    label: 'Location',   value: '13005 Lee Jackson Memorial Hwy\nFairfax, Virginia 22033', href: null },
  { icon: Phone,     label: 'Phone',      value: '(202) 845-0968', href: 'tel:+12028450968' },
  { icon: Mail,      label: 'Email',      value: 'beautybyamy@gmail.com', href: 'mailto:beautybyamy@gmail.com' },
  { icon: Instagram, label: 'Instagram',  value: '@beautybyamy000', href: 'https://www.instagram.com/beautybyamy000' },
]

function InView({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Contact() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [sent, setSent]   = useState(false)
  const [form, setForm]   = useState({
    name: '', phone: '', email: '', service: '', contact: [], message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', phone: '', email: '', service: '', contact: [], message: '' })
  }

  const toggleContact = (val) => {
    setForm(prev => ({
      ...prev,
      contact: prev.contact.includes(val)
        ? prev.contact.filter(v => v !== val)
        : [...prev.contact, val],
    }))
  }

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="border-b border-editorial/10 dark:border-white/8">
        <div className="hidden lg:grid" style={{ gridTemplateColumns: '1fr 1fr', minHeight: '42vh' }}>
          {/* Left */}
          <div className="section-padding pt-32 pb-12 border-r border-editorial/10 dark:border-white/8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="editorial-label mb-4"
            >
              Get in touch
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-editorial text-[clamp(4rem,7vw,7rem)] leading-none tracking-wide uppercase text-editorial dark:text-[#F0EBE8]"
            >
              LET'S<br />
              <span className="font-display italic font-light text-[clamp(2.5rem,4.5vw,4.5rem)] text-brand-600">
                connect.
              </span>
            </motion.h1>
          </div>
          {/* Right: contact info */}
          <div className="bg-cream dark:bg-[#0D0808] section-padding pt-32 pb-12 flex flex-col justify-end">
            <div className="space-y-6">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 bg-brand-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={13} className="text-white" />
                  </div>
                  <div>
                    <p className="font-body text-[10px] tracking-widest uppercase text-mid/60 dark:text-[#A09590]/60 mb-0.5">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="font-body text-sm text-editorial dark:text-[#F0EBE8] hover:text-brand-600 dark:hover:text-brand-400 transition-colors whitespace-pre-line"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="font-body text-sm text-editorial dark:text-[#F0EBE8] whitespace-pre-line">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile hero */}
        <div className="lg:hidden section-padding pt-24 pb-10 border-b border-editorial/10 dark:border-white/8">
          <p className="editorial-label mb-3">Get in touch</p>
          <h1 className="font-editorial text-5xl leading-none tracking-wide uppercase text-editorial dark:text-[#F0EBE8]">
            LET'S CONNECT
          </h1>
        </div>
      </section>

      {/* ── Main Content ──────────────────────────────────── */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* ── Contact Form ───── */}
          <div className="section-padding py-14 sm:py-20 border-b lg:border-b-0 lg:border-r border-editorial/10 dark:border-white/8">
            <InView>
              <p className="editorial-label mb-5">Send a message</p>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-6 py-16 text-center"
                >
                  <div className="w-16 h-16 bg-brand-600 flex items-center justify-center">
                    <CheckCircle size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-editorial text-3xl tracking-wide uppercase text-editorial dark:text-[#F0EBE8] mb-2">
                      Message Sent!
                    </h3>
                    <p className="font-body text-sm text-mid dark:text-[#A09590]">
                      Thanks for reaching out. I'll be in touch soon.
                    </p>
                  </div>
                  <button
                    onClick={() => setSent(false)}
                    className="font-body text-xs tracking-widest uppercase text-brand-600 hover:text-brand-700 transition-colors border-b border-brand-600/30 hover:border-brand-600 pb-0.5"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-body text-[10px] tracking-widest uppercase text-mid/60 dark:text-[#A09590]/60 mb-2">
                        Name <span className="text-brand-600">*</span>
                      </label>
                      <input
                        type="text" required
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        placeholder="Your name"
                        className="input-base"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-[10px] tracking-widest uppercase text-mid/60 dark:text-[#A09590]/60 mb-2">
                        Phone <span className="text-brand-600">*</span>
                      </label>
                      <input
                        type="tel" required
                        value={form.phone}
                        onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        placeholder="(202) 555-0100"
                        className="input-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-[10px] tracking-widest uppercase text-mid/60 dark:text-[#A09590]/60 mb-2">
                      Email <span className="text-brand-600">*</span>
                    </label>
                    <input
                      type="email" required
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="you@example.com"
                      className="input-base"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-[10px] tracking-widest uppercase text-mid/60 dark:text-[#A09590]/60 mb-2">
                      Interested in
                    </label>
                    <select
                      value={form.service}
                      onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                      className="input-base"
                    >
                      <option value="">Select a service</option>
                      <option value="nails">Nail services</option>
                      <option value="lashes">Eyelash extensions</option>
                      <option value="gift">Gift certificate</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-body text-[10px] tracking-widest uppercase text-mid/60 dark:text-[#A09590]/60 mb-3">
                      Preferred contact
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Phone Call', 'Email', 'Text Message'].map(opt => {
                        const active = form.contact.includes(opt)
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => toggleContact(opt)}
                            className={`font-body text-[10px] font-medium tracking-widest uppercase px-4 py-2.5 border transition-all duration-150 ${
                              active
                                ? 'bg-brand-600 border-brand-600 text-white'
                                : 'border-editorial/15 dark:border-white/10 text-editorial dark:text-[#F0EBE8] hover:border-editorial/30 dark:hover:border-white/20'
                            }`}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-[10px] tracking-widest uppercase text-mid/60 dark:text-[#A09590]/60 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      placeholder="Tell me what you're looking for..."
                      className="input-base resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center justify-between w-full bg-brand-600 hover:bg-brand-700 text-white px-8 py-5 font-body text-xs font-medium tracking-widest uppercase transition-colors"
                  >
                    Send Message
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </form>
              )}
            </InView>
          </div>

          {/* ── Right side: map + book CTA ── */}
          <div className="flex flex-col">
            {/* Map */}
            <div className="flex-1 border-b border-editorial/10 dark:border-white/8 overflow-hidden" style={{ minHeight: '300px' }}>
              <iframe
                title="Salon location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.973995725502!2d-77.39815928465013!3d38.87883677957352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b645e6af33a769%3A0xbe8a5804b23939f4!2s13005%20Lee%20Jackson%20Memorial%20Hwy%2C%20Fairfax%2C%20VA%2022033%2C%20USA!5e0!3m2!1sen!2sca!4v1649231917918!5m2!1sen!2sca"
                width="100%" height="100%"
                style={{ border: 0, display: 'block', minHeight: '300px' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Mobile contact info */}
            <div className="lg:hidden section-padding py-10 border-b border-editorial/10 dark:border-white/8 space-y-5">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-brand-600 flex items-center justify-center shrink-0">
                    <Icon size={13} className="text-white" />
                  </div>
                  <div>
                    <p className="font-body text-[10px] tracking-widest uppercase text-mid/50 mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                        className="font-body text-sm text-editorial dark:text-[#F0EBE8] hover:text-brand-600 transition-colors whitespace-pre-line">
                        {value}
                      </a>
                    ) : (
                      <p className="font-body text-sm text-editorial dark:text-[#F0EBE8] whitespace-pre-line">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Book CTA */}
            <InView className="section-padding py-10 bg-cream dark:bg-[#0D0808]">
              <p className="editorial-label mb-3">Skip the form</p>
              <h3 className="font-editorial text-3xl tracking-wide uppercase text-editorial dark:text-[#F0EBE8] mb-5">
                Book Online Now
              </h3>
              <motion.button
                onClick={() => setBookingOpen(true)}
                whileHover={{ x: 4 }}
                className="group flex items-center gap-4 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 font-body text-xs font-medium tracking-widest uppercase transition-colors"
              >
                Book Appointment
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </InView>
          </div>
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
