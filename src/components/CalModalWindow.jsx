import React from "react";
import Modal from "react-modal";
import "./CalModalWindow.css";
import DatePicker from "react-datepicker";
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
        {/* DatePicker는 주석 처리되어 있지만, 혹시 사용하게 된다면 주석을 해제할 수 있습니다. */}
        {/* <DatePicker
          selected={selectedDate}
          onChange={(date) => onDateChange(date)}
          inline
          dateFormat="yyyy-MM-dd"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        /> */}

        {/* 문제 해결: 함수를 직접 전달하거나, 콜백 함수를 전달합니다. */}
        <button onClick={onClose} className="close-modal-button">
          {/* 위에서 onClose가 단순히 setmodalOpen(false)만 한다면 onClose를 직접 전달하는게 맞습니다. */}
          {/* 만약 onClose가 다른 인자를 필요로 한다면, 아래처럼 콜백 함수로 감싸야 합니다. */}
          {/* <button onClick={() => onClose(false)} className="close-modal-button"> */}
          완료
        </button>
      </Modal>
    </div>
  );
}

export default CalModalWindow;
