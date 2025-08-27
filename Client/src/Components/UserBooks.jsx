import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'



const UserBooks = () => {
  const [books, setBooks] = useState([])
  const [pdfModalOpen, setPdfModalOpen] = useState(false)
  const [activePdfUrl, setActivePdfUrl] = useState('')
  const [activeTitle, setActiveTitle] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')


  const filteredBooks = books.filter(book => {
    const matchCategory = categoryFilter === 'All' || book.category === categoryFilter
    const searchTermLower = searchTerm.toLowerCase()
    const matchSearch =
      book.title.toLowerCase().includes(searchTermLower) ||
      book.content.toLowerCase().includes(searchTermLower)
    return matchCategory && matchSearch
  })

  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3200/api/books/all')
        if (!response.ok) {
       
          return
        }
        const data = await response.json()
        setBooks(data)
      
      } catch (error) {
        console.log('Fetch error:', error)
      }
    }
    fetchBooks()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateY: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.8
      }
    }
  }

  // Open PDF modal and set URL & title
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
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white relative overflow-hidden">
        <Navbar />

        <div className="relative z-10 mt-32 container mx-auto px-4 py-8 text-center">
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-black mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
              Enjoy Reading
            </span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="inline-block ml-4"
            >
              📖
            </motion.span>
          </motion.h1>
          <motion.p
            className='text-center italic text-xl md:text-2xl text-gray-300 mb-4'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Where Knowledge Is Born and Dreams Take Flight
            <motion.span
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block ml-2"
            >
              🌟
            </motion.span>
          </motion.p>
        </div>

        <div className="flex justify-center p-4 space-x-2 rounded-xl border border-white/20 shadow-md bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-pink-500 hover:via-purple-700 hover:to-blue-700 transition-colors duration-500 cursor-pointer max-w-xs mx-auto">
          <button className="text-white text-lg sm:text-xl font-semibold uppercase tracking-wide px-6 py-2 rounded-lg bg-black/40 backdrop-blur-sm shadow-md hover:bg-black/60 hover:scale-105 transform transition-transform duration-300">
            <Link to='/upload' className="select-none">
              Upload
            </Link>
          </button>
          <button className="text-white  text-lg sm:text-xl font-semibold uppercase tracking-wide px-6 py-2 rounded-lg bg-black/40 backdrop-blur-sm shadow-md hover:bg-black/60 hover:scale-105 transform transition-transform duration-300">
            <Link to='/dashboard' className="select-none">
              Dasboard
            </Link>
          </button>
        </div>

        <div className="flex mt-20 flex-wrap justify-center gap-6 mb-8 px-4 max-w-3xl mx-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-600 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          >
            <option value="All">All Categories</option>
            <option value="Literature">Literature</option>
            <option value="Education">Education</option>
            <option value="Social">Social</option>
          </select>

          <input
            type="text"
            placeholder="Search by title or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow min-w-[220px] px-4 py-2 rounded-lg bg-slate-800 text-white border border-slate-600 shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        {/* Book grid */}
        <motion.div
          className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredBooks.map((item, index) => (
            <motion.div
              key={item._id}
              className="group relative"
              variants={cardVariants}
             
              whileHover={{
                y: -10,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50 group-hover:border-slate-600/50 transition-all duration-500">
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>
                  <motion.div
                    className="relative p-8 flex justify-center"
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-2xl blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <motion.img
                        src={item.coverImage}
                        alt={item.title}
                        className="relative z-10 w-48 h-48 lg:w-56 lg:h-56 rounded-2xl shadow-2xl object-cover ring-2 ring-slate-700/50 group-hover:ring-purple-400/30 transition-all duration-500"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }}
                      />
                    </div>
                  </motion.div>
                </div>
                <div className="p-8 pt-4">
                  <motion.h2
                    className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.6 }}
                  >
                    {item.title}
                  </motion.h2>
                  <motion.p
                    className="text-gray-300 mb-4 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 + 0.7 }}
                  >
                    {item.content}
                  </motion.p>

                  {/* Author info with user icon */}
                  <div className="flex items-center gap-2 mb-6 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1 1 18.879 6.196M15 11a3 3 0 1 0-6 0 3 3 0 0 0 6 0z" />
                    </svg>
                    <span className="text-white select-text">
                      {item.author?.firstName} {item.author?.lastName}
                    </span>
                  </div>

                  <motion.button
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:from-purple-600 hover:to-blue-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openPdfModal(item.pdf, item.title)}
                  >
                    Read Now →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* PDF Modal */}
        {pdfModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closePdfModal}
            aria-modal="true"
            role="dialog"
          >
            <div
              className="bg-slate-900 rounded-2xl shadow-2xl ring-2 ring-purple-500 max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden"
              onClick={e => e.stopPropagation()} // prevent modal close on content click
            >
              {/* Modal header */}
              <div className="flex justify-between items-center p-4 border-b border-slate-700">
                <h3 className="text-xl font-bold text-white">{activeTitle}</h3>
                <button
                  onClick={closePdfModal}
                  className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-pink-500 transition"
                  aria-label="Close PDF viewer"
                >
                  ×
                </button>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 overflow-auto" style={{ height: '80vh' }}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={activePdfUrl}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default UserBooks
