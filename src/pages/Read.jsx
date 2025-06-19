import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postContent } from "../util/postContent";
import "./Read.css";
import { CalogStateContext } from "../App";
const Read = ({ title, createDate, content, tag }) => {
  const targetContent = postContent.find(content => Number(content.id) === Number(params.id));
  const nav = useNavigate();
  const params = useParams();
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
