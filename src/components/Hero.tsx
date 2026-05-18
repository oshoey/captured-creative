import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true })

  // Parallax — image drifts slowly upward as the page scrolls
  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 700], ['0%', '10%'])

  return (
    <section ref={sectionRef} id="hero" className="hero-grid">
      {/* ─── LEFT: text ─── */}
      <div
        className="hero-copy"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '0 40px 64px',
          paddingTop: 'var(--nav-height)',
          // Left column stays pure black — no gradient bleed
          backgroundColor: 'var(--black)',
        }}
      >
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{
            position: 'absolute',
            top: 'calc(var(--nav-height) + 48px)',
            left: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '14px',
          }}
        >
          <div
            style={{
              width: '1px',
              height: '36px',
              backgroundColor: 'var(--grey)',
              opacity: 0.4,
            }}
          />
          <span className="label" style={{ opacity: 0.6 }}>Scroll To Explore</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(68px, 10.5vw, 150px)',
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            color: '#F5F5F5',
            marginBottom: '28px',
          }}
        >
          Captured.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.28, ease: 'easeOut' }}
          className="label"
          style={{ maxWidth: '300px', lineHeight: 2, color: '#A1A1A1', marginBottom: '44px' }}
        >
          Digital experiences, websites,<br />
          and visual identity for modern businesses.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.42, ease: 'easeOut' }}
          style={{ display: 'flex', gap: '28px', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="#work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 22px',
              border: '1px solid rgba(245,245,245,0.2)',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#F5F5F5',
              transition: 'border-color 0.3s, background-color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(245,245,245,0.45)'
              e.currentTarget.style.backgroundColor = 'rgba(245,245,245,0.04)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(245,245,245,0.2)'
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            View Work <ArrowRight size={11} strokeWidth={1.5} />
          </a>

          <a
            href="#contact"
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
            Contact Us <ArrowRight size={11} strokeWidth={1.5} />
          </a>
        </motion.div>
      </div>

      {/* ─── RIGHT: hero photograph ─── */}
      <div
        className="hero-image-col"
        style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}
      >
        {/*
         * Parallax wrapper — 115% tall so the image has room to drift
         * without exposing a gap at top or bottom
         */}
        <motion.div
          style={{
            position: 'absolute',
            top: '-7.5%',
            left: 0,
            right: 0,
            height: '115%',
            y: imageY,
            willChange: 'transform',
          }}
        >
          <img
            src="/images/hero.jpg"
            alt="Photographer framed by stone archway"
            loading="eager"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              // Focus on the archway and figure in the center of the frame
              objectPosition: '50% 38%',
              display: 'block',
            }}
          />
        </motion.div>

        {/* Darkening overlay — readability + mood without crushing blacks */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(5, 5, 5, 0.28)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Left-edge dissolve — blends image into the pure-black text column */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: '160px',
            background: 'linear-gradient(to right, var(--black) 0%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Studio descriptor — bottom right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.75 }}
          style={{
            position: 'absolute',
            bottom: '64px',
            right: '40px',
            zIndex: 3,
            textAlign: 'right',
          }}
        >
          <p className="label" style={{ lineHeight: 2.4, color: 'rgba(245,245,245,0.65)' }}>
            A digital studio<br />
            focused on quality,<br />
            intention &amp; impact.
          </p>
          <div
            style={{
              width: '28px',
              height: '1px',
              backgroundColor: 'rgba(245,245,245,0.3)',
              marginTop: '16px',
              marginLeft: 'auto',
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
