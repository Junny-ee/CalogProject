import { Route, Routes } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Read from "./pages/Read";
import Notfound from "./pages/Notfound";
import BackBoardMain from "./components/BackBoardMain";
import FrontCalendar from "./components/FrontCalendar";
import { CalendarProvider } from "./components/FrontCalendar";
import { createContext, useEffect, useReducer, useRef, useState } from "react";

// 실제 작성한 글 데이터를 관리하기 위한 함수
// state는 data가 저장, action에는 dispatch로 전달한 매개변수 저장
function reducer(state, action) {
  let nextState; // 추가, 수정, 삭제 후 변경된 스테이트를 저장하기 위한 변수

  switch (action.type) {
    case "INIT":
      return action.data;

    case "CREATE": // 작성한 글 데이터 추가하는 액션
      nextState = [action.data, ...state]; // 기존 상태()에 새로운 데이터를 앞에 추가
      break;

    case "UPDATE":
      nextState = state.map((data) =>
        // 각 작성한 글의 id와 수정할 작성한 글 id를 비교하여
        // 일치하면 전달받은 데이터로 값을 변경
        String(data.id) === String(action.data.id) ? action.data : data
      );
      break;

    case "DELETE":
      // 삭제 요청이 발생한 작성한 글 id와 기존에 작성한 글들의 id를 비교하여
      // 다른 id를 가진 작성한 글들만 새로운 배열로 반환
      nextState = state.filter((data) => String(data.id) !== String(action.id));

      break;

    default:
      // 정의 되지 않은 action.type이면 현재 상태 그대로 반환
      return state;
  }
  // 작성한 글이 생성, 수정, 삭제될 때마다 작성한 글의 현재 데이터를 바로바로 로컬스토리지에 저장
  localStorage.setItem("calog", JSON.stringify(nextState));
  return nextState;
}

// Context 사용 이유 : 모든 컴포넌트에 공유하기 위해서
// 글 데이터 관리하는 Context 생성(상태값 변화)
export const CalogStateContext = createContext();
// CRUD 기능을 하는 함수 관리하는 Context 생성(변화 X 데이터 -> 리렌더링 X)
export const CalogDispatchContext = createContext();

function App() {
  // 글 객체 저장
  const [data, dispatch] = useReducer(reducer, []);

  // 로컬 스토리지에서 값을 가져오기 전에 다른 페이지 컴포넌트들이 렌더링 되면 문제 발생
  // ex) 작성한 글 상세보기 페이지에서 새로고침하면 없는 작성한 글이라고 뜨는 문제 발생
  // 따라서 로딩기능 만들 필요가 있다 -> 로딩 여부 저장하는 state 추가
  const [isLoading, setIsLoading] = useState(true); // 현재 로딩 중

  // 작성한 글의 id를 관리하기 위한 변수 선언
  // react 변수이므로 새로고침 or 웹 브라우저 재시작 시 초기화
  const idRef = useRef(0);

  // 컴포넌트가 마운트 되었을 때 딱 한 번만 로컬 스토리지에서 값을 받아오도록 처리
  useEffect(() => {
    const storedData = localStorage.getItem("calog");
    if (!storedData) {
      setIsLoading(false); // 로딩 완료
      return;
    }

    // 웹 스토리지에 저장된 문자열 형태의 작성한 글 데이터를 객체로 변환
    const parsedData = JSON.parse(storedData);

    let maxId = 0; // id 최대값 저장
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = item.id;
      }
    });

    idRef.current = maxId + 1; // 새 작성한 글의 id 지정

    // 기존에 웹 스토리지에 저장된 작성한 글 데이터를 reducer() 전달
    dispatch({
      type: "INIT",
      data: parsedData,
    });

    // 디스패치 함수가 실행되어 데이터 스테이트의 초기값을 설정한 뒤 로딩 종료 처리
    setIsLoading(false);
  }, []); // 마운트 될 때만 실행되도록 deps를 빈 배열로 지정

  const onCreate = (title, tag, content) => {
    const currentId = idRef.current++;
    dispatch({
      type: "CREATE",
      data: {
        id: currentId,
        createDate: new Date().getTime(),
        title,
        tag,
        content,
      },
    });
    return currentId;
  };

  const onUpdate = (id, title, createDate, tag, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        title,
        createDate,
        tag,
        content,
      },
    });
  };

  const onDelete = (id) => {
    dispatch({ type: "DELETE", id });
  };

  if (isLoading) {
    return <div>데이터 로딩중...</div>;
  }

  return (
    <>
      <CalogStateContext.Provider value={data}>
        <CalogDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <CalendarProvider>
            <Routes>
              <Route path="/" element={<Calendar />} />
              <Route path="/" element={<FrontCalendar />} />
              <Route path="/new" element={<New />} />
              <Route path="/backboard" element={<BackBoardMain />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/read/:id" element={<Read />} />
              <Route path="/*" element={<Notfound />} />
            </Routes>
          </CalendarProvider>
        </CalogDispatchContext.Provider>
      </CalogStateContext.Provider>
    </>
  );
}

export default App;
