import { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import "./ModalCreate.css";
import { ScheduleDispatchContext } from "../pages/Calendar";

function ModalEdit({ isOpen, onModal, modalType, data }) {
  const [title, setTitle] = useState("");
  const [start, setStartDate] = useState("");
  const [end, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const { onUpdate, onDelete } = useContext(ScheduleDispatchContext);

  useEffect(() => {
    if (isOpen && data) {
      setTitle(data.title);
      setColor(data.color);
      setStartDate(data.start);
      setEndDate(data.end);
      setDescription(data.contents);
    }
  }, [isOpen, data]);

  const handleSave = () => {
    if (!title) {
      alert("제목을 입력해주세요!");
      return;
    }
    if (!start) {
      alert("날짜를 입력해주세요!");
      return;
    }
    if (!description) {
      alert("내용을 입력해주세요!");
      return;
    }
    if (!color) {
      setColor("blue");
    }
    if (modalType === "project") {
      onUpdate(data.type, data.id, title, color, start, end, description);
    } else {
      onUpdate(data.type, data.id, title, color, start, end, description);
    }
    onModal(false); // 모달 닫기
  };
  const handleDelete = () => {
    onDelete(data.id);
    onModal(false);
  };
  // modalType에 따라 모달 제목을 결정하는 함수
  const getModalTitle = () => {
    if (modalType === "project") {
      return "프로젝트 일정 수정";
    } else if (modalType === "item") {
      return "할 일 수정";
    }
  };
  if (!data) {
    return;
  }

  return (
    <div>
      <Modal
        isOpen={isOpen} // 모달 열림/닫힘 상태
        onRequestClose={() => onModal(false)} // 오버레이 클릭 또는 Esc 키 누를 때 모달 닫기
        contentLabel={getModalTitle()} // 모달의 접근성 레이블 (동적 제목)
        ariaHideApp={false} // React-modal의 경고를 방지하기 위해 추가
        className="modal_content" // 모달 내용에 적용할 CSS 클래스
        overlayClassName="modal_overlay" // 모달 오버레이에 적용할 CSS 클래스
      >
        {data.type === "project" ? ( // 프로젝트 일정
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
              className="modal_description"
              placeholder="설명 추가"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="modal_button-box">
              <button className="create_modal_button" onClick={handleSave}>
                수정
              </button>
              <button className="delete_modal_button" onClick={handleDelete}>
                삭제
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
          // 일일 일정
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
              className="modal_description"
              placeholder="설명 추가"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="modal_button-box">
              <button className="create_modal_button" onClick={handleSave}>
                수정
              </button>
              <button className="delete_modal_button" onClick={handleDelete}>
                삭제
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

export default ModalEdit;
