import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  {
    num: '01',
    title: 'Website Design',
    description: 'Custom websites built from scratch — no templates, no shortcuts. Every site is designed to match your brand, convert visitors, and perform at the highest level.',
    includes: [
      'Bespoke design & development',
      'Mobile-first, fully responsive',
      'Performance optimised',
      'SEO foundations',
      'Analytics setup',
      '30-day post-launch support',
    ],
  },
  {
    num: '02',
    title: 'Branding',
    description: 'Identity systems built to last. From logomark to full visual language — we create brands that feel considered, premium, and coherent across every touchpoint.',
    includes: [
      'Logo design & wordmark',
      'Colour system & typography',
      'Brand guidelines document',
      'Social media kit',
      'Business stationery',
    ],
  },
  {
    num: '03',
    title: 'Photography & Videography',
    description: 'Professional-grade visual content that elevates how your brand looks and feels. From product photography to brand films — we capture your work at its best.',
    includes: [
      'Brand & product photography',
      'Short-form video reels',
      'Commercial campaigns',
      'Social-ready formats & edits',
      'Colour grading & post-production',
    ],
  },
  {
    num: '04',
    title: 'Monthly Maintenance & Retainers',
    description: 'Ongoing care, updates, and continuous improvement. Your site stays fast, secure, and evolving — without you having to think about it.',
    includes: [
      'Monthly content updates & edits',
      'Hosting & uptime monitoring',
      'Security & performance checks',
      'Analytics reporting',
      'Priority support',
    ],
  },
]

function ServiceCard({
  service,
  isLast,
}: {
  service: (typeof services)[0]
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="service-card"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderBottom: isLast ? 'none' : '1px solid var(--border)',
      }}
    >
      <div>
        <span className="section-num">{service.num}</span>
      </div>

      <div>
        <h2 style={{
          fontSize: 'clamp(24px, 2.8vw, 40px)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: '#F5F5F5',
          lineHeight: 1.08,
          marginBottom: '20px',
        }}>
          {service.title}
        </h2>
        <p style={{
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: 1.8,
          color: '#A1A1A1',
          maxWidth: '400px',
        }}>
          {service.description}
        </p>
      </div>

      <div>
        <p className="label" style={{ color: '#A1A1A1', marginBottom: '18px' }}>
          What's included
        </p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '11px', listStyle: 'none' }}>
          {service.includes.map((item) => (
            <li
              key={item}
              style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '13px', color: '#F5F5F5', fontWeight: 400 }}
            >
              <span style={{ width: '16px', height: '1px', backgroundColor: 'rgba(161,161,161,0.5)', flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function ServicesPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLElement>(null)
  const isInView = useInView(headerRef, { once: true })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' })

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
            02 — Services
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="page-hero-title"
          >
            Services.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="label"
            style={{ color: '#A1A1A1', marginTop: '22px', maxWidth: '400px', lineHeight: 2 }}
          >
            Everything your brand needs to look sharper, feel more premium, and perform better online.
          </motion.p>
        </div>
      </div>

      <section style={{ borderTop: '1px solid var(--border)' }}>
        {services.map((service, i) => (
          <ServiceCard key={service.num} service={service} isLast={i === services.length - 1} />
        ))}
      </section>

      <section
        ref={ctaRef}
        style={{
          padding: '96px 40px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '40px',
        }}
        className="services-cta"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="label" style={{ color: '#A1A1A1', marginBottom: '12px' }}>Ready to get started?</p>
          <h2 style={{
            fontSize: 'clamp(28px, 3.5vw, 52px)',
            fontWeight: 600,
            letterSpacing: '-0.025em',
            color: '#F5F5F5',
            lineHeight: 1.05,
          }}>
            Let's talk about<br />your project.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={ctaInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 32px',
              border: '1px solid rgba(245,245,245,0.18)',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#F5F5F5',
              transition: 'border-color 0.3s, background-color 0.3s',
              whiteSpace: 'nowrap',
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
            Start a Project <ArrowRight size={11} strokeWidth={1.5} />
          </Link>
        </motion.div>
      </section>
    </>
  )
}
