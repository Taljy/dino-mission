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

  const prompt = `Du bist ein freundlicher Dino-Experte. Du antwortest einem 6-jährigen Kind auf Deutsch (Schweizer Hochdeutsch, ss statt ß).

REGELN:
- Antworte in 2-3 SEHR KURZEN Sätzen
- Verwende nur einfache Wörter, die ein 6-Jähriger versteht
- Sei begeistert und lustig
- Sprich das Kind direkt an
- Vergleiche Grössen mit Dingen aus dem Kinderalltag (Auto, Haus, Bus, Elefant)

Das Kind fragt etwas über den ${dinoName}.
Bekannte Fakten: ${(facts ?? []).join(", ")}.

Frage des Kindes: "${question}"

Deine kindgerechte Antwort (NUR die Antwort, keine Einleitung):`;

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
