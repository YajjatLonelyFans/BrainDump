import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../lib/axios"
import { ArrowLeft, Save, FileText, AlertCircle, CheckCircle, X } from "lucide-react"

const Toast = ({ message, type, onClose }) => {
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

const CreatePage = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()

  const showToast = (message, type) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      showToast('Please fill in all fields', 'error')
      return
    }

    setLoading(true)
    try {
      await api.post("/notes/", {
        title: title.trim(),
        content: content.trim()
      })
      showToast('Note created successfully', 'success')
      setTimeout(() => {
        navigate('/')
      }, 1000)
    } catch (error) {
      console.error("Error creating note:", error)
      showToast('Failed to create note', 'error')
      setLoading(false)
    }
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

        <div className="bg-slate-800 rounded-xl shadow-2xl p-8">
          <div className="flex items-center space-x-3 mb-8">
            <FileText className="w-8 h-8 text-emerald-500" />
            <h1 className="text-3xl font-bold text-white">Create New Note</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-slate-400"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note here..."
                rows="12"
                className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder-slate-400 resize-none"
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-end space-x-4">
              <Link
                to="/"
                className="px-6 py-3 text-slate-400 hover:text-white transition-colors font-medium"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/50"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Create Note</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
