import React from "react";

const Note = ({ id, text, editHandler, deleteHandler }) => {
  return (
    <article className="note">
      <p className="note-body">{text}</p>
      <div className="note_footer">
        <button className="note_delete" onClick={() => deleteHandler(id)}>
          Delete
        </button>{" "}
        <button className="note_save" onClick={() => editHandler(id, text)}>
          Edit
        </button>
      </div>
    </article>
  );
};

export default Note;
