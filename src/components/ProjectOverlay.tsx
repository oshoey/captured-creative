import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'

export interface ProjectData {
  id: string
  title: string
  category: string
  year: string
  url: string
  previewOnly?: boolean
  description: string
  services: string[]
  Mockup: React.ComponentType
}

interface Props {
  projects: ProjectData[]
  activeIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function ProjectOverlay({ projects, activeIndex, onClose, onNavigate }: Props) {
  const project = projects[activeIndex]
  const total = projects.length
  const prev = (activeIndex - 1 + total) % total
  const next = (activeIndex + 1) % total

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')       onClose()
      if (e.key === 'ArrowRight')   onNavigate(next)
      if (e.key === 'ArrowLeft')    onNavigate(prev)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onNavigate, next, prev])

  // Body scroll lock (works alongside Lenis)
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const linkStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: '10px',
    fontSize: '11px', fontWeight: 400, letterSpacing: '0.16em',
    textTransform: 'uppercase', color: '#F5F5F5',
    transition: 'border-color 0.3s, background-color 0.3s',
    padding: '13px 22px',
    border: '1px solid rgba(245,245,245,0.18)',
    cursor: 'pointer',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: '#050505',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* ── Header ── */}
      <div className="overlay-header" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px', height: 'var(--nav-height)',
        borderBottom: '1px solid var(--border)', flexShrink: 0,
      }}>
        <span style={{
          fontSize: '11px', fontWeight: 400, letterSpacing: '0.38em',
          textTransform: 'uppercase', color: '#F5F5F5',
        }}>
          C A P T U R E D
        </span>

        <span className="label">
          {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>

        <button
          onClick={onClose}
          aria-label="Close project"
          style={{
            display: 'flex', alignItems: 'center', gap: '9px',
            color: '#A1A1A1', cursor: 'pointer', transition: 'color 0.2s',
            background: 'none', border: 'none', fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F5')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1A1')}
        >
          <span className="label" style={{ color: 'inherit' }}>Close</span>
          <X size={13} strokeWidth={1.5} />
        </button>
      </div>

      {/* ── Animated content — re-mounts on project change ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="overlay-grid"
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '360px 1fr',
            overflow: 'hidden',
          }}
        >
          {/* ──────────────── LEFT: project text ──────────────── */}
          <motion.div
            className="overlay-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              padding: '48px 44px',
              borderRight: '1px solid var(--border)',
              display: 'flex', flexDirection: 'column',
              overflowY: 'auto',
            }}
          >
            {/* Category label */}
            <span className="label" style={{ marginBottom: '20px' }}>{project.category}</span>

            {/* Title */}
            <h2 style={{
              fontSize: 'clamp(26px, 3vw, 44px)',
              fontWeight: 700, lineHeight: 1.0,
              letterSpacing: '-0.03em', color: '#F5F5F5',
              marginBottom: '22px',
            }}>
              {project.title}
            </h2>

            <div style={{ width: '28px', height: '1px', background: 'rgba(245,245,245,0.18)', marginBottom: '28px' }} />

            {/* Meta row */}
            <div style={{ display: 'flex', gap: '32px', marginBottom: '28px' }}>
              {[['Year', project.year], ['Type', project.category]].map(([l, v]) => (
                <div key={l}>
                  <span className="label" style={{ display: 'block', marginBottom: '5px', color: 'rgba(161,161,161,0.55)' }}>{l}</span>
                  <span className="label" style={{ color: '#E0E0E0' }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <p style={{
              fontSize: '13px', lineHeight: 1.85,
              color: '#888888', marginBottom: '32px', letterSpacing: '0.005em',
            }}>
              {project.description}
            </p>

            {/* Services */}
            <div style={{ marginBottom: 'auto' }}>
              <span className="label" style={{
                display: 'block', marginBottom: '14px',
                color: 'rgba(161,161,161,0.55)',
              }}>
                Services Provided
              </span>
              <div>
                {project.services.map((s, i) => (
                  <div key={i} style={{
                    padding: '10px 0',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', gap: '14px',
                  }}>
                    <div style={{
                      width: '1px', height: '13px',
                      background: 'rgba(245,245,245,0.18)', flexShrink: 0,
                    }} />
                    <span style={{
                      fontSize: '12px', color: '#D8D8D8',
                      letterSpacing: '0.01em',
                    }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA + navigation */}
            <div style={{ paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {project.previewOnly ? (
                <span
                  aria-disabled="true"
                  style={{
                    ...linkStyle,
                    color: 'rgba(245,245,245,0.54)',
                    borderColor: 'rgba(245,245,245,0.12)',
                    cursor: 'default',
                  }}
                >
                  Preview Coming Soon
                </span>
              ) : (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(245,245,245,0.42)'
                    e.currentTarget.style.backgroundColor = 'rgba(245,245,245,0.04)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(245,245,245,0.18)'
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }}
                >
                  View Live Site <ExternalLink size={11} strokeWidth={1.5} />
                </a>
              )}

              {/* Prev / Next */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <button
                  onClick={() => onNavigate(prev)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '11px', fontWeight: 400, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: '#A1A1A1',
                    fontFamily: 'inherit', transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F5')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1A1')}
                >
                  <ArrowLeft size={10} strokeWidth={1.5} /> Prev
                </button>
                <span style={{ color: 'rgba(161,161,161,0.2)', userSelect: 'none' }}>|</span>
                <button
                  onClick={() => onNavigate(next)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: '11px', fontWeight: 400, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: '#A1A1A1',
                    fontFamily: 'inherit', transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F5')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1A1')}
                >
                  Next <ArrowRight size={10} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* ──────────────── RIGHT: browser frame ──────────────── */}
          <motion.div
            className="overlay-preview"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              padding: '24px 36px 32px',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {(() => {
              // Per-project favicon colour + label
              const faviconData = [
                { bg: '#b87e1a', label: 'GV' },
                { bg: '#3d86e8', label: 'AC' },
                { bg: '#7d2020', label: '湖' },
              ]
              const favicon = faviconData[activeIndex] ?? faviconData[0]
              const domain = project.url.replace(/^https?:\/\//, '')

              return (
                <>
                  {/* macOS-style browser window */}
                  <div className="browser-frame" style={{
                    flex: 1,
                    display: 'flex', flexDirection: 'column',
                    border: '1px solid rgba(245,245,245,0.08)',
                    borderRadius: '10px', overflow: 'hidden',
                    boxShadow: [
                      '0 60px 120px rgba(0,0,0,0.80)',
                      '0 24px 48px rgba(0,0,0,0.55)',
                      '0 0 0 0.5px rgba(255,255,255,0.06)',
                      'inset 0 1px 0 rgba(255,255,255,0.05)',
                    ].join(', '),
                  }}>

                    {/* Tab bar */}
                    <div style={{
                      background: '#161616',
                      padding: '7px 12px 0',
                      display: 'flex', alignItems: 'flex-end', gap: '2px',
                      flexShrink: 0, userSelect: 'none',
                    }}>
                      {/* Active tab */}
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        padding: '6px 10px 7px',
                        background: '#0e0e0e',
                        borderRadius: '7px 7px 0 0',
                        border: '1px solid rgba(245,245,245,0.1)',
                        borderBottom: 'none',
                        minWidth: '150px', maxWidth: '210px',
                        flexShrink: 0,
                        position: 'relative', zIndex: 1,
                      }}>
                        <div style={{
                          width: '14px', height: '14px', borderRadius: '3px', flexShrink: 0,
                          background: favicon.bg,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span style={{ fontSize: '7px', color: '#fff', fontWeight: 700, lineHeight: 1 }}>{favicon.label}</span>
                        </div>
                        <span style={{
                          fontSize: '10px', color: 'rgba(245,245,245,0.78)',
                          flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                        }}>{project.title}</span>
                        <div style={{ opacity: 0.3, display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                          <X size={9} strokeWidth={2.5} />
                        </div>
                      </div>
                      {/* New tab button */}
                      <div style={{
                        padding: '6px 10px 7px',
                        fontSize: '14px', color: 'rgba(245,245,245,0.22)', lineHeight: 1,
                      }}>+</div>
                    </div>

                    {/* Address bar */}
                    <div style={{
                      padding: '7px 12px',
                      background: '#0e0e0e',
                      borderBottom: '1px solid rgba(245,245,245,0.08)',
                      display: 'flex', alignItems: 'center', gap: '10px',
                      flexShrink: 0,
                    }}>
                      {/* Traffic lights — macOS Sonoma colours */}
                      <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                        {(['#ff5f57', '#febc2e', '#28c840'] as const).map((color, i) => (
                          <div key={i} style={{
                            width: '10px', height: '10px', borderRadius: '50%',
                            background: color,
                            boxShadow: '0 0 0 0.5px rgba(0,0,0,0.38)',
                          }} />
                        ))}
                      </div>

                      {/* Back / forward — dimmed (no history in mockup) */}
                      <div style={{ display: 'flex', gap: '2px', opacity: 0.22, flexShrink: 0 }}>
                        <ChevronLeft size={14} strokeWidth={2} color="#F5F5F5" />
                        <ChevronRight size={14} strokeWidth={2} color="#F5F5F5" />
                      </div>

                      {/* URL bar */}
                      <div style={{
                        flex: 1, display: 'flex', alignItems: 'center', gap: '5px',
                        background: 'rgba(245,245,245,0.055)',
                        border: '1px solid rgba(245,245,245,0.09)',
                        borderRadius: '6px', padding: '5px 10px',
                      }}>
                        {/* HTTPS padlock */}
                        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#28c840" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                          <path d="M7 11V7a5 5 0 0110 0v4"/>
                        </svg>
                        <span style={{
                          fontSize: '11px', color: 'rgba(245,245,245,0.28)',
                          fontFamily: 'ui-monospace, "SF Mono", monospace',
                        }}>https://</span>
                        <span style={{
                          fontSize: '11px', color: 'rgba(245,245,245,0.72)',
                          fontFamily: 'ui-monospace, "SF Mono", monospace',
                          overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                        }}>{domain}</span>
                      </div>

                      {/* Right — bookmark + external */}
                      <div style={{ display: 'flex', gap: '8px', flexShrink: 0, opacity: 0.2 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F5F5F5" strokeWidth="1.5" strokeLinecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                        {project.previewOnly ? (
                          <ExternalLink size={11} strokeWidth={1.5} color="#F5F5F5" />
                        ) : (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: 'flex', alignItems: 'center', opacity: 1, transition: 'opacity 0.2s' }}
                            onMouseEnter={(e) => ((e.currentTarget.parentElement as HTMLElement).style.opacity = '0.72')}
                            onMouseLeave={(e) => ((e.currentTarget.parentElement as HTMLElement).style.opacity = '0.2')}
                          >
                            <ExternalLink size={11} strokeWidth={1.5} color="#F5F5F5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Live mockup content */}
                    <div className="browser-content" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                        <project.Mockup />
                      </div>
                      <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: '48px',
                        background: 'linear-gradient(to bottom, rgba(14,14,14,0.30), transparent)',
                        pointerEvents: 'none', zIndex: 1,
                      }} />
                    </div>
                  </div>

                  {/* Keyboard hint */}
                  <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                    {[['←', 'prev'], ['→', 'next'], ['esc', 'close']].map(([k, l]) => (
                      <span key={k} className="label" style={{ color: 'rgba(161,161,161,0.28)' }}>
                        <span style={{
                          display: 'inline-block', padding: '1px 5px', marginRight: '5px',
                          border: '1px solid rgba(245,245,245,0.08)', borderRadius: '3px',
                          fontSize: '9px', letterSpacing: '0.05em',
                          fontFamily: 'ui-monospace, monospace',
                        }}>{k}</span>
                        {l}
                      </span>
                    ))}
                  </div>
                </>
              )
            })()}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
