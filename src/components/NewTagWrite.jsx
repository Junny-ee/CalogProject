import "./NewTagWrite.css";
import { useRef, useState } from "react";
// 태그 개수 제한
const NewTagWrite = ({ tags, setTags }) => {
  const [tagInput, setTagInput] = useState("");
  const tagRef = useRef(0);

  const enterKeyEvent = (e) => {
    // 엔터 키 누른 경우와 공백 제거한 입력값 있는지 판단
    if (e.key === "Enter" && tagInput.trim()) {
      // submit 이벤트 막음
      e.preventDefault();
      // 태그 배열이기 때문에 length로 개수 제한
      if (tags.length >= 10) {
        alert("태그는 10개까지만 입력가능합니다!");
        return;
      }

      if (tagInput.includes("#")) {
        alert("태그에 '#' 기호는 사용 불가능합니다!");
        return;
      } else if (tagInput.includes("/")) {
        alert("태그에 '/' 기호는 사용 불가능합니다!");
        return;
      }

      // 태그입력값 공백 제거 후 소문자로 변환 처리 후 저장
      const newTag = tagInput.trim().toLowerCase();
      const lowerCaseTag = tags.map((tag) => tag.toLowerCase());
      if (!lowerCaseTag.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const tagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="tag_write_container">
      <input
        type="text"
        placeholder="태그 입력 후 Enter"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={enterKeyEvent}
        className="tag_input_field"
      />
      <div className="tag_list">
        {tags.map((tag) => (
          <span key={tag} className="tag_item" onClick={() => tagRemove(tag)}>
            #{tag} ✕
          </span>
        ))}
      </div>
    </div>
  );
};

export default NewTagWrite;
