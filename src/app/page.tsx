import Image from "next/image";
import { supabaseEnvStatus } from "@/lib/supabase/env";

export default function Home() {
  const supabase = supabaseEnvStatus();

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <section className="flex w-full max-w-xl flex-col items-center gap-8 text-center">
        <Image
          src="/9logo.png"
          alt="9EMA"
          width={220}
          height={220}
          priority
          className="h-auto w-44"
        />
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold tracking-[0.28em] text-[#39ff14]">
            TRADING LIVESTREAM
          </p>
          <h1 className="text-5xl font-semibold tracking-tight">9EMA</h1>
          <p className="text-lg text-zinc-400">
            Next.js site ready for Netlify. Add the Supabase values in{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm">
              .env
            </code>{" "}
            to connect the database.
          </p>
        </div>
        <p
          className={`rounded-full border px-4 py-2 text-sm font-medium ${
            supabase.connected
              ? "border-[#39ff14]/40 text-[#39ff14]"
              : "border-white/15 text-zinc-300"
          }`}
        >
          {supabase.connected
            ? "Supabase environment is set"
            : "Supabase environment is waiting for .env"}
        </p>
      </section>
    </main>
  );
}
