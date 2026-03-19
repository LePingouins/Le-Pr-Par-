import { HashRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 page-enter">
            <Routes>
              <Route path="/"            element={<Home />} />
              <Route path="/produits"    element={<Products />} />
              <Route path="/qui-suis-je" element={<About />} />
              <Route path="/contact"     element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </LanguageProvider>
  )
}
