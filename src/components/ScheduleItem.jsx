import "./ScheduleItem.css";
import { useState } from "react";
import ReactModal from "react-modal";
import Button from "./Button";
import ModalWindow from "./ModalWindow";
const mockdata = {
  isChecked: false,
  content: "제목",
};
const ScheduleItem = () => {
  const [Schedule, setSechdule] = useState(mockdata); // 목데이터(나중에는 글 객체)
  const onCreate = () => {};
  return (
    <div className="ScheduleItem">
      <div className="ScheduleWirte">
        <h4 style={{ display: "inline" }}>할일 목록</h4>
        <ModalWindow />
      </div>
      <div>
        <div>
          <input type="checkbox" className="checkBox" onClick={onCreate} />
          <a href="">{Schedule.content}</a>
        </div>
      </div>
    </div>
  );
};

export default ScheduleItem;
