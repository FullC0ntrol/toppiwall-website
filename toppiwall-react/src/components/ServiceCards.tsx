'use client'

import { motion } from 'framer-motion'
import { services, extras } from '@/data/services'

export default function ServiceCards() {
  return (
    <section className="py-24 sm:py-32 bg-zinc-50 border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-brand-red font-semibold tracking-wider uppercase text-sm mb-3">Więcej niż malowanie</p>
          <h2 className="font-space text-4xl sm:text-5xl font-semibold text-zinc-900 tracking-tight">Kompleksowe usługi</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 border border-zinc-200 hover:border-brand-red/30 transition-colors"
              >
                <div className="w-12 h-12 bg-red-50 text-brand-red flex items-center justify-center rounded-sm mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 font-space">{service.title}</h3>
                <p className="mt-3 text-zinc-600 leading-relaxed">{service.text}</p>
              </motion.div>
            )
          })}
        </div>

        <div>
          <h3 className="font-space text-2xl font-semibold text-zinc-900 mb-8">Usługi dodatkowe</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {extras.map((extra, index) => {
              const Icon = extra.icon
              return (
                <motion.div
                  key={extra.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex items-start gap-4 p-5 bg-white border border-zinc-100"
                >
                  <Icon size={20} className="text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-zinc-900">{extra.title}</h4>
                    <p className="text-sm text-zinc-500 mt-1">{extra.text}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
