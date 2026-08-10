import React from "react";

const CreateNote = ({
  inputTitle,
  setInputTitle,
  inputText,
  setInputText,
  saveHandler,
}) => {
  const char = 150;
  const charLimit = char - inputText.length;
  return (
    <form className="create_note">
      <input
        type="text"
        className="create_note-title"
        placeholder="Title"
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
        maxLength={80}
      />
      <textarea
        cols={10}
        rows={5}
        placeholder="Click here to type, Champ"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        maxLength={150}
      ></textarea>
      <div className="note_footer">
        <span className="label">{charLimit} characters left</span>
        <button type="button" className="note_save" onClick={saveHandler}>
          Save
        </button>
      </div>
    </form>
  );
};

export default CreateNote;
