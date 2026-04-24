import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Calendar, Users, Settings, LogOut,
  DollarSign, Clock, CheckCircle, XCircle, ChevronRight,
  Trash2, Edit3, Check, X, Menu as MenuIcon, CalendarOff,
  TrendingUp, Sun, Moon,
} from 'lucide-react'
import { format, parseISO, isSameDay, addDays, addMonths, subMonths } from 'date-fns'
import { useBooking, SERVICES } from '../../context/BookingContext'
import { useTheme } from '../../context/ThemeContext'
import Badge from '../../components/ui/Badge'
import { getCalendarDays, WEEKDAY_LABELS } from '../../utils/dateUtils'

const BASE = import.meta.env.BASE_URL

/* ── Sidebar nav items ───────────────────────── */
const NAV = [
  { id: 'overview',      icon: LayoutDashboard, label: 'Overview'      },
  { id: 'appointments',  icon: Calendar,        label: 'Appointments'  },
  { id: 'clients',       icon: Users,           label: 'Clients'       },
  { id: 'availability',  icon: Settings,        label: 'Availability'  },
]

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { appointments, updateAppointment, deleteAppointment, blockedDays, toggleBlockedDay } = useBooking()
  const { isDark, toggle: toggleTheme } = useTheme()

  useEffect(() => {
    if (!sessionStorage.getItem('bba_admin')) {
      navigate('/admin')
    }
  }, [navigate])

  const handleLogout = () => {
    sessionStorage.removeItem('bba_admin')
    navigate('/admin')
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#0a0608] overflow-hidden font-body">
      {/* ── Sidebar ────────────────────────────────────── */}
      <AnimatePresence>
        {(sidebarOpen || true) && (
          <>
            {/* Mobile overlay */}
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              className={`fixed lg:static z-30 lg:z-auto flex flex-col w-64 h-full bg-white dark:bg-[#0f0a0b] border-r border-gray-100 dark:border-white/10 shadow-xl lg:shadow-none ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
              } transition-transform lg:transition-none`}
            >
              {/* Logo */}
              <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-100 dark:border-white/10">
                <img src={`${BASE}images/Amys-logo.png`} alt="Beauty by Amy" className="h-8 w-auto" />
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white leading-tight">Beauty by Amy</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Admin Panel</p>
                </div>
              </div>

              {/* Nav */}
              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {NAV.map(({ id, icon: Icon, label }) => (
                  <button
                    key={id}
                    onClick={() => { setActiveTab(id); setSidebarOpen(false) }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      activeTab === id
                        ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </nav>

              {/* Footer */}
              <div className="p-3 space-y-1 border-t border-gray-100 dark:border-white/10">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </button>
                <Link to="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <ChevronRight size={16} className="rotate-180" />
                  Back to Site
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main content ───────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-5 py-4 bg-white dark:bg-[#0f0a0b] border-b border-gray-100 dark:border-white/10">
          <button
            onClick={() => setSidebarOpen(p => !p)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300"
          >
            <MenuIcon size={20} />
          </button>
          <div className="hidden lg:block">
            <h1 className="font-display text-xl text-gray-900 dark:text-white capitalize">{activeTab}</h1>
          </div>
          <p className="font-body text-xs text-gray-400 dark:text-gray-500">
            {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </header>

        {/* Tab content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview'     && <Overview appointments={appointments} />}
              {activeTab === 'appointments' && <AppointmentsTab appointments={appointments} onUpdate={updateAppointment} onDelete={deleteAppointment} />}
              {activeTab === 'clients'      && <ClientsTab appointments={appointments} />}
              {activeTab === 'availability' && <AvailabilityTab blockedDays={blockedDays} onToggle={toggleBlockedDay} />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

/* ── Overview ─────────────────────────────────── */
function Overview({ appointments }) {
  const today       = format(new Date(), 'yyyy-MM-dd')
  const todayApts   = appointments.filter(a => a.date === today && a.status !== 'cancelled')
  const pending     = appointments.filter(a => a.status === 'pending')
  const confirmed   = appointments.filter(a => a.status === 'confirmed')
  const revenue     = appointments.filter(a => a.paid).reduce((s, a) => s + (a.servicePrice || 0), 0)
  const unpaid      = appointments.filter(a => !a.paid && a.status !== 'cancelled')

  const stats = [
    { label: "Today's Appointments", value: todayApts.length, icon: Calendar, color: 'text-blue-500',   bg: 'bg-blue-50 dark:bg-blue-900/20'   },
    { label: 'Pending Confirmation', value: pending.length,   icon: Clock,    color: 'text-amber-500',  bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Confirmed',            value: confirmed.length, icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Total Revenue',        value: `$${revenue}`,    icon: DollarSign, color: 'text-brand-500', bg: 'bg-brand-50 dark:bg-brand-900/20' },
  ]

  const upcoming = appointments
    .filter(a => a.date >= today && a.status !== 'cancelled')
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white dark:bg-[#1a1012] rounded-2xl p-5 border border-gray-100 dark:border-white/10 shadow-sm"
          >
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon size={17} className={color} />
            </div>
            <p className="font-display text-2xl text-gray-900 dark:text-white">{value}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Upcoming */}
      <div className="bg-white dark:bg-[#1a1012] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
          <h2 className="font-display text-base text-gray-900 dark:text-white">Upcoming Appointments</h2>
          <TrendingUp size={15} className="text-gray-400" />
        </div>
        <div className="divide-y divide-gray-50 dark:divide-white/5">
          {upcoming.length === 0 ? (
            <p className="text-sm text-gray-400 p-5">No upcoming appointments.</p>
          ) : upcoming.map(apt => (
            <div key={apt.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{apt.clientName}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{apt.serviceName} · {apt.date} · {apt.time}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge label={apt.status} color={apt.status} />
                {apt.paid
                  ? <Badge label="Paid" color="paid" />
                  : <Badge label="Unpaid" color="unpaid" />
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Appointments Tab ─────────────────────────── */
function AppointmentsTab({ appointments, onUpdate, onDelete }) {
  const [filter, setFilter] = useState('all')
  const [editId, setEditId] = useState(null)

  const filtered = appointments
    .filter(a => filter === 'all' ? true : a.status === filter)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${
              filter === f
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-brand-300 dark:hover:border-brand-600/50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1a1012] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
              <tr>
                {['Client', 'Service', 'Date & Time', 'Status', 'Paid', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {filtered.map(apt => (
                <tr key={apt.id} className="hover:bg-gray-50/50 dark:hover:bg-white/3 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">{apt.clientName}</p>
                    <p className="text-xs text-gray-400">{apt.clientEmail}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{apt.serviceName}</p>
                    <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">${apt.servicePrice}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {apt.date}<br />{apt.time}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={apt.status}
                      onChange={e => onUpdate(apt.id, { status: e.target.value })}
                      className="text-xs border border-gray-200 dark:border-white/10 rounded-lg px-2 py-1 bg-white dark:bg-[#1a1012] text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-brand-400"
                    >
                      {['pending', 'confirmed', 'completed', 'cancelled'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onUpdate(apt.id, { paid: !apt.paid })}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all ${
                        apt.paid
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 hover:bg-orange-200'
                      }`}
                    >
                      {apt.paid ? <Check size={10} /> : <X size={10} />}
                      {apt.paid ? 'Paid' : 'Unpaid'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => { if (window.confirm('Delete this appointment?')) onDelete(apt.id) }}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-400">No appointments found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ── Clients Tab ─────────────────────────────── */
function ClientsTab({ appointments }) {
  const clientMap = {}
  appointments.forEach(a => {
    if (!clientMap[a.clientEmail]) {
      clientMap[a.clientEmail] = { name: a.clientName, email: a.clientEmail, phone: a.clientPhone, visits: [], totalSpent: 0 }
    }
    clientMap[a.clientEmail].visits.push(a)
    if (a.paid) clientMap[a.clientEmail].totalSpent += a.servicePrice || 0
  })
  const clients = Object.values(clientMap).sort((a, b) => b.visits.length - a.visits.length)

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">{clients.length} total clients</p>
      <div className="bg-white dark:bg-[#1a1012] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/10">
              <tr>
                {['Client', 'Contact', 'Visits', 'Total Spent', 'Last Visit'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {clients.map(c => {
                const lastVisit = c.visits.sort((a, b) => b.date.localeCompare(a.date))[0]
                return (
                  <tr key={c.email} className="hover:bg-gray-50/50 dark:hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-300 to-brand-500 flex items-center justify-center text-white text-xs font-medium shrink-0">
                          {c.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs text-gray-500 dark:text-gray-400">{c.email}</p>
                      <p className="text-xs text-gray-400">{c.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge label={`${c.visits.length} visits`} color="pink" />
                    </td>
                    <td className="px-4 py-3 font-medium text-emerald-600 dark:text-emerald-400 text-sm">
                      ${c.totalSpent}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                      {lastVisit?.date} — {lastVisit?.serviceName}
                    </td>
                  </tr>
                )
              })}
              {clients.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-400">No clients yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ── Availability Tab ────────────────────────── */
function AvailabilityTab({ blockedDays, onToggle }) {
  const [viewMonth, setViewMonth] = useState(new Date())
  const days = getCalendarDays(viewMonth)
  const today = format(new Date(), 'yyyy-MM-dd')

  return (
    <div className="space-y-5 max-w-md">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Click on a date to block or unblock it. Blocked dates won't appear as available for booking.
      </p>

      <div className="bg-white dark:bg-[#1a1012] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm p-5">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setViewMonth(m => subMonths(m, 1))} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
            <ChevronRight size={16} className="text-gray-600 dark:text-gray-300 rotate-180" />
          </button>
          <span className="font-display text-base font-medium text-gray-900 dark:text-white">
            {format(viewMonth, 'MMMM yyyy')}
          </span>
          <button onClick={() => setViewMonth(m => addMonths(m, 1))} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
            <ChevronRight size={16} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-1">
          {WEEKDAY_LABELS.map(d => <div key={d} className="text-center text-xs text-gray-400 py-1">{d}</div>)}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map(day => {
            const isBlocked = blockedDays.includes(day.dateStr)
            const isPast    = day.dateStr < today
            return (
              <motion.button
                key={day.dateStr}
                onClick={() => !isPast && day.isCurrentMonth && onToggle(day.dateStr)}
                whileHover={!isPast && day.isCurrentMonth ? { scale: 1.1 } : {}}
                disabled={isPast || !day.isCurrentMonth}
                className={[
                  'h-9 w-full rounded-xl text-sm transition-all',
                  isBlocked ? 'bg-red-500 text-white shadow-sm' : '',
                  !isBlocked && day.isCurrentMonth && !isPast ? 'hover:bg-brand-100 dark:hover:bg-brand-900/30 text-gray-800 dark:text-gray-200' : '',
                  !isBlocked && day.isToday ? 'border-2 border-brand-400 text-brand-600 dark:text-brand-300' : '',
                  isPast || !day.isCurrentMonth ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50' : 'cursor-pointer',
                ].join(' ')}
              >
                {isBlocked ? <CalendarOff size={12} className="mx-auto" /> : day.date.getDate()}
              </motion.button>
            )
          })}
        </div>
      </div>

      {blockedDays.length > 0 && (
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Blocked dates ({blockedDays.length})</p>
          <div className="flex flex-wrap gap-2">
            {blockedDays.map(d => (
              <span key={d} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-xs">
                {d}
                <button onClick={() => onToggle(d)} className="hover:text-red-900 dark:hover:text-red-200">
                  <X size={10} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
