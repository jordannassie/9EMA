import { activePartners, partnerHref, type Partner } from "@/config/partners";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="tracking-wide text-neon" aria-label={`${rating} out of 5 stars`}>
      {"★".repeat(rating)}
      <span className="text-line">{"★".repeat(Math.max(0, 5 - rating))}</span>
    </span>
  );
}

function FirmMark({ id }: { id: string }) {
  const common = "h-8 w-8";
  if (id === "top-one-futures") {
    return (
      <svg viewBox="0 0 32 32" className={common} aria-hidden="true">
        <rect width="32" height="32" rx="6" fill="#143018" />
        <path d="M9 22V10h3.2l4.2 7.2V10H20v12h-3.1l-4.3-7.4V22H9z" fill="#A8FF00" />
      </svg>
    );
  }
  if (id === "vest-markets") {
    return (
      <svg viewBox="0 0 32 32" className={common} aria-hidden="true">
        <path d="M4 8h6l6 10 6-10h6L18 26h-4L4 8z" fill="white" />
      </svg>
    );
  }
  if (id === "lucid-trading") {
    return (
      <svg viewBox="0 0 32 32" className={common} aria-hidden="true">
        <circle cx="16" cy="16" r="8" fill="#d7dde8" />
        <circle cx="19" cy="14" r="6" fill="#050706" />
      </svg>
    );
  }
  if (id === "take-profit-trader") {
    return (
      <svg viewBox="0 0 32 32" className={common} aria-hidden="true">
        <path d="M6 6h8v4H10v16H6V6z" fill="white" />
        <path d="M16 14h4v12h-4V14z" fill="#ff4d4d" />
        <path d="M22 8h4v18h-4V8z" fill="#A8FF00" />
      </svg>
    );
  }
  if (id === "apex-trader-funding") {
    return (
      <svg viewBox="0 0 32 32" className={common} aria-hidden="true">
        <path d="M3 18c4-8 8-8 12 0s8 8 14 0" fill="none" stroke="white" strokeWidth="2.4" />
        <path d="M3 14c4-8 8-8 12 0s8 8 14 0" fill="none" stroke="white" strokeWidth="2.4" />
      </svg>
    );
  }
  if (id === "tradeify") {
    return (
      <svg viewBox="0 0 32 32" className={common} aria-hidden="true">
        <path d="M10 18c0-4 2-7 6-7s6 3 6 7v2H10v-2z" fill="none" stroke="white" strokeWidth="1.8" />
        <path d="M8 22h16M12 14V9M20 14V9" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "blusky-trading") {
    return (
      <svg viewBox="0 0 32 32" className={common} aria-hidden="true">
        <path d="M6 24V12l10-6 10 6v12H6z" fill="#3b82f6" />
        <path d="M13 24v-6h6v6" fill="#0b1b3a" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" className={common} aria-hidden="true">
      <circle cx="16" cy="10" r="3" fill="#ff8a1e" />
      <path d="M10 26c1-6 4-8 6-8s5 2 6 8" fill="none" stroke="#ff8a1e" strokeWidth="2" />
    </svg>
  );
}

function FirmName({ partner }: { partner: Partner }) {
  const href = partnerHref(partner);
  const affiliate = Boolean(partner.affiliateUrl.trim());
  const label = (
    <span className="flex items-center gap-3">
      <FirmMark id={partner.id} />
      <span className="font-semibold text-white">{partner.name}</span>
    </span>
  );
  if (!href) return label;
  return (
    <a href={href} target="_blank" rel={affiliate ? "noreferrer sponsored" : "noreferrer"} className="hover:text-neon">
      {label}
    </a>
  );
}

export function FirmTable() {
  const firms = activePartners();

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <thead>
          <tr className="text-[11px] uppercase tracking-[0.16em] text-muted">
            <th className="border-b border-line py-4 pr-4 font-medium">Firm name</th>
            <th className="border-b border-line px-4 py-4 font-medium">Rating</th>
            <th className="border-b border-line px-4 py-4 text-center font-medium">Max accounts</th>
            <th className="border-b border-line px-4 py-4 font-medium">Trading platforms</th>
            <th className="border-b border-line py-4 pl-4 text-right font-medium">Discount</th>
          </tr>
        </thead>
        <tbody>
          {firms.map((partner) => (
            <tr key={partner.id}>
              <td className="border-b border-line py-4 pr-4">
                <FirmName partner={partner} />
              </td>
              <td className="border-b border-line px-4 py-4 text-lg">
                <Stars rating={partner.rating} />
              </td>
              <td className="border-b border-line px-4 py-4 text-center text-white">{partner.maxAccounts}</td>
              <td className="max-w-56 border-b border-line px-4 py-4 text-sm leading-6 text-white">
                {partner.platforms.join(", ")}
              </td>
              <td className="border-b border-line py-4 pl-4 text-right font-semibold text-white">
                {partner.discountText || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
