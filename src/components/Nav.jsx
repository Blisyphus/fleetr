import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import IconSwap from "./IconSwap.jsx";
import MobileMenu from "./MobileMenu.jsx";
import "./icon-cta.css";
import "./nav.css";

const navLinkClass = ({ isActive }) =>
  isActive ? "nav_link nav_link-active" : "nav_link";

const arrowRightIcon = (
  <svg
    width="15"
    height="15"
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

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
    <nav className="nav">
      <div className="nav_inner">
        <span className="nav_brand">Fleetr</span>

        <div className="nav_links">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/app" className={navLinkClass}>
            App
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
          <NavLink to="/changelog" className={navLinkClass}>
            Changelog
          </NavLink>
        </div>

        <div className="nav_actions">
          <Link to="/app" className="nav_cta icon-cta">
            <span className="icon-cta_label">Get Started</span>
            <IconSwap icon={arrowRightIcon} circleClassName="icon-cta_circle-light" />
          </Link>

          <button
            type="button"
            className="nav_menu-toggle"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
    <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Nav;
