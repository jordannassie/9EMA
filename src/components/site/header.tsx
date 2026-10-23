"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { configuredSocial, navLinks, socialLabels, type SocialKey } from "@/config/site";
import { SocialGlyph } from "@/components/site/icons";
import { greenButtonClass } from "@/components/site/ui";

const socialKeys: SocialKey[] = ["youtube", "kick", "tiktok", "x"];

function SocialIconLink({ name }: { name: SocialKey }) {
  const href = configuredSocial(name);
  const label = socialLabels[name];
  const className =
    "inline-flex h-9 w-9 items-center justify-center rounded-full text-white hover:text-neon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon";
  const icon = <SocialGlyph name={name} className="h-4 w-4" />;
  if (!href) {
    return (
        <span className={`${className} cursor-default`} title={`${label} is not linked yet`} aria-label={`${label} is not linked yet`}>
        {icon}
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className} aria-label={label}>
      {icon}
    </a>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const links = navLinks();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
        <Link href="/" className="shrink-0" aria-label="9EMA home">
          <Image src="/9logo.png" alt="" width={720} height={480} className="h-12 w-auto object-contain" priority />
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-muted hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <div className="hidden items-center md:flex">
            {socialKeys.map((name) => (
              <SocialIconLink key={name} name={name} />
            ))}
          </div>
          <Link href="/#live" className={`${greenButtonClass} ml-2 hidden min-h-10 px-4 text-xs sm:inline-flex`}>
            Watch live <span aria-hidden="true">→</span>
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="text-xl leading-none">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <div id="mobile-nav" className="border-t border-line px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-3 text-lg text-white hover:bg-card"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-2">
            {socialKeys.map((name) => (
              <SocialIconLink key={name} name={name} />
            ))}
          </div>
          <Link href="/#live" className={`${greenButtonClass} mt-4 w-full`} onClick={() => setOpen(false)}>
            Watch live <span aria-hidden="true">→</span>
          </Link>
        </div>
      ) : null}
    </header>
  );
}
