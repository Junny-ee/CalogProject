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
      <button onClick={() => nav(-1)}>뒤로가는 버튼</button>
      <button onClick={() => nav(`/edit/${params.id}`)}>수정하기</button>
      <button
        onClick={() => {
          onDelete(params.id);
          nav("/backboard");
        }}
      >
        삭제하기
      </button>
      {scrolled ? (
        <button id="moveToTopButton" onClick={moveToTop}>
          <img src="/gotoup.png" />
        </button>
      ) : null}
      <h1>{rightNum.title}</h1>
      <div className="read_createDate">
        {new Date(rightNum.createDate).toLocaleDateString()}
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
      <div className="read_content">
        <ReactMarkdown components={markdown}>{rightNum.content}</ReactMarkdown>
      </div>
    </>
  );
};

export default Read;
