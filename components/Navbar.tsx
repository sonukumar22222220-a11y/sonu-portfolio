"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({ name = "SONU KUMAR" }: { name?: string }) {
  const parts = name.trim().split(" ");
  const firstPart = parts.slice(0, -1).join(" ") || parts[0];
  const lastPart = parts.length > 1 ? parts[parts.length - 1] : "";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-6 transition-all duration-300 ${
            scrolled ? "glass-strong py-3" : "py-2"
          }`}
        >
          <Link href="/" className="font-display text-lg font-semibold tracking-tight">
            {firstPart}{lastPart && <span className="text-accent"> {lastPart}</span>}
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm transition-colors relative group ${
                  pathname === l.href ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="hidden md:inline-flex items-center rounded-full bg-accent text-black text-sm font-semibold px-5 py-2.5 shadow-[0_0_18px_rgba(0,255,135,0.3)] hover:shadow-[0_0_28px_rgba(0,255,135,0.5)] transition-all"
          >
            Hire Me
          </Link>

          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`h-px bg-white transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-px bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`h-px bg-white transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="md:hidden glass-strong mt-2 rounded-2xl px-6 py-4 flex flex-col gap-4"
          >
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white/80 text-sm">
                {l.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="text-accent text-sm font-medium">
              Hire Me →
            </Link>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
