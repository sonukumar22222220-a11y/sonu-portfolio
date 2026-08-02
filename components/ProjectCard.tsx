"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Project } from "@/lib/types";

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        data-cursor-hover
        onMouseEnter={() => {
          setHovered(true);
          videoRef.current?.play().catch(() => {});
        }}
        onMouseLeave={() => {
          setHovered(false);
          videoRef.current?.pause();
        }}
        className={`group relative block overflow-hidden rounded-2xl glass aspect-[4/3] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hovered ? "-translate-y-1.5 shadow-[0_0_32px_6px_rgba(168,85,247,0.25)] border-purple-400/30" : ""
        }`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              hovered ? "scale-110 opacity-0" : "scale-100 opacity-100"
            }`}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {project.videoUrl && (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="metadata"
              src={project.videoUrl}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                hovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {project.videoUrl && (
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              hovered ? "opacity-0" : "opacity-70 group-hover:opacity-0"
            }`}
          >
            <div className="w-14 h-14 rounded-full glass-strong flex items-center justify-center">
              <Play size={18} className="fill-white ml-0.5" />
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="text-xs uppercase tracking-widest text-accent mb-1">{project.category}</div>
          <div className="font-display text-lg font-medium text-white">{project.title}</div>
        </div>
      </Link>
    </motion.div>
  );
}
