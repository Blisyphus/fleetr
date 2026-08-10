import { useMemo, useState } from "react";
import { useNotes } from "../hooks/useNotes.js";
import { NotesContext } from "./notesContext.js";

const getTimestamp = (note) =>
  note.created_at ? new Date(note.created_at).getTime() : 0;

export const NotesProvider = ({ children }) => {
  const notesState = useNotes();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const visibleNotes = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const filtered = query
      ? notesState.notes.filter(
          (note) =>
            (note.title || "").toLowerCase().includes(query) ||
            (note.text || "").toLowerCase().includes(query),
        )
      : notesState.notes;

    const sorted = [...filtered];
    if (sortBy === "az") {
      sorted.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    } else {
      sorted.sort((a, b) =>
        sortBy === "oldest"
          ? getTimestamp(a) - getTimestamp(b)
          : getTimestamp(b) - getTimestamp(a),
      );
    }
    return sorted;
  }, [notesState.notes, searchQuery, sortBy]);

  const value = {
    ...notesState,
    visibleNotes,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};
