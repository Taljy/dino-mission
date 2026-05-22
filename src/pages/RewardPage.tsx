import { Link, useSearchParams } from "react-router-dom";
import { Confetti } from "../components/Confetti";
import { Star } from "lucide-react";

interface Reaction {
  emoji: string;
  title: string;
  subtitle: string;
  stars: number;
  confetti: boolean;
  image: string;
}

function reactionFor(score: number): Reaction {
  if (score >= 5) {
    return {
      emoji: "🦖",
      title: "PERFEKT!",
      subtitle: "Du bist ein echter Dino-Forscher!",
      stars: 3,
      confetti: true,
      image: "/dinos/trex.png",
    };
  }
  if (score >= 3) {
    return {
      emoji: "🌟",
      title: "Super gemacht!",
      subtitle: `${score} von 5 richtig — stark!`,
      stars: 2,
      confetti: true,
      image: "/dinos/triceratops.png",
    };
  }
  if (score >= 1) {
    return {
      emoji: "👍",
      title: "Gut versucht!",
      subtitle: `${score} von 5 richtig.`,
      stars: 1,
      confetti: false,
      image: "/dinos/stegosaurus.png",
    };
  }
  return {
    emoji: "🦕",
    title: "Probier nochmal!",
    subtitle: "Jeder Forscher fängt mal klein an.",
    stars: 0,
    confetti: false,
    image: "/dinos/brachiosaurus.png",
  };
}

export function RewardPage() {
  const [params] = useSearchParams();
  const score = Math.max(0, Math.min(5, Number(params.get("score") ?? 0)));
  const r = reactionFor(score);

  return (
    <div className="min-h-screen pb-10">
      {r.confetti && <Confetti count={r.stars === 3 ? 60 : 30} />}
      <div className="mx-auto flex max-w-md flex-col items-center px-5 pt-10">
        <div className="text-6xl">{r.emoji}</div>
        <h1 className="mt-2 text-center font-display text-4xl text-dino-text">
          {r.title}
        </h1>
        <p className="mt-1 text-center font-display text-lg text-dino-text-light">
          {r.subtitle}
        </p>

        <div className="my-5 flex h-[220px] w-full items-center justify-center">
          <img
            src={r.image}
            alt="Belohnung"
            className="max-h-[220px] w-auto object-contain drop-shadow-xl"
          />
        </div>

        <div className="mb-6 flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Star
              key={i}
              size={44}
              className={
                i < r.stars
                  ? "text-yellow-400 fill-yellow-400 drop-shadow"
                  : "text-sand-dark/50"
              }
              strokeWidth={2}
            />
          ))}
        </div>

        <Link
          to="/quiz"
          className="mb-3 w-full rounded-3xl border-b-8 border-dino-green-dark bg-dino-green px-8 py-4 text-center font-display text-3xl text-white shadow-lg transition-transform active:translate-y-1 active:border-b-2"
        >
          Nochmal spielen
        </Link>
        <Link
          to="/park"
          className="w-full rounded-3xl border-b-8 border-dino-blue-dark bg-dino-blue px-8 py-4 text-center font-display text-3xl text-white shadow-lg transition-transform active:translate-y-1 active:border-b-2"
        >
          Zum Dino-Park
        </Link>
      </div>
    </div>
  );
}
