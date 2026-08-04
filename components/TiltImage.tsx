"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function TiltImage({
  src,
  name,
}: {
  src: string;
  name: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 22;
    const rotateX = (0.5 - py) * 22;
    setRot({ x: rotateX, y: rotateY });
    setGlare({ x: px * 100, y: py * 100, opacity: 0.25 });
  };

  const reset = () => {
    setRot({ x: 0, y: 0 });
    setGlare((g) => ({ ...g, opacity: 0 }));
  };

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="[perspective:1200px]" onMouseMove={handleMove} onMouseLeave={reset}>
      <motion.div
        ref={ref}
        animate={{ rotateX: rot.x, rotateY: rot.y }}
        transition={{ type: "spring", stiffness: 150, damping: 14 }}
        className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-[2rem] overflow-hidden glass-strong [transform-style:preserve-3d]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={name} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/30 to-accent2/30">
            <span className="font-display text-6xl font-semibold text-white/80">{initials}</span>
          </div>
        )}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.6), transparent 55%)`,
          }}
        />
        <div className="absolute inset-0 rounded-[2rem] ring-1 ring-white/10" />
      </motion.div>
    </div>
  );
}
