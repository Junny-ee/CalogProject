import "./ProjectSchedule.css";
import { useState } from "react";
import Button from "./Button";

// ProjectSchedule에서도 모달을 열기 위한 콜백 함수를 prop으로 받습니다.
const ProjectSchedule = ({ data, onItemClick }) => {
  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick(data);
    }
  };

  return (
    <div className="ProjectSchedule">
      <div className="ProjectSchedule_header">
        <a className="ProjectSchedule_title" onClick={handleItemClick}>
          {data.title}
        </a>
      </div>
      <div className="ProjectSchedule_contents">
        <p>{data.contents}</p>
      </div>
    </div>
  );
};
export default ProjectSchedule;
