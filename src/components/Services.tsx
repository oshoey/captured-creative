import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const services = [
  'Website Design',
  'Online Ordering Systems',
  'Branding',
  'Photography & Video',
  'Hosting & Maintenance',
]

export default function Services() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="services"
      className="bottom-grid-section"
      ref={ref}
      style={{
        padding: '52px 40px',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="section-header"
      >
        <span className="section-num">03</span>
        <div className="section-header-line" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: 'clamp(28px, 3vw, 42px)',
          fontWeight: 600,
          lineHeight: 1.08,
          letterSpacing: '-0.025em',
          color: '#F5F5F5',
          marginBottom: '36px',
        }}
      >
        Services
      </motion.h2>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {services.map((service, i) => (
          <motion.div
            key={service}
            initial={{ opacity: 0, x: -8 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.14 + i * 0.07, ease: 'easeOut' }}
            whileHover={{ x: 3 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '13px 0',
              borderBottom: '1px solid var(--border)',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span className="section-num">0{i + 1}</span>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  color: '#F5F5F5',
                }}
              >
                {service}
              </span>
            </div>
            <ArrowRight size={12} strokeWidth={1.5} color="#A1A1A1" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
