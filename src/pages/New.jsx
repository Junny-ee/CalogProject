import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalogDispatchContext } from "../App";
import ContentBox from "../components/ContentBox";
import NewTagWrite from "../components/NewTagWrite";
import Title from "../components/Title";
import "./New.css";
import Button from "../components/Button";

const New = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const { onCreate } = useContext(CalogDispatchContext);
  const nav = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const isChange = title.trim() !== "" && content.trim() !== "";

  const onSubmitButtonClick = () => {
    if (!isChange) {
      return alert("제목이나 내용이 비어있습니다!");
    }
    if (title.length > 100) {
      return alert("제목에는 100자 이상 쓸 수 없습니다!");
    }
    const currentId = onCreate(title, tags, content);
    nav(`/read/${currentId}`, { replace: true });
  };

  const isStop = () => {
    if (!window.confirm("글 작성을 멈추고 캘린더로 이동할까요?")) {
      return;
    } else {
      nav("/");
    }
  };

  return (
    <div className="New">
      <div className="header_content">
        <button
          className="gotoCal"
          onClick={() => {
            isStop();
          }}
        >
          <img src="/logo_image_width.png" alt="가로 버전 로고" />
        </button>
        <Button
          text={"✕"}
          onClick={() => {
            nav(-1);
          }}
          classtype={"Cancel"}
        />
      </div>
      <div className="content_wrapper">
        <div className="title_content">
          <Title title={title} setTitle={setTitle} inputRef={inputRef} />
        </div>
        <div className="date_content">{new Date().toLocaleDateString()}</div>
        <div style={{ height: "99px" }}>
          <div className="tag_content">
            <NewTagWrite tags={tags} setTags={setTags} />
          </div>
        </div>

        <div className="write_content">
          <ContentBox content={content} setContent={setContent} />
        </div>
        <div className="button_content">
          <Button
            text={"작성 완료"}
            classtype={"Create"}
            onClick={onSubmitButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default New;
