import { Mail, MessageCircle, Instagram, Linkedin, Download } from "lucide-react";
import { getContent } from "@/lib/data";
import PageShell from "@/components/PageShell";
import RevealSection from "@/components/RevealSection";
import ContactForm from "./ContactForm";

export const dynamic = "force-dynamic";

export const metadata = { title: "Contact — SONU SINGH RATHORE" };

export default async function ContactPage() {
  const content = await getContent();
  const { contact } = content;

  const links = [
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat now", href: contact.whatsapp },
    { icon: Instagram, label: "Instagram", value: "@yourhandle", href: contact.instagram },
    { icon: Linkedin, label: "LinkedIn", value: "Connect", href: contact.linkedin },
  ];

  return (
    <PageShell contact={contact}>
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <RevealSection className="mb-16">
          <div className="text-xs uppercase tracking-widest text-accent mb-4">Contact</div>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight max-w-2xl">
            Let&apos;s build something people can&apos;t scroll past.
          </h1>
        </RevealSection>

        <div className="grid lg:grid-cols-5 gap-10">
          <RevealSection delay={0.1} className="lg:col-span-2 space-y-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                className="flex items-center gap-4 glass rounded-2xl p-5 hover:bg-white/[0.06] transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <l.icon size={18} className="text-accent" />
                </div>
                <div>
                  <div className="text-xs text-white/40">{l.label}</div>
                  <div className="text-sm text-white">{l.value}</div>
                </div>
              </a>
            ))}

            <a
              href={contact.resumeUrl}
              download
              className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-line p-5 text-sm text-white/60 hover:text-white hover:border-white/30 transition-colors"
            >
              <Download size={16} />
              Download Resume
            </a>
          </RevealSection>

          <RevealSection delay={0.15} className="lg:col-span-3">
            <ContactForm />
          </RevealSection>
        </div>
      </section>
    </PageShell>
  );
}
