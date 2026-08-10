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
import NotesPage from "./pages/NotesPage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Changelog from "./pages/Changelog.jsx";

function AnimatedRoutes() {
  const location = useLocation();

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
