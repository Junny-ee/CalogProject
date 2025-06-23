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
        <Button text={"삭제"} classtype={"Delete"} onClick={onhandle}></Button>
        <a className="ScheduleItem_title" onClick={handleItemClick}>
          {data.title}
        </a>
        {/* ScheduleItem 에서는 ModalWindow 를 직접 렌더링 하지 않습니다. */}
      </div>
      <div className="SchduleItem_contents">
        <p>{data.contents}</p>
      </div>
    </div>
  );
};

export default ScheduleItem;
