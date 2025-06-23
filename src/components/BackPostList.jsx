import { useContext, useEffect, useState } from "react";
import "./BackPostList.css";
import BackPostItem from "./BackPostItem";
import { useNavigate } from "react-router-dom";
import { BackBoardDispatchContext } from "./BackBoardMain";
import { TagStateContext } from "../App";

const BackPostList = ({ data, entireData }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const { setSearchingTag } = useContext(BackBoardDispatchContext);
  const tagCount = useContext(TagStateContext);

  const getSortedData = () => {
    return data.toSorted((prev, next) => {
      if (sortType === "oldest") {
        return Number(prev.createDate) - Number(next.createDate);
      } else {
        return Number(next.createDate) - Number(prev.createDate);
      }
    });
  };

  const sortedData = getSortedData();

  return (
    <>
      <div className="buttons">
        {sortType === "latest" ? (
          <button onClick={() => setSortType("oldest")}>최신순</button>
        ) : (
          <button onClick={() => setSortType("latest")}>오래된 순</button>
        )}
        <button className="write_button" onClick={() => nav("/new")}>
          <img src="/write_button.png" alt="" />
        </button>
        <button>체크된 글 삭제하기(미구현)</button>
        <input type="checkbox" />
      </div>
      <div className="contents_wrapper">
        {sortedData.map((item) => (
          <BackPostItem key={item.id} {...item} />
        ))}
      </div>
      <div className="tag_wrapper">
        <h3>태그 목록</h3>
        {/* 개별 태그 개수 표시, (선택)태그별 조회 상태에서 검색 필요*/}
        <div
          className="total_tag"
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
    </>
  );
};
export default BackPostList;
