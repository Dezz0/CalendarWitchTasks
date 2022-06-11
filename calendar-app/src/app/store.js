import { configureStore } from "@reduxjs/toolkit";
import calendarSlice from "../features/calendar/calendarSlice";

export const store = configureStore({
  reducer: {
    calendar_task: calendarSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});
