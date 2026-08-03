import { useEffect, useRef, useState } from "react";
import { ScrollDirectionContext } from "./scrollDirectionContext.js";

export const ScrollDirectionProvider = ({ children }) => {
  const [direction, setDirection] = useState("down");
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastY.current) > 5) {
        setDirection(currentY > lastY.current ? "down" : "up");
        lastY.current = currentY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ScrollDirectionContext.Provider value={direction}>
      {children}
    </ScrollDirectionContext.Provider>
  );
};
