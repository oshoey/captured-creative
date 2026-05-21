import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import Intro from './components/Intro'
import Nav from './components/Nav'
import Hero from './components/Hero'
import FeaturedWork from './components/FeaturedWork'
import AllCarElectronics from './components/AllCarElectronics'
import Videography from './components/Videography'
import EditorialGallery from './components/EditorialGallery'
import Philosophy from './components/Philosophy'
import Services from './components/Services'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CapturedTransitionOverlay from './components/CapturedTransitionOverlay'

export default function App() {
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
        <Nav />
        <main>
          <Hero />
          <FeaturedWork />
          <AllCarElectronics />
          <Videography />
          <EditorialGallery />
          <div className="bottom-grid">
            <Philosophy />
            <Services />
            <Process />
            <Contact />
          </div>
        </main>
        <Footer />
      </motion.div>
    </>
  )
}
