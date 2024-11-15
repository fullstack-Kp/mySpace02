import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./HabitSlice";
const store = configureStore({
  reducer: {
    allHabits: habitsReducer,
  },
});

export default store;
