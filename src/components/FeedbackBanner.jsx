import { Link } from "react-router-dom";
import IconSwap from "./IconSwap.jsx";
import Reveal from "./Reveal.jsx";
import "./icon-cta.css";
import "./feedback-banner.css";

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
        <Link to="/contact" className="feedback_cta icon-cta">
          <span className="icon-cta_label">Get in Touch</span>
          <IconSwap
            icon={arrowRightIcon}
            circleClassName="icon-cta_circle-dark"
          />
        </Link>
      </Reveal>
    </section>
  );
};

export default FeedbackBanner;
