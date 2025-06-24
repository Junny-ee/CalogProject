import { createContext, useEffect, useReducer, useRef, useState } from "react";
import FrontCalendar from "../components/FrontCalendar";
import ScheduleList from "../components/ScheduleList";
import Summary from "../components/Summary";
import "./Calendar.css";
import { useCalendar } from "../components/FrontCalendar";
import ModalTheme from "../components/ModalTheme";
function reducer(state, action) {
  let nextState;
  let nextColor;
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
    case "color":
      return (nextColor = action.color);
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
  const [isScheduleListOpen, setIsScheduleListOpen] = useState(true);
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);
  const [isThemeChange, setIsThemeChange] = useState(false);
  const { selectedDate } = useCalendar(); //날짜 선택 context
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 입력창 여는 state
  const [wheelAction, setWheelAction] = useState(new Date());
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
  // 여기부터 context랑 reducer 함수
  useEffect(() => {
    const storedData = localStorage.getItem("schedule");
    if (!storedData) {
      setIsLoading(false); // 로딩완료
      return;
    }
    console.log(calendarData);
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
    dispatch({
      name: "color",
      color,
    });
  };
  if (isLoading) {
    return <div>로딩 중...</div>; // 데이터 로딩 중 스피너 등을 표시할 수 있습니다.
  }
  return (
    <>
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
