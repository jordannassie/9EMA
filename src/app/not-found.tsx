import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="font-display text-5xl font-bold uppercase text-white">Page not found</h1>
      <Link href="/" className="mt-6 inline-flex text-neon">
        Back home
      </Link>
    </main>
  );
}
