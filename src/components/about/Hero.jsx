import { Link } from "react-router-dom";
import IconSwap from "../IconSwap.jsx";
import Reveal from "../Reveal.jsx";
import fleetrApp from "../../assets/fleetr-app.png";
import "../icon-cta.css";
import "./hero.css";

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

const arrowDownIcon = (
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
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

const Hero = () => {
  return (
    <section className="hero">
      <Reveal>
        <h1 className="hero_title">
          Capture the thought quickly with{" "}
          <span className="hero_title-accent">Fleetr</span>
        </h1>
        <p className="hero_subtitle">
          Fleetr is a distraction-free space for jotting down fleeting
          thoughts so you can revisit them at a later time.
        </p>
        <div className="hero_ctas">
          <Link to="/app" className="hero_cta hero_cta-primary icon-cta">
            <span className="icon-cta_label">Open Fleetr</span>
            <IconSwap
              icon={arrowRightIcon}
              circleClassName="icon-cta_circle-light"
            />
          </Link>
          <a href="#hero-end" className="hero_cta hero_cta-secondary icon-cta">
            <span className="icon-cta_label">Learn more</span>
            <IconSwap
              icon={arrowDownIcon}
              circleClassName="icon-cta_circle-light"
              direction="vertical"
            />
          </a>
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="hero_visual">
          <span className="hero_blob hero_blob-left"></span>
          <img className="hero_image" src={fleetrApp} alt="Fleetr notes app" />
          <span className="hero_blob hero_blob-right"></span>
        </div>
      </Reveal>
      <span id="hero-end"></span>
    </section>
  );
};

export default Hero;
