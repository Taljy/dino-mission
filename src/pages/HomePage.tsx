import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { BottomNav } from "../components/BottomNav";
import { useProgress } from "../hooks/useProgress";
import { useSound } from "../hooks/useSound";
import { DINOS } from "../data/dinos";

export function HomePage() {
  const { collectedCount, totalStars } = useProgress();
  const { playClick } = useSound();

  return (
    <div className="min-h-screen pb-28">
      <div className="mx-auto flex max-w-md flex-col items-center px-5 pt-8">
        <Logo />
        <p className="mt-2 font-display text-xl text-dino-text-light">
          Bist du bereit, Forscher?
        </p>

        <div className="my-4 flex h-[280px] w-full items-center justify-center">
          <img
            src="/dinos/trex.png"
            alt="T-Rex"
            className="max-h-[280px] w-auto animate-bounce-slow object-contain drop-shadow-xl"
          />
        </div>

        <Link
          to="/quiz"
          onClick={() => playClick()}
          className="w-full rounded-3xl border-b-8 border-dino-orange-dark bg-dino-orange px-8 py-5 text-center font-display text-4xl text-white shadow-lg transition-transform active:translate-y-1 active:border-b-2"
        >
          STARTEN
        </Link>

        <div className="mt-6 w-full rounded-2xl bg-white/60 px-4 py-3 text-center shadow-sm">
          <p className="font-display text-lg text-dino-text">
            {collectedCount} / {DINOS.length} Dinos entdeckt
          </p>
          <p className="text-sm text-dino-text-light">
            ⭐ {totalStars} Sterne gesammelt
          </p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
