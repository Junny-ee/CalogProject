import FrontCalendar from "../components/FrontCalendar";
import ScheduleList from "../components/ScheduleList";
import Summary from "../components/Summary";
const Calendar = () => {
  return (
    <div>
      <FrontCalendar />
      <Summary />
      <ScheduleList />
    </div>
  );
};

export default Calendar;
