import { Route, Routes } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Read from "./pages/Read";
import Notfound from "./pages/Notfound";
import BackBoardMain from "./components/BackBoardMain";
import FrontCalendar from "./components/FrontCalendar";
import { CalendarProvider } from "./components/FrontCalendar";

function App() {
  return (
    <>
      <CalendarProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <FrontCalendar />
              </>
            }
          />
          <Route path="/" element={<Calendar />} />
          <Route path="/new" element={<New />} />
          <Route path="/backboard" element={<BackBoardMain />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/read/:id" element={<Read />} />
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </CalendarProvider>
    </>
  );
}

export default App;
