import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/',            label: t.nav.home },
    { to: '/produits',    label: t.nav.products },
    { to: '/qui-suis-je', label: t.nav.about },
    { to: '/contact',     label: t.nav.contact },
  ]

  const activeClass = 'text-garden-700 border-b-2 border-garden-500 pb-0.5'
  const idleClass   = 'text-gray-600 hover:text-garden-700'

  return (
    <nav aria-label="Navigation principale" className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-garden-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
            <img
              src="/images/logo2.png"
              alt="Le Pré Paré logo"
              className="h-10 w-10 rounded-full object-cover border-2 border-garden-200 group-hover:border-garden-400 transition-colors"
              onError={e => { e.target.style.display = 'none' }}
            />
            <div>
              <div className="font-serif text-lg font-semibold text-garden-800 leading-tight">
                Le Pré Paré
              </div>
              <div className="text-[11px] text-garden-600 font-medium hidden sm:block tracking-wide">
                Producteur Maraîcher
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${isActive ? activeClass : idleClass}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Lang toggle + mobile hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="text-xs font-semibold bg-garden-50 border border-garden-200 text-garden-700
                         px-3 py-1.5 rounded-full hover:bg-garden-100 transition-colors tracking-wider"
              aria-label="Switch language"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>

            <button
              className="md:hidden text-gray-600 hover:text-garden-700 p-1"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden border-t border-garden-100 py-3 space-y-1">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-garden-50 text-garden-700'
                      : 'text-gray-600 hover:bg-garden-50 hover:text-garden-700'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
