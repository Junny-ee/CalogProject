import "./Title.css";

const Title = ({ title, setTitle, inputRef }) => {
  return (
    <input
      ref={inputRef}
      className="title_input"
      type="text"
      placeholder="글 제목"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
};

export default Title;
