import Modal from "react-modal";
import "./ModalWindow.css"; // CSS 파일을 임포트합니다.

function ModalWindow({ isOpen, onModal }) {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => onModal(false)}
        contentLabel="Example Modal"
        ariaHideApp={false} // 에러 방지를 위해 추가
        className="modal_content" // 모달 내용에 대한 클래스
        overlayClassName="modal_overlay" // 모달 오버레이에 대한 클래스
      >
        <input type="text" placeholder="제목 추가" />
        <div className="Option_wrapper">
          <input
            type="radio"
            className="btn_check"
            name="options_base"
            id="option5"
            autoComplete="off"
          />
          <label className="btn" htmlFor="option5">
            프로젝트 일정
          </label>
          <input
            type="radio"
            className="btn_check"
            name="options_base"
            id="option6"
            autoComplete="off"
          />
          <label className="btn" htmlFor="option6">
            할 일
          </label>
        </div>
        <div>
          <label>시작 날짜</label>
          <input type="datetime-local" />
          <br />
          <label>종료 날짜</label>
          <input type="datetime-local" />
        </div>
        <textarea className="" placeholder="설명 추가"></textarea>
        <div className="modal_button-box">
          <button className="create_modal_button">저장</button>
          <button onClick={() => onModal(false)} className="close_modal_button">
            닫기
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalWindow;
