import moment from "moment";
import "./HeaderCalendar.css";
import { useContext } from "react";
import { ScheduleDispatchContext } from "../pages/Calendar";
import { useNavigate } from "react-router-dom";

moment.locale("ko");
const HeaderCalendar = ({ date, onClick }) => {
  const { toggleScheduleList, toggleSummary, toggleTheme } = useContext(
    ScheduleDispatchContext
  );
  const nav = useNavigate();
  return (
    <div className="HeaderCalendar">
      <button className="current-month-button" onClick={onClick}>
        {moment(date).format("YYYY년 M월")}
      </button>
      <div className="Calendar_Button">
        <button className="button_schedule" onClick={toggleScheduleList}>
          <img src="/schedule.png" alt="할일목록 펼침/닫힘버튼" />
        </button>
        <button className="button_summary" onClick={toggleSummary}>
          <img src="/summary.png" alt="요약창 펼침/닫힘 버튼" />
        </button>
        <button className="button_theme" onClick={toggleTheme}>
          <img src="/color-palette.png" alt="테마 변경 버튼" />
        </button>
        <button className="button_back" onClick={() => nav("/backboard")}>
          <img src="/gotoBackboard.png" alt="백보드 이동 버튼" />
        </button>
      </div>
    </div>
  );
};

export default HeaderCalendar;
