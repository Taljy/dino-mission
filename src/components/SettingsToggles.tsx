import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { useSettings } from "../hooks/useSettings";
import { useSound } from "../hooks/useSound";

export function SettingsToggles() {
  const { settings, toggleSound, toggleSpeech } = useSettings();
  const { forcePlayClick } = useSound();

  const onSoundToggle = () => {
    const turningOn = !settings.soundEnabled;
    toggleSound();
    // Only confirm-blip when sound was off and is being turned on.
    if (turningOn) forcePlayClick();
  };

  const onSpeechToggle = () => {
    toggleSpeech();
  };

  const baseClass =
    "flex w-12 h-12 items-center justify-center rounded-full border-b-4 shadow-sm transition-transform active:translate-y-0.5 active:border-b-2";
  const activeClass = "bg-dino-orange border-dino-orange-dark text-white";
  const inactiveClass = "bg-stone-200 border-stone-400 text-stone-500";

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={onSoundToggle}
        className={`${baseClass} ${settings.soundEnabled ? activeClass : inactiveClass}`}
        aria-label={settings.soundEnabled ? "Sound ausschalten" : "Sound einschalten"}
        aria-pressed={settings.soundEnabled}
        style={{ minHeight: 48 }}
      >
        {settings.soundEnabled ? <Volume2 size={22} /> : <VolumeX size={22} />}
      </button>
      <button
        type="button"
        onClick={onSpeechToggle}
        className={`${baseClass} ${settings.speechEnabled ? activeClass : inactiveClass}`}
        aria-label={
          settings.speechEnabled ? "Vorlesen ausschalten" : "Vorlesen einschalten"
        }
        aria-pressed={settings.speechEnabled}
        style={{ minHeight: 48 }}
      >
        {settings.speechEnabled ? <Mic size={22} /> : <MicOff size={22} />}
      </button>
    </div>
  );
}
