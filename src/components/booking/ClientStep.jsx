import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MessageSquare } from 'lucide-react'

function Field({ label, icon: Icon, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 font-body text-sm font-medium text-gray-700 dark:text-gray-300">
        <Icon size={14} className="text-brand-500" />
        {label}
      </label>
      {children}
      {error && <p className="font-body text-xs text-red-500">{error}</p>}
    </div>
  )
}

const inputCls = 'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 font-body text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all'

export default function ClientStep({ booking, update, onNext, onBack }) {
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!booking.clientName.trim()) e.clientName = 'Name is required'
    if (!booking.clientEmail.trim() || !/\S+@\S+\.\S+/.test(booking.clientEmail)) e.clientEmail = 'Valid email is required'
    if (!booking.clientPhone.trim()) e.clientPhone = 'Phone number is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (validate()) onNext()
  }

  return (
    <div className="space-y-4">
      <p className="font-body text-sm text-gray-500 dark:text-gray-400">
        Tell us about yourself so we can confirm your appointment.
      </p>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
        <Field label="Full Name" icon={User} error={errors.clientName}>
          <input
            type="text"
            value={booking.clientName}
            onChange={e => { update({ clientName: e.target.value }); setErrors(p => ({ ...p, clientName: '' })) }}
            placeholder="Your full name"
            className={inputCls}
          />
        </Field>

        <Field label="Email Address" icon={Mail} error={errors.clientEmail}>
          <input
            type="email"
            value={booking.clientEmail}
            onChange={e => { update({ clientEmail: e.target.value }); setErrors(p => ({ ...p, clientEmail: '' })) }}
            placeholder="you@example.com"
            className={inputCls}
          />
        </Field>

        <Field label="Phone Number" icon={Phone} error={errors.clientPhone}>
          <input
            type="tel"
            value={booking.clientPhone}
            onChange={e => { update({ clientPhone: e.target.value }); setErrors(p => ({ ...p, clientPhone: '' })) }}
            placeholder="(202) 555-0100"
            className={inputCls}
          />
        </Field>

        <Field label="Notes (optional)" icon={MessageSquare}>
          <textarea
            value={booking.notes}
            onChange={e => update({ notes: e.target.value })}
            placeholder="Any special requests or nail inspiration?"
            rows={3}
            className={`${inputCls} resize-none`}
          />
        </Field>
      </motion.div>

      <div className="flex gap-3 pt-1">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-full border border-gray-200 dark:border-white/20 font-body text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
        >
          Back
        </button>
        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-[2] py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-medium text-sm transition-all shadow-md hover:shadow-glow"
        >
          Review Booking
        </motion.button>
      </div>
    </div>
  )
}
