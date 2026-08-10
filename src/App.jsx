import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import { ScrollDirectionProvider } from "./context/ScrollDirectionContext.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
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
      {location.pathname !== "/app" && <Nav />}
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<About />} />
          <Route path="/app" element={<NotesPage />} />
          <Route path="/about" element={<Navigate to="/" replace />} />
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
      <AuthProvider>
        <ScrollDirectionProvider>
          <AnimatedRoutes />
        </ScrollDirectionProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
