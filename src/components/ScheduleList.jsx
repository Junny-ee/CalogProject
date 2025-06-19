import "./ScheduleList.css";
import ScheduleItem from "./ScheduleItem";
import ModalCreate from "./ModalCreate";
import ProjectSchedule from "./ProjectSchedule";
import Button from "./Button";
import { useState } from "react";

const ScheduleList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = (type) => {
    setIsModalOpen(true);
    setModalType(type); // projectCreate, itemCreate, projectEdit, itemEdit,
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
  };

  return (
    <div className="ScheduleList">
      <div className="ScheduleList_Wirte">
        <h4>할일목록</h4>
      </div>

      <div>
        {/* ProjectSchedule 항목 클릭 시 'project' 타입의 모달 열기 */}
        <ProjectSchedule onItemClick={() => openModal("project")} />
      </div>
      <div>
        {/* ScheduleItem 항목 클릭 시 'item' 타입의 모달 열기 */}
        <ScheduleItem onItemClick={() => openModal("item")} />
      </div>

      {/* 모달은 ScheduleList에서만 렌더링하고, modalType에 따라 내용을 다르게 표시할 수 있습니다. */}
      <ModalCreate
        isOpen={isModalOpen}
        onModal={closeModal}
        modalType={modalType}
      />
    </div>
  );
};

export default ScheduleList;
