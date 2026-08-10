import { useEffect, useRef, useState } from "react";
import { useNotesContext } from "../../hooks/useNotesContext.js";
import "./toolbar.css";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "az", label: "Title A-Z" },
];

const Toolbar = ({ onNewNote, onOpenMenu }) => {
  const { pendingCount, searchQuery, setSearchQuery, sortBy, setSortBy } =
    useNotesContext();
  const syncing = pendingCount > 0;

  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    if (!filterOpen) return;

    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filterOpen]);

  return (
    <div className="toolbar">
      <div className="toolbar_search">
        <button
          type="button"
          className="toolbar_menu-btn"
          aria-label="Open menu"
          onClick={onOpenMenu}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search Notes"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <div className="toolbar_filter-wrap" ref={filterRef}>
          <button
            type="button"
            className="toolbar_filter"
            aria-label="Sort and filter"
            onClick={() => setFilterOpen((open) => !open)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
              <circle
                cx="9"
                cy="6"
                r="1.8"
                fill="currentColor"
                stroke="none"
              />
              <circle
                cx="16"
                cy="12"
                r="1.8"
                fill="currentColor"
                stroke="none"
              />
              <circle
                cx="10"
                cy="18"
                r="1.8"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </button>

          {filterOpen && (
            <div className="toolbar_filter-menu">
              {SORT_OPTIONS.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  className={
                    sortBy === option.value
                      ? "toolbar_filter-option toolbar_filter-option-active"
                      : "toolbar_filter-option"
                  }
                  onClick={() => {
                    setSortBy(option.value);
                    setFilterOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <button type="button" className="toolbar_new-note" onClick={onNewNote}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        New note
      </button>

      <span className="toolbar_synced-pill">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
        {syncing ? "Syncing" : "Synced"} · v0.1.0
      </span>
    </div>
  );
};

export default Toolbar;
