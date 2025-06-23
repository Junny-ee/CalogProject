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
  // console.log(radioButton);
  // '저장' 버튼 클릭 시 실행될 함수
  const handleSave = () => {
    onCreate(modalType, title, color, start, end, contents);
    onModal(false);
  };

  // modalType에 따라 모달 제목을 결정하는 함수
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
        isOpen={isOpen} // 모달 열림/닫힘 상태
        onRequestClose={() => onModal(false)} // 오버레이 클릭 또는 Esc 키 누를 때 모달 닫기
        contentLabel={getModalTitle()} // 모달의 접근성 레이블 (동적 제목)
        ariaHideApp={false} // React-modal의 경고를 방지하기 위해 추가
        className="modal_content" // 모달 내용에 적용할 CSS 클래스
        overlayClassName="modal_overlay" // 모달 오버레이에 적용할 CSS 클래스
      >
        {modalType === "project" ? ( // 프로젝트 일정
          <div>
            <input
              type="text"
              placeholder={getModalTitle()} // placeholder도 동적 제목 활용
              value={title}
              onChange={(e) => setTitle(e.target.value)} // 입력 값 변경 시 상태 업데이트
            />
            <div>
              <label>시작 날짜</label>
              <input
                type="datetime-local"
                value={start}
                onChange={(e) => setStartDate(e.target.value)} // 입력 값 변경 시 상태 업데이트
              />
              <br />
              <label>종료 날짜</label>
              <input
                type="datetime-local"
                value={end}
                onChange={(e) => setEndDate(e.target.value)} // 입력 값 변경 시 상태 업데이트
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
              onChange={(e) => setcontents(e.target.value)} // 입력 값 변경 시 상태 업데이트
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
          // 일일 일정
          <div>
            <input
              type="text"
              placeholder={getModalTitle()} // placeholder도 동적 제목 활용
              value={title}
              onChange={(e) => setTitle(e.target.value)} // 입력 값 변경 시 상태 업데이트
            />
            <div>
              <label>날짜 선택</label>
              <input
                type="datetime-local"
                value={start}
                onChange={(e) => setStartDate(e.target.value)} // 입력 값 변경 시 상태 업데이트
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
              onChange={(e) => setcontents(e.target.value)} // 입력 값 변경 시 상태 업데이트
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
