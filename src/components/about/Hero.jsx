import { Link } from "react-router-dom";
import Reveal from "../Reveal.jsx";
import fleetrApp from "../../assets/fleetr-app.png";
import "./hero.css";

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
          <Link to="/" className="hero_cta hero_cta-primary">
            Open Fleetr
          </Link>
          <a href="#hero-end" className="hero_cta hero_cta-secondary">
            Learn more
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
