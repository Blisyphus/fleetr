# Fleetr

A simple and intuitive application built with React that allows users to create, edit, and delete notes with automatic persistence using Local Storage.
I built this because I needed a place to store fleeting thoughts that I get at times when i can't immediately attend to them.

## Features

* Create new notes
* Edit existing notes inline
* Delete notes
* Data persistence using browser Local Storage
* Unique note identification using UUIDs
* Simple and responsive interface
* Limited character count per note to force me to be concise.

## Built With

* **React** – Frontend library for building the user interface
* **React Hooks**

  * `useState` for state management
  * `useEffect` for Local Storage synchronization
* **UUID** – For generating unique IDs for notes
* **CSS** – Custom styling for the application and modal components

## Project Structure

```text
src/
├── components/
│   ├── CreateNote.jsx
│   ├── DeleteModal.jsx
│   ├── Header.jsx
│   ├── Note.jsx
│   └── Notes.jsx
├── App.jsx
├── App.css
└── main.jsx
```

## State Management Approach

The application uses React's built-in state management with `useState`. The `Notes` component acts as the central state manager and serves as the single source of truth for:

* The list of notes
* Current input text
* Edit mode state
* Delete confirmation modal state

State is passed down to child components via props, while child components communicate user actions back through callback functions, following React's unidirectional data flow pattern.

## Local Storage Persistence

Notes are automatically saved to the browser's Local Storage whenever changes occur.

The application uses lazy initialization to load saved notes when the app first renders:

```javascript
const [notes, setNotes] = useState(() => {
  const saved = localStorage.getItem("Notes");
  return saved ? JSON.parse(saved) : [];
});
```

Changes to notes are synchronized using `useEffect`:

```javascript
useEffect(() => {
  localStorage.setItem("Notes", JSON.stringify(notes));
}, [notes]);
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Blisyphus/fleetr.git
```

2. Navigate to the project directory:

```bash
cd fleetr
```

3. Install dependencies:

```bash
npm install
```

4. Install UUID package:
```bash
npm install uuid
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and visit:

```text
http://localhost:5173
```

## Usage

### Creating a Note

* Type your note into the input area.
* Click the save button to add the note.

### Editing a Note

* Click the edit button on any note.
* Modify the content.
* Save your changes.

### Deleting a Note

* Click the delete button on a note.
* Confirm the deletion in the modal dialog.
* Select **No** to cancel the action.

## Future Improvements

Potential enhancements for the project include:

* Search functionality
* Note categories or tags
* Dark mode support
* Drag-and-drop note reordering
* Rich text editing
* Toast notifications for user actions

## Learning Outcomes

This project demonstrates:

* React component composition
* State lifting and centralized local state management
* Controlled components
* Immutable state updates
* Conditional rendering
* Browser Local Storage integration
* Modal implementation patterns
* CRUD operations in React