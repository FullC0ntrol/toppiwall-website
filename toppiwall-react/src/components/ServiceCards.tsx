'use client'

import { motion } from 'framer-motion'
import { services, extras } from '@/data/services'

export default function ServiceCards() {
  return (
    <section className="py-24 sm:py-32 bg-zinc-50 border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[2px] bg-red-600" />
            <p className="text-xs font-black tracking-[4px] uppercase text-red-600">Więcej niż malowanie</p>
          </div>
          <h2 className="font-space text-3xl sm:text-5xl font-bold text-zinc-900 tracking-tight leading-tight">Kompleksowe usługi</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, boxShadow: '0 24px 48px -12px rgba(220,38,38,0.12)' }}
                className="bg-white p-8 border border-zinc-200 hover:border-red-200 transition-all duration-300 cursor-default"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="w-12 h-12 bg-red-50 text-red-600 flex items-center justify-center rounded-sm mb-6"
                >
                  <Icon size={24} />
                </motion.div>
                <h3 className="text-xl font-semibold text-zinc-900 font-space">{service.title}</h3>
                <p className="mt-3 text-zinc-600 leading-relaxed">{service.text}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="font-space text-2xl font-semibold text-zinc-900 mb-8">Usługi dodatkowe</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {extras.map((extra, index) => {
              const Icon = extra.icon
              return (
                <motion.div
                  key={extra.title}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 p-5 bg-white border border-zinc-100 hover:border-red-200 transition-colors"
                >
                  <Icon size={20} className="text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-zinc-900">{extra.title}</h4>
                    <p className="text-sm text-zinc-500 mt-1">{extra.text}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
