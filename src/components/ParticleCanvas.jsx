import { useEffect } from 'react'

const COLORS = ['#FF6B9D', '#FFD93D', '#B69BFF', '#6EC6FF', '#5ECFCF', '#FF8C69']

export default function ParticleCanvas() {
  useEffect(() => {
    const canvas = document.getElementById('bg-canvas')
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, pts, raf

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    const mkPt = () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 2 + 0.4,
      a: Math.random() * 0.4 + 0.06,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    })

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 110) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(182,155,255,${0.1 * (1 - d / 110)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      pts.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.a
        ctx.fill()
      })

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    resize()
    pts = Array.from({ length: 70 }, mkPt)
    draw()

    const onResize = () => {
      resize()
      pts = Array.from({ length: 70 }, mkPt)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas id="bg-canvas" />
}
