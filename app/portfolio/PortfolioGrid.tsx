"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import type { Project, ProjectCategory } from "@/lib/types";

const CATEGORIES: (ProjectCategory | "All")[] = [
  "All",
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

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  );

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`text-xs px-4 py-2 rounded-full border transition-colors ${
              active === cat
                ? "bg-accent text-black border-accent"
                : "border-line text-white/60 hover:text-white hover:border-white/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-24 text-white/40">
              No projects in this category yet.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
