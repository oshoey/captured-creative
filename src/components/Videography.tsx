import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'

// ── Data ─────────────────────────────────────────────────────────────────────

type Category = 'All' | 'Short Film' | 'Documentary' | 'Commercial'

interface VideoProject {
  id: string
  title: string
  label?: string
  description: string
  category: Exclude<Category, 'All'>
  client?: string
  role: string
  videoSrc?: string
  poster?: string
  fullVideoSrc?: string
  youtubeId?: string
  gradient: string
}

const CATEGORIES: Category[] = ['All', 'Short Film', 'Documentary', 'Commercial']

const projects: VideoProject[] = [
  {
    id: 'belial',
    title: 'BELIAL',
    label: 'Short Film',
    description: 'A psychological horror short exploring dread, obsession and the uncanny.',
    category: 'Short Film',
    role: 'Director / DP / Editor',
    videoSrc: '/videos/belial.mp4',
    poster: '/images/thumbs/belial.jpg',
    youtubeId: '_4sSa749kJY',
    gradient: 'linear-gradient(135deg, #080508 0%, #0f080f 55%, #060306 100%)',
  },
  {
    id: 'exclusive-nottingham',
    title: 'Exclusive Nottingham',
    label: 'Short Documentary',
    description: "An intimate portrait of Nottingham's underground culture and the people who shape it.",
    category: 'Documentary',
    client: 'Exclusive Nottingham',
    role: 'Director / DP',
    videoSrc: '/videos/exclusive-nottingham.mp4',
    poster: '/images/thumbs/exclusive-nottingham.jpg',
    fullVideoSrc: '/videos/exclusive-nottingham.mp4',
    gradient: 'linear-gradient(135deg, #060810 0%, #080c18 55%, #050609 100%)',
  },
  {
    id: 'pizza-baker-1',
    title: 'Pizza Baker Express',
    label: 'Advert One',
    description: 'High-energy commercial — heat, craft and appetite captured in under sixty seconds.',
    category: 'Commercial',
    client: 'Pizza Baker Express',
    role: 'Director / Edit',
    videoSrc: '/videos/pizza-baker-advert-1.mp4',
    poster: '/images/thumbs/pizza-baker-1.jpg',
    fullVideoSrc: '/videos/pizza-baker-advert-1.mp4',
    gradient: 'linear-gradient(135deg, #120808 0%, #1a0c0a 55%, #0a0505 100%)',
  },
  {
    id: 'pizza-baker-2',
    title: 'Pizza Baker Express',
    label: 'Advert Two',
    description: 'A second spot — wider angles, more action and the same signature cinematic warmth.',
    category: 'Commercial',
    client: 'Pizza Baker Express',
    role: 'Director / Edit',
    videoSrc: '/videos/pizza-baker-advert-2.mp4',
    poster: '/images/thumbs/pizza-baker-2.jpg',
    fullVideoSrc: '/videos/pizza-baker-advert-2.mp4',
    gradient: 'linear-gradient(135deg, #100a06 0%, #181006 55%, #0a0704 100%)',
  },
]

// ── Video card ────────────────────────────────────────────────────────────────

function VideoCard({
  project,
  index,
  onClick,
}: {
  project: VideoProject
  index: number
  onClick?: () => void
}) {
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
      onClick={onClick}
      style={{
        position: 'relative', borderRadius: 0, overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        border: '1px solid var(--border)',
      }}
    >
      {/* ── Visual area: 16:9 ── */}
      <div style={{ position: 'relative', paddingBottom: '56.25%', overflow: 'hidden' }}>

        {/* Zoom container — wraps only the image/video content */}
        <motion.div
          animate={{ scale: hovered ? 1.045 : 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* Gradient base (fallback when no poster) */}
          <div style={{ position: 'absolute', inset: 0, background: project.gradient }} />

          {/* Poster image — always visible */}
          {project.poster && (
            <img
              src={project.poster}
              alt={project.title}
              loading="lazy"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
              }}
            />
          )}

          {/* Muted preview video — fades in on hover */}
          {project.videoSrc && (
            <video
              ref={videoRef}
              src={project.videoSrc}
              muted loop playsInline preload="none"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                opacity: hovered ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}
            />
          )}
        </motion.div>

        {/* ── Static overlays (don't zoom) ── */}

        {/* Cinematic dark vignette — fades out on hover to reveal image */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'rgba(5,5,5,0.38)',
          opacity: hovered ? 0 : 1,
          transition: 'opacity 0.8s ease',
        }} />

        {/* Bottom gradient for text legibility */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '65%',
          background: 'linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.55) 45%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        {/* Film grain */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '256px 256px', opacity: 0.055,
        }} />

        {/* Category / label badge */}
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
          {project.label ?? project.category}
        </div>

        {/* Play button — faint at rest, full on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.32, scale: hovered ? 1 : 0.9 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{
            width: 50, height: 50, borderRadius: '50%',
            border: '1px solid rgba(245,245,245,0.42)',
            backgroundColor: 'rgba(5,5,5,0.48)',
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 1px rgba(245,245,245,0.08)',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(245,245,245,0.92)" style={{ marginLeft: 3 }}>
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </div>
        </motion.div>

        {/* Role label — bottom right */}
        <div style={{
          position: 'absolute', bottom: 14, right: 14,
          fontSize: '9px', fontWeight: 400,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'rgba(245,245,245,0.32)',
        }}>
          {project.role}
        </div>
      </div>

      {/* ── Text block ── */}
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
            <span className="label" style={{ color: 'rgba(161,161,161,0.5)', whiteSpace: 'nowrap', flexShrink: 0 }}>
              {project.client}
            </span>
          )}
        </div>
        <p style={{ fontSize: '12px', color: '#5a5a5a', lineHeight: 1.75, letterSpacing: '0.005em' }}>
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
  const [selectedProject, setSelectedProject] = useState<VideoProject | null>(null)
  const [iframeSrc, setIframeSrc] = useState('')
  const modalVideoRef = useRef<HTMLVideoElement>(null)

  // Lock scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedProject])

  // Handle playback when a project is selected
  useEffect(() => {
    if (!selectedProject) return

    if (selectedProject.youtubeId) {
      setIframeSrc(
        `https://www.youtube.com/embed/${selectedProject.youtubeId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&controls=1`
      )
      return
    }

    // Local video: reset and autoplay
    const timer = setTimeout(() => {
      const video = modalVideoRef.current
      if (video) {
        video.currentTime = 0
        video.play().catch(() => {})
      }
    }, 160)
    return () => clearTimeout(timer)
  }, [selectedProject])

  // ESC to close
  useEffect(() => {
    if (!selectedProject) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProject])

  const openProject = useCallback((project: VideoProject) => {
    setSelectedProject(project)
  }, [])

  const closeModal = useCallback(() => {
    setIframeSrc('') // stop YouTube immediately
    if (modalVideoRef.current) {
      modalVideoRef.current.pause()
      modalVideoRef.current.currentTime = 0
    }
    setSelectedProject(null)
  }, [])

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  const modal = createPortal(
    <AnimatePresence>
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
          onClick={closeModal}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(5,5,5,0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {/* Top bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 68,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0 32px',
              borderBottom: '1px solid rgba(245,245,245,0.06)',
            }}
          >
            <span className="label" style={{ color: 'rgba(245,245,245,0.28)', letterSpacing: '0.22em' }}>
              {selectedProject.title}{selectedProject.label ? ` — ${selectedProject.label}` : ''}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); closeModal() }}
              style={{
                width: 40, height: 40,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'none', border: '1px solid rgba(245,245,245,0.12)',
                cursor: 'pointer', color: 'rgba(245,245,245,0.5)',
                transition: 'color 0.2s, border-color 0.2s',
                fontFamily: 'inherit', borderRadius: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#F5F5F5'
                e.currentTarget.style.borderColor = 'rgba(245,245,245,0.32)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(245,245,245,0.5)'
                e.currentTarget.style.borderColor = 'rgba(245,245,245,0.12)'
              }}
            >
              <X size={15} strokeWidth={1.5} />
            </button>
          </motion.div>

          {/* Player */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 18 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', width: 'min(94vw, 1440px)' }}
          >
            {selectedProject.youtubeId ? (
              /* YouTube embed */
              <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
                <iframe
                  src={iframeSrc}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    border: 'none',
                  }}
                />
              </div>
            ) : (
              /* Local video with native controls */
              <video
                key={selectedProject.id}
                ref={modalVideoRef}
                src={selectedProject.fullVideoSrc}
                playsInline controls
                style={{
                  display: 'block', width: '100%',
                  maxHeight: '80vh', objectFit: 'contain',
                }}
              />
            )}
          </motion.div>

          {/* Bottom hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            style={{
              position: 'absolute', bottom: 24, left: '50%',
              transform: 'translateX(-50%)', whiteSpace: 'nowrap',
            }}
          >
            <span className="label" style={{ color: 'rgba(245,245,245,0.14)', letterSpacing: '0.18em' }}>
              ESC or click outside to close
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )

  return (
    <section id="film" ref={ref} style={{ borderTop: '1px solid var(--border)' }}>
      {modal}

      {/* ── Section header ── */}
      <div style={{
        position: 'relative', minHeight: '62vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-start', justifyContent: 'flex-end',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, #0a0a0a 0%, #111111 50%, #080808 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '256px 256px', opacity: 0.055,
          animation: 'grain 0.45s steps(1) infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 80% 0%, rgba(245,245,245,0.04) 0%, transparent 55%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
          background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ position: 'absolute', top: 36, left: 44, display: 'flex', alignItems: 'center', gap: 14 }}
        >
          <span className="section-num">02</span>
          <div style={{ width: 28, height: '1px', backgroundColor: 'var(--border)' }} />
        </motion.div>

        {[
          { top: 28, left: 28, borderTop: '1px solid rgba(245,245,245,0.12)', borderLeft: '1px solid rgba(245,245,245,0.12)' },
          { top: 28, right: 28, borderTop: '1px solid rgba(245,245,245,0.12)', borderRight: '1px solid rgba(245,245,245,0.12)' },
          { bottom: 28, left: 28, borderBottom: '1px solid rgba(245,245,245,0.12)', borderLeft: '1px solid rgba(245,245,245,0.12)' },
          { bottom: 28, right: 28, borderBottom: '1px solid rgba(245,245,245,0.12)', borderRight: '1px solid rgba(245,245,245,0.12)' },
        ].map((cs, i) => (
          <motion.div key={i}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.04 }}
            style={{ position: 'absolute', width: 32, height: 32, pointerEvents: 'none', ...cs } as React.CSSProperties}
          />
        ))}

        <div style={{ position: 'relative', padding: '0 44px 48px', maxWidth: 720 }}>
          <motion.p className="label"
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
            style={{ fontSize: 'clamp(38px, 6vw, 80px)', fontWeight: 600, lineHeight: 0.96, letterSpacing: '-0.03em', color: '#F5F5F5', marginBottom: 24 }}
          >
            Visual<br />Work
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ fontSize: '13px', lineHeight: 1.8, color: '#666666', maxWidth: 440, letterSpacing: '0.005em' }}
          >
            Cinematography, brand films and commercial production — from single-day shoots to full campaign delivery.
          </motion.p>
        </div>
      </div>

      {/* ── Category tabs ── */}
      <div style={{
        borderBottom: '1px solid var(--border)', padding: '0 44px',
        display: 'flex', alignItems: 'stretch',
        overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none',
      }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              flexShrink: 0, padding: '18px 22px',
              fontSize: '11px', fontWeight: 400,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: activeCategory === cat ? '#F5F5F5' : '#A1A1A1',
              borderBottom: activeCategory === cat ? '1px solid rgba(245,245,245,0.72)' : '1px solid transparent',
              marginBottom: '-1px',
              background: 'none', border: 'none', borderRadius: 0,
              cursor: 'pointer', transition: 'color 0.2s', fontFamily: 'inherit',
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
          <VideoCard
            key={project.id}
            project={project}
            index={i}
            onClick={(project.fullVideoSrc || project.youtubeId) ? () => openProject(project) : undefined}
          />
        ))}
      </div>

      {/* ── Footer note ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{
          padding: '28px 44px', borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        <span className="label" style={{ color: 'rgba(161,161,161,0.38)' }}>
          Full reel &amp; showreel available on request
        </span>
        <a href="#contact" className="label"
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
