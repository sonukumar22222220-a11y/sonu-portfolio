"use client";

import { useEffect, useState } from "react";

const TYPE_SPEED = 70;
const DELETE_SPEED = 40;
const HOLD_TIME = 1400;
const GAP_TIME = 400;

export default function TypewriterRole({ role }: { role: string }) {
  const roles = role
    .split("|")
    .map((r) => r.trim())
    .filter(Boolean);

  const [text, setText] = useState("");

  useEffect(() => {
    if (!roles.length) return;
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function tick() {
      const current = roles[roleIdx];

      if (!deleting) {
        charIdx++;
        setText(current.slice(0, charIdx));
        if (charIdx === current.length) {
          deleting = true;
          timeoutId = setTimeout(tick, HOLD_TIME);
          return;
        }
        timeoutId = setTimeout(tick, TYPE_SPEED);
      } else {
        charIdx--;
        setText(current.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
          timeoutId = setTimeout(tick, GAP_TIME);
          return;
        }
        timeoutId = setTimeout(tick, DELETE_SPEED);
      }
    }

    timeoutId = setTimeout(tick, 300);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  return (
    <span className="whitespace-nowrap">
      {text}
      <span
        aria-hidden="true"
        className="inline-block ml-0.5 text-accent"
        style={{
          animation: "cursorBlink 0.9s step-end infinite",
          textShadow: "0 0 12px rgba(0,255,135,.9)",
        }}
      >
        |
      </span>
      <style jsx>{`
        @keyframes cursorBlink {
          0%,
          45% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
}
