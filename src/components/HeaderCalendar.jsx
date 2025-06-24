import React from "react";
import moment from "moment";
import "moment/locale/ko";
import "./HeaderCalendar.css";

moment.locale("ko"); // 한국어 적용

const HeaderCalendar = ({ date, onClick }) => {
  return (
    <div className="HeaderCalendar">
      <button className="current-month-button" onClick={onClick}>
        {moment(date).locale("ko").format("YYYY년 M월")}
      </button>
    </div>
  );
};

export default HeaderCalendar;
