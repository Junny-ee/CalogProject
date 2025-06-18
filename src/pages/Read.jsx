import { useNavigate, useParams } from "react-router-dom";

const Read = ({ title, createDate, content, tag }) => {
  const nav = useNavigate();
  const params = useParams();
  return (
    <>
      <button onClick={() => nav(-1)}>뒤로가는 버튼</button>
      <button onClick={() => nav(`/edit/${params.id}`)}>수정하기</button>
      <button>삭제하기(미구현)</button>
      <button>상단 고정(미구현)</button>
      <div className="Read">{title} 글 상세보기 페이지</div>
    </>
  )
};

export default Read;
