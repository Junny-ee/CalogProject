import { useEffect, useState, createContext, useContext } from "react";
import "./BackBoardMain.css";
import BackPostList from "./BackPostList";
import { useNavigate } from "react-router-dom";
import { CalogStateContext } from "../App";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

export const BackBoardDispatchContext = createContext();

const BackBoardMain = ({ fetchPosts }) => {
  const allPostsFromContext = useContext(CalogStateContext);
  const queryClient = useQueryClient();

  const { fetchNextPage, hasNextPage, isLoadingNextPage } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 0 }) => fetchPosts(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isLoadingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isLoadingNextPage, fetchNextPage]);

  useEffect(() => {
    queryClient.invalidateQueries(["posts"]);
  }, [allPostsFromContext, queryClient]);

  const [searchWord, setSearchWord] = useState("");
  const [searchingTag, setSearchingTag] = useState("");
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
    if (searchingTag !== "") {
      setSearchingTag("");
    }
    setSearchWord(event.target.value);
  };

  const filteredPosts = allPostsFromContext.filter((item) => {
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

  const filteredPostsByTag = allPostsFromContext.filter((item) => {
    const lowerCaseSearchingTag = searchingTag.toLowerCase();
    const tagMatches = Array.isArray(item.tag)
      ? item.tag.some((t) => t.toLowerCase() === lowerCaseSearchingTag)
      : typeof item.tag === "string"
      ? item.tag.toLowerCase() === lowerCaseSearchingTag
      : false;

    return tagMatches;
  });

  return (
    <div className="BackBoardMain">
      <div className="header_wrapper">
        <button className="button_home" onClick={() => nav("/")}>
          <img src="/logo_image_width.png" alt="로고(새로고침)" />
        </button>
        <div className="search">
          <input
            type="text"
            value={searchWord}
            className="search_input"
            placeholder="검색어를 입력하세요"
            onChange={onChange}
          />
        </div>
      </div>
      {scrolled ? (
        <button id="moveToTopButton" onClick={moveToTop}>
          <img src="/gotoup.png" />
        </button>
      ) : null}

      <div>
        <BackBoardDispatchContext.Provider
          value={{
            setSearchWord,
            setSearchingTag,
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
                posts={filteredPostsByTag}
                entirePosts={allPostsFromContext}
              />
            </div>
          ) : (
            <BackPostList
              posts={filteredPosts}
              entirePosts={allPostsFromContext}
            />
          )}
          {searchWord === "" && searchingTag === "" && <div ref={ref}></div>}
        </BackBoardDispatchContext.Provider>
      </div>
    </div>
  );
};

export default BackBoardMain;
