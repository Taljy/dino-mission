import { useCallback, useEffect, useState } from "react";

export interface Settings {
  soundEnabled: boolean;
  speechEnabled: boolean;
}

const STORAGE_KEY = "dino-mission-settings-v1";
const SYNC_EVENT = "dino-mission-settings-change";

const DEFAULT_SETTINGS: Settings = {
  soundEnabled: true,
  speechEnabled: true,
};

function readSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return {
      soundEnabled: parsed.soundEnabled ?? true,
      speechEnabled: parsed.speechEnabled ?? true,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function writeSettings(next: Settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage disabled / full — ignore
  }
  window.dispatchEvent(new Event(SYNC_EVENT));
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => readSettings());

  useEffect(() => {
    const onChange = () => setSettings(readSettings());
    window.addEventListener(SYNC_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(SYNC_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const toggleSound = useCallback(() => {
    const current = readSettings();
    writeSettings({ ...current, soundEnabled: !current.soundEnabled });
  }, []);

  const toggleSpeech = useCallback(() => {
    const current = readSettings();
    writeSettings({ ...current, speechEnabled: !current.speechEnabled });
  }, []);

  return { settings, toggleSound, toggleSpeech };
}
