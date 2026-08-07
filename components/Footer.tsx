import Link from "next/link";
import type { ContactContent, SiteInfo } from "@/lib/types";

export default function Footer({ site, contact }: { site: SiteInfo; contact: ContactContent }) {
  const [firstName, ...rest] = site.name.split(" ");
  const restName = rest.join(" ");

  return (
    <footer className="relative border-t border-line mt-32">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="font-display text-2xl font-semibold mb-3">
            {firstName}<span className="text-accent">{restName ? ` ${restName}` : ""}</span>
          </div>
          <p className="text-white/50 text-sm max-w-sm leading-relaxed">
            {site.footerTagline}
          </p>
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
            <li><a href={contact.whatsapp} target="_blank" className="hover:text-white transition-colors">WhatsApp</a></li>
            <li><a href={contact.instagram} target="_blank" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href={contact.linkedin} target="_blank" className="hover:text-white transition-colors">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <Link href="/admin" className="hover:text-white/60 transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
