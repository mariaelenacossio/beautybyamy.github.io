import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Instagram, Send, Calendar, CheckCircle } from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection'
import Button from '../components/ui/Button'
import BookingModal from '../components/booking/BookingModal'

const inputCls = 'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 font-body text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all'

export default function Contact() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', contact: [], message: '' })

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
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 bg-gradient-to-b from-brand-50 to-white dark:from-[#130b0d] dark:to-[#0f0a0b]">
        <div className="container-xl section-padding text-center">
          <AnimatedSection>
            <p className="font-body text-sm text-brand-500 font-medium tracking-widest uppercase mb-3">Get in Touch</p>
            <h1 className="font-display text-5xl sm:text-6xl text-gray-900 dark:text-white font-light mb-4">
              Let's connect
            </h1>
            <p className="section-subtitle max-w-md mx-auto mb-8">
              Have a question or want to book? I'd love to hear from you.
            </p>
            <Button onClick={() => setBookingOpen(true)} icon={<Calendar size={16} />}>
              Book Online — It's Quick!
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Main content ──────────────────────────────────── */}
      <section className="py-16 bg-white dark:bg-[#0f0a0b]">
        <div className="container-xl section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <AnimatedSection>
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-3xl text-gray-900 dark:text-white mb-2">Salon location</h2>
                  <p className="font-body text-gray-500 dark:text-gray-400 text-sm">
                    Fancy Nails & Spa · Fairfax, Virginia
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: MapPin,    label: 'Address',   value: '13005 Lee Jackson Memorial Hwy, Fairfax, VA 22033', href: null },
                    { icon: Phone,     label: 'Phone',     value: '(202) 845-0968', href: 'tel:+12028450968'           },
                    { icon: Mail,      label: 'Email',     value: 'beautybyamy@gmail.com', href: 'mailto:beautybyamy@gmail.com' },
                    { icon: Instagram, label: 'Instagram', value: '@beautybyamy000', href: 'https://www.instagram.com/beautybyamy000' },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4 p-4 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-brand-200 dark:hover:border-brand-700/50 transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0 group-hover:bg-brand-100 dark:group-hover:bg-brand-900/50 transition-colors">
                        <Icon size={17} className="text-brand-600 dark:text-brand-400" />
                      </div>
                      <div>
                        <p className="font-body text-xs text-gray-400 dark:text-gray-500 mb-0.5">{label}</p>
                        {href ? (
                          <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                            className="font-body text-sm text-gray-800 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                            {value}
                          </a>
                        ) : (
                          <p className="font-body text-sm text-gray-800 dark:text-gray-200">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Map */}
                <div className="rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm">
                  <iframe
                    title="Salon location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.973995725502!2d-77.39815928465013!3d38.87883677957352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b645e6af33a769%3A0xbe8a5804b23939f4!2s13005%20Lee%20Jackson%20Memorial%20Hwy%2C%20Fairfax%2C%20VA%2022033%2C%20USA!5e0!3m2!1sen!2sca!4v1649231917918!5m2!1sen!2sca"
                    width="100%" height="260"
                    style={{ border: 0, display: 'block' }}
                    allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection direction="left" delay={0.1}>
              <div className="bg-gray-50 dark:bg-[#1a1012] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-white/10">
                <h2 className="font-display text-2xl text-gray-900 dark:text-white mb-1">Send a message</h2>
                <p className="font-body text-sm text-gray-500 dark:text-gray-400 mb-6">
                  I'll get back to you within 24 hours.
                </p>

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-4 py-10 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                      <CheckCircle size={32} className="text-brand-600 dark:text-brand-400" />
                    </div>
                    <h3 className="font-display text-2xl text-gray-900 dark:text-white">Message sent!</h3>
                    <p className="font-body text-sm text-gray-500 dark:text-gray-400">
                      Thanks for reaching out. I'll be in touch soon.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="font-body text-sm text-brand-500 hover:text-brand-600 transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-body text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                          First Name <span className="text-brand-500">*</span>
                        </label>
                        <input
                          type="text" required
                          value={form.name}
                          onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                          placeholder="Your name"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="block font-body text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                          Phone <span className="text-brand-500">*</span>
                        </label>
                        <input
                          type="tel" required
                          value={form.phone}
                          onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                          placeholder="(202) 555-0100"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-body text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                        Email <span className="text-brand-500">*</span>
                      </label>
                      <input
                        type="email" required
                        value={form.email}
                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        placeholder="you@example.com"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <label className="block font-body text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                        Interested in
                      </label>
                      <select
                        value={form.service}
                        onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                        className={inputCls}
                      >
                        <option value="">Select a service</option>
                        <option value="appointment">Book an appointment</option>
                        <option value="nails">Nail services</option>
                        <option value="lashes">Eyelash extensions</option>
                        <option value="gift">Gift certificate</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-body text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                        Preferred contact method
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Phone Call', 'Email', 'Text Message'].map(opt => {
                          const active = form.contact.includes(opt)
                          return (
                            <motion.button
                              key={opt}
                              type="button"
                              onClick={() => toggleContact(opt)}
                              whileTap={{ scale: 0.96 }}
                              className={`px-3 py-1.5 rounded-full border font-body text-xs transition-all ${
                                active
                                  ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                                  : 'border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-brand-300 dark:hover:border-brand-600/50'
                              }`}
                            >
                              {opt}
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block font-body text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                        Message
                      </label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                        placeholder="Tell me what you're looking for..."
                        className={`${inputCls} resize-none`}
                      />
                    </div>

                    <Button type="submit" fullWidth size="lg" icon={<Send size={15} />}>
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
