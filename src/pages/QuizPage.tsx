import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DINOS, type Dino } from "../data/dinos";
import { useProgress } from "../hooks/useProgress";
import { useSound } from "../hooks/useSound";
import { useSpeech } from "../hooks/useSpeech";
import { QuizQuestion, type Feedback } from "../components/QuizQuestion";
import { Confetti } from "../components/Confetti";
import { SettingsToggles } from "../components/SettingsToggles";

const TOTAL_QUESTIONS = 5;
const CORRECT_DELAY_MS = 1500;
const WRONG_DELAY_MS = 2500;

interface Round {
  correct: Dino;
  options: Dino[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildRounds(): Round[] {
  const pickedCorrect = shuffle(DINOS).slice(0, TOTAL_QUESTIONS);
  return pickedCorrect.map((correct) => {
    const wrongs = shuffle(DINOS.filter((d) => d.slug !== correct.slug)).slice(
      0,
      2,
    );
    return {
      correct,
      options: shuffle([correct, ...wrongs]),
    };
  });
}

export function QuizPage() {
  const navigate = useNavigate();
  const [rounds] = useState<Round[]>(() => buildRounds());
  const [currentQ, setCurrentQ] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selected, setSelected] = useState<Dino | null>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const { recordAnswer, recordRoundScore } = useProgress();
  const { playCorrect, playWrong } = useSound();
  const { speak, cancel } = useSpeech();

  const round = rounds[currentQ];

  const finalScore = useMemo(() => correctCount, [correctCount]);

  useEffect(() => {
    return () => cancel();
  }, [cancel]);

  const handleSelect = (choice: Dino) => {
    if (feedback !== null) return;
    const isCorrect = choice.slug === round.correct.slug;
    setSelected(choice);
    setFeedback(isCorrect ? "correct" : "wrong");
    recordAnswer(round.correct.slug, isCorrect);
    if (isCorrect) {
      playCorrect();
      setCorrectCount((c) => c + 1);
    } else {
      playWrong();
      speak(`Das war der ${round.correct.name}.`);
    }

    const delay = isCorrect ? CORRECT_DELAY_MS : WRONG_DELAY_MS;
    window.setTimeout(() => {
      const nextScore = correctCount + (isCorrect ? 1 : 0);
      if (currentQ + 1 >= TOTAL_QUESTIONS) {
        recordRoundScore(nextScore);
        navigate(`/reward?score=${nextScore}`);
      } else {
        setCurrentQ((q) => q + 1);
        setSelected(null);
        setFeedback(null);
      }
    }, delay);
  };

  const handleReadQuestion = () => {
    speak("Welcher Dino ist das?");
  };

  if (!round) return null;

  return (
    <div className="min-h-screen pb-10">
      {feedback === "correct" && <Confetti />}
      <div className="mx-auto max-w-md">
        <div className="flex justify-end px-4 pt-4">
          <SettingsToggles />
        </div>
      </div>
      <div className="mx-auto flex max-w-md flex-col px-5 pt-2">
        <QuizQuestion
          correct={round.correct}
          options={round.options}
          selected={selected}
          feedback={feedback}
          onSelect={handleSelect}
          onReadQuestion={handleReadQuestion}
          questionNumber={currentQ + 1}
          totalQuestions={TOTAL_QUESTIONS}
        />
      </div>
      <span className="sr-only">{finalScore}</span>
    </div>
  );
}
