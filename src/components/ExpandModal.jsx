import { useState } from "react";

const SpinnerIcon = () => (
  <svg
    className="expand-spinner"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
);

const ExpandModal = ({
  status,
  error,
  expansion,
  onClose,
  onRetry,
  onRegenerate,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(expansion);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal expand-modal">
        <h3>Expanded Note</h3>

        {status === "loading" && (
          <p className="expand-loading">
            <span>Expanding your thought...</span>
            <SpinnerIcon />
          </p>
        )}

        {status === "error" && (
          <>
            <p className="expand-error">{error}</p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={onRetry}>
                Retry
              </button>
              <button className="cancel-btn" onClick={onClose}>
                Close
              </button>
            </div>
          </>
        )}

        {status === "success" && (
          <>
            <p className="expand-text">{expansion}</p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={copyToClipboard}>
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
              <button className="cancel-btn" onClick={onRegenerate}>
                Regenerate
              </button>
              <button className="cancel-btn" onClick={onClose}>
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExpandModal;
