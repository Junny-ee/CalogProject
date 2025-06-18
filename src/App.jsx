import { Route, Routes } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Edit from "./pages/Edit";
import New from "./pages/New";
import Read from "./pages/Read";
import Notfound from "./pages/Notfound";
import BackBoard from "./components/BackBoard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/new" element={<New />} />
        <Route path="/backboard" element={<BackBoard />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
