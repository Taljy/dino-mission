import { Volume2 } from "lucide-react";
import type { Dino } from "../data/dinos";

const BUTTON_STYLES = [
  "bg-dino-green border-dino-green-dark",
  "bg-dino-orange border-dino-orange-dark",
  "bg-dino-blue border-dino-blue-dark",
] as const;

export type Feedback = "correct" | "wrong" | null;

interface QuizQuestionProps {
  correct: Dino;
  options: Dino[];
  selected: Dino | null;
  feedback: Feedback;
  onSelect: (dino: Dino) => void;
  onReadQuestion: () => void;
  questionNumber: number;
  totalQuestions: number;
}

export function QuizQuestion({
  correct,
  options,
  selected,
  feedback,
  onSelect,
  onReadQuestion,
  questionNumber,
  totalQuestions,
}: QuizQuestionProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-3 flex w-full items-center justify-between px-2">
        <span className="font-display text-lg text-dino-text-light">
          Frage {questionNumber} / {totalQuestions}
        </span>
        <button
          type="button"
          onClick={onReadQuestion}
          className="flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-sm font-bold text-dino-text shadow-sm"
          aria-label="Frage vorlesen"
        >
          <Volume2 size={18} />
          Vorlesen
        </button>
      </div>

      <h2 className="mb-3 text-center font-display text-3xl text-dino-text">
        Welcher Dino ist das?
      </h2>

      <div className="mb-4 flex h-[300px] w-full items-center justify-center">
        <img
          src={correct.image}
          alt="Mystery-Dino"
          className="max-h-[300px] w-auto object-contain drop-shadow-lg"
        />
      </div>

      <div className="flex w-full flex-col gap-3">
        {options.map((opt, i) => {
          const isCorrect = opt.slug === correct.slug;
          const isSelected = selected?.slug === opt.slug;
          const showResult = feedback !== null;

          let extra = "";
          if (showResult) {
            if (isCorrect) {
              extra =
                "ring-4 ring-yellow-300 scale-[1.03] shadow-[0_0_25px_rgba(91,169,66,0.6)]";
            } else if (isSelected) {
              extra = "opacity-60 grayscale";
            } else {
              extra = "opacity-60";
            }
          }

          return (
            <button
              key={opt.slug}
              type="button"
              disabled={showResult}
              onClick={() => onSelect(opt)}
              className={[
                "w-full rounded-2xl border-b-4 py-4 px-6 font-display text-2xl text-white shadow-sm transition-all",
                BUTTON_STYLES[i % BUTTON_STYLES.length],
                showResult ? "" : "active:translate-y-1 active:border-b-0",
                extra,
              ].join(" ")}
              style={{ minHeight: 64 }}
            >
              {opt.name}
            </button>
          );
        })}
      </div>

      {feedback === "wrong" && (
        <p className="mt-4 text-center font-display text-xl text-dino-text">
          Das war der {correct.name}.
        </p>
      )}
      {feedback === "correct" && (
        <p className="mt-4 text-center font-display text-xl text-dino-green-dark">
          Richtig! Das ist der {correct.name}!
        </p>
      )}
    </div>
  );
}
