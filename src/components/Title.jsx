import "./Title.css";

const Title = ({ title, setTitle }) => {

  return (
    <input
      className="title_input"
      type="text"
      placeholder="글 제목"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    
  );
};

export default Title;
