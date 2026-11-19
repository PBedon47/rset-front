import { useEffect, useRef, useState } from 'react'
export default function Breath() {
  const [run, setRun] = useState(false)
  const [o, setO] = useState({ t: 'Listo', s: 1, d: 1 })
  const T = useRef([])
  useEffect(() => {
    const clear = () => { T.current.forEach(clearTimeout); T.current = [] }
    if (!run) { clear(); setO({ t: 'Listo', s: 1, d: 1 }); return }
    const q = (f, ms) => T.current.push(setTimeout(f, ms))
    const cyc = () => { setO({ t: 'Inhala', s: 1.8, d: 4 }); q(() => { setO({ t: 'Sostén', s: 1.8, d: 0 }); q(() => { setO({ t: 'Exhala', s: 1, d: 8 }); q(cyc, 8000) }, 7000) }, 4000) }
    cyc(); return clear
  }, [run])
  return (
    <div className="card dk">
      <h3>Respira 4-7-8</h3>
      <div className="breath"><div id="orb" style={{ transform: `scale(${o.s})`, transitionDuration: `${o.d}s` }} aria-live="polite">{o.t}</div></div>
      <p id="bt" style={{ margin: '0 0 14px', fontSize: '.95rem' }}>{run ? 'Inhala 4 s, sostén 7 s, exhala 8 s.' : 'En cierres de mes y exámenes finales enviamos audios cortos como este.'}</p>
      <button className="btn" onClick={() => setRun(r => !r)}>{run ? 'Detener' : 'Probar ahora'}</button>
    </div>
  )
}
