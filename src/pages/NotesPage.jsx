import Notes from "../components/Notes.jsx";
import PageTransition from "../components/PageTransition.jsx";

const NotesPage = () => {
  return (
    <PageTransition>
      <div className="main">
        <Notes />
      </div>
    </PageTransition>
  );
};

export default NotesPage;
