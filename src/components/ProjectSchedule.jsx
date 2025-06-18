import "./ProjectSchedule.css";
import ModalWindow from "./ModalWindow";
import { useState } from "react";
const mockdata = {
  isChecked: false,
  content: "프로젝트 일정",
};

const ProjectSchedule = ({ isModal, onModal }) => {
  const [Schedule, setSechdule] = useState(mockdata); // 목데이터(나중에는 글 객체)
  const date = new Date().toLocaleDateString();
  const onCreate = () => {};

  return (
    <div className="ProjectSchedule">
      <div>
        <input type="checkbox" className="checkBox" onClick={onCreate} />
        <a onClick={() => onModal(true)}>{Schedule.content}</a>
        {isModal ? <ModalWindow isOpen={isModal} onModal={onModal} /> : ""}
      </div>
    </div>
  );
};
export default ProjectSchedule;
