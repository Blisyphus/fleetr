import { motion, useAnimation } from "framer-motion";
import { useScrollDirection } from "../hooks/useScrollDirection.js";

const Reveal = ({ children, className, delay = 0 }) => {
  const controls = useAnimation();
  const direction = useScrollDirection();

  const handleEnter = () => {
    const enterFrom = direction === "up" ? -40 : 40;
    controls.set({ opacity: 0, y: enterFrom });
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay },
    });
  };

  const handleLeave = () => {
    const exitTo = direction === "up" ? 40 : -40;
    controls.start({
      opacity: 0,
      y: exitTo,
      transition: { duration: 0.5, ease: "easeOut" },
    });
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      onViewportEnter={handleEnter}
      onViewportLeave={handleLeave}
      viewport={{ amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
