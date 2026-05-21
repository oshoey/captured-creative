import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="site-footer"
      style={{
        borderTop: '1px solid var(--border)',
        padding: '32px 40px',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      {/* Wordmark */}
      <Link
        to="/"
        style={{
          fontSize: '11px',
          fontWeight: 400,
          letterSpacing: '0.38em',
          textTransform: 'uppercase',
          color: '#F5F5F5',
          textDecoration: 'none',
          transition: 'opacity 0.25s',
          display: 'inline-block',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        C A P T U R E D
      </Link>

      {/* Centre: social links */}
      <div className="footer-links" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
        <a
          href="mailto:hello@captured-creative.com"
          className="label"
          style={{ color: 'rgba(161,161,161,0.55)', transition: 'color 0.22s', letterSpacing: '0.12em' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#A1A1A1')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(161,161,161,0.55)')}
        >
          hello@captured-creative.com
        </a>

        <span style={{ width: 1, height: 12, backgroundColor: 'var(--border)', display: 'inline-block', flexShrink: 0 }} />

        <a
          href="https://instagram.com/captured.creative"
          target="_blank"
          rel="noopener noreferrer"
          className="label"
          style={{ color: 'rgba(161,161,161,0.55)', transition: 'color 0.22s', letterSpacing: '0.12em' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#A1A1A1')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(161,161,161,0.55)')}
        >
          Instagram
        </a>
      </div>

      {/* Right: copyright */}
      <span
        className="label"
        style={{ color: 'rgba(161,161,161,0.42)', textAlign: 'right' }}
      >
        © {year} Captured. All rights reserved.
      </span>
    </footer>
  )
}
