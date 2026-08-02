"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";

export default function TestimonialCard({ t, index = 0 }: { t: Testimonial; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="glass rounded-2xl p-8 flex flex-col gap-5 hover:bg-white/[0.06] transition-colors"
    >
      <div className="flex gap-1">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} size={14} className="fill-accent text-accent" />
        ))}
      </div>
      <p className="text-white/80 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-line">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image src={t.avatar} alt={t.name} fill className="object-cover" />
        </div>
        <div>
          <div className="text-sm font-medium text-white">{t.name}</div>
          <div className="text-xs text-white/40">
            {t.role}{t.company ? ` · ${t.company}` : ""}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
