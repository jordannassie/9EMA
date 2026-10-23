import type { Metadata } from "next";
import { activePartners, partnerHref } from "@/config/partners";

export const metadata: Metadata = {
  title: "Prop firms",
  description: "Prop trading firms listed by 9EMA.",
};

export default function PropFirmsPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <h1 className="font-display text-5xl font-bold uppercase leading-none text-white">Trade with our partners.</h1>
      <p className="mt-4 text-lg text-muted">Explore prop trading firms and available partner offers.</p>
      <ul className="mt-8 grid gap-4">
        {activePartners().map((partner) => {
          const href = partnerHref(partner);
          const affiliate = Boolean(partner.affiliateUrl.trim());
          return (
            <li key={partner.id} className="rounded-2xl border border-line bg-card p-5">
              <h2 className="font-display text-2xl font-bold uppercase">{partner.name}</h2>
              <p className="mt-2 text-sm text-muted">
                {partner.discountText || "No confirmed offer yet."}
                {partner.couponCode ? ` Code: ${partner.couponCode}` : ""}
              </p>
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel={affiliate ? "noreferrer sponsored" : "noreferrer"}
                  className="mt-4 inline-flex min-h-12 items-center text-sm font-semibold text-neon"
                >
                  Learn more →
                </a>
              ) : (
                <p className="mt-4 text-sm text-muted">Official link is not set.</p>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
