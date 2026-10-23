import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { siteConfig } from "@/config/site";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const title = "9EMA — One Indicator. Live Trading. Real Setups.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: "%s · 9EMA",
  },
  description: siteConfig.description,
  icons: { icon: "/9logo.png" },
  openGraph: {
    title,
    description: siteConfig.description,
    url: "/",
    siteName: "9EMA",
    images: [
      {
        url: "/images/9-hero.jpg",
        alt: "9, the 9EMA AI trading personality",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
    images: ["/images/9-hero.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-hidden bg-background text-foreground">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-neon focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <Header />
        <div id="content" className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
