"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="font-display text-5xl font-bold uppercase text-white">Something went wrong</h1>
      <button type="button" onClick={reset} className="mt-6 rounded-full bg-neon px-6 py-3 font-bold text-black">
        Try again
      </button>
    </main>
  );
}
