import AccountSection from "./AccountSection.jsx";
import AiSettingsSection from "./AiSettingsSection.jsx";
import SyncStatusCard from "./SyncStatusCard.jsx";
import "./settings-modal.css";

const SettingsModal = ({ onClose }) => {
  return (
    <div className="settings-modal_overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(event) => event.stopPropagation()}>
        <div className="settings-modal_header">
          <button
            type="button"
            className="settings-modal_close"
            aria-label="Close settings"
            onClick={onClose}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          </button>
          <h2 className="settings-modal_title">Settings</h2>
        </div>

        <div className="settings-modal_section">
          <SyncStatusCard />
        </div>

        <div className="settings-modal_section settings-feedback">
          <h3 className="settings-feedback_title">Send Us Your Feedback</h3>
          <p className="settings-feedback_body">
            Need help? Bugs? Feature requests? Feedback is sent directly to
            me at{" "}
            <a
              className="settings-feedback_link"
              href="mailto:ramyilramnan@gmail.com"
            >
              ramyilramnan@gmail.com
            </a>
          </p>
          <a
            href="mailto:ramyilramnan@gmail.com"
            className="settings-feedback_button"
          >
            Send feedback
          </a>
        </div>

        <div className="settings-modal_section">
          <h3 className="settings-modal_section-title">Account</h3>
          <AccountSection />
        </div>

        <div className="settings-modal_section">
          <h3 className="settings-modal_section-title">AI Settings</h3>
          <AiSettingsSection />
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
