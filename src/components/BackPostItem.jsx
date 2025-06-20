import { useNavigate } from "react-router-dom";
import "./BackPostItem.css";
import { BackBoardDispatchContext } from "./BackBoardMain";
import { useContext, useState } from "react";
import { CalogDispatchContext } from "../App";
// 태그 여러 개 구현 필요
const BackPostItem = ({ id, title, createDate, content, tag }) => {
  const nav = useNavigate();
  const { setSearchWord, setSearchingTag, setShowSearchBar } = useContext(
    BackBoardDispatchContext
  );

  const { onDelete } = useContext(CalogDispatchContext);
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="post_item" onClick={() => nav(`/read/${id}`)}>
      <div className="content_wrapper">
        <div className="content_header">{title}</div>
        <div className="content_body">{content}</div>

        {tag &&
          tag.map((item, index) => (
            <div
              key={index}
              className="tag"
              onClick={(e) => {
                e.stopPropagation();
                setSearchWord("");
                setSearchingTag(item);
                setShowSearchBar(false);
              }}
            >
              {`#${item}`}
            </div>
          ))}
        <div className="content_date">
          {new Date(createDate).toLocaleDateString()}
        </div>
      </div>
      <input
        type="checkbox"
        onClick={(e) => {
          e.stopPropagation();
          setIsChecked(true);
        }}
      />
      <button
        className="button_delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
      >
        삭제하기
      </button>
    </div>
  );
};

export default BackPostItem;
