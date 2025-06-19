import Button from "./Button";
import "./ScheduleItem.css";
// import ModalWindow from "./ModalWindow"; // ScheduleItem에서 직접 모달을 렌더링하지 않음

// ScheduleItem에서는 모달을 열기 위한 콜백 함수를 prop으로 받습니다.
const ScheduleItem = ({ data }) => {
  console.log(data);

  return (
    <div className="ScheduleItem">
      <a className="item_contents">{Schedule.content}</a>
      {/* ScheduleItem 에서는 ModalWindow 를 직접 렌더링 하지 않습니다. */}
      <Button classtype={"Create"} text={"+"} onClick={handleItemClick} />
    </div>
  );
};

export default ScheduleItem;
