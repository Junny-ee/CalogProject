import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, createContext, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./FrontCalendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalModalWindow from "./CalModalWindow";
import HeaderCalendar from "./HeaderCalendar";
import { getHolidayEvents } from "../util/holidayService";

const CalendarContext = createContext(null);
export const CalendarProvider = ({ children }) => {
  const [selectedDate, setselectedDate] = useState(new Date()); // 오늘 날짜로 초기값
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

const FrontCalendar = ({ events }) => {
  const [date, setDate] = useState(new Date());
  const [modalOpen, setmodalOpen] = useState(false);
  const [mergedEvents, setMergedEvents] = useState([]); // 공휴일 api
  const calendarRef = useRef(null);
  const nav = useNavigate();
  const { selectedDate, setselectedDate } = useCalendar();

  //공휴일 데이터 가져오기
  useEffect(() => {
    const fetchMergedEvents = async () => {
      try {
        const holidays = await getHolidayEvents();
        const holidayEvents = Array.isArray(holidays)
          ? holidays.map((h) => ({ ...h, isHoliday: true }))
          : [];

        setMergedEvents([...events, ...holidayEvents]);
      } catch (err) {
        console.error("공휴일 가져오기 실패:", err);
        setMergedEvents(events); // fallback
      }
    };

    fetchMergedEvents();
  }, [events]);

  //마우스 휠 이벤트
  const handleWheel = (e) => {
    e.preventDefault();
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + (e.deltaY < 0 ? -1 : 1)); // 휠 위 → 이전 달  // 휠 아래 → 다음 달
    setDate(newDate);
  };
  // 컴포넌트 mount 후 캘린더 영역에 휠 이벤트 등록
  useEffect(() => {
    const calBox = calendarRef.current; // 렌더링이 끝난 후 접근
    if (calBox) {
      calBox.addEventListener("wheel", handleWheel, { passive: false });
    }
    return () => {
      if (calBox) {
        calBox.removeEventListener("wheel", handleWheel);
      }
    };
  }, [date]); // date 바뀔때마다 useEffect 다시 실행됨 //즉 addEventListener 등록하겠단 의미

  const onClose = () => {
    setmodalOpen(false);
  };

  return (
    <div>
      <HeaderCalendar date={date} onClick={() => setmodalOpen(true)} />
      <button onClick={() => nav("/backboard")}>백보드 이동 버튼</button>
      <div className="FrontCalendar" ref={calendarRef}>
        <Calendar
          localizer={localizer}
          events={mergedEvents}
          date={date} // 달력의 날짜 상태를 내가 제어할지 라이브러리에 맡길지 결정됨
          defaultView="month" //{defaultView || "month"}
          views={["month"]} // {["month", "agenda"]}
          startAccessor="start"
          endAccessor="end"
          toolbar={false}
          selectable="ignoreEvents"
          longPressThreshold={1}
          popup
          onSelectEvent={(event) => {
            setselectedDate(event.start);
          }} // 써둔 일정 임시데이터에서 날짜만 저장
          onSelectSlot={(slotInfo) => {
            // setselectedDate(slotInfo.start); // 일정 비어있는 날짜 클릭해도 날짜 저장
            const clicked = slotInfo.start;
            setselectedDate(() => new Date(clicked));
          }}
          // 배경색
          dayPropGetter={(date) => {
            const isToday = moment(date).isSame(moment(), "day");
            const isSelected =
              selectedDate && moment(date).isSame(moment(selectedDate), "day");
            if (isToday && isSelected) {
              return { style: { backgroundColor: "#ffe2f0" } };
            }
            if (isToday && !isSelected) {
              return {};
            }
            if (isSelected) {
              return {
                style: {
                  backgroundColor: "#ffe2f0",
                },
              };
            }
            return {}; // 날짜 선택 전에 기본값
          }}
          // 일정 막대바 구현 구간
          eventPropGetter={(e) => {
            const now = new Date();
            const today = new Date(
              now.getFullYear(),
              now.getMonth(),
              now.getDate()
            );
            const isPast = new Date(e.end) < today;
            const isHoliday = e.isHoliday;

            let backgroundColor = "#3174ad";
            let color = "white";

            if (isHoliday) {
              backgroundColor = "#EB4444";
              color = "#ffffff";
            } else if (isPast) {
              backgroundColor = "#e6e6e6";
              color = "#666";
            }

            return {
              style: {
                backgroundColor,
                color,
                // borderRadius: "4px",
                // padding: "2px 4px",
              },
            };
          }}
        />
        {/*defaultView  처음 렌더링될 때 보여줄 기본 뷰 모드 :월간 보기
        events : 일정목록
        startAccessor : event.start 값을 시작 시간으로 사용함.
        endAccessor : event.end 값을 끝 시간으로 사용함.
        */}
      </div>

      <CalModalWindow
        isOpen={modalOpen}
        onClose={onClose}
        // selectedDate={date}
        onDateChange={(selectedDate) => {
          setDate(selectedDate);
          setmodalOpen(false);
        }}
      />
    </div>
  );
};
export default FrontCalendar;
