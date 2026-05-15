'use client'

import { motion } from 'framer-motion'
import { Phone, MessageCircle, MapPin, Mail, Facebook, Instagram } from 'lucide-react'
import { phoneNumber, whatsappNumber, emailAddress, facebookUrl, instagramUrl } from '@/data/services'

export default function ContactSection() {
  return (
    <section id="kontakt" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      
      {/* ── Subtelne Dekoracje Tła ── */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-red-50 rounded-full blur-[100px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-red-50 rounded-full blur-[100px] opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Animowana pulsująca kropka online */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
            </span>
            <p className="text-xs font-black tracking-[4px] uppercase text-red-600">Szybki kontakt</p>
          </div>
          <h2 className="font-space text-4xl sm:text-5xl font-bold text-zinc-900 tracking-tight mb-6">
            Zacznijmy współpracę
          </h2>
          <p className="text-zinc-500 text-lg max-w-xl mx-auto">
            Bezpłatna wycena, fachowe doradztwo i terminowa realizacja w Leuven i okolicach.
          </p>
        </motion.div>

        {/* ── Minimalistyczny Grid Kontaktowy ── */}
        <div className="grid sm:grid-cols-3 gap-6 lg:gap-8 mb-16">
          
          {/* Email */}
          <motion.a
            href={`mailto:${emailAddress}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative flex flex-col items-center text-center p-8 sm:p-10 bg-white border border-zinc-200 rounded-[2rem] hover:border-red-300 hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.1)] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
          >
            {/* Dekoracyjny blask z tyłu */}
            <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-[0.03] scale-50 group-hover:scale-150 transition-all duration-700 blur-2xl rounded-full pointer-events-none" />
            
            <div className="relative w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:shadow-lg group-hover:shadow-red-600/30 group-hover:scale-110 transition-all duration-500">
              <Mail size={24} className="text-red-600 group-hover:text-white transition-colors duration-500" />
            </div>
            <span className="text-xs sm:text-sm font-black uppercase tracking-[3px] text-zinc-500 group-hover:text-red-500 transition-colors duration-500 mb-2">
              E-mail
            </span>
            <span className="text-zinc-900 font-space font-bold text-xl sm:text-2xl group-hover:text-red-600 transition-colors duration-500">
              {emailAddress}
            </span>
          </motion.a>

          {/* Telefon */}
          <motion.a
            href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative flex flex-col items-center text-center p-8 sm:p-10 bg-white border border-zinc-200 rounded-[2rem] hover:border-red-300 hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.1)] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-[0.03] scale-50 group-hover:scale-150 transition-all duration-700 blur-2xl rounded-full pointer-events-none" />
            
            <div className="relative w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:shadow-lg group-hover:shadow-red-600/30 group-hover:scale-110 transition-all duration-500">
              <Phone size={24} className="text-red-600 group-hover:text-white transition-colors duration-500" />
            </div>
            <span className="text-xs sm:text-sm font-black uppercase tracking-[3px] text-zinc-500 group-hover:text-red-500 transition-colors duration-500 mb-2">
              Telefon
            </span>
            <span className="text-zinc-900 font-space font-bold text-xl sm:text-2xl group-hover:text-red-600 transition-colors duration-500">
              {phoneNumber}
            </span>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href={`https://wa.me/${whatsappNumber.replace(/\s+/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group relative flex flex-col items-center text-center p-8 sm:p-10 bg-white border border-zinc-200 rounded-[2rem] hover:border-red-300 hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.1)] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-[0.03] scale-50 group-hover:scale-150 transition-all duration-700 blur-2xl rounded-full pointer-events-none" />
            
            <div className="relative w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:shadow-lg group-hover:shadow-red-600/30 group-hover:scale-110 transition-all duration-500">
              <MessageCircle size={24} className="text-red-600 group-hover:text-white transition-colors duration-500" />
            </div>
            <span className="text-xs sm:text-sm font-black uppercase tracking-[3px] text-zinc-500 group-hover:text-red-500 transition-colors duration-500 mb-2">
              WhatsApp
            </span>
            <span className="text-zinc-900 font-space font-bold text-xl sm:text-2xl group-hover:text-red-600 transition-colors duration-500">
              Napisz do nas
            </span>
          </motion.a>

        </div>

        {/* ── Subtelny Footer (Social Media & Lokalizacja) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-zinc-100"
        >
          {/* Lokalizacja */}
          <div className="flex items-center gap-3 text-zinc-500">
            <MapPin size={18} className="text-zinc-400" />
            <span className="text-sm font-medium">Leuven • Heverlee • Herent i okolice</span>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-5">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Śledź nas</span>
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#1877F2] transition-colors">
              <Facebook size={20} />
            </a>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#E1306C] transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
