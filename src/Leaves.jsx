import { useEffect, useRef } from 'react'
export default function Leaves() {
  const cv = useRef(), gl = useRef(), pb = useRef()
  useEffect(() => {
    const c = cv.current, x = c.getContext('2d'), D = Math.min(devicePixelRatio || 1, 2)
    const still = matchMedia('(prefers-reduced-motion:reduce)').matches
    let W, H, P = [], mx = -999, my = -999, sy = scrollY, v = 0, raf, dead = false
    const rs = () => { W = innerWidth; H = innerHeight; c.width = W * D; c.height = H * D; x.setTransform(D, 0, 0, D, 0, 0) }
    const mk = init => { const t = Math.random(); return { x: Math.random() * W, y: init ? Math.random() * H : -40, z: .45 + Math.random() * .55, k: t < .5 ? 0 : t < .8 ? 1 : 2, r: Math.random() * 6.3, vr: (Math.random() - .5) * .012, ph: Math.random() * 6.3, s: 14 + Math.random() * 20 } }
    rs(); for (let i = 0; i < (W < 780 ? 20 : 46); i++) P.push(mk(true))
    const leaf = s => { x.beginPath(); x.moveTo(0, -s); x.bezierCurveTo(s * .5, -s * .4, s * .5, s * .4, 0, s); x.bezierCurveTo(-s * .5, s * .4, -s * .5, -s * .4, 0, -s); x.fill(); x.strokeStyle = 'rgba(70,99,74,.45)'; x.lineWidth = 1; x.beginPath(); x.moveTo(0, -s * .9); x.lineTo(0, s * .9); x.stroke() }
    const flower = s => { x.fillStyle = 'rgba(255,252,246,.9)'; for (let i = 0; i < 9; i++) { x.rotate(.698); x.beginPath(); x.ellipse(0, -s * .55, s * .2, s * .45, 0, 0, 6.3); x.fill() } x.fillStyle = 'rgba(214,170,60,.95)'; x.beginPath(); x.arc(0, 0, s * .26, 0, 6.3); x.fill() }
    const draw = () => {
      if (dead) return
      x.clearRect(0, 0, W, H); v += ((scrollY - sy) - v) * .15; sy = scrollY
      P.forEach(p => {
        if (!still) {
          p.ph += .012; p.x += Math.sin(p.ph) * .5 * p.z; p.y += (.35 + p.z * .5) - v * p.z * .5; p.r += p.vr
          const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy)
          if (d < 150 && d > 1) { p.x += dx / d * (150 - d) * .06; p.y += dy / d * (150 - d) * .06; p.r += .05 }
        }
        if (p.y > H + 50) { p.y = -40; p.x = Math.random() * W } if (p.y < -60) p.y = H + 40; if (p.x < -50) p.x = W + 40; if (p.x > W + 50) p.x = -40
        x.save(); x.translate(p.x, p.y); x.rotate(p.r); x.globalAlpha = .45 + p.z * .5; const s = p.s * p.z
        if (p.k === 0) { x.fillStyle = 'rgb(120,160,108)'; leaf(s) } else if (p.k === 1) flower(s * .8); else { x.fillStyle = 'rgb(176,128,182)'; x.beginPath(); x.ellipse(0, 0, s * .28, s * .6, 0, 0, 6.3); x.fill() }
        x.restore()
      })
      raf = requestAnimationFrame(draw)
    }
    const move = e => { mx = e.clientX; my = e.clientY; if (gl.current) { gl.current.style.left = mx + 'px'; gl.current.style.top = my + 'px' } }
    const scroll = () => { const m = document.documentElement.scrollHeight - innerHeight, f = m > 0 ? scrollY / m : 0; if (pb.current) pb.current.style.width = f * 100 + '%'; document.querySelector('.bgfx')?.style.setProperty('--f', f.toFixed(3)) }
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden) draw() }
    addEventListener('resize', rs); addEventListener('pointermove', move, { passive: true }); addEventListener('scroll', scroll, { passive: true }); document.addEventListener('visibilitychange', vis)
    draw()
    return () => { dead = true; cancelAnimationFrame(raf); removeEventListener('resize', rs); removeEventListener('pointermove', move); removeEventListener('scroll', scroll); document.removeEventListener('visibilitychange', vis) }
  }, [])
  return (<><canvas id="bgc" ref={cv} aria-hidden="true" /><div className="glow" ref={gl} /><div className="pb" ref={pb} /></>)
}
