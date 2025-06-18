import "./Button.css";
const Button = ({ text, onClick, classtype }) => {
  /*
  클래스 네임 목록

  Theme : 테마변경 버튼
  ListToggle : 햄버거 버튼
  ScreenChange : 화면전환 버튼
  Create : 작성버튼
  Editer : 수정버튼
  Delete : 삭제버튼
  Back : 뒤로가기 버튼

  */
  return (
    <div className="Button">
      <button className={`${classtype}`} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};
export default Button;
