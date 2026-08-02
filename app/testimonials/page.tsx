import { getContent } from "@/lib/data";
import PageShell from "@/components/PageShell";
import RevealSection from "@/components/RevealSection";
import TestimonialCard from "@/components/TestimonialCard";

export const metadata = { title: "Testimonials — SONU SINGH RATHORE" };

export default async function TestimonialsPage() {
  const content = await getContent();

  return (
    <PageShell contact={content.contact}>
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <RevealSection className="mb-16 text-center">
          <div className="text-xs uppercase tracking-widest text-accent mb-4">Testimonials</div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight max-w-2xl mx-auto">
            Don&apos;t just take my word for it.
          </h1>
        </RevealSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.testimonials.map((t, i) => (
            <TestimonialCard key={t.id} t={t} index={i} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
