import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Read from '../assets/Read.png'
import Learn from '../assets/Knowledge.png'
import Share from '../assets/Share.jpg'
import sample1 from '../assets/sample1.pdf'
import sample2 from '../assets/sample2.pdf'
import sample3 from '../assets/sample3.pdf'

// react-pdf viewer
import { Worker, Viewer } from '@react-pdf-viewer/core'
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation'
import { zoomPlugin } from '@react-pdf-viewer/zoom'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/page-navigation/lib/styles/index.css'
import '@react-pdf-viewer/zoom/lib/styles/index.css'
import Navbar from '../Components/Navbar'

const Science = () => {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [pdfModalOpen, setPdfModalOpen] = useState(false)
  const [activePdf, setActivePdf] = useState(null)
  const [activeTitle, setActiveTitle] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const bookItems = [
    {
      id: 1,
      title: 'The Art of Reading',
      description: 'Discover the profound joy and transformative power of immersive reading experiences that open new worlds.',
      image: Read,
      category: 'Literature',
      rating: 4.8,
      pages: 324,
      pdf: sample1
    },
    {
      id: 2,
      title: 'Knowledge Unleashed',
      description: 'Unlock the secrets of learning and expand your intellectual horizons beyond the boundaries of possibility.',
      image: Learn,
      category: 'Education',
      rating: 4.9,
      pages: 286,
      pdf: sample2
    },
    {
      id: 3,
      title: 'Share & Connect',
      description: 'Build meaningful connections through the beautiful art of sharing knowledge, stories, and wisdom.',
      image: Share,
      category: 'Social',
      rating: 4.7,
      pages: 298,
      pdf: sample3
    },
    {
      id: 4,
      title: 'Share & Connect',
      description: 'Build meaningful connections through the beautiful art of sharing knowledge, stories, and wisdom.',
      image: Share,
      category: 'Social',
      rating: 4.7,
      pages: 298,
      pdf: sample3
    },
    {
      id: 5,
      title: 'Share & Connect',
      description: 'Build meaningful connections through the beautiful art of sharing knowledge, stories, and wisdom.',
      image: Share,
      category: 'Social',
      rating: 4.7,
      pages: 298,
      pdf: sample3
    },
    {
      id: 6,
      title: 'Share & Connect',
      description: 'Build meaningful connections through the beautiful art of sharing knowledge, stories, and wisdom.',
      image: Share,
      category: 'Social',
      rating: 4.7,
      pages: 298,
      pdf: sample3
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  }
  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateY: -15 },
    visible: { opacity: 1, y: 0, rotateY: 0, transition: { type: "spring", stiffness: 100, damping: 12, duration: 0.8 } }
  }
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  }

  // Page navigation plugin
  const pageNavigationPluginInstance = pageNavigationPlugin()
  const { jumpToPage } = pageNavigationPluginInstance

  // Zoom plugin
  const zoomPluginInstance = zoomPlugin()
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex + 1)
    return true
  }

  const openPdfModal = (pdf, title) => {
    setActivePdf(pdf)
    setActiveTitle(title)
    setPdfModalOpen(true)
    setCurrentPage(1)
  }

  const closePdfModal = () => {
    setPdfModalOpen(false)
    setActivePdf(null)
    setActiveTitle('')
    setCurrentPage(1)
  }

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1)
    jumpToPage(currentPage) // 0-based index
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      jumpToPage(currentPage - 2) // 0-based index
    }
  }

  const goToPage = (pageNum) => {
    if (pageNum >= 1) {
      setCurrentPage(pageNum)
      jumpToPage(pageNum - 1) // 0-based index
    }
  }

  const handleDownload = async (pdfUrl, title) => {
    try {
      const response = await fetch(pdfUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${title}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading PDF:', error)
      alert('Failed to download PDF. Please try again.')
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white relative overflow-hidden">
        <Navbar />

        {/* background animations */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_40%,transparent_100%)]"></div>
        <motion.div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/20 rounded-full blur-3xl" animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute top-1/3 -right-40 w-96 h-96 bg-gradient-to-l from-blue-500/25 to-cyan-500/20 rounded-full blur-3xl" animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 0.9, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        <motion.div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-pink-500/20 to-purple-500/15 rounded-full blur-3xl" animate={{ x: [0, 25, 0], y: [0, -25, 0], scale: [1, 1.2, 1] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10"></div>

        {/* header */}
        <div className="relative z-10 mt-32 container mx-auto px-4 py-8">
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 1.2, type: "spring", stiffness: 100 }} className="text-center">
            <motion.h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6"
              initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}>
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">Enjoy Reading</span>
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="inline-block ml-4">📖</motion.span>
            </motion.h1>
            <motion.p className='text-center italic text-xl md:text-2xl text-gray-300 mb-4'
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}>
              Where Knowledge Is Born and Dreams Take Flight
              <motion.span animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="inline-block ml-2">🌟</motion.span>
            </motion.p>
            <motion.div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"
              initial={{ width: 0 }} animate={{ width: 96 }} transition={{ delay: 0.8, duration: 1 }} />
          </motion.div>
        </div>

        {/* book grid */}
        <motion.div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible">
          {bookItems.map((item, index) => (
            <motion.div key={item.id}
              className="group relative"
              variants={cardVariants}
              onHoverStart={() => setHoveredCard(item.id)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 20 } }}>
              {/* card */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
              <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50 group-hover:border-slate-600/50 transition-all duration-500">
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>
                  <motion.div className="relative p-8 flex justify-center"
                    whileHover={{ scale: 1.05, rotateY: 5, transition: { type: "spring", stiffness: 300, damping: 20 } }}>
                    <div className="relative">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="relative z-10 w-48 h-48 lg:w-56 lg:h-56 rounded-2xl shadow-2xl object-cover ring-2 ring-slate-700/50 group-hover:ring-purple-400/30 transition-all duration-500"
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }}
                      />
                    </div>
                  </motion.div>
                </div>
                <div className="p-8 pt-4">
                  <motion.h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{item.title}</motion.h2>
                  <motion.p className="text-gray-300 text-lg mb-6 leading-relaxed">{item.description}</motion.p>
                  <motion.div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                    <span>📄 {item.pages} pages</span>
                    <span>⏱️ ~{Math.floor(item.pages / 3)} min read</span>
                  </motion.div>
                  <motion.button
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:from-purple-600 hover:to-blue-600"
                    onClick={() => openPdfModal(item.pdf, item.title)}>
                    Start Reading →
                  </motion.button>
                  <motion.button
                    onClick={() => handleDownload(item.pdf, item.title)}
                    className="mt-2 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:from-purple-600 hover:to-blue-600"
                  >
                    Download Book ⬇️
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* PDF Modal */}
        {pdfModalOpen && (
          <motion.div
            key="pdf-modal"
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
          >
            <div className="relative bg-slate-900 rounded-2xl shadow-2xl ring-2 ring-purple-500 max-w-6xl w-full mx-auto flex flex-col border border-purple-500 max-h-[95vh]">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">{activeTitle}</h3>
                </div>
                <button
                  onClick={closePdfModal}
                  className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl hover:bg-pink-500 transition"
                  aria-label="Close PDF"
                >
                  ×
                </button>
              </div>

              {/* Custom Controls */}
              <div className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center gap-3">
                  <ZoomOutButton />
                  <ZoomPopover />
                  <ZoomInButton />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={currentPage}
                      onChange={(e) => goToPage(parseInt(e.target.value))}
                      className="w-16 px-2 py-1 bg-slate-700 text-white rounded text-center"
                    />
                  </div>

                  <button
                    onClick={goToNextPage}
                    className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600"
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* PDF Viewer */}
              <div className="flex-1 overflow-auto bg-slate-800" style={{ height: '70vh' }}>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                  <Viewer
                    fileUrl={activePdf}
                    plugins={[pageNavigationPluginInstance, zoomPluginInstance]}
                    onPageChange={(e) => setCurrentPage(e.currentPage + 1)}
                  />
                </Worker>
              </div>
            </div>
          </motion.div>
        )}



      </div>
    </>
  )
}

export default Science
