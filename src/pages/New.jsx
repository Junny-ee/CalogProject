import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalogDispatchContext } from "../App";
import ContentBox from "../components/ContentBox";
import NewTagWrite from "../components/NewTagWrite";
import Title from "../components/Title";
import "./New.css";

const New = () => {
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const { onCreate } = useContext(CalogDispatchContext);
  const nav = useNavigate();

  const onSubmitButtonClick = () => {
    const input = {
      createDate: new Date(),
      tag: tags,
      content,
    };
    onSubmit(input);
  };

  const onSubmit = (input) => {
    onCreate(input.createDate.getTime(), input.emotionId, input.content);
    nav("/read/id", { replace: true });
  };

  return (
    <div className="New">
      <div className="title_content">
        <Title />
      </div>
      <div className="date_content">{new Date().toLocaleDateString()}</div>
      <div className="tag_content">
        <NewTagWrite tags={tags} setTags={setTags} />
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
