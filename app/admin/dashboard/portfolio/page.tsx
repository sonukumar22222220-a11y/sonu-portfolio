"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";
import type { Project, ProjectCategory, SiteContent } from "@/lib/types";
import CloudinaryUploader from "@/components/CloudinaryUploader";

const CATEGORIES: ProjectCategory[] = [
  "Video Editing",
  "Motion Graphics",
  "YouTube Editing",
  "Instagram Reels",
  "Shorts Editing",
  "Thumbnail Design",
  "Graphic Design",
  "Logo Design",
  "Banner Design",
  "Social Media Design",
];

const emptyProject = (): Project => ({
  id: `p-${Date.now()}`,
  slug: "",
  title: "",
  category: "Video Editing",
  coverImage: "",
  videoUrl: "",
  beforeImage: "",
  afterImage: "",
  client: "",
  result: "",
  software: [],
  description: "",
  gallery: [],
  featured: false,
  createdAt: new Date().toISOString().slice(0, 10),
});

export default function PortfolioManager() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [editing, setEditing] = useState<Project | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetch("/api/content").then((r) => r.json()).then(setContent);
  }, []);

  const publish = async (updated: SiteContent) => {
    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setToast(`Save failed (${res.status}): ${err.error || "Unknown error"}`);
        setSaving(false);
        setTimeout(() => setToast(""), 5000);
        return;
      }
      setContent(updated);
      setToast("Changes published to the live site");
    } catch (e) {
      setToast(`Save failed: ${(e as Error).message}`);
    } finally {
      setSaving(false);
      setTimeout(() => setToast(""), 5000);
    }
  };

  const handleDelete = (id: string) => {
    if (!content) return;
    if (!confirm("Delete this project? This cannot be undone.")) return;
    const updated = { ...content, projects: content.projects.filter((p) => p.id !== id) };
    publish(updated);
  };

  const handleSaveProject = () => {
    if (!content || !editing) return;
    const slug =
      editing.slug ||
      editing.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const finalProject = { ...editing, slug };
    const exists = content.projects.some((p) => p.id === finalProject.id);
    const projects = exists
      ? content.projects.map((p) => (p.id === finalProject.id ? finalProject : p))
      : [...content.projects, finalProject];
    publish({ ...content, projects });
    setEditing(null);
  };

  if (!content) return <div className="text-white/40 text-sm">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold mb-1">Portfolio Manager</h1>
          <p className="text-white/40 text-sm">Add, edit, and publish projects. Changes go live instantly.</p>
        </div>
        <button
          onClick={() => setEditing(emptyProject())}
          className="inline-flex items-center gap-2 rounded-full bg-white text-black text-sm font-medium px-5 py-2.5 hover:bg-white/90 transition-all"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {toast && (
        <div className="mb-6 text-sm bg-accent/10 border border-accent/30 text-accent rounded-xl px-4 py-3">
          {toast}
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {content.projects.map((p) => (
          <div key={p.id} className="glass rounded-2xl overflow-hidden">
            <div
              className="h-36 bg-cover bg-center"
              style={{ backgroundImage: `url(${p.coverImage || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800"})` }}
            />
            <div className="p-5">
              <div className="text-xs text-accent mb-1">{p.category}</div>
              <div className="font-medium mb-3">{p.title || "Untitled project"}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditing(p)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-sm py-2 transition-colors"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="inline-flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm py-2 px-3 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="glass-strong rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-medium">
                {content.projects.some((p) => p.id === editing.id) ? "Edit Project" : "New Project"}
              </h2>
              <button onClick={() => setEditing(null)} className="text-white/40 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Title</label>
                <input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full bg-white/5 border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Category</label>
                <select
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value as ProjectCategory })}
                  className="w-full bg-white/5 border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c} className="bg-surface">{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Cover Image</label>
                <CloudinaryUploader
                  accept="image/*"
                  onUploaded={(url) => setEditing({ ...editing, coverImage: url })}
                />
                {editing.coverImage && <p className="text-xs text-white/30 mt-2 truncate">{editing.coverImage}</p>}
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">
                  Video (auto-plays on hover)
                </label>
                <CloudinaryUploader
                  accept="video/*"
                  onUploaded={(url) => setEditing({ ...editing, videoUrl: url })}
                />
                {editing.videoUrl && <p className="text-xs text-white/30 mt-2 truncate">{editing.videoUrl}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Before Image</label>
                  <CloudinaryUploader
                    accept="image/*"
                    label="Before"
                    onUploaded={(url) => setEditing({ ...editing, beforeImage: url })}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">After Image</label>
                  <CloudinaryUploader
                    accept="image/*"
                    label="After"
                    onUploaded={(url) => setEditing({ ...editing, afterImage: url })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Client</label>
                  <input
                    value={editing.client}
                    onChange={(e) => setEditing({ ...editing, client: e.target.value })}
                    className="w-full bg-white/5 border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Client Result</label>
                  <input
                    value={editing.result}
                    onChange={(e) => setEditing({ ...editing, result: e.target.value })}
                    className="w-full bg-white/5 border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">
                  Software Used (comma separated)
                </label>
                <input
                  value={editing.software.join(", ")}
                  onChange={(e) => setEditing({ ...editing, software: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                  className="w-full bg-white/5 border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent"
                  placeholder="Premiere Pro, After Effects"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Description</label>
                <textarea
                  rows={4}
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  className="w-full bg-white/5 border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-white/60">
                <input
                  type="checkbox"
                  checked={editing.featured}
                  onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                  className="accent-accent"
                />
                Feature on homepage
              </label>

              <button
                onClick={handleSaveProject}
                disabled={saving || !editing.title}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-black text-sm font-medium px-7 py-3.5 hover:bg-white/90 transition-all disabled:opacity-50"
              >
                <Save size={16} /> {saving ? "Publishing..." : "Save & Publish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
