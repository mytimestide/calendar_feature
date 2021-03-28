import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./auth.slice";
import { calendarSlice } from "./fullCalendar.slice";
import { useDispatch } from "react-redux";

//项目中使用到的reducer
export const rootReducer = {
  // projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
  calendar: calendarSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
