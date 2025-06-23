import { useContext, useEffect, useState } from "react";
import "./BackPostList.css";
import BackPostItem from "./BackPostItem";
import { useNavigate } from "react-router-dom";
import { BackBoardDispatchContext } from "./BackBoardMain";

import { CalogDispatchContext } from "../App";
import { TagStateContext } from "../App";

const BackPostList = ({ data, entireData }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [checkedItems, setCheckedItems] = useState([]);
  const { setSearchingTag } = useContext(BackBoardDispatchContext);
  const { onDelete } = useContext(CalogDispatchContext);
  const tagCount = useContext(TagStateContext);

  const getSortedData = () => {
    return data.toSorted((prev, next) => {
      return Number(sortType === "oldest" ? prev.createDate : next.createDate) -
        Number(sortType === "oldest" ? next.createDate : prev.createDate);
    });
  };

  const checkedItemHandler = (id, isChecked) => {
    const stringedId = String(id);
    setCheckedItems(prevCheckedItems => {
      if (isChecked) {
        return prevCheckedItems.includes(stringedId) ? prevCheckedItems : [...prevCheckedItems, stringedId];
      } else {
        return prevCheckedItems.filter(itemId => itemId !== stringedId);
      }
    });
  };

  const allCheck = (checked) => {
    setCheckedItems(prevCheckedItems => {
      if (checked) {
        const allItemIds = data.map((item) => String(item.id));
        return allItemIds;
      } else {
        return [];
      }
    });
  };

  const deleteChecked = () => {
    checkedItems.forEach(id => onDelete(id));
    setCheckedItems([]);
  };

  const sortedData = getSortedData();

  return (
    <>
      <div className="buttons">

        {(sortType === "latest") ? (<button onClick={() => setSortType("oldest")}>오래된 순</button>) : (<button onClick={() => setSortType("latest")}>최신순</button>)}
        <button className="write_button" onClick={() => nav("/new")}>
          <img src="/write_button.png" alt="" />
        </button>
        <button onClick={deleteChecked}>체크된 글 삭제하기</button>
        <input
          type="checkbox"
          onChange={(e) => allCheck(e.target.checked)}
          checked={checkedItems.length === data.length && data.length > 0}
        />
      </div>
      <div className="tag_wrapper">
        <h3>태그 목록</h3>
        <hr />
        {/* 개별 태그 개수 표시, (선택)태그별 조회 상태에서 검색 필요*/}

        <div
          className="tags"
          onClick={() => setSearchingTag("")}
        >{`전체보기 (${entireData.length})`}</div>

        <div>
          {Object.entries(tagCount).map(([tag, count]) => (
            <div className="tags" key={tag} onClick={() => setSearchingTag(tag, count)}>
              {tag} ({count})
            </div>
          ))}
        </div>
      </div>
      <div className="content_wrap">
        {sortedData.map((item) => (
          <BackPostItem
            key={String(item.id)}
            {...item}
            id={String(item.id)}
            checkedItems={checkedItems}
            checkedItemHandler={checkedItemHandler}
          />
        ))}
      </div>
    </>
  );

};
export default BackPostList;
