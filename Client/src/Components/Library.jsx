import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'



const Library = () => {
    const departments = [
        {
            title: 'Entertainment',
            link: '/ent',
            path: 'Explore',
            icon: '🎭',
            description: 'Discover captivating stories, movies, and multimedia content',
            color: 'from-pink-500 to-rose-500',
            bgGlow: 'group-hover:shadow-pink-500/20'
        },
        {
            title: 'Business',
            link: '/business',
            path: 'Navigate',
            icon: '💼',
            description: 'Master entrepreneurship, finance, and strategic thinking',
            color: 'from-emerald-500 to-teal-500',
            bgGlow: 'group-hover:shadow-emerald-500/20'
        },
        {
            title: 'Health',
            link: '/health',
            path: 'Wellness',
            icon: '🏥',
            description: 'Explore medical knowledge, fitness, and well-being resources',
            color: 'from-blue-500 to-cyan-500',
            bgGlow: 'group-hover:shadow-blue-500/20'
        },
        {
            title: 'Science',
            link: '/science',
            path: 'Discover',
            icon: '🔬',
            description: 'Uncover the mysteries of the universe and natural phenomena',
            color: 'from-purple-500 to-violet-500',
            bgGlow: 'group-hover:shadow-purple-500/20'
        },
        {
            title: 'Technology',
            link: '/tech',
            path: 'Innovate',
            icon: '💻',
            description: 'Stay ahead with cutting-edge tech and digital innovations',
            color: 'from-orange-500 to-red-500',
            bgGlow: 'group-hover:shadow-orange-500/20'
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3
            }
        }
    }

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            rotateX: -15
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white relative overflow-hidden">
            <Navbar />

            {/* Enhanced background effects */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_40%,transparent_100%)]"></div>

            {/* Dynamic floating orbs */}
            <motion.div
                className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/20 rounded-full blur-3xl"
                animate={{
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className="absolute top-1/3 -right-40 w-96 h-96 bg-gradient-to-l from-blue-500/25 to-cyan-500/20 rounded-full blur-3xl"
                animate={{
                    x: [0, -30, 0],
                    y: [0, 40, 0],
                    scale: [1, 0.9, 1]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />

            <motion.div
                className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-pink-500/20 to-purple-500/15 rounded-full blur-3xl"
                animate={{
                    x: [0, 25, 0],
                    y: [0, -25, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4
                }}
            />

            {/* Enhanced gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-blue-900/10"></div>

            {/* Enhanced header */}
            <div className="relative z-10 mt-32 container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 1.2, type: "spring", stiffness: 100 }}
                    className="text-center"
                >
                    <motion.h1
                        className="text-5xl sm:text-6xl md:text-7xl font-black mb-8"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1 }}
                    >
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
                            Welcome to Our Library
                        </span>
                        <motion.span
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: 1
                            }}
                            className="inline-block ml-4"
                        >
                            📚
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-gray-300 mb-8 italic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        Your Gateway to Infinite Knowledge and Discovery
                        <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="ml-2"
                        >
                            ✨
                        </motion.span>
                    </motion.p>

                    <motion.div
                        className="w-32 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: 128 }}
                        transition={{ delay: 0.8, duration: 1 }}
                    />
                </motion.div>
            </div>

            {/* Enhanced departments grid */}
            <motion.div
                className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-12 max-w-7xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {departments.map((item, index) => (
                    <motion.div
                        key={index}
                        className="group relative"
                        variants={cardVariants}
                        whileHover={{
                            y: -8,
                            transition: { type: "spring", stiffness: 300, damping: 20 }
                        }}
                    >
                        {/* Glowing border effect */}
                        <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-3xl blur opacity-0 group-hover:opacity-40 transition duration-500`}></div>

                        <div className={`relative bg-slate-900/60 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-700/50 group-hover:border-slate-600/50 transition-all duration-500 ${item.bgGlow} group-hover:shadow-2xl`}>
                            {/* Card header with icon */}
                            <div className="relative overflow-hidden">
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}></div>

                                <div className="relative p-8 pb-4">
                                    <motion.div
                                        className="flex items-center gap-4 mb-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 + 0.5 }}
                                    >
                                        <motion.div
                                            className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl shadow-lg`}
                                            whileHover={{
                                                rotate: [0, -10, 10, 0],
                                                scale: 1.1
                                            }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            {item.icon}
                                        </motion.div>

                                        <motion.h1
                                            className="text-2xl md:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-500"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 + 0.6 }}
                                        >
                                            {item.title}
                                        </motion.h1>
                                    </motion.div>

                                    <motion.p
                                        className="text-gray-300 text-sm md:text-base leading-relaxed mb-6"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 + 0.7 }}
                                    >
                                        {item.description}
                                    </motion.p>
                                </div>
                            </div>

                            {/* Action button */}
                            <div className="p-8 pt-0">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 + 0.8 }}
                                >
                                    <Link
                                        to={item.link}
                                        className="group/btn block w-full"
                                    >
                                        <motion.button
                                            className={`w-full bg-gradient-to-r ${item.color} hover:shadow-lg text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 relative overflow-hidden`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {/* Shine effect */}
                                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>

                                            <span className="relative flex items-center justify-center gap-2">
                                                {item.path}
                                                <motion.span
                                                    className="group-hover/btn:translate-x-1 transition-transform duration-200"
                                                >
                                                    →
                                                </motion.span>
                                            </span>
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Hover glow effect */}
                            <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-5 transition-all duration-500 pointer-events-none rounded-3xl`}></div>
                        </div>
                    </motion.div>
                ))}
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
                            "The only thing you absolutely have to know is the location of the library" - Albert Einstein
                        </blockquote>
                        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full"></div>
                    </motion.div>
                </div>
            </motion.section>

        </div>
    )
}

export default Library