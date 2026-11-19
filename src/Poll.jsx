import { useEffect, useRef, useState } from 'react'
import { Leaf, Zap, Moon, Check } from 'lucide-react'
const API = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
const OPTS = [{ id: 'tranquila', label: 'Tranquila', Icon: Leaf }, { id: 'ritmo', label: 'Con mucho ritmo', Icon: Zap }, { id: 'pausa', label: 'Necesito una pausa ya', Icon: Moon }]
const ls = { get: k => { try { return localStorage.getItem(k) } catch { return null } }, set: (k, v) => { try { localStorage.setItem(k, v) } catch { /* sin almacenamiento */ } } }
const newId = () => (crypto.randomUUID ? crypto.randomUUID() : 'v' + Math.random().toString(36).slice(2) + Date.now().toString(36))
const mine = v => ({ counts: Object.fromEntries(OPTS.map(o => [o.id, o.id === v ? 1 : 0])), total: v ? 1 : 0, myVote: v })

export default function Poll() {
  const vid = useRef(ls.get('rset_vid') || (() => { const v = newId(); ls.set('rset_vid', v); return v })())
  const [d, setD] = useState(null)
  const [off, setOff] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    fetch(`${API}/api/poll?voterId=${vid.current}`).then(r => r.ok ? r.json() : Promise.reject()).then(setD)
      .catch(() => { setOff(true); setD(mine(ls.get('rset_local'))) })
  }, [])

  async function vote(option) {
    if (busy || d?.myVote === option) return
    setBusy(true)
    try {
      if (off) throw new Error('offline')
      const r = await fetch(`${API}/api/poll`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ voterId: vid.current, option }) })
      if (!r.ok) throw new Error('bad')
      setD(await r.json())
    } catch { ls.set('rset_local', option); setOff(true); setD(mine(option)) }
    setBusy(false)
  }

  const voted = !!d?.myVote
  const pct = id => (d && d.total ? Math.round((d.counts[id] / d.total) * 100) : 0)
  return (
    <div className="card">
      <h3>Encuesta rápida</h3>
      <p style={{ margin: '0 0 14px', fontWeight: 700 }}>¿Cómo está tu semana?</p>
      {OPTS.map(({ id, label, Icon }) => (
        <button key={id} className="opt" aria-pressed={d?.myVote === id} disabled={!d || busy} onClick={() => vote(id)}>
          <i style={{ width: voted ? pct(id) + '%' : 0 }} />
          <span><Icon size={18} />{label}{voted && <b>{d.myVote === id && <Check size={15} style={{ verticalAlign: -2, marginRight: 6 }} />}{pct(id)}%</b>}</span>
        </button>
      ))}
      <small style={{ color: 'var(--muted)', display: 'block' }}>
        {voted ? `${d.total} ${d.total === 1 ? 'voto' : 'votos'} de la comunidad. Puedes cambiar el tuyo.` : 'Toca una opción para ver cómo votó la comunidad.'}
        {off && ' (Sin conexión con el servidor: tu voto se guarda solo en este dispositivo.)'}
      </small>
    </div>
  )
}
