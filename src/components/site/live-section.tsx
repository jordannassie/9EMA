import Image from "next/image";
import { configuredSocial, siteConfig, socialLabels, type SocialKey } from "@/config/site";
import { ArrowIcon, SocialGlyph } from "@/components/site/icons";

const platforms: SocialKey[] = ["youtube", "kick", "tiktok"];

export function LiveSection() {
  const videoId = siteConfig.live.youtubeVideoId.trim();

  return (
    <section id="live" className="scroll-mt-24 border-t border-line px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          <h2 className="font-display text-5xl font-bold uppercase leading-[0.9] text-white sm:text-6xl">
            Watch 9 live every day.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Live market analysis. Real trades. Real-time commentary.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {platforms.map((key) => {
              const href = configuredSocial(key);
              const label = key === "tiktok" ? "TikTok Live" : socialLabels[key];
              const body = (
                <>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
                    <SocialGlyph name={key} className="h-6 w-6" />
                  </span>
                  <span className="mt-5 block text-xs uppercase tracking-[0.18em] text-muted">Watch on</span>
                  <span className="mt-1 block font-display text-2xl font-bold uppercase text-white">{label}</span>
                  <span className="mt-2 block text-sm text-muted">
                    {href ? siteConfig.socialHandle : "Channel URL is not set"}
                  </span>
                  <span className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-neon">
                    <ArrowIcon className="h-4 w-4" />
                  </span>
                </>
              );
              return (
                <li key={key}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-full flex-col rounded-2xl border border-line bg-card p-5 transition-colors hover:border-neon"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="flex h-full flex-col rounded-2xl border border-line bg-card p-5">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="overflow-hidden rounded-2xl border border-line bg-card">
          <div className={`relative ${videoId ? "aspect-video" : "aspect-[11/10]"}`}>
            {videoId ? (
              <iframe
                title="9EMA YouTube livestream"
                src={`https://www.youtube.com/embed/${encodeURIComponent(videoId)}`}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <Image
                  src="/images/9-cafe.jpg"
                  alt="9 at a coffee shop wearing a black 9EMA mask, with a chart open on a laptop"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16">
                  <p className="font-display text-3xl font-bold uppercase text-white">Livestream preview</p>
                  <p className="mt-2 max-w-sm text-sm text-white/80">
                    A YouTube embed appears here after a video id is added. No live status is shown until then.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
