import { createContext, useContext, useState, useEffect, useCallback } from 'react'

export const SERVICES = [
  { id: 'acrylic-fullset',   name: 'Acrylic Fullset',          category: 'Nails',      price: 80,  duration: 90,  icon: '💅' },
  { id: 'acrylic-refill',    name: 'Acrylic Refill',           category: 'Nails',      price: 65,  duration: 60,  icon: '💅' },
  { id: 'dipping-powder',    name: 'Dipping Powder',           category: 'Nails',      price: 75,  duration: 75,  icon: '✨' },
  { id: 'dipping-refill',    name: 'Dipping Powder Refill',    category: 'Nails',      price: 55,  duration: 60,  icon: '✨' },
  { id: 'volume-lashes',     name: 'Volume Eyelash Set',       category: 'Eyelashes',  price: 300, duration: 150, icon: '👁' },
  { id: 'volume-refill',     name: 'Volume Lash Refill',       category: 'Eyelashes',  price: 175, duration: 90,  icon: '👁' },
  { id: 'classic-lashes',    name: 'Classic Eyelashes',        category: 'Eyelashes',  price: 275, duration: 120, icon: '🌟' },
  { id: 'classic-refill',    name: 'Classic Lash Refill',      category: 'Eyelashes',  price: 155, duration: 60,  icon: '🌟' },
  { id: 'gift-nails',        name: 'Gift Cert — Nails',        category: 'Gift',       price: 100, duration: 0,   icon: '🎁' },
  { id: 'gift-lashes',       name: 'Gift Cert — Lashes',       category: 'Gift',       price: 250, duration: 0,   icon: '🎁' },
  { id: 'gift-combo',        name: 'Gift Cert — Nails + Lashes', category: 'Gift',     price: 400, duration: 0,   icon: '🎁' },
]

export const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
]

const SEED_APPOINTMENTS = [
  {
    id: 'apt-001', clientName: 'Denisse C.', clientEmail: 'denisse@example.com',
    clientPhone: '(202) 555-0111', serviceId: 'acrylic-fullset', serviceName: 'Acrylic Fullset',
    servicePrice: 80, date: '2026-04-25', time: '10:00 AM',
    notes: 'Prefers almond shape, light pink base',
    status: 'confirmed', paid: true, createdAt: '2026-04-20T09:00:00Z',
  },
  {
    id: 'apt-002', clientName: 'Luisa A.', clientEmail: 'luisa@example.com',
    clientPhone: '(202) 555-0122', serviceId: 'volume-lashes', serviceName: 'Volume Eyelash Set',
    servicePrice: 300, date: '2026-04-26', time: '2:00 PM',
    notes: 'Sensitive eyes, use gentle adhesive',
    status: 'pending', paid: false, createdAt: '2026-04-21T14:00:00Z',
  },
  {
    id: 'apt-003', clientName: 'Sofia R.', clientEmail: 'sofia@example.com',
    clientPhone: '(202) 555-0133', serviceId: 'dipping-powder', serviceName: 'Dipping Powder',
    servicePrice: 75, date: '2026-04-28', time: '11:00 AM',
    notes: '',
    status: 'confirmed', paid: true, createdAt: '2026-04-22T10:30:00Z',
  },
  {
    id: 'apt-004', clientName: 'Mariaelena C.', clientEmail: 'maria@example.com',
    clientPhone: '(202) 555-0144', serviceId: 'classic-lashes', serviceName: 'Classic Eyelashes',
    servicePrice: 275, date: '2026-04-30', time: '3:00 PM',
    notes: 'Returning client — loves wispy style',
    status: 'confirmed', paid: false, createdAt: '2026-04-22T16:00:00Z',
  },
  {
    id: 'apt-005', clientName: 'Isabella M.', clientEmail: 'isabella@example.com',
    clientPhone: '(202) 555-0155', serviceId: 'acrylic-refill', serviceName: 'Acrylic Refill',
    servicePrice: 65, date: '2026-04-23', time: '9:00 AM',
    notes: '',
    status: 'completed', paid: true, createdAt: '2026-04-18T08:00:00Z',
  },
]

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [appointments, setAppointments] = useState(() => {
    try {
      const stored = localStorage.getItem('bba_appointments')
      return stored ? JSON.parse(stored) : SEED_APPOINTMENTS
    } catch {
      return SEED_APPOINTMENTS
    }
  })

  const [blockedSlots, setBlockedSlots] = useState(() => {
    try {
      const stored = localStorage.getItem('bba_blocked')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [blockedDays, setBlockedDays] = useState(() => {
    try {
      const stored = localStorage.getItem('bba_blocked_days')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('bba_appointments', JSON.stringify(appointments))
  }, [appointments])

  useEffect(() => {
    localStorage.setItem('bba_blocked', JSON.stringify(blockedSlots))
  }, [blockedSlots])

  useEffect(() => {
    localStorage.setItem('bba_blocked_days', JSON.stringify(blockedDays))
  }, [blockedDays])

  const addAppointment = useCallback((data) => {
    const newApt = {
      id: `apt-${Date.now()}`,
      ...data,
      status: 'pending',
      paid: false,
      createdAt: new Date().toISOString(),
    }
    setAppointments(prev => [...prev, newApt])
    return newApt
  }, [])

  const updateAppointment = useCallback((id, updates) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a))
  }, [])

  const deleteAppointment = useCallback((id) => {
    setAppointments(prev => prev.filter(a => a.id !== id))
  }, [])

  const isSlotTaken = useCallback((date, time) => {
    const taken = appointments.some(
      a => a.date === date && a.time === time && a.status !== 'cancelled'
    )
    const blocked = blockedSlots.some(s => s.date === date && s.time === time)
    return taken || blocked
  }, [appointments, blockedSlots])

  const isDayBlocked = useCallback((date) => {
    return blockedDays.includes(date)
  }, [blockedDays])

  const toggleBlockedDay = useCallback((date) => {
    setBlockedDays(prev =>
      prev.includes(date) ? prev.filter(d => d !== date) : [...prev, date]
    )
  }, [])

  return (
    <BookingContext.Provider value={{
      appointments, addAppointment, updateAppointment, deleteAppointment,
      blockedSlots, setBlockedSlots, blockedDays, toggleBlockedDay,
      isSlotTaken, isDayBlocked,
    }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within BookingProvider')
  return ctx
}
