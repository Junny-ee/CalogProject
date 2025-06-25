import "./ScheduleItem.css";
import { ScheduleDispatchContext } from "../pages/Calendar";
import { useContext } from "react";
import Button from "./Button";
const ScheduleItem = ({ data, onItemClick }) => {
  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick(data);
    }
  };
  const { onDelete } = useContext(ScheduleDispatchContext);
  const onhandle = () => {
    onDelete(data.id);
  };
  return (
    <div className="ScheduleItem">
      <div className="ScheduleItem_header">
        <p>{`${new Date(data.start).getMonth() + 1}.${new Date(
          data.start
        ).getDate()}.`}</p>
        <button className="list_delete_btn" onClick={onhandle}>
          <img src="/delete.png" alt="삭제 버튼" />
        </button>
      </div>
      <div className="SchduleItem_contents">
        <a className="ScheduleItem_title" onClick={handleItemClick}>
          {data.title}
        </a>
        <p>{data.contents}</p>
      </div>
    </div>
  );
};

export default ScheduleItem;
