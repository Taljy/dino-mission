import { useMemo } from "react";

const COLORS = [
  "#5BA942",
  "#E67E3F",
  "#5A8FB8",
  "#F4C542",
  "#D94F4F",
  "#9C5BD0",
];

interface ConfettiProps {
  count?: number;
}

export function Confetti({ count = 30 }: ConfettiProps) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 1.6 + Math.random() * 1.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 8 + Math.random() * 10,
        rotate: Math.random() * 360,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            left: `${p.left}%`,
            top: "-5vh",
            width: p.size,
            height: p.size * 0.4,
            background: p.color,
            transform: `rotate(${p.rotate}deg)`,
            animation: `confetti-fall ${p.duration}s ease-out ${p.delay}s forwards`,
            borderRadius: 2,
          }}
          className="absolute"
        />
      ))}
    </div>
  );
}
