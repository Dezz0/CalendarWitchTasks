import { createSlice, current } from "@reduxjs/toolkit";
import produce from "immer";

import * as calendar from "./calendar";

const date = new Date();

const initialState = {
  daysOfMonth: calendar.getMonthData(date.getFullYear(), date.getMonth()),
  date: date,
  currentDate: new Date()
};

export const calendarSlice = createSlice({
  name: "calendar_task",
  initialState,
  reducers: {
    handlePrevBtnClick(state) {
      const getMonth = state.date.getMonth() - 1;
      const getYear = state.date.getFullYear();
      state.date = new Date(getYear, getMonth);

      state.daysOfMonth = calendar.getMonthData(getYear, getMonth);
    },
    handleNextBtnClick(state) {
      const getMonth = state.date.getMonth() + 1;
      const getYear = state.date.getFullYear();
      state.date = new Date(getYear, getMonth);

      state.daysOfMonth = calendar.getMonthData(getYear, getMonth);
    },
    handleSelectChange(state, action) {
      const { monthSelect, yearSelect } = action.payload;
      const getMonth = monthSelect.current.value;
      const getYear = yearSelect.current.value;

      const date = new Date(getMonth, getYear);
      state.date = date;

      state.daysOfMonth = calendar.getMonthData(getMonth, getYear);
    },
    addNewTask(state, action) {
      const { id, task } = action.payload;

      const daysOfMonth = current(state.daysOfMonth);
      const proddaysOfMonth = produce(daysOfMonth, (draftState) => {
        draftState.forEach((week) =>
          week.forEach((day) => {
            if (!day) return;
            if (day.id === id) {
              day.task = task;
              day.isEdit = false;
              day.isEmpty = false;
            }
          })
        );
      });
      state.daysOfMonth = proddaysOfMonth;
    },
    deleteCurrentTask(state, action) {
      const id = action.payload;

      const daysOfMonth = current(state.daysOfMonth);
      const proddaysOfMonth = produce(daysOfMonth, (draftState) => {
        draftState.forEach((week) =>
          week.forEach((day) => {
            if (!day) return;
            if (day.id === id) {
              day.task = null;
              day.isEmpty = true;
            }
          })
        );
      });
      state.daysOfMonth = proddaysOfMonth;
    },
    editCurrentTask(state, action) {
      const id = action.payload;

      const daysOfMonth = current(state.daysOfMonth);
      const proddaysOfMonth = produce(daysOfMonth, (draftState) => {
        draftState.forEach((week) =>
          week.forEach((day) => {
            if (!day) return;
            if (day.id === id) {
              day.isEdit = true;
            }
          })
        );
      });
      state.daysOfMonth = proddaysOfMonth;
    },
    executeTask(state, action) {
      const id = action.payload;

      const daysOfMonth = current(state.daysOfMonth);
      const proddaysOfMonth = produce(daysOfMonth, (draftState) => {
        draftState.forEach((week) =>
          week.forEach((day) => {
            if (!day) return;
            if (day.id === id) {
              day.isDone = !day.isDone;
            }
          })
        );
      });
      state.daysOfMonth = proddaysOfMonth;
    }
  }
});

export default calendarSlice.reducer;

export const {
  handlePrevBtnClick,
  handleNextBtnClick,
  handleSelectChange,
  addNewTask,
  deleteCurrentTask,
  editCurrentTask,
  executeTask
} = calendarSlice.actions;

export const localDate = (state) => state.calendar_task.date;
export const currentDate = (state) => state.calendar_task.date;
export const arrayOfDaysMonth = (state) => state.calendar_task.daysOfMonth;
