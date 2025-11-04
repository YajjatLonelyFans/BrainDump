import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../lib/axios'
import { ArrowLeft, Edit2, Trash2, Save, X, AlertCircle, CheckCircle } from 'lucide-react'

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

const NoteDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (message, type) => {
    setToast({ message, type })
  }

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
        setEditTitle(res.data.title)
        setEditContent(res.data.content)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching note:", error)
        showToast('Failed to load note', 'error')
        setLoading(false)
      }
    }
    fetchNote()
  }, [id])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditTitle(note.title)
    setEditContent(note.content)
  }

  const handleSave = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      showToast('Please fill in all fields', 'error')
      return
    }

    setSaving(true)
    try {
      await api.put(`/notes/${id}`, {
        title: editTitle.trim(),
        content: editContent.trim()
      })
      
      // Redirect immediately after successful API call
      navigate('/')
    } catch (error) {
      console.error("Error updating note:", error)
      setSaving(false)
      showToast('Failed to update note', 'error')
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await api.delete(`/notes/${id}`)
      
      // Redirect immediately after successful API call
      navigate('/')
    } catch (error) {
      console.error("Error deleting note:", error)
      setDeleting(false)
      showToast('Failed to delete note', 'error')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Note not found</h2>
          <Link to="/" className="text-emerald-500 hover:text-emerald-400">
            Go back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-slate-400 hover:text-emerald-500 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Home</span>
        </Link>

        <div className="bg-slate-800 rounded-xl shadow-2xl p-8 border border-slate-700">
          {isEditing ? (
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  disabled={saving}
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-2">
                  Content
                </label>
                <textarea
                  id="content"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows="12"
                  className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                  disabled={saving}
                />
              </div>

              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={handleCancelEdit}
                  disabled={saving}
                  className="px-6 py-3 text-slate-400 hover:text-white transition-colors font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/50"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between mb-6">
                <h1 className="text-3xl font-bold text-white flex-1">{note.title}</h1>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={handleEdit}
                    className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-all"
                    title="Edit note"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete note"
                  >
                    {deleting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-500"></div>
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>
              </div>

              {note.createdAt && (
                <div className="mt-8 pt-6 border-t border-slate-700">
                  <p className="text-sm text-slate-500">
                    Created: {new Date(note.createdAt).toLocaleString()}
                  </p>
                  {note.updatedAt && note.updatedAt !== note.createdAt && (
                    <p className="text-sm text-slate-500 mt-1">
                      Last updated: {new Date(note.updatedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default NoteDetail