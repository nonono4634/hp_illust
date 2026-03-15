import { useState, useMemo } from 'react'
import { WORKS, CATS } from '../data/works'
import Lightbox from './Lightbox'
import styles from './GalleryPage.module.css'

function GalleryCard({ item, index, onClick }) {
  return (
    <div
      className={styles.card}
      style={{ animationDelay: `${index * 0.06}s` }}
      onClick={() => onClick(index)}
    >
      <div className={styles.bar} style={{ background: item.grad }} />
      <div className={styles.imgWrap}>
        <img className={styles.img} src={item.file} alt={item.title} loading="lazy" />
      </div>
      <div className={styles.overlay}>
        <div className={styles.overlayIn}>
          <div className={styles.overlayTitle}>{item.title}</div>
          <div className={styles.overlayHint}>🔍 クリックして拡大</div>
        </div>
      </div>
      <div className={styles.foot}>
        <div className={styles.footRow}>
          <span className={styles.name}>{item.title}</span>
          <span className={styles.tag} style={{ background: item.tagBg, color: item.tagFg }}>
            {item.cat}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const [filter, setFilter] = useState('すべて')
  const [lbIdx,  setLbIdx ] = useState(null)

  const filtered = useMemo(
    () => (filter === 'すべて' ? WORKS : WORKS.filter((w) => w.cat === filter)),
    [filter],
  )

  const open  = (i) => { setLbIdx(i); document.body.style.overflow = 'hidden' }
  const close = ()  => { setLbIdx(null); document.body.style.overflow = '' }
  const prev  = ()  => setLbIdx((i) => (i - 1 + filtered.length) % filtered.length)
  const next  = ()  => setLbIdx((i) => (i + 1) % filtered.length)

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Gallery</h1>
        <p className={styles.heroSub}>全{WORKS.length}作品 — カテゴリでフィルタリング</p>
      </div>

      <div className={styles.filterBar}>
        <div className={styles.filterInner}>
          {CATS.map((c) => (
            <button
              key={c}
              className={`${styles.filterBtn} ${filter === c ? styles.active : ''}`}
              onClick={() => setFilter(c)}
            >
              <span>{c}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.gridWrap}>
        <div className={styles.grid}>
          {filtered.map((item, i) => (
            <GalleryCard key={item.id} item={item} index={i} onClick={open} />
          ))}
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerLogo}>✦ Illustration Portfolio</div>
        <p className={styles.footerCopy}>© 2025 All Rights Reserved</p>
      </footer>

      {lbIdx !== null && (
        <Lightbox items={filtered} idx={lbIdx} onClose={close} onPrev={prev} onNext={next} />
      )}
    </div>
  )
}
