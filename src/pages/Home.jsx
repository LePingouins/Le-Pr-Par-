import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

/* ── Helpers ─────────────────────────────────────────── */
function FeatureCard({ icon, title, text }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white shadow-sm border border-garden-100 hover:shadow-md transition-shadow">
      <span className="text-4xl mb-4">{icon}</span>
      <h3 className="font-serif text-garden-800 font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
    </div>
  )
}

function CategoryCard({ cat, langProducts, idx }) {
  const gradients = [
    'from-garden-50 to-garden-100',
    'from-blue-50 to-cyan-50',
    'from-amber-50 to-yellow-50',
    'from-orange-50 to-amber-50',
    'from-rose-50 to-pink-50',
    'from-purple-50 to-violet-50',
  ]
  const borders = [
    'border-garden-200',
    'border-cyan-200',
    'border-amber-200',
    'border-orange-200',
    'border-rose-200',
    'border-purple-200',
  ]

  return (
    <Link to="/produits" className="block group h-full">
      <div className={`card h-full border ${borders[idx % borders.length]} bg-gradient-to-br ${gradients[idx % gradients.length]} group-hover:-translate-y-1 transition-transform duration-300`}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <span className="text-4xl">{cat.emoji}</span>
            {cat.tag === 'soon' ? (
              <span className="badge-soon">{langProducts.comingSoonLabel}</span>
            ) : cat.limited ? (
              <span className="badge-limited">{langProducts.limitedLabel}</span>
            ) : (
              <span className="badge-available">{langProducts.availableLabel}</span>
            )}
          </div>
          <h3 className="font-serif text-garden-800 font-semibold text-lg mb-2 leading-snug">{cat.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{cat.description}</p>
        </div>
      </div>
    </Link>
  )
}

/* ── Page ─────────────────────────────────────────────── */
export default function Home() {
  const { t } = useLanguage()
  const h = t.home

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="/images/pp1.png"
            alt="Jardin Le Pré Paré"
            className="w-full h-full object-cover"
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-garden-900/80 via-garden-800/70 to-garden-600/60" />
          {/* Decorative leaves overlay */}
          <div className="absolute inset-0 bg-leaf-pattern opacity-20" />
        </div>

        {/* Fallback gradient when no image */}
        <div className="absolute inset-0 bg-gradient-to-br from-garden-900 via-garden-700 to-garden-500 -z-10" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
            <span>🌿</span>
            <span>{h.hero.subtitle}</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-md">
            {h.hero.title}
          </h1>

          <p className="text-xl sm:text-2xl font-light italic text-white/90 max-w-2xl mx-auto mb-4 leading-relaxed">
            {h.hero.slogan.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>

          <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
            {h.hero.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/produits" className="btn-primary text-base px-8 py-3.5">
              {h.hero.cta}
            </Link>
            <Link to="/qui-suis-je" className="btn-outline-white text-base px-8 py-3.5">
              {h.hero.ctaAbout}
            </Link>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/60">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── FEATURES STRIP ───────────────────────────────── */}
      <section className="bg-white py-16 border-b border-garden-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {h.features.map((f, i) => (
              <FeatureCard key={i} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR STORY ────────────────────────────────────── */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <div className="leaf-divider justify-start mb-6">
                <span className="text-sm font-semibold text-garden-600 tracking-widest uppercase">
                  {h.story.badge}
                </span>
              </div>
              <h2 className="section-title mb-6">{h.story.title}</h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">{h.story.text}</p>
              <Link to="/qui-suis-je" className="btn-primary">{h.story.cta}</Link>
            </div>
            {/* Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/pp2.png"
                  alt="Chantal Paré — Le Pré Paré"
                  className="w-full h-80 lg:h-96 object-cover"
                  onError={e => {
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-80 lg:h-96 bg-gradient-to-br from-garden-100 to-garden-200 flex flex-col items-center justify-center gap-4">
                        <span style="font-size:5rem">🌱</span>
                        <p class="text-garden-600 font-serif text-xl">Le Pré Paré</p>
                      </div>`
                  }}
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-garden-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-garden-100 flex items-center justify-center text-2xl">🌿</div>
                  <div>
                    <div className="font-serif font-semibold text-garden-800">Chantal Paré</div>
                    <div className="text-xs text-garden-600">Fondatrice & Productrice</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT CATEGORIES ───────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title mb-4">{h.categories.title}</h2>
            <p className="section-subtitle max-w-2xl mx-auto">{h.categories.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.products.categories.map((cat, i) => (
              <CategoryCard key={cat.id} cat={cat} langProducts={t.products} idx={i} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/produits" className="btn-secondary">
              {t.nav.products} →
            </Link>
          </div>
        </div>
      </section>

      {/* ── GALLERY STRIP ────────────────────────────────── */}
      <section className="py-4 bg-garden-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4">
            {['/images/pp1.png', '/images/pp2.png', '/images/pp3.png'].map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={src}
                  alt={`Jardin Le Pré Paré ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={e => {
                    e.target.parentElement.className += ' bg-garden-100 flex items-center justify-center'
                    e.target.remove()
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section className="bg-gradient-to-br from-garden-700 to-garden-900 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-5">{h.cta.title}</h2>
          <p className="text-garden-200 text-lg mb-10 leading-relaxed">{h.cta.text}</p>
          <Link to="/contact" className="btn-outline-white text-base px-10 py-4">
            {h.cta.btn}
          </Link>
        </div>
      </section>
    </div>
  )
}
