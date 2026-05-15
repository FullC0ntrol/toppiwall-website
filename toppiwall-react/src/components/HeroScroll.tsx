'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import lenisRef from '@/lenisRef'

const FRAME_COUNT = 170
const INITIAL_LOAD_COUNT = 12

function drawImageCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
 const ir = img.width / img.height, cr = w / h
 let dw = w, dh = h, x = 0, y = 0
 if (ir < cr) { dh = w / ir; y = (h - dh) / 2 } else { dw = h * ir; x = (w - dw) / 2 }
 ctx.clearRect(0, 0, w, h)
 ctx.drawImage(img, x, y, dw, dh)
}

export default function HeroScroll() {
 const canvasRef = useRef<HTMLCanvasElement>(null)
 const containerRef = useRef<HTMLDivElement>(null)
 const imagesRef = useRef<HTMLImageElement[]>([])
 const [loadedFrames, setLoadedFrames] = useState(0)
 const [animDone, setAnimDone] = useState(false)

 // Pobieramy surowy scroll do natychmiastowej reakcji i sprężynę do płynnej animacji klatek
 const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
 const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.5 })

 // ==================== WYKRYWANIE KOŃCA (NATYCHMIASTOWE) ====================
 useEffect(() => {
  const unsub = scrollYProgress.on('change', (v) => {
   // Reagujemy natychmiast na surowy scroll, gdy zbliża się do końca (0.97)
   if (v >= 0.97) {
    setAnimDone(true)
   } else if (v < 0.90) {
    // Resetujemy stan, jeśli użytkownik wróci do góry strony
    setAnimDone(false)
   }
  })
  return unsub
 }, [scrollYProgress])

 // ==================== BEZWZGLĘDNA BLOKADA SCROLLA ====================
 useEffect(() => {
  if (!animDone) return

  // Blokujemy instancję Lenis natychmiast
  if (lenisRef.current) {
   lenisRef.current.stop()

   // Dociągamy do końca hero
   if (containerRef.current) {
    lenisRef.current.scrollTo(containerRef.current, { align: 'end', immediate: true })
   }
  }

  // Blokada natywna kółka i dotyku
  const prevent = (e: Event) => e.preventDefault()
  window.addEventListener('wheel', prevent, { passive: false })
  window.addEventListener('touchstart', prevent, { passive: false })
  window.addEventListener('touchmove', prevent, { passive: false })

  // Zdejmujemy blokadę po 1 sekundzie
  const timer = setTimeout(() => {
   window.removeEventListener('wheel', prevent)
   window.removeEventListener('touchstart', prevent)
   window.removeEventListener('touchmove', prevent)
   if (lenisRef.current) lenisRef.current.start()
  }, 1000)

  return () => {
   clearTimeout(timer)
   window.removeEventListener('wheel', prevent)
   window.removeEventListener('touchstart', prevent)
   window.removeEventListener('touchmove', prevent)
   if (lenisRef.current) lenisRef.current.start()
  }
 }, [animDone])

 // ==================== GEOMETRIA CANVASU ====================
 const resizeCanvas = useCallback(() => {
  const canvas = canvasRef.current; if (!canvas) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = canvas.parentElement?.clientWidth || window.innerWidth
  const h = window.innerHeight
  canvas.width = w * dpr;
  canvas.height = h * dpr
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`
 }, [])

 useEffect(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  return () => window.removeEventListener('resize', resizeCanvas)
 }, [resizeCanvas])

 // ==================== PRELOADING KLAREK ====================
 useEffect(() => {
  let cancelled = false
  const images: HTMLImageElement[] = []
  const loadFrame = (i: number) => new Promise<void>(res => {
   const img = new window.Image()
   img.src = `/frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`
   img.onload = () => { if (!cancelled) { images[i] = img; setLoadedFrames(p => p + 1) }; res() }
   img.onerror = () => res()
  })
  const run = async () => {
   await Promise.all(Array.from({ length: Math.min(INITIAL_LOAD_COUNT, FRAME_COUNT) }, (_, i) => loadFrame(i)))
   if (!cancelled && images[0] && canvasRef.current) {
    const ctx = canvasRef.current.getContext('2d')
    if (ctx) drawImageCover(ctx, images[0], canvasRef.current.width, canvasRef.current.height)
   }
   for (let i = INITIAL_LOAD_COUNT; i < FRAME_COUNT; i++) { if (cancelled) break; await loadFrame(i) }
  }
  imagesRef.current = images; run()
  return () => { cancelled = true }
 }, [])

 // ==================== RENDERER ANIMACJI ====================
 useEffect(() => {
  let raf: number
  const render = (p: number) => {
   const fi = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(p * FRAME_COUNT)))
   if (imagesRef.current[fi] && canvasRef.current) {
    const ctx = canvasRef.current.getContext('2d')
    if (ctx) drawImageCover(ctx, imagesRef.current[fi], canvasRef.current.width, canvasRef.current.height)
   }
  }
  const unsub = smoothProgress.on('change', v => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => render(v)) })
  render(smoothProgress.get())
  return () => { unsub(); cancelAnimationFrame(raf) }
 }, [smoothProgress])

 const yText = useTransform(smoothProgress, [0, 0.55], ['0%', '-25%'])
 const opText = useTransform(smoothProgress, [0, 0.40], [1, 0])
 const scaleLogo = useTransform(smoothProgress, [0, 1], [1, 1.05])

 return (
  <section ref={containerRef} className="relative h-[180vh] bg-zinc-950">
   <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

    {loadedFrames < INITIAL_LOAD_COUNT && (
     <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950">
      <div className="w-10 h-10 border-[3px] border-zinc-700 border-t-red-500 rounded-full animate-spin mb-4" />
      <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest">Ładowanie...</p>
     </div>
    )}

    {/* Przyciemnienie tła - jaśniejsze na starcie i znikające w trakcie animacji, by odsłonić czysty obraz */}
    <motion.div 
      style={{ opacity: opText }}
      className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 pointer-events-none" 
    />

    {/* Ekran Początkowy (Tytuł i Opis) */}
    <motion.div style={{ y: yText, opacity: opText }}
     className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-3xl mx-auto">
     <motion.div style={{ scale: scaleLogo }}
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-20 h-20 sm:w-28 sm:h-28 mb-6 drop-shadow-2xl">
      <img src="/logo.svg" alt="ToppiWall" className="w-full h-full object-contain" />
     </motion.div>

     <motion.h1
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="font-space text-5xl sm:text-7xl lg:text-[6rem] font-bold text-white tracking-tighter leading-none"
      style={{ textShadow: '0 2px 24px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,1)' }}
     >
      ToppiWall
     </motion.h1>

     <motion.p
      initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="mt-5 text-lg sm:text-xl text-white font-medium max-w-lg"
      style={{ textShadow: '0 1px 12px rgba(0,0,0,0.95)' }}
     >
      Profesjonalne wykańczanie wnetrz
     </motion.p>

     <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }} className="mt-6 w-16 h-0.5 bg-red-600 origin-center" />
    </motion.div>

    {/* Ekran Końcowy (Pauza i Slogan) */}
    <AnimatePresence>
     {animDone && (
      <motion.div key="end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
       transition={{ duration: 0.7 }}
       className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 bg-black/70">
       <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center">
        <div className="w-20 h-20 sm:w-24 sm:h-24 mb-5">
         <img src="/logo.svg" alt="ToppiWall" className="w-full h-full object-contain drop-shadow-2xl" />
        </div>
        <h2 className="font-space text-3xl sm:text-5xl font-bold text-white tracking-tighter"
         style={{ textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}>
         ToppiWall
        </h2>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
         transition={{ delay: 0.4, duration: 0.5 }}
         className="mt-5 h-px w-20 bg-red-600 origin-center" />

       </motion.div>
      </motion.div>
     )}
    </AnimatePresence>

    {/* Kontrolka przewijania (Scroll Cue) */}
    <motion.div style={{ opacity: opText }}
     className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
     <span className="text-[11px] font-black tracking-[5px] uppercase mb-3 text-white/80">SCROLL</span>
     <div className="w-[2px] h-20 relative overflow-hidden bg-white/20">
      <motion.div animate={{ y: ['-100%', '100%'] }}
       transition={{ repeat: Infinity, duration: 1.3, ease: 'linear' }}
       className="absolute w-full h-1/2 bg-gradient-to-b from-transparent via-white/90 to-transparent" />
     </div>
    </motion.div>
   </div>
  </section>
 )
}
