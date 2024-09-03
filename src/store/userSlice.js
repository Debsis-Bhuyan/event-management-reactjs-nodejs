import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(sessionStorage.getItem("userInfo")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = null;
      sessionStorage.removeItem("userInfo");
    },
  },
});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;