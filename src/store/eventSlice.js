import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventsList: JSON.parse(sessionStorage.getItem("events")) || null,
};

const eventSlice = createSlice({
  name: "eventsList",
  initialState,
  reducers: {
    setEvent: (state, action) => {
      state.eventsList = action.payload;
      sessionStorage.setItem("events", JSON.stringify(action.payload));
    },
    clearEvent: (state) => {
      state.eventsList = null;
      sessionStorage.removeItem("events");
    },
  },
});
export const { setEvent, clearEvent } = eventSlice.actions;
export default eventSlice.reducer;
