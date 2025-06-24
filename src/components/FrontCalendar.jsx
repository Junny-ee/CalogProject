import { useState, useEffect, useRef, createContext, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
// import "moment/locale/ko";
import "./FrontCalendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalModalWindow from "./CalModalWindow";
import HeaderCalendar from "./HeaderCalendar";
import { getHolidayEventsByYears } from "../util/holidayService";
import ModalEdit from "./ModalEdit";

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

// moment.locale("ko"); // 한국어 설정
// moment.updateLocale("ko", {
//   week: {
//     dow: 0, // 일요일 시작
//   },
// });
const localizer = momentLocalizer(moment);

const FrontCalendar = ({ events, onEvent }) => {
  const [date, setDate] = useState(new Date());
  const [modalOpen, setmodalOpen] = useState(false);
  const [mergedEvents, setMergedEvents] = useState([]); // 공휴일 api
  const calendarRef = useRef(null);
  // const nav = useNavigate();
  const { selectedDate, setselectedDate } = useCalendar();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // 모달 열고닫기
  const [selectedEventForEdit, setSelectedEventForEdit] = useState(null); // 수정할 값 저장
  const handleSelectEvent = (event) => {
    // 공휴일이 아닌 경우에만 수정 모달을 띄웁니다.
    if (!event.isHoliday) {
      setSelectedEventForEdit(event); // 클릭된 이벤트 데이터를 상태에 저장
      setIsEditModalOpen(true); // 수정 모달 열기
    } else {
      alert(`오늘은 ${event.title} 입니다.`);
    }
    setselectedDate(new Date(event.start));
  };
  //공휴일 데이터 가져오기
  useEffect(() => {
    const fetchMergedEvents = async () => {
      const holidays = await getHolidayEventsByYears(); // ← startYear만 넘겨도 동작!
      setMergedEvents([...events, ...holidays]);
    };
    fetchMergedEvents();
  }, [events]);

  //마우스 휠 이벤트 핸들러 함수 정의
  const handleWheel = (e) => {
    e.preventDefault();
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + (e.deltaY < 0 ? -1 : 1)); // 휠 위 → 이전 달  // 휠 아래 → 다음 달
    onEvent(newDate);
    setDate(newDate);
  };
  // 컴포넌트 mount 후 캘린더 영역에 휠 이벤트 등록/해제
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
    <div className="FrontCalendar">
      <HeaderCalendar date={date} onClick={() => setmodalOpen(true)} />
      <div className="FrontCalendar_container" ref={calendarRef}>
        <Calendar
          localizer={localizer}
          messages={{
            showMore: (total) => `+${total} `, // <-- 이게 '+1 more' 부분 바꾸는 핵심!
          }}
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
          onSelectEvent={handleSelectEvent} // 써둔 일정 임시데이터에서 날짜만 저장
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
            let backgroundColor;
            let color;

            if (isHoliday) {
              backgroundColor = "transparent";
              color = "#EB4444";
              // fontSize = "xx-small";
            } else if (isPast) {
              backgroundColor = "#e6e6e6";
              color = "#666";
            } else {
              // 라디오 버튼으로 선택된 색상을 여기에 적용
              // `event.color`는 ModalCreate에서 저장된 색상 값 ('blue', 'yellow' 등)을 가집니다.
              switch (e.color) {
                case "blue":
                  backgroundColor = "#A7C7E7";
                  color = "white";
                  break;
                case "yellow":
                  backgroundColor = "#FDFD96";
                  color = "black"; // 노란색 배경에는 검은색 글씨가 잘 보입니다.
                  break;
                case "green":
                  backgroundColor = "#B2D8B2";
                  color = "white";
                  break;
                case "black":
                  backgroundColor = "#E0E0E0";
                  color = "white";
                  break;
                case "pink":
                  backgroundColor = "#FFB6C1";
                  color = "black"; // 핑크색 배경에는 검은색 글씨가 잘 보입니다.
                  break;
                default:
                  backgroundColor = "#5a9ad2"; // 기본 이벤트 색상 (React Big Calendar 기본값)
                  color = "white";
                  break;
              }
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
      {isEditModalOpen &&
        selectedEventForEdit && ( // 모달이 열려있고 수정할 이벤트 데이터가 있을 때만 렌더링
          <ModalEdit
            isOpen={isEditModalOpen}
            onModal={setIsEditModalOpen} // onModal prop을 setIsEditModalOpen으로 연결
            modalType={selectedEventForEdit.type} // 이벤트 타입에 따라 'project' 또는 'item' 전달
            data={selectedEventForEdit} // 클릭된 이벤트 데이터 전달
          />
        )}
    </div>
  );
};
export default FrontCalendar;
