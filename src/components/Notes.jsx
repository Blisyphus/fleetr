import React, { useState } from "react";
import CreateNote from "./CreateNote.jsx";
import DeleteModal from "./DeleteModal.jsx";
import ExpandModal from "./ExpandModal.jsx";
import MergeModal from "./MergeModal.jsx";
import "./notes.css";
import Note from "./Note.jsx";
import { useNotesContext } from "../hooks/useNotesContext.js";

const Notes = () => {
  const [inputTitle, setInputTitle] = useState("");
  const [inputText, setInputText] = useState("");

  const {
    visibleNotes,
    loading,
    searchQuery,
    editNote,
    removeNote,
    saveExpansion,
    mergeCandidate,
    acceptMerge,
    dismissMergeSuggestion,
  } = useNotesContext();
  const [editToggle, setEditToggle] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);

  const [expandTarget, setExpandTarget] = useState(null);
  const [expandStatus, setExpandStatus] = useState("idle");
  const [expandResult, setExpandResult] = useState("");
  const [expandError, setExpandError] = useState("");

  const runExpand = async (id, text) => {
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
      saveExpansion(id, data.expansion);
    } catch (error) {
      setExpandError(error.message);
      setExpandStatus("error");
    }
  };

  const expandHandler = (id, text, expandedText) => {
    setExpandTarget({ id, text });
    if (expandedText) {
      setExpandResult(expandedText);
      setExpandStatus("success");
    } else {
      runExpand(id, text);
    }
  };

  const rerunExpand = () => {
    if (expandTarget) runExpand(expandTarget.id, expandTarget.text);
  };

  const closeExpand = () => {
    setExpandTarget(null);
    setExpandStatus("idle");
    setExpandResult("");
    setExpandError("");
  };

  const editHandler = (id, title, text) => {
    setEditToggle(id);
    setInputTitle(title);
    setInputText(text);
  };

  const saveHandler = () => {
    editNote(editToggle, inputTitle, inputText);
    setInputTitle("");
    setInputText("");
    setEditToggle(null);
  };

  const deleteHandler = (id) => {
    setDeleteTarget(id);
  };

  const confirmDelete = () => {
    removeNote(deleteTarget);
    setDeleteTarget(null);
  };

  const cancelDelete = () => {
    setDeleteTarget(null);
  };

  return (
    <section className="notes" data-lenis-prevent>
      {!loading && visibleNotes.length === 0 && searchQuery.trim() && (
        <p className="notes_empty">No notes match "{searchQuery.trim()}".</p>
      )}
      {loading
        ? null
        : visibleNotes.map((note) =>
            editToggle === note.id ? (
              <CreateNote
                key={note.id}
                inputTitle={inputTitle}
                setInputTitle={setInputTitle}
                inputText={inputText}
                setInputText={setInputText}
                saveHandler={saveHandler}
              />
            ) : (
              <Note
                key={note.id}
                id={note.id}
                title={note.title}
                text={note.text}
                createdAt={note.created_at}
                editHandler={editHandler}
                deleteHandler={deleteHandler}
                expandHandler={expandHandler}
                expandedText={note.expanded_text}
              ></Note>
            ),
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
          onRetry={rerunExpand}
          onRegenerate={rerunExpand}
        />
      )}
      {mergeCandidate && (
        <MergeModal
          mergeCandidate={mergeCandidate}
          onAccept={acceptMerge}
          onReject={dismissMergeSuggestion}
        />
      )}
    </section>
  );
};

export default Notes;
