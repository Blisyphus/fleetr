import { useState } from "react";
import Reveal from "../Reveal.jsx";
import createNoteGif from "../../assets/create-note.gif";
import expandNoteGif from "../../assets/expand-note.gif";
import FeatureCard from "./FeatureCard.jsx";
import "./features.css";

const features = [
  {
    title: "Local-first Storage",
    body: "Your notes live in your browser, no account or setup required.",
    gif: createNoteGif,
  },
  {
    title: "Expand with AI",
    body: "Turn a short fleeting thought into a fuller note with one click.",
    gif: expandNoteGif,
  },
  {
    title: "Smart Merge",
    body: "Use AI to merge related notes into a single, richer note.",
    gif: createNoteGif,
  },
];

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="features">
      <Reveal>
        <h2 className="features_title">
          Everything you need for quick capture
        </h2>
        <p className="features_subtitle">
          Every feature is built around one goal: get the thought out of your
          head before it disappears.
        </p>
      </Reveal>
      {/* <Reveal delay={0.15}> */}
        <div className="features_layout">
          <div className="features_list">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                body={feature.body}
                active={index === activeFeature}
                onSelect={() => setActiveFeature(index)}
              />
            ))}
          </div>
          <div className="features_visual">
            <Reveal delay={0.5}>
              <img
                className="features_gif"
                src={features[activeFeature].gif}
                alt={features[activeFeature].title}
              />
            </Reveal>
          </div>
        </div>
      {/* </Reveal> */}
    </section>
  );
};

export default Features;
