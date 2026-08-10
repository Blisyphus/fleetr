import Reveal from "../Reveal.jsx";
import "./feature-grid.css";

const HardDriveIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="12" x2="2" y2="12" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z" />
    <line x1="6" y1="16" x2="6.01" y2="16" />
    <line x1="10" y1="16" x2="10.01" y2="16" />
  </svg>
);

const CloudIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BookmarkIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21 12 16 5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
  </svg>
);

const ZapIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const features = [
  {
    title: "Local-first Storage",
    body: "Your notes live right in your browser. No account or setup needed to start jotting.",
    icon: <HardDriveIcon />,
  },
  {
    title: "Cloud Sync",
    body: "Sign in whenever you're ready and your notes sync automatically across every device.",
    icon: <CloudIcon />,
  },
  {
    title: "Expand with AI",
    body: "Turn a short fleeting thought into a fuller note with a single click.",
    icon: <SparkleIcon />,
  },
  {
    title: "Fast Search & Sort",
    body: "Find any note instantly by title or body, and sort by newest, oldest, or title.",
    icon: <SearchIcon />,
  },
  {
    title: "Saved Searches",
    body: "Save a search once and reapply it anytime straight from the menu.",
    icon: <BookmarkIcon />,
  },
  {
    title: "Quick Capture",
    body: "Notes are capped at 150 characters, keeping every thought quick and to the point.",
    icon: <ZapIcon />,
  },
];

const FeatureGrid = () => (
  <section className="feature-grid">
    <div className="feature-grid_inner">
      <div className="feature-grid_list">
        {features.map((feature, index) => (
          <Reveal
            key={feature.title}
            delay={(index % 3) * 0.1}
            className="feature-grid_card"
          >
            <span className="feature-grid_icon">{feature.icon}</span>
            <h3 className="feature-grid_title">{feature.title}</h3>
            <p className="feature-grid_body">{feature.body}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureGrid;
