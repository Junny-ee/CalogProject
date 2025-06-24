import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Read.css";
import { CalogDispatchContext, CalogStateContext } from "../App";
import ReactMarkdown from "react-markdown";
import useMarkdown from "../hooks/useMarkdown";

const Read = () => {
  const { onDelete } = useContext(CalogDispatchContext);
  const nav = useNavigate();
  const params = useParams();
  const contentList = useContext(CalogStateContext);
  const markdown = useMarkdown();

  const rightNum = contentList.find(
    (item) => String(item.id) === String(params.id)
  );

  const [scrolled, setScrolled] = useState(false);

  function onScroll() {
    if (window.scrollY >= 150) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
        <div className="btn_wrap">
          <button className="back_button" onClick={() => nav(-1)}>
            <img src="/back.png" alt="뒤로가기 버튼" />
          </button>
          <div className="btn_wrapp">
            <button
              className="edit_btn"
              onClick={() => nav(`/edit/${params.id}`)}
            >
              <img src="/edit_button.png" alt="수정하기 버튼" />
            </button>
            <button
              className="delete_button"
              onClick={() => {
                onDelete(params.id);
                nav("/backboard");
              }}
            >
              <img src="/delete.png" alt="삭제하기" />
            </button>
          </div>
        </div>
      <div className="Read">
        {scrolled ? (
          <button id="moveToTopButton" onClick={moveToTop}>
            <img src="/gotoup.png" />
          </button>
        ) : null}

        <h1>{rightNum.title}</h1>
        <div className="read_createDate">
          {new Date(rightNum.createDate).toLocaleDateString()}
        </div>

        <div className="read_content">
          <ReactMarkdown components={markdown}>
            {rightNum.content}
          </ReactMarkdown>
        </div>
        <div>
          {rightNum.tag.map((tag, idx) => (
            <span
              key={idx}
              className="read_tag"
              onClick={() => {
                nav(-1);
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Read;
