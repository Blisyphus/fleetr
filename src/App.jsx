import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import { ScrollDirectionProvider } from "./context/ScrollDirectionContext.jsx";
import { useLenis } from "./hooks/useLenis.js";
import Nav from "./components/Nav.jsx";
import TransitionOverlay from "./components/TransitionOverlay.jsx";
import NotesPage from "./pages/NotesPage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Changelog from "./pages/Changelog.jsx";

let hasMountedOnce = false;

function AnimatedRoutes() {
  const location = useLocation();
  const skipOverlay = !hasMountedOnce;

  useEffect(() => {
    hasMountedOnce = true;
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<NotesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/changelog" element={<Changelog />} />
        </Routes>
      </AnimatePresence>
      <TransitionOverlay skip={skipOverlay} />
    </div>
  );
}

function App() {
  useLenis();

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
