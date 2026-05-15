import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { cubicBezier } from 'framer-motion'

const FRAME_COUNT = 170
const INITIAL_LOAD_COUNT = 12

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number
) {
  const imgRatio = img.width / img.height
  const canvasRatio = width / height

  let drawW = width
  let drawH = height
  let x = 0
  let y = 0

  if (imgRatio < canvasRatio) {
    drawH = width / imgRatio
    y = (height - drawH) / 2
  } else {
    drawW = height * imgRatio
    x = (width - drawW) / 2
  }

  ctx.clearRect(0, 0, width, height)
  ctx.drawImage(img, x, y, drawW, drawH)
}

export default function HeroScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [loadedFrames, setLoadedFrames] = useState(0)

  // Scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Bardzo premium, płynne wygładzanie
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 68,
    damping: 32,
    mass: 0.9,
    restDelta: 0.001,
  })

  const customEase = cubicBezier(0.23, 0.08, 0.27, 1) // filmowy, elegancki ease

  const easedProgress = useTransform(smoothProgress, [0, 1], [0, 1], {
    ease: customEase,
  })

  // === CANVAS RESIZE ===
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2) // ograniczamy do 2x dla wydajności
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    canvas.style.width = '100%'
    canvas.style.height = '100%'

    const ctx = canvas.getContext('2d')
    if (ctx) ctx.scale(dpr, dpr)
  }, [])

  useEffect(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [resizeCanvas])

  // === PRELOAD FRAMES ===
  useEffect(() => {
    let isCancelled = false
    const images: HTMLImageElement[] = []

    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new window.Image()
        const padded = String(index + 1).padStart(3, '0')
        img.src = `/frames/ezgif-frame-${padded}.jpg`

        img.onload = () => {
          if (!isCancelled) {
            images[index] = img
            setLoadedFrames((prev) => prev + 1)
          }
          resolve()
        }
        img.onerror = () => resolve()
      })
    }

    const initLoad = async () => {
      // Szybkie wczytanie pierwszych klatek
      await Promise.all(
        Array.from({ length: Math.min(INITIAL_LOAD_COUNT, FRAME_COUNT) }, (_, i) => loadFrame(i))
      )

      // Pierwsza klatka na canvasie
      if (!isCancelled && images[0] && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) drawImageCover(ctx, images[0], canvasRef.current.width, canvasRef.current.height)
      }

      // Reszta w tle
      for (let i = INITIAL_LOAD_COUNT; i < FRAME_COUNT; i++) {
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

  // === RENDER FRAME ===
  useEffect(() => {
    let rafId: number

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

    const unsubscribe = easedProgress.on('change', (latest) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => render(latest))
    })

    render(easedProgress.get())

    return () => {
      unsubscribe()
      cancelAnimationFrame(rafId)
    }
  }, [easedProgress])

  // === TEXT ANIMATIONS ===
  const yText = useTransform(easedProgress, [0, 1], ["0%", "115%"])
  const opacityText = useTransform(easedProgress, [0, 0.36], [1, 0])
  const scaleLogo = useTransform(easedProgress, [0, 1], [1, 1.09])

  return (
    <section ref={containerRef} className="relative h-[480vh] bg-zinc-950">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Loader */}
        {loadedFrames < INITIAL_LOAD_COUNT && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950">
            <div className="w-12 h-12 border-4 border-zinc-700 border-t-white rounded-full animate-spin mb-4" />
            <p className="text-zinc-400 font-medium font-space">Ładowanie doświadczenia...</p>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85 pointer-events-none" />

        {/* Content */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="relative z-10 flex flex-col items-center text-center px-6"
        >
          <motion.div
            style={{ scale: scaleLogo }}
            className="relative w-40 h-40 mb-8 drop-shadow-2xl"
          >
            <img
              src="/logo.svg"
              alt="ToppiWall Logo"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </motion.div>

          <h1 className="font-space text-5xl sm:text-6xl lg:text-[5.5rem] font-bold text-white tracking-tighter drop-shadow-lg">
            ToppiWall
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-zinc-200 font-medium max-w-2xl drop-shadow-md">
            Profesjonalne Malowanie i Wykończenia w Leuven
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity: opacityText }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-xs font-semibold tracking-[3px] uppercase mb-3 text-white/70">
            SCROLL
          </span>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/40 to-transparent relative overflow-hidden">
            <motion.div
              animate={{ y: ["-120%", "120%"] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
              className="absolute w-full h-1/3 bg-white"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}