import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Mail, AtSign, MessageCircle } from 'lucide-react'

const contactLinks = [
  {
    icon: <Mail size={12} strokeWidth={1.5} />,
    label: 'hello@captured-creative.com',
    href: 'mailto:hello@captured-creative.com',
  },
  {
    icon: <AtSign size={12} strokeWidth={1.5} />,
    label: '@captured.creative',
    href: 'https://instagram.com/captured.creative',
  },
  {
    icon: <MessageCircle size={12} strokeWidth={1.5} />,
    label: 'WhatsApp Us',
    href: 'https://wa.me/',
  },
]

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="contact"
      className="bottom-grid-section contact-section"
      ref={ref}
      style={{
        padding: '52px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '400px',
      }}
    >
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="section-num">05</span>
          <div className="section-header-line" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(22px, 2.6vw, 36px)',
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            color: '#F5F5F5',
            marginBottom: '18px',
          }}
        >
          Let's Build<br />Something<br />Memorable.
        </motion.h2>

        <motion.a
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          href="mailto:hello@captured-creative.com"
          className="label"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            color: '#A1A1A1',
            transition: 'color 0.2s',
            marginBottom: '36px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F5')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1A1')}
        >
          Tell Us About Your Project <ArrowRight size={11} strokeWidth={1.5} />
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.32 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
        >
          {contactLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.01em',
                color: '#A1A1A1',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F5')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1A1')}
            >
              {item.icon}
              {item.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
