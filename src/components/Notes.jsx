import React, { useEffect, useState } from "react";
import CreateNote from "./CreateNote.jsx";
import DeleteModal from "./DeleteModal.jsx";
import ExpandModal from "./ExpandModal.jsx";
import "./notes.css";
import { v4 as uuid } from "uuid";
import Note from "./Note.jsx";

const Notes = () => {
  const [inputText, setInputText] = useState("");

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("Notes");
    return saved ? JSON.parse(saved) : [];
  });
  const [editToggle, setEditToggle] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const [expandTarget, setExpandTarget] = useState(null);
  const [expandStatus, setExpandStatus] = useState("idle");
  const [expandResult, setExpandResult] = useState("");
  const [expandError, setExpandError] = useState("");

  const runExpand = async (text) => {
    setExpandStatus("loading");

    try {
      const response = await fetch("/api/expand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to expand note.");
      }

      setExpandResult(data.expansion);
      setExpandStatus("success");
    } catch (error) {
      setExpandError(error.message);
      setExpandStatus("error");
    }
  };

  const expandHandler = (id, text) => {
    setExpandTarget({ id, text });
    runExpand(text);
  };

  const retryExpand = () => {
    if (expandTarget) runExpand(expandTarget.text);
  };

  const closeExpand = () => {
    setExpandTarget(null);
    setExpandStatus("idle");
    setExpandResult("");
    setExpandError("");
  };

  const editHandler = (id, text) => {
    setEditToggle(id);
    setInputText(text);
  };

  const saveHandler = () => {
    if (editToggle) {
      setNotes(
        notes.map((note) =>
          note.id === editToggle ? { ...note, text: inputText } : note,
        ),
      );
    } else {
      setNotes((prevNotes) => [
        ...prevNotes,
        {
          id: uuid(),
          text: inputText,
        },
      ]);
    }

    setInputText("");
    setEditToggle(null);
  };

  const deleteHandler = (id) => {
    setDeleteTarget(id);
  };

  const confirmDelete = () => {
    setNotes(notes.filter((note) => note.id !== deleteTarget));
    setDeleteTarget(null);
  };

  const cancelDelete = () => {
    setDeleteTarget(null);
  };

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("Notes"));
//     if (data) {
//       setNotes(data);
//     }
//   }, []);

  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <section className="notes">
      {notes.map((note) =>
        editToggle === note.id ? (
          <CreateNote
            key={note.id}
            inputText={inputText}
            setInputText={setInputText}
            saveHandler={saveHandler}
          />
        ) : (
          <Note
            key={note.id}
            id={note.id}
            text={note.text}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
            expandHandler={expandHandler}
          ></Note>
        ),
      )}
      {editToggle === null ? (
        <CreateNote
          //   key ={note.id}
          inputText={inputText}
          setInputText={setInputText}
          saveHandler={saveHandler}
        />
      ) : (
        <></>
      )}
      {deleteTarget && (
        <DeleteModal onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
      {expandTarget && (
        <ExpandModal
          status={expandStatus}
          error={expandError}
          expansion={expandResult}
          onClose={closeExpand}
          onRetry={retryExpand}
        />
      )}
    </section>
  );
};

export default Notes;
