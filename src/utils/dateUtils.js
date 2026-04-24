import {
  format, addDays, startOfMonth, endOfMonth, eachDayOfInterval,
  startOfWeek, endOfWeek, isSameMonth, isToday, isPast, isSameDay,
  parseISO, isValid,
} from 'date-fns'

export { format, addDays, isSameDay, isToday, parseISO, isValid }

export function getCalendarDays(date) {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 })
  const end   = endOfWeek(endOfMonth(date),     { weekStartsOn: 0 })
  return eachDayOfInterval({ start, end }).map(day => ({
    date: day,
    dateStr: format(day, 'yyyy-MM-dd'),
    isCurrentMonth: isSameMonth(day, date),
    isToday: isToday(day),
    isPast: isPast(day) && !isToday(day),
  }))
}

export function formatDisplayDate(dateStr) {
  if (!dateStr) return ''
  const d = parseISO(dateStr)
  return isValid(d) ? format(d, 'EEEE, MMMM d, yyyy') : dateStr
}

export function formatShortDate(dateStr) {
  if (!dateStr) return ''
  const d = parseISO(dateStr)
  return isValid(d) ? format(d, 'MMM d, yyyy') : dateStr
}

export function getMinBookingDate() {
  return format(addDays(new Date(), 1), 'yyyy-MM-dd')
}

export const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
