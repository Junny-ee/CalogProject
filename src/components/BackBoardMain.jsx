import { useEffect, useState, createContext } from "react";
import "./BackBoardMain.css";
import { postContent } from "../util/postContent";
import BackPostList from "./BackPostList";
import { useNavigate } from "react-router-dom";
// props: id, title, createDate, content, tag
export const BackBoardDispatchContext = createContext();
const BackBoard = () => {
  // postContent
  const [contents, setContents] = useState(postContent);

  const deleteContent = (id) => {
    const deletedContents = [...contents].filter(
      (content) => content.id !== id
    );
    setContents(deletedContents);
  };

  const [searchWord, setSearchWord] = useState("");
  const [searchingTag, setSearchingTag] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(true);
  const nav = useNavigate();

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

  const onChange = (event) => {
    setSearchWord(event.target.value);
  };
  const filteredContents = contents.filter((item) => {
    const lowerCaseSearchWord = searchWord.toLowerCase();
    const titleIncludes = item.title
      .toLowerCase()
      .includes(lowerCaseSearchWord);
    const contentIncludes = item.content
      .toLowerCase()
      .includes(lowerCaseSearchWord);
    const tagIncludes = item.tag
      ? item.tag.toLowerCase().includes(lowerCaseSearchWord)
      : null;
    return titleIncludes || contentIncludes || tagIncludes;
  });
  const filteredContentsByTag = contents.filter((item) => {
    const tagIncludes = item.tag
      ? item.tag.toLowerCase().includes(searchingTag.toLowerCase())
      : null;
    return tagIncludes;
  });
  return (
    <div>
      <button onClick={() => nav("/")}>캘린더 이동 버튼</button>

      <button
        className="button_home"
        onClick={() => (nav(0), setSearchingTag(""))}
      >
        홈 버튼(새로고침)
      </button>
      {scrolled ? (
        <button id="moveToTopButton" onClick={moveToTop}>
          페이지 맨 위로 가는 버튼
        </button>
      ) : null}
      {showSearchBar ? (
        <div className="search">
          <input
            type="text"
            value={searchWord}
            className="search_input"
            placeholder="검색어를 입력하세요"
            onChange={onChange}
          />
        </div>
      ) : null}
      <div className="list_wrapper">
        <BackBoardDispatchContext.Provider
          value={{
            deleteContent,
            setSearchWord,
            setSearchingTag,
            setShowSearchBar,
          }}
        >
          {searchingTag ? (
            <div>
              <h2 className="tag_header">{`#${searchingTag}`}</h2>
              <BackPostList
                data={filteredContentsByTag}
                searchingTag={searchingTag}
                setSearchingTag={setSearchingTag}
              />
            </div>
          ) : (
            <BackPostList data={filteredContents} />
          )}
        </BackBoardDispatchContext.Provider>
      </div>
    </div>
  );
};

export default BackBoard;
