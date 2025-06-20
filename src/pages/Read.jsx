import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Read.css";
import { CalogDispatchContext, CalogStateContext } from "../App";
import ReactMarkdown from "react-markdown";
import useMarkdown from "../hooks/useMarkdown";

const Read = () => {
  const { onDelete } = useContext(CalogDispatchContext);
  const nav = useNavigate();
  const params = useParams();
  const contentList = useContext(CalogStateContext);
  const markdown = useMarkdown();

  const rightNum = contentList.find(
    (item) => String(item.id) === String(params.id)
  );
  return (
    <>
      <button onClick={() => nav(-1)}>뒤로가는 버튼</button>
      <button onClick={() => nav(`/edit/${params.id}`)}>수정하기</button>
      <button
        onClick={() => {
          onDelete(params.id);
          nav("/backboard");
        }}
      >
        삭제하기
      </button>
      <h1>{rightNum.title}</h1>
      <div className="read_createDate">
        {new Date(rightNum.createDate).toLocaleDateString()}
      </div>
      {/* 글 상세보기 창에서 태그 클릭시 태그별 검색 작동 필요*/}
      <div>
        {rightNum.tag.map((tag, idx) => (
          <span
            key={idx}
            className="read_tag"
            onClick={() => {
              nav(-1);
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="read_content">
        <ReactMarkdown components={markdown}>{rightNum.content}</ReactMarkdown>
      </div>
    </>
  );
};

export default Read;
