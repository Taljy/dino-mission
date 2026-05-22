import { Link } from "react-router-dom";
import type { Dino } from "../data/dinos";
import type { Stars } from "../hooks/useProgress";
import { StarBadge } from "./StarBadge";

interface DinoCardProps {
  dino: Dino;
  stars: Stars;
}

export function DinoCard({ dino, stars }: DinoCardProps) {
  const unlocked = stars > 0;
  const body = (
    <div
      className={[
        "flex h-full flex-col items-center rounded-3xl border-b-4 bg-white/70 p-3 shadow-sm transition-transform",
        unlocked
          ? "border-sand-dark active:translate-y-1 active:border-b-0"
          : "border-sand-dark/60",
      ].join(" ")}
    >
      <div className="flex h-32 w-full items-center justify-center">
        <img
          src={dino.image}
          alt={unlocked ? dino.name : "Unbekannter Dino"}
          loading="lazy"
          className="max-h-32 w-auto object-contain"
          style={
            unlocked ? undefined : { filter: "grayscale(1)", opacity: 0.4 }
          }
        />
      </div>
      <p className="mt-2 font-display text-lg text-dino-text">
        {unlocked ? dino.name : "???"}
      </p>
      {unlocked ? (
        <StarBadge stars={stars} />
      ) : (
        <p className="text-xs text-dino-text-light">Noch nicht entdeckt</p>
      )}
    </div>
  );

  if (!unlocked) return body;
  return (
    <Link to={`/park/${dino.slug}`} className="block">
      {body}
    </Link>
  );
}
