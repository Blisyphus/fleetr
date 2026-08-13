import { embed } from "ai";
import { google } from "@ai-sdk/google";

const EMBEDDING_DIMENSIONS = 768;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { text } = req.body ?? {};

  if (typeof text !== "string" || !text.trim()) {
    res.status(400).json({ error: "Note text is required." });
    return;
  }

  try {
    const { embedding } = await embed({
      model: google.textEmbeddingModel("gemini-embedding-001"),
      value: text,
      providerOptions: {
        google: { outputDimensionality: EMBEDDING_DIMENSIONS },
      },
    });

    res.status(200).json({ embedding });
  } catch (error) {
    console.error("Embed API error:", error);

    const status = error?.statusCode === 429 ? 429 : 500;
    res.status(status).json({
      error:
        status === 429
          ? "Rate limit reached. Please try again in a moment."
          : "Couldn't process this note right now. Please try again.",
    });
  }
}
