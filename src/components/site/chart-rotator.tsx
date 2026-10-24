"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const shots = [
  {
    src: "/images/9-chart-day.jpg",
    alt: "Desk monitor showing a 9EMA chart with zones and volume bubbles",
  },
  {
    src: "/images/9-chart-night.jpg",
    alt: "Dark-room monitor showing a 9EMA chart with zones and volume bubbles",
  },
];

export function ChartRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((current) => (current + 1) % shots.length), 4000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-line bg-black">
      {shots.map((shot, i) => (
        <Image
          key={shot.src}
          src={shot.src}
          alt={i === index ? shot.alt : ""}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className={`object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
          priority={i === 0}
        />
      ))}
    </div>
  );
}
