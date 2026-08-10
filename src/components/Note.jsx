import React from "react";

const Note = ({ id, title, text, editHandler, deleteHandler, expandHandler }) => {
  return (
    <article className="note">
      <div className="note-content">
        {title ? <h3 className="note-title">{title}</h3> : null}
        <p className="note-body">{text}</p>
      </div>
      <div className="note_footer">
        <button className="note_delete" onClick={() => deleteHandler(id)}>
          Delete
        </button>{" "}
        <button
          className="note_save"
          onClick={() => editHandler(id, title, text)}
        >
          Edit
        </button>{" "}
        <button className="note_expand" onClick={() => expandHandler(id, text)}>
          Expand
        </button>
      </div>
    </article>
  );
};

export default Note;
