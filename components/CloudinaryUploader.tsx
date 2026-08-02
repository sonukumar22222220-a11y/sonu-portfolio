"use client";

import { useCallback, useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";

// Drag & drop uploader using Cloudinary's UNSIGNED upload API.
// Requires two env vars (see .env.local.example):
//   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
//   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET (create an unsigned preset in your
//   Cloudinary dashboard: Settings → Upload → Add upload preset → Signing mode: Unsigned)
//
// For production you may want to switch to SIGNED uploads (more secure,
// harder to abuse) — see app/api/upload-signature/route.ts for the scaffold.

export default function CloudinaryUploader({
  onUploaded,
  accept = "image/*,video/*",
  label = "Drag & drop or click to upload",
}: {
  onUploaded: (url: string, type: "image" | "video") => void;
  accept?: string;
  label?: string;
}) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  const upload = useCallback(
    async (file: File) => {
      if (!cloudName || !uploadPreset) {
        setError("Cloudinary is not configured. Add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to your environment variables.");
        return;
      }
      setUploading(true);
      setError("");
      const isVideo = file.type.startsWith("video");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/${isVideo ? "video" : "image"}/upload`,
          { method: "POST", body: formData }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.error?.message || "Upload failed");
        onUploaded(data.secure_url, isVideo ? "video" : "image");
      } catch (err: any) {
        setError(err.message || "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    [cloudName, uploadPreset, onUploaded]
  );

  return (
    <div>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) upload(file);
        }}
        className={`flex flex-col items-center justify-center gap-2 border border-dashed rounded-xl p-8 cursor-pointer transition-colors ${
          dragging ? "border-accent bg-accent/5" : "border-line hover:border-white/30"
        }`}
      >
        {uploading ? (
          <Loader2 size={22} className="animate-spin text-accent" />
        ) : (
          <UploadCloud size={22} className="text-white/40" />
        )}
        <span className="text-xs text-white/40 text-center">{uploading ? "Uploading..." : label}</span>
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload(file);
          }}
        />
      </label>
      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
    </div>
  );
}
