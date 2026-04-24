const colors = {
  pending:   'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  confirmed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  paid:      'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  unpaid:    'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  pink:      'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300',
}

export default function Badge({ label, color = 'pink', className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-body ${colors[color] ?? colors.pink} ${className}`}>
      {label}
    </span>
  )
}
