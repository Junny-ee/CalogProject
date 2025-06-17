import "./Button.css";
const Button = ({ text, onClick, type }) => {
  return (
    <div>
      <button className="" onClick={onClick}>
        {text}
      </button>
    </div>
  );
};
export default Button;
