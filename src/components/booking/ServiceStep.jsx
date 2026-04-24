import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { SERVICES } from '../../context/BookingContext'

const CATEGORIES = ['Nails', 'Eyelashes', 'Gift']

export default function ServiceStep({ booking, update, onNext }) {
  const select = (svc) => {
    update({ serviceId: svc.id, serviceName: svc.name, servicePrice: svc.price })
  }

  return (
    <div className="space-y-5">
      <p className="font-body text-sm text-gray-500 dark:text-gray-400">
        Choose the service you'd like to book.
      </p>

      {CATEGORIES.map(cat => (
        <div key={cat}>
          <h3 className="font-display text-lg text-gray-700 dark:text-gray-200 mb-2">{cat}</h3>
          <div className="grid grid-cols-1 gap-2">
            {SERVICES.filter(s => s.category === cat).map((svc, i) => {
              const selected = booking.serviceId === svc.id
              return (
                <motion.button
                  key={svc.id}
                  onClick={() => select(svc)}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 text-left transition-all ${
                    selected
                      ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30'
                      : 'border-gray-100 dark:border-white/10 hover:border-brand-300 dark:hover:border-brand-600/50 bg-gray-50/50 dark:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{svc.icon}</span>
                    <div>
                      <p className={`font-body text-sm font-medium ${selected ? 'text-brand-700 dark:text-brand-300' : 'text-gray-800 dark:text-gray-200'}`}>
                        {svc.name}
                      </p>
                      {svc.duration > 0 && (
                        <p className="font-body text-xs text-gray-400">{svc.duration} min</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-body font-semibold text-sm ${selected ? 'text-brand-600' : 'text-gray-700 dark:text-gray-300'}`}>
                      ${svc.price}
                    </span>
                    {selected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center"
                      >
                        <Check size={11} className="text-white" />
                      </motion.span>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      ))}

      <motion.button
        onClick={onNext}
        disabled={!booking.serviceId}
        whileHover={{ scale: booking.serviceId ? 1.02 : 1 }}
        whileTap={{ scale: booking.serviceId ? 0.98 : 1 }}
        className="w-full py-3.5 rounded-full bg-brand-600 hover:bg-brand-700 disabled:bg-gray-200 dark:disabled:bg-white/10 disabled:text-gray-400 text-white font-body font-medium text-sm transition-all shadow-md hover:shadow-glow disabled:shadow-none disabled:cursor-not-allowed mt-2"
      >
        Continue
      </motion.button>
    </div>
  )
}
