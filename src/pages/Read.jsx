import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalogStateContext } from "../App";
const Read = () => {
  const nav = useNavigate();
  const params = useParams();
  const contentList = useContext(CalogStateContext);
  const rightNum = contentList.find(
    (item) => String(item.id) === String(params.id)
  );

  console.log(rightNum);
  return (
    <>
      <button onClick={() => nav(-1)}>뒤로가는 버튼</button>
      <button onClick={() => nav(`/edit/${params.id}`)}>수정하기</button>
      <button>삭제하기(미구현)</button>
      <button>상단 고정(미구현)</button>
      <div className="Read">
        <div className="read_title_content">{rightNum.title}</div>
        <div className="read_tag_content">{rightNum.tag}</div>
        <div className="read_content">
          <p>{rightNum.content}</p>
        </div>
      </div>
    </>
  );
};

export default Read;
