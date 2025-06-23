import "./Summary.css";
import Button from "./Button";
import SummaryItem from "./SummaryItem";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CalogStateContext } from "../App";
const Summary = ({ date }) => {
  const [todaySummary, setTodaySummary] = useState(null);
  const BackBoardData = useContext(CalogStateContext);
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
        <h4>
          {date ? new Date(date).toLocaleDateString() : "날짜를 선택하세요"}
        </h4>
        <Button text={"+"} classtype={"Create"} onClick={() => nav("/new")} />
      </div>
      <div className="Summary_Contests">
        <SummaryItem data={todaySummary} />
      </div>
    </div>
  );
};

export default Summary;
