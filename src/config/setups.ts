export type Setup = {
  slug: string;
  name: string;
  summary: string;
  chart: "pullback" | "sweep" | "double";
  entry: string;
  invalidation: string;
  stop: string;
  target: string;
};

export const setups: Setup[] = [
  {
    slug: "9-ema-pullback",
    name: "9 EMA Pullback",
    summary: "Trade with the trend using clean 9 EMA pullback entries.",
    chart: "pullback",
    entry:
      "A trend is already underway. Price pulls back to the 9-period exponential moving average, then a candle closes back in the direction of that trend.",
    invalidation:
      "Price closes through the 9 EMA against the trend and does not reclaim it on the following candles.",
    stop: "Beyond the pullback swing, on the far side of the 9 EMA. This page does not set a fixed tick distance.",
    target:
      "The prior swing in the direction of the trend. A target is a plan, not a promised result.",
  },
  {
    slug: "liquidity-sweep",
    name: "Liquidity Sweep",
    summary: "Identify liquidity grabs and potential reversals.",
    chart: "sweep",
    entry:
      "Price trades beyond a prior high or low, then closes back inside the range. The educational entry is after that reclaim, in the opposite direction of the sweep.",
    invalidation:
      "Price accepts beyond the swept level and continues instead of returning inside the range.",
    stop: "Beyond the wick that swept the level.",
    target:
      "The opposite side of the range, or the middle of the range. Neither outcome is guaranteed.",
  },
  {
    slug: "double-top-bottom",
    name: "Double Top / Bottom",
    summary: "Learn to identify potential reversals at key levels.",
    chart: "double",
    entry:
      "Price tests a similar high or low twice, then breaks the neckline between those tests. The educational entry is after that break, not while the second test is still forming.",
    invalidation:
      "Price reclaims the neckline and holds back inside the pattern.",
    stop: "Beyond the extreme of the two tests.",
    target:
      "A common teaching method measures the height of the pattern and projects it from the neckline. That measurement is a plan, not a forecast.",
  },
];

export function getSetup(slug: string) {
  return setups.find((setup) => setup.slug === slug);
}
