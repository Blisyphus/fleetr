import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import { ScrollDirectionProvider } from "./context/ScrollDirectionContext.jsx";
import Nav from "./components/Nav.jsx";
import NotesPage from "./pages/NotesPage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Changelog from "./pages/Changelog.jsx";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<NotesPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/changelog" element={<Changelog />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollDirectionProvider>
        <Nav />
        <AnimatedRoutes />
      </ScrollDirectionProvider>
    </BrowserRouter>
  );
}

export default App;
