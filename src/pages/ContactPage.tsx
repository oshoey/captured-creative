import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, AtSign, MessageCircle, ArrowRight } from 'lucide-react'

const contactLinks = [
  {
    icon: <Mail size={14} strokeWidth={1.5} />,
    label: 'hello@captured-creative.com',
    href: 'mailto:hello@captured-creative.com',
  },
  {
    icon: <AtSign size={14} strokeWidth={1.5} />,
    label: '@captured.creative',
    href: 'https://instagram.com/captured.creative',
  },
  {
    icon: <MessageCircle size={14} strokeWidth={1.5} />,
    label: 'WhatsApp Us',
    href: 'https://wa.me/',
  },
]

const projectTypes = [
  'Website Design',
  'Branding',
  'Photography / Video',
  'Monthly Retainer',
  'Something else',
]

export default function ContactPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLElement>(null)
  const isInView = useInView(headerRef, { once: true })
  const contentInView = useInView(contentRef, { once: true, margin: '-60px' })

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Enquiry from ${form.name}${form.company ? ` — ${form.company}` : ''}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}${form.company ? `\nCompany: ${form.company}` : ''}\nProject Type: ${form.projectType}\n\n${form.message}`
    )
    window.location.href = `mailto:hello@captured-creative.com?subject=${subject}&body=${body}`
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(245,245,245,0.15)',
    color: '#F5F5F5',
    fontFamily: 'inherit',
    fontSize: '15px',
    fontWeight: 400,
    padding: '14px 0',
    outline: 'none',
    transition: 'border-color 0.25s ease',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '10px',
    fontWeight: 400,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: '#A1A1A1',
  }

  return (
    <>
      <div ref={headerRef} className="page-hero">
        <div className="page-hero-inner">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="label"
            style={{ display: 'block', marginBottom: '24px', color: '#A1A1A1' }}
          >
            04 — Contact
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="page-hero-title"
          >
            Contact.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="label"
            style={{ color: '#A1A1A1', marginTop: '22px', maxWidth: '360px', lineHeight: 2 }}
          >
            Tell us about your project. We'll get back to you within 24 hours.
          </motion.p>
        </div>
      </div>

      <section ref={contentRef} className="contact-page-grid">
        {/* Left: info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            color: '#F5F5F5',
            marginBottom: '48px',
          }}>
            Let's Build<br />Something<br />Memorable.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {contactLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '14px',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#A1A1A1',
                  transition: 'color 0.25s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F5')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1A1')}
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '36px 28px' }} className="contact-form-row">
            <div>
              <label style={labelStyle}>Name *</label>
              <input
                required
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(245,245,245,0.4)')}
                onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(245,245,245,0.15)')}
              />
            </div>

            <div>
              <label style={labelStyle}>Email *</label>
              <input
                required
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(245,245,245,0.4)')}
                onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(245,245,245,0.15)')}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Company / Brand</label>
            <input
              type="text"
              placeholder="Optional"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(245,245,245,0.4)')}
              onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(245,245,245,0.15)')}
            />
          </div>

          <div>
            <label style={labelStyle}>Project Type</label>
            <select
              value={form.projectType}
              onChange={(e) => setForm({ ...form, projectType: e.target.value })}
              style={{
                ...inputStyle,
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23A1A1A1' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 4px center',
                paddingRight: '24px',
              }}
              onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(245,245,245,0.4)')}
              onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(245,245,245,0.15)')}
            >
              <option value="" style={{ background: '#111111' }}>Select a service</option>
              {projectTypes.map((t) => (
                <option key={t} value={t} style={{ background: '#111111' }}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Message *</label>
            <textarea
              required
              placeholder="Tell us about your project — what you're building, what you need, and any relevant details."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              style={{
                ...inputStyle,
                resize: 'vertical',
                minHeight: '140px',
                lineHeight: 1.7,
              }}
              onFocus={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(245,245,245,0.4)')}
              onBlur={(e) => (e.currentTarget.style.borderBottomColor = 'rgba(245,245,245,0.15)')}
            />
          </div>

          <div>
            <button
              type="submit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 32px',
                border: '1px solid rgba(245,245,245,0.18)',
                background: 'none',
                fontSize: '11px',
                fontWeight: 400,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#F5F5F5',
                fontFamily: 'inherit',
                cursor: 'pointer',
                transition: 'border-color 0.3s, background-color 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(245,245,245,0.38)'
                e.currentTarget.style.backgroundColor = 'rgba(245,245,245,0.04)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(245,245,245,0.18)'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              Send Message <ArrowRight size={11} strokeWidth={1.5} />
            </button>
          </div>
        </motion.form>
      </section>
    </>
  )
}
