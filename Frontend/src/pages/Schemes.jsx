import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useApp } from '../App'
import { getSchemes } from '../api/api'
import SchemeCard from '../components/SchemeCard'

const ALL_CATEGORIES = ['All', 'Agriculture', 'Education', 'Health', 'Women Welfare', 'Pension', 'Startup', 'Housing', 'Financial Inclusion', 'Skill Development', 'Energy', 'Defence']

export default function Schemes() {
  const { t, lang } = useApp()
  const [searchParams] = useSearchParams()
  const [schemes, setSchemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [selectedScheme, setSelectedScheme] = useState(null)

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setCategory(cat)
  }, [searchParams])

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const params = {}
        if (category !== 'All') params.category = category
        const res = await getSchemes(params)
        setSchemes(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [category])

  const filtered = schemes.filter(s => {
    const name = lang === 'hi' && s.nameHi ? s.nameHi : s.name
    const desc = lang === 'hi' && s.descriptionHi ? s.descriptionHi : s.description
    const q = search.toLowerCase()
    return name.toLowerCase().includes(q) || desc.toLowerCase().includes(q)
  })

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navy/90 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">{t.allSchemes}</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-saffron to-trigreen rounded-full" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-saffron outline-none transition-all"
            />
          </div>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-saffron outline-none transition-all"
          >
            {ALL_CATEGORIES.map(c => (
              <option key={c} value={c}>{c === 'All' ? t.filterByCategory : c}</option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {filtered.length} {t.schemesFound} {category !== 'All' && `in ${category}`}
        </p>

        {/* Schemes Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="chakra-spinner" />
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(s => (
              <SchemeCard key={s._id} scheme={s} onViewDetails={setSelectedScheme} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <span className="text-5xl block mb-4">🔍</span>
            <p className="text-lg">{t.noSchemes}</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedScheme(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="h-2 bg-gradient-to-r from-saffron via-white to-trigreen" />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold pr-4">{lang === 'hi' && selectedScheme.nameHi ? selectedScheme.nameHi : selectedScheme.name}</h3>
                <button onClick={() => setSelectedScheme(null)} className="text-2xl text-gray-400 hover:text-gray-600">×</button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{lang === 'hi' && selectedScheme.descriptionHi ? selectedScheme.descriptionHi : selectedScheme.description}</p>
              <div className="space-y-2 text-sm">
                <p><strong>{t.ministry}:</strong> {selectedScheme.ministry}</p>
                <p><strong>{t.benefits}:</strong> <span className="text-trigreen">{selectedScheme.benefits}</span></p>
                <p><strong>{t.age}:</strong> {selectedScheme.minAge}-{selectedScheme.maxAge} yrs</p>
                <p><strong>{t.income}:</strong> {selectedScheme.maxIncome > 0 ? `₹${selectedScheme.maxIncome.toLocaleString()}` : 'No limit'}</p>
              </div>
              {selectedScheme.website && (
                <a href={selectedScheme.website} target="_blank" rel="noreferrer" className="inline-block mt-5 px-5 py-2 bg-trigreen text-white rounded-lg hover:bg-trigreen-dark transition-colors text-sm font-medium">
                  Visit Website →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}