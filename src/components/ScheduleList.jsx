import "./ScheduleList.css";
import ScheduleItem from "./ScheduleItem";
import ModalCreate from "./ModalCreate";
import ProjectSchedule from "./ProjectSchedule";
import Button from "./Button";
import { useContext, useState } from "react";
import { ScheduleStateContext } from "../pages/Calendar";
import ModalEdit from "./ModalEdit";
const ScheduleList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditerOpen, setIsEditerOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const schedule_data = useContext(ScheduleStateContext);
  const [findData, setFindData] = useState(null);
  const openModal = (type) => {
    setIsModalOpen(true);
    setModalType(type);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
  };
  const editModalopen = (data) => {
    setIsEditerOpen(true);
    setFindData(data);
  };
  const editModalclose = () => {
    setIsEditerOpen(false);
    setModalType("");
  };

  return (
    <div className="ScheduleList">
      <div className="ScheduleList_Wirte">
        <h4>할일목록</h4>
      </div>
      <div className="ScheduleList_Contents">
        <div className="ScheduleList_Todo">
          <p>프로젝트 일정</p>
          <Button
            text={"+"}
            classtype={"Create"}
            onClick={() => openModal("project")}
          />
        </div>
        <div>
          {schedule_data
            .filter((item) => item.type === "project")
            .map((item) => (
              <ProjectSchedule
                key={item.id}
                data={item}
                onItemClick={editModalopen}
              />
            ))}
        </div>
        <div className="ScheduleList_Todo">
          <p>일일 일정</p>
          <Button
            text={"+"}
            classtype={"Create"}
            onClick={() => openModal("item")}
          />
        </div>
        <div>
          {schedule_data
            .filter((item) => item.type === "item")
            .map((item) => (
              <ScheduleItem
                key={item.id}
                data={item}
                onItemClick={editModalopen}
              />
            ))}
        </div>
      </div>
      <ModalCreate
        isOpen={isModalOpen}
        onModal={closeModal}
        modalType={modalType}
      />
      <ModalEdit
        isOpen={isEditerOpen}
        onModal={editModalclose}
        modalType={modalType}
        data={findData}
      />
    </div>
  );
};

export default ScheduleList;
