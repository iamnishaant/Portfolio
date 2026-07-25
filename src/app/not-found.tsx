import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <div className="font-mono text-sm text-blue">404 · route not found</div>
      <h1 className="mt-4 font-display text-6xl font-semibold tracking-tight sm:text-8xl">
        Lost in latent space.
      </h1>
      <p className="mt-4 max-w-md text-ink-dim">
        This page didn&apos;t make it into the training set. Let&apos;s get you
        back to something real.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
      >
        <ArrowLeft className="h-4 w-4" />
        Back home
      </Link>
    </div>
  );
}
