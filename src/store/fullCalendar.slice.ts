import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState, AppThunk } from "@/store/index";
import { request } from "@/utils/request";
import {
  requestEventsInRange,
  requestEventCreate,
  requestEventUpdate,
  requestEventDelete,
} from "@/pages/Home/components/requests";

export interface calendarState {
  type: string | null;
  weekendsVisible: boolean;
  plainEventObjects: any;
  events: any[];
}

const initialState: calendarState = {
  type: "",
  weekendsVisible: true,
  plainEventObjects: {},
  events: [],
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    toggleWeekends(state, action) {
      state.weekendsVisible = !state.weekendsVisible;
    },
    upToView(state, action) {
      state = { ...state, ...action };
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(requestEvents.fulfilled, (state, action) => {
    //   // localStorage.setItem("curUser", action.payload.access);
    //   console.log(action);
    //   state = { ...state, ...action };
    // });
    // builder.addCase(createEvent.fulfilled, (state, action) => {
    //   // localStorage.setItem("curUser", action.payload.access);
    //   console.log(action);
    //   state = { ...state, ...action };
    // });
    // builder.addCase(updateEvent.fulfilled, (state, action) => {
    //   // localStorage.setItem("curUser", action.payload.access);
    //   console.log(action);
    //   state = { ...state, ...action };
    // });
    // builder.addCase(deleteEvent.fulfilled, (state, action) => {
    //   // localStorage.setItem("curUser", action.payload.access);
    //   console.log(action);
    //   state = { ...state, ...action };
    // });
  },
});

export const { upToView, toggleWeekends } = calendarSlice.actions;
export const storeState = (state: RootState) => state.calendar;

export const requestEvents = (startStr: string, endStr: string) => (
  dispatch: AppDispatch
) =>
  requestEventsInRange(startStr, endStr).then((plainEventObjects) =>
    dispatch(upToView(plainEventObjects))
  );

export const createEvent = (plainEventObject: any) => (dispatch: AppDispatch) =>
  requestEventCreate(plainEventObject).then((newEventId) =>
    dispatch(
      upToView({
        plainEventObjects: {
          id: newEventId,
          ...plainEventObject,
        },
      })
    )
  );
export const updateEvent = (plainEventObject: any) => (dispatch: AppDispatch) =>
  requestEventUpdate(plainEventObject).then(() =>
    dispatch(upToView(plainEventObject))
  );
export const deleteEvent = (eventId: number) => (dispatch: AppDispatch) =>
  requestEventDelete(eventId).then(() => dispatch(upToView(eventId)));
