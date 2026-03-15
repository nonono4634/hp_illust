import { useEffect } from 'react'
import styles from './Lightbox.module.css'

export default function Lightbox({ items, idx, onClose, onPrev, onNext }) {
  const item = items[idx]

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape')     onClose()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.box}>
        <button className={styles.close} onClick={onClose}>✕</button>
        <button className={`${styles.nav} ${styles.prev}`} onClick={onPrev}>‹</button>
        <button className={`${styles.nav} ${styles.next}`} onClick={onNext}>›</button>

        <div className={styles.imgWrap}>
          <img key={item.id} className={styles.img} src={item.file} alt={item.title} />
        </div>

        <div className={styles.footer}>
          <div>
            <div className={styles.title}>{item.title}</div>
            <span
              className={styles.tag}
              style={{ background: item.tagBg, color: item.tagFg }}
            >
              {item.cat}
            </span>
          </div>
          <div className={styles.count}>{idx + 1} / {items.length}</div>
        </div>
      </div>
    </div>
  )
}
