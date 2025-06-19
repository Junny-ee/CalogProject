// ProjectSchedule.js
import "./ProjectSchedule.css";
// import ModalWindow from "./ModalWindow"; // ProjectSchedule에서 직접 모달을 렌더링하지 않음
import { useState } from "react";

const mockdata = {
  isChecked: false,
  content: "프로젝트 일정",
};

// ProjectSchedule에서도 모달을 열기 위한 콜백 함수를 prop으로 받습니다.
const ProjectSchedule = ({ onItemClick }) => {
  // prop 이름을 onItemClick으로 통일
  const [Schedule, setSechdule] = useState(mockdata); // 목데이터(나중에는 글 객체)
  const date = new Date().toLocaleDateString(); // date 변수는 사용되지 않음

  const onCreate = () => {
    // 체크박스 클릭 시 동작
  };

  const handleItemClick = () => {
    // 항목 클릭 시 부모 컴포넌트의 모달 열기 함수 호출
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <div className="ProjectSchedule">
      <div>
        <input type="checkbox" className="checkBox" onClick={onCreate} />
        {/* <a> 태그 클릭 시 부모의 모달 열기 함수 호출 */}
        <a className="project_contents" onClick={handleItemClick}>
          {Schedule.content}
        </a>
        {/* ProjectSchedule 에서는 ModalWindow를 직접 렌더링하지 않습니다. */}
      </div>
    </div>
  );
};
export default ProjectSchedule;
