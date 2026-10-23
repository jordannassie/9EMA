export type Direction = "bullish" | "bearish" | "neutral";
export type Category = "candlestick" | "reversal" | "continuation" | "setups";

export type Candle = { o: number; h: number; l: number; c: number };

export type Diagram =
  | { kind: "candles"; label: string; candles: Candle[] }
  | {
      kind: "chart";
      label: string;
      path: string;
      lines?: { d: string; color: string }[];
      marks?: { x: number; y: number; text: string; color: string }[];
    }
  | { kind: "setup"; chart: "pullback" | "sweep" | "double"; label: string };

export type Pattern = {
  slug: string;
  name: string;
  category: Category;
  direction: Direction;
  order: number;
  summary: string;
  description: string;
  identification: string[];
  context: string;
  entry: string;
  stop: string;
  target: string;
  mistakes: string[];
  related: string[];
  diagram: Diagram;
  body: string;
};

export const categoryLabels: Record<Category | "all", string> = {
  all: "All",
  candlestick: "Candlestick Patterns",
  reversal: "Reversal Patterns",
  continuation: "Continuation Patterns",
  setups: "9EMA Trading Setups",
};

export const directionLabels: Record<Direction | "all", string> = {
  all: "All",
  bullish: "Bullish",
  bearish: "Bearish",
  neutral: "Neutral",
};
