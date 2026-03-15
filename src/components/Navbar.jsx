import styles from './Navbar.module.css'

export default function Navbar({ page, setPage }) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={() => setPage('home')}>
        ✦ Portfolio
      </div>
      <div className={styles.links}>
        <button
          className={`${styles.btn} ${page === 'home' ? styles.active : ''}`}
          onClick={() => setPage('home')}
        >
          <span>Home</span>
        </button>
        <button
          className={`${styles.btn} ${page === 'gallery' ? styles.active : ''}`}
          onClick={() => setPage('gallery')}
        >
          <span>Gallery</span>
        </button>
      </div>
    </nav>
  )
}
