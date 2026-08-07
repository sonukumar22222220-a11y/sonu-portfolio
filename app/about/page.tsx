import { getContent } from "@/lib/data";
import PageShell from "@/components/PageShell";
import RevealSection from "@/components/RevealSection";

export const metadata = { title: "About — SONU SINGH RATHORE" };

export default async function AboutPage() {
  const content = await getContent();
  const { about } = content;

  return (
    <PageShell site={content.site} contact={content.contact}>
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <RevealSection>
          <div className="text-xs uppercase tracking-widest text-accent mb-4">About Me</div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight leading-tight max-w-3xl">
            {about.headline}
          </h1>
          <p className="mt-8 text-white/50 leading-relaxed max-w-2xl text-lg">{about.bio}</p>
        </RevealSection>

        <RevealSection delay={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {[
            { label: "Years Experience", value: about.yearsExperience },
            { label: "Projects Completed", value: about.projectsCompleted },
            { label: "Happy Clients", value: about.happyClients },
            { label: "Avg. Rating", value: "5.0" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-6 text-center hover:bg-white/[0.06] transition-colors">
              <div className="font-display text-3xl font-semibold gradient-text">{stat.value}</div>
              <div className="text-xs text-white/40 mt-2">{stat.label}</div>
            </div>
          ))}
        </RevealSection>

        <RevealSection delay={0.15} className="mt-24">
          <h2 className="font-display text-2xl font-semibold mb-10">Skills & Expertise</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {about.skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/80">{skill.name}</span>
                  <span className="text-white/40">{skill.level}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent2"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection delay={0.2} className="mt-24 grid md:grid-cols-3 gap-6">
          {[
            { title: "Process", desc: "Discovery call, scope, edit or design in tight feedback loops, final delivery — every project moves in clear, predictable steps." },
            { title: "Tools", desc: "Premiere Pro, DaVinci Resolve, After Effects, Photoshop, Illustrator, Figma — the right tool for the job, every time." },
            { title: "Turnaround", desc: "Most short-form edits and design assets are delivered within 24–72 hours, with clear communication throughout." },
          ].map((card) => (
            <div key={card.title} className="glass rounded-2xl p-8 hover:bg-white/[0.06] transition-colors">
              <h3 className="font-display text-lg font-medium mb-3">{card.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </RevealSection>
      </section>
    </PageShell>
  );
}
