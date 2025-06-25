import { createContext, useEffect, useReducer, useRef, useState } from "react";
import FrontCalendar from "../components/FrontCalendar";
import ScheduleList from "../components/ScheduleList";
import Summary from "../components/Summary";
import "./Calendar.css";
import { useCalendar } from "../components/FrontCalendar";
import ModalTheme from "../components/ModalTheme";
function reducer(state, action) {
  let nextState;
  switch (action.name) {
    case "init":
      return action.data;
    case "create":
      if (!action.data.end) {
        action.data.end = action.data.start;
      }
      nextState = [...state, action.data];
      break;
    case "update":
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id)
          ? item.end
            ? action.data
            : { ...action.data, end: action.data.start }
          : item
      );
      break;
    case "delete":
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    default:
      return state;
  }
  localStorage.setItem("schedule", JSON.stringify(nextState));
  return nextState;
}
export const ScheduleStateContext = createContext();
export const ScheduleDispatchContext = createContext();

const Calendar = () => {
  const [calendarData, dispatch] = useReducer(reducer, []);
  const [isLoading, setIsLoading] = useState(true);
  const calendarRef = useRef(0);
  const [isScheduleListOpen, setIsScheduleListOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [isThemeChange, setIsThemeChange] = useState(false);
  const { selectedDate } = useCalendar(); //날짜 선택 context
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 입력창 여는 state
  const [wheelAction, setWheelAction] = useState(new Date());
  const [themeColor, setThemeColor] = useState(
    () => localStorage.getItem("ThemeColor") || ""
  );
  // 모달 열고닫는 함수
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const toggleScheduleList = () => {
    setIsScheduleListOpen(!isScheduleListOpen);
  };
  const toggleSummary = () => {
    setIsSummaryOpen(!isSummaryOpen);
  };
  const toggleTheme = () => {
    setIsThemeChange(!isThemeChange);
    openModal();
  };
  useEffect(() => {
    const root = document.documentElement; // <html> 태그
    switch (themeColor) {
      case "one":
        root.style.setProperty("--main-bg-color", "#f5f5f5"); // 캘린더 맨뒷배경 색
        root.style.setProperty("--secondary-bg-color", "#FFFFFF"); //캘린더, 글요약, 할일목록 배경색
        root.style.setProperty("--sechdule-default-bg", "#FFFFFF"); // //할일 목록 배경색
        root.style.setProperty("--sub-bg-color", "#f5f5f5"); // 캘린더 요일, 일정 배경색
        root.style.setProperty("--button-default-bg", "#FFFFFF"); // 버튼 배경색
        root.style.setProperty("--highlight-color", "#000"); // 버튼 글자색
        root.style.setProperty("--primary-text-color", "#000"); // 헤더 날짜 제외 모든 글씨색 적용
        root.style.setProperty("--accent-red-color", "#f08080"); // 일요일 글자색
        root.style.setProperty("--accent-blue-color", "#8080f0"); // 토요일 글자색
        root.style.setProperty("--border-bg-color", "#a7a7a7"); // 테두리색
        break;
      case "two":
        root.style.setProperty("--main-bg-color", "#333");
        root.style.setProperty("--secondary-bg-color", "#262626");
        root.style.setProperty("--sechdule-default-bg", "#1e1e1e");
        root.style.setProperty("--sub-bg-color", "#262626");
        root.style.setProperty("--button-default-bg", "darkgray");
        root.style.setProperty("--highlight-color", "#B8B7C2");
        root.style.setProperty("--primary-text-color", "#B8B7C2");
        root.style.setProperty("--accent-red-color", "#bd2130");
        root.style.setProperty("--accent-blue-color", "#b0b0ff");
        root.style.setProperty("--border-bg-color", "#a7a7a7"); // 테두리색
        break;
      case "three":
        root.style.setProperty("--main-bg-color", "#f5f5f5");
        root.style.setProperty("--secondary-bg-color", "#fcfbf6b6");
        root.style.setProperty("--sechdule-default-bg", "#fcfbf6b6");
        root.style.setProperty("--sub-bg-color", "#FEF9D9");
        root.style.setProperty("--button-default-bg", "#DEE5D4");
        root.style.setProperty("--highlight-color", "#333");
        root.style.setProperty("--primary-text-color", "#333");
        root.style.setProperty("--accent-red-color", "#e07b7b");
        root.style.setProperty("--accent-blue-color", "#7b7be0");
        root.style.setProperty("--border-bg-color", "#DEE5D4"); // 테두리색
        break;
      case "four":
        root.style.setProperty("--main-bg-color", "#F6F5F2");
        root.style.setProperty("--secondary-bg-color", "#FFEFEF");
        root.style.setProperty("--sechdule-default-bg", "#FFEFEF");
        root.style.setProperty("--sub-bg-color", "#FFDCDC");
        root.style.setProperty("--button-default-bg", "#F3D0D7");
        root.style.setProperty("--highlight-color", "#333");
        root.style.setProperty("--primary-text-color", "#333");
        root.style.setProperty("--accent-red-color", "#ff6b6b");
        root.style.setProperty("--accent-blue-color", "#6b6bff");
        root.style.setProperty("--border-bg-color", "#F3D0D7"); // 테두리색
        break;
      case "five":
        root.style.setProperty("--main-bg-color", "#222f3e");
        root.style.setProperty("--secondary-bg-color", "#34475e");
        root.style.setProperty("--sechdule-default-bg", "#34475e");
        root.style.setProperty("--sub-bg-color", "#0A2240");
        root.style.setProperty("--button-default-bg", "#9BA4B4");
        root.style.setProperty("--highlight-color", "#c7cbd1");
        root.style.setProperty("--primary-text-color", "#c7cbd1");
        root.style.setProperty("--accent-red-color", "#e06b6b");
        root.style.setProperty("--accent-blue-color", "#6b6be0");
        root.style.setProperty("--border-bg-color", "#9BA4B4"); // 테두리색
        break;
    }
  }, [themeColor]);

  // 여기부터 context랑 reducer 함수
  useEffect(() => {
    const storedData = localStorage.getItem("schedule");
    if (!storedData) {
      setIsLoading(false); // 로딩완료
      return;
    }
    const parseData = JSON.parse(storedData);
    let maxId = 0;
    parseData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = item.id;
      }
    });

    calendarRef.current = maxId + 1;

    dispatch({
      name: "init",
      data: parseData,
    });
    setIsLoading(false);
  }, []);
  const onCreate = (type, title, color, start, end, contents) => {
    dispatch({
      name: "create",
      data: {
        type,
        id: calendarRef.current++,
        title, // key와 value 가 같을경우 하나만 써도 됨
        color,
        start,
        end,
        contents,
      },
    });
  };
  const onUpdate = (type, id, title, color, start, end, contents) => {
    dispatch({
      name: "update",
      data: {
        type,
        id,
        title,
        color,
        start,
        end,
        contents,
      },
    });
  };
  const onDelete = (id) => {
    dispatch({
      name: "delete",
      id,
    });
  };
  const onColor = (color) => {
    setThemeColor(color);
    localStorage.setItem("ThemeColor", color);
  };
  if (isLoading) {
    return <div>로딩 중...</div>; // 데이터 로딩 중 스피너 등을 표시할 수 있습니다.
  }
  return (
    <>
      <div className="main_logo">
        <img src="/logo_image_main.png" alt="로고" />
      </div>
      <ScheduleStateContext.Provider value={calendarData}>
        <ScheduleDispatchContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
            toggleScheduleList,
            toggleSummary,
            toggleTheme,
          }}
        >
          <div className="Calendar">
            <div
              className={`left-content ${isSummaryOpen ? "summary-open" : ""}`}
            >
              <FrontCalendar events={calendarData} onEvent={setWheelAction} />

              <div className={`under-content ${isSummaryOpen ? "open" : ""}`}>
                <Summary
                  item={
                    selectedDate
                      ? calendarData.filter(
                          (e) =>
                            new Date(e.start).toLocaleDateString() ===
                            selectedDate.toLocaleDateString()
                        )
                      : []
                  }
                  date={selectedDate}
                  calendarData={calendarData}
                />
              </div>
            </div>
            <div
              className={`right-content ${isScheduleListOpen ? "open" : ""}`}
            >
              {/* <button onClick={() => nav("/backboard")}>
                백보드 이동 버튼
              </button> */}
              <ScheduleList calendarData={wheelAction} />
            </div>
            <ModalTheme
              isOpen={isModalOpen}
              onModal={closeModal}
              onColor={onColor}
            />
          </div>
        </ScheduleDispatchContext.Provider>
      </ScheduleStateContext.Provider>
    </>
  );
};

export default Calendar;
