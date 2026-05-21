import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import FeaturedWork from '../components/FeaturedWork'
import FeaturedVideoWork from '../components/FeaturedVideoWork'

const services = [
  { num: '01', title: 'Website Design', desc: 'Custom sites, built from scratch.' },
  { num: '02', title: 'Branding', desc: 'Identity systems that last.' },
  { num: '03', title: 'Photography & Video', desc: 'Premium visual content.' },
  { num: '04', title: 'Monthly Retainers', desc: 'Ongoing care & growth.' },
]

export default function HomePage() {
  const servicesRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const servicesInView = useInView(servicesRef, { once: true, margin: '-80px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' })

  return (
    <>
      <Hero />
      <FeaturedWork />
      <FeaturedVideoWork />

      {/* Services teaser */}
      <section ref={servicesRef} style={{ borderTop: '1px solid var(--border)', padding: '80px 40px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '52px',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 'clamp(28px, 3vw, 42px)',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              color: '#F5F5F5',
            }}
          >
            What We Do
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={servicesInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/services"
              className="label"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#A1A1A1', transition: 'color 0.25s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F5')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1A1')}
            >
              All Services <ArrowRight size={11} strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>

        <div className="home-services-grid">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 16 }}
              animate={servicesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '24px',
                paddingBottom: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <span className="section-num">{s.num}</span>
              <p style={{ fontSize: '15px', fontWeight: 400, letterSpacing: '0.005em', color: '#F5F5F5', lineHeight: 1.35 }}>
                {s.title}
              </p>
              <p style={{ fontSize: '11px', letterSpacing: '0.04em', color: '#A1A1A1', lineHeight: 1.6 }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div
        ref={ctaRef}
        style={{
          borderTop: '1px solid var(--border)',
          padding: '128px 40px',
          textAlign: 'center',
          background: 'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(22,22,22,0.9) 0%, var(--black) 70%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 100% 80% at 50% 100%, rgba(245,245,245,0.018) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <motion.p
          initial={{ opacity: 0 }}
          animate={ctaInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="label"
          style={{ color: '#A1A1A1', marginBottom: '24px', position: 'relative' }}
        >
          Ready to start?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(40px, 6.5vw, 96px)',
            fontWeight: 700,
            lineHeight: 0.94,
            letterSpacing: '-0.03em',
            color: '#F5F5F5',
            marginBottom: '56px',
            position: 'relative',
          }}
        >
          Let's build something<br />
          <span style={{ color: '#A1A1A1' }}>memorable.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', position: 'relative' }}
        >
          <Link
            to="/work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 28px',
              border: '1px solid rgba(245,245,245,0.18)',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#F5F5F5',
              transition: 'border-color 0.3s, background-color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(245,245,245,0.38)'
              e.currentTarget.style.backgroundColor = 'rgba(245,245,245,0.04)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(245,245,245,0.18)'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            View Work <ArrowRight size={11} strokeWidth={1.5} />
          </Link>

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
    </>
  )
}
