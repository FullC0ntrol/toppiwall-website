'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const flooringSteps = [
  {
    num: '01',
    title: 'Przygotowanie podłoża',
    text: 'Ocena stabilności, dokładne odkurzanie i niwelowanie nierówności. Idealnie czysta i prosta wylewka to fundament trwałej podłogi bez skrzypienia.',
  },
  {
    num: '02',
    title: 'Izolacja i aklimatyzacja',
    text: 'Właściwe leżakowanie materiału w pomieszczeniu oraz dobór dedykowanego podkładu. Zapewniamy ochronę przed wilgocią i maksymalne wyciszenie.',
  },
  {
    num: '03',
    title: 'Precyzyjny montaż',
    text: 'Rozplanowanie układu względem światła i montaż z zachowaniem szczelin dylatacyjnych. Dbamy o idealne przesunięcie wzoru i czyste przejścia w progu.',
  },
  {
    num: '04',
    title: 'Perfekcyjne wykończenie',
    text: 'Montaż listew przypodłogowych z precyzyjnym cięciem kątów. Akcent na detale i estetyczne maskowanie styków, które gwarantują efekt premium.',
  },
]

const FRAME_COUNT = 151                    // ← Zmień na rzeczywistą liczbę klatek w folderze frames_floor
const INITIAL_LOAD_COUNT = 20
const CONCURRENT_LOADS = 12

function drawImageContain(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number
) {
  const imgRatio = img.width / img.height
  const canvasRatio = canvasWidth / canvasHeight

  let drawWidth = canvasWidth
  let drawHeight = canvasHeight
  let offsetX = 0
  let offsetY = 0

  if (imgRatio > canvasRatio) {
    drawHeight = canvasWidth / imgRatio
    offsetY = (canvasHeight - drawHeight) / 2
  } else {
    drawWidth = canvasHeight * imgRatio
    offsetX = (canvasWidth - drawWidth) / 2
  }

  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
}

export default function FlooringProcess() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])

  const [loadedCount, setLoadedCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.6,
  })

  const lineHeight = useTransform(smoothProgress, [0.08, 0.92], ['0%', '100%'])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const rect = parent.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    const currentProgress = smoothProgress.get()
    const frameIndex = Math.floor(currentProgress * (FRAME_COUNT - 1))
    const img = imagesRef.current[frameIndex]

    if (img) {
      const ctx = canvas.getContext('2d')
      if (ctx) drawImageContain(ctx, img, canvas.width, canvas.height)
    }
  }, [smoothProgress])

  const loadImages = useCallback(async () => {
    // Na telefonach pomijamy ciężką animację (jak w komponencie malowania)
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsLoading(false)
      return
    }

    const images: HTMLImageElement[] = new Array(FRAME_COUNT)
    let loaded = 0

    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const frameNum = String(index + 1).padStart(3, '0')
        const img = new window.Image()

        img.onload = () => {
          images[index] = img
          loaded++
          setLoadedCount(loaded)
          resolve()
        }
        img.onerror = () => resolve()
        img.src = `/frames_floor/ezgif-frame-${frameNum}.jpg`
      })
    }

    // Pierwsza partia – szybkie uruchomienie pierwszej klatki
    const initialBatch = Array.from({ length: INITIAL_LOAD_COUNT }, (_, i) => loadImage(i))
    await Promise.all(initialBatch)

    imagesRef.current = images
    const canvas = canvasRef.current
    if (canvas && images[0]) {
      const ctx = canvas.getContext('2d')
      if (ctx) drawImageContain(ctx, images[0], canvas.width, canvas.height)
    }
    setIsLoading(false)

    // Reszta w tle (batchowo)
    const backgroundLoad = async () => {
      for (let i = INITIAL_LOAD_COUNT; i < FRAME_COUNT; i++) {
        if (i % CONCURRENT_LOADS === 0) {
          const batch = []
          for (let j = 0; j < CONCURRENT_LOADS && i + j < FRAME_COUNT; j++) {
            batch.push(loadImage(i + j))
          }
          await Promise.all(batch)
          i += CONCURRENT_LOADS - 1
        } else {
          await loadImage(i)
        }
      }
    }
    backgroundLoad()
  }, [])

  useEffect(() => {
    resizeCanvas()
    loadImages()

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('orientationchange', resizeCanvas)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('orientationchange', resizeCanvas)
    }
  }, [resizeCanvas, loadImages])

  useEffect(() => {
    let rafId: number

    const renderFrame = (progress: number) => {
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(progress * (FRAME_COUNT - 1)))
      )
      const img = imagesRef.current[frameIndex]
      const canvas = canvasRef.current

      if (img && canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) drawImageContain(ctx, img, canvas.width, canvas.height)
      }
    }

    const unsubscribe = smoothProgress.on('change', (latest) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => renderFrame(latest))
    })

    renderFrame(smoothProgress.get())

    return () => {
      unsubscribe()
      cancelAnimationFrame(rafId)
    }
  }, [smoothProgress])

  const loadingProgress = Math.round((loadedCount / FRAME_COUNT) * 100)

  return (
    <section ref={sectionRef} className="py-20 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Nagłówek */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-12 md:mb-16 mx-auto md:mx-0"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-red-600" />
            <p className="text-xs font-black tracking-[4px] uppercase text-red-600">Nasza specjalność</p>
          </div>
          <h2 className="font-space text-3xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">
            Montaż paneli podłogowych
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-500 leading-relaxed">
            Solidna podstawa Twojego wnętrza — dbamy o każdy detal, od wylewki po listwę.
          </p>
        </motion.div>

        {/* Główna siatka – lewa kolumna z krokami + prawa z canvasem */}
        <div className="block md:grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* LEWA KOLUMNA – kroki */}
          <div className="md:col-span-7 relative">
            <div className="absolute top-0 bottom-0 left-[27px] w-0.5 bg-zinc-100 hidden md:block" />
            <motion.div
              className="absolute top-0 left-[27px] w-0.5 bg-red-600 origin-top hidden md:block"
              style={{ height: lineHeight }}
            />

            <div className="space-y-8 md:space-y-14">
              {flooringSteps.map((step, index) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.65, delay: index * 0.05 }}
                  className="relative flex gap-6 md:gap-16 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="relative z-10 flex-shrink-0 w-14 h-14 bg-white border-2 border-zinc-200 rounded-full flex items-center justify-center font-space font-bold text-xl text-zinc-400 hover:border-red-600 hover:text-red-600 transition-colors duration-500"
                  >
                    {step.num}
                  </motion.div>

                  <div className="pt-3">
                    <h3 className="text-xl md:text-2xl font-semibold text-zinc-900 font-space">
                      {step.title}
                    </h3>
                    <p className="mt-2 md:mt-3 text-zinc-600 leading-relaxed text-base md:text-lg">
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* PRAWA KOLUMNA – Canvas + Loader (ukryty na mobile) */}
          <div className="hidden md:block md:col-span-5 sticky top-24">
            <div className="aspect-[4/5] w-full max-w-[420px] mx-auto bg-zinc-50 rounded-3xl shadow-xl overflow-hidden border border-zinc-100 relative">
              {isLoading && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-zinc-50/95 backdrop-blur-sm">
                  <div className="w-8 h-8 border-2 border-zinc-200 border-t-red-600 rounded-full animate-spin mb-4" />
                  <p className="text-zinc-500 text-sm font-medium">Ładowanie animacji...</p>
                  <p className="text-zinc-400 text-xs font-mono mt-1">{loadingProgress}%</p>
                </div>
              )}

              <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ display: 'block' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}