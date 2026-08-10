import { useState } from "react";
import Notes from "../components/Notes.jsx";
import PageTransition from "../components/PageTransition.jsx";
import { NotesProvider } from "../context/NotesProvider.jsx";
import { useSavedSearches } from "../hooks/useSavedSearches.js";
import Sidebar from "../components/notes-app/Sidebar.jsx";
import SettingsModal from "../components/notes-app/SettingsModal.jsx";
import SyncStatusCard from "../components/notes-app/SyncStatusCard.jsx";
import Toolbar from "../components/notes-app/Toolbar.jsx";
import NewNoteModal from "../components/notes-app/NewNoteModal.jsx";
import "./notes-page.css";

const NotesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [newNoteOpen, setNewNoteOpen] = useState(false);
  const { savedSearches, addSearch, editSearch, removeSearch } =
    useSavedSearches();

  return (
    <PageTransition>
      <NotesProvider>
        <div className="notes-app">
          <SyncStatusCard />

          <div className="notes-app_body">
            <aside className="notes-rail">
              <button
                type="button"
                className="notes-rail_button"
                aria-label="Open menu"
                onClick={() => setSidebarOpen(true)}
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
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              </button>

              <button
                type="button"
                className="notes-rail_button"
                aria-label="Open settings"
                onClick={() => setSettingsOpen(true)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
                </svg>
              </button>
            </aside>

            <div className="notes-app_content">
              <div className="notes-app_content-inner">
                <Toolbar
                  onNewNote={() => setNewNoteOpen(true)}
                  onOpenMenu={() => setSidebarOpen(true)}
                />
                <Notes />
              </div>
            </div>

            <div className="notes-rail-spacer" aria-hidden="true"></div>
          </div>
        </div>

        <button
          type="button"
          className="notes-mobile-fab"
          aria-label="New note"
          onClick={() => setNewNoteOpen(true)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          savedSearches={savedSearches}
          onAddSearch={addSearch}
          onEditSearch={editSearch}
          onRemoveSearch={removeSearch}
          onOpenSettings={() => setSettingsOpen(true)}
        />

        {settingsOpen && (
          <SettingsModal onClose={() => setSettingsOpen(false)} />
        )}

        {newNoteOpen && (
          <NewNoteModal onClose={() => setNewNoteOpen(false)} />
        )}
      </NotesProvider>
    </PageTransition>
  );
};

export default NotesPage;
