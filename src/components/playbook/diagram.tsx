import { SetupChart } from "@/components/charts/setup-charts";
import type { Candle, Diagram } from "@/lib/playbook/types";

export function PatternDiagram({ diagram }: { diagram: Diagram }) {
  if (diagram.kind === "setup") {
    return (
      <div className="h-full w-full bg-[#070b08]">
        <SetupChart name={diagram.chart} />
      </div>
    );
  }
  if (diagram.kind === "candles") return <CandleDiagram label={diagram.label} candles={diagram.candles} />;
  return <ChartDiagram diagram={diagram} />;
}

function CandleDiagram({ candles, label }: { candles: Candle[]; label: string }) {
  const width = 320;
  const height = 180;
  const pad = 18;
  const max = Math.max(...candles.map((candle) => candle.h));
  const min = Math.min(...candles.map((candle) => candle.l));
  const span = max - min || 1;
  const y = (price: number) => pad + ((max - price) / span) * (height - pad * 2);
  const slot = (width - pad * 2) / candles.length;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label} className="h-full w-full">
      <rect width={width} height={height} fill="#070b08" />
      {candles.map((candle, index) => {
        const up = candle.c >= candle.o;
        const color = up ? "#A8FF00" : "#ff5a5a";
        const x = pad + slot * index + slot / 2;
        const bodyTop = y(Math.max(candle.o, candle.c));
        const bodyHeight = Math.max(Math.abs(y(candle.o) - y(candle.c)), 2);
        const bodyWidth = Math.min(14, slot * 0.55);
        return (
          <g key={`${candle.o}-${candle.c}-${index}`}>
            <line x1={x} x2={x} y1={y(candle.h)} y2={y(candle.l)} stroke={color} strokeWidth="1.6" />
            <rect x={x - bodyWidth / 2} y={bodyTop} width={bodyWidth} height={bodyHeight} fill={color} rx="1" />
          </g>
        );
      })}
    </svg>
  );
}

function ChartDiagram({
  diagram,
}: {
  diagram: Extract<Diagram, { kind: "chart" }>;
}) {
  return (
    <svg viewBox="0 0 320 180" role="img" aria-label={diagram.label} className="h-full w-full">
      <rect width="320" height="180" fill="#070b08" />
      {(diagram.lines ?? []).map((line) => (
        <path key={line.d} d={line.d} fill="none" stroke={line.color} strokeWidth="1.5" strokeDasharray="4 3" />
      ))}
      <path d={diagram.path} fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      {(diagram.marks ?? []).map((mark) => (
        <text key={`${mark.text}-${mark.x}`} x={mark.x} y={mark.y} fill={mark.color} fontSize="11" fontWeight="700">
          {mark.text}
        </text>
      ))}
    </svg>
  );
}
