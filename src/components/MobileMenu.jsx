import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./mobile-menu.css";

const menuLinkClass = ({ isActive }) =>
  isActive ? "mobile_menu-link mobile_menu-link-active" : "mobile_menu-link";

const arrowIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

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
          <span className="mobile_menu-link_arrow">{arrowIcon}</span>
          <span>Home</span>
        </NavLink>
        <NavLink to="/app" className={menuLinkClass} onClick={onClose}>
          <span className="mobile_menu-link_arrow">{arrowIcon}</span>
          <span>App</span>
        </NavLink>
        <NavLink to="/contact" className={menuLinkClass} onClick={onClose}>
          <span className="mobile_menu-link_arrow">{arrowIcon}</span>
          <span>Contact</span>
        </NavLink>
        <NavLink to="/changelog" className={menuLinkClass} onClick={onClose}>
          <span className="mobile_menu-link_arrow">{arrowIcon}</span>
          <span>Changelog</span>
        </NavLink>
      </div>
    </>
  );
};

export default MobileMenu;
