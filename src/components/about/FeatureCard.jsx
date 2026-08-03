import Reveal from "../Reveal";

const FeatureCard = ({ title, body, active, onSelect }) => {
  return (
    <Reveal delay={0.3}>
    <button
      type="button"
      className={active ? "feature_card feature_card-active" : "feature_card"}
      onClick={onSelect}
    >
      <h3 className="feature_card-title">{title}</h3>
      <p className="feature_card-body">{body}</p>
    </button>
    </Reveal>
  );
};

export default FeatureCard;
