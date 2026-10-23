import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact 9EMA.",
};

export default function ContactPage() {
  const email = siteConfig.contactEmail.trim();

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <h1 className="font-display text-5xl font-bold uppercase text-white">Contact</h1>
      {email ? (
        <p className="mt-4 text-lg text-muted">
          Email{" "}
          <a className="text-neon" href={`mailto:${email}`}>
            {email}
          </a>
          .
        </p>
      ) : (
        <p className="mt-4 text-lg leading-8 text-muted">
          A contact inbox is not configured yet. Add an address to <span className="font-mono">contactEmail</span>{" "}
          in the site configuration when one is ready. This page does not collect messages.
        </p>
      )}
    </main>
  );
}
