import "./NewTagWrite.css";
import { useState } from "react";

const NewTagWrite = ({ tags, setTags }) => {
  const [tagInput, setTagInput] = useState("");

  const enterKeyEvent = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
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

      if (tagInput.length > 20) {
        alert("태그는 20자까지만 쓸 수 있어요!");
        return;
      }

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
