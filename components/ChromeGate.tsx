"use client";

import { usePathname } from "next/navigation";

/**
 * The homepage ("/") now renders a fully self-contained static design
 * (public/sonu-portfolio.html) via an iframe, which already has its own
 * cursor/animations. So we skip the global custom cursor, mouse-glow,
 * and loader chrome on that route only — every other route (about,
 * portfolio, contact, etc.) keeps them as before.
 */
export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <>{children}</>;
}
