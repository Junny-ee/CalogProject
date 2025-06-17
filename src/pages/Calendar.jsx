import BackBoard from "../components/BackBoard";
import FrontCalendar from "../components/FrontCalendar";
import ScheduleList from "../components/ScheduleList";
import Summary from "../components/Summary";
import { useState } from "react";
const Calendar = () => {
  const [turnCalendar, setTurnCalendar] = useState(true);
  return (
    <div>
      {turnCalendar ? (
        <>
          <FrontCalendar setTurnCalendar={setTurnCalendar} />
          <Summary />
          <ScheduleList />
        </>
      ) : (
        <BackBoard setTurnCalender={setTurnCalendar} />
      )}
    </div>
  );
};

export default Calendar;
