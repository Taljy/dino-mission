import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2, Send, Volume2, VolumeX } from "lucide-react";
import { getDinoBySlug } from "../data/dinos";
import { useSpeech } from "../hooks/useSpeech";

const SUGGESTIONS = [
  "Wie gross war er?",
  "Was hat er gegessen?",
  "Wann lebte er?",
];

export function DinoDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const dino = slug ? getDinoBySlug(slug) : undefined;

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoTTS, setAutoTTS] = useState(true);
  const { speak, cancel } = useSpeech();

  useEffect(() => {
    return () => cancel();
  }, [cancel]);

  if (!dino) {
    return (
      <div className="p-8 text-center">
        <p className="font-display text-2xl">Dino nicht gefunden.</p>
        <Link to="/park" className="mt-4 inline-block text-dino-blue underline">
          Zurück zum Park
        </Link>
      </div>
    );
  }

  const ask = async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setLoading(true);
    setError(null);
    setAnswer(null);
    cancel();
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: trimmed,
          dinoName: dino.name,
          facts: dino.facts,
        }),
      });
      const data = (await res.json()) as { answer?: string; error?: string };
      if (!res.ok || !data.answer) {
        throw new Error(data.error ?? "Keine Antwort erhalten");
      }
      setAnswer(data.answer);
      if (autoTTS) speak(data.answer);
    } catch {
      setError("Der Dino-Profi macht gerade Pause. Probier später nochmal!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void ask(question);
  };

  return (
    <div className="min-h-screen pb-10">
      <div className="mx-auto max-w-md px-5 pt-5">
        <Link
          to="/park"
          className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-2 font-display text-base text-dino-text shadow-sm"
        >
          <ArrowLeft size={20} />
          Zurück
        </Link>

        <div className="my-3 flex h-[280px] w-full items-center justify-center">
          <img
            src={dino.image}
            alt={dino.name}
            className="max-h-[300px] w-auto object-contain drop-shadow-xl"
          />
        </div>

        <h1 className="text-center font-display text-4xl text-dino-text">
          {dino.name}
        </h1>
        <p className="mb-1 text-center font-display text-lg text-dino-text-light">
          {dino.fullName}
        </p>
        <p className="text-center text-sm text-dino-text-light">
          {dino.diet} · {dino.era}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {dino.facts.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border-b-4 border-amber-500 bg-amber-200 px-3 py-3 text-center font-display text-base text-dino-text shadow-sm"
            >
              {f}
            </div>
          ))}
        </div>

        <section className="mt-6 rounded-3xl bg-white/70 p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-display text-2xl text-dino-text">
              Frag den Dino-Profi!
            </h2>
            <button
              type="button"
              onClick={() => {
                setAutoTTS((v) => !v);
                cancel();
              }}
              className="rounded-full bg-sand-base p-2 text-dino-text shadow-sm"
              aria-label={
                autoTTS ? "Vorlesen ausschalten" : "Vorlesen einschalten"
              }
            >
              {autoTTS ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>

          <div className="mb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setQuestion(s);
                  void ask(s);
                }}
                className="rounded-full border-b-2 border-dino-blue-dark bg-dino-blue px-3 py-1 text-sm font-bold text-white shadow-sm active:translate-y-0.5 active:border-b-0"
                style={{ minHeight: 36 }}
              >
                {s}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Was möchtest du wissen?"
              className="flex-1 rounded-2xl border border-sand-dark/60 bg-white px-3 py-2 font-display text-lg text-dino-text outline-none focus:border-dino-orange"
            />
            <button
              type="submit"
              disabled={loading || question.trim() === ""}
              className="flex items-center justify-center rounded-2xl border-b-4 border-dino-orange-dark bg-dino-orange px-4 text-white shadow-sm disabled:opacity-50"
              aria-label="Frage senden"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={22} />
              ) : (
                <Send size={22} />
              )}
            </button>
          </form>

          {loading && (
            <p className="mt-3 flex items-center gap-2 font-display text-base text-dino-text-light">
              <Loader2 className="animate-spin" size={18} />
              Der Dino-Profi denkt nach…
            </p>
          )}
          {answer && !loading && (
            <div className="mt-3 rounded-2xl bg-sand-base/80 px-3 py-3 font-display text-lg leading-snug text-dino-text">
              {answer}
            </div>
          )}
          {error && !loading && (
            <div className="mt-3 rounded-2xl bg-amber-100 px-3 py-3 font-display text-base text-dino-text">
              {error}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
