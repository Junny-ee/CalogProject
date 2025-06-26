import "./Summary.css";
import SummaryItem from "./SummaryItem";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CalogStateContext } from "../App";

const Summary = ({ date }) => {
  const [todaySummary, setTodaySummary] = useState(null);
  const BackBoardData = useContext(CalogStateContext);
  const isToday =
    new Date(date).toLocaleDateString() === new Date().toLocaleDateString();
  const nav = useNavigate();
  useEffect(() => {
    setTodaySummary(
      BackBoardData.filter(
        (item) =>
          new Date(item.createDate).toLocaleDateString() ===
          new Date(date).toLocaleDateString()
      )
    );
  }, [date]); 

  return (
    <div className="Summary">
      <div className="Summary_Header">
        <h4>
          {(() => {
            const d = new Date(date);
            const dateStr = d.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            const weekday = d.toLocaleDateString("ko-KR", { weekday: "short" });
            return `${dateStr} (${weekday})`;
          })()}
          {isToday ? (
            <button className="list_btn" onClick={() => nav("/new")}>
              <img src="/plus.png" alt="글 추가 버튼" />
            </button>
          ) : (
            ""
          )}
        </h4>
      </div>
      <div className="Summary_Contents">
        <SummaryItem data={todaySummary} />
      </div>
    </div>
  );
};

export default Summary;
