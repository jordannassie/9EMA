import Image from "next/image";
import Link from "next/link";
import { configuredSocial, navLinks, siteConfig, socialLabels, type SocialKey } from "@/config/site";
import { SocialGlyph } from "@/components/site/icons";

const extraLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  const socials = (Object.keys(siteConfig.socials) as SocialKey[]).map((key) => ({
    key,
    href: configuredSocial(key),
  }));

  return (
    <footer className="border-t border-line bg-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <Link href="/" aria-label="9EMA home">
            <Image src="/9logo.png" alt="" width={72} height={72} className="h-14 w-14 object-contain" />
          </Link>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted" aria-label="Footer">
            {navLinks().map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
            {extraLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-3">
            {socials.map((social) =>
              social.href ? (
                <a
                  key={social.key}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={socialLabels[social.key]}
                  className="text-white hover:text-neon"
                >
                  <SocialGlyph name={social.key} className="h-5 w-5" />
                </a>
              ) : (
                <span key={social.key} className="text-muted" aria-label={`${socialLabels[social.key]} is not linked yet`}>
                  <SocialGlyph name={social.key} className="h-5 w-5" />
                </span>
              ),
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 text-xs leading-5 text-muted md:flex-row md:items-end md:justify-between">
          <p className="max-w-3xl">
            Futures trading involves substantial risk. Past performance is not indicative of future
            results. 9EMA provides educational content and trading tools, not personalized financial
            advice. Partner buttons open each firm&apos;s official website. Affiliate links and coupon
            codes are omitted until a firm confirms them.
          </p>
          <p className="shrink-0">© 2026 9EMA.com</p>
        </div>
      </div>
    </footer>
  );
}
