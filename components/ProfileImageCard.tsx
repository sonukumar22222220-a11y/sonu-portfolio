import Image from "next/image";

// Profile image card for the About section:
// - Gradient border frame (purple → pink, matches the site's accent colors)
// - <img> exposed via id="user-profile-img" so it can be swapped dynamically
//   (the src itself is already wired to the Admin Dashboard -> Settings ->
//   About -> Profile Image field, backed by Supabase/Cloudinary)
// - A floating badge overlaid on the bottom-left showing years of experience
export default function ProfileImageCard({
  src,
  yearsExperience,
}: {
  src: string;
  yearsExperience: number;
}) {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Gradient border frame */}
      <div
        className="relative rounded-3xl p-[3px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(168,85,247,0.9), rgba(236,72,153,0.6), rgba(168,85,247,0.2))",
        }}
      >
        <div className="relative rounded-[calc(1.5rem-3px)] overflow-hidden bg-surface aspect-[4/5]">
          <Image
            id="user-profile-img"
            src={src}
            alt="Sonu Singh Rathore"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 400px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </div>

      {/* Floating experience badge */}
      <div className="absolute -bottom-5 -left-5 glass-strong rounded-2xl px-5 py-3 shadow-[0_0_24px_4px_rgba(168,85,247,0.25)]">
        <div className="font-display text-xl font-bold gradient-text leading-none">
          {yearsExperience}+
        </div>
        <div className="text-[11px] text-white/60 mt-1 whitespace-nowrap">Years Experience</div>
      </div>
    </div>
  );
}
