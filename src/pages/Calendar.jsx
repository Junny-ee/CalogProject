import { createContext, useEffect, useReducer, useRef, useState } from "react";
import BackBoardMain from "../components/BackBoardMain";
import FrontCalendar from "../components/FrontCalendar";
import ScheduleList from "../components/ScheduleList";
import Summary from "../components/Summary";
import "./Calendar.css";
import { useCalendar } from "../components/FrontCalendar";

// 테스터용 임시 데이터
const events = [
  {
    title: "회의",
    start: new Date(2025, 5, 15, 10, 0),
    end: new Date(2025, 5, 18, 12, 0),
  },
  {
    title: "미팅",
    start: new Date(2025, 5, 15, 10, 0),
    end: new Date(2025, 5, 16, 12, 0),
  },
  {
    title: "프로젝트",
    start: new Date(2025, 5, 16, 13, 0),
    end: new Date(2025, 5, 20, 14, 0),
  },
  {
    title: "미팅",
    start: new Date(2025, 5, 15, 10, 0),
    end: new Date(2025, 5, 16, 12, 0),
  },
  {
    title: "미팅",
    start: new Date(2025, 5, 15, 10, 0),
    end: new Date(2025, 5, 16, 12, 0),
  },
];
function reducer(state, action) {
  let nextState;
  switch (action.name) {
    case "init":
      return action.data;
    case "create":
      nextState = [...state, action.data];
      break;
    case "update":
      nextState = state.map((item) =>
        String(item.id) === String(item.data.id) ? action.data : item
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
  const [isScheduleListOpen, setIsScheduleListOpen] = useState(true);
  const [isSummaryOpen, setIsSummaryOpen] = useState(true);
  const { selectedDate } = useCalendar(); //날짜 선택 context
  const toggleScheduleList = () => {
    setIsScheduleListOpen(!isScheduleListOpen);
  };
  const toggleSummary = () => {
    setIsSummaryOpen(!isSummaryOpen);
  };
  // 여기부터 context랑 reducer 함수
  useEffect(() => {
    const storedData = localStorage.getItem("schedule");
    if (!storedData) {
      setIsLoading(false); // 로딩완료
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
  const onCreate = (type, title, startDate, endDate, contents) => {
    dispatch({
      name: "create",
      data: {
        type,
        id: calendarRef.current++,
        title, // key와 value 가 같을경우 하나만 써도 됨
        startDate,
        endDate,
        contents,
      },
    });
  };
  const onUpdate = (type, id, title, startDate, endDate, contents) => {
    dispatch({
      name: "update",
      data: {
        type,
        id,
        title,
        startDate,
        endDate,
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
  // const mockdata = [
  //   {
  //     type: "item",
  //     id: calendarRef.current++,
  //     title: "테스트 제목1", // key와 value 가 같을경우 하나만 써도 됨
  //     startDate: new Date("2025-06-20"),
  //     endDate: new Date("2025-06-21"),
  //     contents: "테스트 내용1",
  //   },
  // ];
  // localStorage.setItem("schedule", JSON.stringify(mockdata));

  if (isLoading) {
    return <div>로딩 중...</div>; // 데이터 로딩 중 스피너 등을 표시할 수 있습니다.
  }
  return (
    <>
      <ScheduleStateContext.Provider value={calendarData}>
        <ScheduleDispatchContext.Provider
          value={{ onCreate, onUpdate, onDelete }}
        >
          <div className="Calendar">
            <div className="left-content">
              <button className="button_schedule" onClick={toggleScheduleList}>
                할 일 목록 펼침/닫힘 버튼
              </button>
              <button className="button_summary" onClick={toggleSummary}>
                요약창 펼침/닫힘 버튼
              </button>

              <FrontCalendar events={events} />
              <div className={`under-content ${isSummaryOpen ? "open" : ""}`}>
                <Summary
                  item={
                    selectedDate
                      ? events.filter(
                          (e) =>
                            e.start.toLocaleDateString() ===
                            selectedDate.toLocaleDateString()
                        )
                      : []
                  }
                  date={selectedDate}
                />
              </div>
            </div>
            <div
              className={`right-content ${isScheduleListOpen ? "open" : ""}`}
            >
              <ScheduleList />
            </div>
          </div>
        </ScheduleDispatchContext.Provider>
      </ScheduleStateContext.Provider>
    </>
  );
};

export default Calendar;
