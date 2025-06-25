import { useContext, useState } from "react";
import "./BackPostList.css";
import BackPostItem from "./BackPostItem";
import { useNavigate } from "react-router-dom";
import { BackBoardDispatchContext } from "./BackBoardMain";
import { CalogDispatchContext } from "../App";
import { TagStateContext } from "../App";

const BackPostList = ({ posts, entirePosts }) => {
  const nav = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [checkedItems, setCheckedItems] = useState([]);
  const { setSearchingTag } = useContext(BackBoardDispatchContext);
  const { onDelete } = useContext(CalogDispatchContext);
  const tagCount = useContext(TagStateContext);

  const getSortedData = () => {
    return posts.toSorted((prev, next) => {
      if (sortType === "oldest") {
        return Number(prev.createDate) - Number(next.createDate);
      } else {
        return Number(next.createDate) - Number(prev.createDate);
      }
    });
  };

  const checkedItemHandler = (id, isChecked) => {
    const stringedId = String(id);
    setCheckedItems((prevCheckedItems) => {
      if (isChecked) {
        return prevCheckedItems.includes(stringedId)
          ? prevCheckedItems
          : [...prevCheckedItems, stringedId];
      } else {
        return prevCheckedItems.filter((itemId) => itemId !== stringedId);
      }
    });
  };

  const allCheck = (checked) => {
    setCheckedItems((prevCheckedItems) => {
      if (checked) {
        const allItemIds = posts.map((item) => String(item.id));
        return allItemIds;
      } else {
        return [];
      }
    });
  };

  const deleteChecked = () => {
    checkedItems.forEach((id) => onDelete(id));
    setCheckedItems([]);
  };

  const sortedData = getSortedData();

  return (
    <>
      <div className="buttons">
        {sortType === "latest" ? (
          <button className="sort_button" onClick={() => setSortType("oldest")}>
            <img src="/oldest_icon.png" alt="오래된순" />
          </button>
        ) : (
          <button className="sort_button" onClick={() => setSortType("latest")}>
            <img src="/latest_icon.png" alt="최신순" />
          </button>
        )}
        <button className="write_button" onClick={() => nav("/new")}>
          <img src="/write_button.png" alt="작성페이지 이동 버튼" />
        </button>
        <button className="check_delete_button" onClick={deleteChecked}>
          <img src="/all_delete.png" alt="체크 삭제" />
        </button>
        <input
          type="checkbox"
          onChange={(e) => allCheck(e.target.checked)}
          checked={posts.length > 0 && checkedItems.length === posts.length}
        />
      </div>
      <div className="postList_wrapper">
        <div className="tag_wrapper">
          <h3>태그 목록</h3>
          <hr />
          <div
            className="tags"
            onClick={() => setSearchingTag("")}
          >{`글 전체보기 (${entirePosts.length})`}</div>

          <div>
            {Object.entries(tagCount).map(([tag, count]) => (
              <div
                className="tags"
                key={tag}
                onClick={() => setSearchingTag(tag, count)}
              >
                {tag} ({count})
              </div>
            ))}
          </div>
        </div>
        <div className="content_wrap">
          {sortedData.map((item) => (
            <BackPostItem
              key={String(item.id)}
              {...item}
              id={String(item.id)}
              checkedItems={checkedItems}
              checkedItemHandler={checkedItemHandler}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default BackPostList;
