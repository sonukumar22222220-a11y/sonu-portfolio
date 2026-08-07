"use client";

import { useEffect, useState } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import type { SiteContent } from "@/lib/types";

const TABS = ["About", "Experience", "Services", "Testimonials", "Contact"] as const;

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
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setToast(`Save failed (${res.status}): ${err.error || "Unknown error"}`);
        setSaving(false);
        setTimeout(() => setToast(""), 5000);
        return;
      }
      setToast("Changes published to the live site");
    } catch (e) {
      setToast(`Save failed: ${(e as Error).message}`);
    } finally {
      setSaving(false);
      setTimeout(() => setToast(""), 5000);
    }
  };

  if (!content) return <div className="text-white/40 text-sm">Loading...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold mb-1">Settings</h1>
          <p className="text-white/40 text-sm">Edit content across the site.</p>
        </div>
        <button
          onClick={publish}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-accent text-black text-sm font-semibold shadow-[0_0_20px_rgba(0,255,135,0.3)] hover:shadow-[0_0_30px_rgba(0,255,135,0.5)] px-5 py-2.5 transition-all disabled:opacity-50"
        >
          <Save size={16} /> {saving ? "Publishing..." : "Save & Publish"}
        </button>
      </div>

      {toast && (
        <div className="mb-6 text-sm bg-accent/10 border border-accent/30 text-accent rounded-xl px-4 py-3">
          {toast}
        </div>
      )}

      <div className="flex gap-2 mb-8 border-b border-line overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm border-b-2 transition-colors -mb-px whitespace-nowrap ${
              tab === t ? "border-accent text-white" : "border-transparent text-white/40 hover:text-white/70"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "About" && (
        <div className="glass rounded-2xl p-8 space-y-5 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Full Name">
              <input value={content.about.name} onChange={(e) => setContent({ ...content, about: { ...content.about, name: e.target.value } })} className={inputClass} />
            </Field>
            <Field label="Role / Title">
              <input value={content.about.role} onChange={(e) => setContent({ ...content, about: { ...content.about, role: e.target.value } })} className={inputClass} />
            </Field>
          </div>
          <Field label="Profile Image URL (upload via Media Library, paste link here)">
            <input value={content.about.profileImage} onChange={(e) => setContent({ ...content, about: { ...content.about, profileImage: e.target.value } })} className={inputClass} placeholder="https://res.cloudinary.com/.../photo.jpg" />
          </Field>
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

      {tab === "Experience" && (
        <div className="space-y-8 max-w-2xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-medium">Work Experience</h3>
            </div>
            <div className="space-y-4">
              {content.about.experience.map((exp, i) => (
                <div key={exp.id} className="glass rounded-2xl p-6 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <input
                      value={exp.role}
                      onChange={(e) => {
                        const experience = [...content.about.experience];
                        experience[i] = { ...experience[i], role: e.target.value };
                        setContent({ ...content, about: { ...content.about, experience } });
                      }}
                      className={`${inputClass} font-medium`}
                      placeholder="Role"
                    />
                    <button
                      onClick={() => {
                        const experience = content.about.experience.filter((_, idx) => idx !== i);
                        setContent({ ...content, about: { ...content.about, experience } });
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      value={exp.company}
                      onChange={(e) => {
                        const experience = [...content.about.experience];
                        experience[i] = { ...experience[i], company: e.target.value };
                        setContent({ ...content, about: { ...content.about, experience } });
                      }}
                      className={inputClass}
                      placeholder="Company"
                    />
                    <input
                      value={exp.duration}
                      onChange={(e) => {
                        const experience = [...content.about.experience];
                        experience[i] = { ...experience[i], duration: e.target.value };
                        setContent({ ...content, about: { ...content.about, experience } });
                      }}
                      className={inputClass}
                      placeholder="e.g. April 2025 – Present"
                    />
                  </div>
                  <textarea
                    rows={4}
                    value={exp.points.join("\n")}
                    onChange={(e) => {
                      const experience = [...content.about.experience];
                      experience[i] = { ...experience[i], points: e.target.value.split("\n").filter(Boolean) };
                      setContent({ ...content, about: { ...content.about, experience } });
                    }}
                    className={inputClass}
                    placeholder="One responsibility per line"
                  />
                </div>
              ))}
              <button
                onClick={() =>
                  setContent({
                    ...content,
                    about: {
                      ...content.about,
                      experience: [
                        ...content.about.experience,
                        { id: `exp-${Date.now()}`, role: "New Role", company: "Company", duration: "", points: [] },
                      ],
                    },
                  })
                }
                className="text-sm text-accent inline-flex items-center gap-1"
              >
                <Plus size={14} /> Add experience
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-medium mb-4">Education</h3>
            <div className="space-y-4">
              {content.about.education.map((edu, i) => (
                <div key={edu.id} className="glass rounded-2xl p-6 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <input
                      value={edu.degree}
                      onChange={(e) => {
                        const education = [...content.about.education];
                        education[i] = { ...education[i], degree: e.target.value };
                        setContent({ ...content, about: { ...content.about, education } });
                      }}
                      className={`${inputClass} font-medium`}
                      placeholder="Degree"
                    />
                    <button
                      onClick={() => {
                        const education = content.about.education.filter((_, idx) => idx !== i);
                        setContent({ ...content, about: { ...content.about, education } });
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      value={edu.institution}
                      onChange={(e) => {
                        const education = [...content.about.education];
                        education[i] = { ...education[i], institution: e.target.value };
                        setContent({ ...content, about: { ...content.about, education } });
                      }}
                      className={inputClass}
                      placeholder="Institution"
                    />
                    <input
                      value={edu.duration}
                      onChange={(e) => {
                        const education = [...content.about.education];
                        education[i] = { ...education[i], duration: e.target.value };
                        setContent({ ...content, about: { ...content.about, education } });
                      }}
                      className={inputClass}
                      placeholder="e.g. 2020 – 2023"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() =>
                  setContent({
                    ...content,
                    about: {
                      ...content.about,
                      education: [
                        ...content.about.education,
                        { id: `edu-${Date.now()}`, degree: "New Degree", institution: "", duration: "" },
                      ],
                    },
                  })
                }
                className="text-sm text-accent inline-flex items-center gap-1"
              >
                <Plus size={14} /> Add education
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
          <Field label="Phone">
            <input value={content.contact.phone} onChange={(e) => setContent({ ...content, contact: { ...content.contact, phone: e.target.value } })} className={inputClass} />
          </Field>
          <Field label="YouTube Link">
            <input value={content.contact.youtube} onChange={(e) => setContent({ ...content, contact: { ...content.contact, youtube: e.target.value } })} className={inputClass} />
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
