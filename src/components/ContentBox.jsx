import "./ContentBox.css";
import ReactMarkdown from "react-markdown";
import useMarkdown from "../hooks/useMarkdown";

const ContentBox = ({ content, setContent, onSubmitButtonClick }) => {
  const markdown = useMarkdown();
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
        <ReactMarkdown components={markdown}>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ContentBox;
