"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CloudinaryUploader from "@/components/CloudinaryUploader";
import type { SiteContent } from "@/lib/types";

export default function MediaLibrary() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [uploaded, setUploaded] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/content").then((r) => r.json()).then(setContent);
  }, []);

  const allMedia = [
    ...uploaded,
    ...(content?.projects.flatMap((p) => [p.coverImage, ...(p.gallery || [])].filter(Boolean)) ?? []),
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold mb-1">Media Library</h1>
      <p className="text-white/40 text-sm mb-8">
        Upload images and videos here to get a Cloudinary URL you can paste into any project.
      </p>

      <div className="max-w-md mb-10">
        <CloudinaryUploader onUploaded={(url) => setUploaded((u) => [url, ...u])} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from(new Set(allMedia)).map((url, i) => (
          <div key={i} className="relative aspect-square rounded-xl overflow-hidden glass group">
            <Image src={url} alt="" fill className="object-cover" />
            <button
              onClick={() => navigator.clipboard.writeText(url)}
              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs text-white"
            >
              Copy URL
            </button>
          </div>
        ))}
        {allMedia.length === 0 && <div className="col-span-full text-white/30 text-sm">No media yet.</div>}
      </div>
    </div>
  );
}
