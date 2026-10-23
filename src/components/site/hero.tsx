import Image from "next/image";
import { configuredSocial, siteConfig, socialLabels, type SocialKey } from "@/config/site";
import { PlayIcon, SocialGlyph } from "@/components/site/icons";
import { greenButtonClass } from "@/components/site/ui";
import Link from "next/link";

const heroSocials: SocialKey[] = ["youtube", "kick", "tiktok"];

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-neon/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-neon">MEET YOUR AI TRADER</p>
          <h1 className="mt-4 font-display text-6xl font-bold uppercase leading-[0.88] text-white sm:text-7xl lg:text-8xl">
            Meet 9.
            <br />
            Live trading.
            <br />
            Real setups.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-muted">{siteConfig.description}</p>
          <Link href="/#live" className={`${greenButtonClass} mt-8`}>
            <PlayIcon className="h-5 w-5" />
            Watch live
            <span aria-hidden="true">→</span>
          </Link>
          <ul className="mt-8 flex flex-wrap gap-4">
            {heroSocials.map((key) => {
              const href = configuredSocial(key);
              const content = (
                <>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-card text-white">
                    <SocialGlyph name={key} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{socialLabels[key]}</span>
                    <span className="block text-xs text-muted">
                      {href ? siteConfig.socialHandle : `${siteConfig.socialHandle} · not linked yet`}
                    </span>
                  </span>
                </>
              );
              return (
                <li key={key}>
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-3">
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-xl">
          <div className="relative aspect-[11/10] overflow-hidden rounded-[2rem] border border-line bg-card">
            <Image
              src="/images/9-hero-car.jpg"
              alt="9 wearing a black 9EMA mask, making a peace sign in front of a black Mercedes"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
