import type { Dino } from "../data/dinos";
import { HABITAT_INFO } from "../data/dinos";

interface Props {
  dino: Dino;
}

export default function HabitatBadges({ dino }: Props) {
  return (
    <div className="bg-white rounded-2xl p-4 border-4 border-sand-dark/30">
      <h3 className="font-display text-xl text-dino-text mb-3">
        Wo lebte er?
      </h3>
      <div className="flex flex-wrap gap-2">
        {dino.habitats.map((habitat) => {
          const info = HABITAT_INFO[habitat];
          return (
            <div
              key={habitat}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-sand-light border-2 border-sand-dark/40"
            >
              <span className="text-xl">{info.icon}</span>
              <span className="font-bold text-dino-text">{info.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
