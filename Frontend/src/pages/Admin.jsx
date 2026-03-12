import { useState, useEffect } from 'react'
import { useApp } from '../App'
import { getSchemes, createScheme, updateScheme, deleteScheme } from '../api/api'

const EMPTY_SCHEME = {
  name: '', nameHi: '', description: '', descriptionHi: '',
  category: 'Other', minAge: 0, maxAge: 100, maxIncome: 0,
  gender: 'All', states: ['All'], categories: ['All'],
  status: 'active', ministry: '', benefits: '', website: '', popular: false,
}

const CATEGORIES = ['Agriculture', 'Education', 'Health', 'Women Welfare', 'Pension', 'Startup', 'Housing', 'Financial Inclusion', 'Skill Development', 'Energy', 'Defence', 'Other']

export default function Admin() {
  const { t } = useApp()
  const [authed, setAuthed] = useState(false)
  const [pass, setPass] = useState('')
  const [schemes, setSchemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null = list, 'new' = create, scheme = edit
  const [form, setForm] = useState(EMPTY_SCHEME)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const loadSchemes = async () => {
    setLoading(true)
    try {
      const res = await getSchemes()
      setSchemes(res.data)
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  useEffect(() => { if (authed) loadSchemes() }, [authed])

  const handleLogin = (e) => {
    e.preventDefault()
    if (pass === 'admin123') {
      setAuthed(true)
    } else {
      alert('Invalid password. Use: admin123')
    }
  }

  const handleEdit = (scheme) => {
    setForm({ ...scheme, states: scheme.states || ['All'], categories: scheme.categories || ['All'] })
    setEditing(scheme._id)
  }

  const handleNew = () => {
    setForm(EMPTY_SCHEME)
    setEditing('new')
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      if (editing === 'new') {
        await createScheme(form)
        setMsg('✅ Scheme created!')
      } else {
        await updateScheme(editing, form)
        setMsg('✅ Scheme updated!')
      }
      await loadSchemes()
      setTimeout(() => { setEditing(null); setMsg('') }, 1500)
    } catch (err) {
      setMsg('❌ Error: ' + err.message)
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this scheme?')) return
    try {
      await deleteScheme(id)
      await loadSchemes()
    } catch (err) { console.error(err) }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-sm border border-gray-100 dark:border-gray-700">
          <div className="text-center mb-6">
            <span className="text-4xl">🔐</span>
            <h2 className="text-xl font-bold mt-2">{t.adminPanel}</h2>
            <p className="text-sm text-gray-500 mt-1">Enter password to continue</p>
          </div>
          <input
            type="password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-saffron outline-none mb-4"
          />
          <button type="submit" className="w-full py-3 bg-navy text-white font-bold rounded-xl hover:bg-navy/80 transition-all">
            Login
          </button>
          <p className="text-xs text-center text-gray-400 mt-3">Default: admin123</p>
        </form>
      </div>
    )
  }

  const inputClass = "w-full px-3 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-saffron outline-none text-sm"

  if (editing !== null) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-navy text-white py-6">
          <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
            <h1 className="text-xl font-bold">{editing === 'new' ? t.addScheme : t.editScheme}</h1>
            <button onClick={() => setEditing(null)} className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 text-sm">{t.cancel}</button>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          {msg && <div className="mb-4 p-3 bg-trigreen/10 text-trigreen rounded-lg text-sm font-medium animate-fade-in">{msg}</div>}
          <form onSubmit={handleSave} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="block text-xs font-semibold mb-1.5 text-gray-600 dark:text-gray-400">Name (EN) *</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} /></div>
              <div><label className="block text-xs font-semibold mb-1.5 text-gray-600 dark:text-gray-400">Name (HI)</label>
                <input value={form.nameHi} onChange={e => setForm({ ...form, nameHi: e.target.value })} className={inputClass} /></div>
            </div>
            <div><label className="block text-xs font-semibold mb-1.5 text-gray-600 dark:text-gray-400">Description (EN) *</label>
              <textarea required rows="3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={inputClass + ' resize-none'} /></div>
            <div><label className="block text-xs font-semibold mb-1.5 text-gray-600 dark:text-gray-400">Description (HI)</label>
              <textarea rows="3" value={form.descriptionHi} onChange={e => setForm({ ...form, descriptionHi: e.target.value })} className={inputClass + ' resize-none'} /></div>
            <div className="grid md:grid-cols-3 gap-4">
              <div><label className="block text-xs font-semibold mb-1.5 text-gray-600 dark:text-gray-400">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputClass}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select></div>
              <div><label className="block text-xs font-semibold mb-1.5 text-gray-600 dark:text-gray-400">Status</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={inputClass}>
                  <option value="active">Active</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="closed">Closed</option>
                </select></div>
              <div><label className="block text-xs font-semibold mb-1.5 text-gray-600 dark:text-gray-400">Gender</label>
                <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} className={inputClass}>
                  <option>All</option><option>Male</option><option>Female</option><option>Transgender</option>
                </select></div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div><label className="block text-xs font-semibold mb-1.5 text-gray-600 dark:text-gray-400">Min Age</label>
                <input type="number" min="0" value={form.minAge} onChange={e => setForm({ ...form, minAge: +e.target.value })} className={inputClass} /></div>
              <div><label className="block text-xs font-semibold mb-1.5 text-gray-600 dark:text-gray-400">Max Age</label>
                <input type="number" min="0" value={form.maxAge} onChange={e => setForm({ ...form, maxAge: +e.target.value })} className={inputClass} /></div>
              <div><label className="block text-xs font-semibold mb-1.5 text-gray-600 dark:text-gray-400">Max Income (0 = no limit)</label>
                <input type="number" min="0" value={form.maxIncome} onChange={e => setForm({ ...form, maxIncome: +e.target.value })} className={inputClass} /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="block text-xs font-semibold mb-1.5 text-gray-600 dark:text-gray-400">Ministry</label>
                <input value={form.ministry} onChange={e => setForm({ ...form, ministry: e.target.value })} className={inputClass} /></div>
              <div><label className="block text-xs font-semibold mb-1.5 text-gray-600 dark:text-gray-400">Website URL</label>
                <input value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} className={inputClass} /></div>
            </div>
            <div><label className="block text-xs font-semibold mb-1.5 text-gray-600 dark:text-gray-400">Benefits</label>
              <input value={form.benefits} onChange={e => setForm({ ...form, benefits: e.target.value })} className={inputClass} /></div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.popular} onChange={e => setForm({ ...form, popular: e.target.checked })} className="w-4 h-4 text-saffron border-gray-300 rounded focus:ring-saffron" />
                <span className="text-sm font-medium">Mark as Popular</span>
              </label>
            </div>
            <div className="flex gap-3 pt-3">
              <button type="submit" disabled={saving}
                className="flex-1 py-3 bg-gradient-to-r from-trigreen to-trigreen-dark text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {saving ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</> : `💾 ${t.save}`}
              </button>
              <button type="button" onClick={() => setEditing(null)} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-all">
                {t.cancel}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-navy text-white py-6">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">⚙️ {t.adminPanel}</h1>
          <div className="flex gap-3">
            <button onClick={handleNew} className="px-5 py-2 bg-saffron text-white rounded-lg font-medium hover:bg-saffron-dark transition-all text-sm">
              + {t.addScheme}
            </button>
            <button onClick={() => setAuthed(false)} className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 text-sm">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Schemes', count: schemes.length, color: 'bg-navy', icon: '📋' },
            { label: 'Active', count: schemes.filter(s => s.status === 'active').length, color: 'bg-trigreen', icon: '✅' },
            { label: 'Upcoming', count: schemes.filter(s => s.status === 'upcoming').length, color: 'bg-saffron', icon: '🔜' },
            { label: 'Popular', count: schemes.filter(s => s.popular).length, color: 'bg-purple-600', icon: '⭐' },
          ].map((s, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${s.color} rounded-lg flex items-center justify-center text-xl`}>{s.icon}</div>
                <div>
                  <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{s.count}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Schemes Table */}
        {loading ? (
          <div className="flex justify-center py-20"><div className="chakra-spinner" /></div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                    <th className="text-left px-4 py-3 font-semibold">Scheme</th>
                    <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Category</th>
                    <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Age</th>
                    <th className="text-left px-4 py-3 font-semibold">Status</th>
                    <th className="text-right px-4 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {schemes.map(scheme => (
                    <tr key={scheme._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900 dark:text-white">{scheme.name}</div>
                        {scheme.popular && <span className="text-xs text-saffron">⭐ Popular</span>}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-gray-600 dark:text-gray-400">{scheme.category}</td>
                      <td className="px-4 py-3 hidden lg:table-cell text-gray-600 dark:text-gray-400">{scheme.minAge}-{scheme.maxAge}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          scheme.status === 'active' ? 'bg-trigreen/10 text-trigreen' :
                          scheme.status === 'upcoming' ? 'bg-saffron/10 text-saffron' :
                          'bg-gray-100 text-gray-500'
                        }`}>{scheme.status}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleEdit(scheme)} className="px-3 py-1.5 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 font-medium transition-colors">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(scheme._id)} className="px-3 py-1.5 text-xs bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 font-medium transition-colors">
                            {t.deleteScheme}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}