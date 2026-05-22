import { useCallback } from "react";

export function useSpeech() {
  const supported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  const speak = useCallback(
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

  const cancel = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
  }, [supported]);

  return { speak, cancel, supported };
}
