import Link from "next/link";
import { Check, Film, Gem, Image as ImageIcon, Layers, PenTool, Sparkles } from "lucide-react";
import { getContent } from "@/lib/data";
import PageShell from "@/components/PageShell";
import RevealSection from "@/components/RevealSection";

export const dynamic = "force-dynamic";

export const metadata = { title: "Services & Pricing " };

const ICONS: Record<string, any> = { Film, Sparkles, Image: ImageIcon, PenTool, Gem, Layers };

export default async function ServicesPage() {
  const content = await getContent();

  return (
    <PageShell about={content.about} contact={content.contact}>
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <RevealSection className="mb-16 text-center">
          <div className="text-xs uppercase tracking-widest text-accent mb-4">Services</div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight max-w-2xl mx-auto">
            Everything you need to look world-class.
          </h1>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Transparent starting prices. Every project gets a custom quote based on scope — reach out for an exact number.
          </p>
        </RevealSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.services.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Film;
            return (
              <RevealSection key={s.id} delay={(i % 3) * 0.1}>
                <div className="glass rounded-2xl p-8 h-full flex flex-col hover:bg-white/[0.06] transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-medium mb-2">{s.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">{s.description}</p>
                  <ul className="space-y-2 mb-6">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                        <Check size={14} className="text-accent mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4 border-t border-line flex items-center justify-between">
                    <span className="font-display text-lg font-semibold gradient-text">{s.price}</span>
                    <Link href="/contact" className="text-xs text-white/60 hover:text-white">
                      Get quote →
                    </Link>
                  </div>
                </div>
              </RevealSection>
            );
          })}
        </div>

        <RevealSection delay={0.2} className="mt-20 glass-strong rounded-3xl p-12 text-center">
          <h2 className="font-display text-2xl font-semibold mb-3">Need something custom?</h2>
          <p className="text-white/50 mb-6 max-w-md mx-auto">
            Bundle multiple services or set up an ongoing retainer — every plan is built around your content schedule.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-accent text-black text-sm font-semibold shadow-[0_0_20px_rgba(0,255,135,0.3)] hover:shadow-[0_0_30px_rgba(0,255,135,0.5)] px-7 py-3.5 transition-all"
          >
            Let&apos;s talk
          </Link>
        </RevealSection>
      </section>
    </PageShell>
  );
}
