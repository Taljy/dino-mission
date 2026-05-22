import type { VercelRequest, VercelResponse } from "@vercel/node";

interface AskBody {
  question?: string;
  dinoName?: string;
  facts?: string[];
}

interface AnthropicContentBlock {
  type: string;
  text?: string;
}

interface AnthropicResponse {
  content?: AnthropicContentBlock[];
  error?: { message?: string };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question, dinoName, facts } = (req.body ?? {}) as AskBody;

  if (!question || !dinoName) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      answer:
        "Hmm, der Dino-Profi macht gerade Pause. Probier später nochmal!",
    });
  }

  const prompt = `Du bist ein Dino-Experte und antwortest einem aufgeweckten 6-jährigen Kind namens Andrin. Er ist klug und liebt konkrete Fakten.

ANTWORT-STIL:
- 3-5 Sätze, knackig und konkret
- Echte Zahlen verwenden: Meter, Tonnen, Millionen Jahre, Kilometer pro Stunde
- Vergleiche mit dem Kinderalltag NUR als Zusatz, nicht statt Zahlen
  (z.B. "Der T-Rex war 12 Meter lang – so lang wie ein Schulbus")
- Sachlich-begeistert wie ein cooler Museumsführer, nicht infantil
- KEIN "süss", "toll", "wow", keine Babysprache
- Schweizer Hochdeutsch (ss statt ß)
- Du-Form, direkt an Andrin

INHALT:
- Bei Grössen-Fragen: Länge in Metern, Gewicht in Tonnen, Höhe wenn relevant
- Bei Ernährung: konkret was sie gefressen haben (nicht nur "Pflanzen")
- Bei Zeit: konkrete Millionen Jahre, gerne mit Erdzeitalter (Kreide, Jura, Trias)
- Bei Geschwindigkeit: km/h
- Bei "wie stark" / "wie gefährlich": konkrete Vergleiche (Bisskraft, Krallenlänge)

Der Dino: ${dinoName}
Bekannte Fakten: ${(facts ?? []).join(", ")}.

Andrins Frage: "${question}"

Deine Antwort (NUR die Antwort, keine Einleitung, keine Floskeln):`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = (await response.json()) as AnthropicResponse;
    const text =
      data.content
        ?.map((b) => b.text ?? "")
        .join(" ")
        .trim() || "Hmm, da ging was schief. Probier nochmal!";

    return res.status(200).json({ answer: text });
  } catch {
    return res.status(500).json({
      answer:
        "Hmm, der Dino-Profi macht gerade Pause. Probier später nochmal!",
    });
  }
}
