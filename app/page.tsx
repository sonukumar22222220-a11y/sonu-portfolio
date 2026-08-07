import Link from "next/link";
import { ArrowRight, Film, PenTool, Sparkles } from "lucide-react";
import { getContent } from "@/lib/data";
import PageShell from "@/components/PageShell";
import Hero from "@/components/Hero";
import RevealSection from "@/components/RevealSection";
import ProjectCard from "@/components/ProjectCard";
import TestimonialCard from "@/components/TestimonialCard";

export default async function HomePage() {
  const content = await getContent();
  const featured = content.projects.filter((p) => p.featured).slice(0, 3);

  return (
    <PageShell site={content.site} contact={content.contact}>
      <Hero site={content.site} />

      {/* Marquee */}
      <RevealSection className="border-y border-line py-6 overflow-hidden">
        <div className="marquee-track gap-16 text-white/25 text-sm tracking-widest uppercase font-medium">
          {Array.from({ length: 2 }).flatMap(() =>
            ["Video Editing", "Motion Graphics", "Thumbnail Design", "Branding", "Social Media", "Graphic Design"]
          ).map((item, i) => (
            <span key={i} className="whitespace-nowrap">{item} ✦</span>
          ))}
        </div>
      </RevealSection>

      {/* Intro / stats */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <RevealSection>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">
              {content.about.headline}
            </h2>
            <p className="mt-6 text-white/50 leading-relaxed">{content.about.bio}</p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm text-accent group"
            >
              More about me
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </RevealSection>

          <RevealSection delay={0.15} className="grid grid-cols-2 gap-4">
            {[
              { label: "Years Experience", value: content.about.yearsExperience },
              { label: "Projects Completed", value: content.about.projectsCompleted },
              { label: "Happy Clients", value: content.about.happyClients },
              { label: "5-Star Reviews", value: content.testimonials.length },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-6 hover:bg-white/[0.06] transition-colors">
                <div className="font-display text-3xl font-semibold gradient-text">{stat.value}+</div>
                <div className="text-xs text-white/40 mt-2">{stat.label}</div>
              </div>
            ))}
          </RevealSection>
        </div>
      </section>

      {/* Featured Work */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <RevealSection className="flex items-end justify-between mb-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-accent mb-3">Selected Work</div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Featured Projects</h2>
          </div>
          <Link href="/portfolio" className="hidden sm:inline-flex items-center gap-2 text-sm text-white/60 hover:text-white group">
            View all
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </RevealSection>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <RevealSection className="text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-accent mb-3">What I Do</div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Services built to perform</h2>
        </RevealSection>

        <div className="grid md:grid-cols-3 gap-6">
          {content.services.slice(0, 3).map((s, i) => (
            <RevealSection key={s.id} delay={i * 0.1}>
              <div className="glass rounded-2xl p-8 h-full hover:bg-white/[0.06] transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  {i === 0 && <Film size={20} className="text-accent" />}
                  {i === 1 && <Sparkles size={20} className="text-accent" />}
                  {i === 2 && <PenTool size={20} className="text-accent" />}
                </div>
                <h3 className="font-display text-xl font-medium mb-3">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{s.description}</p>
                <div className="text-accent text-sm font-medium">{s.price}</div>
              </div>
            </RevealSection>
          ))}
        </div>

        <RevealSection className="text-center mt-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white group">
            View all services
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </RevealSection>
      </section>

      {/* Testimonials preview */}
      <section className="max-w-7xl mx-auto px-6 py-16 pb-32">
        <RevealSection className="text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-accent mb-3">Testimonials</div>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Clients love the results</h2>
        </RevealSection>
        <div className="grid md:grid-cols-3 gap-6">
          {content.testimonials.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-32">
        <RevealSection className="glass-strong rounded-3xl p-12 sm:p-20 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-accent/20 blur-[100px]" />
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight relative">
            Got a project in mind? <span className="gradient-text">Let&apos;s make it unforgettable.</span>
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-black text-sm font-medium px-7 py-3.5 hover:bg-white/90 transition-all relative"
          >
            Start a project
            <ArrowRight size={16} />
          </Link>
        </RevealSection>
      </section>
    </PageShell>
  );
}
