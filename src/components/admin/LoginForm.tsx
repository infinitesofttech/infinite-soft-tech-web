"use client";

import { useState, type FormEvent } from "react";
import { Eye, EyeOff, LoaderCircle, Lock, User } from "lucide-react";

export function LoginForm() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: fd.get("username"), password: fd.get("password") }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Login failed");
      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="field-label">Username</span>
        <span className="relative block">
          <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input name="username" required autoComplete="username" className="field !pl-10" placeholder="admin" />
        </span>
      </label>
      <label className="block">
        <span className="field-label">Password</span>
        <span className="relative block">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            name="password"
            required
            type={show ? "text" : "password"}
            autoComplete="current-password"
            className="field !pl-10 !pr-11"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </span>
      </label>
      {error ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={loading} className="btn btn-primary w-full disabled:opacity-70">
        {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
