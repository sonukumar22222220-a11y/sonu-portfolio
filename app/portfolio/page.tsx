import { getContent } from "@/lib/data";
import PageShell from "@/components/PageShell";
import RevealSection from "@/components/RevealSection";
import PortfolioGrid from "./PortfolioGrid";

export const metadata = { title: "Portfolio — SONU SINGH RATHORE" };

export default async function PortfolioPage() {
  const content = await getContent();

  return (
    <PageShell site={content.site} contact={content.contact}>
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <RevealSection className="mb-12">
          <div className="text-xs uppercase tracking-widest text-accent mb-4">Portfolio</div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight max-w-2xl">
            Work that speaks for itself.
          </h1>
        </RevealSection>

        <PortfolioGrid projects={content.projects} />
      </section>
    </PageShell>
  );
}
