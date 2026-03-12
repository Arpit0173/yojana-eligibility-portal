import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useApp } from '../App'

export default function Header() {
  const { t, lang, toggleLang, dark, toggleDark } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: '/', label: t.home },
    { to: '/schemes', label: t.schemes },
    { to: '/eligibility', label: t.eligibility },
    { to: '/upcoming', label: t.upcoming },
    { to: '/about', label: t.about },
    { to: '/contact', label: t.contact },
  ]

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* Top tricolor bar */}
      <div className="tricolor-border" />

      {/* Main header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            {/* Emblem */}
            <div className="flex flex-col items-center">
              <span className="text-3xl">🏛️</span>
              <div className="ashoka-chakra w-8 h-8 !border-2" style={{ fontSize: 0 }}>
                <span style={{ fontSize: '18px' }}>☸</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-navy dark:text-saffron leading-tight">
                {t.title}
              </h1>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {t.tagline}
              </p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 text-sm bg-saffron/10 text-saffron border border-saffron rounded-full hover:bg-saffron hover:text-white transition-all font-medium"
            >
              {lang === 'en' ? 'हिंदी' : 'English'}
            </button>
            <button
              onClick={toggleDark}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-xl"
              title="Toggle dark mode"
            >
              {dark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-navy dark:bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {links.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-link px-4 py-3 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all ${isActive ? 'active bg-white/10 text-white' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-3 text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Admin link */}
            {/* <Link
              to="/admin"
              className="hidden md:flex items-center gap-1 px-4 py-3 text-sm font-medium text-saffron hover:text-white hover:bg-white/10 transition-all"
            >
              ⚙️ Admin
            </Link> */}
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden pb-3 animate-fade-in">
              {links.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 rounded transition-all ${isActive ? 'bg-white/10 text-white font-medium' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 text-sm text-saffron hover:bg-white/10 rounded transition-all"
              >
                ⚙️ Admin
              </Link>
            </div>
          )}
        </div>
        {/* Bottom tricolor line */}
        <div className="tricolor-border" />
      </nav>
    </header>
  )
}