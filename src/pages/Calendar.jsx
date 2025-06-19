import { useState } from "react";
import BackBoardMain from "../components/BackBoardMain";
import FrontCalendar from "../components/FrontCalendar";
import ScheduleList from "../components/ScheduleList";
import Summary from "../components/Summary";
import "./Calendar.css";
const Calendar = () => {
  const [isScheduleListOpen, setIsScheduleListOpen] = useState(true);
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);
  const toggleScheduleList = () => {
    setIsScheduleListOpen(!isScheduleListOpen);
  };
  const toggleSummary = () => {
    setIsSummaryOpen(!isSummaryOpen);
  };

  return (
    <div className="Calendar">
      <div className="left-content">
        <button className="button_schedule" onClick={toggleScheduleList}>
          할 일 목록 펼침/닫힘 버튼
        </button>
        <button className="button_summary" onClick={toggleSummary}>
          요약창 펼침/닫힘 버튼
        </button>

        <FrontCalendar />
        <div className={`under-content ${isSummaryOpen ? "open" : ""}`}>
          <Summary />
        </div>
      </div>
      <div className={`right-content ${isScheduleListOpen ? "open" : ""}`}>
        <ScheduleList />
      </div>
    </div>
  );
};

export default Calendar;
