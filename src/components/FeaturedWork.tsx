import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { type ProjectData } from './ProjectOverlay'
import ProjectOverlay from './ProjectOverlay'

// ─── Slow cinematic scroll — each mockup scrolls at its own pace ───────────
function useMockupScroll(duration: number) {
  return {
    animate: { y: ['0%', '-24%'] },
    transition: {
      duration,
      ease: 'easeInOut' as const,
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  }
}

// ══════════════════════════════════════════════════════════════════════════════
//  MOCKUP 1 — GOLDEN VALLEY ROOFING (website design)
//  Authentic palette sourced from golden-valley-roofing/src/styles.css oklch tokens.
//  Warm charcoal-ink + amber gradient signature. Plus Jakarta Sans headings.
//  Real photography from golden-valley-roofing/src/assets/media/ (copied to public).
// ══════════════════════════════════════════════════════════════════════════════
function RoofingMockup() {
  const scroll = useMockupScroll(36)

  // ── Exact palette — hex approximations of GVR oklch design tokens ──────────
  const ink      = '#0c0a07'   // --charcoal-ink:         oklch(0.09 0.005 60)
  const deep     = '#130e09'   // --charcoal-deep:        oklch(0.13 0.006 60)
  const amber    = '#d4a535'   // --accent-amber:         oklch(0.80 0.14 75)
  const amberSt  = '#b87e1a'   // --accent-amber-strong:  oklch(0.70 0.16 60)
  const bgLight  = '#f9f8f5'   // --background:           oklch(0.985 0.003 80)
  const border   = '#e8e3da'   // --border:               oklch(0.905 0.004 80)
  const muted    = '#8a8070'   // --muted-foreground:     oklch(0.42 0.008 60)
  const fg       = '#f0ede8'   // near-white for dark-bg text
  const fgDark   = '#201a12'   // --foreground:           oklch(0.16 0.006 60)

  // Matches --gradient-amber and --shadow-amber from styles.css
  const gradAmber  = `linear-gradient(135deg, ${amber} 0%, ${amberSt} 100%)`
  const shadowAmb  = `0 8px 28px -8px rgba(184,126,26,0.55)`

  const TRUST = [
    'Fully Insured', 'Free Quotations', '5 Star Rated',
    'Emergency Callouts', 'Experienced Specialists', 'Premium Craftsmanship',
  ]

  // Real services from SERVICES array in golden-valley-roofing/src/components/site/Services.ts
  const SERVICES = [
    { title: 'Slate Roofing',    desc: 'Natural Welsh and Spanish slate, hand-graded and laid to traditional standards.',            img: '/images/gvr/crew-slate-laying.jpg' },
    { title: 'Complete Reroofs', desc: 'Full strip and re-roofs with new battens, breathable membrane and premium tiles.',           img: '/images/gvr/chimney-slate-finished.jpg' },
    { title: 'Chimney Repairs',  desc: 'Repointing, rebuilds and full chimney restoration that stands the test of time.',           img: '/images/gvr/chimney-lead-fresh.jpg' },
  ]

  // Real reviews from golden-valley-roofing/src/routes/index.tsx REVIEWS array
  const REVIEWS = [
    { name: 'Sarah M.',      area: 'Chesterfield', text: 'From the first quote to the final clean-up, the team were spot on. Honest, tidy and the slate work looks beautiful.' },
    { name: 'David & Helen', area: 'Mansfield',    text: 'Storm took half our ridge tiles off on a Sunday night. They were on site within the hour and made everything safe.' },
  ]

  const StarIcon = () => (
    <svg width="7" height="7" viewBox="0 0 24 24" fill={amber} stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
  const CheckIcon = () => (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={amber} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
  const ArrowIcon = ({ color = fgDark }: { color?: string }) => (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  )
  const PhoneIcon = () => (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.78a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .9h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  )
  const HomeIcon = () => (
    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={amber} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )

  return (
    <motion.div
      {...scroll}
      style={{
        backgroundColor: ink,
        minHeight: '210%',
        fontFamily: "'Plus Jakarta Sans', 'Inter Tight', 'Inter', sans-serif",
        willChange: 'transform',
      }}
    >

      {/* ── Sticky Header ─────────────────────────────────────────────────── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: 'rgba(19,14,9,0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(245,240,230,0.09)',
        padding: '0 14px', height: '38px',
        display: 'flex', alignItems: 'center', gap: '8px',
      }}>
        {/* Logo — real logo.png */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <img src="/images/gvr/logo.png" alt="" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontSize: '7.5px', fontWeight: 800, color: fg, letterSpacing: '-0.01em' }}>Golden Valley</div>
            <div style={{ fontSize: '4.5px', textTransform: 'uppercase', letterSpacing: '0.18em', color: amber }}>ROOFING LTD</div>
          </div>
        </div>

        {/* Nav — mirrors Header.tsx NAV array */}
        <div style={{ display: 'flex', gap: '1px', marginLeft: '6px' }}>
          {['Services', 'About', 'Gallery', 'Contact'].map((l, i) => (
            <div key={l} style={{
              padding: '3px 6px', fontSize: '5.5px', letterSpacing: '0.05em',
              color: i === 0 ? amber : 'rgba(240,237,232,0.62)',
            }}>{l}</div>
          ))}
        </div>

        {/* Amber CTA pill — matches header phone button */}
        <div style={{
          marginLeft: 'auto', flexShrink: 0,
          background: gradAmber, borderRadius: '20px',
          padding: '4px 10px',
          fontSize: '5.5px', fontWeight: 700, color: fgDark,
          boxShadow: shadowAmb,
        }}>
          01246 000 000
        </div>
      </div>

      {/* ── Hero — cinematic video poster + amber glow ─────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '28px 16px 34px' }}>
        {/* Real hero-still.jpg used as video poster on actual site */}
        <img
          src="/images/gvr/hero-still.jpg"
          alt=""
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0.52,
            filter: 'saturate(1.05) contrast(1.05)',
          }}
        />
        {/* Gradient overlays — matches GVR: from-charcoal-ink/70 via-charcoal-deep/70 to-charcoal-ink */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `linear-gradient(to bottom, rgba(12,10,7,0.70) 0%, rgba(19,14,9,0.68) 55%, ${ink} 100%)`,
        }} />
        {/* Amber radial glow top-right — matches bg-[radial-gradient(ellipse_at_top_right,rgba(255,200,100,0.15)...)] */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 82% 12%, rgba(212,165,53,0.20) 0%, transparent 55%)',
        }} />

        <div style={{ position: 'relative' }}>
          {/* Intro badge — matches span.rounded-full.border.border-amber-brand/40 */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            border: '1px solid rgba(212,165,53,0.40)',
            background: 'rgba(19,14,9,0.45)',
            backdropFilter: 'blur(6px)',
            borderRadius: '20px', padding: '3px 9px', marginBottom: '14px',
          }}>
            <StarIcon />
            <span style={{ fontSize: '5.5px', fontWeight: 700, color: amber, textTransform: 'uppercase', letterSpacing: '0.18em' }}>
              Premium Midlands Roofing · Est. 2008
            </span>
          </div>

          {/* H1 — exact copy of GVR hero headline */}
          <h1 style={{
            fontSize: '23px', fontWeight: 900, lineHeight: 1.01,
            letterSpacing: '-0.03em', color: fg, margin: '0 0 10px',
          }}>
            Premium Roofing<br />
            Specialists Across<br />
            <span style={{ color: amber }}>Derbyshire</span> &amp; <span style={{ color: amber }}>The Midlands</span>
          </h1>

          <p style={{ fontSize: '6px', color: 'rgba(240,237,232,0.75)', lineHeight: 1.72, marginBottom: '15px', maxWidth: '82%' }}>
            Expert slate roofing, reroofs, chimney work, leadwork<br />
            and high-quality roofing solutions built to last a lifetime.
          </p>

          {/* CTA buttons — gradient-amber pill + border-white/25 pill */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <div style={{
              background: gradAmber, borderRadius: '20px',
              padding: '7px 13px', fontSize: '6.5px', fontWeight: 700, color: fgDark,
              display: 'flex', alignItems: 'center', gap: '4px',
              boxShadow: shadowAmb,
            }}>
              Get Free Quote <ArrowIcon />
            </div>
            <div style={{
              border: '1px solid rgba(245,240,230,0.25)',
              background: 'rgba(245,240,230,0.05)',
              backdropFilter: 'blur(6px)',
              borderRadius: '20px', padding: '7px 12px',
              fontSize: '6.5px', fontWeight: 700, color: fg,
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              <PhoneIcon /> Call Now
            </div>
          </div>
        </div>

        {/* Bottom fade — matches GVR's bottom-0 h-24 gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '28px',
          background: `linear-gradient(to bottom, transparent, ${ink})`,
          pointerEvents: 'none',
        }} />
      </section>

      {/* ── Trust Strip — bg-charcoal-ink, 6-item grid ────────────────────── */}
      <div style={{
        background: ink,
        borderTop: '1px solid rgba(232,227,218,0.08)',
        borderBottom: '1px solid rgba(232,227,218,0.08)',
        padding: '10px 14px',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '7px 6px' }}>
          {TRUST.map((t) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CheckIcon />
              <span style={{ fontSize: '5.5px', fontWeight: 600, color: 'rgba(240,237,232,0.82)' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Services — bg-background (light), rounded-2xl cards ───────────── */}
      <section style={{ background: bgLight, padding: '22px 14px 18px' }}>
        {/* Section header — matches p.text-[11px].tracking-[0.22em].text-amber-brand */}
        <p style={{ fontSize: '5.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: amber, marginBottom: '4px' }}>
          What We Do
        </p>
        <h2 style={{ fontSize: '15px', fontWeight: 900, letterSpacing: '-0.025em', color: fgDark, lineHeight: 1.05, marginBottom: '4px' }}>
          Complete roofing services,<br />done properly.
        </h2>
        <p style={{ fontSize: '6px', color: muted, lineHeight: 1.65, marginBottom: '12px' }}>
          From a single slipped tile to a full heritage reroof — one trusted Midlands team for every job.
        </p>

        {/* Service cards — mirrors article.rounded-2xl.border.border-border.bg-card */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
          {SERVICES.map((s) => (
            <article key={s.title} style={{
              borderRadius: '10px', border: `1px solid ${border}`,
              background: '#ffffff', overflow: 'hidden',
            }}>
              {/* aspect-[5/4] image with real photo */}
              <div style={{ position: 'relative', height: '52px', overflow: 'hidden' }}>
                <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {/* bg-gradient-to-t from-charcoal-ink/85 via-charcoal-ink/20 to-transparent */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(12,10,7,0.88) 0%, rgba(12,10,7,0.18) 55%, transparent 100%)',
                }} />
                {/* Amber icon box — absolute left-5 top-5 (h-11 w-11 rounded-xl bg-charcoal-ink/80) */}
                <div style={{
                  position: 'absolute', top: '5px', left: '5px',
                  width: '16px', height: '16px', borderRadius: '5px',
                  background: 'rgba(12,10,7,0.82)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <HomeIcon />
                </div>
                {/* Title overlay — absolute bottom-5 left-5 text-xl font-extrabold text-white */}
                <div style={{ position: 'absolute', bottom: '5px', left: '6px', right: '6px', fontSize: '7px', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>
                  {s.title}
                </div>
              </div>
              {/* Description — p-6 text-sm text-muted-foreground */}
              <div style={{ padding: '6px 7px' }}>
                <p style={{ fontSize: '5.5px', color: muted, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: '9px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '6px', fontWeight: 700, color: fgDark }}>View all services</span>
          <ArrowIcon color={fgDark} />
        </div>
      </section>

      {/* ── About — bg-charcoal-ink, alternating image/text layout ───────────── */}
      <section style={{ background: ink, padding: '22px 14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', alignItems: 'center', marginBottom: '14px' }}>
          {/* Image col — rounded-2xl shadow-elegant */}
          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: '10px', overflow: 'hidden', aspectRatio: '4/5' }}>
              <img src="/images/gvr/worker-brand.jpg" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {/* Floating amber badge — absolute -left-6 top-6 gradient-amber */}
            <div style={{
              position: 'absolute', top: '6px', left: '-3px',
              background: gradAmber, borderRadius: '7px',
              padding: '5px 7px', boxShadow: shadowAmb,
            }}>
              <div style={{ fontSize: '15px', fontWeight: 900, color: fgDark, lineHeight: 1 }}>15+</div>
              <div style={{ fontSize: '4px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: fgDark, opacity: 0.78 }}>Years on<br />the roofs</div>
            </div>
          </div>

          {/* Text col */}
          <div>
            <p style={{ fontSize: '5.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: amber, marginBottom: '5px' }}>About Golden Valley</p>
            <h2 style={{ fontSize: '12px', fontWeight: 900, letterSpacing: '-0.025em', color: fg, lineHeight: 1.05, marginBottom: '7px' }}>
              Local roofers built on craft, not corners.
            </h2>
            <p style={{ fontSize: '5.5px', color: 'rgba(240,237,232,0.70)', lineHeight: 1.72, marginBottom: '10px' }}>
              Family-run roofing from the heart of Derbyshire. Built one roof at a time — turning up when we say, doing the detail properly, treating every home like our own.
            </p>
            {/* Stats — matches grid.gap-4.sm:grid-cols-2 value boxes on dark bg */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
              {[['500+', 'Projects'], ['15yr', 'Experience'], ['4.9★', 'Rating']].map(([n, l]) => (
                <div key={l} style={{
                  padding: '7px 5px', textAlign: 'center',
                  border: '1px solid rgba(232,227,218,0.10)',
                  background: 'rgba(240,237,232,0.03)',
                  borderRadius: '6px',
                }}>
                  <div style={{ fontSize: '12px', fontWeight: 900, color: amber, lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: '4.5px', letterSpacing: '0.12em', color: 'rgba(240,237,232,0.42)', textTransform: 'uppercase', marginTop: '3px' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured project card — drone-farmhouse.jpg */}
        <div style={{ borderRadius: '10px', overflow: 'hidden', position: 'relative', border: '1px solid rgba(232,227,218,0.09)' }}>
          <img src="/images/gvr/drone-farmhouse.jpg" alt="" style={{ width: '100%', height: '68px', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(12,10,7,0.86) 0%, rgba(12,10,7,0.28) 60%, transparent 100%)',
          }} />
          <div style={{ position: 'absolute', inset: 0, padding: '10px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <p style={{ fontSize: '5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.20em', color: amber, marginBottom: '2px' }}>Featured Project</p>
            <p style={{ fontSize: '9px', fontWeight: 800, color: fg, lineHeight: 1.1 }}>Heritage Slate Reroof — Derbyshire Farmhouse</p>
          </div>
        </div>
      </section>

      {/* ── Reviews — bg-background (light), cards with amber stars ──────────── */}
      <section style={{ background: bgLight, padding: '18px 14px' }}>
        <p style={{ fontSize: '5.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.22em', color: amber, marginBottom: '4px' }}>What Clients Say</p>
        <h2 style={{ fontSize: '13px', fontWeight: 900, letterSpacing: '-0.025em', color: fgDark, marginBottom: '11px' }}>Trusted across Derbyshire.</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
          {REVIEWS.map((r) => (
            <div key={r.name} style={{
              borderRadius: '10px', border: `1px solid ${border}`,
              background: '#ffffff', padding: '9px',
            }}>
              {/* 5 amber stars */}
              <div style={{ display: 'flex', gap: '2px', marginBottom: '5px' }}>
                {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
              </div>
              <p style={{ fontSize: '6px', color: fgDark, lineHeight: 1.62, marginBottom: '6px', fontWeight: 500 }}>
                "{r.text}"
              </p>
              <div style={{ borderTop: `1px solid ${border}`, paddingTop: '5px' }}>
                <div style={{ fontSize: '6.5px', fontWeight: 700, color: fgDark }}>{r.name}</div>
                <div style={{ fontSize: '5.5px', color: muted }}>{r.area}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Emergency CTA — bg-amber-brand, matching GVR's emergency banner ──── */}
      <section style={{
        background: gradAmber, padding: '14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px',
      }}>
        <div>
          <p style={{ fontSize: '5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: fgDark, opacity: 0.65, marginBottom: '2px' }}>24/7 Emergency Callouts</p>
          <p style={{ fontSize: '11px', fontWeight: 900, color: fgDark, lineHeight: 1.05 }}>Storm damage?<br />Call us now.</p>
        </div>
        <div style={{
          background: fgDark, borderRadius: '20px',
          padding: '6px 12px', fontSize: '6.5px', fontWeight: 700, color: amber,
          whiteSpace: 'nowrap',
        }}>
          01246 000 000
        </div>
      </section>

      {/* ── Footer — bg-charcoal-deep ──────────────────────────────────────── */}
      <div style={{
        background: deep, borderTop: '1px solid rgba(232,227,218,0.09)',
        padding: '12px 14px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <img src="/images/gvr/logo.png" alt="" style={{ width: '16px', height: '16px', borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontSize: '6px', fontWeight: 800, color: fg }}>Golden Valley Roofing Ltd</span>
        </div>
        <span style={{ fontSize: '5px', color: 'rgba(240,237,232,0.38)' }}>© 2025 · Derbyshire &amp; The Midlands</span>
      </div>

    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
//  MOCKUP — ALLCAR ELECTRONICS (UK ECU specialist platform)
//  Real palette: deep navy · electric blue · cyan glow · PCB grid · gold rare
//  Exact colours sourced from allcar-electronics/src/styles.css oklch tokens
// ══════════════════════════════════════════════════════════════════════════════

// CPU icon used across the allcar mockup (site-chrome logo + card image area)
function AllcarCpu({ size = 10, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="6" height="6"/>
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <line x1="9"  y1="2"  x2="9"  y2="4"/>
      <line x1="15" y1="2"  x2="15" y2="4"/>
      <line x1="9"  y1="20" x2="9"  y2="22"/>
      <line x1="15" y1="20" x2="15" y2="22"/>
      <line x1="2"  y1="9"  x2="4"  y2="9"/>
      <line x1="2"  y1="15" x2="4"  y2="15"/>
      <line x1="20" y1="9"  x2="22" y2="9"/>
      <line x1="20" y1="15" x2="22" y2="15"/>
    </svg>
  )
}

function AllcarMockup() {
  const scroll = useMockupScroll(44)

  // ── Exact palette from allcar-electronics/src/styles.css ──────────────────
  const bg      = '#101a2b'   // oklch(0.18 0.03 250) deep navy background
  const card    = '#141e2d'   // oklch(0.22 0.035 250) card surface
  const sec     = '#1a2840'   // oklch(0.28 0.04 250) secondary / input bg
  const primary = '#3d86e8'   // oklch(0.72 0.18 235) electric blue
  const accent  = '#22d3ee'   // oklch(0.78 0.15 200) cyan accent
  const fg      = '#edf0f8'   // oklch(0.97 0.01 240) near-white foreground
  const muted   = '#aab2c4'   // oklch(0.72 0.02 240) muted text
  const border  = '#1e2e48'   // oklch(0.32 0.03 250) border
  const success = '#3cb964'   // oklch(0.7 0.16 150) green / in-stock
  const gold    = '#d4a03c'   // oklch(0.78 0.16 75) gold / rare / heritage

  // PCB grid — the site's signature texture at 24 px (scaled from real 32 px)
  const pcbGrid = {
    backgroundImage: [
      'linear-gradient(rgba(61,134,232,0.08) 1px, transparent 1px)',
      'linear-gradient(90deg, rgba(61,134,232,0.08) 1px, transparent 1px)',
    ].join(', '),
    backgroundSize: '24px 24px',
  }

  // Status badge colours matching STATUS_COLOR in product-card.tsx
  const statusStyle = {
    'In Stock':       { bg: 'rgba(60,185,100,0.14)', color: '#6ee89a',  border: 'rgba(60,185,100,0.28)' },
    'Repair Service': { bg: 'rgba(61,134,232,0.14)', color: primary,    border: 'rgba(61,134,232,0.28)' },
    'Rare':           { bg: 'rgba(212,160,60,0.14)', color: gold,       border: 'rgba(212,160,60,0.28)' },
  }

  // Real inventory items (sourced from inventory-data.ts ace-001, ace-005, ace-007)
  const stock = [
    {
      make: 'Peugeot', type: 'Engine ECU',
      title: 'Plug & Play ECU 0281032456 / 9814182680',
      model: '208 / 308 / Partner 1.6 HDi 2012–18',
      pn: '0281032456', mfr: 'Bosch',
      price: 295, status: 'In Stock' as const,
      plugPlay: true, tested: true, rare: false, heritage: false,
    },
    {
      make: 'Ford', type: 'Engine ECU',
      title: 'Transit ECU Repair Service (By Post)',
      model: 'Transit 2.2 / 2.4 TDCi',
      pn: 'Various', mfr: 'Visteon',
      price: 165, status: 'Repair Service' as const,
      plugPlay: false, tested: false, rare: false, heritage: false,
    },
    {
      make: 'BMW', type: 'ABS Module',
      title: 'ABS Module 3452 6770858 — Heritage Unit',
      model: '3 Series E46 1998–2005',
      pn: '3452 6770858', mfr: 'ATE / Bosch',
      price: null, status: 'Rare' as const,
      plugPlay: false, tested: true, rare: true, heritage: true,
    },
  ]

  return (
    <motion.div
      {...scroll}
      style={{
        backgroundColor: bg,
        backgroundImage: [
          'radial-gradient(at 12% 8%, rgba(61,134,232,0.13) 0px, transparent 55%)',
          'radial-gradient(at 88% 0%, rgba(34,211,238,0.09) 0px, transparent 50%)',
        ].join(', '),
        minHeight: '190%',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        willChange: 'transform',
      }}
    >

      {/* ── Sticky Header ──────────────────────────────────────────────────── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: 'rgba(16,26,43,0.88)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${border}`,
        padding: '0 14px', height: '38px',
        display: 'flex', alignItems: 'center', gap: '7px',
      }}>
        {/* Logo — matches site-chrome.tsx gradient box */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
          <div style={{
            width: '22px', height: '22px', borderRadius: '6px',
            background: `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 0 1px rgba(61,134,232,0.40), 0 4px 14px rgba(61,134,232,0.38)`,
          }}>
            <AllcarCpu size={11} color={bg} />
          </div>
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontSize: '7.5px', fontWeight: 700, color: fg, letterSpacing: '-0.01em' }}>Allcar Electronics</div>
            <div style={{ fontSize: '4.5px', textTransform: 'uppercase', letterSpacing: '0.18em', color: muted }}>UK ECU Specialists</div>
          </div>
        </div>

        {/* Nav — mirrors NAV array from site-chrome.tsx */}
        <div style={{ display: 'flex', gap: '1px', marginLeft: '6px' }}>
          {[['ECU Stock', true], ['Services', false], ['Rare Archive', false], ['Sell / Send', false]].map(([l, active], i) => (
            <div key={i} style={{
              padding: '3px 6px', borderRadius: '4px', fontSize: '6px',
              color: active ? primary : 'rgba(237,240,248,0.72)',
              background: active ? 'rgba(61,134,232,0.12)' : 'transparent',
            }}>{l as string}</div>
          ))}
        </div>

        {/* Right — phone + cart badge */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '7px' }}>
          <span style={{ fontSize: '5.5px', color: muted, display: 'flex', alignItems: 'center', gap: '3px' }}>
            <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke={muted} strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.78a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .9h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            01773 836485
          </span>
          <div style={{
            width: '22px', height: '22px', borderRadius: '5px',
            border: `1px solid ${border}`, background: sec,
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
            </svg>
            <div style={{
              position: 'absolute', top: '-4px', right: '-4px',
              width: '9px', height: '9px', borderRadius: '50%',
              background: primary, color: bg, fontSize: '5px', fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>2</div>
          </div>
        </div>
      </div>

      {/* ── Hero — PCB grid + glow radials ─────────────────────────────────── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        padding: '26px 16px 24px',
        borderBottom: `1px solid ${border}`,
        ...pcbGrid,
      }}>
        {/* Gradient overlay dims the grid toward the bottom */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `linear-gradient(to bottom, rgba(16,26,43,0.22) 0%, rgba(16,26,43,0.65) 75%, ${bg} 100%)`,
        }} />

        <div style={{ position: 'relative' }}>
          {/* Badge — mirrors the inline-flex badge in index.tsx hero */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            border: '1px solid rgba(61,134,232,0.30)', background: 'rgba(61,134,232,0.09)',
            borderRadius: '20px', padding: '2.5px 9px', marginBottom: '11px',
          }}>
            <svg width="7" height="7" viewBox="0 0 24 24" fill={primary}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            <span style={{ fontSize: '5.5px', fontWeight: 600, color: primary, textTransform: 'uppercase', letterSpacing: '0.2em' }}>UK ECU Specialists since the 1990s</span>
          </div>

          {/* Headline with .text-gradient on "Repair & Cloning" */}
          <h1 style={{ fontSize: '23px', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.025em', color: fg, marginBottom: '10px' }}>
            UK ECU Sales, Hire,{' '}
            <span style={{
              background: `linear-gradient(90deg, ${primary}, ${accent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Repair & Cloning
            </span>
            {' '}Specialists
          </h1>

          <p style={{ fontSize: '7.5px', color: muted, lineHeight: 1.78, marginBottom: '14px', maxWidth: '78%' }}>
            Over 20,000 tested, re-manufactured and rare electronic control units in stock —
            supporting garages, specialists and vehicle owners across the UK.
          </p>

          {/* Search bar — matches the form in index.tsx */}
          <div style={{ display: 'flex', gap: '5px', marginBottom: '11px', maxWidth: '88%' }}>
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center', gap: '6px',
              border: `1px solid ${border}`, background: card,
              borderRadius: '7px', padding: '0 10px', height: '28px',
            }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={muted} strokeWidth="2.2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <span style={{ fontSize: '6.5px', color: muted }}>Search by ECU part number, vehicle, make or service…</span>
            </div>
            <div style={{
              borderRadius: '7px', background: primary, flexShrink: 0,
              padding: '0 12px', height: '28px',
              display: 'flex', alignItems: 'center',
              fontSize: '7px', fontWeight: 600, color: bg,
              boxShadow: `0 0 0 1px rgba(61,134,232,0.40), 0 4px 18px rgba(61,134,232,0.42)`,
            }}>Search Stock</div>
          </div>

          {/* Quick link buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '18px' }}>
            {['Search ECU Stock', 'Request ECU Repair', 'Browse Rare Archive', 'Visit eBay Store'].map((l) => (
              <div key={l} style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                border: `1px solid ${border}`, background: 'rgba(20,30,45,0.80)',
                borderRadius: '5px', padding: '4px 7px',
                fontSize: '6px', color: fg,
              }}>{l}</div>
            ))}
          </div>

          {/* Trust badges — 6-cell grid matching index.tsx */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
            {[
              '20,000+ ECUs in stock', 'Rare & obsolete units', 'Family-run specialist',
              'UK repair-by-post', 'Plug & Play available', 'Trade support available',
            ].map((b) => (
              <div key={b} style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                border: `1px solid ${border}`, background: 'rgba(20,30,45,0.65)',
                borderRadius: '6px', padding: '5px 7px',
              }}>
                <div style={{
                  width: '15px', height: '15px', borderRadius: '4px',
                  background: 'rgba(61,134,232,0.12)', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <AllcarCpu size={7} color={primary} />
                </div>
                <span style={{ fontSize: '5.5px', fontWeight: 500, color: fg, lineHeight: 1.25 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Stock ──────────────────────────────────────────────────── */}
      <section style={{ padding: '18px 16px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '13px' }}>
          <div>
            <div style={{ fontSize: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.22em', color: primary, marginBottom: '3px' }}>Stock highlights</div>
            <h2 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '-0.025em', color: fg }}>Recently tested and ready to ship</h2>
          </div>
          <span style={{ fontSize: '6px', fontWeight: 600, color: primary }}>View all stock →</span>
        </div>

        {/* 3-col product card grid — mirrors the ProductCard component */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '7px' }}>
          {stock.map((item, i) => {
            const s = statusStyle[item.status]
            return (
              <article key={i} style={{
                borderRadius: '8px', border: `1px solid ${border}`, background: card,
                overflow: 'hidden', display: 'flex', flexDirection: 'column',
              }}>
                {/* aspect-[4/3] image area with PCB grid */}
                <div style={{
                  height: '52px', position: 'relative',
                  borderBottom: `1px solid ${border}`,
                  background: `linear-gradient(135deg, ${sec} 0%, ${bg} 100%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  ...pcbGrid,
                }}>
                  <AllcarCpu size={17} color="rgba(61,134,232,0.52)" />
                  {item.rare && (
                    <div style={{
                      position: 'absolute', top: '4px', left: '4px',
                      fontSize: '4.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                      background: 'rgba(212,160,60,0.18)', color: gold, border: '1px solid rgba(212,160,60,0.35)',
                      borderRadius: '3px', padding: '1.5px 4px',
                    }}>★ Rare find</div>
                  )}
                  <div style={{
                    position: 'absolute', top: '4px', right: '4px',
                    fontSize: '4.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
                    background: s.bg, color: s.color, border: `1px solid ${s.border}`,
                    borderRadius: '3px', padding: '1.5px 4px',
                  }}>{item.status}</div>
                </div>

                {/* Card body */}
                <div style={{ padding: '7px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>
                    <div style={{ fontSize: '5px', textTransform: 'uppercase', letterSpacing: '0.12em', color: muted }}>{item.make} · {item.type}</div>
                    <div style={{ fontSize: '7px', fontWeight: 600, color: fg, lineHeight: 1.3, marginTop: '1.5px' }}>{item.title}</div>
                  </div>
                  {/* meta — model / part number mono / manufacturer */}
                  <div style={{ fontSize: '5.5px', color: muted, lineHeight: 1.65 }}>
                    <div>{item.model}</div>
                    <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: '5px', marginTop: '1px' }}>P/N: {item.pn}</div>
                    <div>Mfr: {item.mfr}</div>
                  </div>
                  {/* Tag pills — Plug & Play · Tested · Heritage */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                    {item.plugPlay && <span style={{ fontSize: '4.5px', padding: '1.5px 4px', borderRadius: '3px', background: 'rgba(61,134,232,0.10)', color: primary, border: '1px solid rgba(61,134,232,0.20)' }}>Plug & Play</span>}
                    {item.tested   && <span style={{ fontSize: '4.5px', padding: '1.5px 4px', borderRadius: '3px', background: 'rgba(60,185,100,0.10)', color: success, border: '1px solid rgba(60,185,100,0.20)' }}>Tested</span>}
                    {item.heritage && <span style={{ fontSize: '4.5px', padding: '1.5px 4px', borderRadius: '3px', background: 'rgba(212,160,60,0.10)', color: gold,    border: '1px solid rgba(212,160,60,0.20)' }}>Heritage</span>}
                  </div>
                  {/* Price + CTA */}
                  <div style={{
                    marginTop: 'auto', paddingTop: '5px',
                    borderTop: `1px solid ${border}`,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <div>
                      {item.price != null
                        ? <div style={{ fontSize: '12px', fontWeight: 700, color: fg, lineHeight: 1 }}>£{item.price}</div>
                        : <div style={{ fontSize: '6.5px', fontWeight: 600, color: muted }}>Enquire</div>
                      }
                      <div style={{ fontSize: '4.5px', color: muted }}>Excl. VAT · UK shipping</div>
                    </div>
                    <div style={{
                      background: primary, borderRadius: '4px',
                      padding: '4px 8px', fontSize: '6px', fontWeight: 600, color: bg,
                    }}>
                      {item.status === 'Repair Service' ? 'Book' : 'Add'}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* ── Heritage Archive — rare/gold border matching index.tsx ─────────── */}
      <section style={{ padding: '4px 16px 20px' }}>
        <div style={{
          borderRadius: '12px',
          border: '1px solid rgba(212,160,60,0.28)',
          background: `linear-gradient(135deg, ${card} 0%, ${bg} 100%)`,
          padding: '15px', position: 'relative', overflow: 'hidden',
          ...pcbGrid,
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(16,26,43,0.58), rgba(16,26,43,0.28))', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                border: '1px solid rgba(212,160,60,0.38)', background: 'rgba(212,160,60,0.09)',
                borderRadius: '20px', padding: '2.5px 8px', marginBottom: '8px',
              }}>
                <svg width="7" height="7" viewBox="0 0 24 24" fill={gold}><path d="M21 8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 001 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
                <span style={{ fontSize: '5.5px', fontWeight: 600, color: gold, textTransform: 'uppercase', letterSpacing: '0.18em' }}>Heritage stock</span>
              </div>
              <h3 style={{ fontSize: '13px', fontWeight: 700, color: fg, letterSpacing: '-0.02em', marginBottom: '6px' }}>Rare ECU Heritage Archive</h3>
              <p style={{ fontSize: '6px', color: muted, lineHeight: 1.68, marginBottom: '10px' }}>
                We preserve ECUs from the 1970s onwards — Lucas, early Bosch Motronic and obsolete dealer-only units impossible to source elsewhere.
              </p>
              <div style={{
                display: 'inline-flex', alignItems: 'center',
                background: gold, borderRadius: '5px',
                padding: '5px 10px', fontSize: '6px', fontWeight: 700, color: bg,
              }}>Browse the archive</div>
            </div>
            {/* Era boxes — 2×2 grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
              {['1970s', '1980s', '1990s', '2000s'].map((era) => (
                <div key={era} style={{
                  border: `1px solid ${border}`, background: 'rgba(16,26,43,0.70)',
                  borderRadius: '6px', padding: '7px 8px',
                }}>
                  <div style={{ fontSize: '4.5px', textTransform: 'uppercase', letterSpacing: '0.14em', color: muted }}>Era</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: fg, lineHeight: 1.05, marginTop: '1px' }}>{era}</div>
                  <div style={{ fontSize: '4.5px', color: muted, marginTop: '3px', lineHeight: 1.4 }}>Lucas · Bosch<br />early EFI</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services — 3×2 grid matching index.tsx service quick-links ─────── */}
      <section style={{ padding: '0 16px 24px', borderTop: `1px solid ${border}` }}>
        <div style={{ paddingTop: '16px', marginBottom: '13px' }}>
          <div style={{ fontSize: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.22em', color: primary, marginBottom: '3px' }}>What we do</div>
          <h2 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '-0.02em', color: fg }}>Specialist services for trade and vehicle owners</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
          {[
            { title: 'ECU Hire & Supply',    body: 'Known-good hire unit for fault diagnosis before committing to a replacement.' },
            { title: 'ECU Test & Repair',    body: 'Bench-tested workshop repair for engine, transmission and ancillary modules.' },
            { title: 'ECU Clone & Decode',   body: '1:1 cloning, IMMO OFF and pin / EEPROM decoding for trade customers.' },
            { title: 'ABS Repair & Supply',  body: 'Repair and supply of ABS / ESP modules across all major manufacturers.' },
            { title: 'Instrument Clusters',  body: 'Pixel, backlight and mileage retention repairs for digital clusters.' },
            { title: 'Sell / Send Your ECU', body: 'Trade in surplus stock or send units in for repair — fast turnaround.' },
          ].map((s) => (
            <div key={s.title} style={{
              border: `1px solid ${border}`, background: card,
              borderRadius: '7px', padding: '9px',
            }}>
              <div style={{
                width: '18px', height: '18px', borderRadius: '5px',
                background: 'rgba(61,134,232,0.12)', marginBottom: '6px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <AllcarCpu size={8} color={primary} />
              </div>
              <div style={{ fontSize: '7px', fontWeight: 600, color: fg, marginBottom: '3px' }}>{s.title}</div>
              <div style={{ fontSize: '5.5px', color: muted, lineHeight: 1.55 }}>{s.body}</div>
              <div style={{ fontSize: '5.5px', fontWeight: 500, color: primary, marginTop: '6px' }}>Learn more →</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer strip ───────────────────────────────────────────────────── */}
      <div style={{
        borderTop: `1px solid ${border}`, padding: '11px 16px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(16,26,43,0.60)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{
            width: '16px', height: '16px', borderRadius: '4px',
            background: `linear-gradient(135deg, ${primary}, ${accent})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <AllcarCpu size={8} color={bg} />
          </div>
          <span style={{ fontSize: '6px', fontWeight: 700, color: fg }}>Allcar Electronics</span>
        </div>
        <span style={{ fontSize: '5px', color: muted }}>35 Willows Ave, Alfreton, DE55 7ES</span>
        <span style={{ fontSize: '5px', color: muted }}>© 2025 UK ECU Specialists</span>
      </div>

    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
//  MOCKUP 3 — LAKESIDE GARDEN 湖泮楼 (Chinese takeaway ordering system)
//  Real brand palette: deep red · warm gold · cream. Bilingual EN/中文.
//  Playfair Display headings · rounded-full CTAs · basket with badge.
// ══════════════════════════════════════════════════════════════════════════════
function LakesideMockup() {
  const scroll = useMockupScroll(46)

  // Authentic palette from lakeside-garden/src/styles.css
  const cream    = '#faf8f2'   // oklch(0.985 0.012 85) warm cream background
  const ink      = '#1d1b14'   // oklch(0.16 0.015 30) near-black
  const primary  = '#7d2020'   // oklch(0.45 0.18 25) deep red
  const gold     = '#c69a38'   // oklch(0.78 0.13 80) warm gold
  const cardBg   = '#ffffff'
  const border   = '#dddad2'   // oklch(0.88 0.02 75)
  const mutedFg  = '#6a6356'   // oklch(0.45 0.02 40)
  const heroFrom = '#2c1717'   // gradient-hero start oklch(0.22 0.05 25)
  const heroTo   = '#5b1d1d'   // gradient-hero end   oklch(0.35 0.15 25)
  const goldGrad = `linear-gradient(135deg, #d4a840, #b08228)`
  const shadow   = '0 2px 12px rgba(29,27,20,0.10)'

  const menuItems = [
    { en: 'Salt & Pepper Chicken', zh: '椒盐鸡',         price: '£7.50' },
    { en: 'Crispy Aromatic Duck',  zh: '香酥鸭 (¼)',      price: '£12.50' },
    { en: 'Sweet & Sour Chicken',  zh: '咕噜鸡球',         price: '£7.20' },
    { en: 'Special Chow Mein',     zh: '招牌炒面',         price: '£7.80' },
    { en: 'Crispy Shredded Beef',  zh: '干牛丝',           price: '£7.60' },
    { en: 'Special Fried Rice',    zh: '招牌炒饭',         price: '£7.70' },
  ]

  const cats = ['Soups', 'Salt & Pepper', 'Chicken', 'Beef', 'Duck & Pork']

  return (
    <motion.div
      {...scroll}
      style={{
        backgroundColor: cream,
        minHeight: '168%',
        fontFamily: "'Inter', system-ui, sans-serif",
        willChange: 'transform',
      }}
    >

      {/* ── Sticky header ─────────────────────────────────────── */}
      <div style={{
        backgroundColor: `rgba(250,248,242,0.88)`,
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${border}`,
        padding: '0 13px',
        height: '38px',
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        position: 'sticky',
        top: 0,
        zIndex: 20,
      }}>
        {/* 湖 logo circle */}
        <div style={{
          width: '24px', height: '24px', borderRadius: '50%',
          backgroundColor: primary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: `0 2px 8px rgba(125,32,32,0.38)`,
        }}>
          <span style={{ fontSize: '9px', color: cream, fontWeight: 700, fontFamily: 'Georgia, serif' }}>湖</span>
        </div>

        {/* Brand */}
        <div style={{ lineHeight: 1.1 }}>
          <div style={{ fontSize: '8.5px', fontWeight: 600, color: ink, fontFamily: 'Georgia, serif', letterSpacing: '-0.01em' }}>
            Lakeside Garden
          </div>
          <div style={{ fontSize: '6px', color: mutedFg }}>湖泮楼</div>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', gap: '11px', marginLeft: '10px' }}>
          {['Menu', 'Offers', 'About', 'Contact'].map(l => (
            <span key={l} style={{ fontSize: '6.5px', color: mutedFg }}>{l}</span>
          ))}
        </div>

        {/* Right controls */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '5px' }}>
          {/* EN / 中文 pill */}
          <div style={{ display: 'flex', backgroundColor: '#ede9e0', borderRadius: '20px', padding: '2px' }}>
            <div style={{ backgroundColor: cardBg, borderRadius: '20px', padding: '2px 6px', fontSize: '5.5px', fontWeight: 700, color: ink, boxShadow: '0 1px 3px rgba(0,0,0,0.10)' }}>EN</div>
            <div style={{ padding: '2px 6px', fontSize: '5.5px', color: mutedFg }}>中文</div>
          </div>
          {/* Order Now button */}
          <div style={{ backgroundColor: primary, borderRadius: '20px', padding: '3px 7px', fontSize: '5.5px', fontWeight: 600, color: cream }}>
            Order Now
          </div>
          {/* Basket */}
          <div style={{
            width: '24px', height: '24px', borderRadius: '50%',
            backgroundColor: primary, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', boxShadow: `0 2px 6px rgba(125,32,32,0.3)`,
          }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={cream} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            <div style={{
              position: 'absolute', top: '-3px', right: '-3px',
              width: '9px', height: '9px', borderRadius: '50%',
              backgroundColor: gold, border: '1.5px solid #fff',
              fontSize: '5px', fontWeight: 700, color: ink,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>3</div>
          </div>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(135deg, ${heroFrom} 0%, ${heroTo} 100%)`,
        padding: '22px 14px 20px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Warm food-photo glow on right — simulates the real hero-dishes.jpg */}
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: '55%',
          background: `radial-gradient(ellipse at 85% 45%, rgba(190,110,28,0.48) 0%, rgba(160,70,20,0.22) 40%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        {/* Horizontal from-left overlay — matches real site's from-ink gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to right, ${heroFrom} 0%, rgba(44,23,23,0.88) 52%, rgba(44,23,23,0.38) 100%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: '74%' }}>
          {/* Gold badge — "湖泮楼 · Lakeside Garden" */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            border: `1px solid rgba(198,154,56,0.50)`,
            borderRadius: '20px',
            backgroundColor: 'rgba(44,23,23,0.60)',
            padding: '3px 9px',
            marginBottom: '10px',
          }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill={gold}><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
            <span style={{ fontSize: '6px', fontWeight: 600, color: gold, letterSpacing: '0.06em' }}>湖泮楼 · Lakeside Garden</span>
          </div>

          {/* Headline — Playfair Display via Georgia fallback */}
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
            fontSize: '19px',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
            color: cream,
            margin: '0 0 8px',
          }}>
            Authentic Chinese<br />takeaway, freshly<br />prepared tonight.
          </h2>

          <p style={{ fontSize: '6.5px', color: 'rgba(250,248,242,0.80)', lineHeight: 1.65, marginBottom: '12px' }}>
            Order your favourite dishes for fast collection<br />or local delivery. 18 High Street.
          </p>

          {/* CTA buttons — rounded-full, the real site's signature */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <div style={{
              background: `linear-gradient(135deg, ${primary}, #5a1515)`,
              borderRadius: '20px', padding: '6px 12px',
              fontSize: '7px', fontWeight: 600, color: cream,
              boxShadow: `0 6px 20px rgba(125,32,32,0.40)`,
            }}>
              Start Order →
            </div>
            <div style={{
              border: `1px solid rgba(250,248,242,0.28)`,
              borderRadius: '20px', padding: '6px 11px',
              fontSize: '7px', color: 'rgba(250,248,242,0.92)',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.78a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .9h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              01773 435375
            </div>
          </div>

          {/* Info chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 10px' }}>
            {[
              { icon: '🕐', text: 'Open 16:30 – 21:50' },
              { icon: '📦', text: 'Collection ~20 min' },
              { icon: '🚚', text: 'Delivery 30–60 min' },
              { icon: '📍', text: '18 High Street' },
            ].map(c => (
              <div key={c.text} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '6px', color: 'rgba(250,248,242,0.82)' }}>
                <span style={{ fontSize: '7.5px' }}>{c.icon}</span>{c.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick info cards (lifted, -mt-8 style) ────────────── */}
      <div style={{
        margin: '-10px 12px 0',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px',
        position: 'relative', zIndex: 1,
      }}>
        {[
          { icon: '🕐', label: 'Open Today',  val: '16:30 – 21:50' },
          { icon: '📦', label: 'Collection',  val: '~20 min' },
          { icon: '🚚', label: 'Delivery',    val: '30–60 min' },
          { icon: '📍', label: 'Location',    val: '18 High St' },
        ].map(c => (
          <div key={c.label} style={{
            backgroundColor: cardBg, border: `1px solid ${border}`,
            borderRadius: '12px', padding: '8px', boxShadow: shadow,
          }}>
            <span style={{ fontSize: '11px' }}>{c.icon}</span>
            <div style={{ fontSize: '5.5px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.09em', color: mutedFg, marginTop: '4px' }}>{c.label}</div>
            <div style={{ fontSize: '8px', fontWeight: 600, color: ink, marginTop: '2px' }}>{c.val}</div>
          </div>
        ))}
      </div>

      {/* ── Offers ────────────────────────────────────────────── */}
      <div style={{ padding: '16px 13px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '9px' }}>
          <div>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '14px', fontWeight: 700, color: ink, letterSpacing: '-0.01em' }}>Tonight's Offers</h3>
            <p style={{ fontSize: '6px', color: mutedFg, marginTop: '1px' }}>Save more when you order direct.</p>
          </div>
          <span style={{ fontSize: '7px', fontWeight: 500, color: primary }}>View all →</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginBottom: '16px' }}>
          {[
            { tag: '10%',  text: '10% off orders over £10',        tone: 'p' },
            { tag: '🥟',  text: 'Free prawn crackers over £20',    tone: 'g' },
            { tag: '🌯',  text: 'Free mini spring rolls over £30', tone: 'g' },
            { tag: '👨‍👩‍👧', text: 'Family Feast — feeds 4 £49.50',   tone: 'p' },
          ].map((o, i) => (
            <div key={i} style={{
              backgroundColor: cardBg, border: `1px solid ${border}`,
              borderRadius: '12px', padding: '8px', boxShadow: shadow,
            }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                minWidth: '20px', height: '20px', borderRadius: '20px', padding: '0 5px',
                background: o.tone === 'p' ? primary : goldGrad,
                color: o.tone === 'p' ? cream : ink,
                fontSize: '7px', fontWeight: 700, marginBottom: '5px',
              }}>{o.tag}</div>
              <p style={{ fontSize: '6px', color: ink, fontWeight: 500, lineHeight: 1.4 }}>{o.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Menu ──────────────────────────────────────────────── */}
      <div style={{ padding: '0 13px' }}>
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '14px', fontWeight: 700, color: ink, letterSpacing: '-0.01em', marginBottom: '2px' }}>Our Menu</h3>
        <p style={{ fontSize: '6px', color: mutedFg, marginBottom: '9px' }}>Wok-fired, freshly prepared every order.</p>

        {/* Search bar */}
        <div style={{
          height: '26px', border: `1px solid ${border}`, borderRadius: '20px',
          backgroundColor: cardBg, display: 'flex', alignItems: 'center',
          padding: '0 10px', gap: '5px', marginBottom: '7px', boxShadow: shadow,
        }}>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={mutedFg} strokeWidth="2.2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <span style={{ fontSize: '6.5px', color: mutedFg }}>Search dishes…</span>
        </div>

        {/* Category tabs — rounded-full pills, one active in primary */}
        <div style={{ display: 'flex', gap: '5px', marginBottom: '12px', overflow: 'hidden' }}>
          {cats.map((c, i) => (
            <div key={c} style={{
              flexShrink: 0, borderRadius: '20px', padding: '3.5px 9px',
              fontSize: '6px', fontWeight: 500,
              border: `1px solid ${i === 1 ? primary : border}`,
              backgroundColor: i === 1 ? primary : cardBg,
              color: i === 1 ? cream : ink,
            }}>{c}</div>
          ))}
        </div>

        {/* Category heading */}
        <div style={{ marginBottom: '8px' }}>
          <h4 style={{ fontFamily: 'Georgia, serif', fontSize: '12px', fontWeight: 700, color: ink }}>Salt &amp; Pepper</h4>
          <p style={{ fontSize: '5.5px', textTransform: 'uppercase', letterSpacing: '0.09em', color: mutedFg }}>椒盐</p>
        </div>

        {/* Menu items — 2 col grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', marginBottom: '16px' }}>
          {menuItems.map((m, i) => (
            <div key={i} style={{
              backgroundColor: cardBg, border: `1px solid ${border}`,
              borderRadius: '12px', padding: '8px',
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '5px',
              boxShadow: shadow,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '7px', fontWeight: 500, color: ink, lineHeight: 1.3, marginBottom: '2px' }}>{m.en}</div>
                <div style={{ fontSize: '5.5px', color: mutedFg, marginBottom: '4px' }}>{m.zh}</div>
                <div style={{ fontSize: '9px', fontWeight: 700, color: primary }}>{m.price}</div>
              </div>
              {/* + button — rounded-full, primary, real site's signature add button */}
              <div style={{
                width: '19px', height: '19px', borderRadius: '50%',
                backgroundColor: primary, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 2px 8px rgba(125,32,32,0.32)`,
              }}>
                <span style={{ fontSize: '12px', color: cream, lineHeight: 1, fontWeight: 300, marginTop: '-1px' }}>+</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner — gradient, gold button, real layout */}
        <div style={{
          borderRadius: '16px',
          background: `linear-gradient(135deg, ${heroFrom} 0%, ${heroTo} 65%, #6b2020 100%)`,
          padding: '14px 14px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px',
          marginBottom: '8px',
          boxShadow: `0 12px 32px rgba(125,32,32,0.28)`,
        }}>
          <div>
            <div style={{ fontSize: '14px', color: gold, marginBottom: '5px' }}>♥</div>
            <h4 style={{ fontFamily: 'Georgia, serif', fontSize: '11px', fontWeight: 700, color: cream, lineHeight: 1.2, marginBottom: '3px' }}>
              Authentic Chinese<br />takeaway, tonight.
            </h4>
            <p style={{ fontSize: '6px', color: 'rgba(250,248,242,0.68)' }}>Minimum delivery order £12.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{
              background: goldGrad, borderRadius: '20px', padding: '5px 11px',
              fontSize: '7px', fontWeight: 700, color: ink,
            }}>Start Order</div>
            <div style={{
              border: `1px solid rgba(250,248,242,0.35)`, borderRadius: '20px', padding: '5px 11px',
              fontSize: '7px', color: cream, textAlign: 'center',
            }}>📞 Call</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
//  PROJECT REGISTRY
// ══════════════════════════════════════════════════════════════════════════════
const projects: ProjectData[] = [
  {
    id: '01',
    title: 'Golden Valley Roofing',
    category: 'Website Design',
    year: '2024',
    url: 'https://goldenvalley.captured-creative.com',
    description: 'A premium roofing company serving Derbyshire and the wider Midlands — slate reroofs, leadwork, chimney restoration and emergency callouts. Warm amber and deep charcoal branding built around real craft and real photography, designed to convert enquiries into booked jobs.',
    services: ['Website Design', 'Brand Identity', 'SEO Copywriting', 'Photography Direction', 'Hosting & Maintenance'],
    Mockup: RoofingMockup,
  },
  {
    id: '02',
    title: 'Allcar Electronics',
    category: 'E-Commerce Platform',
    year: '2024',
    url: 'https://allcar-electronics.captured-creative.com',
    description: 'A specialist UK automotive electronics platform for Allcar Electronics — serving trade garages and vehicle owners since the 1990s. Full inventory management for 20,000+ ECU units, trade search with part-number filtering, ECU hire and repair booking, and a fully functional cart. Deep navy tech aesthetic with electric blue and cyan glow accents, PCB-grid texture, and gold heritage accents. Built with React, TanStack Router and Tailwind CSS v4.',
    services: ['Full-Stack Development', 'UI / UX Design', 'Inventory Management System', 'E-Commerce & Cart', 'SEO Copywriting', 'Hosting & Maintenance'],
    Mockup: AllcarMockup,
  },
  {
    id: '03',
    title: 'Lakeside Garden 湖泮楼',
    category: 'Online Ordering System',
    year: '2024',
    url: 'https://lakeside-garden.captured-creative.com',
    description: 'A fully-functional Chinese takeaway ordering system for Lakeside Garden 湖泮楼 in Alfreton. Bilingual English / 中文 interface, live basket, discount engine, collection or delivery checkout — built with React, TanStack Router, and Tailwind CSS.',
    services: ['Full-Stack Development', 'UI / UX Design', 'Bilingual System (EN/中文)', 'Online Ordering & Checkout', 'Hosting & Maintenance'],
    Mockup: LakesideMockup,
  },
]

// ══════════════════════════════════════════════════════════════════════════════
//  SECTION
// ══════════════════════════════════════════════════════════════════════════════
export default function FeaturedWork() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeProject, setActiveProject] = useState<number | null>(null)

  return (
    <section id="work" ref={ref} className="work-section">
      {/* Left: section info */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          padding: '52px 40px',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '420px',
        }}
      >
        <div>
          <div className="section-header">
            <span className="section-num">01</span>
            <div className="section-header-line" />
          </div>
          <h2 style={{
            fontSize: 'clamp(30px, 3.5vw, 44px)',
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            color: '#F5F5F5',
          }}>
            Featured<br />Work
          </h2>
        </div>

        <Link
          to="/work"
          className="label"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#A1A1A1', transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F5')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1A1')}
        >
          View All Projects <ArrowRight size={11} strokeWidth={1.5} />
        </Link>
      </motion.div>

      {/* Right: project panels */}
      <div className="work-panels">
        {projects.map(({ id, title, category, Mockup }, i) => (
          <motion.div
            className="work-panel"
            key={id}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: i * 0.12, ease: 'easeOut' }}
            whileHover="hover"
            onClick={() => setActiveProject(i)}
            style={{
              position: 'relative',
              borderLeft: i === 0 ? 'none' : '1px solid var(--border)',
              overflow: 'hidden',
              cursor: 'pointer',
              minHeight: '420px',
            }}
          >
            {/* Live mockup — fills panel, scrolls slowly */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              <Mockup />
            </div>

            {/* Top vignette — mockup emerges from darkness */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '72px',
              background: 'linear-gradient(to bottom, rgba(5,5,5,0.7) 0%, transparent 100%)',
              zIndex: 2,
              pointerEvents: 'none',
            }} />

            {/* Hover brightening */}
            <motion.div
              variants={{ hover: { opacity: 0.055 } }}
              initial={{ opacity: 0 }}
              style={{
                position: 'absolute', inset: 0,
                backgroundColor: '#F5F5F5',
                pointerEvents: 'none',
                zIndex: 3,
              }}
              transition={{ duration: 0.35 }}
            />

            {/* Label bar — floats over bottom gradient */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4,
            }}>
              {/* Gradient behind label */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(5,5,5,0.96) 0%, rgba(5,5,5,0.6) 60%, transparent 100%)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'relative',
                padding: '28px 22px 20px',
                display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px',
              }}>
                <div>
                  <p style={{
                    fontSize: '12px', fontWeight: 500, letterSpacing: '0.01em',
                    color: '#F0F0EE', marginBottom: '5px',
                  }}>{title}</p>
                  <p className="label" style={{ letterSpacing: '0.11em', color: '#A1A1A1' }}>{category}</p>
                </div>
                <motion.div
                  variants={{ hover: { x: 4 } }}
                  transition={{ duration: 0.25 }}
                  style={{ flexShrink: 0, paddingBottom: '2px' }}
                >
                  <ArrowRight size={13} strokeWidth={1.5} color="#A1A1A1" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeProject !== null && (
          <ProjectOverlay
            projects={projects}
            activeIndex={activeProject}
            onClose={() => setActiveProject(null)}
            onNavigate={setActiveProject}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
