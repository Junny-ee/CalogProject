import React, { useState } from "react";
import Modal from "react-modal";
import "./ModalWindow.css"; // CSS 파일을 임포트합니다.

// Modal.setAppElement('#root'); // App의 루트 엘리먼트를 지정합니다. index.js에서 설정하는 것이 일반적입니다.

function ModalWindow() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className="open-modal-button">
        +
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false} // 에러 방지를 위해 추가
        className="modal-content" // 모달 내용에 대한 클래스
        overlayClassName="modal-overlay" // 모달 오버레이에 대한 클래스
      >
        <h2 className="modal-title">일정 추가</h2>
        <input type="date" />
        <input type="text" placeholder="제목 입력" />
        <textarea></textarea>
        <button onClick={closeModal} className="close-modal-button">
          모달 닫기
        </button>
      </Modal>
    </div>
  );
}

export default ModalWindow;
