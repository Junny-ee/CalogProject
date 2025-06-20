import { useContext, useEffect, useState } from "react";
import "./BackPostList.css";
import BackPostItem from "./BackPostItem";
import { useNavigate } from "react-router-dom";
import { BackBoardDispatchContext } from "./BackBoardMain";
const BackPostList = ({ data, entireData }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [tags, setTags] = useState([]);
  const { setSearchingTag } = useContext(BackBoardDispatchContext);
  const getSortedData = () => {
    return data.toSorted((prev, next) => {
      if (sortType === "oldest") {
        return Number(prev.createDate) - Number(next.createDate);
      } else {
        return Number(next.createDate) - Number(prev.createDate);
      }
    });
  };

  // useEffect(() => {
  //   setTags([...new Set(entireData.map(item => item.tag))]);
  // }, [entireData])


  useEffect(() => {
    let allTags = [];
    entireData.forEach((item) => {
      if (Array.isArray(item.tag)) {
        allTags = allTags.concat(item.tag);
      } else if (typeof item.tag === "string" && item.tag.trim() !== "") {
        allTags.push(item.tag);
      }
    });
    setTags([...new Set(allTags)]);
  }, [entireData]);

  const sortedData = getSortedData();

  return (
    <>
      <div className="buttons">
        {(sortType === "latest") ? (<button onClick={() => setSortType("oldest")}>최신순</button>) : (<button onClick={() => setSortType("latest")}>오래된 순</button>)}
        <button onClick={() => nav("/new")}>작성하기</button>
        <button>체크된 글 삭제하기(미구현)</button>
        <input type="checkbox" />
      </div>
      <div className="contents_wrapper">
        {sortedData.map((item) => (
          <BackPostItem key={item.id} {...item} />
        ))}
      </div>
      <div className="tag_wrapper">
        <h3>태그 목록(미완성)</h3>
        {/* 개별 태그 개수 표시, (선택)태그별 조회 상태에서 검색 필요*/}
        <div className="tags" onClick={() => setSearchingTag("")}>{`전체보기 (${entireData.length})`}</div>

        <div>{tags.map((tag) =>
          <div className="tags" key={tag} onClick={() => setSearchingTag(tag)}>{tag}</div>)
        }</div>
      </div>

    </>
  );
}
export default BackPostList;