import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FeaturedWork from '../components/FeaturedWork'
import Videography from '../components/Videography'
import EditorialGallery from '../components/EditorialGallery'
import AllCarElectronics from '../components/AllCarElectronics'

export default function WorkPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true })

  return (
    <>
      <div ref={headerRef} className="page-hero">
        <div className="page-hero-inner">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="label"
            style={{ display: 'block', marginBottom: '24px', color: '#A1A1A1' }}
          >
            01 — Selected Work
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="page-hero-title"
          >
            Work.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="label"
            style={{ color: '#A1A1A1', marginTop: '22px', maxWidth: '380px', lineHeight: 2 }}
          >
            Websites, platforms, and digital experiences — built for businesses that care about how they look.
          </motion.p>
        </div>
      </div>

      <FeaturedWork />
      <Videography />
      <EditorialGallery />
      <AllCarElectronics />
    </>
  )
}
