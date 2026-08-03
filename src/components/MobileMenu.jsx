import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./mobile-menu.css";

const menuLinkClass = ({ isActive }) =>
  isActive ? "mobile_menu-link mobile_menu-link-active" : "mobile_menu-link";

const MobileMenu = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <>
      <div
        className={
          isOpen
            ? "mobile_menu-backdrop mobile_menu-backdrop-open"
            : "mobile_menu-backdrop"
        }
        onClick={onClose}
      ></div>

      <div className={isOpen ? "mobile_menu mobile_menu-open" : "mobile_menu"}>
        <NavLink to="/" end className={menuLinkClass} onClick={onClose}>
          Home
        </NavLink>
        <NavLink to="/about" className={menuLinkClass} onClick={onClose}>
          About
        </NavLink>
        <NavLink to="/contact" className={menuLinkClass} onClick={onClose}>
          Contact
        </NavLink>
        <NavLink to="/changelog" className={menuLinkClass} onClick={onClose}>
          Changelog
        </NavLink>
      </div>
    </>
  );
};

export default MobileMenu;
