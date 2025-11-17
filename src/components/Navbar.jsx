import { Menu } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600 text-white font-bold">EN</span>
          <span className="text-xl font-semibold text-slate-800">EngiNotes</span>
        </div>
        <button className="p-2 rounded-md hover:bg-slate-100 active:scale-95 transition">
          <Menu className="w-5 h-5 text-slate-700" />
        </button>
      </div>
    </header>
  )
}
