import "./Button.css";
const Button = ({ text, onClick, classtype }) => {

  return (
    <div className="Button">
      <button className={`${classtype}`} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};
export default Button;
