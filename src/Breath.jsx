import { useEffect, useRef, useState } from 'react'
const TIPS = {
  Inhala: 'Por la nariz, suave y sin ruido. Lleva el aire al abdomen: que se infle la panza, no el pecho.',
  Sostén: 'Aire quieto, hombros y mandíbula sueltos. Sin forzar: si incomoda, relaja y sigue.',
  Exhala: 'Por la boca, como apagando una vela despacio. Largo y parejo hasta vaciar sin esfuerzo.'
}
export default function Breath() {
  const [run, setRun] = useState(false)
  const [o, setO] = useState({ t: 'Listo', s: 1, d: 1 })
  const [n, setN] = useState(1)
  const T = useRef([])
  useEffect(() => {
    const clear = () => { T.current.forEach(clearTimeout); T.current = [] }
    if (!run) { clear(); setO({ t: 'Listo', s: 1, d: 1 }); setN(1); return }
    const q = (f, ms) => T.current.push(setTimeout(f, ms))
    const cyc = i => { setN(i); setO({ t: 'Inhala', s: 1.8, d: 4 }); q(() => { setO({ t: 'Sostén', s: 1.8, d: 0 }); q(() => { setO({ t: 'Exhala', s: 1, d: 8 }); q(() => (i < 4 ? cyc(i + 1) : setRun(false)), 8000) }, 7000) }, 4000) }
    cyc(1); return clear
  }, [run])
  return (
    <div className="card dk">
      <h3>Respira 4-7-8</h3>
      <div className="breath"><div id="orb" style={{ transform: `scale(${o.s})`, transitionDuration: `${o.d}s` }} aria-live="polite">{o.t}</div></div>
      {run ? (
        <div id="bt" style={{ margin: '0 0 14px', fontSize: '.95rem' }} aria-live="polite">
          <p style={{ margin: '0 0 6px' }}><b>Ciclo {n} de 4</b> · Ritmo, no fuerza: respira a un 80 % de tu capacidad.</p>
          <p style={{ margin: '0 0 6px' }}>{TIPS[o.t]}</p>
          <p style={{ margin: 0, opacity: .8 }}>Siéntate recto, apoya la lengua tras los dientes superiores. La exhalación dura el doble que la inhalación. Si te mareas, vuelve a respirar normal.</p>
        </div>
      ) : (
        <p id="bt" style={{ margin: '0 0 14px', fontSize: '.95rem' }}>Inhala 4 s, sostén 7 s, exhala 8 s.</p>
      )}
      <button className="btn" onClick={() => setRun(r => !r)}>{run ? 'Detener' : 'Probar ahora'}</button>
    </div>
  )
}