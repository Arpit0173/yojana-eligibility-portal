import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../App'
import { getSchemes, checkEligibility } from '../api/api'
import SchemeCard from '../components/SchemeCard'

const STATES = [
  'All','Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
  'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala',
  'Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland',
  'Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
  'Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh'
]

const CATEGORIES_LIST = [
  { key: 'Pension', icon: '👴', color: 'from-purple-500 to-purple-600' },
  { key: 'Agriculture', icon: '🌾', color: 'from-green-500 to-green-600' },
  { key: 'Education', icon: '📚', color: 'from-blue-500 to-blue-600' },
  { key: 'Women Welfare', icon: '👩', color: 'from-pink-500 to-pink-600' },
  { key: 'Startup', icon: '🚀', color: 'from-orange-500 to-orange-600' },
  { key: 'Health', icon: '🏥', color: 'from-red-500 to-red-600' },
]

export default function Home() {
  const { t, lang } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ age: '', income: '', state: 'All', category: 'All', gender: 'All' })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [latest, setLatest] = useState([])
  const [popular, setPopular] = useState([])
  const [upcomingList, setUpcomingList] = useState([])
  const [selectedScheme, setSelectedScheme] = useState(null)
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [latestRes, popularRes, upcomingRes] = await Promise.all([
          getSchemes({ status: 'active' }),
          getSchemes({ popular: 'true' }),
          getSchemes({ status: 'upcoming' }),
        ])
        setLatest(latestRes.data.slice(0, 3))
        setPopular(popularRes.data.slice(0, 3))
        setUpcomingList(upcomingRes.data.slice(0, 3))
      } catch (err) {
        console.error(err)
      } finally {
        setDataLoading(false)
      }
    }
    load()
  }, [])

  const handleCheck = async (e) => {
    e.preventDefault()
    if (!form.age) return alert('Please enter your age')
    setLoading(true)
    try {
      const res = await checkEligibility(form)
      setResults(res.data)
    } catch (err) {
      console.error(err)
      alert('Error checking eligibility')
    } finally {
      setLoading(false)
    }
  }

  const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
      <div className="skeleton h-8 w-8 rounded mb-3" />
      <div className="skeleton h-5 w-3/4 rounded mb-2" />
      <div className="skeleton h-4 w-1/3 rounded mb-3" />
      <div className="skeleton h-4 w-full rounded mb-2" />
      <div className="skeleton h-4 w-5/6 rounded mb-2" />
      <div className="skeleton h-4 w-2/3 rounded" />
    </div>
  )

  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-saffron/20 via-white to-trigreen/20 dark:from-saffron/10 dark:via-gray-900 dark:to-trigreen/10" />
        <div className="absolute top-20 right-10 w-40 h-40 border-4 border-navy/10 rounded-full animate-spin-slow hidden lg:block" />
        <div className="absolute bottom-10 left-10 w-24 h-24 border-4 border-saffron/10 rounded-full animate-spin-slow hidden lg:block" />

        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text + Form */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-saffron/10 border border-saffron/20 rounded-full mb-6">
                <span className="w-2 h-2 bg-trigreen rounded-full animate-pulse" />
                <span className="text-sm font-medium text-saffron-dark dark:text-saffron">
                  {lang === 'en' ? 'Digital India Initiative' : 'डिजिटल इंडिया पहल'}
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
                <span className="text-saffron">{t.heroTitle.split(' ').slice(0, 2).join(' ')}</span>{' '}
                <span className="text-gray-900 dark:text-white">{t.heroTitle.split(' ').slice(2, 5).join(' ')}</span>{' '}
                <span className="text-trigreen">{t.heroTitle.split(' ').slice(5).join(' ')}</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">{t.heroSub}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { num: '500+', label: lang === 'en' ? 'Schemes' : 'योजनाएं' },
                  { num: '36', label: lang === 'en' ? 'States/UTs' : 'राज्य/केंद्र' },
                  { num: '10Cr+', label: lang === 'en' ? 'Beneficiaries' : 'लाभार्थी' },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-3 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur">
                    <div className="text-2xl font-extrabold text-navy dark:text-saffron">{stat.num}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Eligibility Form */}
            <div className="animate-slide-up">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-saffron to-saffron-dark p-5">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <span className="text-2xl">☸</span> {t.checkBtn}
                  </h3>
                </div>
                <form onSubmit={handleCheck} className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{t.age} *</label>
                      <input
                        type="number" min="0" max="100" required
                        value={form.age}
                        onChange={e => setForm({ ...form, age: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-saffron focus:border-saffron outline-none transition-all text-sm"
                        placeholder="25"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{t.income}</label>
                      <input
                        type="number" min="0"
                        value={form.income}
                        onChange={e => setForm({ ...form, income: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-saffron focus:border-saffron outline-none transition-all text-sm"
                        placeholder="200000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{t.state}</label>
                    <select
                      value={form.state}
                      onChange={e => setForm({ ...form, state: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-saffron focus:border-saffron outline-none transition-all text-sm"
                    >
                      {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{t.category}</label>
                      <select
                        value={form.category}
                        onChange={e => setForm({ ...form, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-saffron focus:border-saffron outline-none transition-all text-sm"
                      >
                        <option value="All">All</option>
                        <option value="General">General</option>
                        <option value="OBC">OBC</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{t.gender}</label>
                      <select
                        value={form.gender}
                        onChange={e => setForm({ ...form, gender: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-saffron focus:border-saffron outline-none transition-all text-sm"
                      >
                        <option value="All">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Transgender">Transgender</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-saffron to-saffron-dark text-white font-bold rounded-lg hover:shadow-lg hover:shadow-saffron/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-base"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t.loading}
                      </>
                    ) : (
                      <>☸ {t.checkBtn}</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* RESULTS */}
          {results && (
            <div className="mt-12 animate-slide-up">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-trigreen/10 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {t.youQualify} <span className="text-trigreen">{results.count}</span> {t.schemesFound}
                    </h3>
                    <p className="text-sm text-gray-500">{t.eligible}</p>
                  </div>
                </div>
                {results.schemes.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {results.schemes.map(s => (
                      <SchemeCard key={s._id} scheme={s} onViewDetails={setSelectedScheme} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <span className="text-4xl block mb-3">😔</span>
                    {t.noSchemes}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SCHEMES SECTION */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          {/* Latest */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 bg-saffron rounded-full" />
              <h2 className="text-2xl font-bold">{t.latestSchemes}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataLoading ? [1,2,3].map(i => <SkeletonCard key={i} />) :
                latest.map(s => <SchemeCard key={s._id} scheme={s} onViewDetails={setSelectedScheme} />)
              }
            </div>
          </div>

          {/* Popular */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 bg-trigreen rounded-full" />
              <h2 className="text-2xl font-bold">{t.popularSchemes}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataLoading ? [1,2,3].map(i => <SkeletonCard key={i} />) :
                popular.map(s => <SchemeCard key={s._id} scheme={s} onViewDetails={setSelectedScheme} />)
              }
            </div>
          </div>

          {/* Upcoming */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-8 bg-navy rounded-full" />
              <h2 className="text-2xl font-bold">{t.upcomingSchemes}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataLoading ? [1,2,3].map(i => <SkeletonCard key={i} />) :
                upcomingList.length > 0 ? upcomingList.map(s => (
                  <SchemeCard key={s._id} scheme={s} onViewDetails={setSelectedScheme} />
                )) : (
                  <div className="col-span-3 text-center py-10 text-gray-500">
                    <span className="text-4xl block mb-3">📋</span>
                    {t.noSchemes}
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">{t.schemeCategories}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-saffron via-navy to-trigreen mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {CATEGORIES_LIST.map(cat => (
              <button
                key={cat.key}
                onClick={() => navigate(`/schemes?category=${cat.key}`)}
                className="card-hover group bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-100 dark:border-gray-700 shadow-sm"
              >
                <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-lg`}>
                  {cat.icon}
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {t[cat.key.toLowerCase().replace(' ', '')] || cat.key}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedScheme(null)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="h-2 bg-gradient-to-r from-saffron via-white to-trigreen" />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white pr-4">
                  {lang === 'hi' && selectedScheme.nameHi ? selectedScheme.nameHi : selectedScheme.name}
                </h3>
                <button onClick={() => setSelectedScheme(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
              </div>
              <span className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-saffron/10 text-saffron rounded-full">
                {selectedScheme.category}
              </span>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {lang === 'hi' && selectedScheme.descriptionHi ? selectedScheme.descriptionHi : selectedScheme.description}
              </p>
              <div className="space-y-3 text-sm">
                {selectedScheme.ministry && (
                  <div className="flex gap-2"><span className="font-semibold text-gray-700 dark:text-gray-300">{t.ministry}:</span><span className="text-gray-600 dark:text-gray-400">{selectedScheme.ministry}</span></div>
                )}
                {selectedScheme.benefits && (
                  <div className="flex gap-2"><span className="font-semibold text-gray-700 dark:text-gray-300">{t.benefits}:</span><span className="text-trigreen dark:text-green-400">{selectedScheme.benefits}</span></div>
                )}
                <div className="flex gap-2"><span className="font-semibold text-gray-700 dark:text-gray-300">{t.age}:</span><span>{selectedScheme.minAge} - {selectedScheme.maxAge} years</span></div>
                <div className="flex gap-2"><span className="font-semibold text-gray-700 dark:text-gray-300">{t.gender}:</span><span>{selectedScheme.gender}</span></div>
                <div className="flex gap-2"><span className="font-semibold text-gray-700 dark:text-gray-300">{t.income}:</span><span>{selectedScheme.maxIncome > 0 ? `Up to ₹${selectedScheme.maxIncome.toLocaleString()}` : 'No limit'}</span></div>
                {selectedScheme.launchDate && (
                  <div className="flex gap-2"><span className="font-semibold text-gray-700 dark:text-gray-300">{t.launchDate}:</span><span>{new Date(selectedScheme.launchDate).toLocaleDateString('en-IN')}</span></div>
                )}
              </div>
              {selectedScheme.website && (
                <a href={selectedScheme.website} target="_blank" rel="noreferrer"
                  className="inline-block mt-6 px-6 py-2.5 bg-trigreen text-white rounded-lg hover:bg-trigreen-dark transition-colors font-medium text-sm">
                  Visit Official Website →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}