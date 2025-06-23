import "./Summary.css";
import Button from "./Button";
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
  }, [date]); // 날짜 일치하는 객체 가져오기

  return (
    <div className="Summary">
      <div className="Summary_Header">
        {/* <h4>{new Date(date).toLocaleDateString()}</h4> */}
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
        </h4>
        {isToday ? (
          <Button text={"+"} classtype={"Create"} onClick={() => nav("/new")} />
        ) : (
          ""
        )}
      </div>
      <div className="Summary_Contests">
        <SummaryItem data={todaySummary} />
      </div>
    </div>
  );
};

export default Summary;
