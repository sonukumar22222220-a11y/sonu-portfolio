"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  Image as ImageIcon,
  User,
  LogOut,
  RefreshCw,
  PanelRightOpen,
  PanelRightClose,
  ExternalLink,
  MoreVertical,
  Monitor,
  Tablet,
  Smartphone,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dashboard/portfolio", label: "Portfolio Manager", icon: FolderKanban },
  { href: "/admin/dashboard/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/dashboard/settings", label: "Settings", icon: Settings },
];

type DeviceMode = "desktop" | "tablet" | "phone";

const DEVICE_SIZES: Record<DeviceMode, { width: number; height: number | string; label: string }> = {
  desktop: { width: 1280, height: "100%", label: "Desktop" },
  tablet: { width: 768, height: 1024, label: "Tablet" },
  phone: { width: 390, height: 844, label: "Phone" },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [previewOpen, setPreviewOpen] = useState(true);
  const [previewKey, setPreviewKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const refreshPreview = useCallback(() => {
    setRefreshing(true);
    setPreviewKey((k) => k + 1);
    setTimeout(() => setRefreshing(false), 500);
  }, []);

  // Auto-refresh the live preview whenever any admin page publishes changes.
  useEffect(() => {
    const handler = () => refreshPreview();
    window.addEventListener("content-updated", handler);
    return () => window.removeEventListener("content-updated", handler);
  }, [refreshPreview]);

  // Close the 3-dot menu when clicking outside it.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  const size = DEVICE_SIZES[device];
  const isFrameMode = device !== "desktop";

  return (
    <div className="cyber-admin flex min-h-screen" style={{ cursor: "auto" }}>
      <aside
        className="w-64 flex flex-col fixed h-screen p-6 z-20 cyber-scroll overflow-y-auto"
        style={{ borderRight: "1px solid var(--c-line)" }}
      >
        <Link href="/admin/dashboard" className="font-display text-lg font-bold mb-1 block">
          SONU SINGH<span className="cyber-glow-text"> RATHORE</span>
        </Link>
        <div
          className="font-mono text-[10px] uppercase tracking-[0.22em] mb-8 flex items-center gap-2"
          style={{ color: "var(--c-ink-faint)" }}
        >
          <span className="cyber-dot" /> Admin Console
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`cyber-nav-link flex items-center gap-3 px-4 py-2.5 text-sm ${active ? "active" : ""}`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 pt-4" style={{ borderTop: "1px solid var(--c-line)" }}>
          <Link
            href="/admin/dashboard/profile"
            className="cyber-nav-link flex items-center gap-3 px-4 py-2.5 text-sm"
          >
            <User size={16} />
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors"
            style={{ color: "var(--c-ink-dim)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#ff6b6b")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--c-ink-dim)")}
          >
            <LogOut size={16} />
            Logout
          </button>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 text-xs transition-colors"
            style={{ color: "var(--c-ink-faint)" }}
          >
            View live site <ExternalLink size={12} />
          </Link>
        </div>
      </aside>

      {/* Editing area */}
      <main
        className={`flex-1 ml-64 p-10 cyber-scroll overflow-y-auto transition-all ${
          previewOpen ? "mr-[420px] xl:mr-[480px]" : "mr-0"
        }`}
      >
        {children}
      </main>

      {/* Live preview panel */}
      <div
        className={`fixed top-0 right-0 h-screen z-10 transition-transform duration-300 ${
          previewOpen ? "translate-x-0" : "translate-x-full"
        } w-[420px] xl:w-[480px] flex flex-col`}
        style={{ borderLeft: "1px solid var(--c-line)", background: "var(--c-raised)" }}
      >
        <div
          className="flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--c-line)" }}
        >
          <div className="flex items-center gap-2">
            <span className="cyber-dot" />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--c-ink-dim)" }}>
              Live Preview
            </span>
            {isFrameMode && (
              <span
                className="font-mono text-[9px] px-2 py-0.5 rounded-full"
                style={{ color: "var(--c-green)", background: "rgba(0,255,135,0.1)", border: "1px solid var(--c-line)" }}
              >
                {size.label}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 relative" ref={menuRef}>
            <button
              onClick={refreshPreview}
              title="Refresh preview"
              className="p-2 rounded-lg transition-colors"
              style={{ color: "var(--c-ink-dim)" }}
            >
              <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            </button>

            {/* 3-dot menu */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              title="Preview options"
              className="p-2 rounded-lg transition-colors"
              style={{ color: "var(--c-ink-dim)" }}
            >
              <MoreVertical size={14} />
            </button>

            {menuOpen && (
              <div
                className="cyber-card absolute right-0 top-10 w-52 p-2 shadow-2xl z-30"
                style={{ boxShadow: "0 20px 50px rgba(0,0,0,.5)" }}
              >
                <div
                  className="font-mono text-[10px] uppercase tracking-widest px-2 pt-1 pb-2"
                  style={{ color: "var(--c-ink-faint)" }}
                >
                  View as
                </div>
                {(
                  [
                    { mode: "desktop" as DeviceMode, icon: Monitor, label: "Desktop" },
                    { mode: "tablet" as DeviceMode, icon: Tablet, label: "Tablet Mode" },
                    { mode: "phone" as DeviceMode, icon: Smartphone, label: "Phone Mode" },
                  ]
                ).map((opt) => (
                  <button
                    key={opt.mode}
                    onClick={() => {
                      setDevice(opt.mode);
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
                    style={{
                      color: device === opt.mode ? "var(--c-green)" : "var(--c-ink-dim)",
                      background: device === opt.mode ? "rgba(0,255,135,0.08)" : "transparent",
                    }}
                  >
                    <opt.icon size={15} />
                    {opt.label}
                    {device === opt.mode && <span className="cyber-dot ml-auto" />}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => setPreviewOpen(false)}
              title="Hide preview"
              className="p-2 rounded-lg transition-colors"
              style={{ color: "var(--c-ink-dim)" }}
            >
              <PanelRightClose size={14} />
            </button>
          </div>
        </div>
        <p
          className="px-4 py-2 text-[11px] leading-relaxed flex-shrink-0"
          style={{ color: "var(--c-ink-faint)", borderBottom: "1px solid var(--c-line)" }}
        >
          This shows your actual live site. It refreshes automatically after
          you publish a change — use the ⋮ menu above to preview in phone or
          tablet size.
        </p>
        <div
          className={`flex-1 relative bg-black overflow-auto cyber-scroll ${isFrameMode ? "flex items-start justify-center py-6" : ""}`}
        >
          {isFrameMode ? (
            <div
              className="relative flex-shrink-0"
              style={{
                width: size.width,
                borderRadius: device === "phone" ? 40 : 22,
                padding: device === "phone" ? 12 : 10,
                background: "linear-gradient(160deg, #1a1f1c, #0a0f0c)",
                border: "1px solid rgba(0,255,135,0.25)",
                boxShadow: "0 0 40px rgba(0,255,135,0.15), 0 20px 50px rgba(0,0,0,.5)",
              }}
            >
              {device === "phone" && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-3 z-10 rounded-full"
                  style={{ width: 90, height: 18, background: "#050807" }}
                />
              )}
              <div
                className="overflow-hidden bg-white"
                style={{ borderRadius: device === "phone" ? 30 : 12, height: size.height }}
              >
                <iframe
                  key={previewKey}
                  src="/"
                  title="Live site preview"
                  className="border-0"
                  style={{ width: size.width, height: size.height }}
                />
              </div>
              {device === "phone" && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 bottom-2 rounded-full"
                  style={{ width: 110, height: 4, background: "rgba(0,255,135,0.5)" }}
                />
              )}
            </div>
          ) : (
            <iframe
              key={previewKey}
              src="/"
              title="Live site preview"
              className="w-full h-full border-0"
            />
          )}
        </div>
      </div>

      {!previewOpen && (
        <button
          onClick={() => setPreviewOpen(true)}
          className="cyber-btn-primary fixed bottom-6 right-6 z-30 flex items-center gap-2 px-4 py-3 text-xs"
        >
          <PanelRightOpen size={14} />
          Show Preview
        </button>
      )}
    </div>
  );
}
