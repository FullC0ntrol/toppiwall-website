'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface ProjectData {
  id: string
  title: string
  category: string
  images: string[]
}

interface PortfolioShowcaseProps {
  projects: ProjectData[]
}

function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100">
      <AnimatePresence>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Indykatory - proste kropeczki */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-6 bg-red-600' : 'w-1.5 bg-white/70'}`}
          />
        ))}
      </div>
      
      {/* Mały licznik */}
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-zinc-900 text-[10px] font-bold px-2 py-1 rounded-md z-20 shadow-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}

export default function PortfolioShowcase({ projects }: PortfolioShowcaseProps) {
  return (
    <section className="py-24 sm:py-32 bg-zinc-50 relative border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 sm:mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-red-600" />
            <p className="text-xs font-black tracking-[4px] uppercase text-red-600">Nasze Portfolio</p>
          </div>
          <h2 className="font-space text-3xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
            Metamorfozy wnętrz
          </h2>
          <p className="mt-5 text-zinc-500 sm:text-lg leading-relaxed max-w-2xl">
            Zobacz z bliska, jak precyzja na każdym etapie prac przekłada się na zachwycający efekt końcowy.
          </p>
        </motion.div>

        {/* ── Czysty Grid Kart Projektów ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 hover:border-red-200 transition-colors shadow-sm hover:shadow-md group"
            >
              <ImageCarousel images={project.images} />

              <div className="mt-5 px-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 group-hover:text-red-600 transition-colors">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
