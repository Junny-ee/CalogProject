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

  useEffect(() => {
    setTags([...new Set(entireData.map(item => item.tag))]);
  }, [entireData])

  // 글 등록시 추가/+1 삭제/-1로 바꾸는 것 고려하기
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
        {/* 태그 클릭시 검색, 태그 중복 제거, 태그 개수 표시 필요 */}
        <div className="tags" onClick={() => setSearchingTag("")}>{`전체보기 (${entireData.length})`}</div>

        <div>{tags.map((tag) =>
          <div className="tags" onClick={() => setSearchingTag(tag)}>{tag}</div>)
        }</div>
      </div>

    </>
  );
}
export default BackPostList;