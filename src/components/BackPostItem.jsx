import { useNavigate } from "react-router-dom";
import "./BackPostItem.css";
// 태그 여러 개 구현 필요
const BackPostItem = ({ id, title, createDate, content, tag }) => {
  const nav = useNavigate();

  return (
    <div className="post_item">
      <div className="content_wrapper" onClick={() => nav(`/read/${id}`)}>
        <div className="content_header">{title}</div>
        <div className="content_body">{content}</div>
        {tag ? (
          <div className="tag" onClick={(e) => e.stopPropagation()}>{`#${tag}`}</div>
        ) : (null)}
        <button onClick={(e) => e.stopPropagation()}>상단 고정 버튼(미구현)</button>
        <div className="content_date">{new Date(createDate).toLocaleDateString()}</div>
      </div>
      <input type="checkbox" onClick={(e) => e.stopPropagation()} />
    </div>
  );
};

export default BackPostItem;