import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import UploadForm from './components/UploadForm'
import NotesList from './components/NotesList'
import './index.css'

function App() {
  const [refresh, setRefresh] = useState(0)

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />

      <main className="max-w-5xl mx-auto px-4 pb-16 space-y-6 -mt-8">
        <div className="grid md:grid-cols-2 gap-6">
          <UploadForm onCreated={() => setRefresh(r=>r+1)} />
          <div className="bg-white rounded-xl border p-5">
            <h3 className="font-semibold text-slate-800 mb-2">How it works</h3>
            <ol className="list-decimal pl-5 text-slate-600 space-y-1 text-sm">
              <li>Fill in the title and subject. Optionally add branch and semester.</li>
              <li>Paste your notes content or add a public file link (PDF, DOC, etc.).</li>
              <li>Click Upload. Your note appears in the list for everyone.</li>
            </ol>
          </div>
        </div>

        <NotesList refreshSignal={refresh} />
      </main>

      <footer className="text-center text-sm text-slate-500 py-10">© {new Date().getFullYear()} EngiNotes</footer>
    </div>
  )
}

export default App
