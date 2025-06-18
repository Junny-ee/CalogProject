import "./NewTagWrite.css";
import { useState } from "react";
// 태그 개수 제한
const NewTagWrite = ({ tags, setTags }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();

      const newTag = input.trim().toLowerCase();
      const lowerCaseTag = tags.map((tag) => tag.toLowerCase());
      if (!lowerCaseTag.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      if (tags.length >= 10) {
        alert("태그는 10개까지만 입력가능합니다!");
      }
      setInput("");
    }
  };

  const handleRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="tag_write_container">
      <input
        type="text"
        placeholder="태그 입력 후 Enter"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="tag_input_field"
      />
      <div className="tag_list">
        {tags.map((tag) => (
          <span
            key={tag}
            className="tag_item"
            onClick={() => handleRemove(tag)}
          >
            #{tag} ✕
          </span>
        ))}
      </div>
    </div>
  );
};

export default NewTagWrite;
