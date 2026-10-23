import Link from "next/link";

export const greenButtonClass =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-neon px-6 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-neon-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon disabled:cursor-wait disabled:opacity-70";

export const outlineButtonClass =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-line px-5 text-sm font-semibold text-white transition-colors hover:border-neon hover:text-neon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon";

export function WatchLiveLink({ className = greenButtonClass }: { className?: string }) {
  return (
    <Link href="/#live" className={className}>
      Watch live
      <span aria-hidden="true">→</span>
    </Link>
  );
}
