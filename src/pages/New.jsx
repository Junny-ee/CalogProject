import { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const idRef = useRef(1);

  const onSubmitButtonClick = () => {
    const input = {
      id: idRef.current++,
      title: title,
      tag: tags,
      content,
    };
    onSubmit(input);
  };

  const onSubmit = (input) => {
    onCreate(input.id, input.title, input.tag, input.content);
    nav("/read/id", { replace: true });
  };

  return (
    <div className="New">
      <div className="title_content">
        <Title title={title} setTitle={setTitle} />
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
