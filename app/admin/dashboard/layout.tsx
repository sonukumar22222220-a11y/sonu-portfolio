"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Settings,
  Image as ImageIcon,
  User,
  LogOut,
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

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex bg-bg" style={{ cursor: "auto" }}>
      <aside className="w-64 border-r border-line flex flex-col fixed h-screen p-6">
        <Link href="/admin/dashboard" className="font-display text-lg font-semibold mb-10 block">
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
      </aside>

      <main className="flex-1 ml-64 p-10">{children}</main>
    </div>
  );
}
