import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalogDispatchContext } from "../App";
import ContentBox from "../components/ContentBox";
import NewTagWrite from "../components/NewTagWrite";
import Title from "../components/Title";
import "./New.css";

const New = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const { onCreate } = useContext(CalogDispatchContext);
  const nav = useNavigate();

  const isChange = title.trim() !== "" && content.trim() !== "";

  const onSubmitButtonClick = () => {
    if (!isChange) {
      return alert("제목이나 내용이 비어있습니다!");
    }
    const currentId = onCreate(title, tags, content);
    nav(`/read/${currentId}`, { replace: true });
  };

  return (
    <div className="New">
      <div className="title_content">
        <Title title={title} setTitle={setTitle} />
      </div>
      <div className="date_content">{new Date().toLocaleDateString()}</div>
      <div style={{height:"99px"}}>
        <div className="tag_content">
          <NewTagWrite tags={tags} setTags={setTags} />
        </div>
      </div>

      <div className="write_content">
        <ContentBox
          content={content}
          setContent={setContent}
          onSubmitButtonClick={onSubmitButtonClick}
        />
      </div>
    </div>
  );
};

export default New;
