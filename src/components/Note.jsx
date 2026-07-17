import React from "react";

const Note = ({ id, text, editHandler, deleteHandler, expandHandler }) => {
  return (
    <article className="note">
      <p className="note-body">{text}</p>
      <div className="note_footer">
        <button className="note_delete" onClick={() => deleteHandler(id)}>
          Delete
        </button>{" "}
        <button className="note_save" onClick={() => editHandler(id, text)}>
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
