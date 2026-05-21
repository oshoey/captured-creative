import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

// ── Module-level handler — registered by the mounted overlay component ────────
let _launchHandler: ((url: string) => void) | null = null

export function handleProjectLaunch(url: string) {
  if (_launchHandler) {
    _launchHandler(url)
  } else {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

// ── Reusable "View Live Site" button ─────────────────────────────────────────
export function LiveSiteButton({
  url,
  label = 'View Live Site',
  style: extraStyle,
}: {
  url: string
  label?: string
  style?: React.CSSProperties
}) {
  return (
    <button
      onClick={() => handleProjectLaunch(url)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        fontSize: '11px', fontWeight: 400, letterSpacing: '0.16em',
        textTransform: 'uppercase', color: '#F5F5F5',
        padding: '13px 22px',
        border: '1px solid rgba(245,245,245,0.18)',
        background: 'none', cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'border-color 0.3s, background-color 0.3s, box-shadow 0.3s',
        ...extraStyle,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(245,245,245,0.38)'
        e.currentTarget.style.backgroundColor = 'rgba(245,245,245,0.04)'
        e.currentTarget.style.boxShadow = '0 0 22px rgba(212,165,53,0.14), 0 0 48px rgba(212,165,53,0.07)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(245,245,245,0.18)'
        e.currentTarget.style.backgroundColor = 'transparent'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {label} <ExternalLink size={11} strokeWidth={1.5} />
    </button>
  )
}

// ── Overlay component ─────────────────────────────────────────────────────────
export default function CapturedTransitionOverlay() {
  const [visible, setVisible] = useState(false)
  const [pendingUrl, setPendingUrl] = useState<string | null>(null)
  const animatingRef = useRef(false)

  const launch = useCallback((url: string) => {
    if (animatingRef.current) {
      window.open(url, '_blank', 'noopener,noreferrer')
      return
    }
    animatingRef.current = true
    setPendingUrl(url)
    setVisible(true)
  }, [])

  useEffect(() => {
    _launchHandler = launch
    return () => { _launchHandler = null }
  }, [launch])

  useEffect(() => {
    if (!visible || !pendingUrl) return
    const url = pendingUrl
    const t1 = setTimeout(() => window.open(url, '_blank', 'noopener,noreferrer'), 560)
    const t2 = setTimeout(() => setVisible(false), 640)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [visible, pendingUrl])

  return (
    <AnimatePresence onExitComplete={() => { setPendingUrl(null); animatingRef.current = false }}>
      {visible && (
        <motion.div
          key="captured-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.32, ease: 'easeIn' } }}
          transition={{ duration: 0.04 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            backgroundColor: '#050505',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
          aria-hidden="true"
          role="presentation"
        >
          {/* Film grain */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: '256px 256px', opacity: 0.045,
          }} />

          {/* White shutter flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0.08, 0] }}
            transition={{ duration: 0.52, times: [0, 0.13, 0.52, 1] }}
            style={{ position: 'absolute', inset: 0, backgroundColor: '#F8F8F8', pointerEvents: 'none' }}
          />

          {/* Amber radial glow — centre */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.28, 0.1, 0] }}
            transition={{ duration: 0.72, times: [0, 0.22, 0.45, 0.72, 1] }}
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(212,165,53,0.55) 0%, transparent 62%)',
            }}
          />

          {/* Frame corners */}
          {([
            { top: 28, left: 28, borderTop: '1px solid rgba(245,245,245,0.32)', borderLeft: '1px solid rgba(245,245,245,0.32)' },
            { top: 28, right: 28, borderTop: '1px solid rgba(245,245,245,0.32)', borderRight: '1px solid rgba(245,245,245,0.32)' },
            { bottom: 28, left: 28, borderBottom: '1px solid rgba(245,245,245,0.32)', borderLeft: '1px solid rgba(245,245,245,0.32)' },
            { bottom: 28, right: 28, borderBottom: '1px solid rgba(245,245,245,0.32)', borderRight: '1px solid rgba(245,245,245,0.32)' },
          ] as React.CSSProperties[]).map((cs, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.65 }}
              animate={{ opacity: [0, 0.55, 0.3], scale: 1 }}
              transition={{ duration: 0.42, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', width: 40, height: 40, pointerEvents: 'none', ...cs }}
            />
          ))}

          {/* CAPTURED wordmark */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 1] }}
            transition={{ duration: 0.64, times: [0, 0.2, 0.46, 1] }}
            style={{
              position: 'relative',
              fontSize: '11px', fontWeight: 400,
              letterSpacing: '0.38em', textTransform: 'uppercase',
              color: '#F5F5F5',
              fontFamily: "'Inter Tight', system-ui, sans-serif",
            }}
          >
            C A P T U R E D
          </motion.span>

          {/* Thin line under wordmark */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 0, 1, 1] }}
            transition={{ duration: 0.64, times: [0, 0.24, 0.52, 1] }}
            style={{
              position: 'relative', marginTop: 12,
              width: 72, height: 1,
              background: 'rgba(245,245,245,0.26)',
              transformOrigin: 'center',
            }}
          />

          {/* URL */}
          {pendingUrl && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 0.3, 0.3] }}
              transition={{ duration: 0.64, times: [0, 0.32, 0.54, 1] }}
              style={{
                position: 'relative', marginTop: 18,
                fontSize: '9px', letterSpacing: '0.1em',
                color: 'rgba(245,245,245,0.38)',
                fontFamily: 'ui-monospace, monospace',
              }}
            >
              {pendingUrl.replace(/^https?:\/\//, '')}
            </motion.span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
