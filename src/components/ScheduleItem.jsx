import { useContext } from "react";
import Button from "./Button";
import "./ScheduleItem.css";
import { ScheduleDispatchContext } from "../pages/Calendar";
// import ModalWindow from "./ModalWindow"; // ScheduleItem에서 직접 모달을 렌더링하지 않음

// ScheduleItem에서는 모달을 열기 위한 콜백 함수를 prop으로 받습니다.
const ScheduleItem = ({ data }) => {
  const { onUpdate } = useContext(ScheduleDispatchContext);

  return (
    <div className="ScheduleItem">
      <div className="ScheduleItem_title">
        <p>{data.startDate}</p>
        <a className="item_contents">{data.title}</a>
        {/* ScheduleItem 에서는 ModalWindow 를 직접 렌더링 하지 않습니다. */}
        <Button classtype={"Create"} text={"수정"} onClick={onUpdate} />
      </div>
      <div className="SchduleItem_contents">
        <p>{data.contents}</p>
      </div>
    </div>
  );
};

export default ScheduleItem;
