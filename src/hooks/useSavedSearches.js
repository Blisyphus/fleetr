import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const LOCAL_KEY = "SavedSearches";

const readSaved = () => {
  const saved = localStorage.getItem(LOCAL_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const useSavedSearches = () => {
  const [savedSearches, setSavedSearches] = useState(readSaved);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(savedSearches));
  }, [savedSearches]);

  const addSearch = (query) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setSavedSearches((prev) => [...prev, { id: uuid(), query: trimmed }]);
  };

  const editSearch = (id, query) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setSavedSearches((prev) =>
      prev.map((s) => (s.id === id ? { ...s, query: trimmed } : s)),
    );
  };

  const removeSearch = (id) => {
    setSavedSearches((prev) => prev.filter((s) => s.id !== id));
  };

  return { savedSearches, addSearch, editSearch, removeSearch };
};
