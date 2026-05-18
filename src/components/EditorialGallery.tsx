import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Shared cinematic image reveal — slow scale into frame
function CinematicImg({
  src,
  alt,
  objectPosition = '50% 50%',
  isInView,
  delay = 0,
  overlay = 'rgba(5,5,5,0.18)',
}: {
  src: string
  alt: string
  objectPosition?: string
  isInView: boolean
  delay?: number
  overlay?: string
}) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        initial={{ scale: 1.07, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.5, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition,
          display: 'block',
          willChange: 'transform',
        }}
      />
      {overlay && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: overlay,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}

// Horizontal dissolve edge — blends image into adjacent dark panel
function EdgeFade({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        [side]: 0,
        bottom: 0,
        width: '120px',
        background: `linear-gradient(to ${side === 'left' ? 'right' : 'left'}, #050505 0%, transparent 100%)`,
        zIndex: 2,
        pointerEvents: 'none',
      }}
    />
  )
}

export default function EditorialGallery() {
  const ref1 = useRef<HTMLElement>(null)
  const ref2 = useRef<HTMLElement>(null)
  const ref3 = useRef<HTMLElement>(null)

  const inView1 = useInView(ref1, { once: true, margin: '-80px' })
  const inView2 = useInView(ref2, { once: true, margin: '-80px' })
  const inView3 = useInView(ref3, { once: true, margin: '-80px' })

  return (
    <>
      {/* ══════════════════════════════════════════
          SPREAD 1 — THE FRAME
          Camera / church altar — 36 / 64 split
          Most atmospheric image: bokeh cross, draped
          fabric, stone pillars
          ══════════════════════════════════════════ */}
      <section
        ref={ref1}
        className="editorial-spread-1"
        style={{
          display: 'grid',
          gridTemplateColumns: '36% 64%',
          height: '90vh',
          borderTop: '1px solid var(--border)',
        }}
      >
        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView1 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          style={{
            padding: '72px 48px',
            borderRight: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            gap: '22px',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '1px',
              backgroundColor: 'rgba(245,245,245,0.25)',
            }}
          />
          <span className="label">Photography & Video</span>
          <h2
            style={{
              fontSize: 'clamp(40px, 4.5vw, 72px)',
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
              color: '#F5F5F5',
            }}
          >
            The<br />Frame.
          </h2>
          <p
            className="label"
            style={{ maxWidth: '210px', lineHeight: 2.2, color: '#A1A1A1' }}
          >
            We shoot where<br />the story lives.
          </p>
        </motion.div>

        {/* Image column */}
        <div style={{ position: 'relative' }}>
          <CinematicImg
            src="/images/editorial-1.jpg"
            alt="Sony camera, church altar and cross in soft focus"
            objectPosition="50% 40%"
            isInView={inView1}
            overlay="rgba(5,5,5,0.15)"
          />
          <EdgeFade side="left" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SPREAD 2 — ON LOCATION
          Church interior, crew on set — full bleed
          Text anchored bottom-left over gradient
          ══════════════════════════════════════════ */}
      <section
        ref={ref2}
        style={{
          position: 'relative',
          height: '72vh',
          overflow: 'hidden',
          borderTop: '1px solid var(--border)',
        }}
      >
        {/* Full-bleed image */}
        <CinematicImg
          src="/images/editorial-2.jpg"
          alt="Film crew setting up inside a historic stone church"
          objectPosition="50% 42%"
          isInView={inView2}
          overlay="none"
        />

        {/* Cinematic gradient — heavy bottom, clear top */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.45) 35%, rgba(5,5,5,0.08) 70%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Text — bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '48px',
            zIndex: 3,
            maxWidth: '500px',
          }}
        >
          <span
            className="label"
            style={{ display: 'block', marginBottom: '16px', color: 'rgba(245,245,245,0.55)' }}
          >
            On Location
          </span>
          <h2
            style={{
              fontSize: 'clamp(28px, 3.8vw, 52px)',
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: '-0.03em',
              color: '#F5F5F5',
            }}
          >
            Every frame<br />is intentional.
          </h2>
        </motion.div>

        {/* Top-right caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView2 ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="label"
          style={{
            position: 'absolute',
            top: '40px',
            right: '48px',
            zIndex: 3,
            color: 'rgba(245,245,245,0.4)',
            textAlign: 'right',
          }}
        >
          Captured Studio
        </motion.p>
      </section>

      {/* ══════════════════════════════════════════
          SPREAD 3 — THE CRAFT
          Tablet / outdoor review — image left, text right
          Strong sunlit monochrome, asymmetric weight
          ══════════════════════════════════════════ */}
      <section
        ref={ref3}
        className="editorial-spread-3"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          height: '82vh',
          borderTop: '1px solid var(--border)',
        }}
      >
        {/* Image column — left */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <CinematicImg
            src="/images/editorial-3.jpg"
            alt="Reviewing production footage on location"
            objectPosition="50% 18%"
            isInView={inView3}
            overlay="rgba(5,5,5,0.12)"
          />
          <EdgeFade side="right" />
        </div>

        {/* Text column — right */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView3 ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.95, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            padding: '72px 56px',
            borderLeft: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '22px',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '1px',
              backgroundColor: 'rgba(245,245,245,0.25)',
            }}
          />
          <span className="label">The Craft</span>
          <h2
            style={{
              fontSize: 'clamp(32px, 4vw, 58px)',
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
              color: '#F5F5F5',
            }}
          >
            Designed<br />To Be<br />Remembered.
          </h2>
          <p
            className="label"
            style={{ maxWidth: '240px', lineHeight: 2.2, color: '#A1A1A1' }}
          >
            Every detail considered.<br />Every decision made with purpose.
          </p>
        </motion.div>
      </section>
    </>
  )
}
