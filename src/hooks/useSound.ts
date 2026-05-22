import { useCallback, useRef } from "react";
import { useSettings } from "./useSettings";

type Ctx = AudioContext | null;

function getCtx(ref: React.MutableRefObject<Ctx>): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ref.current) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ref.current = new AC();
  }
  if (ref.current.state === "suspended") {
    void ref.current.resume();
  }
  return ref.current;
}

function tone(
  ctx: AudioContext,
  freq: number,
  start: number,
  durationMs: number,
  type: OscillatorType = "triangle",
  gain = 0.18,
) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = 0;
  osc.connect(g).connect(ctx.destination);

  const t0 = ctx.currentTime + start;
  const t1 = t0 + durationMs / 1000;
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t1);
  osc.start(t0);
  osc.stop(t1 + 0.05);
}

export function useSound() {
  const ctxRef = useRef<Ctx>(null);
  const { settings } = useSettings();
  const enabled = settings.soundEnabled;

  // Internal: always plays, ignores the setting.
  const _playClick = useCallback(() => {
    const ctx = getCtx(ctxRef);
    if (!ctx) return;
    tone(ctx, 800, 0, 80, "square", 0.1);
  }, []);

  const playCorrect = useCallback(() => {
    if (!enabled) return;
    const ctx = getCtx(ctxRef);
    if (!ctx) return;
    tone(ctx, 523.25, 0.0, 140, "triangle");
    tone(ctx, 659.25, 0.1, 140, "triangle");
    tone(ctx, 783.99, 0.2, 220, "triangle");
  }, [enabled]);

  const playWrong = useCallback(() => {
    if (!enabled) return;
    const ctx = getCtx(ctxRef);
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.4);
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
    osc.connect(g).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.45);
  }, [enabled]);

  const playClick = useCallback(() => {
    if (!enabled) return;
    _playClick();
  }, [enabled, _playClick]);

  // For the Settings UI: confirm-blip when toggling sound ON, bypasses gate.
  const forcePlayClick = _playClick;

  return { playCorrect, playWrong, playClick, forcePlayClick };
}
