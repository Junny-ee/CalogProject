import "./ScheduleList.css";
import ScheduleItem from "./ScheduleItem";
import ModalWindow from "./ModalWindow";
import ProjectSchedule from "./ProjectSchedule";
import Button from "./Button";
import { useState } from "react";
const ScheduleList = () => {
  const [isModal, setIsModal] = useState(false);
  const onModal = (boolean) => {
    setIsModal(boolean);
  };
  return (
    <div className="ScheduleList">
      <div className="ScheduleList_Wirte">
        <h4>할일목록</h4>
        <Button text={"+"} classtype={"Create"} onClick={onModal} />
        {isModal ? <ModalWindow isOpen={isModal} onModal={onModal} /> : ""}
      </div>
      <div>
        <ProjectSchedule isModal={isModal} onModal={onModal} />
      </div>
      <div>
        <ScheduleItem isModal={isModal} onModal={onModal} />
      </div>
    </div>
  );
};

export default ScheduleList;
