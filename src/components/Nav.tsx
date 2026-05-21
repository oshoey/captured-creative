import { useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Film', href: '#film' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#philosophy' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1])

  const navLinkStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 400,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#A1A1A1',
    transition: 'color 0.25s ease',
  }

  return (
    <>
      <motion.nav
        className="site-nav"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 'var(--nav-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
        }}
      >
        {/* Scroll-triggered background */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#050505',
            opacity: bgOpacity,
            borderBottom: '1px solid',
            borderColor: `rgba(245,245,245,${borderOpacity})`,
          }}
        />

        {/* Wordmark */}
        <a
          href="#"
          style={{
            position: 'relative',
            zIndex: 1,
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: '#F5F5F5',
          }}
        >
          C A P T U R E D
        </a>

        {/* Desktop nav */}
        <div
          className="desktop-nav-links"
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
          }}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={navLinkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F5')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1A1')}
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
              color: '#A1A1A1',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F5')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1A1')}
          >
            <Menu size={15} strokeWidth={1.5} />
          </button>
        </div>

        {/* Mobile hamburger only */}
        <button
          className="mobile-menu-btn"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'none',
            alignItems: 'center',
            padding: '4px',
            color: '#A1A1A1',
          }}
        >
          <Menu size={15} strokeWidth={1.5} />
        </button>
      </motion.nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9000,
              backgroundColor: '#050505',
              display: 'flex',
              flexDirection: 'column',
              padding: '0 40px 48px',
            }}
          >
            <div
              style={{
                height: 'var(--nav-height)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.38em',
                  textTransform: 'uppercase',
                  color: '#F5F5F5',
                }}
              >
                C A P T U R E D
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                style={{ color: '#A1A1A1', display: 'flex', alignItems: 'center' }}
              >
                <X size={16} strokeWidth={1.5} />
              </button>
            </div>

            <nav
              style={{
                marginTop: '72px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setOpen(false)}
                  style={{
                    fontSize: 'clamp(36px, 8vw, 56px)',
                    fontWeight: 500,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    color: '#F5F5F5',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#A1A1A1')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#F5F5F5')}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div
              style={{
                marginTop: 'auto',
                display: 'flex',
                gap: '32px',
              }}
            >
              <a href="mailto:hello@captured-creative.com" className="label">Email</a>
              <a href="https://instagram.com" className="label">Instagram</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
