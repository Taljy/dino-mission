import { useState } from "react";
import { Search } from "lucide-react";
import { BottomNav } from "../components/BottomNav";
import { useProgress } from "../hooks/useProgress";
import { DINOS } from "../data/dinos";

export function StarsPage() {
  const { progress, totalStars, collectedCount, resetProgress } = useProgress();
  const [confirmReset, setConfirmReset] = useState(false);

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      window.setTimeout(() => setConfirmReset(false), 4000);
      return;
    }
    resetProgress();
    setConfirmReset(false);
  };

  return (
    <div className="min-h-screen pb-28">
      <div className="mx-auto flex max-w-md flex-col items-center px-5 pt-8">
        <h1 className="text-center font-display text-3xl leading-tight">
          <span className="text-dino-green">ANDRIN IST</span>{" "}
          <span className="text-dino-orange">DINO-FORSCHER!</span>
        </h1>

        <ForscherIllustration />

        <div className="my-4 flex items-center gap-2">
          <span className="font-display text-6xl text-yellow-500 drop-shadow">
            ⭐
          </span>
          <span className="font-display text-6xl text-dino-text">
            {totalStars}
          </span>
        </div>

        <div className="grid w-full grid-cols-1 gap-3">
          <StatCard label="Dinos entdeckt" value={`${collectedCount} / ${DINOS.length}`} />
          <StatCard label="Richtige Antworten" value={`${progress.totalCorrect}`} />
          <StatCard label="Beste Runde" value={`${progress.highScore} / 5`} />
        </div>

        <button
          type="button"
          onClick={handleReset}
          className={[
            "mt-6 rounded-full px-4 py-2 text-sm font-bold shadow-sm transition-colors",
            confirmReset
              ? "bg-red-500 text-white"
              : "bg-white/70 text-dino-text-light",
          ].join(" ")}
        >
          {confirmReset ? "Wirklich? Klick nochmal!" : "Fortschritt zurücksetzen"}
        </button>

        <footer className="mt-10 text-center text-xs text-dino-text-light">
          made with 🦕 for Andrin · by Mario · Studio Da Rugna · 2026
        </footer>
      </div>
      <BottomNav />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3 shadow-sm">
      <span className="font-display text-lg text-dino-text">{label}</span>
      <span className="font-display text-2xl text-dino-orange">{value}</span>
    </div>
  );
}

function ForscherIllustration() {
  return (
    <div className="relative my-4 flex h-32 w-32 items-center justify-center rounded-full bg-amber-200 shadow-inner">
      <span className="text-6xl" role="img" aria-label="Forscher">
        🧑‍🔬
      </span>
      <Search
        size={36}
        className="absolute -bottom-1 -right-1 rotate-12 text-dino-blue-dark drop-shadow"
        strokeWidth={3}
      />
    </div>
  );
}
