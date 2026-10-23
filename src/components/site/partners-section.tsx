import Link from "next/link";
import { activePartners, partnerHref, type Partner } from "@/config/partners";

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function PartnerCard({ partner }: { partner: Partner }) {
  const href = partnerHref(partner);
  const affiliate = Boolean(partner.affiliateUrl.trim());

  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-card p-5">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-line font-display text-lg font-bold text-neon">
          {initials(partner.name)}
        </span>
        <h3 className="font-display text-xl font-bold uppercase leading-tight text-white">{partner.name}</h3>
      </div>
      {partner.discountText ? (
        <p className="mt-5 text-lg font-semibold text-neon">{partner.discountText}</p>
      ) : (
        <p className="mt-5 text-sm text-muted">No confirmed offer yet.</p>
      )}
      {partner.couponCode ? (
        <p className="mt-1 text-sm text-white">Code: {partner.couponCode}</p>
      ) : null}
      <div className="mt-6">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel={affiliate ? "noreferrer sponsored" : "noreferrer"}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-line text-sm font-semibold text-white hover:border-neon hover:text-neon"
          >
            Learn more →
          </a>
        ) : (
          <p className="text-sm text-muted">Official link is not set.</p>
        )}
      </div>
    </article>
  );
}

export function PartnersSection() {
  return (
    <section id="prop-firms" className="scroll-mt-24 border-t border-line px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-5xl font-bold uppercase leading-[0.9] text-white sm:text-6xl">
              Trade with our partners.
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted">
              Explore prop trading firms and available partner offers.
            </p>
          </div>
          <Link href="/prop-firms" className="text-sm font-bold uppercase tracking-wide text-neon hover:text-white">
            View all firms →
          </Link>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {activePartners().map((partner) => (
            <li key={partner.id}>
              <PartnerCard partner={partner} />
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-xs leading-5 text-muted">
          Affiliate disclosure: Learn More opens the firm&apos;s official website until an affiliate URL is
          added in the partner configuration. Discount text and coupon codes stay hidden until a partner
          confirms them. 9EMA is not using an unapproved code.
        </p>
      </div>
    </section>
  );
}
