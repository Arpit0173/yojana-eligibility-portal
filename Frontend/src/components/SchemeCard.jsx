import { useApp } from '../App'

export default function SchemeCard({ scheme, onViewDetails }) {
  const { t, lang } = useApp()

  const statusColors = {
    active: 'bg-trigreen text-white',
    upcoming: 'bg-saffron text-white',
    closed: 'bg-gray-500 text-white',
  }

  const categoryIcons = {
    Agriculture: '🌾', Education: '📚', Health: '🏥',
    'Women Welfare': '👩', Pension: '👴', Startup: '🚀',
    Housing: '🏠', 'Financial Inclusion': '🏦',
    'Skill Development': '🛠️', Energy: '⚡', Defence: '🛡️', Other: '📋'
  }

  return (
    <div className="card-hover bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Card top accent */}
      <div className="h-1.5 bg-gradient-to-r from-saffron via-white to-trigreen" />

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl">{categoryIcons[scheme.category] || '📋'}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[scheme.status]}`}>
            {scheme.status === 'active' ? t.active : scheme.status === 'upcoming' ? t.upcoming.split(' ')[0] : t.closed}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 leading-snug">
          {lang === 'hi' && scheme.nameHi ? scheme.nameHi : scheme.name}
        </h3>

        <span className="inline-block px-2 py-0.5 mb-3 text-xs font-medium bg-navy/10 dark:bg-navy/30 text-navy dark:text-blue-300 rounded">
          {scheme.category}
        </span>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
          {lang === 'hi' && scheme.descriptionHi ? scheme.descriptionHi : scheme.description}
        </p>

        {scheme.benefits && (
          <div className="flex items-start gap-2 mb-4 p-2 bg-trigreen/5 dark:bg-trigreen/10 rounded-lg">
            <span className="text-trigreen text-sm mt-0.5">✦</span>
            <p className="text-xs text-trigreen dark:text-green-400 font-medium">{scheme.benefits}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="text-xs text-gray-500 dark:text-gray-500">
            {scheme.minAge}-{scheme.maxAge} yrs • {scheme.gender === 'All' ? '👤 All' : scheme.gender === 'Female' ? '👩 Female' : '👨 Male'}
          </div>
          <button
            onClick={() => onViewDetails && onViewDetails(scheme)}
            className="px-4 py-1.5 text-sm font-semibold text-saffron border border-saffron rounded-lg hover:bg-saffron hover:text-white transition-all"
          >
            {t.viewDetails}
          </button>
        </div>
      </div>
    </div>
  )
}