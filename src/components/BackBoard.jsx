import "./BackBoard.css";
const BackBoard = ({ setTurnCalender }) => {
  return (
    <div>
      <p>ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ백보드ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ</p>
      <button onClick={() => setTurnCalender(true)}>뒤집는 버튼</button>
    </div>
  );
};

export default BackBoard;
