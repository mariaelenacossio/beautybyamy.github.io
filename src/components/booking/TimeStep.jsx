import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { TIME_SLOTS } from '../../context/BookingContext'
import { useBooking } from '../../context/BookingContext'

export default function TimeStep({ booking, update, onNext, onBack }) {
  const { isSlotTaken } = useBooking()

  return (
    <div className="space-y-4">
      <p className="font-body text-sm text-gray-500 dark:text-gray-400">
        Choose an available time slot.
      </p>

      <div className="grid grid-cols-3 gap-2">
        {TIME_SLOTS.map((slot, i) => {
          const taken    = isSlotTaken(booking.date, slot)
          const selected = booking.time === slot

          return (
            <motion.button
              key={slot}
              onClick={() => !taken && update({ time: slot })}
              disabled={taken}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileHover={!taken ? { scale: 1.05 } : {}}
              whileTap={!taken ? { scale: 0.95 } : {}}
              className={[
                'relative py-3 rounded-xl font-body text-sm font-medium transition-all',
                selected ? 'bg-brand-600 text-white shadow-md' : '',
                !selected && !taken ? 'bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:border-brand-400 dark:hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20' : '',
                taken ? 'bg-gray-100 dark:bg-white/5 text-gray-300 dark:text-gray-600 cursor-not-allowed line-through' : '',
              ].join(' ')}
            >
              <div className="flex flex-col items-center gap-0.5">
                <Clock size={12} className={selected ? 'text-white/70' : 'text-gray-400'} />
                <span>{slot}</span>
              </div>
              {taken && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="sr-only">Unavailable</span>
                </span>
              )}
            </motion.button>
          )
        })}
      </div>

      {booking.time && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-50 dark:bg-brand-900/20 rounded-xl px-4 py-3"
        >
          <p className="font-body text-sm text-brand-700 dark:text-brand-300 font-medium">
            Selected: {booking.time}
          </p>
        </motion.div>
      )}

      <div className="flex gap-3 pt-1">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-full border border-gray-200 dark:border-white/20 font-body text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
        >
          Back
        </button>
        <motion.button
          onClick={onNext}
          disabled={!booking.time}
          whileHover={{ scale: booking.time ? 1.02 : 1 }}
          whileTap={{ scale: booking.time ? 0.98 : 1 }}
          className="flex-[2] py-3 rounded-full bg-brand-600 hover:bg-brand-700 disabled:bg-gray-200 dark:disabled:bg-white/10 disabled:text-gray-400 text-white font-body font-medium text-sm transition-all shadow-md disabled:shadow-none disabled:cursor-not-allowed"
        >
          Continue
        </motion.button>
      </div>
    </div>
  )
}
