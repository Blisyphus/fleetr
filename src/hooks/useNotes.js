import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { supabase } from "../lib/supabaseClient.js";
import { useAuth } from "./useAuth.js";

const LOCAL_KEY = "Notes";

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
  const hasMigrated = useRef(false);

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
      .select("id, title, text, created_at")
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
    if (user) {
      await withPending(async () => {
        const { data, error } = await supabase
          .from("notes")
          .insert({ user_id: user.id, title, text })
          .select("id, title, text, created_at")
          .single();
        if (!error && data) {
          setNotes((prev) => [...prev, data]);
          setLastSyncedAt(new Date());
        }
      });
    } else {
      setNotes((prev) => [
        ...prev,
        { id: uuid(), title, text, created_at: new Date().toISOString() },
      ]);
    }
  };

  const editNote = async (id, title, text) => {
    if (user) {
      const result = await withPending(async () => {
        const { error } = await supabase
          .from("notes")
          .update({ title, text, updated_at: new Date().toISOString() })
          .eq("id", id);
        if (!error) setLastSyncedAt(new Date());
        return error;
      });
      if (result) return;
    }
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, title, text } : n)),
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
  };
};
