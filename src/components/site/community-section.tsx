import Image from "next/image";
import { configuredSocial, siteConfig, socialLabels, type SocialKey } from "@/config/site";
import { SocialGlyph } from "@/components/site/icons";
import { greenButtonClass } from "@/components/site/ui";
import Link from "next/link";

const keys: SocialKey[] = ["youtube", "kick", "tiktok", "x"];

export function CommunitySection() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-line px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-line bg-card lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative min-h-80">
          <Image
            src="/images/9-hero.jpg"
            alt="Close portrait of 9 wearing the black 9EMA mask"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-[center_18%]"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-10 md:px-12">
          <h2 className="font-display text-5xl font-bold uppercase leading-[0.9] text-white sm:text-6xl">
            Join the community.
          </h2>
          <p className="mt-4 max-w-lg text-lg text-muted">
            Live trades. Trading setups. Market updates. Traders learning together.
          </p>
          <p className="mt-4 max-w-lg text-sm leading-6 text-muted">
            9 is an AI-generated trading personality. The livestreams and commentary are educational
            content, not personalized financial advice.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {keys.map((key) => {
              const href = configuredSocial(key);
              const icon = (
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-white">
                  <SocialGlyph name={key} className="h-5 w-5" />
                </span>
              );
              return href ? (
                <a key={key} href={href} target="_blank" rel="noreferrer" aria-label={socialLabels[key]}>
                  {icon}
                </a>
              ) : (
                <span key={key} aria-label={`${socialLabels[key]} is not linked yet`} title={`${siteConfig.socialHandle} is not linked yet`}>
                  {icon}
                </span>
              );
            })}
          </div>
          <Link href="/#live" className={`${greenButtonClass} mt-8 w-fit`}>
            Watch live <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
