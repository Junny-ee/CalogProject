import "./Summary.css";
import Button from "./Button";
import SummaryItem from "./SummaryItem";
import { useNavigate } from "react-router-dom";
import { postContent } from "../util/postContent";
const Summary = ({ date }) => {
  const nav = useNavigate();
  console.log("선택한 날짜:", date);

  const check = new Date("2025-06-26");
  // const today = Date(date); 추후 데이터 받으면 넣기
  const todaySummary = postContent.filter(
    (date) => date.createDate === check.getTime()
  ); // 날짜 일치하는 객체 가져오기
  // console.log(check.toLocaleDateString());
  return (
    <div className="Summary">
      <div className="Summary_Header">
        {/* <h4>{check.toLocaleDateString()}</h4> 나중에 데이터받으면 수정 */}
        {/* 렌더링 확인 코드  */}
        <h4>
          {date ? new Date(date).toLocaleDateString() : "날짜를 선택하세요"}
        </h4>
        <Button text={"+"} classtype={"Create"} onClick={() => nav("/new")} />
      </div>
      <div className="Summary_Contests">
        <SummaryItem item={todaySummary} />
      </div>
    </div>
  );
};

export default Summary;
