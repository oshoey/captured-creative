import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play } from 'lucide-react'

// ── Data ─────────────────────────────────────────────────────────────────────

type Category = 'All' | 'Commercial' | 'Brand Campaigns' | 'Photography' | 'BTS' | 'Social'

interface VideoProject {
  id: string
  title: string
  description: string
  category: Exclude<Category, 'All'>
  client?: string
  role: string
  videoSrc?: string
  gradient: string
}

const CATEGORIES: Category[] = ['All', 'Commercial', 'Brand Campaigns', 'Photography', 'BTS', 'Social']

const projects: VideoProject[] = [
  {
    id: 'vp-01',
    title: 'Automotive Heritage',
    description: 'Brand campaign capturing the craft and legacy behind vintage automotive electronics.',
    category: 'Commercial',
    role: 'Director / DP',
    gradient: 'linear-gradient(135deg, #0c0a07 0%, #1a1410 55%, #0f0d0b 100%)',
  },
  {
    id: 'vp-02',
    title: 'Restaurant Brand Film',
    description: 'Cinematic short for an authentic Chinese restaurant — steam, fire and golden-hour plating.',
    category: 'Brand Campaigns',
    client: 'Lakeside Garden',
    role: 'Director / Editor',
    gradient: 'linear-gradient(135deg, #1a0c0c 0%, #2c1414 55%, #140909 100%)',
  },
  {
    id: 'vp-03',
    title: 'Product Photography Series',
    description: 'A still life series on precision engineering — ECUs on dark industrial surfaces.',
    category: 'Photography',
    client: 'Allcar Electronics',
    role: 'Photographer',
    gradient: 'linear-gradient(135deg, #080d18 0%, #0e1726 55%, #060b14 100%)',
  },
  {
    id: 'vp-04',
    title: 'Studio Build — BTS',
    description: 'Behind the scenes of a full Captured production build from brief to delivery.',
    category: 'BTS',
    role: 'Camera / Edit',
    gradient: 'linear-gradient(135deg, #0d0d0d 0%, #161616 55%, #0a0a0a 100%)',
  },
  {
    id: 'vp-05',
    title: 'Roofing Campaign Reels',
    description: 'Short-form social content for a heritage roofing brand — aerial, on-site, craft close-ups.',
    category: 'Social',
    client: 'Golden Valley Roofing',
    role: 'Content Creator / Edit',
    gradient: 'linear-gradient(135deg, #0c0a07 0%, #181410 55%, #0a0807 100%)',
  },
  {
    id: 'vp-06',
    title: 'Midlands Brand Campaign',
    description: 'Full production campaign — brand identity launch across web, social and print.',
    category: 'Brand Campaigns',
    role: 'Director',
    gradient: 'linear-gradient(135deg, #080808 0%, #141414 55%, #060606 100%)',
  },
]

// ── Video card ────────────────────────────────────────────────────────────────

function VideoCard({ project, index }: { project: VideoProject; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleMouseEnter = useCallback(() => {
    setHovered(true)
    videoRef.current?.play().catch(() => {})
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0 }
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        borderRadius: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        border: '1px solid var(--border)',
      }}
    >
      {/* Thumbnail / video area — 16:9 */}
      <div style={{ position: 'relative', paddingBottom: '56.25%', overflow: 'hidden' }}>
        {/* Gradient background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: project.gradient,
          transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          transform: hovered ? 'scale(1.03)' : 'scale(1)',
        }} />

        {/* Optional muted video */}
        {project.videoSrc && (
          <video
            ref={videoRef}
            src={project.videoSrc}
            muted loop playsInline
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.4s',
            }}
          />
        )}

        {/* Noise grain overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '256px 256px', opacity: 0.06,
        }} />

        {/* Bottom gradient for text */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
          background: 'linear-gradient(to top, rgba(5,5,5,0.88) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Category badge — top left */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          padding: '3px 9px',
          border: '1px solid rgba(245,245,245,0.18)',
          backgroundColor: 'rgba(5,5,5,0.55)',
          backdropFilter: 'blur(6px)',
          fontSize: '9px', fontWeight: 400,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'rgba(245,245,245,0.62)',
        }}>
          {project.category}
        </div>

        {/* Play icon — centre, fades in on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            border: '1px solid rgba(245,245,245,0.38)',
            backgroundColor: 'rgba(5,5,5,0.45)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Play size={14} strokeWidth={1.5} color="#F5F5F5" style={{ marginLeft: 2 }} />
          </div>
        </div>

        {/* Role — bottom right */}
        <div style={{
          position: 'absolute', bottom: 14, right: 14,
          fontSize: '9px', fontWeight: 400,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(245,245,245,0.38)',
        }}>
          {project.role}
        </div>
      </div>

      {/* Text block */}
      <div style={{
        padding: '18px 20px 20px',
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--black)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
          <p style={{ fontSize: '13px', fontWeight: 500, color: '#F0F0EE', letterSpacing: '-0.005em', lineHeight: 1.3 }}>
            {project.title}
          </p>
          {project.client && (
            <span className="label" style={{ color: 'rgba(161,161,161,0.55)', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {project.client}
            </span>
          )}
        </div>
        <p style={{ fontSize: '12px', color: '#666666', lineHeight: 1.75, letterSpacing: '0.005em' }}>
          {project.description}
        </p>
      </div>
    </motion.div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function Videography() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="film" ref={ref} style={{ borderTop: '1px solid var(--border)' }}>

      {/* ── Featured reel ── */}
      <div style={{
        position: 'relative',
        minHeight: '62vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', justifyContent: 'flex-end',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
      }}>
        {/* Background — replace src with real reel path */}
        <video
          autoPlay muted loop playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: 0.28,
          }}
        />

        {/* Fallback dark gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, #0a0a0a 0%, #111111 50%, #080808 100%)',
        }} />

        {/* Film grain */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '256px 256px', opacity: 0.055,
          animation: 'grain 0.45s steps(1) infinite',
        }} />

        {/* Light leak top-right */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 80% 0%, rgba(245,245,245,0.04) 0%, transparent 55%)',
        }} />

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Section label — top left */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            position: 'absolute', top: 36, left: 44,
            display: 'flex', alignItems: 'center', gap: 14,
          }}
        >
          <span className="section-num">02</span>
          <div style={{ width: 28, height: '1px', backgroundColor: 'var(--border)' }} />
        </motion.div>

        {/* Frame corners */}
        {[
          { top: 28, left: 28, borderTop: '1px solid rgba(245,245,245,0.12)', borderLeft: '1px solid rgba(245,245,245,0.12)' },
          { top: 28, right: 28, borderTop: '1px solid rgba(245,245,245,0.12)', borderRight: '1px solid rgba(245,245,245,0.12)' },
          { bottom: 28, left: 28, borderBottom: '1px solid rgba(245,245,245,0.12)', borderLeft: '1px solid rgba(245,245,245,0.12)' },
          { bottom: 28, right: 28, borderBottom: '1px solid rgba(245,245,245,0.12)', borderRight: '1px solid rgba(245,245,245,0.12)' },
        ].map((cs, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.04 }}
            style={{ position: 'absolute', width: 32, height: 32, pointerEvents: 'none', ...cs } as React.CSSProperties}
          />
        ))}

        {/* Main copy */}
        <div style={{ position: 'relative', padding: '0 44px 48px', maxWidth: 720 }}>
          <motion.p
            className="label"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{ marginBottom: 16 }}
          >
            Film &amp; Commercial Work
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 'clamp(38px, 6vw, 80px)',
              fontWeight: 600,
              lineHeight: 0.96,
              letterSpacing: '-0.03em',
              color: '#F5F5F5',
              marginBottom: 24,
            }}
          >
            Visual
            <br />
            Work
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              fontSize: '13px', lineHeight: 1.8,
              color: '#666666', maxWidth: 440,
              letterSpacing: '0.005em',
            }}
          >
            Cinematography, brand films and commercial production — from single-day shoots to full campaign delivery.
          </motion.p>
        </div>
      </div>

      {/* ── Category tabs ── */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        padding: '0 44px',
        display: 'flex', alignItems: 'stretch',
        overflowX: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              flexShrink: 0,
              padding: '18px 22px',
              fontSize: '11px', fontWeight: 400,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: activeCategory === cat ? '#F5F5F5' : '#A1A1A1',
              borderBottom: activeCategory === cat
                ? '1px solid rgba(245,245,245,0.72)'
                : '1px solid transparent',
              marginBottom: '-1px',
              background: 'none', border: 'none', borderRadius: 0,
              cursor: 'pointer',
              transition: 'color 0.2s',
              fontFamily: 'inherit',
            }}
            onMouseEnter={(e) => { if (activeCategory !== cat) e.currentTarget.style.color = '#C8C8C8' }}
            onMouseLeave={(e) => { if (activeCategory !== cat) e.currentTarget.style.color = '#A1A1A1' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Project grid ── */}
      <div className="video-grid">
        {filtered.map((project, i) => (
          <VideoCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* ── Coming soon note ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          padding: '28px 44px',
          borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <span className="label" style={{ color: 'rgba(161,161,161,0.42)' }}>
          Full reel &amp; showreel available on request
        </span>
        <a
          href="#contact"
          className="label"
          style={{ color: '#A1A1A1', transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F5')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1A1')}
        >
          Get in touch →
        </a>
      </motion.div>
    </section>
  )
}
