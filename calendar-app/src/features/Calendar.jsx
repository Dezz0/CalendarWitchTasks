import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTask,
  arrayOfDaysMonth,
  deleteCurrentTask,
  editCurrentTask,
  executeTask
} from "./calendar/calendarSlice";
import Header from "./Header";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";

const defaultValue = {
  years: [],
  monthNames: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь"
  ],
  weekDayNames: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]
};

for (let i = 2000; i <= 2030; i++) {
  defaultValue.years.push(i);
}

export default function Calendar() {
  const dayOfMonth = useSelector(arrayOfDaysMonth);
  const dispatch = useDispatch();
  const [task, setTask] = useState("");

  function currentDay(date) {
    const now = new Date();
    if (
      now.getFullYear() === date.getFullYear() &&
      now.getMonth() === date.getMonth() &&
      now.getDate() === date.getDate()
    ) {
      return "day today";
    }
    return "day";
  }

  function handleAddTask(e, id) {
    e.preventDefault();
    if (!task) return;
    dispatch(addNewTask({ id, task }));
    setTask("");
  }

  function handleDeleteTask(id) {
    dispatch(deleteCurrentTask(id));
  }

  function handleEditTask(id) {
    dispatch(editCurrentTask(id));
  }
  function handleDoneTask(id) {
    dispatch(executeTask(id));
  }

  return (
    <div className="calendar">
      <Header defaultValue={defaultValue} />
      <table>
        <thead>
          <tr>
            {defaultValue.weekDayNames.map((day) => (
              <td className="dayOfWeek" key={day}>
                {day}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {dayOfMonth.map((week, index) => (
            <tr key={index}>
              {week.map((date, index) =>
                date ? (
                  <Popup
                    key={index}
                    trigger={
                      <td className={currentDay(date.day)}>
                        <h3>{date.day.getDate()}</h3>
                        <p className={date.isDone ? "done" : ""}>{date.task}</p>
                      </td>
                    }
                    arrow={false}
                    className="popup"
                    closeOnEscape
                  >
                    {(close) =>
                      date.isEmpty ? (
                        <div className="modal">
                          <button className="close" onClick={close}>
                            &times;
                          </button>
                          <h3>Добавить задачу</h3>
                          <form
                            onSubmit={(e) => {
                              handleAddTask(e, date.id);
                              close();
                            }}
                          >
                            <input placeholder="Добавить задачу..." onChange={(e) => setTask(e.target.value)} />
                            <button className="btn-add">Добавить</button>
                          </form>
                        </div>
                      ) : (
                        <div className="modal">
                          {!date.isEdit ? (
                            <div className="modal-child">
                              <button className="close" onClick={close}>
                                &times;
                              </button>
                              <h3>Текущая задача</h3>
                              <p className={date.isDone ? "done" : ""}>{date.task}</p>
                              <div className="btn-group">
                                <button className="btn-done" onClick={() => handleDoneTask(date.id)}>
                                  Выполнить
                                </button>
                                <button
                                  className="btn-edit"
                                  onClick={() => {
                                    handleEditTask(date.id);
                                  }}
                                >
                                  Редактировать
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="modal-child">
                              <button className="close" onClick={close}>
                                &times;
                              </button>
                              <h3>Редактирование</h3>
                              <input defaultValue={date.task} onChange={(e) => setTask(e.target.value)} />
                              <button className="btn-save" onClick={(e) => handleAddTask(e, date.id)}>
                                Сохранить
                              </button>
                            </div>
                          )}

                          <button
                            className="btn-del"
                            onClick={() => {
                              handleDeleteTask(date.id);
                            }}
                          >
                            Удалить
                          </button>
                        </div>
                      )
                    }
                  </Popup>
                ) : (
                  <td key={index} />
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
