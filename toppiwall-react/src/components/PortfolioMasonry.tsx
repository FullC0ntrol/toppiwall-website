import { motion } from 'framer-motion'
import { portfolioImages } from '@/data/services'

export default function PortfolioMasonry() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-brand-red font-semibold tracking-wider uppercase text-sm mb-3">Portfolio</p>
          <h2 className="font-space text-4xl sm:text-5xl font-semibold text-zinc-900 tracking-tight">Nasze realizacje</h2>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {portfolioImages.map((img, index) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              className="relative group overflow-hidden break-inside-avoid"
            >
              <div className={`relative w-full ${img.size}`}>
                <img 
                  src={img.src} 
                  alt={img.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-6 w-full">
                  <p className="text-white font-medium text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {img.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
