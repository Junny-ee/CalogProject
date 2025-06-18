import { useEffect, useState } from "react";
import "./BackBoard.css";
import { postContent } from "../util/postContent";
import BackPostList from "./BackPostList";
import { useNavigate } from "react-router-dom";
// props: id, title, createDate, content, tag

const BackBoard = () => {
  const nav = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  function onScroll() {
    if (window.scrollY >= 150) {
      setScrolled(true);
      console.log(scrolled);
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
    <div>
      <button onClick={() => nav("/")}>캘린더 이동 버튼</button>
      {scrolled ? (
        <button id="moveToTopButton" onClick={moveToTop}>
          페이지 맨 위로 가는 버튼
        </button>
      ) : null}
      <div className="list_wrapper">
        <BackPostList data={postContent} />
      </div>
    </div>
  );
};

export default BackBoard;
