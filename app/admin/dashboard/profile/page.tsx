"use client";

export default function ProfilePage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold mb-1">Profile</h1>
      <p className="text-white/40 text-sm mb-8">Your admin account details.</p>
      <div className="glass rounded-2xl p-8 max-w-md space-y-4">
        <p className="text-sm text-white/60">
          Admin credentials are managed via environment variables
          (<code className="text-white/80">ADMIN_EMAIL</code> /{" "}
          <code className="text-white/80">ADMIN_PASSWORD</code>) in your hosting
          provider, not stored in this app's database. To change them, update
          the environment variables and redeploy.
        </p>
      </div>
    </div>
  );
}
