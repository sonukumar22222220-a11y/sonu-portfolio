"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid Email or Password");
        setLoading(false);
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Invalid Email or Password");
      setLoading(false);
    }
  };

  return (
    <div className="cyber-admin min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full -z-0"
        style={{ background: "rgba(0,255,135,0.14)", filter: "blur(120px)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="cyber-glass relative z-10 w-full max-w-md rounded-3xl p-10"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
          style={{ background: "rgba(0,255,135,0.12)" }}
        >
          <Lock size={20} className="cyber-glow-text" />
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] mb-3 flex items-center gap-2" style={{ color: "var(--c-green)" }}>
          <span className="cyber-dot" /> Secure Access
        </div>
        <h1 className="font-display text-2xl font-bold mb-1">Admin Login</h1>
        <p className="text-sm mb-8" style={{ color: "var(--c-ink-faint)" }}>
          Sign in to manage your portfolio.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest mb-2 block" style={{ color: "var(--c-ink-faint)" }}>
              Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--c-ink-faint)" }} />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="cyber-input w-full pl-11 pr-4 py-3 text-sm"
                placeholder="admin@example.com"
                autoComplete="username"
              />
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest mb-2 block" style={{ color: "var(--c-ink-faint)" }}>
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--c-ink-faint)" }} />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="cyber-input w-full pl-11 pr-4 py-3 text-sm"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="cyber-btn-primary w-full inline-flex items-center justify-center gap-2 text-sm px-7 py-3.5"
          >
            {loading ? "Signing in..." : "Login"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <button
          onClick={() => setForgotOpen(!forgotOpen)}
          className="mt-5 text-xs transition-colors"
          style={{ color: "var(--c-ink-faint)" }}
        >
          Forgot password?
        </button>
        {forgotOpen && (
          <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--c-ink-faint)" }}>
            Admin credentials are set as environment variables during deployment,
            not stored in a database. To reset your password, update the{" "}
            <code style={{ color: "var(--c-ink-dim)" }}>ADMIN_PASSWORD</code> environment
            variable in your hosting dashboard (e.g. Netlify → Project configuration →
            Environment variables) and redeploy.
          </p>
        )}
      </motion.div>
    </div>
  );
}
