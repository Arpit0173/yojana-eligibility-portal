import { useState } from 'react'
import { useApp } from '../App'

export default function Contact() {
  const { t, lang } = useApp()
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-trigreen/90 to-trigreen text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold">{t.contactTitle}</h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">{lang === 'en' ? 'Get in Touch' : 'संपर्क करें'}</h2>
            {[
              { icon: '📞', label: t.helpline, value: '1800-111-555 (Toll Free)', sub: 'Mon-Sat, 9:00 AM - 6:00 PM' },
              { icon: '📧', label: 'Email', value: 'help@yojana.gov.in', sub: 'We reply within 48 hours' },
              { icon: '📍', label: lang === 'en' ? 'Address' : 'पता', value: 'Shastri Bhawan', sub: 'Dr. Rajendra Prasad Road, New Delhi - 110001' },
              { icon: '🌐', label: lang === 'en' ? 'Website' : 'वेबसाइट', value: 'www.yojana.gov.in', sub: '' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 card-hover">
                <div className="w-12 h-12 bg-saffron/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{item.value}</p>
                  {item.sub && <p className="text-xs text-gray-400 mt-0.5">{item.sub}</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-6">{lang === 'en' ? 'Send us a Message' : 'हमें संदेश भेजें'}</h3>
            {sent && (
              <div className="mb-4 p-3 bg-trigreen/10 text-trigreen rounded-lg text-sm font-medium animate-fade-in">
                ✅ {lang === 'en' ? 'Message sent successfully!' : 'संदेश सफलतापूर्वक भेजा गया!'}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" required placeholder={lang === 'en' ? 'Your Name' : 'आपका नाम'}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-saffron outline-none" />
              <input type="email" required placeholder={lang === 'en' ? 'Your Email' : 'आपका ईमेल'}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-saffron outline-none" />
              <input type="text" placeholder={lang === 'en' ? 'Subject' : 'विषय'}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-saffron outline-none" />
              <textarea rows="5" required placeholder={lang === 'en' ? 'Your Message' : 'आपका संदेश'}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-saffron outline-none resize-none" />
              <button type="submit"
                className="w-full py-3 bg-gradient-to-r from-saffron to-saffron-dark text-white font-bold rounded-xl hover:shadow-lg transition-all">
                {lang === 'en' ? '📩 Send Message' : '📩 संदेश भेजें'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}