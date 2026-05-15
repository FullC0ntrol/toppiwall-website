import { useEffect, useRef, createContext, useContext } from 'react'
import Lenis from 'lenis'
import lenisRef from '@/lenisRef'
import Navbar from '@/components/Navbar'
import HeroScroll from '@/components/HeroScroll'
import ServiceCards from '@/components/ServiceCards'
import PaintingProcess from '@/components/PaintingProcess'
import FlooringProcess from '@/components/FlooringProcess'
import PortfolioShowcase from '@/components/PortfolioShowcase'
import ContactSection from '@/components/ContactSection'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, useAnimation, useInView } from 'framer-motion'
import { reviews } from '@/data/services'
import { Star } from 'lucide-react'

// UWAGA: Zaimportuj portfolioProjects z odpowiedniego pliku
import { portfolioProjects } from '@/data/services'

// ── Scroll direction context ─────────────────────────────────────────
const DirCtx = createContext<{ dir: React.MutableRefObject<'up' | 'down'> }>({ dir: { current: 'down' } })
const useDir = () => useContext(DirCtx).dir

// ── Direction-aware Reveal ───────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const dirRef = useDir()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-70px' })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] } })
    } else {
      const y = dirRef.current === 'down' ? -24 : 36
      controls.start({ opacity: 0, y, transition: { duration: 0.35 } })
    }
  }, [inView, controls, delay, dirRef])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }} animate={controls} className={className}>
      {children}
    </motion.div>
  )
}

// ── Section header ───────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, desc, light = false }: {
  eyebrow: string; title: string; desc?: string; light?: boolean
}) {
  return (
    <Reveal className="mb-14">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-[2px] bg-red-600" />
        <p className={`text-xs font-black tracking-[4px] uppercase ${light ? 'text-red-400' : 'text-red-600'}`}>{eyebrow}</p>
      </div>
      <h2 className={`font-space text-3xl sm:text-5xl font-bold tracking-tight leading-tight ${light ? 'text-white' : 'text-zinc-900'}`}>{title}</h2>
      {desc && <p className={`mt-4 text-base sm:text-lg leading-relaxed ${light ? 'text-zinc-300' : 'text-zinc-600'}`}>{desc}</p>}
    </Reveal>
  )
}

// ── "Jak pracujemy" — sekwencyjna wstawka animowana ──
function ProcessSection() {
  const STEPS = [
    { num: '01', title: 'Spotkanie',  desc: 'Bezpłatna wizyta i pomiar.', delay: 0.1 },
    { num: '02', title: 'Wycena',     desc: 'Kosztorys w 48 godziny.',    delay: 0.4 },
    { num: '03', title: 'Realizacja', desc: 'Czysto i terminowo.',         delay: 0.7 },
    { num: '04', title: 'Odbiór',     desc: 'Gwarancja satysfakcji.',      delay: 1.0 },
  ]

  return (
    <section id="process" className="relative py-20 sm:py-28 bg-white border-b border-zinc-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="relative">
          {/* Pozioma linia w tle (desktop) */}
          <div className="hidden sm:block absolute top-8 left-[12%] right-[12%] h-[2px] bg-zinc-100">
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="h-full bg-red-600 origin-left" 
            />
          </div>
          
          {/* Pionowa linia w tle (mobile) */}
          <div className="sm:hidden absolute top-8 bottom-8 left-[31px] w-[2px] bg-zinc-100">
            <motion.div 
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="w-full bg-red-600 origin-top" 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 sm:gap-6 relative">
            {STEPS.map((step) => (
              <motion.div 
                key={step.num} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: step.delay, type: 'spring' }}
                className="flex flex-row sm:flex-col items-center sm:items-center gap-5 sm:gap-6 group"
              >
                <div className="relative shrink-0">
                  {/* Ping animation */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1.5, opacity: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 1.2, delay: step.delay + 0.2 }}
                    className="absolute inset-0 bg-red-500 rounded-full"
                  />
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-white bg-zinc-50 shadow-md flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-white group-hover:border-red-100">
                    <span className="font-space font-black text-xl sm:text-2xl text-red-600">{step.num}</span>
                  </div>
                </div>
                <div className="sm:text-center w-full">
                  <h3 className="font-space font-bold text-zinc-900 text-lg sm:text-xl mb-2">{step.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Opinie ───────────────────────────────────────────────────────────
function ReviewsSection() {
  return (
    <section id="opinie" className="py-24 sm:py-32 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader eyebrow="Zadowoleni klienci" title="Co mówią o nas inni?" />
        <div className="grid md:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <Reveal key={review.author} delay={i * 0.1}>
              <motion.div whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white p-7 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} size={15} className="text-amber-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-zinc-700 text-sm leading-relaxed mb-6 italic">"{review.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                  <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {review.author[0]}
                  </div>
                  <span className="font-bold text-zinc-900 text-sm">{review.author}</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Separator ────────────────────────────────────────────────────────
function Sep() { return <div className="h-[2px] w-full bg-zinc-200" /> }

// ── Sekcje snap ──────────────────────────────────────────────────────
const SECTION_IDS = ['hero', 'process', 'usługi', 'realizacje', 'opinie', 'kontakt']

export default function Home() {
  const dirRef = useRef<'up' | 'down'>('down')
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0
    dirRef.current = latest > prev ? 'down' : 'up'
  })

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2,
    })
    lenisRef.current = lenis

    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)

    let snapTimer: ReturnType<typeof setTimeout>
    let isSnapping = false

    const getSections = () =>
      SECTION_IDS.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    const snapToNearest = () => {
      // Jeśli hero zablokował snap (pauza po animacji) — czekamy
      if (isSnapping || Date.now() < lenisRef.noSnapUntil) return

      const sections = getSections()
      const mid = window.scrollY + window.innerHeight * 0.45
      let nearest = sections[0]; let minDist = Infinity
      for (const el of sections) {
        const dist = Math.abs(mid - el.offsetTop)
        if (dist < minDist) { minDist = dist; nearest = el }
      }
      if (!nearest) return
      // Snap tylko gdy blisko granicy sekcji
      if (Math.abs(window.scrollY - nearest.offsetTop) > window.innerHeight * 0.32) return

      isSnapping = true
      lenis.scrollTo(nearest, {
        offset: 0,
        duration: 1.0,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        onComplete: () => {
          // Pauza 700ms przy każdej sekcji
          setTimeout(() => { isSnapping = false }, 700)
        },
      })
    }

    const onScroll = () => {
      clearTimeout(snapTimer)
      if (!isSnapping) snapTimer = setTimeout(snapToNearest, 160)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      lenis.destroy()
      window.removeEventListener('scroll', onScroll)
      clearTimeout(snapTimer)
    }
  }, [])

  return (
    <DirCtx.Provider value={{ dir: dirRef }}>
      <Navbar />
      <main>
        {/* ① HERO — czarne, canvas */}
        <div id="hero"><HeroScroll /></div>

        {/* ② JAK PRACUJEMY — ciemne, kompaktowe przejście */}
        <ProcessSection />

        {/* ③ MALOWANIE — jasnoszare */}
        <Sep />
        <div className="bg-zinc-50"><PaintingProcess /></div>

        {/* ④ MONTAŻ PANELI — białe */}
        <Sep />
        <div className="bg-white"><FlooringProcess /></div>

        {/* ⑤ USŁUGI KOMPLEKSOWE — jasnoszare */}
        <Sep />
        <div id="usługi" className="bg-zinc-50"><ServiceCards /></div>

        {/* ⑥ PORTFOLIO — grid z karuzelami */}
        <Sep />
        <div id="realizacje" className="bg-zinc-50">
          <PortfolioShowcase projects={portfolioProjects} />
        </div>

        {/* ⑦ OPINIE — białe */}
        <Sep />
        <div className="bg-white"><ReviewsSection /></div>

        {/* ⑧ KONTAKT — jasnoszare */}
        <Sep />
        <div className="bg-zinc-50"><ContactSection /></div>
      </main>
    </DirCtx.Provider>
  )
}