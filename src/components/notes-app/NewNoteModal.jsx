import { useState } from "react";
import { useNotesContext } from "../../hooks/useNotesContext.js";
import "./new-note-modal.css";

const formatTime = (date) =>
  date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

const NewNoteModal = ({ onClose }) => {
  const { createNote } = useNotesContext();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [timestamp] = useState(() => formatTime(new Date()));

  const handleClose = () => {
    if (title.trim() || text.trim()) {
      createNote(title, text);
    }
    onClose();
  };

  return (
    <div className="new-note_overlay" onClick={handleClose}>
      <div
        className="new-note"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="new-note_header">
          <button
            type="button"
            className="new-note_icon-btn"
            aria-label="Close"
            onClick={handleClose}
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

          <div className="new-note_header-actions">
            <button
              type="button"
              className="new-note_icon-btn"
              aria-label="Pin note"
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
                <path d="M12 17v5" />
                <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16h14v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1Z" />
              </svg>
            </button>
            <button
              type="button"
              className="new-note_icon-btn"
              aria-label="Reader view"
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
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2Z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7Z" />
              </svg>
            </button>
            <button
              type="button"
              className="new-note_icon-btn"
              aria-label="More options"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <circle cx="12" cy="5" r="1.6" />
                <circle cx="12" cy="12" r="1.6" />
                <circle cx="12" cy="19" r="1.6" />
              </svg>
            </button>
          </div>
        </div>

        <span className="new-note_timestamp">{timestamp}</span>

        <input
          type="text"
          className="new-note_title"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          autoFocus
        />

        <textarea
          className="new-note_body"
          placeholder="Start writing your thoughts..."
          value={text}
          onChange={(event) => setText(event.target.value)}
          maxLength={150}
        ></textarea>
      </div>
    </div>
  );
};

export default NewNoteModal;
