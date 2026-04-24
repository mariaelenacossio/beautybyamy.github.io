import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { BookingProvider } from './context/BookingContext'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'

export default function App() {
  return (
    <ThemeProvider>
      <BookingProvider>
        <Routes>
          {/* Public routes wrapped in shared Layout */}
          <Route element={<Layout />}>
            <Route path="/"        element={<Home     />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about"    element={<About    />} />
            <Route path="/contact"  element={<Contact  />} />
          </Route>

          {/* Admin routes (no shared Layout) */}
          <Route path="/admin"            element={<AdminLogin     />} />
          <Route path="/admin/dashboard"  element={<AdminDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BookingProvider>
    </ThemeProvider>
  )
}
