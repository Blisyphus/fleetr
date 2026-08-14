const MergeModal = ({ mergeCandidate, onAccept, onReject }) => {
  const { matches, mergedTitle, mergedText } = mergeCandidate;

  return (
    <div className="modal-overlay">
      <div className="modal merge-modal">
        <h3>Related note found</h3>
        <p className="merge-related-to">
          This looks related to{" "}
          {matches.length === 1
            ? `"${matches[0].title || matches[0].text}"`
            : `${matches.length} of your other notes`}
          . Merge them into one note?
        </p>

        <div className="merge-preview">
          {mergedTitle ? <h4 className="merge-preview_title">{mergedTitle}</h4> : null}
          <p className="merge-preview_text">{mergedText}</p>
        </div>

        <div className="modal-buttons">
          <button className="confirm-btn" onClick={onAccept}>
            Merge
          </button>
          <button className="cancel-btn" onClick={onReject}>
            Keep separate
          </button>
        </div>
      </div>
    </div>
  );
};

export default MergeModal;
