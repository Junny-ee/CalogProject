import { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import "./ModalCreate.css";
import { ScheduleDispatchContext } from "../pages/Calendar";

function ModalEdit({ isOpen, onModal, modalType }) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const { onUpdate, onDelete } = useContext(ScheduleDispatchContext);
  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setStartDate("");
      setEndDate("");
      setDescription("");
    }
  }, [isOpen]);

  // '저장' 버튼 클릭 시 실행될 함수
  const handleSave = () => {
    // 현재 입력된 모든 값을 콘솔에 출력 (실제로는 서버로 전송하거나 상위 컴포넌트로 전달)
    localStorage;
    onModal(false); // 모달 닫기
    // 저장 후 상태 초기화는 useEffect에서 처리됩니다.
  };
  const handleDelete = () => {
    onDelete();
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
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)} // 입력 값 변경 시 상태 업데이트
              />
              <br />
              <label>종료 날짜</label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)} // 입력 값 변경 시 상태 업데이트
              />
            </div>
            <textarea
              className="modal_description"
              placeholder="설명 추가"
              value={description}
              onChange={(e) => setDescription(e.target.value)} // 입력 값 변경 시 상태 업데이트
            ></textarea>
            <div className="modal_button-box">
              <button className="create_modal_button" onClick={handleSave}>
                저장
              </button>
              <button className="delete_modal_button" onClick={handleSave}>
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
              placeholder={getModalTitle()} // placeholder도 동적 제목 활용
              value={title}
              onChange={(e) => setTitle(e.target.value)} // 입력 값 변경 시 상태 업데이트
            />
            <div>
              <label>날짜 선택</label>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)} // 입력 값 변경 시 상태 업데이트
              />
            </div>
            <textarea
              className="modal_description"
              placeholder="설명 추가"
              value={description}
              onChange={(e) => setDescription(e.target.value)} // 입력 값 변경 시 상태 업데이트
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

export default ModalEdit;
