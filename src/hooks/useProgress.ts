import { useCallback, useEffect, useState } from "react";

export interface Progress {
  collected: Record<string, number>;
  totalCorrect: number;
  totalAnswered: number;
  highScore: number;
}

const STORAGE_KEY = "dino-mission-progress-v1";
const DEFAULT_PROGRESS: Progress = {
  collected: {},
  totalCorrect: 0,
  totalAnswered: 0,
  highScore: 0,
};

function readProgress(): Progress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<Progress>;
    return {
      collected: parsed.collected ?? {},
      totalCorrect: parsed.totalCorrect ?? 0,
      totalAnswered: parsed.totalAnswered ?? 0,
      highScore: parsed.highScore ?? 0,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export type Stars = 0 | 1 | 2 | 3;

export function starsFor(count: number): Stars {
  if (count >= 5) return 3;
  if (count >= 3) return 2;
  if (count >= 1) return 1;
  return 0;
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(() => readProgress());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // storage full or disabled — silently ignore, this is a local-only toy
    }
  }, [progress]);

  const recordAnswer = useCallback((slug: string, correct: boolean) => {
    setProgress((prev) => {
      const next: Progress = {
        ...prev,
        collected: { ...prev.collected },
        totalAnswered: prev.totalAnswered + 1,
        totalCorrect: prev.totalCorrect + (correct ? 1 : 0),
      };
      if (correct) {
        next.collected[slug] = (next.collected[slug] ?? 0) + 1;
      }
      return next;
    });
  }, []);

  const recordRoundScore = useCallback((score: number) => {
    setProgress((prev) => ({
      ...prev,
      highScore: Math.max(prev.highScore, score),
    }));
  }, []);

  const getStars = useCallback(
    (slug: string): Stars => starsFor(progress.collected[slug] ?? 0),
    [progress],
  );

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_PROGRESS);
  }, []);

  const collectedCount = Object.values(progress.collected).filter((c) => c > 0).length;
  const totalStars = Object.values(progress.collected).reduce(
    (sum, c) => sum + starsFor(c),
    0,
  );

  return {
    progress,
    recordAnswer,
    recordRoundScore,
    getStars,
    resetProgress,
    collectedCount,
    totalStars,
  };
}
