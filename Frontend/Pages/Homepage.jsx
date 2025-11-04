import { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import RateLimit from '../Components/RateLimit'
import NoteCard from '../Components/noteCard'
import api from '../lib/axios'
import { FileText, AlertCircle, CheckCircle, X } from 'lucide-react'

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const styles = {
    error: 'bg-red-500/90',
    success: 'bg-emerald-500/90'
  }

  const Icon = type === 'error' ? AlertCircle : CheckCircle

  return (
    <div className={`fixed top-4 right-4 ${styles[type]} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3 backdrop-blur-sm z-50 animate-slide-in`}>
      <Icon className="w-5 h-5" />
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:bg-white/20 rounded p-1 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

const Homepage = () => {
  const [isRateLimit, setRateLimit] = useState(false) 
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes/")
        setNotes(res.data)
        setLoading(false)
        if (res.data.length > 0) {
          showToast('Notes loaded successfully', 'success')
        }
      } catch (error) {
        console.error("Error fetching notes:", error)
        if (error.response?.status === 429) {
          setRateLimit(true)
        }
        showToast('Failed to load notes', 'error')
        setLoading(false)
      }
    };
    fetchNotes()
  }, [])

  const handleDeleteNote = async (noteId) => {
    setDeletingId(noteId)
    
    try {
      await api.delete(`/notes/${noteId}`)
      
      // Remove note from state
      setNotes(prevNotes => prevNotes.filter(note => note._id !== noteId))
      setDeletingId(null)
      showToast('Note deleted successfully', 'success')
    } catch (error) {
      console.error("Error deleting note:", error)
      setDeletingId(null)
      showToast('Failed to delete note', 'error')
    }
  }

  if (isRateLimit) {
    return <RateLimit />
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <FileText className="w-16 h-16 text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold text-slate-400 mb-2">No notes yet</h3>
            <p className="text-slate-500">Create your first note to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard 
                key={note._id} 
                note={note} 
                onDelete={handleDeleteNote}
                deleting={deletingId === note._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Homepage