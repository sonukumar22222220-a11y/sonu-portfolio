"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

  // Close the mobile drawer automatically whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  const sidebarContent = (
    <>
      <Link href="/admin/dashboard" className="font-display text-lg font-semibold mb-10 block">
        SONU SINGH<span className="text-accent"> RATHORE</span>
        <div className="text-xs text-white/30 font-normal tracking-widest uppercase mt-1">Admin</div>
      </Link>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-colors ${
                active ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/5"
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
    <div className="min-h-screen bg-bg" style={{ cursor: "auto" }}>
      {/* Mobile top bar — only visible below md breakpoint */}
      <div className="md:hidden flex items-center justify-between px-5 py-4 border-b border-line sticky top-0 z-40 bg-bg/95 backdrop-blur">
        <span className="font-display text-base font-semibold">
          SONU SINGH<span className="text-accent"> RATHORE</span>
        </span>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-white/70"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Mobile slide-out drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-72 max-w-[80vw] bg-bg border-r border-line flex flex-col p-6 h-full overflow-y-auto">
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="self-end mb-6 w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-white/70"
            >
              <X size={18} />
            </button>
            {sidebarContent}
          </div>
          <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      <div className="flex">
        {/* Desktop sidebar — hidden below md breakpoint */}
        <aside className="hidden md:flex w-64 border-r border-line flex-col fixed h-screen p-6">
          {sidebarContent}
        </aside>

        <main className="flex-1 md:ml-64 p-5 sm:p-8 md:p-10">{children}</main>
      </div>
    </div>
  );
}
