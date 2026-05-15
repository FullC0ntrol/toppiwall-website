import { motion, useScroll, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { phoneNumber } from '@/data/services';

const NAV_SECTIONS = [
  { id: 'hero',       label: 'Start',     pct: [0,      0.12] },
  { id: 'usługi',     label: 'Usługi',    pct: [0.12,   0.36] },
  { id: 'realizacje', label: 'Portfolio', pct: [0.36,   0.60] },
  { id: 'opinie',     label: 'Opinie',    pct: [0.60,   0.80] },
  { id: 'kontakt',    label: 'Kontakt',   pct: [0.80,   1.00] },
];

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (latest > prev && latest > 150) setHidden(true);
    else setHidden(false);
    setScrolled(latest > 80);

    const total = document.documentElement.scrollHeight - window.innerHeight || 1;
    const pct = latest / total;
    const idx = NAV_SECTIONS.findIndex((s) => pct >= s.pct[0] && pct < s.pct[1]);
    setActiveIdx(idx === -1 ? NAV_SECTIONS.length - 1 : idx);
  });

  return (
    <>
      {/* ── TOP NAVBAR ── */}
      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-white/92 backdrop-blur-xl shadow-sm border-b border-zinc-100 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        {/* Scroll progress thin line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-600 origin-left"
          style={{ scaleX }}
        />

        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 transition-transform group-hover:scale-110 duration-300">
              <img src="/logo.svg" alt="ToppiWall" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className={`font-space font-bold text-lg tracking-tighter leading-none transition-colors duration-300 ${scrolled ? 'text-zinc-900' : 'text-white'}`}>
                ToppiWall
              </span>
              <span className={`text-[9px] uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${scrolled ? 'text-red-600' : 'text-zinc-300'}`}>
                Leuven & Surroundings
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <nav className={`hidden md:flex items-center gap-7 text-sm font-semibold tracking-tight transition-colors duration-300 ${scrolled ? 'text-zinc-600' : 'text-zinc-100'}`}>
            {NAV_SECTIONS.filter(s => s.id !== 'hero').map((item) => (
              <a key={item.id} href={`#${item.id}`} className="hover:text-red-600 transition-colors relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${phoneNumber.replace('+', '')}`}
              className={`p-2.5 rounded-full border transition-all ${scrolled ? 'border-zinc-200 text-green-600 hover:bg-green-50' : 'border-white/20 text-white hover:bg-white/10'}`}
              aria-label="WhatsApp"
            >
              <MessageCircle size={19} />
            </a>
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 font-bold text-sm transition-all active:scale-95 shadow-lg shadow-red-600/25 rounded-sm"
            >
              <Phone size={15} />
              BEZPŁATNA WYCENA
            </a>
          </div>

          {/* Mobile phone */}
          <a
            href={`tel:${phoneNumber}`}
            className="md:hidden flex items-center gap-2 bg-red-600 text-white px-4 py-2.5 font-bold text-sm shadow-lg shadow-red-600/30 rounded-sm"
          >
            <Phone size={16} />
            Zadzwoń
          </a>
        </div>
      </motion.nav>

      {/* ── RIGHT TIMELINE (desktop only) ── */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-[90] hidden lg:block">
        <div className="relative flex flex-col items-center">
          {/* Track */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px bg-zinc-200/50" />

          {/* Items */}
          <div className="relative flex flex-col">
            {NAV_SECTIONS.map((section, i) => {
              const isActive = i === activeIdx;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="relative flex items-center justify-end group py-3.5 pr-0"
                  title={section.label}
                >
                  {/* Label pill — on hover */}
                  <AnimatePresence>
                    <motion.span
                      className="absolute right-7 bg-zinc-900/95 backdrop-blur-sm text-white text-[11px] font-bold tracking-wide px-3 py-1.5 rounded-full whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xl border border-zinc-700"
                    >
                      {section.label}
                    </motion.span>
                  </AnimatePresence>

                  {/* Dot container */}
                  <div className="relative flex items-center justify-center w-5 h-5">
                    {/* Active pulse ring */}
                    {isActive && (
                      <motion.span
                        key="pulse"
                        initial={{ scale: 0.5, opacity: 0.7 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                        className="absolute w-3 h-3 rounded-full bg-red-500"
                      />
                    )}
                    {/* Dot */}
                    <motion.div
                      animate={{
                        width: isActive ? 12 : 6,
                        height: isActive ? 12 : 6,
                        backgroundColor: isActive ? '#DC2626' : '#d4d4d8',
                      }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="rounded-full shadow-sm"
                    />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MOBILE STICKY CONTACT BAR ── */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-0 left-0 right-0 z-[200] flex lg:hidden mobile-sticky-bar"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
        <a
          href={`https://wa.me/${phoneNumber.replace('+', '')}`}
          id="mobile-whatsapp-cta"
          className="flex-1 flex items-center justify-center gap-2 bg-zinc-950 text-white py-4 font-semibold text-sm active:bg-zinc-800 transition-colors border-r border-zinc-800"
        >
          <MessageCircle size={18} className="text-green-400" />
          WhatsApp
        </a>
        <a
          href={`tel:${phoneNumber}`}
          id="mobile-call-cta"
          className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-4 font-bold text-sm active:bg-red-700 transition-colors"
        >
          <Phone size={18} />
          Zadzwoń teraz
        </a>
      </motion.div>
    </>
  );
}