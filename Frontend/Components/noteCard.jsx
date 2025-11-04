import { useNavigate } from 'react-router-dom'
import { ArrowRight, Trash2 } from 'lucide-react'

const NoteCard = ({ note, onDelete, deleting }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/note/${note._id}`)
  }

  const handleDelete = (e) => {
    
    onDelete(note._id)
    navigate("/")
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors flex-1">
          {note.title}
        </h3>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="ml-2 p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Delete note"
        >
          {deleting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      </div>
      
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