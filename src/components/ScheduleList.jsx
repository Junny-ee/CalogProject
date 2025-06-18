import "./ScheduleList.css";
import ScheduleItem from "./ScheduleItem";
import ModalWindow from "./ModalWindow";
import ProjectSchedule from "./ProjectSchedule";
import Button from "./Button";
import { useContext, useState } from "react";
useContext()
const ScheduleList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); 

  const openModal = (type) => {
    setIsModalOpen(true);
    setModalType(type); // create, project, item
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType("");
  };

  return (
    <div className="ScheduleList">
      <div className="ScheduleList_Wirte">
        <h4>할일목록</h4>
        {/* '생성' 버튼 클릭 시 'create' 타입의 모달 열기 */}
        <Button
          text={"+"}
          classtype={"Create"}
          onClick={() => openModal("create")}
        />
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
      <ModalWindow
        isOpen={isModalOpen}
        onModal={closeModal} // 모달 닫기 함수 전달
        modalType={modalType} // 어떤 타입의 모달인지 ModalWindow에 전달 (필요하다면)
      />
    </div>
  );
};

export default ScheduleList;
