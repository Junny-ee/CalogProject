import { useNavigate } from "react-router-dom";
import "./BackPostItem.css";
import { BackBoardDispatchContext } from "./BackBoardMain";
import { useContext } from "react";

// 태그 여러 개 구현 필요
const BackPostItem = ({ id, title, createDate, content, tag }) => {
  const nav = useNavigate();
  const { deleteContent, setSearchWord, setSearchingTag, setShowSearchBar } =
    useContext(BackBoardDispatchContext);

  const markdownPreviewLines = () => {
    if (typeof content !== "string") return [];

    const lines = content.split("\n").slice(0, 2); // 제목(첫 줄) 제외

    return lines
      .filter((line) => line.trim() !== "") // 빈 줄 제거
      .map((line) =>
        line
          .replace(/^#+\s*/, "") // 제목 기호 제거
          .replace(/[*_`>~-]/g, "") // 기타 기호 제거
          .trim()
      );
  };

  return (
    <div className="post_item">
      <div className="content_wrapper" onClick={() => nav(`/read/${id}`)}>
        <div className="content_header">{title}</div>
        <div className="content_body">
          {" "}
          {markdownPreviewLines().map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>

        {tag ? (
          <div
            className="tag"
            onClick={(e) => {
              e.stopPropagation();
              setSearchWord("");
              setSearchingTag(tag);
              setShowSearchBar(false);
            }}
          >{`#${tag}`}</div>
        ) : null}
        <button onClick={(e) => e.stopPropagation()}>
          상단 고정 버튼(미구현)
        </button>
        <div className="content_date">{new Date().toLocaleDateString()}</div>
      </div>
      <input type="checkbox" onClick={(e) => e.stopPropagation()} />
      <button className="button_delete" onClick={() => deleteContent(id)}>
        삭제하기 테스트 버튼(현재 로컬 스토리지가 없어서 새로고침/페이지
        이동하면 복구됨)
      </button>
    </div>
  );
};

export default BackPostItem;
