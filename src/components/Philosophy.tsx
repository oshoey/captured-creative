import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Philosophy() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  // Light section — overrides the global dark palette for contrast
  const darkText = '#050505'
  const mutedText = '#4a4a4a'
  const dimText = '#7a7a7a'
  const borderDark = 'rgba(5, 5, 5, 0.12)'

  return (
    <section
      id="philosophy"
      className="bottom-grid-section"
      ref={ref}
      style={{
        padding: '52px 40px',
        borderRight: `1px solid ${borderDark}`,
        background: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '400px',
      }}
    >
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="section-num" style={{ color: dimText }}>02</span>
          <div className="section-header-line" style={{ backgroundColor: borderDark }} />
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
            color: darkText,
            marginBottom: '24px',
          }}
        >
          Built With<br />Intention.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          style={{
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            lineHeight: 2,
            color: mutedText,
            maxWidth: '280px',
          }}
        >
          We create digital experiences that are thoughtful, strategic and designed to elevate your brand in a modern world.
        </motion.p>
      </div>

      <motion.a
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        href="#philosophy"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '11px',
          fontWeight: 400,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: mutedText,
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = darkText)}
        onMouseLeave={(e) => (e.currentTarget.style.color = mutedText)}
      >
        About Captured <ArrowRight size={11} strokeWidth={1.5} />
      </motion.a>
    </section>
  )
}
