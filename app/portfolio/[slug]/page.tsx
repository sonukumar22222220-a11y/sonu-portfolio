import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getContent } from "@/lib/data";
import PageShell from "@/components/PageShell";
import RevealSection from "@/components/RevealSection";
import BeforeAfterSlider from "./BeforeAfterSlider";

export async function generateStaticParams() {
  const content = await getContent();
  return content.projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const content = await getContent();
  const project = content.projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return (
    <PageShell contact={content.contact}>
      <article className="max-w-5xl mx-auto px-6 pb-32">
        <RevealSection>
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-8">
            <ArrowLeft size={16} /> Back to portfolio
          </Link>
          <div className="text-xs uppercase tracking-widest text-accent mb-4">{project.category}</div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight max-w-2xl">
            {project.title}
          </h1>
        </RevealSection>

        <RevealSection delay={0.1} className="mt-10 rounded-3xl overflow-hidden glass relative aspect-video">
          {project.videoUrl ? (
            <video src={project.videoUrl} controls className="w-full h-full object-cover" />
          ) : (
            <Image src={project.coverImage} alt={project.title} fill className="object-cover" />
          )}
        </RevealSection>

        {project.beforeImage && project.afterImage && (
          <RevealSection delay={0.15} className="mt-10">
            <h2 className="font-display text-xl font-medium mb-4">Before & After</h2>
            <BeforeAfterSlider before={project.beforeImage} after={project.afterImage} />
          </RevealSection>
        )}

        <RevealSection delay={0.2} className="mt-16 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="font-display text-xl font-medium mb-4">Project Overview</h2>
            <p className="text-white/60 leading-relaxed">{project.description}</p>
          </div>
          <div className="space-y-6">
            {project.client && (
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Client</div>
                <div className="text-white">{project.client}</div>
              </div>
            )}
            {project.result && (
              <div>
                <div className="text-xs uppercase tracking-widest text-white/40 mb-1">Result</div>
                <div className="text-accent font-medium">{project.result}</div>
              </div>
            )}
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40 mb-2">Software Used</div>
              <div className="flex flex-wrap gap-2">
                {project.software.map((s) => (
                  <span key={s} className="text-xs glass rounded-full px-3 py-1 text-white/70">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection delay={0.25} className="mt-24 text-center glass-strong rounded-3xl p-12">
          <h2 className="font-display text-2xl font-semibold mb-4">Like what you see?</h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white text-black text-sm font-medium px-7 py-3.5 hover:bg-white/90 transition-all"
          >
            Start your project
          </Link>
        </RevealSection>
      </article>
    </PageShell>
  );
}
