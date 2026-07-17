import { useState } from "react";

const ExpandModal = ({ status, error, expansion, onClose, onRetry }) => {
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

        {status === "loading" && <p>Expanding your thought...</p>}

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
