import { useState } from "react";
import "./edit-searches-modal.css";

const SearchIcon = () => (
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
);

const PencilIcon = () => (
  <svg
    width="15"
    height="15"
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
);

const EditSearchesModal = ({ savedSearches, onAdd, onEdit, onRemove, onClose }) => {
  const [newQuery, setNewQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const handleAdd = (event) => {
    event.preventDefault();
    onAdd(newQuery);
    setNewQuery("");
  };

  const startEdit = (search) => {
    setEditingId(search.id);
    setEditingValue(search.query);
  };

  const commitEdit = () => {
    if (editingId) onEdit(editingId, editingValue);
    setEditingId(null);
    setEditingValue("");
  };

  return (
    <div className="edit-searches_overlay" onClick={onClose}>
      <div
        className="edit-searches"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="edit-searches_header">
          <button
            type="button"
            className="edit-searches_close"
            aria-label="Close"
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
          <h2 className="edit-searches_title">Edit searches</h2>
        </div>

        <form className="edit-searches_create" onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Create new search"
            value={newQuery}
            onChange={(event) => setNewQuery(event.target.value)}
          />
          <button type="submit" className="edit-searches_add" aria-label="Add search">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </form>

        <div className="edit-searches_list">
          {savedSearches.map((search) => (
            <div className="edit-searches_item" key={search.id}>
              <span className="edit-searches_item-icon">
                <SearchIcon />
              </span>
              {editingId === search.id ? (
                <input
                  type="text"
                  className="edit-searches_item-input"
                  value={editingValue}
                  onChange={(event) => setEditingValue(event.target.value)}
                  onBlur={commitEdit}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") commitEdit();
                  }}
                  autoFocus
                />
              ) : (
                <span className="edit-searches_item-text">
                  {search.query}
                </span>
              )}
              <button
                type="button"
                className="edit-searches_item-action"
                aria-label={`Edit "${search.query}"`}
                onClick={() => startEdit(search)}
              >
                <PencilIcon />
              </button>
              <button
                type="button"
                className="edit-searches_item-action"
                aria-label={`Delete "${search.query}"`}
                onClick={() => onRemove(search.id)}
              >
                <svg
                  width="15"
                  height="15"
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditSearchesModal;
