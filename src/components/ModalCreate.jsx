import { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import "./ModalCreate.css";
import { ScheduleDispatchContext } from "../pages/Calendar";

function ModalCreate({ isOpen, onModal, modalType }) {
  const [title, setTitle] = useState("");
  const [start, setStartDate] = useState("");
  const [end, setEndDate] = useState("");
  const [contents, setcontents] = useState("");
  const { onCreate } = useContext(ScheduleDispatchContext);
  const [color, setColor] = useState("");
  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setStartDate("");
      setColor("");
      setEndDate("");
      setcontents("");
    }
  }, [isOpen]);
  const handleSave = () => {
    if (!title) {
      alert("제목을 입력해주세요!");
      return;
    }
    if (!start) {
      alert("날짜를 입력해주세요!");
      return;
    }
    if (start > end) {
      alert("시작날짜가 끝나는 날짜보다 클 수 없습니다.");
      return;
    }
    if (!contents) {
      alert("내용을 입력해주세요!");
      return;
    }
    if (end && start > end) {
      alert("종료 날짜가 시작날짜보다 이전에 있습니다.");
      return;
    }
    onCreate(modalType, title, color, start, end, contents);
    onModal(false);
  };

  const getModalTitle = () => {
    if (modalType === "project") {
      return "프로젝트 일정 추가";
    } else if (modalType === "item") {
      return "할 일 추가";
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => onModal(false)}
        contentLabel={getModalTitle()}
        ariaHideApp={false}
        className="modal_content"
        overlayClassName="modal_overlay"
      >
        {modalType === "project" ? (
          <div>
            <input
              type="text"
              placeholder={getModalTitle()}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div>
              <label>시작 날짜</label>
              <input
                type="datetime-local"
                value={start}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <br />
              <label>종료 날짜</label>
              <input
                type="datetime-local"
                value={end}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="radio_container">
              <label>색상 선택</label>
              <input
                className="radio radio_blue"
                type="radio"
                name="colorSelect"
                id="blue"
                value={"blue"}
                onChange={(e) => setColor(e.target.value)}
              />
              <input
                className="radio radio_yellow"
                type="radio"
                name="colorSelect"
                id="yellow"
                value={"yellow"}
                onChange={(e) => setColor(e.target.value)}
              />
              <input
                className="radio radio_green"
                type="radio"
                name="colorSelect"
                id="green"
                value={"green"}
                onChange={(e) => setColor(e.target.value)}
              />
              <input
                className="radio radio_black"
                type="radio"
                name="colorSelect"
                id="black"
                value={"black"}
                onChange={(e) => setColor(e.target.value)}
              />
              <input
                className="radio radio_pink"
                type="radio"
                name="colorSelect"
                id="pink"
                value={"pink"}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <textarea
              className="modal_contents"
              placeholder="설명 추가"
              value={contents}
              onChange={(e) => setcontents(e.target.value)}
            ></textarea>
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
        ) : (
          <div>
            <input
              type="text"
              placeholder={getModalTitle()}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div>
              <label>날짜 선택</label>
              <input
                type="datetime-local"
                value={start}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="radio_container">
              <label>색상 선택</label>
              <input
                className="radio radio_blue"
                type="radio"
                name="colorSelect"
                id="blue"
                value={"blue"}
                onChange={(e) => setColor(e.target.value)}
              />
              <input
                className="radio radio_yellow"
                type="radio"
                name="colorSelect"
                id="yellow"
                value={"green"}
                onChange={(e) => setColor(e.target.value)}
              />
              <input
                className="radio radio_green"
                type="radio"
                name="colorSelect"
                id="green"
                value={"green"}
                onChange={(e) => setColor(e.target.value)}
              />
              <input
                className="radio radio_black"
                type="radio"
                name="colorSelect"
                id="black"
                value={"black"}
                onChange={(e) => setColor(e.target.value)}
              />
              <input
                className="radio radio_pink"
                type="radio"
                name="colorSelect"
                id="pink"
                value={"pink"}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <textarea
              className="modal_contents"
              placeholder="설명 추가"
              value={contents}
              onChange={(e) => setcontents(e.target.value)}
            ></textarea>
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
        )}
      </Modal>
    </div>
  );
}

export default ModalCreate;
