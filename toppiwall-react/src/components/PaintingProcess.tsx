'use client'

import { motion } from 'framer-motion'
import { paintingSteps } from '@/data/services'

export default function PaintingProcess() {
  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-brand-red font-semibold tracking-wider uppercase text-sm mb-3">Usługa nr 1</p>
          <h2 className="font-space text-4xl sm:text-5xl font-semibold text-zinc-900 tracking-tight">Malowanie</h2>
          <p className="mt-4 text-lg text-zinc-600">Precyzja na każdym etapie — od zabezpieczenia po ostatnią warstwę.</p>
        </div>

        <div className="mt-20 relative">
          {/* Timeline line */}
          <div className="absolute top-0 bottom-0 left-[27px] w-0.5 bg-zinc-100 hidden md:block" />

          <div className="space-y-16">
            {paintingSteps.map((step, index) => (
              <motion.div 
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex flex-col md:flex-row gap-8 md:gap-16 group"
              >
                {/* Number indicator */}
                <div className="relative z-10 flex-shrink-0 w-14 h-14 bg-white border-2 border-zinc-200 rounded-full flex items-center justify-center font-space font-bold text-xl text-zinc-400 transition-colors group-hover:border-brand-red group-hover:text-brand-red">
                  {step.num}
                </div>

                <div className="md:pt-3">
                  <h3 className="text-2xl font-semibold text-zinc-900 font-space">{step.title}</h3>
                  <p className="mt-3 text-zinc-600 leading-relaxed max-w-2xl text-lg">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
