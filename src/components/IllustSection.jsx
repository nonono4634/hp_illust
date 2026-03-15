import { useEffect, useRef } from 'react'
import styles from './IllustSection.module.css'

export default function IllustSection({ work, index, onZoom }) {
  const sectionRef = useRef(null)
  const imgRef     = useRef(null)
  const textRef    = useRef(null)
  const isLeft     = index % 2 === 0

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const tint = document.getElementById('bg-tint')
          if (tint) {
            tint.style.background = `radial-gradient(ellipse 80% 70% at ${isLeft ? '70%' : '30%'} 50%, ${work.color}14 0%, transparent 70%)`
          }
          imgRef.current?.classList.add(styles.visible)
          textRef.current?.classList.add(styles.visible)
        }
      },
      { threshold: 0.35 },
    )
    const el = sectionRef.current
    if (el) obs.observe(el)
    return () => obs.disconnect()
  }, [work.color, isLeft])

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id={`section-${index}`}
    >
      <div
        className={styles.sectionBg}
        style={{
          background: `radial-gradient(ellipse 100% 100% at ${isLeft ? '80%' : '20%'} 50%, ${work.color}0c 0%, transparent 65%)`,
        }}
      />

      <div className={styles.bgNum}>{String(index + 1).padStart(2, '0')}</div>

      <div className={`${styles.inner} ${isLeft ? styles.left : styles.right}`}>

        {/* IMAGE */}
        <div className={styles.imgCol}>
          <div className={styles.imgFrame}>
            <div
              className={styles.glow}
              style={{ background: `radial-gradient(ellipse at center, ${work.color}30 0%, transparent 70%)` }}
            />
            <div className={styles.ring1} style={{ borderColor: `${work.color}22` }} />
            <div className={styles.ring2} style={{ borderColor: `${work.color}18` }} />
            <img
              ref={imgRef}
              className={`${styles.img} ${isLeft ? styles.leftIn : styles.rightIn}`}
              src={work.file}
              alt={work.title}
              onClick={() => onZoom(work, index)}
            />
            <div className={styles.numBadge} style={{ background: work.grad }}>
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* TEXT */}
        <div ref={textRef} className={styles.textCol}>
          <div
            className={styles.cat}
            style={{ background: work.tagBg, color: work.tagFg, border: `1px solid ${work.tagFg}33` }}
          >
            ✦ {work.cat}
          </div>

          <h2
            className={styles.title}
            style={{
              background: work.grad,
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {work.title}
          </h2>

          <div className={styles.divider} style={{ background: work.grad }} />

          <p className={styles.desc}>{work.desc}</p>

          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>No.</div>
              <div className={styles.metaVal} style={{ color: work.color }}>
                #{String(index + 1).padStart(2, '0')}
              </div>
            </div>
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>Category</div>
              <div className={styles.metaVal}>{work.cat}</div>
            </div>
            <div className={styles.metaItem}>
              <div className={styles.metaLabel}>Year</div>
              <div className={styles.metaVal}>2025</div>
            </div>
          </div>

          <button
            className={styles.zoomBtn}
            style={{ background: work.grad, boxShadow: `0 8px 32px ${work.color}44` }}
            onClick={() => onZoom(work, index)}
          >
            🔍 拡大して見る
          </button>
        </div>
      </div>
    </section>
  )
}
