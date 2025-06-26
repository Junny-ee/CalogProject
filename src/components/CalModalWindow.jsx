import Modal from "react-modal";
import "./CalModalWindow.css";
import "react-datepicker/dist/react-datepicker.css";

function CalModalWindow({ isOpen, onClose, onDateChange }) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h3>날짜 선택</h3>
        <input
          type="date"
          onChange={(e) => {
            const selectedDate = new Date(e.target.value);
            onDateChange(selectedDate);
          }}
        />
        <button onClick={onClose} className="close-modal-button">
          완료
        </button>
      </Modal>
    </div>
  );
}

export default CalModalWindow;
