import { Link } from 'react-router-dom'
import { useApp } from '../App'

export default function Footer() {
  const { t } = useApp()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="tricolor-border" />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">{t.quickLinks}</h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: t.home },
                { to: '/schemes', label: t.schemes },
                { to: '/about', label: t.about },
                { to: '/contact', label: t.contact },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm hover:text-saffron transition-colors">
                    › {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">{t.resources}</h4>
            <ul className="space-y-2">
              {['FAQs', 'Downloads', 'Grievance', 'RTI'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm hover:text-saffron transition-colors">› {item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">{t.importantLinks}</h4>
            <ul className="space-y-2">
              {[
                { label: 'Aadhaar', url: 'https://uidai.gov.in' },
                { label: 'Digital India', url: 'https://digitalindia.gov.in' },
                { label: 'MyGov', url: 'https://mygov.in' },
                { label: 'India.gov.in', url: 'https://india.gov.in' },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.url} target="_blank" rel="noreferrer"
                    className="text-sm hover:text-saffron transition-colors">
                    › {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">{t.contactInfo}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-saffron">📞</span>
                <span>{t.helpline}: 1800-111-555</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-saffron">📧</span>
                <span>help@yojana.gov.in</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-saffron mt-0.5">📍</span>
                <span>Shastri Bhawan, New Delhi - 110001</span>
              </li>
            </ul>

            {/* Chakra decoration */}
            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 border-2 border-saffron/40 rounded-full flex items-center justify-center animate-spin-slow">
                <span className="text-saffron text-lg">☸</span>
              </div>
              <span className="text-xs text-gray-500">सत्यमेव जयते</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">{t.copyright}</p>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-4 h-2 bg-saffron rounded-sm" />
              <div className="w-4 h-2 bg-white rounded-sm" />
              <div className="w-4 h-2 bg-trigreen rounded-sm" />
            </div>
            <span className="text-xs text-gray-500">Made with ❤️ for India</span>
          </div>
        </div>
      </div>
    </footer>
  )
}