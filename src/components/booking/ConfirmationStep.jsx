import { motion } from 'framer-motion'
import { Calendar, Clock, Scissors } from 'lucide-react'
import { formatDisplayDate } from '../../utils/dateUtils'

export default function ConfirmationStep({ booking, onClose }) {
  return (
    <div className="flex flex-col items-center text-center py-4 space-y-6">
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-glow"
      >
        <motion.svg
          viewBox="0 0 50 50"
          className="w-10 h-10"
          initial="hidden"
          animate="visible"
        >
          <motion.path
            d="M14 25 L22 33 L36 18"
            fill="none"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden:  { pathLength: 0, opacity: 0 },
              visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, delay: 0.3, ease: 'easeOut' } },
            }}
          />
        </motion.svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="font-display text-2xl text-gray-900 dark:text-white mb-1">
          You're all set!
        </h3>
        <p className="font-body text-sm text-gray-500 dark:text-gray-400">
          Booking confirmed for <strong className="text-gray-700 dark:text-gray-200">{booking.clientName}</strong>
        </p>
      </motion.div>

      {/* Summary chips */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full bg-brand-50 dark:bg-brand-900/20 rounded-2xl p-4 space-y-3"
      >
        <InfoRow icon={Scissors} label="Service" value={booking.serviceName} />
        <InfoRow icon={Calendar} label="Date"    value={formatDisplayDate(booking.date)} />
        <InfoRow icon={Clock}    label="Time"    value={booking.time} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="font-body text-xs text-gray-400 dark:text-gray-500"
      >
        A confirmation has been sent to <strong>{booking.clientEmail}</strong>.<br />
        We'll send a reminder 24 hours before your appointment.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        onClick={onClose}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-body font-medium text-sm transition-all shadow-md hover:shadow-glow"
      >
        Done — Close
      </motion.button>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 text-left">
      <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center shrink-0">
        <Icon size={14} className="text-brand-600 dark:text-brand-400" />
      </div>
      <div>
        <p className="font-body text-xs text-gray-400 dark:text-gray-500">{label}</p>
        <p className="font-body text-sm text-gray-800 dark:text-gray-200 font-medium">{value}</p>
      </div>
    </div>
  )
}
