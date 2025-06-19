import Button from "./Button";
import "./ScheduleItem.css";
// import ModalWindow from "./ModalWindow"; // ScheduleItem에서 직접 모달을 렌더링하지 않음
import { useState } from "react";

const mockdata = {
  isChecked: false,
  content: "일일 일정",
};

// ScheduleItem에서는 모달을 열기 위한 콜백 함수를 prop으로 받습니다.
const ScheduleItem = ({ onItemClick }) => {
  const [Schedule, setSechdule] = useState(mockdata); // 목데이터(나중에는 글 객체)

  const onCreate = () => {
    // 체크박스 클릭 시 동작 (현재는 아무것도 안 함)
  };

  const handleItemClick = () => {
    // 항목 클릭 시 부모 컴포넌트의 모달 열기 함수 호출
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <div className="ScheduleItem">
      <a className="item_contents">{Schedule.content}</a>
      {/* ScheduleItem 에서는 ModalWindow 를 직접 렌더링 하지 않습니다. */}
      <Button classtype={"Create"} text={"+"} onClick={handleItemClick} />
    </div>
  );
};

export default ScheduleItem;
