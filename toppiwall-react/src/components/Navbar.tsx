import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { Phone } from 'lucide-react'
import { phoneNumber } from '@/data/services'

export default function Navbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setScrolled(latest > 50)
  })

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-zinc-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <img src="/logo.svg" alt="ToppiWall" className="absolute inset-0 w-full h-full object-contain" />
          </div>
          <span className={`font-space font-semibold text-xl ${scrolled ? 'text-zinc-900' : 'text-zinc-900 drop-shadow-sm'}`}>
            ToppiWall
          </span>
        </div>
        
        <a 
          href={`tel:${phoneNumber}`}
          className="flex items-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white px-5 py-2.5 rounded-none font-medium transition-colors"
        >
          <Phone size={18} />
          <span className="hidden sm:block">Zadzwoń teraz</span>
        </a>
      </div>
    </motion.nav>
  )
}
