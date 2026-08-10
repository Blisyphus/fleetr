const IconSwap = ({ icon, circleClassName = "", direction = "horizontal" }) => (
  <span
    className={`icon-cta_circle ${direction === "vertical" ? "icon-cta_circle-vertical" : ""} ${circleClassName}`}
  >
    <span className="icon-cta_icon icon-cta_icon-a">{icon}</span>
    <span className="icon-cta_icon icon-cta_icon-b">{icon}</span>
  </span>
);

export default IconSwap;
