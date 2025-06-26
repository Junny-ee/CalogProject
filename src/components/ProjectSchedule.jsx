import "./ProjectSchedule.css";
import { ScheduleDispatchContext } from "../pages/Calendar";
import { useContext } from "react";

const ProjectSchedule = ({ data, onItemClick }) => {
  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick(data);
    }
  };
  const { onDelete } = useContext(ScheduleDispatchContext);
  const onhandle = () => {
    onDelete(data.id);
  };
  const endDate = new Date(data.end).getTime();
  const Dday = endDate - new Date().getTime(); // 시간단위로 Dday 적용됨
  return (
    <div className="ProjectSchedule">
      <div className="ProjectSchedule_header">
        <div>
          <p>
            {new Date(data.start).toLocaleDateString()} ~
            {new Date(data.end).toLocaleDateString()}
          </p>
          <p>
            {endDate > new Date().getTime()
              ? `D-${
                  !new Date(Dday).getDate() <= 1
                    ? new Date(Dday).getDate() - 1
                    : ""
                }`
              : "완료된 일정입니다."}
          </p>
        </div>
        <button className="list_delete_btn" onClick={onhandle}>
          <img src="/delete.png" alt="삭제 버튼" />
        </button>
      </div>
      <div className="ProjectSchedule_contents">
        <a className="ProjectSchedule_title" onClick={handleItemClick}>
          {data.title}
        </a>
        <div>
          <p>{data.contents}</p>
        </div>
      </div>
    </div>
  );
};
export default ProjectSchedule;
