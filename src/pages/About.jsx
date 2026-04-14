import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

function ValueCard({ icon, title, text }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-garden-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-garden-50 flex items-center justify-center text-2xl mb-4 border border-garden-100">
        {icon}
      </div>
      <h3 className="font-serif text-lg font-semibold text-garden-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
    </div>
  )
}

export default function About() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <div>
      {/* Page hero */}
      <section className="page-hero">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span>🌸</span>
            <span>Le Pré Paré</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">{a.title}</h1>
          <p className="text-garden-200 text-lg">{a.subtitle}</p>
        </div>
      </section>

      {/* Bio section */}
      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Image side */}
            <div className="relative order-2 lg:order-1">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
                <img
                  src="/images/pp3.png"
                  alt="Chantal Paré, fondatrice de LePréparé (Le Pré Paré), productrice maraîchère artisanale"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={e => {
                    e.target.parentElement.className += ' bg-gradient-to-br from-garden-100 to-garden-200 flex flex-col items-center justify-center gap-6'
                    e.target.remove()
                    e.target.parentElement.innerHTML += `
                      <div style="font-size:6rem">🌱</div>
                      <p style="font-family:Georgia,serif;font-size:1.5rem;color:#1b3a2b;font-weight:600">Le Pré Paré</p>
                      <p style="color:#418b62;font-size:0.9rem">Senneville, QC</p>`
                  }}
                />
              </div>
              {/* Decoration card */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-5 border border-garden-100 max-w-[180px]">
                <div className="text-3xl mb-2">🌿</div>
                <div className="font-serif text-garden-800 font-semibold text-sm">100% Écologique</div>
                <div className="text-xs text-gray-500 mt-1">Sans pesticides</div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-garden-700 rounded-2xl shadow-xl p-5 text-white">
                <div className="font-serif font-semibold">{a.name}</div>
                <div className="text-xs text-garden-300 mt-0.5">{a.role}</div>
              </div>
            </div>

            {/* Text side */}
            <div className="order-1 lg:order-2">
              <div className="leaf-divider justify-start mb-8">
                <span className="text-sm font-semibold text-garden-600 tracking-widest uppercase">
                  {a.name}
                </span>
              </div>

              <div className="space-y-5">
                {a.bio.map((para, i) => {
                  const isLast = i === a.bio.length - 1
                  return (
                    <p
                      key={i}
                      className={`leading-relaxed ${
                        isLast
                          ? 'text-garden-700 font-semibold text-lg italic border-l-4 border-garden-400 pl-4'
                          : 'text-gray-700 text-lg'
                      }`}
                    >
                      {para}
                    </p>
                  )
                })}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/produits" className="btn-primary">
                  {t.nav.products}
                </Link>
                <Link to="/contact" className="btn-secondary">
                  {a.contact.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="section-title mb-4">{a.values.title}</h2>
            <div className="w-16 h-1 bg-garden-400 rounded-full mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {a.values.items.map((v, i) => (
              <ValueCard key={i} {...v} />
            ))}
          </div>
        </div>
      </section>

      {/* Photo + quote banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/pp1.png"
            alt="Jardin"
            className="w-full h-full object-cover"
            onError={e => { e.target.parentElement.className += ' bg-garden-800'; e.target.remove() }}
          />
          <div className="absolute inset-0 bg-garden-900/75" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 py-20 text-center text-white">
          <p className="font-serif text-2xl sm:text-3xl italic text-white/95 leading-relaxed mb-8">
            "Cultivé avec amour et passion;<br className="hidden sm:block" /> de mon jardin à votre assiette."
          </p>
          <div className="font-medium text-garden-300">— Chantal Paré, fondatrice</div>
          <div className="mt-8">
            <Link to="/contact" className="btn-outline-white">
              {a.contact.title}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
