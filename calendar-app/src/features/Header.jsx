import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { localDate, handleNextBtnClick, handlePrevBtnClick, handleSelectChange } from "./calendar/calendarSlice";

export default function Header({ defaultValue }) {
  const dispatch = useDispatch();
  const currentDateforSelect = useSelector(localDate);
  const monthSelect = useRef(null);
  const yearSelect = useRef(null);
  const month = new Date().toLocaleString("ru", {
    month: "long"
  });
  const year = new Date().getFullYear();

  return (
    <header className="header">
      <div className="info_date">
        <h1>{month.toUpperCase()}</h1>
        <h2>{year}</h2>
      </div>
      <div className="select-panel">
        <select
          value={currentDateforSelect.getMonth()}
          className="select"
          ref={yearSelect}
          onChange={() => {
            dispatch(handleSelectChange({ monthSelect, yearSelect }));
          }}
        >
          {defaultValue.monthNames.map((name, index) => (
            <option key={name} value={index}>
              {name}
            </option>
          ))}
        </select>
        <select
          value={currentDateforSelect.getFullYear()}
          className="select"
          ref={monthSelect}
          onChange={() => {
            dispatch(handleSelectChange({ monthSelect, yearSelect }));
          }}
        >
          {defaultValue.years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button
          className="btn"
          onClick={() => {
            dispatch(handlePrevBtnClick());
          }}
        >
          <h2>{"<"}</h2>
        </button>
        <button
          className="btn"
          onClick={() => {
            dispatch(handleNextBtnClick());
          }}
        >
          <h2>{">"}</h2>
        </button>
      </div>
    </header>
  );
}
