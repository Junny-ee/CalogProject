import "./ScheduleList.css";
import ScheduleItem from "./ScheduleItem";
import ModalCreate from "./ModalCreate";
import ProjectSchedule from "./ProjectSchedule";
import { useContext, useState } from "react";
import { ScheduleStateContext } from "../pages/Calendar";
import ModalEdit from "./ModalEdit";

const ScheduleList = ({ calendarData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isEditerOpen, setIsEditerOpen] = useState(false);
  const [modalType, setModalType] = useState(""); 
  const schedule_data = useContext(ScheduleStateContext);
  const [findData, setFindData] = useState(null);
  const [isOpenList, setIsOpenList] = useState(true); 
  const [isOpenItem, setIsOpenItem] = useState(true); 
  const startMonth = new Date(
    calendarData.getFullYear(),
    calendarData.getMonth(),
    1
  );
  const endMonth = new Date(
    calendarData.getFullYear(),
    calendarData.getMonth() + 1,
    0
  );
  const toggleProject = () => {
    setIsOpenList(!isOpenList);
  };
  const toggleItem = () => {
    setIsOpenItem(!isOpenItem);
  };
  const isMonth = (start, end) => {
    if (!end) {
      return (
        new Date(start) >=
          new Date(calendarData.getFullYear(), calendarData.getMonth(), 1) &&
        new Date(start) <=
          new Date(calendarData.getFullYear(), calendarData.getMonth() + 1, 0)
      );
    } else {
      return (
        (new Date(start) <= endMonth && new Date(start) >= startMonth) ||
        (new Date(end) <= endMonth && new Date(end) >= startMonth)
      );
    }
  };
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
    <div className={"ScheduleList"}>
      <div className="ScheduleList_Write">
        <h4>할일목록</h4>
      </div>
      <div className="ScheduleList_Contents">
        <div className="ScheduleList_Todo">
          <p>프로젝트 일정</p>
          <div className="Button_wrapper">
            <button className="list_btn" onClick={() => openModal("project")}>
              <img src="/plus.png" alt="글 추가 버튼" />
            </button>
            <button className="list_btn" onClick={toggleProject}>
              <img
                src={isOpenList ? "/arrows_up.png" : "/arrows_under.png"}
                alt="토글 버튼"
              />
            </button>
          </div>
        </div>
        <div className={`Todo-content ${isOpenList ? "open" : ""}`}>
          {schedule_data
            .filter(
              (item) => item.type === "project" && isMonth(item.start, item.end)
            )
            .sort((a, b) => {
              if (new Date(a.start).getDate() !== new Date(b.start).getDate()) {
                return new Date(a.start) - new Date(b.start);
              }
              return new Date(a.end) - new Date(b.end);
            })
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
          <div className="Button_wrapper">
            <button className="list_btn" onClick={() => openModal("item")}>
              <img src="/plus.png" alt="글 추가 버튼" />
            </button>
            <button className="list_btn" onClick={toggleItem}>
              <img
                src={isOpenItem ? "/arrows_up.png" : "/arrows_under.png"}
                alt="토글 버튼"
              />
            </button>
          </div>
        </div>
        <div className={`Todo-content ${isOpenItem ? "open" : ""}`}>
          {schedule_data
            .filter((item) => item.type === "item" && isMonth(item.start))
            .sort((a, b) => new Date(a.start) - new Date(b.start))
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
