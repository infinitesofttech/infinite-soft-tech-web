import Image from "next/image";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getSession, isAuthConfigured } from "@/lib/auth";

export const metadata = { title: "Login" };

export default async function AdminLoginPage() {
  if (await getSession()) redirect("/admin");
  const configured = isAuthConfigured();
  const isDev = process.env.NODE_ENV !== "production";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="grid-bg mask-fade-y pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="animate-blob pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-brand/20 blur-3xl" aria-hidden="true" />
      <div className="animate-blob pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-pink/20 blur-3xl" aria-hidden="true" />
      <div className="relative w-full max-w-[420px]">
        <div className="card p-8 sm:p-10">
          <Image src="/images/logo.png" alt="Infinite Soft Tech" width={1100} height={400} sizes="160px" className="mx-auto h-14 w-auto" />
          <h1 className="mt-6 text-center font-display text-2xl font-bold">Admin Panel</h1>
          <p className="mt-1 text-center text-sm text-muted">Sign in to manage leads and website content.</p>
          {!configured ? (
            <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
              Admin login is not configured yet. Add <b>ADMIN_USERNAME</b>, <b>ADMIN_PASSWORD</b> and <b>AUTH_SECRET</b> in Netlify →
              Site configuration → Environment variables, then redeploy.
            </p>
          ) : (
            <div className="mt-8">
              <LoginForm />
            </div>
          )}
          {isDev && configured && !process.env.ADMIN_PASSWORD ? (
            <p className="mt-6 rounded-xl bg-brand-50 p-3 text-center text-xs text-brand">
              Local development login: <b>admin</b> / <b>admin123</b>
            </p>
          ) : null}
        </div>
        <p className="mt-6 text-center text-xs text-muted">© Infinite Soft Tech</p>
      </div>
    </main>
  );
}
