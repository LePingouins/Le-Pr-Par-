import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

function InfoRow({ icon, label, value, href }) {
  return (
    <div className="flex items-start gap-3 py-4 border-b border-garden-100 last:border-0">
      <div className="w-10 h-10 rounded-xl bg-garden-50 border border-garden-100 flex items-center justify-center text-lg flex-shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-xs font-semibold text-garden-600 uppercase tracking-wider mb-0.5">{label}</div>
        {href ? (
          <a href={href} className="text-gray-800 hover:text-garden-700 transition-colors font-medium">
            {value}
          </a>
        ) : (
          <span className="text-gray-800 font-medium">{value}</span>
        )}
      </div>
    </div>
  )
}

export default function Contact() {
  const { t, lang } = useLanguage()
  const c = t.contact
  const f = c.form

  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Build mailto link as a simple static-site contact solution
    const body = encodeURIComponent(
      `Nom: ${form.name}\nCourriel: ${form.email}\n\n${form.message}`
    )
    const subject = encodeURIComponent(form.subject || 'Message via Le Pré Paré')
    window.location.href = `mailto:le.prepare1@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div>
      {/* Page hero */}
      <section className="page-hero">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span>✉️</span>
            <span>Le Pré Paré</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">{c.title}</h1>
          <p className="text-garden-200 text-lg leading-relaxed max-w-xl mx-auto">{c.subtitle}</p>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Contact info panel */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-sm border border-garden-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-br from-garden-700 to-garden-900 p-8 text-white">
                  <div className="w-16 h-16 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center text-3xl mb-4">
                    🌿
                  </div>
                  <h2 className="font-serif text-xl font-semibold mb-1">Chantal Paré</h2>
                  <p className="text-garden-300 text-sm">
                    {lang === 'fr' ? 'Fondatrice & Productrice' : 'Founder & Producer'}
                  </p>
                </div>

                {/* Info rows */}
                <div className="p-6">
                  <h3 className="font-serif text-lg font-semibold text-garden-800 mb-2">{c.info.title}</h3>
                  <InfoRow
                    icon="📞"
                    label={c.info.phone}
                    value={c.info.phoneValue}
                    href="tel:5146910949"
                  />
                  <InfoRow
                    icon="✉️"
                    label={c.info.email}
                    value={c.info.emailValue}
                    href="mailto:le.prepare1@gmail.com"
                  />
                  <InfoRow
                    icon="💳"
                    label={c.info.payment}
                    value={c.info.paymentValue}
                  />

                  {/* Social */}
                  <div className="pt-4">
                    <div className="text-xs font-semibold text-garden-600 uppercase tracking-wider mb-3">{c.info.social}</div>
                    <div className="flex gap-3">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors border border-blue-100"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Facebook
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-pink-600 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors border border-pink-100"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        Instagram
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-sm border border-garden-100 p-8 md:p-10">
                <h2 className="font-serif text-2xl font-semibold text-garden-800 mb-7">{f.title}</h2>

                {sent ? (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-6">🌿</div>
                    <h3 className="font-serif text-2xl text-garden-800 font-semibold mb-3">{f.successMsg}</h3>
                    <p className="text-gray-500">
                      {lang === 'fr'
                        ? 'Chantal vous répondra dans les meilleurs délais.'
                        : 'Chantal will get back to you as soon as possible.'}
                    </p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                      className="btn-secondary mt-8"
                    >
                      {lang === 'fr' ? 'Envoyer un autre message' : 'Send another message'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.name}</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder={f.namePlaceholder}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.email}</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder={f.emailPlaceholder}
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.subject}</label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder={f.subjectPlaceholder}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.message}</label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        placeholder={f.messagePlaceholder}
                        className="input-field resize-none"
                      />
                    </div>

                    <button type="submit" className="btn-primary w-full text-center py-4 text-base">
                      {f.send} ✉️
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      {lang === 'fr'
                        ? 'En envoyant ce formulaire, votre client de messagerie s\'ouvrira.'
                        : 'Sending this form will open your email client.'}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA banner */}
      <section className="bg-garden-800 text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-garden-300 text-sm uppercase tracking-widest font-medium mb-3">
            {lang === 'fr' ? 'Une question? Une commande?' : 'A question? An order?'}
          </p>
          <h2 className="font-serif text-3xl font-semibold mb-2">
            {lang === 'fr' ? 'On est l’à pour vous.' : 'We’re here for you.'}
          </h2>
          <p className="text-garden-300 text-sm mb-8">
            {lang === 'fr'
              ? 'Contactez-nous par téléphone ou par courriel — on vous répondra rapidement.'
              : 'Reach us by phone or email — we’ll get back to you quickly.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5146910949" className="btn-outline-white">
              📞 514-691-0949
            </a>
            <a href="mailto:le.prepare1@gmail.com" className="btn-outline-white">
              ✉️ {lang === 'fr' ? 'Écrire' : 'Email us'}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
