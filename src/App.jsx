import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ScrollDirectionProvider } from "./context/ScrollDirectionContext.jsx";
import Nav from "./components/Nav.jsx";
import NotesPage from "./pages/NotesPage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Changelog from "./pages/Changelog.jsx";

function App() {
  return (
    <BrowserRouter>
      <ScrollDirectionProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<NotesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/changelog" element={<Changelog />} />
        </Routes>
      </ScrollDirectionProvider>
    </BrowserRouter>
  );
}

export default App;
