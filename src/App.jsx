import { useState, useEffect } from 'react'
import ParticleCanvas from './components/ParticleCanvas'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import GalleryPage from './components/GalleryPage'

export default function App() {
  const [page, setPage] = useState('home')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // reset bg tint on page change
    const tint = document.getElementById('bg-tint')
    if (tint) tint.style.background = ''
  }, [page])

  return (
    <>
      <canvas id="bg-canvas" />
      <div id="bg-tint" />
      <ParticleCanvas />
      <Navbar page={page} setPage={setPage} />
      {page === 'home'
        ? <HomePage key="home" />
        : <GalleryPage key="gallery" />
      }
    </>
  )
}
