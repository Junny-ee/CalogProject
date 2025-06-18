import { useState } from "react";
import "./BackPostList.css";
import BackPostItem from "./BackPostItem";
import { useNavigate } from "react-router-dom";
const BackPostList = ({ data }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");
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
      <div>ㅡㅡㅡㅡㅡㅡㅡㅡ백보드 글 리스트ㅡㅡㅡㅡㅡㅡㅡㅡ</div>
      {(sortType === "latest") ? (<button onClick={() => setSortType("oldest")}>최신순</button>) : (<button onClick={() => setSortType("latest")}>오래된 순</button>)}
      <button onClick={() => nav("/new")}>작성하기</button>
      <button>삭제하기(미구현)</button>
      <div className="search">
        <input
          type="text"
          className="search_input"
          placeholder="검색어를 입력하세요"
        />
        <button className="search_button">검색(미구현)</button>
      </div>
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <BackPostItem key={item.id} {...item} />
        ))}
      </div>
      <div className="tag_wrapper">
        <div className="tag_header">태그 목록(미구현)</div>
      </div>
    </>
  );
}
export default BackPostList;