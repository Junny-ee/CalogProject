import { useState, useEffect } from "react";
import Modal from "react-modal";
import "./ModalCreate.css";

function ModalTheme({ isOpen, onModal, onColor }) {
  const [color, setColor] = useState("");
  useEffect(() => {
    if (!isOpen) {
      setColor("");
    }
  }, [isOpen]);
  // console.log(radioButton);
  // '저장' 버튼 클릭 시 실행될 함수
  const handleSave = () => {
    onColor(color);
    onModal(false);
  };
  return (
    <div>
      <Modal
        isOpen={isOpen} // 모달 열림/닫힘 상태
        onRequestClose={() => onModal(false)} // 오버레이 클릭 또는 Esc 키 누를 때 모달 닫기
        contentLabel={"theme_select"} // 모달의 접근성 레이블 (동적 제목)
        ariaHideApp={false} // React-modal의 경고를 방지하기 위해 추가
        className="modal_content" // 모달 내용에 적용할 CSS 클래스
        overlayClassName="modal_overlay" // 모달 오버레이에 적용할 CSS 클래스
      >
        <div>
          <div className="radio_container">
            <label>테마 선택</label>
            <input
              className="theme_one"
              type="radio"
              name="colorSelect"
              id="one"
              value={"one"}
              onChange={(e) => setColor(e.target.value)}
            />
            <input
              className="theme_two"
              type="radio"
              name="colorSelect"
              id="two"
              value={"two"}
              onChange={(e) => setColor(e.target.value)}
            />
            <input
              className="theme_three"
              type="radio"
              name="colorSelect"
              id="three"
              value={"three"}
              onChange={(e) => setColor(e.target.value)}
            />
            <input
              className="theme_four"
              type="radio"
              name="colorSelect"
              id="four"
              value={"four"}
              onChange={(e) => setColor(e.target.value)}
            />
            <input
              className="theme_five"
              type="radio"
              name="colorSelect"
              id="five"
              value={"five"}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="modal_button-box">
            <button className="create_modal_button" onClick={handleSave}>
              저장
            </button>
            <button
              onClick={() => onModal(false)}
              className="close_modal_button"
            >
              닫기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalTheme;
