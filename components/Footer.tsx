import Link from "next/link";
import { Download } from "lucide-react";
import type { AboutContent, ContactContent } from "@/lib/types";

export default function Footer({ about, contact }: { about: AboutContent; contact: ContactContent }) {
  return (
    <footer className="relative border-t border-line mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="font-display text-2xl font-semibold mb-3">{about.name}</div>
          <p className="text-white/50 text-sm max-w-sm leading-relaxed">{about.headline}</p>
          {contact.resumeUrl && (
            <a
              href={contact.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full glass text-white text-xs font-medium px-4 py-2 hover:bg-white/10 transition-all"
            >
              <Download size={14} />
              Download Resume
            </a>
          )}
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/40 mb-4">Navigate</div>
          <ul className="space-y-2 text-sm text-white/60">
            <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link href="/testimonials" className="hover:text-white transition-colors">Testimonials</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-white/40 mb-4">Connect</div>
          <ul className="space-y-2 text-sm text-white/60">
            <li><a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">Email</a></li>
            {contact.phone && <li><a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">{contact.phone}</a></li>}
            <li><a href={contact.whatsapp} target="_blank" className="hover:text-white transition-colors">WhatsApp</a></li>
            <li><a href={contact.instagram} target="_blank" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href={contact.linkedin} target="_blank" className="hover:text-white transition-colors">LinkedIn</a></li>
            {contact.youtube && <li><a href={contact.youtube} target="_blank" className="hover:text-white transition-colors">YouTube</a></li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>© {new Date().getFullYear()} {about.name.toUpperCase()}. All rights reserved.</span>
          <Link href="/admin" className="hover:text-white/60 transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
