import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, addMonths, subMonths, parseISO } from 'date-fns'
import { getCalendarDays, WEEKDAY_LABELS, getMinBookingDate } from '../../utils/dateUtils'
import { useBooking } from '../../context/BookingContext'

export default function DateStep({ booking, update, onNext, onBack }) {
  const { isDayBlocked } = useBooking()
  const [viewMonth, setViewMonth] = useState(new Date())
  const minDate = getMinBookingDate()
  const days    = getCalendarDays(viewMonth)

  const selectDate = (day) => {
    if (day.isPast || !day.isCurrentMonth || isDayBlocked(day.dateStr) || day.dateStr < minDate) return
    update({ date: day.dateStr })
  }

  return (
    <div className="space-y-4">
      <p className="font-body text-sm text-warm-500 dark:text-warm-400">
        Select a date for your appointment.
      </p>

      {/* Month nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setViewMonth(m => subMonths(m, 1))}
          className="p-2 rounded-xl hover:bg-warm-100 dark:hover:bg-warm-700 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} className="text-warm-600 dark:text-warm-300" />
        </button>
        <span className="font-display text-base font-normal text-warm-900 dark:text-warm-100">
          {format(viewMonth, 'MMMM yyyy')}
        </span>
        <button
          onClick={() => setViewMonth(m => addMonths(m, 1))}
          className="p-2 rounded-xl hover:bg-warm-100 dark:hover:bg-warm-700 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={18} className="text-warm-600 dark:text-warm-300" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAY_LABELS.map(d => (
          <div key={d} className="text-center font-body text-xs text-warm-400 dark:text-warm-500 py-1">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isSelected  = booking.date === day.dateStr
          const isBlocked   = isDayBlocked(day.dateStr)
          const isDisabled  = day.isPast || !day.isCurrentMonth || isBlocked || day.dateStr < minDate
          const isTodayCell = day.isToday

          return (
            <motion.button
              key={day.dateStr}
              onClick={() => selectDate(day)}
              disabled={isDisabled}
              whileHover={!isDisabled ? { scale: 1.08 } : {}}
              whileTap={!isDisabled ? { scale: 0.94 } : {}}
              className={[
                'h-9 w-full rounded-xl font-body text-sm transition-all',
                isSelected   ? 'bg-brand-600 text-white shadow-soft'                               : '',
                !isSelected && isTodayCell && !isDisabled
                             ? 'ring-2 ring-brand-300 text-brand-600 dark:text-brand-300'           : '',
                !isSelected && !isDisabled
                             ? 'hover:bg-brand-50 dark:hover:bg-brand-900/20 text-warm-800 dark:text-warm-200' : '',
                isDisabled   ? 'text-warm-300 dark:text-warm-600 cursor-not-allowed'               : 'cursor-pointer',
                !day.isCurrentMonth ? 'opacity-25'                                                 : '',
                isBlocked    ? 'line-through'                                                       : '',
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
          className="bg-brand-50 dark:bg-brand-900/20 rounded-xl px-4 py-3 border border-brand-100 dark:border-brand-800/40"
        >
          <p className="font-body text-sm text-brand-700 dark:text-brand-300 font-medium">
            Selected: {format(parseISO(booking.date), 'EEEE, MMMM d, yyyy')}
          </p>
        </motion.div>
      )}

      <div className="flex gap-3 pt-1">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-full border border-warm-200 dark:border-warm-600 font-body text-sm text-warm-600 dark:text-warm-300 hover:bg-warm-50 dark:hover:bg-warm-700 transition-all"
        >
          Back
        </button>
        <motion.button
          onClick={onNext}
          disabled={!booking.date}
          whileHover={{ scale: booking.date ? 1.015 : 1 }}
          whileTap={{ scale: booking.date ? 0.985 : 1 }}
          className="flex-[2] py-3 rounded-full bg-brand-600 hover:bg-brand-700 disabled:bg-warm-200 dark:disabled:bg-warm-700 disabled:text-warm-400 dark:disabled:text-warm-500 text-white font-body font-medium text-sm transition-all shadow-soft disabled:shadow-none disabled:cursor-not-allowed"
        >
          Continue
        </motion.button>
      </div>
    </div>
  )
}
