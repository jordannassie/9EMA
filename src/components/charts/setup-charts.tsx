type ChartName = "pullback" | "sweep" | "double" | "indicator";

function Candle({
  x,
  open,
  close,
  high,
  low,
}: {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
}) {
  const up = close <= open;
  const top = Math.min(open, close);
  const height = Math.max(Math.abs(close - open), 2);
  return (
    <g>
      <line x1={x} x2={x} y1={high} y2={low} stroke={up ? "#A8FF00" : "#ff5a5a"} strokeWidth="1.5" />
      <rect x={x - 5} y={top} width="10" height={height} fill={up ? "#A8FF00" : "#ff5a5a"} rx="1" />
    </g>
  );
}

export function SetupChart({ name }: { name: ChartName }) {
  const label = {
    pullback: "Illustrated rising chart with a pullback to a moving average",
    sweep: "Illustrated chart sweeping below a prior low and reversing",
    double: "Illustrated chart with two similar highs and a neckline break",
    indicator: "Illustrated candlestick chart with example buy and sell marks",
  }[name];

  return (
    <svg viewBox="0 0 360 200" role="img" aria-label={label} className="h-full w-full">
      <rect width="360" height="200" fill="#070b08" />
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="16" x2="344" y1={y} y2={y} stroke="#263126" strokeWidth="1" />
      ))}
      {name === "pullback" ? <Pullback /> : null}
      {name === "sweep" ? <Sweep /> : null}
      {name === "double" ? <DoubleTop /> : null}
      {name === "indicator" ? <IndicatorChart /> : null}
    </svg>
  );
}

function Pullback() {
  const candles = [
    [40, 150, 132, 154, 128],
    [70, 134, 118, 140, 112],
    [100, 120, 104, 126, 100],
    [130, 108, 122, 128, 104],
    [160, 120, 108, 124, 102],
    [190, 110, 92, 114, 88],
    [220, 94, 78, 98, 74],
    [250, 80, 64, 84, 60],
  ];
  return (
    <g>
      <path d="M28 146 C80 132, 120 118, 160 112 S250 78, 332 62" fill="none" stroke="#78E600" strokeWidth="2" />
      {candles.map(([x, open, close, high, low]) => (
        <Candle key={x} x={x} open={open} close={close} high={high} low={low} />
      ))}
    </g>
  );
}

function Sweep() {
  return (
    <g>
      <line x1="24" x2="336" y1="132" y2="132" stroke="#A5AAA5" strokeDasharray="4 4" />
      <Candle x={50} open={90} close={110} high={84} low={116} />
      <Candle x={90} open={108} close={124} high={100} low={128} />
      <Candle x={130} open={122} close={140} high={116} low={168} />
      <Candle x={170} open={138} close={112} high={142} low={118} />
      <Candle x={210} open={114} close={96} high={118} low={90} />
      <Candle x={250} open={98} close={78} high={104} low={72} />
      <Candle x={290} open={80} close={66} high={86} low={60} />
    </g>
  );
}

function DoubleTop() {
  return (
    <g>
      <line x1="40" x2="320" y1="128" y2="128" stroke="#A5AAA5" strokeDasharray="4 4" />
      <Candle x={46} open={150} close={120} high={154} low={112} />
      <Candle x={86} open={122} close={78} high={126} low={70} />
      <Candle x={126} open={80} close={118} high={74} low={124} />
      <Candle x={166} open={116} close={82} high={120} low={74} />
      <Candle x={206} open={84} close={132} high={78} low={138} />
      <Candle x={246} open={130} close={150} high={124} low={156} />
      <Candle x={286} open={148} close={168} high={142} low={174} />
    </g>
  );
}

function IndicatorChart() {
  return (
    <g>
      <Candle x={40} open={140} close={118} high={146} low={110} />
      <Candle x={78} open={120} close={100} high={126} low={94} />
      <Candle x={116} open={102} close={88} high={108} low={82} />
      <Candle x={154} open={90} close={112} high={116} low={86} />
      <Candle x={192} open={110} close={96} high={118} low={90} />
      <Candle x={230} open={98} close={70} high={104} low={64} />
      <Candle x={268} open={72} close={92} high={98} low={66} />
      <Candle x={306} open={90} close={120} high={126} low={84} />
      <g>
        <rect x="96" y="28" width="54" height="22" rx="4" fill="#A8FF00" />
        <text x="123" y="43" textAnchor="middle" fontSize="11" fontWeight="700" fill="#050706">
          BUY
        </text>
      </g>
      <g>
        <rect x="250" y="132" width="58" height="22" rx="4" fill="#ff5a5a" />
        <text x="279" y="147" textAnchor="middle" fontSize="11" fontWeight="700" fill="#050706">
          SELL
        </text>
      </g>
    </g>
  );
}
