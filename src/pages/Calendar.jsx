import BackBoard from "../components/BackBoard";
import FrontCalendar from "../components/FrontCalendar";
import ScheduleList from "../components/ScheduleList";
import Summary from "../components/Summary";
import "./Calendar.css";
const Calendar = () => {
  return (
    <div className="Calendar">
      <div className="left-content">
        <FrontCalendar />
        <Summary />
      </div>
      <div className="right-content">
        <ScheduleList />
      </div>
    </div>
  );
};

export default Calendar;
