import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import eventReducer from "./eventSlice";
import userEventReducer from "./userEventSlice";
import userDataReducer from "./userDataSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    eventsList: eventReducer,
    userEvent:userEventReducer,
    userData:userDataReducer
  },
});
