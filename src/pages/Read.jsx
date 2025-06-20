import { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useNavigate, useParams } from "react-router-dom";
import { postContent } from "../util/postContent";
import "./Read.css";
import remarkGfm from "remark-gfm";
import { cb } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CalogDispatchContext, CalogStateContext } from "../App";
const Read = ({ title, createDate, content, tag }) => {
  const { onDelete } = useContext(CalogDispatchContext);
  const nav = useNavigate();
  const params = useParams();
  const contentList = useContext(CalogStateContext);
  const rightNum = contentList.find(
    (item) => String(item.id) === String(params.id)
  );

  return (
    <>
      <button onClick={() => nav(-1)}>뒤로가는 버튼</button>
      <button onClick={() => nav(`/edit/${params.id}`)}>수정하기</button>
      <button onClick={() => { onDelete(params.id); nav("/backboard") }}>삭제하기</button>
      <h1>{rightNum.title}</h1>
      <div className="read_createDate">
        {new Date(rightNum.createDate).toLocaleDateString()}
      </div>
      <div className="read_content">{rightNum.content}</div>
      {/* 글 상세보기 창에서 태그 클릭시 태그별 검색 작동 필요*/}
      <div
        className="read_tag"
        onClick={() => {
          nav(-1);
        }}
      >{`#${rightNum.tag}`}</div>
      {/* <div className="Read">
        <div className="read_title_content">{rightNum.title}</div>
        <div className="read_tag_content">{spreadTag}</div>
        <div className="read_content">
          <ReactMarkdown
            children={rightNum.content}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={cb}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
      </div> */}
    </>
  );
};

export default Read;
