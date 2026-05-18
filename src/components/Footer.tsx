export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '24px 40px',
        borderTop: '1px solid var(--border)',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      <span
        style={{
          fontSize: '11px',
          fontWeight: 400,
          letterSpacing: '0.38em',
          textTransform: 'uppercase',
          color: '#F5F5F5',
        }}
      >
        C A P T U R E D
      </span>
      <span className="label" style={{ color: '#A1A1A1' }}>
        © {year} Captured. All rights reserved.
      </span>
    </footer>
  )
}
