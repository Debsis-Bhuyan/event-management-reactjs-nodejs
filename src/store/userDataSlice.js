import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: JSON.parse(sessionStorage.getItem("user")) || null,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUserData: (state) => {
      state.userData = null;
      sessionStorage.removeItem("user");
    },
  },
});
export const { setUserData, clearUserData } = userDataSlice.actions;
export default userDataSlice.reducer;