import { useEffect, useState } from 'react'
import { Search, FileText, ThumbsUp } from 'lucide-react'

export default function NotesList({ refreshSignal }) {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    setLoading(true)
    try {
      const url = new URL(`${baseUrl}/api/notes`)
      if (q) url.searchParams.set('q', q)
      const res = await fetch(url.toString())
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [refreshSignal])

  const like = async (id) => {
    await fetch(`${baseUrl}/api/notes/${id}/like`, { method: 'POST' })
    load()
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input className="input pl-9" placeholder="Search notes..." value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==='Enter'&&load()} />
        </div>
        <button onClick={load} className="px-3 py-2 bg-slate-800 text-white rounded-lg">Search</button>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-4">
          {items.map(n => (
            <li key={n.id} className="border rounded-lg p-4 hover:shadow-sm transition">
              <div className="flex items-start gap-3">
                <div className="mt-1"><FileText className="w-6 h-6 text-blue-600"/></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{n.title}</h3>
                  <p className="text-sm text-slate-600">{n.subject} {n.semester ? `• ${n.semester}` : ''} {n.branch ? `• ${n.branch}` : ''}</p>
                  {n.description && <p className="text-sm text-slate-600 mt-2 line-clamp-2">{n.description}</p>}
                  <div className="flex items-center gap-3 mt-3">
                    {n.file_url && <a className="text-blue-600 underline" href={n.file_url} target="_blank" rel="noreferrer">Open file</a>}
                    <button onClick={()=>like(n.id)} className="inline-flex items-center gap-1 text-slate-700 hover:text-blue-700"><ThumbsUp className="w-4 h-4"/> {n.likes || 0}</button>
                  </div>
                </div>
              </div>
            </li>
          ))}
          {items.length===0 && <p className="text-slate-500">No notes yet. Be the first to upload!</p>}
        </ul>
      )}
    </div>
  )
}
