import { useCallback } from "react";
import { useSettings } from "./useSettings";

export function useSpeech() {
  const supported =
    typeof window !== "undefined" && "speechSynthesis" in window;
  const { settings } = useSettings();
  const enabled = settings.speechEnabled;

  const cancel = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
  }, [supported]);

  const _doSpeak = useCallback(
    (text: string) => {
      if (!supported) return;
      const synth = window.speechSynthesis;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "de-DE";
      u.rate = 0.9;
      u.pitch = 1.1;
      synth.speak(u);
    },
    [supported],
  );

  // Auto / passive TTS — gated by settings. Always cancels ongoing speech.
  const speak = useCallback(
    (text: string) => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      if (!enabled) return;
      _doSpeak(text);
    },
    [supported, enabled, _doSpeak],
  );

  // Manual / explicit user-triggered TTS — always speaks, ignores setting.
  const forceSpeak = _doSpeak;

  return { speak, forceSpeak, cancel, supported };
}
