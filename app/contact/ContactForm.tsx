"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-10 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <Check size={24} className="text-accent" />
        </div>
        <h3 className="font-display text-xl font-medium mb-2">Message sent</h3>
        <p className="text-white/50 text-sm">Thanks for reaching out — I&apos;ll get back to you within 24 hours.</p>
        <button onClick={() => setStatus("idle")} className="mt-6 text-sm text-accent">
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
      <div>
        <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Name</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-white/5 border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
          placeholder="Jane Doe"
        />
      </div>
      <div>
        <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Email</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-white/5 border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
          placeholder="jane@example.com"
        />
      </div>
      <div>
        <label className="text-xs uppercase tracking-widest text-white/40 mb-2 block">Project details</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full bg-white/5 border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
          placeholder="Tell me about your project..."
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white text-black text-sm font-medium px-7 py-3.5 hover:bg-white/90 transition-all disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
        {status !== "loading" && <Send size={16} />}
      </button>
    </form>
  );
}
