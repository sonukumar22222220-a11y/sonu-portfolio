"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  Image as ImageIcon,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dashboard/portfolio", label: "Portfolio Manager", icon: FolderKanban },
  { href: "/admin/dashboard/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  const sidebarContent = (
    <>
      <Link
        href="/admin/dashboard"
        onClick={() => setMobileOpen(false)}
        className="font-display text-lg font-semibold mb-10 block"
      >
        SONU<span className="text-accent"> KUMAR</span>
        <div className="text-xs text-white/30 font-normal tracking-widest uppercase mt-1">Admin</div>
      </Link>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                active ? "bg-accent/10 text-accent border border-line" : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 pt-4 border-t border-line">
        <Link
          href="/admin/dashboard/profile"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors"
        >
          <User size={16} />
          Profile
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
        <Link
          href="/"
          target="_blank"
          className="block px-4 py-2.5 text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          View live site ↗
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-bg" style={{ cursor: "auto" }}>
      {/* Mobile top bar — hamburger icon opens the nav sized to fit the phone screen */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 border-b border-line bg-bg/95 backdrop-blur">
        <Link href="/admin/dashboard" className="font-display text-sm font-semibold">
          SONU<span className="text-accent"> KUMAR</span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="w-9 h-9 flex items-center justify-center rounded-lg border border-line text-accent"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Mobile drawer — full-screen overlay sized exactly to the phone viewport */}
      <div
        className={`md:hidden fixed inset-0 z-50 flex transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={`relative z-10 w-[82vw] max-w-[300px] h-[100dvh] bg-bg border-r border-line p-6 flex flex-col overflow-y-auto transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg border border-line text-white/60"
          >
            <X size={16} />
          </button>
          {sidebarContent}
        </aside>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 border-r border-line flex-col fixed h-screen p-6">
        {sidebarContent}
      </aside>

      <main className="flex-1 min-w-0 md:ml-64 p-5 pt-20 md:p-10">{children}</main>
    </div>
  );
}
