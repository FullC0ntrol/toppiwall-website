'use client'

import { motion } from 'framer-motion'
import { Phone, MessageCircle, MapPin } from 'lucide-react'
import { phoneNumber, whatsappNumber } from '@/data/services'

export default function ContactSection() {
  return (
    <section className="py-24 sm:py-32 bg-zinc-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="font-space text-4xl sm:text-5xl font-semibold text-zinc-900 tracking-tight">
              Gotowy na zmiany?
            </h2>
            <p className="mt-6 text-lg text-zinc-600 leading-relaxed max-w-lg">
              Skontaktuj się z nami, aby omówić Twój projekt. Działamy w Leuven i okolicach. Szybka wycena i profesjonalne doradztwo.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${phoneNumber}`}
                className="flex-1 flex items-center justify-center gap-3 bg-brand-red hover:bg-brand-red-hover text-white px-8 py-5 text-lg font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Phone size={24} />
                Zadzwoń
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                className="flex-1 flex items-center justify-center gap-3 bg-white border-2 border-zinc-200 hover:border-brand-red hover:text-brand-red text-zinc-900 px-8 py-5 text-lg font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle size={24} />
                WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative h-[400px] bg-white border border-zinc-200 flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)]" />
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 bg-brand-red text-white flex items-center justify-center rounded-full shadow-xl shadow-brand-red/20 mb-6 relative z-10"
            >
              <MapPin size={36} />
            </motion.div>
            
            <h3 className="font-space text-2xl font-semibold text-zinc-900 relative z-10">Leuven + Okolice</h3>
            <p className="text-zinc-500 mt-2 relative z-10 font-medium">Heverlee • Kessel-Lo • Herent • Bierbeek</p>
            
            {/* Animated rings */}
            <motion.div
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
              className="absolute w-48 h-48 border border-brand-red rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 1.25 }}
              className="absolute w-48 h-48 border border-brand-red rounded-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
