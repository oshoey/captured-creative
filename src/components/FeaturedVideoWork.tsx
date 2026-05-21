import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'

export default function FeaturedVideoWork() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgVideoRef = useRef<HTMLVideoElement>(null)
  const modalVideoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  // Lock scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])

  // ESC to close
  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen])

  const openModal = useCallback(() => {
    setModalOpen(true)
    setTimeout(() => {
      const video = modalVideoRef.current
      if (video) {
        video.currentTime = 0
        video.play().catch(() => {
          // Autoplay with audio blocked — native controls are visible for manual play
        })
      }
    }, 160)
  }, [])

  const closeModal = useCallback(() => {
    setModalOpen(false)
    if (modalVideoRef.current) {
      modalVideoRef.current.pause()
      modalVideoRef.current.currentTime = 0
    }
  }, [])

  const handleEnter = () => {
    setHovered(true)
    bgVideoRef.current?.play().catch(() => {})
  }

  const handleLeave = () => {
    setHovered(false)
  }

  const lightbox = createPortal(
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(5,5,5,0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {/* Top bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 72,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 32px',
              borderBottom: '1px solid rgba(245,245,245,0.06)',
            }}
          >
            <span className="label" style={{ color: 'rgba(245,245,245,0.32)', letterSpacing: '0.22em' }}>
              BELIAL — Psychological Horror Short · 2024
            </span>

            <button
              onClick={(e) => { e.stopPropagation(); closeModal() }}
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: '1px solid rgba(245,245,245,0.12)',
                cursor: 'pointer',
                color: 'rgba(245,245,245,0.5)',
                transition: 'color 0.2s, border-color 0.2s',
                fontFamily: 'inherit',
                borderRadius: 0,
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

          {/* Video container — stopPropagation so clicking the video doesn't close the modal */}
          <motion.div
            initial={{ scale: 0.93, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: 'min(94vw, 1440px)',
            }}
          >
            <video
              ref={modalVideoRef}
              src="/videos/belial-full.mp4"
              playsInline
              controls
              style={{
                display: 'block',
                width: '100%',
                maxHeight: '80vh',
                objectFit: 'contain',
              }}
            />
          </motion.div>

          {/* Bottom hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{
              position: 'absolute',
              bottom: 28,
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
            }}
          >
            <span className="label" style={{ color: 'rgba(245,245,245,0.18)', letterSpacing: '0.18em' }}>
              ESC or click outside to close
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )

  return (
    <>
      {lightbox}
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

        {/* BELIAL card — full bleed, clickable */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="video-section-card-wrap"
          style={{ padding: '0 40px 72px' }}
        >
          <div
            className="video-feature-card"
            onClick={openModal}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={{
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
              background: '#050505',
              cursor: 'pointer',
            }}
          >
            {/* Looping background video — muted preview, dims/brightens on hover */}
            <motion.video
              ref={bgVideoRef}
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

            {/* Aspect-ratio spacer */}
            <div className="video-feature-ratio" />

            {/* Bottom gradient */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(5,5,5,0.97) 0%, rgba(5,5,5,0.55) 45%, rgba(5,5,5,0.18) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Ambient vignette */}
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

            {/* Year badge */}
            <div style={{ position: 'absolute', top: '32px', right: '36px' }}>
              <span
                className="label"
                style={{ color: 'rgba(245,245,245,0.28)', fontSize: '10px', letterSpacing: '0.22em' }}
              >
                2024
              </span>
            </div>

            {/* Play circle — reveals on hover */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.86 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            >
              <div style={{
                width: 66,
                height: 66,
                borderRadius: '50%',
                border: '1px solid rgba(245,245,245,0.28)',
                backgroundColor: 'rgba(5,5,5,0.38)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(245,245,245,0.88)" style={{ marginLeft: 3 }}>
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </div>
            </motion.div>

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
                  style={{ color: '#A1A1A1', marginBottom: '10px', letterSpacing: '0.22em' }}
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

              {/* Arrow */}
              <motion.div
                animate={{
                  opacity: hovered ? 1 : 0.35,
                  x: hovered ? 5 : 0,
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ flexShrink: 0, paddingBottom: '8px' }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(245,245,245,0.82)"
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
    </>
  )
}
