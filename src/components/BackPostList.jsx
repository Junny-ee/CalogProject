import { useEffect, useState } from "react";
import "./BackPostList.css";
import BackPostItem from "./BackPostItem";
import { useNavigate } from "react-router-dom";
const BackPostList = ({ data, searchingTag, setSearchingTag }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [tags, setTags] = useState([]);
  const [contentsAmount, setContentsAmount] = useState(0);
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
    setTags([...new Set(data.map(item => item.tag))]);
  }, [data])
  useEffect(() => {
    setContentsAmount(data.length)
  }, [data])
  // 최적화를 위해 글 등록시 추가/+1 삭제/-1로 바꾸는 것 고려하기
  const sortedData = getSortedData();

  return (
    <>
      {(sortType === "latest") ? (<button onClick={() => setSortType("oldest")}>최신순</button>) : (<button onClick={() => setSortType("latest")}>오래된 순</button>)}
      <button onClick={() => nav("/new")}>작성하기</button>
      <button>체크된 글 삭제하기(미구현)</button>
      <div className="list_wrapper">
        <div className="tag_all">
          {sortedData.map((item) => (
            <BackPostItem key={item.id} {...item} />
          ))}
        </div>
        <div className="tag_wrapper">
          <div className="tag_header">태그 목록(구현 중)</div>
          <div className="tags">{`전체보기 (${contentsAmount})`}</div>
          <div>{tags.map((tag) =>
            <div className="tags" onClick={() => setSearchingTag(tag)}>{tag}</div>)
          }</div>
        </div>
      </div>

    </>
  );
}
export default BackPostList;