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
  const handleSave = () => {
    onColor(color);
    onModal(false);
  };
  return (
    <div>
      <Modal
        isOpen={isOpen} 
        onRequestClose={() => onModal(false)}
        contentLabel={"theme_select"} 
        ariaHideApp={false} 
        className="modal_content" 
        overlayClassName="modal_overlay" 
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
