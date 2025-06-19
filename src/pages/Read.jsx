import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postContent } from "../util/postContent";
import "./Read.css";
import { CalogStateContext } from "../App";
const Read = ({ title, createDate, content, tag }) => {
  const targetContent = postContent.find(content => Number(content.id) === Number(params.id));
  const nav = useNavigate();
  const params = useParams();
  const contentList = useContext(CalogStateContext);
  const rightNum = contentList.find(
    (item) => String(item.id) === String(params.id)
  );

  if (!rightNum) {
    return <div>존재하지 않는 글입니다!</div>;
  }

  const spreadTag = (() => {
    // 태그가 배열 형식으로 들어오기 때문에 조건문 추가
    if (Array.isArray(rightNum.tag)) {
      return rightNum.tag
        .join("\n") // 엔터 기준으로 문자열로 구분
        .split("\n") // 엔터 기준으로 문자열로 구분했기 때문에 split으로 나눔
        .filter((tag) => tag.trim() !== "") // 띄어쓰기, 비어있는 문자열 제거 후 배열로 반환
        .map((tag, index) => (
          <span key={index} className="tag">
            #{tag}
          </span>
        ));
    } else {
      return []; // tag가 undefined/null 등일 때
    }
  })();

  return (
    <>
      <button onClick={() => nav(-1)}>뒤로가는 버튼</button>
      <button onClick={() => nav(`/edit/${params.id}`)}>수정하기</button>
      <button >삭제하기(미구현)</button>
      <h1>{targetContent.title}</h1>
      <div className="read_createDate">{new Date(targetContent.createDate).toLocaleDateString()}</div>
      <div className="read_content">{targetContent.content}</div>
      {/* 글 상세보기 창에서 태그 클릭시 태그별 검색 작동 필요*/}
      <div className="read_tag" onClick={() => { nav(-1) }}>{`#${targetContent.tag}`}</div>
      <div className="Read">
        <div className="read_title_content">{rightNum.title}</div>
        <div className="read_tag_content">{spreadTag}</div>
        <div className="read_content">
          <p>{rightNum.content}</p>
        </div>
      </div>
    </>
  );
};

export default Read;
