import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalogDispatchContext } from "../App";
import { CalogStateContext } from "../App";
import ContentBox from "../components/ContentBox";
import NewTagWrite from "../components/NewTagWrite";
import Title from "../components/Title";
import Button from "../components/Button";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const { onUpdate } = useContext(CalogDispatchContext);
  const nav = useNavigate();
  const params = useParams();
  const data = useContext(CalogStateContext);
  const [curContentItem, setContentItem] = useState();

  useEffect(() => {
    const item = data.find((item) => String(item.id) === String(params.id));

    if (data.length > 0 && !item) {
      window.alert("존재하지 않는 글이에요 😓");
      nav("/backboard", { replace: true });
    } else {
      setTitle(item.title);
      setTags(
        typeof item.tag === "string"
          ? item.tag.split("\n")
          : Array.isArray(item.tag)
          ? item.tag
          : []
      );

      setContent(item.content);
      setContentItem(item);
    }
  }, [params.id, data]);

  const onSubmitButtonClick = () => {
    if (window.confirm("글을 수정하시겠습니까?")) {
      onUpdate(params.id, title, curContentItem.createDate, tags, content);
      nav(`/read/${params.id}`, { replace: true });
      alert("글이 정상적으로 수정되었어요 😊");
    }
  };

  if (!curContentItem) return null;

  const isStop = () => {
    if (!window.confirm("글 수정을 멈추고 캘린더로 이동할까요?")) {
      return;
    } else {
      nav("/");
    }
  };

  return (
    <div className="Edit">
      <div className="header_content">
        <button
          className="gotoCal"
          onClick={() => {
            isStop();
          }}
        >
          <img src="/logo_image_width.png" alt="가로 버전 로고" />
        </button>
        <Button text={"✕"} onClick={() => nav(-1)} classtype={"Cancel"} />
      </div>
      <div className="content_wrapper">
        <div className="title_content">
          <Title title={title} setTitle={setTitle} />
        </div>
        <div className="date_content">
          {new Date(curContentItem.createDate).toLocaleDateString()}
        </div>
        <div style={{ height: "99px" }}>
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
        <div className="button_content">
          <Button
            text={"수정 완료"}
            classtype={"Create"}
            onClick={onSubmitButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Edit;
