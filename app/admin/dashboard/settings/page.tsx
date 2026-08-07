"use client";

import { useEffect, useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import type { SiteContent } from "@/lib/types";

const TABS = ["Site & Hero", "About", "Services", "Testimonials", "Contact"] as const;

export default function SettingsPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState<(typeof TABS)[number]>("About");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetch("/api/content").then((r) => r.json()).then(setContent);
  }, []);

  const publish = async () => {
    if (!content) return;
    setSaving(true);
    await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setToast("Changes published to the live site");
    setTimeout(() => setToast(""), 2500);
    window.dispatchEvent(new Event("content-updated"));
  };

  if (!content) return <div className="text-white/40 text-sm">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold mb-1">Settings</h1>
          <p className="text-white/40 text-sm">Edit content across the site.</p>
        </div>
        <button
          onClick={publish}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-white text-black text-sm font-medium px-5 py-2.5 hover:bg-white/90 transition-all disabled:opacity-50"
        >
          <Save size={16} /> {saving ? "Publishing..." : "Save & Publish"}
        </button>
      </div>

      {toast && (
        <div className="mb-6 text-sm bg-accent/10 border border-accent/30 text-accent rounded-xl px-4 py-3">
          {toast}
        </div>
      )}

      <div className="flex gap-2 mb-8 border-b border-line">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm border-b-2 transition-colors -mb-px ${
              tab === t ? "border-accent text-white" : "border-transparent text-white/40 hover:text-white/70"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Site & Hero" && (
        <div className="glass rounded-2xl p-8 space-y-5 max-w-2xl">
          <Field label="Site Name (logo, footer, copyright)">
            <input
              value={content.site.name}
              onChange={(e) => setContent({ ...content, site: { ...content.site, name: e.target.value } })}
              className={inputClass}
            />
          </Field>
          <Field label="Availability Badge (top of hero)">
            <input
              value={content.site.availabilityBadge}
              onChange={(e) => setContent({ ...content, site: { ...content.site, availabilityBadge: e.target.value } })}
              className={inputClass}
            />
          </Field>
          <Field label="Hero Heading — Main part">
            <textarea
              rows={2}
              value={content.site.heroHeadingMain}
              onChange={(e) => setContent({ ...content, site: { ...content.site, heroHeadingMain: e.target.value } })}
              className={inputClass}
            />
          </Field>
          <Field label="Hero Heading — Highlighted / gradient part">
            <input
              value={content.site.heroHeadingAccent}
              onChange={(e) => setContent({ ...content, site: { ...content.site, heroHeadingAccent: e.target.value } })}
              className={inputClass}
            />
          </Field>
          <Field label="Hero Pitch (subtitle under heading)">
            <textarea
              rows={3}
              value={content.site.heroPitch}
              onChange={(e) => setContent({ ...content, site: { ...content.site, heroPitch: e.target.value } })}
              className={inputClass}
            />
          </Field>
          <Field label="Footer Tagline">
            <textarea
              rows={2}
              value={content.site.footerTagline}
              onChange={(e) => setContent({ ...content, site: { ...content.site, footerTagline: e.target.value } })}
              className={inputClass}
            />
          </Field>
        </div>
      )}

      {tab === "About" && (
        <div className="glass rounded-2xl p-8 space-y-5 max-w-2xl">
          <Field label="Headline">
            <textarea
              rows={2}
              value={content.about.headline}
              onChange={(e) => setContent({ ...content, about: { ...content.about, headline: e.target.value } })}
              className={inputClass}
            />
          </Field>
          <Field label="Bio">
            <textarea
              rows={5}
              value={content.about.bio}
              onChange={(e) => setContent({ ...content, about: { ...content.about, bio: e.target.value } })}
              className={inputClass}
            />
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Years Experience">
              <input type="number" value={content.about.yearsExperience} onChange={(e) => setContent({ ...content, about: { ...content.about, yearsExperience: Number(e.target.value) } })} className={inputClass} />
            </Field>
            <Field label="Projects Completed">
              <input type="number" value={content.about.projectsCompleted} onChange={(e) => setContent({ ...content, about: { ...content.about, projectsCompleted: Number(e.target.value) } })} className={inputClass} />
            </Field>
            <Field label="Happy Clients">
              <input type="number" value={content.about.happyClients} onChange={(e) => setContent({ ...content, about: { ...content.about, happyClients: Number(e.target.value) } })} className={inputClass} />
            </Field>
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest text-white/40 mb-3 block">Skills</label>
            <div className="space-y-3">
              {content.about.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-3">
                  <input
                    value={skill.name}
                    onChange={(e) => {
                      const skills = [...content.about.skills];
                      skills[i] = { ...skills[i], name: e.target.value };
                      setContent({ ...content, about: { ...content.about, skills } });
                    }}
                    className={`${inputClass} flex-1`}
                  />
                  <input
                    type="number"
                    value={skill.level}
                    onChange={(e) => {
                      const skills = [...content.about.skills];
                      skills[i] = { ...skills[i], level: Number(e.target.value) };
                      setContent({ ...content, about: { ...content.about, skills } });
                    }}
                    className={`${inputClass} w-20`}
                  />
                  <button
                    onClick={() => {
                      const skills = content.about.skills.filter((_, idx) => idx !== i);
                      setContent({ ...content, about: { ...content.about, skills } });
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  setContent({
                    ...content,
                    about: { ...content.about, skills: [...content.about.skills, { name: "New Skill", level: 80 }] },
                  })
                }
                className="text-sm text-accent inline-flex items-center gap-1"
              >
                <Plus size={14} /> Add skill
              </button>
            </div>
          </div>
        </div>
      )}

      {tab === "Services" && (
        <div className="space-y-4 max-w-2xl">
          {content.services.map((s, i) => (
            <div key={s.id} className="glass rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <input
                  value={s.title}
                  onChange={(e) => {
                    const services = [...content.services];
                    services[i] = { ...services[i], title: e.target.value };
                    setContent({ ...content, services });
                  }}
                  className={`${inputClass} font-medium`}
                />
                <button
                  onClick={() => setContent({ ...content, services: content.services.filter((_, idx) => idx !== i) })}
                  className="text-red-400 hover:text-red-300 ml-3"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <textarea
                rows={2}
                value={s.description}
                onChange={(e) => {
                  const services = [...content.services];
                  services[i] = { ...services[i], description: e.target.value };
                  setContent({ ...content, services });
                }}
                className={inputClass}
              />
              <input
                value={s.price}
                onChange={(e) => {
                  const services = [...content.services];
                  services[i] = { ...services[i], price: e.target.value };
                  setContent({ ...content, services });
                }}
                className={inputClass}
                placeholder="Starting price"
              />
            </div>
          ))}
          <button
            onClick={() =>
              setContent({
                ...content,
                services: [
                  ...content.services,
                  { id: `svc-${Date.now()}`, title: "New Service", description: "", price: "From $0", features: [], icon: "Film" },
                ],
              })
            }
            className="text-sm text-accent inline-flex items-center gap-1"
          >
            <Plus size={14} /> Add service
          </button>
        </div>
      )}

      {tab === "Testimonials" && (
        <div className="space-y-4 max-w-2xl">
          {content.testimonials.map((t, i) => (
            <div key={t.id} className="glass rounded-2xl p-6 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <input
                  value={t.name}
                  onChange={(e) => {
                    const testimonials = [...content.testimonials];
                    testimonials[i] = { ...testimonials[i], name: e.target.value };
                    setContent({ ...content, testimonials });
                  }}
                  className={`${inputClass} font-medium`}
                />
                <button
                  onClick={() => setContent({ ...content, testimonials: content.testimonials.filter((_, idx) => idx !== i) })}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <input
                value={t.role}
                onChange={(e) => {
                  const testimonials = [...content.testimonials];
                  testimonials[i] = { ...testimonials[i], role: e.target.value };
                  setContent({ ...content, testimonials });
                }}
                className={inputClass}
                placeholder="Role / company"
              />
              <textarea
                rows={2}
                value={t.quote}
                onChange={(e) => {
                  const testimonials = [...content.testimonials];
                  testimonials[i] = { ...testimonials[i], quote: e.target.value };
                  setContent({ ...content, testimonials });
                }}
                className={inputClass}
              />
            </div>
          ))}
          <button
            onClick={() =>
              setContent({
                ...content,
                testimonials: [
                  ...content.testimonials,
                  { id: `t-${Date.now()}`, name: "New Client", role: "Role", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop", rating: 5, quote: "" },
                ],
              })
            }
            className="text-sm text-accent inline-flex items-center gap-1"
          >
            <Plus size={14} /> Add testimonial
          </button>
        </div>
      )}

      {tab === "Contact" && (
        <div className="glass rounded-2xl p-8 space-y-5 max-w-2xl">
          <Field label="Email">
            <input value={content.contact.email} onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })} className={inputClass} />
          </Field>
          <Field label="WhatsApp Link">
            <input value={content.contact.whatsapp} onChange={(e) => setContent({ ...content, contact: { ...content.contact, whatsapp: e.target.value } })} className={inputClass} />
          </Field>
          <Field label="Instagram Link">
            <input value={content.contact.instagram} onChange={(e) => setContent({ ...content, contact: { ...content.contact, instagram: e.target.value } })} className={inputClass} />
          </Field>
          <Field label="LinkedIn Link">
            <input value={content.contact.linkedin} onChange={(e) => setContent({ ...content, contact: { ...content.contact, linkedin: e.target.value } })} className={inputClass} />
          </Field>
          <Field label="Resume URL">
            <input value={content.contact.resumeUrl} onChange={(e) => setContent({ ...content, contact: { ...content.contact, resumeUrl: e.target.value } })} className={inputClass} />
          </Field>
        </div>
      )}
    </div>
  );
}

const inputClass = "w-full bg-white/5 border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">{label}</label>
      {children}
    </div>
  );
}
