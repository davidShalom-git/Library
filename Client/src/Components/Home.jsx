import React, { useEffect, useRef, useState } from 'react'
import { useScroll, motion, useTransform } from 'framer-motion'

import Read from '../assets/Read.png'
import Learn from '../assets/Knowledge.png'
import Share from '../assets/Share.jpg'
import Navbar from './Navbar'

const Home = () => {
  const [text, setText] = useState('')
  const fullText = 'Book Vault'
  const timeoutRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  useEffect(() => {
    let currentIndex = 0;
    const typeEffect = () => {
      if (currentIndex < fullText.length) {
        setText(fullText.substring(0, currentIndex + 1))
        currentIndex++;
        timeoutRef.current = setTimeout(typeEffect, 120);
      }
      else {
        timeoutRef.current = setTimeout(() => {
          setText('');
          currentIndex = 0;
          typeEffect()
        }, 2500)
      }
    }
    typeEffect();
    return () => clearTimeout(timeoutRef.current);
  }, [])

  const Marquee = ({ children, speed = 20 }) => {
    return (
      <div className="relative overflow-hidden w-full">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: [0, '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: speed,
            repeatType: 'loop'
          }}
          style={{ display: 'flex' }}
        >
          <div className="flex items-center shrink-0">
            {children}
          </div>
          <div className="flex items-center shrink-0">
            {children}
          </div>
        </motion.div>
      </div>
    )
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        delay: i * 0.2,
        ease: "easeOut"
      }
    })
  }

  const hoverVariants = {
    hover: { 
      scale: 1.05,
      rotateY: 5,
      boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
      transition: { duration: 0.3 }
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white relative overflow-hidden">
        <Navbar />

        {/* Enhanced background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {/* Animated grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_40%,transparent_100%)]"></div>
          
          {/* Floating orbs with enhanced animations */}
          <motion.div 
            className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-500/25 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500/25 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
        </div>

        {/* Main hero content */}
        <motion.div
          style={{ y }}
          className="relative z-10 flex flex-col justify-center items-center px-4 pt-32 pb-16 text-center min-h-screen"
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
                {text}
              </span>
              <motion.span
                className="inline-block w-1 h-16 sm:h-20 bg-gradient-to-b from-purple-400 to-pink-400 ml-2 rounded-full"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 font-light leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <span className="block text-gray-200 mb-2">Discover, Share, and Explore the World of Literature</span>
              <span className="block text-lg text-purple-300">Join thousands of readers and writers sharing their passion</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(139, 92, 246, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                Start Reading
              </motion.button>
              <motion.button
                className="px-8 py-4 border border-purple-400 text-purple-300 font-semibold rounded-full hover:bg-purple-400/10 transition-all duration-300"
                whileHover={{ scale: 1.05, borderColor: "rgb(196 181 253)" }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced feature cards section */}
        <div className="relative z-10 px-4 pb-20">
          <motion.div
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Discover What Makes Us Special
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                { img: Read, title: "Read Anywhere", desc: "Access your favorite books on any device, anytime", color: "purple" },
                { img: Share, title: "Share Stories", desc: "Connect with fellow book lovers and share recommendations", color: "pink" },
                { img: Learn, title: "Share Knowledge", desc: "Learn from others and contribute your own insights", color: "blue" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  variants={cardVariants}
                  className="group relative"
                  viewport={{ once: true }}
                >
                  <motion.div
                    variants={hoverVariants}
                    className={`relative p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 hover:border-${item.color}-400/50 transition-all duration-300`}
                    style={{
                      background: `linear-gradient(135deg, rgba(51, 65, 85, 0.5) 0%, rgba(30, 41, 59, 0.5) 100%)`,
                    }}
                  >
                    {/* Card glow effect */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${item.color}-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    <motion.div
                      className="relative z-10 flex flex-col items-center text-center"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="mb-6 p-4 rounded-full bg-slate-700/50 backdrop-blur-sm"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <img src={item.img} className="w-24 h-24 object-cover rounded-lg" alt={item.title} />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Marquee section */}
        <motion.div
          className="relative z-10 py-20 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/20 to-transparent"></div>
          <Marquee speed={25}>
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-400 mx-8 inline-flex items-center whitespace-nowrap">
              📚 Read
            </span>
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-pink-400 mx-8 inline-flex items-center whitespace-nowrap">
              ✍️ Write
            </span>
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-400 mx-8 inline-flex items-center whitespace-nowrap">
              🌍 Share
            </span>
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-400 mx-8 inline-flex items-center whitespace-nowrap">
              💡 Discover
            </span>
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-orange-400 mx-8 inline-flex items-center whitespace-nowrap">
              🤝 Connect
            </span>
          </Marquee>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="relative z-10 py-20 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Join Our Growing Community
            </motion.h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "50K+", label: "Active Readers", icon: "👥" },
                { number: "25K+", label: "Books Shared", icon: "📖" },
                { number: "100K+", label: "Reviews Written", icon: "⭐" },
                { number: "15K+", label: "Authors", icon: "✍️" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-white/10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(139, 92, 246, 0.5)" }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Books Section */}
        <motion.div
          className="relative z-10 py-20 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Featured Books This Month
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { title: "The Silent Echo", author: "Emma Watson", genre: "Mystery", rating: 4.8, color: "purple" },
                { title: "Digital Dreams", author: "Alex Chen", genre: "Sci-Fi", rating: 4.9, color: "blue" },
                { title: "Hearts Entwined", author: "Sofia Rodriguez", genre: "Romance", rating: 4.7, color: "pink" },
                { title: "The Last Stand", author: "Michael Brooks", genre: "Adventure", rating: 4.6, color: "emerald" }
              ].map((book, index) => (
                <motion.div
                  key={index}
                  className="group relative bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  viewport={{ once: true }}
                >
                  <div className={`w-full h-48 bg-gradient-to-br from-${book.color}-500 to-${book.color}-700 rounded-lg mb-4 flex items-center justify-center text-white text-6xl`}>
                    📚
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-gray-400 mb-2">by {book.author}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">
                      {book.genre}
                    </span>
                    <div className="flex items-center text-yellow-400">
                      ⭐ {book.rating}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="px-8 py-3 border border-purple-400 text-purple-300 font-semibold rounded-full hover:bg-purple-400/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Books
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          className="relative z-10 py-20 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-16 text-white"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              What Our Readers Say
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Book Blogger",
                  text: "Book Vault has completely transformed how I discover new books. The community is amazing!",
                  avatar: "👩‍💼"
                },
                {
                  name: "David Kumar",
                  role: "Author",
                  text: "As an author, this platform has helped me connect with readers worldwide. Incredible experience!",
                  avatar: "👨‍💻"
                },
                {
                  name: "Lisa Chen",
                  role: "Student",
                  text: "The reading recommendations are spot-on. I've found so many great books through this community.",
                  avatar: "👩‍🎓"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02, borderColor: "rgba(139, 92, 246, 0.3)" }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center mb-4">
                    <div className="text-4xl mr-4">{testimonial.avatar}</div>
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-purple-300 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.text}"</p>
                  <div className="flex text-yellow-400 mt-4">
                    {"⭐".repeat(5)}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

          <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 py-20 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="text-6xl mb-8 text-yellow-400">💫</div>
            <blockquote className="text-2xl md:text-3xl font-light text-gray-200 italic mb-8 leading-relaxed">
             "A book is not just ink on paper — it's a bridge between minds, built one word at a time."
            </blockquote>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full"></div>
          </motion.div>
        </div>
      </motion.section>

        {/* Footer */}
        <footer className="relative z-10 bg-slate-900/50 backdrop-blur-sm border-t border-white/10 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  Book Vault
                </h3>
                <p className="text-gray-400 mb-6 max-w-md">
                  Your ultimate destination for discovering, sharing, and discussing books with a passionate community of readers and writers.
                </p>
                <div className="flex space-x-4">
                  {["📘", "🐦", "📷", "💼"].map((icon, index) => (
                    <motion.div
                      key={index}
                      className="w-12 h-12 bg-slate-800/50 backdrop-blur-sm rounded-full flex items-center justify-center text-xl cursor-pointer hover:bg-purple-600/50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {icon}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                <ul className="space-y-3 text-gray-400">
                  {["Browse Books", "Top Rated", "New Releases", "Categories", "Authors"].map((link, index) => (
                    <li key={index}>
                      <a href="#" className="hover:text-purple-400 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-6">Community</h4>
                <ul className="space-y-3 text-gray-400">
                  {["Book Clubs", "Discussions", "Reviews", "Reading Lists", "Author Events"].map((link, index) => (
                    <li key={index}>
                      <a href="#" className="hover:text-purple-400 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © {new Date().getFullYear()} Book Vault. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home