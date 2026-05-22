import { BottomNav } from "../components/BottomNav";
import { DinoCard } from "../components/DinoCard";
import { DINOS } from "../data/dinos";
import { useProgress } from "../hooks/useProgress";

export function ParkPage() {
  const { getStars, collectedCount } = useProgress();

  return (
    <div className="min-h-screen pb-28">
      <div className="mx-auto max-w-md px-5 pt-8">
        <h1 className="text-center font-display text-4xl">
          <span className="text-dino-green">DINO-</span>
          <span className="text-dino-orange">PARK</span>
        </h1>
        <p className="mt-1 text-center font-display text-lg text-dino-text-light">
          Deine Dinos
        </p>

        <div className="mt-4 rounded-2xl bg-white/60 px-4 py-2 text-center shadow-sm">
          <p className="font-display text-lg text-dino-text">
            {collectedCount} von {DINOS.length} entdeckt
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {DINOS.map((dino) => (
            <DinoCard key={dino.slug} dino={dino} stars={getStars(dino.slug)} />
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
