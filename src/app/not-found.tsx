import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-soft px-5">
      <div className="grid-bg mask-fade-y pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="animate-blob pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-brand/15 blur-3xl" aria-hidden="true" />
      <div className="animate-blob pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-pink/15 blur-3xl" aria-hidden="true" />
      <div className="relative text-center">
        <Link href="/" className="inline-block">
          <Image src="/images/logo.png" alt="Infinite Soft Tech" width={1100} height={400} sizes="160px" className="mx-auto h-14 w-auto" />
        </Link>
        <p className="text-gradient-animated mt-10 font-display text-[120px] font-extrabold leading-none md:text-[160px]">404</p>
        <h1 className="mt-2 font-display text-3xl font-bold">This page went beyond limits.</h1>
        <p className="mx-auto mt-3 max-w-md text-body">The page you are looking for doesn&apos;t exist or has been moved.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
