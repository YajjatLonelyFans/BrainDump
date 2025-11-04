import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const NoteCard = ({ note }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/note/${note._id}`)
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group">
      <h3 className="text-lg font-semibold text-slate-100 mb-3 group-hover:text-emerald-400 transition-colors">
        {note.title}
      </h3>
      <p className="text-slate-400 line-clamp-3 leading-relaxed mb-4">
        {note.content}
      </p>
      <button 
        onClick={handleClick}
        className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-500 transition-all duration-200 group-hover:shadow-lg"
      >
        <span>View Note</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}

export default NoteCard