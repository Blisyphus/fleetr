import React from "react";

const TrashIcon = () => (
  <svg
    className="note_btn-icon"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const PencilIcon = () => (
  <svg
    className="note_btn-icon"
    width="14"
    height="14"
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

const SparkleIcon = () => (
  <svg
    className="note_btn-icon"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
  </svg>
);

const Note = ({ id, title, text, editHandler, deleteHandler, expandHandler }) => {
  return (
    <article className="note">
      <div className="note-content">
        {title ? <h3 className="note-title">{title}</h3> : null}
        <p className="note-body">{text}</p>
      </div>
      <div className="note_footer">
        <button
          className="note_delete"
          onClick={() => deleteHandler(id)}
          aria-label="Delete"
        >
          <TrashIcon />
          <span className="note_btn-label">Delete</span>
        </button>{" "}
        <button
          className="note_save"
          onClick={() => editHandler(id, title, text)}
          aria-label="Edit"
        >
          <PencilIcon />
          <span className="note_btn-label">Edit</span>
        </button>{" "}
        <button
          className="note_expand"
          onClick={() => expandHandler(id, text)}
          aria-label="Expand"
        >
          <SparkleIcon />
          <span className="note_btn-label">Expand</span>
        </button>
      </div>
    </article>
  );
};

export default Note;
