import { useNavigate } from "react-router-dom";
import "./SummaryItem.css";
const SummaryItem = ({ data }) => {
  const nav = useNavigate();
  if (!data) {
    return;
  }
  return (
    <div className="SummaryItem">
      {data.map((item) => (
        <a
          key={item.id}
          className="SummaryItem_title"
          onClick={() => nav(`/read/${item.id}`)}
        >
          {item.title}
          <br></br>
        </a>
      ))}
    </div>
  );
};

export default SummaryItem;
