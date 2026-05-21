import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import Intro from './components/Intro'
import Nav from './components/Nav'
import Footer from './components/Footer'
import CapturedTransitionOverlay from './components/CapturedTransitionOverlay'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

function AppContent() {
  const [introComplete, setIntroComplete] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <CapturedTransitionOverlay />
      <Intro onComplete={() => setIntroComplete(true)} />

      <motion.div
        initial={{ opacity: 0, scale: 1.018 }}
        animate={{ opacity: introComplete ? 1 : 0, scale: introComplete ? 1 : 1.018 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'center top' }}
      >
        <ScrollToTop />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </motion.div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
