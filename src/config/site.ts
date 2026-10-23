export const siteConfig = {
  brand: "9EMA",
  domain: "9EMA.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://9emas.netlify.app",
  socialHandle: "@9ema_live",
  description:
    "Follow 9 as she analyzes the markets, identifies trading setups, and shares her trades live.",
  indicator: {
    name: "9EMA Indicator",
    monthlyPriceCents: 3199,
    currency: "USD",
  },
  socials: {
    youtube: "",
    kick: "",
    tiktok: "",
    x: "",
  },
  live: {
    youtubeVideoId: "",
  },
  contactEmail: "",
  features: [
    { title: "Buy/Sell Signals", detail: "Entry and exit marks on the chart." },
    { title: "Trend Zones", detail: "Zones that show the current trend context." },
    { title: "Reversal Alerts", detail: "Alerts when a reversal condition appears." },
    { title: "Support & Resistance", detail: "Levels used together with the signal." },
    { title: "Multiple Timeframes", detail: "The same tool on more than one timeframe." },
    { title: "Indicator Updates", detail: "Updates included with an active subscription." },
  ],
} as const;

export type SocialKey = keyof typeof siteConfig.socials;

export const socialLabels: Record<SocialKey, string> = {
  youtube: "YouTube",
  kick: "Kick",
  tiktok: "TikTok",
  x: "X",
};

export function monthlyPriceLabel() {
  return `$${(siteConfig.indicator.monthlyPriceCents / 100).toFixed(2)}`;
}

export function configuredSocial(key: SocialKey) {
  const url = siteConfig.socials[key].trim();
  return url || null;
}

export function navLinks() {
  return [
    { href: "/", label: "Home" },
    { href: "/#live", label: "Live" },
    { href: "/#indicator", label: "Indicator" },
    { href: "/#prop-firms", label: "Prop Firms" },
    { href: "/#setups", label: "Setups" },
    { href: "/playbook", label: "Playbook" },
    { href: "/#about", label: "About" },
  ];
}
