import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import "./feedback-banner.css";

const FeedbackBanner = () => {
  return (
    <section className="feedback_banner">
      <Reveal className="feedback_text">
        <h2 className="feedback_title">Have feedback or found a bug?</h2>
        <p className="feedback_body">
          Please reach out to me via{" "}
          <a href="mailto:ramyilramnan@gmail.com" className="feedback_link">
            ramyilramnan@gmail.com
          </a>
          . I read everything.
        </p>
      </Reveal>
      <Reveal delay={0.4}>
        <Link to="/contact" className="feedback_cta">
          Get in Touch
        </Link>
      </Reveal>
    </section>
  );
};

export default FeedbackBanner;
