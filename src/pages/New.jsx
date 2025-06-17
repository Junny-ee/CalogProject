import Button from "../components/Button";
const New = () => {
  return (
    <div className="New">
      <div className="title_content">글 제목</div>
      <div className="date_content">날짜</div>
      <div className="write_content">글 작성</div>
      <div className="write_content">
        <Button text={"수정"} classtype={"Create"} />
        <Button text={"삭제"} />
        <Button text={"작성 완료"} />
      </div>
    </div>
  );
};

export default New;
