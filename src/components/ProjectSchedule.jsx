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
  const startDate = new Date(data.start).getTime();
  const endDate = new Date(data.end).getTime();
  const Dday = endDate - startDate;
  return (
    <div className="ProjectSchedule">
      <div className="ProjectSchedule_header">
        <div>
          <p>{new Date(data.start).toLocaleDateString()}</p>
          <p>{`D-day ${
            !new Date(Dday).getDate() <= 1 ? new Date(Dday).getDate() - 1 : ""
          }`}</p>
        </div>
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
