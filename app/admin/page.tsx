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
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-bg via-bg to-surface" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md glass-strong rounded-3xl p-10"
      >
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
          <Lock size={20} className="text-accent" />
        </div>
        <h1 className="font-display text-2xl font-semibold mb-1">Admin Login</h1>
        <p className="text-white/40 text-sm mb-8">Sign in to manage your portfolio.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-line rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="admin@example.com"
                autoComplete="username"
              />
            </div>
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-line rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent text-black text-sm font-semibold shadow-[0_0_20px_rgba(0,255,135,0.3)] hover:shadow-[0_0_30px_rgba(0,255,135,0.5)] px-7 py-3.5 transition-all disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <button
          onClick={() => setForgotOpen(!forgotOpen)}
          className="mt-5 text-xs text-white/40 hover:text-white/70 transition-colors"
        >
          Forgot password?
        </button>
        {forgotOpen && (
          <p className="mt-2 text-xs text-white/40 leading-relaxed">
            Admin credentials are set as environment variables during deployment,
            not stored in a database. To reset your password, update the{" "}
            <code className="text-white/60">ADMIN_PASSWORD</code> environment
            variable in your hosting dashboard (e.g. Vercel → Project Settings →
            Environment Variables) and redeploy.
          </p>
        )}
      </motion.div>
    </div>
  );
}
