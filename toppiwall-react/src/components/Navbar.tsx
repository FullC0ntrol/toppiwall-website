import { motion, useScroll, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Phone, Menu, X, MessageCircle } from 'lucide-react';
import { phoneNumber } from '@/data/services';

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Gładka linia postępu (Brand Line)
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Ukrywanie przy scrollu w dół, pokazywanie przy powrocie
    if (latest > previous && latest > 150) {
      setHidden(true);
      setMobileOpen(false); // Automatyczne zamykanie menu przy scrollu
    } else {
      setHidden(false);
    }

    setScrolled(latest > 80);
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-zinc-100 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      {/* Brand Line - Scroll Progress */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo Section */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 transition-transform group-hover:scale-110 duration-300">
            <img 
              src="/logo.svg" 
              alt="ToppiWall" 
              className="w-full h-full object-contain" 
            />
          </div>
          <div className="flex flex-col">
            <span className={`font-space font-bold text-xl tracking-tighter leading-none transition-colors duration-300 ${
              scrolled ? 'text-zinc-900' : 'text-white'
            }`}>
              ToppiWall
            </span>
            <span className={`text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${
              scrolled ? 'text-brand-red' : 'text-zinc-300'
            }`}>
              Leuven & Surroundings
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <nav className={`flex items-center gap-8 text-sm font-semibold tracking-tight transition-colors duration-300 ${
            scrolled ? 'text-zinc-600' : 'text-zinc-100'
          }`}>
            {['Usługi', 'Portfolio', 'Opinie', 'Kontakt'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="hover:text-brand-red transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 ml-4">
            {/* WhatsApp - kluczowe w Belgii */}
            <a 
              href="https://wa.me/twoj-numer" 
              className={`p-2.5 rounded-full border transition-all ${
                scrolled ? 'border-zinc-200 text-green-600 hover:bg-green-50' : 'border-white/20 text-white hover:bg-white/10'
              }`}
            >
              <MessageCircle size={20} />
            </a>
            
            <a 
              href={`tel:${phoneNumber}`}
              className="flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white px-6 py-2.5 font-bold transition-all active:scale-95 shadow-lg shadow-brand-red/20"
            >
              <Phone size={16} />
              <span className="text-sm">BEZPLATNA WYCENA</span>
            </a>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <a 
            href={`tel:${phoneNumber}`}
            className="bg-brand-red text-white p-3 shadow-lg shadow-brand-red/20"
          >
            <Phone size={20} />
          </a>
          
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-3 transition-colors ${scrolled ? 'text-zinc-900' : 'text-white'}`}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu z AnimatePresence */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-zinc-100 shadow-2xl md:hidden"
          >
            <div className="px-6 py-10 flex flex-col gap-8">
              {['Usługi', 'Portfolio', 'Opinie', 'Kontakt'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-space font-bold text-zinc-900 flex justify-between items-center"
                >
                  {item}
                  <div className="w-8 h-[1px] bg-brand-red" />
                </a>
              ))}
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <a 
                  href="https://wa.me/numer"
                  className="flex items-center justify-center gap-2 bg-zinc-100 text-zinc-900 py-4 font-bold"
                >
                  <MessageCircle size={20} className="text-green-600" /> WhatsApp
                </a>
                <a 
                  href={`tel:${phoneNumber}`}
                  className="flex items-center justify-center gap-2 bg-brand-red text-white py-4 font-bold"
                >
                  <Phone size={20} /> Zadzwoń
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}