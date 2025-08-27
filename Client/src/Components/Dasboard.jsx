import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { useAuth } from '@clerk/clerk-react'
import Navbar from './Navbar'


const Dashboard = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pdfModalOpen, setPdfModalOpen] = useState(false)
  const [activePdfUrl, setActivePdfUrl] = useState('')
  const [activeTitle, setActiveTitle] = useState('')
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const { getToken } = useAuth()

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)

        const token = await getToken()
        const response = await fetch('https://library-3hxq.vercel.app/api/books/my-post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        setBooks(data)
        setError('')
      } catch (error) {
        console.error('Fetch error:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])


  const handleDelete = async (bookId) => {
    try {
      const token = await getToken()
      const response = await fetch(`https://library-3hxq.vercel.app/api/books/delete/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {

        console.error('Failed to delete book: ', response.statusText)
        alert('Failed to delete book')
        return
      }

      setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId))

    } catch (error) {
      console.error('Delete error:', error)
      alert('An error occurred during deletion')
    }
  }


  const openPdfModal = (pdfUrl, title) => {
    setActivePdfUrl(pdfUrl)
    setActiveTitle(title)
    setPdfModalOpen(true)
  }

  const closePdfModal = () => {
    setPdfModalOpen(false)
    setActivePdfUrl('')
    setActiveTitle('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Section */}
          <div className="text-center mt-20 mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Dashboard
              </span>
              <span className="ml-4">📖</span>
            </h1>

          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
              <span className="ml-4 text-xl text-gray-300">Loading your books...</span>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-semibold text-red-400 mb-2">Error Loading Books</h3>
              <p className="text-gray-400 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Books Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-2xl font-semibold text-gray-300 mb-2">No books found</h3>
                  <p className="text-gray-400">Start building your library by adding some books!</p>
                </div>
              ) : (
                books.map((book) => (
                  <div
                    key={book._id}
                    className="group relative bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 hover:-translate-y-2"
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500 pointer-events-none"></div>

                    <div className="relative">
                      {/* Cover Image */}
                      <div className="relative p-6 flex justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-2xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <img
                            src={book.coverImage}
                            alt={`Cover of ${book.title}`}
                            className="relative z-10 w-40 h-56 sm:w-48 sm:h-64 rounded-2xl shadow-2xl object-cover ring-2 ring-slate-700/50 group-hover:ring-purple-400/30 transition-all duration-500"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Book Details */}
                      <div className="p-6 pt-2">
                        {/* Title */}
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-500 line-clamp-2">
                          {book.title}
                        </h2>

                        {/* Category */}
                        {book.category && (
                          <span className="inline-block px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full mb-3">
                            {book.category}
                          </span>
                        )}

                        {/* Description */}
                        <p className="text-gray-300 mb-4 leading-relaxed text-sm line-clamp-3">
                          {book.content}
                        </p>

                        {/* Author */}
                        <div className="flex items-center  gap-2 mb-4 text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-purple-400 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5.121 17.804A9 9 0 1 1 18.879 6.196M15 11a3 3 0 1 0-6 0 3 3 0 0 0 6 0z"
                            />
                          </svg>
                          <span className="text-white text-sm font-medium">
                            {book.author?.firstName} {book.author?.lastName}
                          </span>
                        </div>

                        {/* Read Button */}
                        <button
                          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:from-purple-600 hover:to-blue-600 hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          onClick={() => openPdfModal(book.pdf, book.title)}
                        >
                          Read Now →
                        </button>
                        <button
                          className="w-full bg-red-600 mt-2 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:from-purple-600 hover:to-blue-600 hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          onClick={() => handleDelete(book._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* PDF Modal */}
      {pdfModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closePdfModal}
        >
          <div
            className="bg-slate-900 rounded-2xl shadow-2xl ring-2 ring-purple-500 max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-slate-700">
              <h3 className="text-xl font-bold text-white truncate">
                {activeTitle}
              </h3>
              <button
                onClick={closePdfModal}
                className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-pink-500 transition-colors duration-200 flex-shrink-0 ml-4"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-auto" style={{ height: '80vh' }}>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer fileUrl={activePdfUrl} plugins={[defaultLayoutPluginInstance]} />
              </Worker>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard