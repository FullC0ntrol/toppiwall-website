import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from '@/components/Navbar'
import HeroScroll from '@/components/HeroScroll'
import ServiceCards from '@/components/ServiceCards'
import PaintingProcess from '@/components/PaintingProcess'
import PortfolioMasonry from '@/components/PortfolioMasonry'
import ContactSection from '@/components/ContactSection'
import { motion, AnimatePresence } from 'framer-motion'
import { reviews } from '@/data/services'
import { Star } from 'lucide-react'

// Simple Reviews Component inline since it's small
function ReviewsSection() {
  return (
    <section className="py-24 sm:py-32 bg-zinc-50 border-t border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-brand-red font-semibold tracking-wider uppercase text-sm mb-3">Zadowoleni Klienci</p>
          <h2 className="font-space text-4xl sm:text-5xl font-semibold text-zinc-900 tracking-tight">Co mówią inni?</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-8 shadow-sm border border-zinc-100"
            >
              <div className="flex gap-1 mb-4 text-amber-400">
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="text-zinc-600 mb-6 italic leading-relaxed">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-red text-white flex items-center justify-center font-bold">
                  {review.author[0]}
                </div>
                <span className="font-semibold text-zinc-900">{review.author}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <AnimatePresence>
      <Navbar />
      <main>
        <HeroScroll />
        <ServiceCards />
        <PaintingProcess />
        <PortfolioMasonry />
        <ReviewsSection />
        <ContactSection />
      </main>
    </AnimatePresence>
  )
}
