import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, createContext, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./FrontCalendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalModalWindow from "./CalModalWindow";
import HeaderCalendar from "./HeaderCalendar";

const CalendarContext = createContext(null);
export const CalendarProvider = ({ children }) => {
  const [selectedDate, setselectedDate] = useState(null);

  return (
    <CalendarContext.Provider value={{ selectedDate, setselectedDate }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useCalendar는 CalendarProvider 내에서 사용되어야 합니다.");
  }
  return context;
};

const localizer = momentLocalizer(moment);

const FrontCalendar = ({ events }) => {
  const [date, setDate] = useState(new Date());
  const [modalOpen, setmodalOpen] = useState(false);
  const calendarRef = useRef(null);
  const nav = useNavigate();
  const { selectedDate, setselectedDate } = useCalendar();

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
      // addEventListener를 사용해 휠 스크롤 이벤트를 캘린더 DOM 요소에 등록함. //마우스 휠로 달력을 넘기는 동작 추가
      //passive: false 스크롤 막기
    }
    return () => {
      //클린업 함수 // 컴포넌트 사라질떄 , 즉 unmount 될때 이벤트 리스너 제거
      // 스크롤 이벤트 중복 등록을 방지하고, 컴포넌트가 바뀌거나 언마운트 될 때 정리하려고
      //컴포넌트가 unmount되거나 date 값이 바뀔 때 기존 이벤트를 제거함.
      // /이걸 안 하면 handleWheel 이벤트가 계속 쌓여서 중복 실행되거나 메모리 누수가 발생할 수 있음
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
          events={events}
          date={date} // 달력의 날짜 상태를 내가 제어할지 라이브러리에 맡길지 결정됨
          defaultView="month" //{defaultView || "month"}
          views={["month", "agenda"]} //{["month"]}
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
            setselectedDate((prev) =>
              prev?.toLocaleDateString() === clicked.toLocaleDateString()
                ? new Date(clicked)
                : clicked
            );
          }}
          dayPropGetter={(date) => {
            const isToday = moment(date).isSame(moment(), "day");
            const isSelected =
              selectedDate && moment(date).isSame(moment(selectedDate), "day");

            // 날짜가 선택된 경우엔 오늘 강조를 제거하고 선택된 날짜에만 강조
            if (selectedDate) {
              return {
                style: {
                  backgroundColor: isSelected ? "#ffe2f0" : undefined,
                  // 오늘이면 강조 제거
                  ...(isToday ? { backgroundColor: "transparent" } : {}),
                },
              };
            }

            // 날짜 선택 전에는 기본 강조 유지 (스타일 덮지 않음)
            return {};
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
