import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { supabase } from "../lib/supabaseClient.js";
import { cosineSimilarity } from "../lib/similarity.js";
import { useAuth } from "./useAuth.js";

const LOCAL_KEY = "Notes";
const MATCH_THRESHOLD = 0.75;
const MATCH_COUNT = 3;

const SEED_NOTES = [
  {
    title: "Start here",
    text: "Fleetr is a scratchpad for short, fleeting thoughts. Jot something down now, then come back later to refine or expand it.",
  },
  {
    title: "Search, sort, and save",
    text: "Use the search bar to find notes by title or body. The sort icon sorts by newest, oldest, or title. Save a search to reapply it anytime from the menu.",
  },
  {
    title: "Expand a thought",
    text: "Hit Expand on any note to have AI turn a short thought into a fuller note. Handy for turning a quick idea into something you can actually use.",
  },
  {
    title: "Sync across devices",
    text: "Notes stay on this device until you sign up in Settings. Once signed in, they sync to the cloud automatically so you can pick up on any device.",
  },
];

const buildSeedNotes = () => {
  const now = Date.now();
  return SEED_NOTES.map((note, index) => ({
    id: uuid(),
    title: note.title,
    text: note.text,
    created_at: new Date(now - index * 1000).toISOString(),
  }));
};

const readLocalNotes = () => {
  const saved = localStorage.getItem(LOCAL_KEY);
  if (saved === null) return buildSeedNotes();
  return JSON.parse(saved);
};

const writeLocalNotes = (notes) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(notes));
};

export const useNotes = () => {
  const { user, loading: authLoading } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const [lastSyncedAt, setLastSyncedAt] = useState(null);
  const [mergeCandidate, setMergeCandidate] = useState(null);
  const hasMigrated = useRef(false);
  const notesRef = useRef(notes);

  useEffect(() => {
    notesRef.current = notes;
  }, [notes]);

  const withPending = async (fn) => {
    setPendingCount((c) => c + 1);
    try {
      return await fn();
    } finally {
      setPendingCount((c) => Math.max(0, c - 1));
    }
  };

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("id, title, text, created_at, expanded_text")
      .order("created_at", { ascending: true });

    if (!error && data) {
      setNotes(data);
      setLastSyncedAt(new Date());
    }
    return { data, error };
  };

  useEffect(() => {
    if (authLoading) return;

    let cancelled = false;

    const load = async () => {
      setLoading(true);

      if (!user) {
        hasMigrated.current = false;
        if (!cancelled) {
          setNotes(readLocalNotes());
          setLoading(false);
        }
        return;
      }

      await withPending(async () => {
        if (!hasMigrated.current) {
          const localNotes = readLocalNotes();
          if (localNotes.length > 0) {
            const rows = localNotes.map((note) => ({
              id: note.id,
              user_id: user.id,
              title: note.title ?? "",
              text: note.text,
            }));
            const { error: insertError } = await supabase
              .from("notes")
              .insert(rows);
            if (!insertError) {
              writeLocalNotes([]);
            }
          }
          hasMigrated.current = true;
        }

        if (!cancelled) {
          await fetchNotes();
        }
      });

      if (!cancelled) setLoading(false);
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  useEffect(() => {
    if (!authLoading && !user) {
      writeLocalNotes(notes);
    }
  }, [notes, user, authLoading]);

  const refresh = async () => {
    if (!user) {
      setNotes(readLocalNotes());
      return;
    }
    await withPending(fetchNotes);
  };

  const createNote = async (title, text) => {
    let created = null;

    if (user) {
      created = await withPending(async () => {
        const { data, error } = await supabase
          .from("notes")
          .insert({ user_id: user.id, title, text })
          .select("id, title, text, created_at")
          .single();
        if (!error && data) {
          setNotes((prev) => [...prev, data]);
          setLastSyncedAt(new Date());
          return data;
        }
        return null;
      });
    } else {
      created = { id: uuid(), title, text, created_at: new Date().toISOString() };
      setNotes((prev) => [...prev, created]);
    }

    if (created) {
      checkForMerge(created).catch((error) => {
        console.error("Smart Merge check failed:", error);
      });
    }

    return created;
  };

  const updateNoteEmbedding = async (id, embedding) => {
    if (user) {
      await supabase.from("notes").update({ embedding }).eq("id", id);
    } else {
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, embedding } : n)),
      );
    }
  };

  const findMatchesLocal = (embedding, excludeId) =>
    notesRef.current
      .filter((n) => n.id !== excludeId && Array.isArray(n.embedding))
      .map((n) => ({
        id: n.id,
        title: n.title,
        text: n.text,
        similarity: cosineSimilarity(embedding, n.embedding),
      }))
      .filter((n) => n.similarity >= MATCH_THRESHOLD)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, MATCH_COUNT);

  const findMatchesRemote = async (embedding, excludeId) => {
    const { data, error } = await supabase.rpc("match_notes", {
      query_embedding: embedding,
      match_threshold: MATCH_THRESHOLD,
      match_count: MATCH_COUNT,
      exclude_note_id: excludeId,
    });
    if (error) throw error;
    return data ?? [];
  };

  const checkForMerge = async (note) => {
    const embedResponse = await fetch("/api/embed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: note.text }),
    });
    const embedData = await embedResponse.json();
    if (!embedResponse.ok) {
      throw new Error(embedData.error || "Failed to embed note.");
    }

    await updateNoteEmbedding(note.id, embedData.embedding);

    const matches = user
      ? await findMatchesRemote(embedData.embedding, note.id)
      : findMatchesLocal(embedData.embedding, note.id);

    if (matches.length === 0) return;

    const mergeResponse = await fetch("/api/merge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newNote: { title: note.title, text: note.text },
        matches,
      }),
    });
    const mergeData = await mergeResponse.json();
    if (!mergeResponse.ok) {
      throw new Error(mergeData.error || "Failed to check for related notes.");
    }

    if (mergeData.shouldMerge) {
      setMergeCandidate({
        newNote: note,
        matches,
        mergedTitle: mergeData.mergedTitle,
        mergedText: mergeData.mergedText,
      });
    }
  };

  const acceptMerge = async () => {
    if (!mergeCandidate) return;
    const { newNote, matches, mergedTitle, mergedText } = mergeCandidate;

    await removeNote(newNote.id);
    for (const match of matches) {
      await removeNote(match.id);
    }
    await createNote(mergedTitle, mergedText);

    setMergeCandidate(null);
  };

  const dismissMergeSuggestion = () => setMergeCandidate(null);

  const editNote = async (id, title, text) => {
    if (user) {
      const result = await withPending(async () => {
        const { error } = await supabase
          .from("notes")
          .update({
            title,
            text,
            expanded_text: null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id);
        if (!error) setLastSyncedAt(new Date());
        return error;
      });
      if (result) return;
    }
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, title, text, expanded_text: null } : n,
      ),
    );
  };

  const saveExpansion = async (id, expandedText) => {
    if (user) {
      await supabase
        .from("notes")
        .update({ expanded_text: expandedText })
        .eq("id", id);
    }
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, expanded_text: expandedText } : n)),
    );
  };

  const removeNote = async (id) => {
    if (user) {
      const error = await withPending(async () => {
        const { error } = await supabase.from("notes").delete().eq("id", id);
        if (!error) setLastSyncedAt(new Date());
        return error;
      });
      if (error) return;
    }
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return {
    notes,
    loading,
    pendingCount,
    lastSyncedAt,
    createNote,
    editNote,
    removeNote,
    refresh,
    saveExpansion,
    mergeCandidate,
    acceptMerge,
    dismissMergeSuggestion,
  };
};
