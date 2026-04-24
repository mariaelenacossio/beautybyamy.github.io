import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, addMonths, subMonths, isSameDay, parseISO } from 'date-fns'
import { getCalendarDays, WEEKDAY_LABELS, getMinBookingDate } from '../../utils/dateUtils'
import { useBooking } from '../../context/BookingContext'

export default function DateStep({ booking, update, onNext, onBack }) {
  const { isDayBlocked } = useBooking()
  const [viewMonth, setViewMonth] = useState(new Date())
  const minDate = getMinBookingDate()

  const days = getCalendarDays(viewMonth)

  const selectDate = (day) => {
    if (day.isPast || !day.isCurrentMonth || isDayBlocked(day.dateStr) || day.dateStr < minDate) return
    update({ date: day.dateStr })
  }

  return (
    <div className="space-y-4">
      <p className="font-body text-sm text-gray-500 dark:text-gray-400">
        Select a date for your appointment.
      </p>

      {/* Month nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setViewMonth(m => subMonths(m, 1))}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} className="text-gray-600 dark:text-gray-300" />
        </button>
        <span className="font-display text-base font-medium text-gray-900 dark:text-white">
          {format(viewMonth, 'MMMM yyyy')}
        </span>
        <button
          onClick={() => setViewMonth(m => addMonths(m, 1))}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={18} className="text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAY_LABELS.map(d => (
          <div key={d} className="text-center font-body text-xs text-gray-400 dark:text-gray-500 py-1">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isSelected   = booking.date === day.dateStr
          const isBlocked    = isDayBlocked(day.dateStr)
          const isDisabled   = day.isPast || !day.isCurrentMonth || isBlocked || day.dateStr < minDate
          const isTodayCell  = day.isToday

          return (
            <motion.button
              key={day.dateStr}
              onClick={() => selectDate(day)}
              disabled={isDisabled}
              whileHover={!isDisabled ? { scale: 1.1 } : {}}
              whileTap={!isDisabled ? { scale: 0.95 } : {}}
              className={[
                'h-9 w-full rounded-xl font-body text-sm transition-all',
                isSelected  ? 'bg-brand-600 text-white shadow-md' : '',
                !isSelected && isTodayCell && !isDisabled ? 'border-2 border-brand-400 text-brand-600 dark:text-brand-300' : '',
                !isSelected && !isDisabled ? 'hover:bg-brand-100 dark:hover:bg-brand-900/30 text-gray-800 dark:text-gray-200' : '',
                isDisabled  ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed' : 'cursor-pointer',
                !day.isCurrentMonth ? 'opacity-30' : '',
                isBlocked   ? 'line-through' : '',
              ].join(' ')}
            >
              {day.date.getDate()}
            </motion.button>
          )
        })}
      </div>

      {booking.date && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-50 dark:bg-brand-900/20 rounded-xl px-4 py-3"
        >
          <p className="font-body text-sm text-brand-700 dark:text-brand-300 font-medium">
            Selected: {format(parseISO(booking.date), 'EEEE, MMMM d, yyyy')}
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
          disabled={!booking.date}
          whileHover={{ scale: booking.date ? 1.02 : 1 }}
          whileTap={{ scale: booking.date ? 0.98 : 1 }}
          className="flex-[2] py-3 rounded-full bg-brand-600 hover:bg-brand-700 disabled:bg-gray-200 dark:disabled:bg-white/10 disabled:text-gray-400 text-white font-body font-medium text-sm transition-all shadow-md disabled:shadow-none disabled:cursor-not-allowed"
        >
          Continue
        </motion.button>
      </div>
    </div>
  )
}
