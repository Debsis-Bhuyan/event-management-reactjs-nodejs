import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userEvent: JSON.parse(sessionStorage.getItem("userEvents")) || null,

};

const userEventSlice = createSlice({
  name: "userEvent",
  initialState,
  reducers: {
    setUserEvent: (state, action) => {
      state.userEvent = action.payload;
      sessionStorage.setItem("userEvents", JSON.stringify(action.payload));
    },
   
  },
});
export const { setUserEvent } = userEventSlice.actions;
export default userEventSlice.reducer;