import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Logo } from "../components/Logo";
import { BottomNav } from "../components/BottomNav";
import { SettingsToggles } from "../components/SettingsToggles";
import { useProgress } from "../hooks/useProgress";
import { useSound } from "../hooks/useSound";
import { DINOS } from "../data/dinos";

export function HomePage() {
  const navigate = useNavigate();
  const { collectedCount, totalStars, resetProgress } = useProgress();
  const { playClick } = useSound();
  const [dinoOfDay] = useState(
    () => DINOS[Math.floor(Math.random() * DINOS.length)],
  );

  const handleReset = () => {
    const ok = window.confirm(
      "Wirklich alles zurücksetzen? Alle Dinos und Sterne gehen verloren.",
    );
    if (!ok) return;
    resetProgress();
    navigate("/");
  };

  return (
    <div className="min-h-screen pb-28">
      <div className="mx-auto max-w-md">
        <div className="flex justify-end px-4 pt-4">
          <SettingsToggles />
        </div>
      </div>
      <div className="mx-auto flex max-w-md flex-col items-center px-5 pt-2">
        <Logo />

        <div className="my-4 flex justify-center">
          <img
            src="/branding/hero-andrin.png"
            alt="Andrin der Dino-Forscher"
            className="h-auto w-full max-w-sm"
            loading="eager"
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

        <section className="mt-6 w-full rounded-3xl border-4 border-sand-dark bg-white p-5 shadow-sm">
          <p className="text-center font-display text-sm tracking-widest text-dino-text-light">
            DINO DES TAGES
          </p>
          <div className="my-2 flex h-[180px] w-full items-center justify-center">
            <img
              src={dinoOfDay.image}
              alt={dinoOfDay.name}
              className="max-h-[180px] w-auto object-contain drop-shadow"
            />
          </div>
          <p className="text-center font-display text-3xl text-dino-text">
            {dinoOfDay.name}
          </p>
          <Link
            to={`/park/${dinoOfDay.slug}`}
            onClick={() => playClick()}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border-b-4 border-dino-blue-dark bg-dino-blue px-4 py-3 font-display text-xl text-white shadow-sm transition-transform active:translate-y-1 active:border-b-0"
          >
            <Sparkles size={22} />
            Frag den Dino-Profi!
          </Link>
        </section>

        <button
          type="button"
          onClick={handleReset}
          className="mt-8 bg-transparent text-sm text-dino-text-light underline shadow-none"
          style={{ minHeight: 0 }}
        >
          🔄 Fortschritt zurücksetzen
        </button>
      </div>
      <BottomNav />
    </div>
  );
}
