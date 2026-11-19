import { useEffect, useRef, useState } from 'react'
import { Instagram, ChevronLeft, ChevronRight, Wind, Headphones, Share2, Target, Eye, Leaf, Flower2, Sparkles } from 'lucide-react'
import { LINKS, HERBS } from './data.js'
import { Spotify, TikTok } from './Icons.jsx'
import Breath from './Breath.jsx'
import Poll from './Poll.jsx'
import Leaves from './Leaves.jsx'
import Fx from './Fx.jsx'
import logo from './assets/logo.png'
import logoLight from './assets/logo-light.png'
import leaf from './assets/leaf.png'
import front from './assets/bottle-front.jpg'
import back from './assets/bottle-back.jpg'
import detail from './assets/bottle-detail.jpg'
import top from './assets/bottle-top.jpg'
import hLuisa from './assets/herb-luisa.jpg'
import hVal from './assets/herb-valeriana.jpg'
import hMan from './assets/herb-manzanilla.jpg'

const HIMG = { luisa: hLuisa, valeriana: hVal, manzanilla: hMan }
const VIEWS = [{ src: front, alt: 'Botella de R-set, frente' }, { src: back, alt: 'Botella de R-set, etiqueta posterior' }, { src: detail, alt: 'Detalle de la ilustración botánica' }, { src: top, alt: 'Botella de R-set vista desde arriba' }]
const SLIDES = [
  { k: 'R-set', h: 'h1', t: 'Tu pausa, tu ritmo', p: 'Bebida funcional con hierbas tradicionales, ideal para un descanso sin culpa.', a: '#hierbas', b: 'Conoce las hierbas', c: ['#46634A', '#6F8D6B'], i: 0 },
  { k: 'Tu ritual', h: 'h2', t: 'Desbloquea tu ritual de calma', p: 'Ya escaneaste tu botella: entra a la música, la comunidad y el contenido que acompañan tu pausa.', a: '#ritual', b: 'Entrar a mi ritual', c: ['#7A6633', '#A38C52'], i: 1 },
  { k: 'Comunidad', h: 'h2', t: 'Ese amigo que te recuerda descansar', p: 'Únete al canal de difusión de Instagram: respiración 4-7-8 y encuestas rápidas.', a: '#comunidad', b: 'Únete', c: ['#46634A', '#6F8D6B'], i: 2 }
]
const VALS = [['#C3D2BD', 'Calma'], ['#DEC3DA', 'Naturalidad'], ['#FFF8F3', 'Empatía'], ['#EBD9A0', 'Responsabilidad'], ['#C3D2BD', 'Perseverancia']]

const Spin = ({ id, text }) => (
  <svg className="spin" viewBox="0 0 120 120" aria-hidden="true">
    <defs><path id={id} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
    <circle cx="60" cy="60" r="27" fill="#BCA571" />
    {[0, 72, 144, 216, 288].map(a => <ellipse key={a} cx="60" cy="52" rx="4" ry="6" fill="#2E2918" transform={`rotate(${a} 60 60)`} />)}
    <text><textPath href={'#' + id} textLength="270" lengthAdjust="spacing">{text}</textPath></text>
  </svg>
)

function Stat({ n, s = '', c, label, fixed }) {
  const ref = useRef(), [v, setV] = useState(fixed ? null : 0)
  useEffect(() => {
    if (fixed) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect(); const t0 = performance.now()
      const f = t => { const p = Math.min((t - t0) / 1400, 1); setV(Math.round(n * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(f) }
      requestAnimationFrame(f)
    }, { threshold: .5 })
    io.observe(ref.current); return () => io.disconnect()
  }, [n, fixed])
  return <div className="st" style={{ '--c': c }}><b ref={ref}>{fixed || v + s}</b><span>{label}</span></div>
}

function Social({ href, icon, title, sub, off }) {
  return off
    ? <a className="lk off" aria-disabled="true" onClick={e => e.preventDefault()}><i>{icon}</i><span>{title}<small>{sub}</small></span><em>Próximamente</em></a>
    : <a className="lk" href={href} target="_blank" rel="noopener noreferrer"><i>{icon}</i><span>{title}<small>{sub}</small></span></a>
}

export default function App() {
  const [herb, setHerb] = useState('lui')
  const [view, setView] = useState(0)
  const car = useRef(), paused = useRef(false)
  const H = HERBS[herb]

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) return
    let i = 0
    const id = setInterval(() => {
      const c = car.current; if (!c || paused.current || document.hidden) return
      const sl = c.querySelectorAll('.sl'); i = (i + 1) % sl.length
      c.scrollTo({ left: i ? sl[i].offsetLeft - sl[0].offsetLeft : 0, behavior: 'smooth' })
    }, 5500)
    return () => clearInterval(id)
  }, [])
  const move = d => { const c = car.current; c.scrollBy({ left: d * (c.querySelector('.sl').offsetWidth + 24), behavior: 'smooth' }) }
  const tiktokOff = !LINKS.tiktok

  return (
    <>
      <div className="bgfx" aria-hidden="true"><i /><i /><i /></div>
      <nav><div className="wrap"><b><img className="logo" src={logo} alt="R-set" /></b>
        <div className="menu"><a href="#ritual">Ritual</a><a href="#hierbas">Ingredientes</a><a href="#botella">Botella</a><a href="#nosotros">Nosotros</a><a href="#comunidad">Comunidad</a><a className="btn cta" href="#ritual">Desbloquea tu calma</a></div></div></nav>

      <header className="hz">
        <div className="car" ref={car} aria-label="Destacados" onPointerEnter={() => (paused.current = true)} onPointerLeave={() => (paused.current = false)} onTouchStart={() => (paused.current = true)} onTouchEnd={() => (paused.current = false)}>
          {SLIDES.map((s, n) => {
            const Tag = s.h
            return (
              <article className="sl" key={n} style={{ '--c1': s.c[0], '--c2': s.c[1], '--p': '#C3D2BD' }}>
                <div className="tx"><small>{s.k}</small><Tag>{s.t}</Tag><p>{s.p}</p><a className="pill" href={s.a}>{s.b}</a></div>
                <div className="ph"><Spin id={'cp' + n} text="TU PAUSA · TU RITMO · R-SET · " /><img src={VIEWS[s.i].src} alt="" /></div>
              </article>
            )
          })}
        </div>
        <div className="wrap ars"><button className="ar" onClick={() => move(-1)} aria-label="Anterior"><ChevronLeft size={22} /></button><button className="ar" onClick={() => move(1)} aria-label="Siguiente"><ChevronRight size={22} /></button></div>
      </header>

      <section className="stats"><div className="wrap sg">
        <Stat n={400} c="#C3D2BD" label="ml de calma" /><Stat n={3} c="#DEC3DA" label="hierbas tradicionales" />
        <Stat n={100} s="%" c="#EBD9A0" label="vegano y sin gas" /><Stat fixed="4-7-8" c="#BCA571" label="tu respiración" />
      </div></section>

      <section id="ritual" className="rit"><div className="wrap">
        <img className="leaf2" src={leaf} alt="" aria-hidden="true" />
        <div className="ritg">
          <div className="rtx"><span className="kick"><Sparkles size={15} /> Escaneaste tu botella</span><h2>Tu ritual de calma empieza aquí</h2>
            <p className="lead">Música para bajar el ritmo, una comunidad que te recuerda descansar y contenido para tu pausa. Todo a un toque.</p>
            <div className="steps"><div><b><Wind size={17} /></b>Respira</div><div><b><Headphones size={17} /></b>Escucha</div><div><b><Share2 size={17} /></b>Comparte</div></div></div>
          <div className="phone"><div className="av">R</div><b>@rset_official</b><p>Tu centro de calma</p>
            <Social href={LINKS.instagram} icon={<Instagram size={20} />} title="Únete a la comunidad" sub="Instagram · @rset_official" />
            <Social href={LINKS.spotify} icon={<Spotify size={20} />} title="R-set Sounds" sub="Spotify · Playlist para tu pausa" />
            <Social href={LINKS.tiktok} off={tiktokOff} icon={<TikTok size={20} />} title="TikTok" sub="Contenido divertido y educativo" /></div>
        </div></div></section>

      <section id="hierbas" style={{ '--hc': H.c }}><div className="wrap">
        <h2>Ingredientes</h2><p className="lead">Agua, infusión de hierba luisa, manzanilla, raíz de valeriana y hojas de stevia. Toca una hierba para conocerla.</p>
        <div className="hb"><div className="tabs" role="tablist" aria-label="Hierbas de R-set">
          {Object.entries(HERBS).map(([k, h]) => <button key={k} className="tab" role="tab" data-h={k} aria-selected={herb === k} onClick={() => setHerb(k)}><strong>{h.t}</strong><small>{h.s}</small></button>)}</div>
          <div className="panel" role="tabpanel" aria-live="polite" style={{ background: H.c }}>
            <div className="hi"><img src={HIMG[H.img]} alt={H.t} /></div>
            <div><h3>{H.t}</h3><ul>{H.l.map(x => <li key={x}>{x}</li>)}</ul><p>Usos tradicionales; no es un medicamento.</p></div></div></div>
      </div></section>

      <section className="gal" id="botella"><div className="wrap"><div className="gl">
        <div className="gm"><img src={VIEWS[view].src} alt={VIEWS[view].alt} /></div>
        <div><h2>Una botella que da gusto tener a la vista</h2><p className="lead">Ilustraciones botánicas, un tono ámbar cálido y la tapa dorada de la marca. Mírala desde todos los ángulos.</p>
          <div className="ch2"><span>400 ml</span><span>Sin gas</span><span>Vegano</span></div>
          <div className="th" role="group" aria-label="Vistas de la botella">{VIEWS.map((v, i) => <button key={i} aria-pressed={view === i} aria-label={v.alt} onClick={() => setView(i)}><img src={v.src} alt="" /></button>)}</div></div>
      </div></div></section>

      <section id="nosotros" className="about"><div className="wrap">
        <Spin id="cp9" text="CALMA · NATURALIDAD · EMPATÍA · " /><span className="kick k2"><Leaf size={15} /> Quiénes somos</span><h2>Nosotros</h2>
        <div className="nsg">
          <article className="nc nc1"><i className="num">01</i><span className="ic"><Target size={24} color="#EBD38E" /></span><h3>Misión</h3><p>Ofrecer una bebida natural lista para tomar, elaborada con hierbas tradicionales, que invite a las personas a hacer una pausa consciente y reiniciar en medio de su ritmo ajetreado.</p></article>
          <article className="nc nc2"><i className="num">02</i><span className="ic"><Eye size={24} color="#EBD38E" /></span><h3>Visión</h3><p>Ser la marca de referencia en bienestar cotidiano para jóvenes profesionales, haciendo de la pausa un hábito natural y accesible en su día a día.</p></article></div>
        <div className="vl">{VALS.map(([c, t], i) => <span key={t} style={{ '--c': c, '--d': -i * .8 + 's' }}>{i % 2 ? <Flower2 size={18} /> : <Leaf size={18} />}{t}</span>)}</div>
      </div></section>

      <section id="comunidad" className="com"><div className="wrap">
        <span className="kick"><Instagram size={15} /> Canal de difusión</span><h2>Ese amigo que te recuerda descansar</h2><p className="lead">Mensajes empáticos y cercanos en el canal de difusión de Instagram.</p>
        <div className="cols"><Breath /><Poll /></div>
      </div></section>

      <footer><div className="wrap"><div className="fg"><div><img className="logoL" src={logoLight} alt="R-set" /></div>
        <div><a href={LINKS.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={18} />Instagram</a><a href={LINKS.spotify} target="_blank" rel="noopener noreferrer"><Spotify size={18} />Spotify</a>
          {tiktokOff ? <a aria-disabled="true" style={{ opacity: .6 }} onClick={e => e.preventDefault()}><TikTok size={18} />TikTok · Próximamente</a> : <a href={LINKS.tiktok} target="_blank" rel="noopener noreferrer"><TikTok size={18} />TikTok</a>}</div></div>
        <small>© 2026 R-set. Infusión tradicional de hierbas; no es un medicamento ni sustituye la consulta con un profesional de la salud.</small></div></footer>

      <div className="dock"><a href="#ritual"><Sparkles size={16} />Mi ritual</a><a href="#comunidad"><Wind size={16} />Respira 4-7-8</a></div>
      <Leaves /><Fx />
    </>
  )
}
