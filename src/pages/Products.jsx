import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

function ImageLightbox({ src, alt, onClose }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
        <img
          src={src}
          alt={alt}
          className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
        />
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white text-gray-800 flex items-center justify-center shadow-lg text-sm font-bold hover:bg-gray-100 transition-colors"
          aria-label="Fermer"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  )
}

const seasonColors = {
  spring:        'bg-green-100 text-green-700',
  summer:        'bg-yellow-100 text-yellow-700',
  fall:          'bg-orange-100 text-orange-700',
  winter:        'bg-sky-100 text-sky-700',
  'all-seasons': 'bg-emerald-100 text-emerald-700',
}

function ProductCard({ item, products, cardBg }) {
  const [lightbox, setLightbox] = useState(false)

  return (
    <>
      {lightbox && item.image && (
        <ImageLightbox src={item.image} alt={item.name} onClose={() => setLightbox(false)} />
      )}
      <div className={`rounded-2xl overflow-hidden border border-white/80 shadow-sm flex flex-col ${cardBg} transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.02]`}>
        {/* Image */}
        <div className="aspect-[4/3] bg-garden-100 overflow-hidden relative">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 hover:scale-105"
              onClick={() => setLightbox(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl text-garden-300">
              🌿
            </div>
          )}
{(() => {
          const seasons = Array.isArray(item.season)
            ? item.season
            : item.season ? [item.season] : []
          return seasons.length > 0 ? (
            <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
              {seasons.map(s => (
                <span key={s} className={`text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm ${seasonColors[s] ?? 'bg-gray-100 text-gray-600'}`}>
                  {products.seasons?.[s] ?? s}
                </span>
              ))}
            </div>
          ) : null
        })()}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-garden-900 text-sm leading-snug mb-1">{item.name}</h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-3 flex-1">{item.description}</p>

        {item.use && (
          <div className="flex items-start gap-1.5 text-xs text-garden-700 mb-3">
            <span className="mt-0.5 flex-shrink-0">🍽️</span>
            <span><span className="font-medium">{products.useLabel}:</span> {item.use}</span>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-black/5">
          {item.volume && (
            <span className="text-xs text-gray-400">{item.volume}</span>
          )}
          <span className="text-sm font-bold text-garden-800 ml-auto">
            {item.price}{item.taxable && <span className="text-xs font-normal text-gray-400"> {products.taxLabel}</span>}
          </span>
        </div>
      </div>
    </div>
    </>
  )
}

function CategorySection({ cat, products, idx }) {
  const isSoon = cat.tag === 'soon'

  const accentColors = [
    { bg: 'bg-garden-50',  border: 'border-garden-200', emoji_bg: 'bg-garden-100', tag: 'bg-garden-100 text-garden-700',  card: 'bg-white' },
    { bg: 'bg-cyan-50',    border: 'border-cyan-200',   emoji_bg: 'bg-cyan-100',   tag: 'bg-cyan-100 text-cyan-700',      card: 'bg-white' },
    { bg: 'bg-amber-50',   border: 'border-amber-200',  emoji_bg: 'bg-amber-100',  tag: 'bg-amber-100 text-amber-700',    card: 'bg-white' },
    { bg: 'bg-orange-50',  border: 'border-orange-200', emoji_bg: 'bg-orange-100', tag: 'bg-orange-100 text-orange-700',  card: 'bg-white' },
    { bg: 'bg-rose-50',    border: 'border-rose-200',   emoji_bg: 'bg-rose-100',   tag: 'bg-rose-100 text-rose-700',      card: 'bg-white' },
    { bg: 'bg-violet-50',  border: 'border-violet-200', emoji_bg: 'bg-violet-100', tag: 'bg-violet-100 text-violet-700',  card: 'bg-white' },
  ]
  const color = accentColors[idx % accentColors.length]

  return (
    <div id={cat.id} className={`rounded-3xl border-2 ${color.border} ${color.bg} overflow-hidden`}>
      <div className="p-8 md:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-8">
          <div className={`w-16 h-16 rounded-2xl ${color.emoji_bg} flex items-center justify-center text-3xl flex-shrink-0 shadow-sm`}>
            {cat.emoji}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h2 className="font-serif text-2xl font-semibold text-garden-900">{cat.name}</h2>
              {isSoon ? (
                <span className="badge-soon">{products.comingSoonLabel}</span>
              ) : (
                <span className="badge-available">{products.availableLabel}</span>
              )}
            </div>
            <p className="text-garden-700 font-medium mb-2 leading-relaxed">{cat.description}</p>
            <p className="text-gray-600 leading-relaxed text-sm">{cat.detail}</p>
          </div>
        </div>

        {/* Product grid or coming soon */}
        {isSoon ? (
          <div className="inline-flex items-center gap-2 text-sm text-wheat-700 bg-wheat-50 border border-wheat-200 rounded-xl px-4 py-2.5">
            <span>⏳</span>
            <span className="font-medium">{products.comingSoonLabel}</span>
          </div>
        ) : cat.items && cat.items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {cat.items.map((item, i) => (
              <ProductCard key={i} item={{ season: cat.defaultSeason, taxable: cat.taxable, ...item }} products={products} cardBg={color.card} />
            ))}
          </div>
        ) : null}

        {/* Order CTA */}
        {!isSoon && (
          <div className="mt-8">
            <Link to="/contact" className="btn-primary text-sm px-6 py-2.5">
              {products.orderBtn}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Products() {
  const { t } = useLanguage()
  const p = t.products

  const [filter, setFilter] = useState('all')

  const SEASON_KEYS = ['spring', 'summer', 'fall', 'winter', 'all-seasons']

  const getItemSeasons = (item, cat) => {
    const s = item.season ?? cat.defaultSeason
    return Array.isArray(s) ? s : (s ? [s] : [])
  }

  const filtered = (() => {
    if (filter === 'all') return p.categories
    if (!SEASON_KEYS.includes(filter)) {
      return p.categories.filter(c => c.tag === filter)
    }
    return p.categories
      .map(c => {
        if (c.tag === 'soon') return null
        const items = (c.items || []).filter(item => {
          const seasons = getItemSeasons(item, c)
          return filter === 'all-seasons'
            ? seasons.includes('all-seasons')
            : seasons.includes(filter) || seasons.includes('all-seasons')
        })
        if (items.length === 0) return null
        return { ...c, items }
      })
      .filter(Boolean)
  })()

  return (
    <div>
      {/* Page hero */}
      <section className="page-hero">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span>🛒</span>
            <span>Le Pré Paré</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">{p.title}</h1>
          <p className="text-garden-200 text-lg leading-relaxed max-w-2xl mx-auto">{p.subtitle}</p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="bg-white border-b border-garden-100 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-garden-600 text-white'
                : 'bg-garden-50 text-garden-700 hover:bg-garden-100'
            }`}
          >
            {t.nav.products}
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'available'
                ? 'bg-garden-600 text-white'
                : 'bg-garden-50 text-garden-700 hover:bg-garden-100'
            }`}
          >
            {p.availableLabel}
          </button>
          <button
            onClick={() => setFilter('soon')}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'soon'
                ? 'bg-wheat-500 text-white'
                : 'bg-wheat-50 text-wheat-700 hover:bg-wheat-100'
            }`}
          >
            {p.comingSoonLabel}
          </button>

          <div className="h-6 w-px bg-garden-200 flex-shrink-0 mx-1" />

          {[
            { key: 'spring',       emoji: '🌸', active: 'bg-green-600 text-white',   inactive: 'bg-green-50 text-green-700 hover:bg-green-100' },
            { key: 'summer',       emoji: '☀️',  active: 'bg-yellow-500 text-white',  inactive: 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100' },
            { key: 'fall',         emoji: '🍂', active: 'bg-orange-500 text-white',  inactive: 'bg-orange-50 text-orange-700 hover:bg-orange-100' },
            { key: 'winter',       emoji: '❄️',  active: 'bg-sky-600 text-white',     inactive: 'bg-sky-50 text-sky-700 hover:bg-sky-100' },
            { key: 'all-seasons',  emoji: '🌿', active: 'bg-emerald-600 text-white', inactive: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' },
          ].map(({ key, emoji, active, inactive }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === key ? active : inactive}`}
            >
              {emoji} {p.seasons[key]}
            </button>
          ))}
        </div>
      </section>

      {/* Category sections */}
      <section className="bg-cream py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {filtered.map((cat) => (
            <CategorySection key={cat.id} cat={cat} products={p} idx={t.products.categories.findIndex(c => c.id === cat.id)} />
          ))}
        </div>
      </section>

      {/* Payment info */}
      <section className="bg-garden-800 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="text-3xl mb-4">💳</div>
          <h2 className="font-serif text-2xl font-semibold mb-3">{p.payment.title}</h2>
          <p className="text-garden-300 mb-6">{p.payment.text}</p>
          <Link to="/contact" className="btn-outline-white">
            {t.nav.contact}
          </Link>
        </div>
      </section>
    </div>
  )
}
