"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderKanban, Star, Briefcase, TrendingUp } from "lucide-react";
import type { SiteContent } from "@/lib/types";

export default function DashboardHome() {
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    fetch("/api/content").then((r) => r.json()).then(setContent);
  }, []);

  const stats = content
    ? [
        { label: "Total Projects", value: content.projects.length, icon: FolderKanban },
        { label: "Testimonials", value: content.testimonials.length, icon: Star },
        { label: "Services Listed", value: content.services.length, icon: Briefcase },
        { label: "Featured Work", value: content.projects.filter((p) => p.featured).length, icon: TrendingUp },
      ]
    : [];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold mb-1">Dashboard</h1>
      <p className="text-white/40 text-sm mb-10">Welcome back. Here&apos;s an overview of your site.</p>

      <div className="grid md:grid-cols-4 gap-5 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-6">
            <s.icon size={18} className="text-accent mb-4" />
            <div className="font-display text-2xl font-semibold">{s.value}</div>
            <div className="text-xs text-white/40 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="glass rounded-2xl p-8">
          <h2 className="font-display text-lg font-medium mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link href="/admin/dashboard/portfolio" className="block text-sm text-white/60 hover:text-white transition-colors">→ Add a new project</Link>
            <Link href="/admin/dashboard/settings" className="block text-sm text-white/60 hover:text-white transition-colors">→ Edit About section</Link>
            <Link href="/admin/dashboard/settings" className="block text-sm text-white/60 hover:text-white transition-colors">→ Update contact details</Link>
            <Link href="/admin/dashboard/media" className="block text-sm text-white/60 hover:text-white transition-colors">→ Upload media</Link>
          </div>
        </div>

        <div className="glass rounded-2xl p-8">
          <h2 className="font-display text-lg font-medium mb-2">Analytics</h2>
          <p className="text-white/40 text-sm leading-relaxed">
            Connect Google Analytics or Vercel Analytics to see live traffic here.
            Add your measurement ID as an environment variable and drop the
            tracking script into <code className="text-white/60">app/layout.tsx</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
