type IconProps = { className?: string };

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z"
      />
    </svg>
  );
}

export function KickIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M4 3h5.2v6.2L14 3h6.1l-6.3 7.2L20.4 21H14l-4.8-6.4V21H4V3z"
      />
    </svg>
  );
}

export function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M14.2 3c.4 2.4 1.8 4.1 4.1 4.5v2.7c-1.4 0-2.7-.4-4-1.2v6.4c0 3.4-2.6 6.1-6.2 6.1S2 18.8 2 15.4c0-3.3 2.5-5.9 5.8-6.1v2.8c-1.6.2-2.8 1.5-2.8 3.2 0 1.8 1.4 3.2 3.2 3.2s3.2-1.4 3.2-3.3V3h2.8z"
      />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M14.7 10.3 22.4 2h-1.8l-6.7 7.2L8.7 2H2.2l8.1 11.2L2.2 22h1.8l7.1-7.6L15.5 22h6.5l-7.3-11.7zm-2.5 2.7-.8-1.1L4.7 3.5h2.8l5.2 7 .8 1.1 6.8 9.2h-2.8l-5.3-7.8z"
      />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14M13 6l6 6-6 6"
      />
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path fill="currentColor" d="M10 8.5v7l6-3.5-6-3.5z" />
    </svg>
  );
}

const socialIcons = {
  youtube: YouTubeIcon,
  kick: KickIcon,
  tiktok: TikTokIcon,
  x: XIcon,
};

export function SocialGlyph({
  name,
  className,
}: {
  name: keyof typeof socialIcons;
  className?: string;
}) {
  const Icon = socialIcons[name];
  return <Icon className={className} />;
}
