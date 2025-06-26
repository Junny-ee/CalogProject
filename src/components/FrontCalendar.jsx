import { useState, useEffect, useRef, createContext, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./FrontCalendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalModalWindow from "./CalModalWindow";
import HeaderCalendar from "./HeaderCalendar";
import { getHolidayEventsByYears } from "../util/holidayService";
import ModalEdit from "./ModalEdit";
import { CalogStateContext } from "../App";

const CalendarContext = createContext(null);
export const CalendarProvider = ({ children }) => {
  const [selectedDate, setselectedDate] = useState(new Date());
  return (
    <CalendarContext.Provider value={{ selectedDate, setselectedDate }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar는 CalendarProvider 내에서 사용되어야 합니다.");
  }
  return context;
};

const localizer = momentLocalizer(moment);

const FrontCalendar = ({ events, onEvent }) => {
  const [date, setDate] = useState(new Date());
  const [modalOpen, setmodalOpen] = useState(false);
  const [mergedEvents, setMergedEvents] = useState([]);
  const calendarRef = useRef(null);
  const { selectedDate, setselectedDate } = useCalendar();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEventForEdit, setSelectedEventForEdit] = useState(null);
  const calogData = useContext(CalogStateContext);
  const [calogDatesSet, setCalogDatesSet] = useState(new Set());

  useEffect(() => {
    if (calogData && calogData.length > 0) {
      const dates = new Set(
        calogData.map((item) => moment(item.createDate).format("YYYY-MM-DD"))
      );
      setCalogDatesSet(dates);
    } else {
      setCalogDatesSet(new Set());
    }
  }, [calogData]);

  const handleSelectEvent = (event) => {
    if (!event.isHoliday) {
      setSelectedEventForEdit(event);
      setIsEditModalOpen(true);
    } else {
      alert(`오늘은 ${event.title} 입니다.`);
    }
    setselectedDate(new Date(event.start));
  };

  useEffect(() => {
    const fetchMergedEvents = async () => {
      const holidays = await getHolidayEventsByYears();
      setMergedEvents([...events, ...holidays]);
    };
    fetchMergedEvents();
  }, [events]);

  const handleWheel = (e) => {
    e.preventDefault();
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + (e.deltaY < 0 ? -1 : 1));
    onEvent(newDate);
    setDate(newDate);
  };

  useEffect(() => {
    const calBox = calendarRef.current;
    if (calBox) {
      calBox.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (calBox) {
        calBox.removeEventListener("wheel", handleWheel);
      }
    };
  }, [date]);

  const onClose = () => {
    setmodalOpen(false);
  };

  return (
    <div className="FrontCalendar">
      <HeaderCalendar date={date} onClick={() => setmodalOpen(true)} />
      <div className="FrontCalendar_container" ref={calendarRef}>
        <Calendar
          localizer={localizer}
          messages={{
            showMore: (total) => `+${total} `,
          }}
          events={mergedEvents}
          date={date}
          defaultView="month"
          views={["month"]}
          startAccessor="start"
          endAccessor="end"
          toolbar={false}
          selectable="ignoreEvents"
          longPressThreshold={1}
          popup
          onSelectEvent={handleSelectEvent}
          onSelectSlot={(slotInfo) => {
            const clicked = slotInfo.start;
            setselectedDate(() => new Date(clicked));
          }}
          dayPropGetter={(date) => {
            const isToday = moment(date).isSame(moment(), "day");
            const isSelected =
              selectedDate && moment(date).isSame(moment(selectedDate), "day");
            const dateString = moment(date).format("YYYY-MM-DD");
            const hasCalogEntry = calogDatesSet.has(dateString);

            if (isSelected && hasCalogEntry) {
              return {
                style: {
                  borderTop: "5px solid rgb(221,221,221)",
                  borderLeft: "2px solid rgb(221,221,221)",
                  borderBottom: "2px solid rgb(221,221,221)",
                  borderRight: "2px solid rgb(221,221,221)",
                },
              };
            }
            if (isSelected) {
              return {
                style: {
                  border: "2px solid rgb(221,221,221)",
                },
              };
            }
            if (hasCalogEntry) {
              return {
                style: {
                  borderTop: "5px solid rgb(221,221,221)",
                },
              };
            }

            if (isToday && !isSelected) {
              return {};
            }
            return {};
          }}
          eventPropGetter={(e) => {
            const now = new Date();
            const today = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate()
            );
            const isPast = new Date(e.end) < today;
            const isHoliday = e.isHoliday;
            let backgroundColor;
            let color;
            if (isHoliday) {
              backgroundColor = "transparent";
              color = "#EB4444";
            } else if (isPast) {
              backgroundColor = "#e6e6e6";
              color = "#666";
            } else {
              switch (e.color) {
                case "blue":
                  backgroundColor = "#A7C7E7";
                  color = "white";
                  break;
                case "yellow":
                  backgroundColor = "#FDFD96";
                  color = "black"; 
                  break;
                case "green":
                  backgroundColor = "#B2D8B2";
                  color = "white";
                  break;
                case "black":
                  backgroundColor = "rgb(248, 209, 137)";
                  color = "white";
                  break;
                case "pink":
                  backgroundColor = "#FFB6C1";
                  color = "black"; 
                  break;
                default:
                  backgroundColor = "#5a9ad2"; 
                  color = "white";
                  break;
              }
            }
            return {
              style: {
                backgroundColor,
                color,
              },
            };
          }}
        />
      </div>

      <CalModalWindow
        isOpen={modalOpen}
        onClose={onClose}
        onDateChange={(selectedDate) => {
          setDate(selectedDate);
          setmodalOpen(false);
        }}
      />
      {isEditModalOpen &&
        selectedEventForEdit && ( 
          <ModalEdit
            isOpen={isEditModalOpen}
            onModal={setIsEditModalOpen} 
            modalType={selectedEventForEdit.type} 
            data={selectedEventForEdit} 
          />
        )}
    </div>
  );
};
export default FrontCalendar;
