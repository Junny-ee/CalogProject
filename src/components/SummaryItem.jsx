import { useNavigate } from "react-router-dom";
import "./SummaryItem.css";
const SummaryItem = ({ item }) => {
  const nav = useNavigate();
  return (
    <div className="SummaryItem">
      {item.map((item) => (
        <a
          className="SummaryItem_title"
          onClick={() => nav(`/read/${item.id}`)}
        >
          {item.title}
        </a>
      ))}
    </div>
  );
};

export default SummaryItem;
