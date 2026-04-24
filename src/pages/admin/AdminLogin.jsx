import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import ThemeToggle from '../../components/ui/ThemeToggle'

const ADMIN_PASSWORD = 'amy2024'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [show, setShow]         = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const navigate                = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 600))
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('bba_admin', '1')
      navigate('/admin/dashboard')
    } else {
      setError('Incorrect password. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100 dark:from-[#0f0a0b] dark:via-[#130b0d] dark:to-[#0f0a0b] flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="inline-flex w-16 h-16 rounded-2xl bg-brand-600 items-center justify-center shadow-glow mb-4"
          >
            <Lock size={28} className="text-white" />
          </motion.div>
          <h1 className="font-display text-3xl text-gray-900 dark:text-white mb-1">Admin Access</h1>
          <p className="font-body text-sm text-gray-500 dark:text-gray-400">Beauty by Amy — Dashboard</p>
        </div>

        <div className="bg-white dark:bg-[#1a1012] rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-white/10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-body text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="Enter admin password"
                  autoFocus
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 font-body text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShow(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50"
              >
                <AlertCircle size={14} className="text-red-500 shrink-0" />
                <p className="font-body text-xs text-red-600 dark:text-red-400">{error}</p>
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={!password || loading}
              whileHover={{ scale: password && !loading ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-full bg-brand-600 hover:bg-brand-700 disabled:bg-gray-200 dark:disabled:bg-white/10 disabled:text-gray-400 text-white font-body font-medium text-sm transition-all shadow-md hover:shadow-glow disabled:shadow-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Verifying…
                </span>
              ) : 'Sign In'}
            </motion.button>
          </form>

          <p className="font-body text-xs text-center text-gray-400 dark:text-gray-500 mt-4">
            Demo password: <code className="bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-brand-600 dark:text-brand-400">amy2024</code>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
