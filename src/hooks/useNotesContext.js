import { useContext } from "react";
import { NotesContext } from "../context/notesContext.js";

export const useNotesContext = () => useContext(NotesContext);
