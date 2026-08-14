const DeleteModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Delete Note</h3>
        <p>Are you sure you want to delete this note?</p>

        <div className="modal-buttons">
          <button className="confirm-btn confirm-btn-danger" onClick={onConfirm}>
            Yes
          </button>

          <button className="cancel-btn" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
