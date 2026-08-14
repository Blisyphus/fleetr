import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { isRateLimitError } from "./_util.js";

const mergeSchema = z.object({
  shouldMerge: z
    .boolean()
    .describe(
      "True only if the notes genuinely describe the same underlying thought. False if they're merely superficially similar.",
    ),
  mergedTitle: z.string().describe("A short title for the merged note."),
  mergedText: z
    .string()
    .describe(
      "The merged note body, synthesizing the new note and the related notes. Only used when shouldMerge is true.",
    ),
});

const formatNote = (note) => `"""\nTitle: ${note.title || "(untitled)"}\nText: ${note.text}\n"""`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { newNote, matches } = req.body ?? {};

  if (!newNote?.text || !Array.isArray(matches) || matches.length === 0) {
    res.status(400).json({ error: "A new note and at least one match are required." });
    return;
  }

  try {
    const { object } = await generateObject({
      model: google("gemini-flash-lite-latest"),
      schema: mergeSchema,
      prompt: `You decide whether a new note and one or more existing notes describe the same underlying thought, and if so, synthesize them into one merged note.

Rules:
- Only elaborate on what these notes actually say; do not invent facts they don't support.
- Set shouldMerge to false if the notes are only superficially related (e.g. same general topic but different specific points) rather than genuinely duplicative or continuous thoughts.
- When shouldMerge is true, mergedText should read as one coherent note, not a list of the originals stapled together.

New note:
${formatNote(newNote)}

Existing related note(s):
${matches.map(formatNote).join("\n")}`,
    });

    res.status(200).json(object);
  } catch (error) {
    console.error("Merge API error:", error);

    const status = isRateLimitError(error) ? 429 : 500;
    res.status(status).json({
      error:
        status === 429
          ? "Rate limit reached. Please try again in a moment."
          : "Couldn't check for related notes right now.",
    });
  }
}
