import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import "./transition-overlay.css";

const TransitionOverlay = ({ skip }) => {
  const location = useLocation();

  if (skip) return null;

  return (
    <motion.div
      key={location.pathname}
      className="transition-overlay"
      initial={{ y: "100%" }}
      animate={{ y: ["100%", "0%", "-100%"] }}
      transition={{ duration: 1.2, times: [0, 0.45, 1], ease: "easeInOut" }}
    />
  );
};

export default TransitionOverlay;
