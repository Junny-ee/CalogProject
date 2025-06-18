import { useNavigate } from "react-router-dom";
import "./FrontCalendar.css";
import Button from "./Button";
const FrontCalendar = () => {
  const nav = useNavigate();
  return (
    <div>
      <button onClick={() => nav("/backboard")}>백보드 이동 버튼</button>
      <div className="FrontCalendar">캘린더 구역</div>;
    </div>
  )
};

export default FrontCalendar;
