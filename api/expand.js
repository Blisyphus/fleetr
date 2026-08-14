import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { isRateLimitError } from "./_util.js";

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
    const { text: expansion } = await generateText({
      model: google("gemini-flash-lite-latest"),
      prompt: `You expand short "fleeting thought" notes into a fuller note a person could drop straight into a proper note-taking app.

Rules:
- Only elaborate on what the thought implies; do not invent facts, numbers, or claims it doesn't support.
- Structure the output with a short title line followed by a few sentences or bullet points.
- Keep it grounded and concise, not padded with filler.

Fleeting thought:
"""
${text}
"""`,
    });

    res.status(200).json({ expansion });
  } catch (error) {
    console.error("Expand API error:", error);

    const status = isRateLimitError(error) ? 429 : 500;
    res.status(status).json({
      error:
        status === 429
          ? "Rate limit reached. Please try again in a moment."
          : "Couldn't expand this note right now. Please try again.",
    });
  }
}
