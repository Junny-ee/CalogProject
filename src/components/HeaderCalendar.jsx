import React from "react";
import moment from "moment";
import "./HeaderCalendar.css";

const HeaderCalendar = ({ date, onClick }) => {
  return (
    <div className="HeaderCalendar">
      <button className="current-month-button" onClick={onClick}>
        {moment(date).format("MMMM YYYY")}
      </button>
    </div>
  );
};

export default HeaderCalendar;
