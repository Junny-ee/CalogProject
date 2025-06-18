import { useState } from "react";
import Button from "../components/Button";
import NewTagWrite from "../components/NewTagWrite";
import "./New.css";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { cb } from "react-syntax-highlighter/dist/esm/styles/prism";

const New = () => {
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");

  return (
    <div className="New">
      <input type="text" placeholder="글 제목" className="title_content" />
      <div className="date_content">{new Date().toLocaleDateString()}</div>
      <div className="tag_content">
        <NewTagWrite tags={tags} setTags={setTags} />
      </div>
      <textarea
        className="write_content"
        placeholder="글을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <div className="button_content">
        <Button text={"작성 완료"} classtype={"Create"} />
      </div>

      <div className="markdown_preview">
        <h3>미리보기</h3>
        <ReactMarkdown 
          children={content}
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
    </div>
  );
};

export default New;
