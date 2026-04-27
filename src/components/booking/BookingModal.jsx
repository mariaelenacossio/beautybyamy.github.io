import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useBooking } from '../../context/BookingContext'
import ServiceStep from './ServiceStep'
import DateStep from './DateStep'
import TimeStep from './TimeStep'
import ClientStep from './ClientStep'
import ConfirmationStep from './ConfirmationStep'

const STEPS = ['Service', 'Date', 'Time', 'Your Details', 'Review']

const slideVariants = {
  enter:  (dir) => ({ x: dir > 0 ? 32 : -32, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir) => ({ x: dir > 0 ? -32 : 32, opacity: 0 }),
}

export default function BookingModal({ isOpen, onClose }) {
  const { addAppointment } = useBooking()
  const [step, setStep]       = useState(0)
  const [direction, setDir]   = useState(1)
  const [confirmed, setConfirmed] = useState(false)

  const [booking, setBooking] = useState({
    serviceId: '', serviceName: '', servicePrice: 0,
    date: '', time: '',
    clientName: '', clientEmail: '', clientPhone: '', notes: '',
  })

  const update = (patch) => setBooking(prev => ({ ...prev, ...patch }))

  const go = (nextStep) => {
    setDir(nextStep > step ? 1 : -1)
    setStep(nextStep)
  }

  const handleConfirm = () => {
    addAppointment(booking)
    setConfirmed(true)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setStep(0); setDir(1); setConfirmed(false)
      setBooking({ serviceId: '', serviceName: '', servicePrice: 0, date: '', time: '', clientName: '', clientEmail: '', clientPhone: '', notes: '' })
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-warm-900/50 dark:bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 32 }}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        className="relative w-full sm:max-w-lg bg-white dark:bg-warm-800 shadow-soft-lg rounded-t-2xl sm:rounded-2xl overflow-hidden border border-warm-100 dark:border-warm-700"
        style={{ maxHeight: '92dvh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-warm-100 dark:border-warm-700">
          <div>
            <p className="font-body text-2xs text-brand-500 font-medium uppercase tracking-widest mb-0.5">
              {confirmed ? 'Confirmed!' : `Step ${step + 1} of ${STEPS.length}`}
            </p>
            <h2 className="font-display text-xl font-normal text-warm-900 dark:text-warm-100">
              {confirmed ? 'See you soon ✨' : STEPS[step]}
            </h2>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="p-2 rounded-xl text-warm-400 hover:text-warm-700 dark:hover:text-warm-200 hover:bg-warm-100 dark:hover:bg-warm-700 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress dots */}
        {!confirmed && (
          <div className="flex gap-1.5 px-6 py-3 bg-warm-50 dark:bg-warm-900/50 border-b border-warm-100 dark:border-warm-700">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={[
                  'h-1.5 flex-1 rounded-full transition-all duration-500',
                  i <= step
                    ? 'bg-brand-500'
                    : 'bg-warm-200 dark:bg-warm-700',
                ].join(' ')}
              />
            ))}
          </div>
        )}

        {/* Step content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(92dvh - 130px)' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={confirmed ? 'done' : step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 py-6"
            >
              {confirmed ? (
                <ConfirmationStep booking={booking} onClose={handleClose} />
              ) : step === 0 ? (
                <ServiceStep booking={booking} update={update} onNext={() => go(1)} />
              ) : step === 1 ? (
                <DateStep booking={booking} update={update} onNext={() => go(2)} onBack={() => go(0)} />
              ) : step === 2 ? (
                <TimeStep booking={booking} update={update} onNext={() => go(3)} onBack={() => go(1)} />
              ) : step === 3 ? (
                <ClientStep booking={booking} update={update} onNext={() => go(4)} onBack={() => go(2)} />
              ) : (
                <ReviewSummary booking={booking} onBack={() => go(3)} onConfirm={handleConfirm} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

function ReviewSummary({ booking, onBack, onConfirm }) {
  const rows = [
    { label: 'Service', value: booking.serviceName },
    { label: 'Price',   value: `$${booking.servicePrice}` },
    { label: 'Date',    value: booking.date },
    { label: 'Time',    value: booking.time },
    { label: 'Name',    value: booking.clientName },
    { label: 'Email',   value: booking.clientEmail },
    { label: 'Phone',   value: booking.clientPhone },
    ...(booking.notes ? [{ label: 'Notes', value: booking.notes }] : []),
  ]

  return (
    <>
      <p className="font-body text-sm text-warm-500 dark:text-warm-400 mb-5">
        Please review your details before confirming.
      </p>
      <div className="rounded-xl overflow-hidden border border-warm-200 dark:border-warm-700 mb-4">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex justify-between px-4 py-3 border-b border-warm-100 dark:border-warm-700/70 last:border-0">
            <span className="font-body text-xs font-medium text-warm-400 dark:text-warm-500 uppercase tracking-wide">{label}</span>
            <span className="font-body text-sm text-warm-900 dark:text-warm-100 text-right max-w-[60%]">{value}</span>
          </div>
        ))}
      </div>
      <p className="font-body text-xs text-warm-400 dark:text-warm-500 mb-6">
        Confirmation sent to <strong className="text-warm-700 dark:text-warm-300">{booking.clientEmail}</strong>
      </p>
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-full border border-warm-200 dark:border-warm-600 font-body text-sm text-warm-600 dark:text-warm-300 hover:bg-warm-50 dark:hover:bg-warm-700 transition-all"
        >
          Back
        </button>
        <motion.button
          onClick={onConfirm}
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          className="flex-[2] py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-medium text-sm transition-colors shadow-soft"
        >
          Confirm Booking
        </motion.button>
      </div>
    </>
  )
}
