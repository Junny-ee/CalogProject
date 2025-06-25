import { Route, Routes } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Read from "./pages/Read";
import Notfound from "./pages/Notfound";
import BackBoardMain from "./components/BackBoardMain";
import FrontCalendar from "./components/FrontCalendar";
import { CalendarProvider } from "./components/FrontCalendar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useEffect, useReducer, useRef, useState } from "react";
import { postContent } from "./util/postContent";
const queryClient = new QueryClient();

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data;

    case "CREATE":
      nextState = [action.data, ...state];
      break;

    case "UPDATE":
      nextState = state.map((data) =>
        String(data.id) === String(action.data.id) ? action.data : data
      );
      break;

    case "DELETE":
      nextState = state.filter((data) => String(data.id) !== String(action.id));
      break;

    default:
      return state;
  }
  localStorage.setItem("calog", JSON.stringify(nextState));
  return nextState;
}

function tagCounting(data) {
  const tagItemCount = {};
  if (!data) {
    return;
  }
  data.map((data) => {
    if (Array.isArray(data.tag)) {
      data.tag.map((tag) => {
        tagItemCount[tag] = (tagItemCount[tag] || 0) + 1;
      });
    }
  });
  return tagItemCount;
}

export const CalogStateContext = createContext();
export const CalogDispatchContext = createContext();
export const TagStateContext = createContext();

const PAGE_SIZE = 10;

const fetchDatas = async (startIndex = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedData = localStorage.getItem("calog");
      if (!storedData) {
        resolve({ data: [], nextCursor: undefined });
        return;
      }
      const parsedData = JSON.parse(storedData);
      const sortedData = parsedData.sort((a, b) => b.createDate - a.createDate);
      const endIndex = startIndex + PAGE_SIZE;
      const paginatedData = sortedData.slice(startIndex, endIndex);
      const nextCursor = endIndex < sortedData.length ? endIndex : undefined;
      resolve({ data: paginatedData, nextCursor });
    }, 100); // 빠른 테스트를 위해 100으로 임시 설정함
  });
};
function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const [tagCount, setTagCount] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("calog");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      let maxId = 0;
      parsedData.forEach((item) => {
        if (Number(item.id) > maxId) {
          maxId = item.id;
        }
      });
      idRef.current = maxId + 1;
      dispatch({
        type: "INIT",
        data: parsedData,
      });
    } else {
      const parsedData = localStorage.setItem(
        "calog",
        JSON.stringify(postContent)
      );
      dispatch({
        type: "INIT",
        data: parsedData,
      });
    }
    setTagCount(tagCounting(JSON.parse(localStorage.getItem("calog") || "[]")));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setTagCount(tagCounting(data));
  }, [data]);

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
          <TagStateContext.Provider value={tagCount}>
            <CalendarProvider>
              <QueryClientProvider client={queryClient}>
                <Routes>
                  <Route path="/" element={<Calendar />} />
                  <Route path="/" element={<FrontCalendar />} />
                  <Route path="/new" element={<New />} />
                  <Route
                    path="/backboard"
                    element={<BackBoardMain fetchPosts={fetchDatas} />}
                  />
                  <Route path="/edit/:id" element={<Edit />} />
                  <Route path="/read/:id" element={<Read />} />
                  <Route path="/*" element={<Notfound />} />
                </Routes>
              </QueryClientProvider>
            </CalendarProvider>
          </TagStateContext.Provider>
        </CalogDispatchContext.Provider>
      </CalogStateContext.Provider>
    </>
  );
}

export default App;
