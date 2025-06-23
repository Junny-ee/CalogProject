import { useEffect, useState, createContext, useContext } from "react";
import "./BackBoardMain.css";
import BackPostList from "./BackPostList";
import { useNavigate } from "react-router-dom";
import { CalogStateContext, TagStateContext } from "../App";

// props: id, title, createDate, content, tag
export const BackBoardDispatchContext = createContext();

const BackBoard = () => {
  // postContent
  const postContent = useContext(CalogStateContext);
  const tag = useContext(TagStateContext);
  console.log(tag);
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

  useEffect(() => {
    setContents(postContent);
  }, [postContent]);

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

    const tagIncludes = Array.isArray(item.tag)
      ? item.tag.some(
          (tag) => typeof tag === "string" && tag.includes(lowerCaseSearchWord)
        )
      : typeof item.tag === "string"
      ? item.tag.includes(lowerCaseSearchWord)
      : false;

    return titleIncludes || contentIncludes || tagIncludes;
  });

  const filteredContentsByTag = contents.filter((item) => {
    const tagIncludes = Array.isArray(item.tag)
      ? item.tag.some((t) => t.includes(searchingTag.toLowerCase()))
      : typeof item.tag === "string"
      ? item.tag.includes(searchingTag.toLowerCase())
      : false;

    return tagIncludes;
  });

  return (
    <div className="BackBoardMain">
      <div className="button_wrapper">
        <button
          className="button_home"
          onClick={() => (nav(0), setSearchingTag(""))}
        >
          <img src="/logo_image_width.png" alt="로고(새로고침)" />
        </button>
        <button className="gotoCalendar" onClick={() => nav("/")}>
          <img src="/calendar.png" alt="캘린더 이동 아이콘" />
        </button>
      </div>

      {scrolled ? (
        <button id="moveToTopButton" onClick={moveToTop}>
          <img src="/gotoup.png" />
        </button>
      ) : null}
      {/* {showSearchBar ? (
        <div className="search">
          <input
            type="text"
            value={searchWord}
            className="search_input"
            placeholder="검색어를 입력하세요"
            onChange={onChange}
          />
        </div>
      ) : null} */}
      <div className="search">
        <input
          type="text"
          value={searchWord}
          className="search_input"
          placeholder="검색어를 입력하세요"
          onChange={onChange}
        />
      </div>
      {/* 태그별 조회 시에도 검색창 유지할거면 검색 태그별 조회 상태에서 검색 작동하게 수정하기 */}
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
              <span className="tag_header_wrapper">
                <span className="tag_text">{`#${searchingTag}`}</span>
                <button
                  className="close_button"
                  onClick={() => {
                    setSearchingTag("");
                  }}
                >
                  ×
                </button>
              </span>
              <BackPostList
                data={filteredContentsByTag}
                entireData={contents}
                searchingTag={searchingTag}
                setSearchingTag={setSearchingTag}
              />
            </div>
          ) : (
            <BackPostList data={filteredContents} entireData={contents} />
          )}
        </BackBoardDispatchContext.Provider>
      </div>
    </div>
  );
};

export default BackBoard;
