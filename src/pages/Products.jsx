import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

function CategorySection({ cat, products, idx }) {
  const isSoon = cat.tag === 'soon'

  const accentColors = [
    { bg: 'bg-garden-50',  border: 'border-garden-200', emoji_bg: 'bg-garden-100', tag: 'bg-garden-100 text-garden-700' },
    { bg: 'bg-cyan-50',    border: 'border-cyan-200',   emoji_bg: 'bg-cyan-100',   tag: 'bg-cyan-100 text-cyan-700' },
    { bg: 'bg-amber-50',   border: 'border-amber-200',  emoji_bg: 'bg-amber-100',  tag: 'bg-amber-100 text-amber-700' },
    { bg: 'bg-orange-50',  border: 'border-orange-200', emoji_bg: 'bg-orange-100', tag: 'bg-orange-100 text-orange-700' },
    { bg: 'bg-rose-50',    border: 'border-rose-200',   emoji_bg: 'bg-rose-100',   tag: 'bg-rose-100 text-rose-700' },
    { bg: 'bg-violet-50',  border: 'border-violet-200', emoji_bg: 'bg-violet-100', tag: 'bg-violet-100 text-violet-700' },
  ]
  const color = accentColors[idx % accentColors.length]

  return (
    <div id={cat.id} className={`rounded-3xl border-2 ${color.border} ${color.bg} overflow-hidden`}>
      <div className="p-8 md:p-10">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          {/* Emoji icon */}
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

            <p className="text-garden-700 font-medium mb-4 leading-relaxed">{cat.description}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{cat.detail}</p>

            {/* Product list */}
            {cat.products && cat.products.length > 0 && (
              <div className="mb-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {cat.products.map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-white/70 rounded-xl px-3 py-2.5 text-sm text-gray-700 border border-white/80"
                    >
                      <span className="text-garden-500">✓</span>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isSoon ? (
              <div className="inline-flex items-center gap-2 text-sm text-wheat-700 bg-wheat-50 border border-wheat-200 rounded-xl px-4 py-2.5">
                <span>⏳</span>
                <span className="font-medium">{products.detailsNote}</span>
              </div>
            ) : (
              <Link to="/contact" className="btn-primary text-sm px-6 py-2.5">
                {products.priceNote}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Products() {
  const { t } = useLanguage()
  const p = t.products

  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? p.categories
    : p.categories.filter(c => c.tag === filter)

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
        </div>
      </section>

      {/* Category sections */}
      <section className="bg-cream py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {filtered.map((cat, i) => (
            <CategorySection key={cat.id} cat={cat} products={p} idx={t.products.categories.indexOf(cat)} />
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
