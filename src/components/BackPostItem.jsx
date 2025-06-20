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
  // 문자열인 경우 ,로 나눠 배열로 변환
  const tagArray = Array.isArray(tag) ? tag : tag?.split(",");

  return (
    <div className="post_item">
      <div className="content_wrapper" onClick={() => nav(`/read/${id}`)}>
        <div className="content_header">{title}</div>
        <div className="content_body">{content}</div>

        {tagArray && (
          <div className="tag_list">
            {tagArray.map((t, index) => (
              <span
                key={index}
                className="tag"
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchWord("");
                  setSearchingTag(t.trim());
                  setShowSearchBar(false);
                }}
              >
                #{t.trim()}
              </span>
            ))}
          </div>
        )}

        <div className="content_date">
          {new Date(createDate).toLocaleDateString()}
        </div>
      </div>
      <input type="checkbox" onClick={() => setIsChecked(true)} />
      <button className="button_delete" onClick={() => onDelete(id)}>
        삭제하기
      </button>
    </div>
  );
};

export default BackPostItem;
