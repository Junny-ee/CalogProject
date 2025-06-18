import "./ContentBox.css";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import { cb } from "react-syntax-highlighter/dist/esm/styles/prism";
import Button from "./Button";

const ContentBox = ({ content, setContent, onSubmitButtonClick }) => {
  return (
    <div>
      <textarea
        className="write_content_textarea"
        placeholder="글을 입력하세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

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
      <div className="button_content">
        <Button
          text={"작성 완료"}
          classtype={"Create"}
          onClick={onSubmitButtonClick}
        />
      </div>
    </div>
  );
};

export default ContentBox;
