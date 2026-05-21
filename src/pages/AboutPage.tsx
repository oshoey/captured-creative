import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const values = [
  {
    title: 'Quality Over Volume',
    desc: 'We take on fewer projects so we can give each one the time, care, and craft it deserves.',
  },
  {
    title: 'Honest Craft',
    desc: 'No templates. No shortcuts. Every pixel, word, and interaction is deliberate.',
  },
  {
    title: 'Results That Matter',
    desc: 'Premium design is only valuable if it actually works for your business.',
  },
]

function ValuePanel({ value, index }: { value: (typeof values)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="about-value-panel"
      style={{
        padding: '52px 40px',
        borderRight: index < 2 ? '1px solid var(--border)' : 'none',
      }}
    >
      <span className="section-num" style={{ display: 'block', marginBottom: '24px' }}>
        0{index + 1}
      </span>
      <h3 style={{
        fontSize: '18px',
        fontWeight: 500,
        letterSpacing: '-0.01em',
        color: '#F5F5F5',
        marginBottom: '14px',
      }}>
        {value.title}
      </h3>
      <p style={{ fontSize: '13px', lineHeight: 1.8, color: '#A1A1A1', maxWidth: '280px' }}>
        {value.desc}
      </p>
    </motion.div>
  )
}

export default function AboutPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLElement>(null)
  const isInView = useInView(headerRef, { once: true })
  const bodyInView = useInView(bodyRef, { once: true, margin: '-80px' })

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
            03 — About
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="page-hero-title"
          >
            About.
          </motion.h1>
        </div>
      </div>

      {/* Main copy */}
      <section
        ref={bodyRef}
        className="about-content"
      >
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={bodyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              color: '#F5F5F5',
              marginBottom: '28px',
            }}
          >
            A modern<br />creative studio.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={bodyInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="label"
            style={{ color: '#A1A1A1', letterSpacing: '0.08em', lineHeight: 2.2 }}
          >
            Est. 2024 — United Kingdom
          </motion.p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {[
            'Captured is a modern creative studio helping brands and businesses look sharper, feel more premium, and perform better online.',
            'We work across website design, branding, photography, and film — bringing a consistent level of care and craft to everything we build.',
            'We\'re not a template shop. Every project is built from scratch, shaped around your business, your audience, and what you\'re trying to achieve.',
            'Whether you\'re a business looking for your first website or an established brand that needs a serious upgrade — we\'re here to make it happen.',
          ].map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={bodyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.07, ease: 'easeOut' }}
              style={{
                fontSize: '15px',
                fontWeight: 400,
                lineHeight: 1.82,
                color: i === 0 ? '#E8E8E8' : '#A1A1A1',
                letterSpacing: '0.01em',
              }}
            >
              {text}
            </motion.p>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={bodyInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ paddingTop: '16px' }}
          >
            <Link
              to="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#A1A1A1',
                transition: 'color 0.25s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F5')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1A1')}
            >
              Start a Project <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section
        className="about-values"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        {values.map((v, i) => (
          <ValuePanel key={i} value={v} index={i} />
        ))}
      </section>
    </>
  )
}
