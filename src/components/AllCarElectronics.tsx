import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { LiveSiteButton } from './CapturedTransitionOverlay'

// ── AllCar brand tokens (mirrors actual site palette) ─────────────────────
const T = {
  bg:      '#101a2b',
  card:    '#141e2d',
  sec:     '#1a2840',
  primary: '#3d86e8',
  accent:  '#22d3ee',
  fg:      '#edf0f8',
  muted:   '#aab2c4',
  border:  '#1e2e48',
  gold:    '#d4a03c',
  success: '#3cb964',
}

const pcbGrid = {
  backgroundImage: [
    'linear-gradient(rgba(61,134,232,0.07) 1px, transparent 1px)',
    'linear-gradient(90deg, rgba(61,134,232,0.07) 1px, transparent 1px)',
  ].join(', '),
  backgroundSize: '24px 24px',
}

function CpuIcon({ size = 10, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="6" height="6"/>
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <line x1="9"  y1="2"  x2="9"  y2="4"/><line x1="15" y1="2"  x2="15" y2="4"/>
      <line x1="9"  y1="20" x2="9"  y2="22"/><line x1="15" y1="20" x2="15" y2="22"/>
      <line x1="2"  y1="9"  x2="4"  y2="9"/><line x1="2"  y1="15" x2="4"  y2="15"/>
      <line x1="20" y1="9"  x2="22" y2="9"/><line x1="20" y1="15" x2="22" y2="15"/>
    </svg>
  )
}

// ── Inventory card mock ───────────────────────────────────────────────────────
function InventoryCard({ make, title, price, status, rare }: {
  make: string; title: string; price: number | null; status: string; rare?: boolean
}) {
  const statusColors: Record<string, { bg: string; color: string; border: string }> = {
    'In Stock':       { bg: 'rgba(60,185,100,0.12)', color: '#6ee89a', border: 'rgba(60,185,100,0.25)' },
    'Repair Service': { bg: 'rgba(61,134,232,0.12)', color: T.primary, border: 'rgba(61,134,232,0.25)' },
    'Rare':           { bg: 'rgba(212,160,60,0.12)', color: T.gold,    border: 'rgba(212,160,60,0.25)' },
  }
  const s = statusColors[status] ?? statusColors['In Stock']

  return (
    <div style={{
      borderRadius: 8, border: `1px solid ${T.border}`,
      backgroundColor: T.card, overflow: 'hidden',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      {/* image area */}
      <div style={{
        height: 60, position: 'relative',
        background: `linear-gradient(135deg, ${T.sec} 0%, ${T.bg} 100%)`,
        borderBottom: `1px solid ${T.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        ...pcbGrid,
      }}>
        <CpuIcon size={20} color="rgba(61,134,232,0.45)" />
        {rare && (
          <div style={{
            position: 'absolute', top: 5, left: 5,
            fontSize: '5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
            background: 'rgba(212,160,60,0.16)', color: T.gold, border: `1px solid rgba(212,160,60,0.3)`,
            borderRadius: 3, padding: '1.5px 4.5px',
          }}>★ Rare</div>
        )}
        <div style={{
          position: 'absolute', top: 5, right: 5,
          fontSize: '5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
          background: s.bg, color: s.color, border: `1px solid ${s.border}`,
          borderRadius: 3, padding: '1.5px 4.5px',
        }}>{status}</div>
      </div>
      {/* body */}
      <div style={{ padding: '8px 9px 10px' }}>
        <div style={{ fontSize: '5.5px', textTransform: 'uppercase', letterSpacing: '0.12em', color: T.muted, marginBottom: 3 }}>{make}</div>
        <div style={{ fontSize: '7.5px', fontWeight: 600, color: T.fg, lineHeight: 1.3, marginBottom: 6 }}>{title}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${T.border}`, paddingTop: 6 }}>
          <div style={{ fontSize: price != null ? '12px' : '7px', fontWeight: 700, color: price != null ? T.fg : T.muted }}>
            {price != null ? `£${price}` : 'Enquire'}
          </div>
          <div style={{
            background: T.primary, borderRadius: 4,
            padding: '4px 9px', fontSize: '6px', fontWeight: 600, color: T.bg,
          }}>
            {status === 'Repair Service' ? 'Book' : 'Add'}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Search / filter UI mock ───────────────────────────────────────────────────
function SearchUIMock() {
  const filters = ['All Makes', 'Engine ECU', 'ABS / ESP', 'Instrument', 'Gearbox', 'Airbag']
  return (
    <div style={{
      backgroundColor: T.bg, borderRadius: 10, overflow: 'hidden',
      border: `1px solid ${T.border}`, fontFamily: "'Inter', system-ui, sans-serif",
      ...pcbGrid,
    }}>
      <div style={{ position: 'relative', padding: '16px 16px 0' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(16,26,43,0.1) 0%, rgba(16,26,43,0.65) 100%)', pointerEvents: 'none' }} />
        {/* Search bar */}
        <div style={{ position: 'relative', display: 'flex', gap: 6, marginBottom: 10 }}>
          <div style={{
            flex: 1, height: 32, display: 'flex', alignItems: 'center', gap: 7,
            border: `1px solid ${T.border}`, backgroundColor: T.card,
            borderRadius: 6, padding: '0 10px',
          }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={T.muted} strokeWidth="2.2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <span style={{ fontSize: '7px', color: T.muted }}>Search ECU part number, vehicle, make…</span>
          </div>
          <div style={{
            backgroundColor: T.primary, borderRadius: 6,
            padding: '0 14px', height: 32, display: 'flex', alignItems: 'center',
            fontSize: '7.5px', fontWeight: 600, color: T.bg,
            boxShadow: '0 0 0 1px rgba(61,134,232,0.38), 0 4px 16px rgba(61,134,232,0.38)',
          }}>Search</div>
        </div>
        {/* Filter pills */}
        <div style={{ position: 'relative', display: 'flex', gap: 4, paddingBottom: 12, overflowX: 'hidden' }}>
          {filters.map((f, i) => (
            <div key={f} style={{
              flexShrink: 0, borderRadius: 20, padding: '3px 9px',
              border: `1px solid ${i === 0 ? T.primary : T.border}`,
              backgroundColor: i === 0 ? 'rgba(61,134,232,0.12)' : T.card,
              fontSize: '6px', color: i === 0 ? T.primary : T.muted,
            }}>{f}</div>
          ))}
        </div>
      </div>
      {/* Results count */}
      <div style={{ padding: '8px 16px', borderTop: `1px solid ${T.border}`, backgroundColor: 'rgba(16,26,43,0.55)', position: 'relative' }}>
        <span style={{ fontSize: '6px', color: T.muted }}>
          <span style={{ color: T.primary, fontWeight: 600 }}>20,000+</span> units in stock · showing <span style={{ color: T.fg }}>312</span> results
        </span>
      </div>
    </div>
  )
}

// ── Heritage archive visual ───────────────────────────────────────────────────
function HeritageArchiveMock() {
  return (
    <div style={{
      borderRadius: 10, border: `1px solid rgba(212,160,60,0.25)`,
      background: `linear-gradient(135deg, ${T.card} 0%, ${T.bg} 100%)`,
      padding: 16, fontFamily: "'Inter', system-ui, sans-serif",
      ...pcbGrid, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(16,26,43,0.55), rgba(16,26,43,0.25))', pointerEvents: 'none' }} />
      <div style={{ position: 'relative' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          border: '1px solid rgba(212,160,60,0.35)', background: 'rgba(212,160,60,0.08)',
          borderRadius: 20, padding: '3px 9px', marginBottom: 9,
        }}>
          <svg width="7" height="7" viewBox="0 0 24 24" fill={T.gold}><path d="M21 8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 001 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
          <span style={{ fontSize: '6px', fontWeight: 600, color: T.gold, textTransform: 'uppercase', letterSpacing: '0.18em' }}>Heritage Archive</span>
        </div>
        <p style={{ fontSize: '12px', fontWeight: 700, color: T.fg, letterSpacing: '-0.02em', marginBottom: 8, lineHeight: 1.2 }}>
          Rare ECU<br />Heritage Archive
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
          {['1970s', '1980s', '1990s', '2000s'].map((era) => (
            <div key={era} style={{
              border: `1px solid ${T.border}`, background: 'rgba(16,26,43,0.70)',
              borderRadius: 6, padding: '6px 7px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '5px', textTransform: 'uppercase', letterSpacing: '0.12em', color: T.muted }}>Era</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: T.fg, lineHeight: 1 }}>{era}</div>
              <div style={{ fontSize: '4.5px', color: T.muted, marginTop: 2, lineHeight: 1.4 }}>Lucas<br />Bosch</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────────

const SERVICES = [
  { title: 'ECU Supply', desc: 'Tested, re-manufactured and plug-and-play units. 20,000+ in stock.' },
  { title: 'Repair & Rebuild', desc: 'Bench-tested workshop repair for engine, ABS and ancillary modules.' },
  { title: 'ECU Cloning', desc: '1:1 cloning, IMMO OFF and EEPROM decoding for trade customers.' },
  { title: 'Heritage Sourcing', desc: 'Lucas, early Bosch Motronic and obsolete dealer-only units.' },
  { title: 'Trade Platform', desc: 'Bulk catalogue for garages — filtered search, hire pool, fast dispatch.' },
  { title: 'Sell / Send', desc: 'Trade in surplus stock or send units in for repair — quick turnaround.' },
]

const STACK = ['React 19', 'TypeScript', 'TanStack Router', 'Tailwind CSS v4', 'Vite', 'Framer Motion']

export default function AllCarElectronics() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section id="allcar" ref={ref} style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--black)' }}>

      {/* ── Header row ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        borderBottom: '1px solid var(--border)',
      }}
        className="allcar-header-grid"
      >
        {/* Left — section label */}
        <div style={{
          padding: '52px 40px',
          borderRight: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <div className="section-header">
              <span className="section-num">03</span>
              <div className="section-header-line" />
            </div>
            <motion.h2
              {...fadeUp(0.05)}
              style={{
                fontSize: 'clamp(26px, 3vw, 38px)',
                fontWeight: 600, lineHeight: 1.1,
                letterSpacing: '-0.025em', color: '#F5F5F5',
              }}
            >
              Case<br />Study
            </motion.h2>
          </div>

          <motion.div {...fadeUp(0.2)}>
            <span className="label" style={{ color: 'rgba(161,161,161,0.45)', display: 'block', marginBottom: 8 }}>Live Project</span>
            <LiveSiteButton
              url="https://allcar-electronics.captured-creative.com"
              label="Launch Website"
              style={{ padding: '11px 18px', fontSize: '10px' }}
            />
          </motion.div>
        </div>

        {/* Right — project overview */}
        <div style={{ padding: '52px 44px' }}>
          <motion.span {...fadeUp(0.08)} className="label" style={{ display: 'block', marginBottom: 18 }}>
            E-Commerce Platform · 2024
          </motion.span>

          <motion.h3
            {...fadeUp(0.12)}
            style={{
              fontSize: 'clamp(32px, 4vw, 58px)',
              fontWeight: 600, lineHeight: 1.0,
              letterSpacing: '-0.03em', color: '#F5F5F5',
              marginBottom: 24,
            }}
          >
            All Car<br />Electronics
          </motion.h3>

          <motion.div {...fadeUp(0.18)} style={{ width: 28, height: 1, background: 'rgba(245,245,245,0.18)', marginBottom: 24 }} />

          <motion.p
            {...fadeUp(0.22)}
            style={{
              fontSize: '14px', lineHeight: 1.85,
              color: '#777777', maxWidth: 580,
              letterSpacing: '0.005em',
            }}
          >
            A specialist UK automotive electronics platform for Allcar Electronics — serving trade garages and vehicle owners since the 1990s. Full inventory management for 20,000+ ECU units, trade search with part-number filtering, ECU hire and repair booking, and a fully functional cart. Deep navy tech aesthetic with electric blue and cyan glow accents, PCB-grid texture, and gold heritage accents.
          </motion.p>

          {/* Services provided */}
          <motion.div {...fadeUp(0.28)} style={{ marginTop: 32 }}>
            <span className="label" style={{ color: 'rgba(161,161,161,0.45)', display: 'block', marginBottom: 12 }}>
              Services Provided
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 0' }}>
              {['Full-Stack Development', 'UI / UX Design', 'Inventory Management', 'E-Commerce & Cart', 'SEO Copywriting', 'Hosting & Maintenance'].map((s, i, arr) => (
                <span key={s} style={{ fontSize: '12px', color: '#D0D0D0', letterSpacing: '0.01em' }}>
                  {s}{i < arr.length - 1 && <span style={{ color: 'rgba(245,245,245,0.2)', margin: '0 10px' }}>·</span>}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Visual showcase ── */}
      <div style={{ padding: '52px 44px', borderBottom: '1px solid var(--border)' }}>
        <motion.p {...fadeUp(0.05)} className="label" style={{ marginBottom: 32 }}>
          Platform Design
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }} className="allcar-mockup-grid">
          {/* Inventory cards */}
          <motion.div {...fadeUp(0.1)}>
            <p className="label" style={{ marginBottom: 14, color: 'rgba(161,161,161,0.45)' }}>Inventory Cards</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
              <InventoryCard make="Peugeot · Engine ECU" title="Plug & Play ECU 0281032456" price={295} status="In Stock" />
              <InventoryCard make="Ford · Engine ECU"    title="Transit Repair Service (Post)" price={165} status="Repair Service" />
              <InventoryCard make="BMW · ABS Module"     title="ABS Module 3452 6770858" price={null} status="Rare" rare />
            </div>
          </motion.div>

          {/* Search UI */}
          <motion.div {...fadeUp(0.16)}>
            <p className="label" style={{ marginBottom: 14, color: 'rgba(161,161,161,0.45)' }}>Search & Filter UI</p>
            <SearchUIMock />
            <div style={{ marginTop: 12 }}>
              <HeritageArchiveMock />
            </div>
          </motion.div>

          {/* Identity + palette */}
          <motion.div {...fadeUp(0.22)}>
            <p className="label" style={{ marginBottom: 14, color: 'rgba(161,161,161,0.45)' }}>Visual Identity</p>

            {/* Colour palette */}
            <div style={{ marginBottom: 14 }}>
              {[
                { swatch: T.bg,      label: 'Navy Black',    hex: '#101a2b' },
                { swatch: T.primary, label: 'Electric Blue', hex: '#3d86e8' },
                { swatch: T.accent,  label: 'Cyan Glow',     hex: '#22d3ee' },
                { swatch: T.gold,    label: 'Heritage Gold', hex: '#d4a03c' },
              ].map(({ swatch, label, hex }) => (
                <div key={hex} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '7px 0', borderBottom: '1px solid var(--border)',
                }}>
                  <div style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: swatch, flexShrink: 0, border: '1px solid rgba(245,245,245,0.08)' }} />
                  <div>
                    <div style={{ fontSize: '10px', color: '#D0D0D0', fontWeight: 500 }}>{label}</div>
                    <div style={{ fontSize: '9px', color: '#555555', fontFamily: 'ui-monospace, monospace' }}>{hex}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div>
              <p className="label" style={{ marginBottom: 10, color: 'rgba(161,161,161,0.45)' }}>Stack</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {STACK.map((tech) => (
                  <span key={tech} style={{
                    padding: '4px 9px', fontSize: '9px', letterSpacing: '0.06em',
                    border: '1px solid var(--border)', color: '#888888',
                    backgroundColor: 'rgba(245,245,245,0.02)',
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Services breakdown grid ── */}
      <div style={{ padding: '52px 44px' }}>
        <motion.div
          {...fadeUp(0.05)}
          style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36 }}
          className="allcar-services-header"
        >
          <div>
            <p className="label" style={{ marginBottom: 10, color: 'rgba(161,161,161,0.45)' }}>
              Platform Capabilities
            </p>
            <h4 style={{
              fontSize: 'clamp(22px, 3vw, 34px)',
              fontWeight: 600, lineHeight: 1.1,
              letterSpacing: '-0.025em', color: '#F5F5F5',
            }}>
              Built for the trade.
            </h4>
          </div>
          <span className="label" style={{ color: 'rgba(161,161,161,0.42)' }}>6 modules delivered</span>
        </motion.div>

        <div className="allcar-services-grid">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp(0.08 + i * 0.07)}
              style={{
                padding: '28px 0',
                borderTop: '1px solid var(--border)',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}
            >
              <span className="label" style={{ color: 'rgba(161,161,161,0.35)' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h5 style={{
                fontSize: '15px', fontWeight: 500,
                letterSpacing: '-0.01em', color: '#E8E8E6',
              }}>
                {s.title}
              </h5>
              <p style={{ fontSize: '12px', lineHeight: 1.8, color: '#606060', letterSpacing: '0.005em' }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
