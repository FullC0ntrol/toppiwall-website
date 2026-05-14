import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const FRAME_COUNT = 170

function drawImageCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
  const imgRatio = img.width / img.height
  const canvasRatio = w / h
  let drawW = w
  let drawH = h
  let x = 0
  let y = 0

  if (imgRatio < canvasRatio) {
    // Canvas is wider than image aspect
    drawH = w / imgRatio
    y = (h - drawH) / 2
  } else {
    // Canvas is taller than image aspect
    drawW = h * imgRatio
    x = (w - drawW) / 2
  }

  ctx.clearRect(0, 0, w, h)
  ctx.drawImage(img, x, y, drawW, drawH)
}

export default function HeroScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [loadedFrames, setLoadedFrames] = useState(0)
  const imagesRef = useRef<HTMLImageElement[]>([])
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Smooth out the scroll for a "consumer-friendly" premium feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001
  })

  // Handle canvas sizing for perfect quality
  const resizeCanvas = () => {
    if (canvasRef.current) {
      const dpr = window.devicePixelRatio || 1
      canvasRef.current.width = window.innerWidth * dpr
      canvasRef.current.height = window.innerHeight * dpr
    }
  }

  useEffect(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  // Preload frames logic
  useEffect(() => {
    let isCancelled = false
    const images: HTMLImageElement[] = []

    const loadFrame = (index: number) => {
      return new Promise<void>((resolve) => {
        const img = new window.Image()
        const paddedIndex = String(index + 1).padStart(3, '0')
        img.src = `/frames/ezgif-frame-${paddedIndex}.jpg`
        img.onload = () => {
          if (!isCancelled) {
            images[index] = img
            setLoadedFrames(prev => prev + 1)
          }
          resolve()
        }
        img.onerror = () => resolve()
      })
    }

    const initLoad = async () => {
      // 1. Load first 12 frames immediately
      const initialPromises = []
      for (let i = 0; i < Math.min(12, FRAME_COUNT); i++) {
        initialPromises.push(loadFrame(i))
      }
      await Promise.all(initialPromises)
      
      // Draw first frame if canvas is ready
      if (!isCancelled && images[0] && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) {
          drawImageCover(ctx, images[0], canvasRef.current.width, canvasRef.current.height)
        }
      }

      // 2. Load the rest in background
      for (let i = 12; i < FRAME_COUNT; i++) {
        if (isCancelled) break
        await loadFrame(i)
      }
    }

    imagesRef.current = images
    initLoad()

    return () => {
      isCancelled = true
    }
  }, [])

  // Scroll to frame logic
  useEffect(() => {
    let animationFrameId: number
    
    const render = (progress: number) => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(progress * FRAME_COUNT))
      )

      if (imagesRef.current[frameIndex] && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) {
          drawImageCover(
            ctx, 
            imagesRef.current[frameIndex], 
            canvasRef.current.width, 
            canvasRef.current.height
          )
        }
      }
    }

    const unsubscribe = smoothProgress.on('change', (latest) => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(() => render(latest))
    })

    // Initial render
    render(smoothProgress.get())

    return () => {
      unsubscribe()
      cancelAnimationFrame(animationFrameId)
    }
  }, [smoothProgress])

  // Parallax / Animations for text
  const yText = useTransform(smoothProgress, [0, 1], ["0%", "80%"])
  const opacityText = useTransform(smoothProgress, [0, 0.4], [1, 0])
  const scaleLogo = useTransform(smoothProgress, [0, 1], [1, 1.1])

  return (
    <section ref={containerRef} className="relative h-[350vh] bg-zinc-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        
        {/* Canvas animation */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
        
        {/* Loader overlay */}
        {loadedFrames < 12 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-50">
            <div className="w-12 h-12 border-4 border-zinc-200 border-t-brand-red rounded-full animate-spin mb-4" />
            <p className="text-zinc-500 font-medium font-space animate-pulse">Ładowanie doświadczenia...</p>
          </div>
        )}

        {/* Overlay gradient for readability - dark for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 pointer-events-none" />

        {/* Content */}
        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          className="relative z-10 flex flex-col items-center text-center px-6 mt-20"
        >
          <motion.div style={{ scale: scaleLogo }} className="relative w-40 h-40 mb-8 drop-shadow-2xl">
            <img 
              src="/logo.svg" 
              alt="ToppiWall Logo" 
              className="absolute inset-0 w-full h-full object-contain" 
            />
          </motion.div>
          
          <h1 className="font-space text-5xl sm:text-6xl lg:text-8xl font-bold text-white tracking-tighter drop-shadow-lg">
            ToppiWall
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-zinc-200 font-medium max-w-2xl drop-shadow-md">
            Profesjonalne Malowanie i Wykończenia w Leuven
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          style={{ opacity: opacityText }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-sm font-semibold tracking-widest uppercase mb-3 text-white/80">Scroll</span>
          <div className="w-px h-16 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute inset-0 bg-brand-red"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
