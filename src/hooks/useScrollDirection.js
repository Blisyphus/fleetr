import { useContext } from "react";
import { ScrollDirectionContext } from "../context/scrollDirectionContext.js";

export const useScrollDirection = () => useContext(ScrollDirectionContext);
