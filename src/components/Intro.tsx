import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const [flashOn, setFlashOn] = useState(false)
  const [darkFading, setDarkFading] = useState(false)
  const [gone, setGone] = useState(false)
  // Stable ref so the effect deps array stays empty (avoids double-fire in StrictMode)
  const cb = useRef(onComplete)
  cb.current = onComplete

  useEffect(() => {
    let cancelled = false

    const t1 = setTimeout(() => { if (!cancelled) setFlashOn(true) }, 180)
    const t2 = setTimeout(() => { if (!cancelled) setFlashOn(false) }, 370)
    const t3 = setTimeout(() => { if (!cancelled) setDarkFading(true) }, 760)
    const t4 = setTimeout(() => {
      if (!cancelled) { setGone(true); cb.current() }
    }, 1440)

    return () => {
      cancelled = true
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4)
    }
  }, []) // intentionally empty — effect runs once on mount

  // Only unmount after every overlay is already at opacity 0
  if (gone) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, pointerEvents: 'none' }}>
      {/* Dark base — covers the page, fades AFTER the flash is fully gone */}
      <motion.div
        style={{ position: 'absolute', inset: 0, backgroundColor: '#050505' }}
        animate={{ opacity: darkFading ? 0 : 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Single camera-exposure flash — sits above the dark layer */}
      <motion.div
        style={{ position: 'absolute', inset: 0, backgroundColor: '#F5F5F5' }}
        animate={{ opacity: flashOn ? 0.88 : 0 }}
        transition={{
          duration: flashOn ? 0.1 : 0.34,
          ease: flashOn ? 'easeOut' : [0.22, 1, 0.36, 1],
        }}
      />
    </div>
  )
}
