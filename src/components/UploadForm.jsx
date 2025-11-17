import { useState } from 'react'
import { Upload } from 'lucide-react'

export default function UploadForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [branch, setBranch] = useState('')
  const [semester, setSemester] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          subject,
          branch: branch || undefined,
          semester: semester || undefined,
          description: description || undefined,
          content: content || undefined,
          file_url: fileUrl || undefined,
          tags: [],
        }),
      })
      if (!res.ok) throw new Error('Failed to create note')
      const data = await res.json()
      onCreated?.(data)
      setTitle(''); setSubject(''); setBranch(''); setSemester(''); setDescription(''); setContent(''); setFileUrl('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          <input className="input" placeholder="Title*" value={title} onChange={e=>setTitle(e.target.value)} required />
          <input className="input" placeholder="Subject*" value={subject} onChange={e=>setSubject(e.target.value)} required />
          <input className="input" placeholder="Branch (CSE/ECE/ME/CE)" value={branch} onChange={e=>setBranch(e.target.value)} />
          <input className="input" placeholder="Semester (e.g., 3rd)" value={semester} onChange={e=>setSemester(e.target.value)} />
        </div>
        <textarea className="input min-h-[80px]" placeholder="Short description" value={description} onChange={e=>setDescription(e.target.value)} />
        <textarea className="input min-h-[120px]" placeholder="Paste notes text/markdown (optional)" value={content} onChange={e=>setContent(e.target.value)} />
        <input className="input" placeholder="Public file URL (PDF, DOC, etc.)" value={fileUrl} onChange={e=>setFileUrl(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button disabled={loading} className="w-full md:w-auto inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg disabled:opacity-60">
          <Upload className="w-4 h-4" /> {loading ? 'Uploading...' : 'Upload Note'}
        </button>
      </form>
    </div>
  )
}
