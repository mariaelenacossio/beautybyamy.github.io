import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useBooking } from '../../context/BookingContext'
import ServiceStep from './ServiceStep'
import DateStep from './DateStep'
import TimeStep from './TimeStep'
import ClientStep from './ClientStep'
import ConfirmationStep from './ConfirmationStep'

const STEPS = ['Service', 'Date', 'Time', 'Details', 'Confirm']

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
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
      setStep(0)
      setDir(1)
      setConfirmed(false)
      setBooking({ serviceId: '', serviceName: '', servicePrice: 0, date: '', time: '', clientName: '', clientEmail: '', clientPhone: '', notes: '' })
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Sheet / Dialog */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full sm:max-w-xl bg-white dark:bg-[#1a1012] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
        style={{ maxHeight: '92dvh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-white/10">
          <div>
            <p className="font-body text-xs text-brand-500 font-medium uppercase tracking-widest">
              {confirmed ? 'Booked!' : `Step ${step + 1} of ${STEPS.length}`}
            </p>
            <h2 className="font-display text-2xl text-gray-900 dark:text-white">
              {confirmed ? 'See you soon! ✨' : STEPS[step]}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X size={20} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Progress bar */}
        {!confirmed && (
          <div className="px-6 pt-3">
            <div className="flex gap-1.5">
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    i <= step ? 'bg-brand-500' : 'bg-gray-100 dark:bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step content */}
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(92dvh - 120px)' }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={confirmed ? 'done' : step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="px-6 py-5"
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
                <div className="space-y-5">
                  <ReviewSummary booking={booking} onBack={() => go(3)} onConfirm={handleConfirm} />
                </div>
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
    { label: 'Service',  value: booking.serviceName },
    { label: 'Price',    value: `$${booking.servicePrice}` },
    { label: 'Date',     value: booking.date },
    { label: 'Time',     value: booking.time },
    { label: 'Name',     value: booking.clientName },
    { label: 'Email',    value: booking.clientEmail },
    { label: 'Phone',    value: booking.clientPhone },
    ...(booking.notes ? [{ label: 'Notes', value: booking.notes }] : []),
  ]

  return (
    <>
      <p className="font-body text-sm text-gray-500 dark:text-gray-400 mb-4">
        Please review your booking details before confirming.
      </p>
      <div className="bg-brand-50 dark:bg-brand-900/20 rounded-2xl overflow-hidden">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex justify-between px-4 py-3 border-b border-brand-100/50 dark:border-white/5 last:border-0">
            <span className="font-body text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</span>
            <span className="font-body text-sm text-gray-900 dark:text-white text-right max-w-[60%]">{value}</span>
          </div>
        ))}
      </div>
      <p className="font-body text-xs text-gray-400 dark:text-gray-500 mt-3">
        A confirmation will be sent to <strong>{booking.clientEmail}</strong>
      </p>
      <div className="flex gap-3 mt-6">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-full border border-gray-200 dark:border-white/20 font-body text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
        >
          Back
        </button>
        <motion.button
          onClick={onConfirm}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-[2] py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-medium text-sm transition-colors shadow-md hover:shadow-glow"
        >
          Confirm Booking
        </motion.button>
      </div>
    </>
  )
}
