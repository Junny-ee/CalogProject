import Modal from "react-modal";
import "./CalModalWindow.css";
import "react-datepicker/dist/react-datepicker.css";

function CalModalWindow({ isOpen, onClose, onDateChange }) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        // 문제 해결: 함수를 직접 전달합니다.
        onRequestClose={onClose} // 또는 () => onClose(false)
        ariaHideApp={false} // 에러 방지를 위해 추가
        className="modal-content" // 모달 내용에 대한 클래스
        overlayClassName="modal-overlay" // 모달 오버레이에 대한 클래스
      >
        {/* 모달 내부 UI */}
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
