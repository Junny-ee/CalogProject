import { useState } from "react";
import "./ScheduleItem.css";

const mockdata = {
  isChecked: false,
  content: "제목",
};
const ScheduleItem = () => {
  const [Schedule, setSechdule] = useState();
  return (
    <div className="ScheduleItem">
      <h4>할일 목록</h4>
    </div>
  );
};

export default ScheduleItem;
