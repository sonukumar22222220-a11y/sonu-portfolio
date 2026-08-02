"use client";

import { useEffect, useRef, useState } from "react";

// Neon-purple glowing cursor that follows the mouse with smooth inertia and
// expands + glows brighter whenever it passes over anything interactive
// (buttons, links, portfolio cards — anything with [data-cursor-hover] or a
// native <a>/<button>).
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let mouseX = 0,
      mouseY = 0;
    let glowX = 0,
      glowY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot tracks the raw cursor position instantly (no lag)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    // The glow ring eases toward the cursor position every frame — this is
    // what gives it "smooth inertia" instead of snapping to the mouse.
    let raf: number;
    const animate = () => {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMove);

    // Detect hover over anything interactive: native links/buttons, or any
    // element explicitly opted in with data-cursor-hover (used on portfolio
    // cards, custom buttons, etc).
    const interactiveSelector =
      "a, button, [role='button'], input, textarea, select, [data-cursor-hover]";

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelector)) setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(interactiveSelector)) setHovering(false);
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot-neon" />
      <div
        ref={glowRef}
        className={`cursor-glow-neon ${hovering ? "cursor-glow-neon--active" : ""}`}
      />
    </>
  );
}
