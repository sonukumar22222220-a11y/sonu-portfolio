"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Download, Instagram, Linkedin, Youtube, Mail } from "lucide-react";
import TiltImage from "./TiltImage";
import type { AboutContent, ContactContent } from "@/lib/types";

export default function Hero({ about, contact }: { about: AboutContent; contact: ContactContent }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg to-surface" />
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/20 blur-[120px]"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent2/20 blur-[120px]"
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto pt-24 grid md:grid-cols-[1.3fr_auto] gap-16 items-center">
        <div className="text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 text-xs text-white/70"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-glow" />
            Available for freelance projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]"
          >
            {about.name}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-3 text-lg sm:text-xl text-accent font-medium"
          >
            {about.role}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg text-white/50 max-w-2xl mx-auto md:mx-0"
          >
            {about.headline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
          >
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 rounded-full bg-white text-black text-sm font-medium px-7 py-3.5 hover:bg-white/90 transition-all"
            >
              <Play size={16} className="fill-black" />
              View Portfolio
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full glass text-white text-sm font-medium px-7 py-3.5 hover:bg-white/10 transition-all"
            >
              Hire Me
            </Link>
            {contact.resumeUrl && (
              <a
                href={contact.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass text-white text-sm font-medium px-7 py-3.5 hover:bg-white/10 transition-all"
              >
                <Download size={16} />
                Download Resume
              </a>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-8 flex items-center justify-center md:justify-start gap-4"
          >
            {contact.email && (
              <a href={`mailto:${contact.email}`} aria-label="Email" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <Mail size={16} />
              </a>
            )}
            {contact.instagram && (
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <Instagram size={16} />
              </a>
            )}
            {contact.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <Linkedin size={16} />
              </a>
            )}
            {contact.youtube && (
              <a href={contact.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <Youtube size={16} />
              </a>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block"
        >
          <TiltImage src={about.profileImage} name={about.name} />
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-widest uppercase"
      >
        Scroll
      </motion.div>
    </section>
  );
}
