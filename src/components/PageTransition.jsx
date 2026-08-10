import { useEffect } from "react";
import { motion } from "framer-motion";

let hasMountedOnce = false;

const pageVariants = {
  initial: { y: "100vh" },
  animate: { y: "0vh" },
  exit: {
    filter: "blur(8px) brightness(0.8)",
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
};

const PageTransition = ({ children, className }) => {
  const skipEnter = !hasMountedOnce;

  useEffect(() => {
    hasMountedOnce = true;
  }, []);

  return (
    <motion.div
      className={className}
      style={{ position: "relative", zIndex: 2 }}
      variants={pageVariants}
      initial={skipEnter ? false : "initial"}
      animate="animate"
      exit="exit"
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
