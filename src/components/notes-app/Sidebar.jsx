import { useState } from "react";
import { useNotesContext } from "../../hooks/useNotesContext.js";
import EditSearchesModal from "./EditSearchesModal.jsx";
import "./sidebar.css";

const Sidebar = ({
  isOpen,
  onClose,
  savedSearches,
  onAddSearch,
  onEditSearch,
  onRemoveSearch,
  onOpenSettings,
}) => {
  const { setSearchQuery } = useNotesContext();
  const [editSearchesOpen, setEditSearchesOpen] = useState(false);

  const applySearch = (query) => {
    setSearchQuery(query);
    onClose();
  };

  return (
    <>
      <div
        className={
          isOpen ? "sidebar_backdrop sidebar_backdrop-open" : "sidebar_backdrop"
        }
        onClick={onClose}
      ></div>

      <aside className={isOpen ? "sidebar sidebar-open" : "sidebar"}>
        <div className="sidebar_header">
          <span className="sidebar_title">Fleetr</span>
          <button
            type="button"
            className="sidebar_close"
            aria-label="Close menu"
            onClick={onClose}
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
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          </button>
        </div>

        <div className="sidebar_section">
          <span className="sidebar_section-label">Saved Searches</span>

          {savedSearches.map((search) => (
            <button
              type="button"
              key={search.id}
              className="sidebar_item"
              onClick={() => applySearch(search.query)}
            >
              <svg
                width="16"
                height="16"
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
              {search.query}
            </button>
          ))}

          <button
            type="button"
            className="sidebar_item"
            onClick={() => setEditSearchesOpen(true)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
            Create/Edit searches
          </button>
        </div>

        <div className="sidebar_footer">
          <button
            type="button"
            className="sidebar_footer-item"
            onClick={onOpenSettings}
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
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
            </svg>
            Settings
          </button>
        </div>
      </aside>

      {editSearchesOpen && (
        <EditSearchesModal
          savedSearches={savedSearches}
          onAdd={onAddSearch}
          onEdit={onEditSearch}
          onRemove={onRemoveSearch}
          onClose={() => setEditSearchesOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
