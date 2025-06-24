import moment from "moment";
import "./HeaderCalendar.css";
import { useContext } from "react";
import { ScheduleDispatchContext } from "../pages/Calendar";
import { useNavigate } from "react-router-dom";
const HeaderCalendar = ({ date, onClick }) => {
  const { toggleScheduleList, toggleSummary, toggleTheme } = useContext(
    ScheduleDispatchContext
  );
  const nav = useNavigate();
  return (
    <div className="HeaderCalendar">
      <button className="current-month-button" onClick={onClick}>
        {moment(date).format("MMMM YYYY")}
      </button>
      <div className="Calendar_Button">
        <button className="button_schedule" onClick={toggleScheduleList}>
          <img src="/calendar_new.png" alt="할일목록 펼침/닫힘버튼" />
        </button>
        <button className="button_summary" onClick={toggleSummary}>
          요약창 펼침/닫힘 버튼
        </button>
        <button className="button_theme" onClick={toggleTheme}>
          테마 설정 버튼
        </button>
        <button onClick={() => nav("/backboard")}>
          <img src="/calendar.png" alt="캘린더 이동 아이콘" />
        </button>
      </div>
    </div>
  );
};

export default HeaderCalendar;
