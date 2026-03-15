import { useState, useCallback, useEffect } from 'react'
import { WORKS } from '../data/works'
import IllustSection from './IllustSection'
import Lightbox from './Lightbox'
import styles from './HomePage.module.css'

export default function HomePage() {
  const [lbIdx, setLbIdx] = useState(null)
  const [activeSection, setActiveSection] = useState(-1)

  const openZoom  = useCallback((_, i) => { setLbIdx(i); document.body.style.overflow = 'hidden' }, [])
  const closeZoom = useCallback(() => { setLbIdx(null); document.body.style.overflow = '' }, [])
  const prevZoom  = useCallback(() => setLbIdx((i) => (i - 1 + WORKS.length) % WORKS.length), [])
  const nextZoom  = useCallback(() => setLbIdx((i) => (i + 1) % WORKS.length), [])

  const scrollToSection = (i) =>
    document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = parseInt(e.target.id.replace('section-', ''))
            setActiveSection(id)
          }
        })
      },
      { threshold: 0.5 },
    )
    WORKS.forEach((_, i) => {
      const el = document.getElementById(`section-${i}`)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <div className={styles.page}>

      {/* INTRO */}
      <section className={styles.intro}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
        <div className={styles.grid} />
        <div className={styles.introContent}>
          <div className={styles.label}>✦ Illustration Portfolio</div>
          <h1 className={styles.mainTitle}>Gallery</h1>
          <p className={styles.sub}>
            スクロールして、すべての作品をご覧ください。<br />
            各イラストをクリックすると拡大表示されます。
          </p>
          <button className={styles.cta} onClick={() => scrollToSection(0)}>
            作品を見る ↓
          </button>
        </div>
        <div className={styles.scrollHint}>
          <div className={styles.mouse}><div className={styles.dot} /></div>
          <span>scroll</span>
        </div>
      </section>

      {/* ALL WORKS */}
      {WORKS.map((work, i) => (
        <IllustSection key={work.id} work={work} index={i} onZoom={openZoom} />
      ))}

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerLogo}>✦ Illustration Portfolio</div>
        <p className={styles.footerCopy}>© 2025 All Rights Reserved</p>
      </footer>

      {/* DOT NAV */}
      <div className={styles.dotNav}>
        {WORKS.map((w, i) => (
          <button
            key={i}
            className={`${styles.dot} ${activeSection === i ? styles.dotActive : ''}`}
            title={w.title}
            style={activeSection === i ? { background: w.color } : {}}
            onClick={() => scrollToSection(i)}
          />
        ))}
      </div>

      {/* LIGHTBOX */}
      {lbIdx !== null && (
        <Lightbox items={WORKS} idx={lbIdx} onClose={closeZoom} onPrev={prevZoom} onNext={nextZoom} />
      )}
    </div>
  )
}
