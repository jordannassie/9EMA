import { BookSection } from "@/components/site/book-section";
import { CommunitySection } from "@/components/site/community-section";
import { Hero } from "@/components/site/hero";
import { IndicatorChartSection } from "@/components/site/indicator-chart-section";
import { IndicatorSection } from "@/components/site/indicator-section";
import { LiveSection } from "@/components/site/live-section";
import { PartnersSection } from "@/components/site/partners-section";
import { SetupsSection } from "@/components/site/setups-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <LiveSection />
      <IndicatorChartSection />
      <IndicatorSection />
      <SetupsSection />
      <BookSection />
      <PartnersSection />
      <CommunitySection />
    </main>
  );
}
