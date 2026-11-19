import { useEffect } from 'react'
// Efectos de DOM: aparición al hacer scroll, inclinación 3D y pétalos al hacer clic
export default function Fx() {
  useEffect(() => {
    const still = matchMedia('(prefers-reduced-motion:reduce)').matches
    const els = [...document.querySelectorAll('section .wrap>*,.mo>div')]
    els.forEach(e => e.classList.add('rv'))
    const io = new IntersectionObserver(a => a.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target) } }), { threshold: .12 })
    els.forEach(e => io.observe(e))
    const offs = []
    if (matchMedia('(hover:hover)').matches && !still) {
      document.querySelectorAll('.card,.nc,.sl .ph,.gm').forEach(e => {
        e.classList.add('tilt')
        const mv = ev => { const r = e.getBoundingClientRect(), a = (ev.clientX - r.left) / r.width - .5, b = (ev.clientY - r.top) / r.height - .5; e.style.transform = `perspective(800px) rotateY(${a * 10}deg) rotateX(${-b * 10}deg) scale(1.02)` }
        const lv = () => { e.style.transform = '' }
        e.addEventListener('pointermove', mv); e.addEventListener('pointerleave', lv); offs.push(() => { e.removeEventListener('pointermove', mv); e.removeEventListener('pointerleave', lv) })
      })
    }
    const burst = e => {
      if (still) return
      const C = ['#BCA571', '#B080B6', '#78A06C', '#D6AA3C']
      for (let i = 0; i < 12; i++) {
        const p = document.createElement('span'); p.className = 'bst'
        p.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="4" ry="10" fill="${C[i % 4]}" transform="rotate(${i * 30} 12 12)"/></svg>`
        p.style.left = e.clientX + 'px'; p.style.top = e.clientY + 'px'; document.body.appendChild(p)
        const a = Math.random() * 6.283, d = 60 + Math.random() * 90
        p.animate([{ transform: 'translate(-50%,-50%) scale(.3)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * d}px),calc(-50% + ${Math.sin(a) * d}px)) rotate(260deg) scale(1.3)`, opacity: 0 }], { duration: 900, easing: 'cubic-bezier(.2,.7,.2,1)' }).onfinish = () => p.remove()
      }
    }
    document.addEventListener('click', burst)
    return () => { io.disconnect(); offs.forEach(f => f()); document.removeEventListener('click', burst) }
  }, [])
  return null
}
