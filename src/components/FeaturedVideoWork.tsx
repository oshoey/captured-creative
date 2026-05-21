import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function FeaturedVideoWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(false)

  const handleEnter = () => {
    setHovered(true)
    videoRef.current?.play()
  }

  const handleLeave = () => {
    setHovered(false)
  }

  return (
    <section
      ref={sectionRef}
      style={{
        borderTop: '1px solid var(--border)',
        background: 'linear-gradient(to bottom, #080808 0%, var(--black) 100%)',
      }}
    >
      {/* Section label row */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="video-section-header"
        style={{
          padding: '56px 40px 40px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div>
          <p
            className="label"
            style={{ color: '#A1A1A1', marginBottom: '20px', letterSpacing: '0.22em' }}
          >
            Featured Video Work
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: '#F5F5F5',
            }}
          >
            Narrative Film
          </h2>
        </div>

        <p
          className="label"
          style={{ color: 'rgba(161,161,161,0.45)', flexShrink: 0, textAlign: 'right' }}
        >
          Cinematic
        </p>
      </motion.div>

      {/* BELIAL card — full bleed */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="video-section-card-wrap"
        style={{ padding: '0 40px 72px' }}
      >
        <div
          className="video-feature-card"
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            background: '#050505',
            cursor: 'default',
          }}
        >
          {/* Video — always looping softly; brightens on hover */}
          <motion.video
            ref={videoRef}
            src="/videos/belial.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            animate={{ scale: hovered ? 1.032 : 1.0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              inset: 0,
              opacity: hovered ? 0.62 : 0.3,
              transition: 'opacity 1.1s ease',
              willChange: 'transform, opacity',
            }}
          />

          {/* Aspect-ratio spacer — cinematic 21:9 on desktop */}
          <div className="video-feature-ratio" />

          {/* Permanent dark gradient — heavier at bottom for text legibility */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.55) 45%, rgba(5,5,5,0.18) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Ambient vignette — fades out on hover */}
          <motion.div
            animate={{ opacity: hovered ? 0 : 1 }}
            transition={{ duration: 0.9 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(5,5,5,0.42)',
              pointerEvents: 'none',
            }}
          />

          {/* Top-right year badge */}
          <div
            style={{
              position: 'absolute',
              top: '32px',
              right: '36px',
            }}
          >
            <span
              className="label"
              style={{
                color: 'rgba(245,245,245,0.28)',
                fontSize: '10px',
                letterSpacing: '0.22em',
              }}
            >
              2024
            </span>
          </div>

          {/* Bottom text block */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '0 44px 40px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <div>
              <motion.p
                className="label"
                animate={{ opacity: hovered ? 0.8 : 0.48 }}
                transition={{ duration: 0.5 }}
                style={{
                  color: '#A1A1A1',
                  marginBottom: '10px',
                  letterSpacing: '0.22em',
                }}
              >
                Psychological Horror Short
              </motion.p>

              <motion.h3
                animate={{ y: hovered ? -3 : 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize: 'clamp(52px, 8vw, 108px)',
                  fontWeight: 700,
                  letterSpacing: '-0.035em',
                  lineHeight: 0.9,
                  color: '#F5F5F5',
                }}
              >
                BELIAL
              </motion.h3>
            </div>

            {/* Directional arrow — reveals on hover */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
              transition={{ duration: 0.45 }}
              style={{ flexShrink: 0, paddingBottom: '8px' }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(245,245,245,0.65)"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
