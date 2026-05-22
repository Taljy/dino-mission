import type { Dino, Period } from "../data/dinos";
import { PERIOD_INFO } from "../data/dinos";

interface Props {
  dino: Dino;
}

const PERIODS: Period[] = ["Trias", "Jura", "Kreide"];

export default function PeriodTimeline({ dino }: Props) {
  return (
    <div className="bg-white rounded-2xl p-4 border-4 border-sand-dark/30">
      <h3 className="font-display text-xl text-dino-text mb-3">
        Wann lebte er?
      </h3>

      <div className="grid grid-cols-3 gap-2 mb-3">
        {PERIODS.map((period) => {
          const info = PERIOD_INFO[period];
          const isActive = dino.period === period;
          return (
            <div
              key={period}
              className={`rounded-2xl p-3 text-center transition-all border-b-4 ${
                isActive
                  ? "border-dino-green-dark scale-105"
                  : "border-stone-300 opacity-50"
              }`}
              style={{
                backgroundColor: isActive ? info.color : "#E8D5A8",
              }}
            >
              <div className="text-2xl mb-1">{info.icon}</div>
              <div
                className={`font-display text-sm ${
                  isActive ? "text-white" : "text-dino-text-light"
                }`}
              >
                {info.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-sand-light rounded-xl p-3 text-center">
        <div className="font-bold text-dino-text">
          Vor {dino.periodStartMya} – {dino.periodEndMya} Millionen Jahren
        </div>
        <div className="text-sm text-dino-text-light mt-1">
          Andrin lebt heute · Dinos lebten so lange vor uns 🦖
        </div>
      </div>

      <div className="mt-3 text-xs text-dino-text-light text-center">
        <span className="inline-block bg-sand-base px-2 py-1 rounded-full mx-0.5">
          Trias: 252–201 Mio
        </span>
        <span className="inline-block bg-sand-base px-2 py-1 rounded-full mx-0.5">
          Jura: 201–145 Mio
        </span>
        <span className="inline-block bg-sand-base px-2 py-1 rounded-full mx-0.5">
          Kreide: 145–66 Mio
        </span>
      </div>
    </div>
  );
}
