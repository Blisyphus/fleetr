import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, filter: "blur(8px) brightness(1)" },
  animate: { opacity: 1, filter: "blur(0px) brightness(1)" },
  exit: {
    opacity: 1,
    filter: "blur(8px) brightness(0.8)",
    // filter: "blur(8px)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
};

const PageTransition = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
