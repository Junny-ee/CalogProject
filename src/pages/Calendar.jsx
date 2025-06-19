import { useState } from "react";
import BackBoardMain from "../components/BackBoardMain";
import FrontCalendar from "../components/FrontCalendar";
import ScheduleList from "../components/ScheduleList";
import Summary from "../components/Summary";
import "./Calendar.css";
import { useCalendar } from "../components/FrontCalendar";

// 테스터용 임시 데이터
const events = [
  {
    title: "회의",
    start: new Date(2025, 5, 15, 10, 0),
    end: new Date(2025, 5, 18, 12, 0),
  },
  {
    title: "미팅",
    start: new Date(2025, 5, 15, 10, 0),
    end: new Date(2025, 5, 16, 12, 0),
  },
  {
    title: "프로젝트",
    start: new Date(2025, 5, 16, 13, 0),
    end: new Date(2025, 5, 20, 14, 0),
  },
];

const Calendar = () => {
  const [isScheduleListOpen, setIsScheduleListOpen] = useState(true);
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);

  const { selectedDate } = useCalendar(); //날짜 선택 context

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

        <FrontCalendar events={events} />
        <div className={`under-content ${isSummaryOpen ? "open" : ""}`}>
          <Summary
            item={
              selectedDate
                ? events.filter(
                    (e) =>
                      e.start.toLocaleDateString() ===
                      selectedDate.toLocaleDateString()
                  )
                : []
            }
            date={selectedDate}
          />
        </div>
      </div>
      <div className={`right-content ${isScheduleListOpen ? "open" : ""}`}>
        <ScheduleList />
      </div>
    </div>
  );
};

export default Calendar;
