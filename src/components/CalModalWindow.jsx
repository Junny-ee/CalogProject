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
        onRequestClose={onClose}
        // contentLabel="Example Modal"
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
        {/* <DatePicker
          selected={selectedDate}
          onChange={(date) => onDateChange(date)}
          inline
          dateFormat="yyyy-MM-dd"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        /> */}

        <button onClick={onClose} className="close-modal-button">
          완료
        </button>
      </Modal>
    </div>
  );
}

export default CalModalWindow;
