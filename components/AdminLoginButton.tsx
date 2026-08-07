import Link from "next/link";

export default function AdminLoginButton() {
  return (
    <Link
      href="/admin"
      aria-label="Admin Login"
      className="fixed bottom-[22px] right-[22px] z-[200] inline-flex items-center gap-[9px] rounded-full px-[18px] py-[10px] pl-[14px] text-[0.78rem] font-semibold text-white/40 backdrop-blur-[14px] transition-all duration-300 hover:text-white hover:border-accent/70 hover:shadow-[0_0_26px_rgba(0,255,135,0.4),0_10px_30px_rgba(0,0,0,0.5)] hover:-translate-y-0.5"
      style={{
        background: "rgba(6,20,14,.6)",
        border: "1px solid rgba(0,255,135,.3)",
        boxShadow: "0 8px 24px rgba(0,0,0,.45)",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-accent flex-shrink-0"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <rect x="15" y="11" width="7" height="6" rx="1.5" />
        <path d="M17 11V9a2 2 0 1 1 4 0v2" />
      </svg>
      <span className="hidden sm:inline">Admin Login</span>
    </Link>
  );
}
