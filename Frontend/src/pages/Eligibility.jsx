import { useState } from 'react'
import { useApp } from '../App'
import { checkEligibility } from '../api/api'
import SchemeCard from '../components/SchemeCard'

const STATES = [
  'All','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
  'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala',
  'Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland',
  'Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
  'Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh'
]

export default function Eligibility() {
  const { t, lang } = useApp()
  const [form, setForm] = useState({ age: '', income: '', state: 'All', category: 'All', gender: 'All' })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedScheme, setSelectedScheme] = useState(null)

  const handleCheck = async (e) => {
    e.preventDefault()
    if (!form.age) return
    setLoading(true)
    try {
      const res = await checkEligibility(form)
      setResults(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-saffron focus:border-saffron outline-none transition-all"

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-saffron/90 to-saffron text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">{t.eligibility}</h1>
          <p className="text-white/80">{t.heroSub}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <form onSubmit={handleCheck} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">{t.age} *</label>
              <input type="number" min="0" max="100" required value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} className={inputClass} placeholder="e.g. 25" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">{t.income}</label>
              <input type="number" min="0" value={form.income} onChange={e => setForm({ ...form, income: e.target.value })} className={inputClass} placeholder="e.g. 200000" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">{t.state}</label>
              <select value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} className={inputClass}>
                {STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">{t.category}</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputClass}>
                <option value="All">All</option>
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">{t.gender}</label>
              <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} className={inputClass}>
                <option value="All">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
              </select>
            </div>
          </div>
          <button type="submit" disabled={loading}
            className="mt-8 w-full py-4 bg-gradient-to-r from-saffron to-saffron-dark text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-saffron/30 transition-all disabled:opacity-50 flex items-center justify-center gap-3">
            {loading ? <><div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t.loading}</> : <>☸ {t.checkBtn}</>}
          </button>
        </form>

        {results && (
          <div className="mt-10 animate-slide-up">
            <div className="flex items-center gap-3 mb-6 p-4 bg-trigreen/10 dark:bg-trigreen/20 rounded-xl border border-trigreen/20">
              <span className="text-3xl">✅</span>
              <div>
                <p className="font-bold text-lg">{t.youQualify} <span className="text-trigreen">{results.count}</span> {t.schemesFound}</p>
              </div>
            </div>
            {results.schemes.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {results.schemes.map(s => <SchemeCard key={s._id} scheme={s} onViewDetails={setSelectedScheme} />)}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <span className="text-5xl block mb-4">😔</span>
                <p className="text-lg">{t.noSchemes}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {selectedScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedScheme(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="h-2 bg-gradient-to-r from-saffron via-white to-trigreen" />
            <div className="p-6">
              <div className="flex justify-between mb-4">
                <h3 className="text-xl font-bold pr-4">{lang === 'hi' && selectedScheme.nameHi ? selectedScheme.nameHi : selectedScheme.name}</h3>
                <button onClick={() => setSelectedScheme(null)} className="text-2xl text-gray-400">×</button>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{lang === 'hi' && selectedScheme.descriptionHi ? selectedScheme.descriptionHi : selectedScheme.description}</p>
              {selectedScheme.benefits && <p className="text-trigreen font-medium mb-2">✦ {selectedScheme.benefits}</p>}
              {selectedScheme.website && <a href={selectedScheme.website} target="_blank" rel="noreferrer" className="inline-block mt-4 px-5 py-2 bg-trigreen text-white rounded-lg text-sm font-medium">Visit Website →</a>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}