import { useState, useEffect } from 'react'
import { useApp } from '../App'
import { getSchemes } from '../api/api'
import SchemeCard from '../components/SchemeCard'

export default function Upcoming() {
  const { t, lang } = useApp()
  const [schemes, setSchemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedScheme, setSelectedScheme] = useState(null)

  useEffect(() => {
    getSchemes({ status: 'upcoming' })
      .then(res => setSchemes(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-trigreen/90 to-trigreen text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">{t.upcomingSchemes}</h1>
          <p className="text-white/80">{lang === 'en' ? 'Government schemes launching soon' : 'जल्द शुरू होने वाली सरकारी योजनाएं'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {loading ? (
          <div className="flex justify-center py-20"><div className="chakra-spinner" /></div>
        ) : schemes.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.map(s => <SchemeCard key={s._id} scheme={s} onViewDetails={setSelectedScheme} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <span className="text-5xl block mb-4">📋</span>
            <p className="text-lg">{t.noSchemes}</p>
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
              {selectedScheme.benefits && <p className="text-trigreen font-medium">✦ {selectedScheme.benefits}</p>}
              {selectedScheme.launchDate && <p className="text-sm text-gray-500 mt-3">{t.launchDate}: {new Date(selectedScheme.launchDate).toLocaleDateString('en-IN')}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}