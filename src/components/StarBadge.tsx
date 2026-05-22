import { Star } from "lucide-react";
import type { Stars } from "../hooks/useProgress";

interface StarBadgeProps {
  stars: Stars;
  size?: number;
  showEmpty?: boolean;
}

export function StarBadge({ stars, size = 18, showEmpty = true }: StarBadgeProps) {
  const total = 3;
  return (
    <div className="flex items-center justify-center gap-0.5">
      {Array.from({ length: total }).map((_, i) => {
        const filled = i < stars;
        if (!filled && !showEmpty) return null;
        return (
          <Star
            key={i}
            size={size}
            className={
              filled
                ? "text-yellow-400 fill-yellow-400 drop-shadow"
                : "text-sand-dark/60"
            }
            strokeWidth={2}
          />
        );
      })}
    </div>
  );
}
