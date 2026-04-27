import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Phone, Mail, Instagram, ArrowRight, CheckCircle } from 'lucide-react'
import BookingModal from '../components/booking/BookingModal'

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

const CONTACT_ITEMS = [
  { icon: MapPin,    label: 'Location',  value: '13005 Lee Jackson Memorial Hwy\nFairfax, Virginia 22033', href: null },
  { icon: Phone,     label: 'Phone',     value: '(202) 845-0968', href: 'tel:+12028450968' },
  { icon: Mail,      label: 'Email',     value: 'beautybyamy@gmail.com', href: 'mailto:beautybyamy@gmail.com' },
  { icon: Instagram, label: 'Instagram', value: '@beautybyamy000', href: 'https://www.instagram.com/beautybyamy000' },
]

export default function Contact() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [sent, setSent]   = useState(false)
  const [form, setForm]   = useState({ name: '', phone: '', email: '', service: '', contact: [], message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', phone: '', email: '', service: '', contact: [], message: '' })
  }

  const toggleContact = (val) => {
    setForm(p => ({
      ...p,
      contact: p.contact.includes(val) ? p.contact.filter(v => v !== val) : [...p.contact, val],
    }))
  }

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-warm-50 dark:bg-warm-900">
        <div className="wrap text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="label mb-4">Get in touch</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal text-warm-900 dark:text-warm-100 mb-5">
              Let's connect
            </h1>
            <p className="body-lg max-w-md mx-auto mb-8">
              Have a question or want to book? I'd love to hear from you.
            </p>
            <motion.button
              onClick={() => setBookingOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-3.5 rounded-full font-body text-sm font-medium transition-colors shadow-soft"
            >
              Book Online — It's Quick
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Main ──────────────────────────────────────────── */}
      <section className="section border-t border-warm-200 dark:border-warm-700 bg-white dark:bg-warm-800">
        <div className="wrap-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Contact info */}
            <Reveal>
              <p className="label mb-6">Find me</p>
              <h2 className="font-display text-3xl font-normal text-warm-900 dark:text-warm-100 mb-8">
                Salon location
              </h2>

              <div className="space-y-5 mb-10">
                {CONTACT_ITEMS.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={16} className="text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                      <p className="font-body text-2xs text-warm-400 dark:text-warm-500 tracking-widest uppercase mb-0.5">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="font-body text-sm text-warm-800 dark:text-warm-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors whitespace-pre-line"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="font-body text-sm text-warm-800 dark:text-warm-200 whitespace-pre-line">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-warm-200 dark:border-warm-700 shadow-soft">
                <iframe
                  title="Salon location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.973995725502!2d-77.39815928465013!3d38.87883677957352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b645e6af33a769%3A0xbe8a5804b23939f4!2s13005%20Lee%20Jackson%20Memorial%20Hwy%2C%20Fairfax%2C%20VA%2022033%2C%20USA!5e0!3m2!1sen!2sca!4v1649231917918!5m2!1sen!2sca"
                  width="100%" height="220"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>

            {/* Contact form */}
            <Reveal delay={0.1}>
              <div className="bg-warm-50 dark:bg-warm-900 rounded-2xl p-7 sm:p-8 border border-warm-200 dark:border-warm-700">
                <p className="label mb-3">Send a message</p>
                <h2 className="font-display text-2xl font-normal text-warm-900 dark:text-warm-100 mb-6">
                  I'll reply within 24 hours
                </h2>

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-5 py-14 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center">
                      <CheckCircle size={28} className="text-brand-600 dark:text-brand-400" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-normal text-warm-900 dark:text-warm-100 mb-2">Message sent!</h3>
                      <p className="body-sm">Thanks for reaching out. I'll be in touch soon.</p>
                    </div>
                    <button
                      onClick={() => setSent(false)}
                      className="font-body text-sm text-brand-600 dark:text-brand-400 hover:underline transition-all"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block font-body text-xs font-medium text-warm-600 dark:text-warm-400 mb-1.5">
                          Name <span className="text-brand-500">*</span>
                        </label>
                        <input
                          type="text" required
                          value={form.name}
                          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                          placeholder="Your name"
                          className="input"
                        />
                      </div>
                      <div>
                        <label className="block font-body text-xs font-medium text-warm-600 dark:text-warm-400 mb-1.5">
                          Phone <span className="text-brand-500">*</span>
                        </label>
                        <input
                          type="tel" required
                          value={form.phone}
                          onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                          placeholder="(202) 555-0100"
                          className="input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-body text-xs font-medium text-warm-600 dark:text-warm-400 mb-1.5">
                        Email <span className="text-brand-500">*</span>
                      </label>
                      <input
                        type="email" required
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        placeholder="you@example.com"
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="block font-body text-xs font-medium text-warm-600 dark:text-warm-400 mb-1.5">
                        Interested in
                      </label>
                      <select
                        value={form.service}
                        onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                        className="input"
                      >
                        <option value="">Select a service</option>
                        <option>Nail services</option>
                        <option>Eyelash extensions</option>
                        <option>Gift certificate</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-body text-xs font-medium text-warm-600 dark:text-warm-400 mb-2">
                        Preferred contact method
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Phone Call', 'Email', 'Text Message'].map(opt => {
                          const active = form.contact.includes(opt)
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => toggleContact(opt)}
                              className={[
                                'px-4 py-2 rounded-full border font-body text-xs transition-all',
                                active
                                  ? 'bg-brand-600 border-brand-600 text-white shadow-soft'
                                  : 'border-warm-200 dark:border-warm-600 text-warm-600 dark:text-warm-300 hover:border-brand-300 hover:text-brand-600 dark:hover:text-brand-400',
                              ].join(' ')}
                            >
                              {opt}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block font-body text-xs font-medium text-warm-600 dark:text-warm-400 mb-1.5">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        placeholder="Tell me what you're looking for..."
                        className="input resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white py-3.5 rounded-full font-body text-sm font-medium transition-colors shadow-soft group"
                    >
                      Send Message
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </motion.button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
