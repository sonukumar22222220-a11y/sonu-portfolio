"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, RotateCcw, Save, Scissors } from "lucide-react";
import type { Project } from "@/lib/types";

function buildCloudinaryVideoUrl(url: string, start: number, end: number, speed: number) {
  if (!url || !url.includes("/video/upload/")) return url;
  const parts: string[] = [];
  if (start > 0) parts.push(`so_${start}`);
  if (Number.isFinite(end) && end > start) parts.push(`eo_${end}`);
  if (speed !== 1) parts.push(`e_accelerate:${Math.round((speed - 1) * 100)}`);
  if (!parts.length) return url;
  return url.replace("/video/upload/", `/video/upload/${parts.join(",")}/`);
}

export default function VideoEditor({
  project,
  onChange,
}: {
  project: Project;
  onChange: (project: Project) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [start, setStart] = useState(project.videoEdit?.start ?? 0);
  const [end, setEnd] = useState(project.videoEdit?.end ?? 0);
  const [speed, setSpeed] = useState(project.videoEdit?.speed ?? 1);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setStart(project.videoEdit?.start ?? 0);
    setEnd(project.videoEdit?.end ?? 0);
    setSpeed(project.videoEdit?.speed ?? 1);
  }, [project.id, project.videoEdit]);

  const effectiveEnd = end > start ? end : duration;
  const previewUrl = useMemo(
    () => buildCloudinaryVideoUrl(project.videoUrl || "", start, effectiveEnd, speed),
    [project.videoUrl, start, effectiveEnd, speed]
  );

  const applySettings = () => {
    onChange({
      ...project,
      videoEdit: {
        start: Math.max(0, start),
        end: Math.max(start, effectiveEnd),
        speed,
      },
    });
  };

  const reset = () => {
    setStart(0);
    setEnd(duration);
    setSpeed(1);
  };

  if (!project.videoUrl) return null;

  return (
    <div className="rounded-2xl border border-line bg-white/[0.03] p-5 space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 font-medium"><Scissors size={16} /> Video Editor</div>
          <p className="text-xs text-white/40 mt-1">Trim and speed controls are saved with this project.</p>
        </div>
        <button type="button" onClick={reset} className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-white">
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      <video
        ref={videoRef}
        key={previewUrl}
        src={previewUrl}
        controls
        className="w-full rounded-xl bg-black aspect-video"
        onLoadedMetadata={(e) => {
          const d = e.currentTarget.duration || 0;
          setDuration(d);
          if (!end) setEnd(d);
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <label className="text-xs text-white/50">
          Start (sec)
          <input
            type="number"
            min={0}
            max={Math.max(0, effectiveEnd)}
            step={0.1}
            value={start}
            onChange={(e) => setStart(Number(e.target.value) || 0)}
            className="mt-2 w-full bg-white/5 border border-line rounded-xl px-3 py-2.5 text-sm text-white"
          />
        </label>
        <label className="text-xs text-white/50">
          End (sec)
          <input
            type="number"
            min={Math.max(0, start)}
            max={duration || undefined}
            step={0.1}
            value={effectiveEnd}
            onChange={(e) => setEnd(Number(e.target.value) || 0)}
            className="mt-2 w-full bg-white/5 border border-line rounded-xl px-3 py-2.5 text-sm text-white"
          />
        </label>
        <label className="text-xs text-white/50">
          Speed
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="mt-2 w-full bg-white/5 border border-line rounded-xl px-3 py-2.5 text-sm text-white"
          >
            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((v) => <option key={v} value={v}>{v}×</option>)}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            if (!videoRef.current) return;
            if (videoRef.current.paused) videoRef.current.play(); else videoRef.current.pause();
          }}
          className="inline-flex items-center gap-2 rounded-full bg-white text-black text-sm px-5 py-2.5"
        >
          {playing ? <Pause size={14} /> : <Play size={14} />} Preview Edit
        </button>
        <button
          type="button"
          onClick={applySettings}
          className="inline-flex items-center gap-2 rounded-full bg-accent text-black text-sm font-medium px-5 py-2.5"
        >
          <Save size={14} /> Save Video Edit
        </button>
      </div>
    </div>
  );
}
